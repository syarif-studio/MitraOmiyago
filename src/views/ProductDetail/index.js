import React, { Component } from 'react'
import { StatusBar, View, Text, Dimensions, ScrollView, Image, RefreshControl, Modal, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ENTRIES1 } from '../../assets/static/entries';
import ProductDetailCarousel from '../../components/ProductDetailCarousel';
import { Button, Card, Footer, FooterTab, Container, Toast, Row, Grid } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { colors } from '../../assets/styles/index.style';
import { connect } from 'react-redux';
import SearchProduct from '../../components/SearchProduct';
import SearchDetail from '../../components/SearchDetail';
import HTML from 'react-native-render-html';
import ProductItemCard from '../../components/ProductItemCard';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import CategoryHeader from '../../components/CategoryHeader';
import { retrieveData } from "../../services/storage"
import * as actionType from '../../store/actions/action-types';
import product from '../../services/product'
import wishlist from '../../services/wishlist'
import cart from './../../services/cart'

const priceFormat = (price) => {
  
    if(!price) return '0'
  
    if( price.includes('.') )
      return price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
const ProductDetail = (props) => {  
    const { btnLove, heartButton, redHeartButton } = styles;
    const [refreshing, setRefreshing] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [isShowModal, setIsShowModal] = React.useState(false);
    const [variant, setVariant] = React.useState(null);
    const [selectedVariant, setSelectedVariant] = React.useState(null);

    const source = props.navigation.getParam("source", 'flashsaleProducts');
    const index = props.navigation.getParam("index", 'null');
    const notification = props.navigation.getParam("notification", '');
    const data = props[source][index];

    ProductDetail.navigationOptions = {
        headerShown: false,
        tabBarVisible: false,
    };
    

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const dimension = Math.round(Dimensions.get('window'));
    
    const onSearchProduct = (text) => {
        setIsSearch(true);
        setSearchText(text);
    }
      
    const onCloseSearch = () => {
        setIsSearch(false);
    }

    React.useEffect(() => {
        //SplashScreen.hide();
        props.navigation.setParams({ 
            onSearchProduct: onSearchProduct,
            onCloseSearch:  onCloseSearch
        });

        const getProductVariant = async () => {
            const response = await product.getVariant(data?.id).catch((err) => { console.error(err); });  
            setVariant(response?.data)
        }   
        
        const getWishlistProduct = async () => {            
            const user = await retrieveData('userData');
            const wishlists = await wishlist.getWishlist(user?.userId).catch((err) => { console.error(err); });  
            let flag = false
            if(Array.isArray(wishlists?.data)){
                for(const item of wishlists?.data){
                    if(item?.product?.id === data?.id){
                        flag = true
                        break
                    }
                }
            }
            setFavorite(flag)
        }
            
        getProductVariant()
        getWishlistProduct()
        
    },[]);

    const toCheckout= (params) => {
        props.navigation.navigate('Checkout', { params })
    }

    const buyHandler = async (data) => {
        if(data.stock){
            const userToken = await retrieveData('userData');
            if(userToken){
                 //Add tocart
                await cart.addToCart({
                    userId    : userToken.userId, 
                    productId : data?.id,
                    qty       : 1,
                    variantId : variant?.[selectedVariant]?.id 
                })
                props.navigation.navigate('Checkout', { data })
            }
            else
                props.navigation.navigate('Login', { redirect:'Detail', dataRedirect:{index, source} } )
            }
        else{
            setIsShowModal(true)
        }   
    }
    
    const toKeranjangBelanja= async (data) => {     
        const variantData = variant?.[selectedVariant]
        if(data.stock){
            const userData = await retrieveData('userData');
            if(userData)
                props.navigation.navigate('KeranjangBelanja', {  data:{...data, variant:variantData}, userData, source, index })
            else
                props.navigation.navigate('Login', { redirect:'Detail', dataRedirect:{index, source} } )
        }
        else{
            setIsShowModal(true)
        }       

    }

    const handleSelectVariant = (id) => {
        setSelectedVariant(id)
    }

    const handleSetFavorite = async () => {
        const user = await retrieveData('userData');
        if(favorite){
            const wishlists = await wishlist.getWishlist(user?.userId)
            let wishlistId = null
            if(Array.isArray(wishlists?.data)){
                for(const item of wishlists?.data){
                    if(item?.product?.id === data?.id){
                        wishlistId = item.id
                        break
                    }
                }
            }
            
            const resp = wishlistId && await wishlist.removeWishlist(wishlistId)
        }
        else{
            const resp = await wishlist.addWishlist(user?.userId, data?.id)
        }

        setFavorite(o => !o)
    }

    function filterItems() {
        var relevantProduct = [];
        for (let i = 0; (i < 10 && i < props[source].length); i++) {
            const element = props[source][i];
            //if (i !== data) {
                relevantProduct.push(element);
            //};
        }
        return relevantProduct;
    }

    if(isSearch){
        return <SearchProduct 
          isSearch={isSearch}
          text={searchText}
          navigation={props.navigation}
          fetchFlashSaleProduct={props.fetchFlashSaleProduct}
        />      
      }  
      
      
    if(notification){
        Toast.show({
            text: notification,
            buttonText: 'Okay',                
            duration: 5000,                
            type: "success"
        })
    }

      return (
        
        <Container>
            <SafeAreaView>
                <SearchDetail navigation={props.navigation}/>            
            </SafeAreaView>
            <ScrollView  
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ borderWidth: 2, borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, minHeight: 88, borderBottomWidth: 1, padding: 5 }}>
                    {/* <ProductDetailCarousel data={ENTRIES1} /> */}
                    
                    <View style={{overflow:'hidden', borderRadius:10}}>
                        <Image style={{ width: dimension.width, height: 250, resizeMode:'cover' }} source={{ uri: data.image }} />
                    </View>
                    <Button style={btnLove} onPress={ handleSetFavorite }>
                        <FontAwesomeIcon icon={favorite ? fasHeart : faHeart} style={favorite ? redHeartButton : heartButton} />
                    </Button>
                    
                    <View style={{ marginTop: 30, borderWidth: 2, borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, minHeight: 88, borderBottomWidth: 0.5, padding: 5 }}>
                        <Text style={{ color: "#1ABC9C", fontSize: 22, fontWeight: "600" }}>
                            {data.title}
                        </Text>
                        <View style={{ justifyContent:'space-around'}}>
                            {(data.base_price !== data.price) &&
                                <Text style={{ fontSize: 22, textDecorationLine: 'line-through' }}>
                                    Rp. {data.base_price}
                                </Text>
                            }
                                <Text style={{ color: "rgb(250, 89, 29)", fontSize: 22 }}>
                                {"Rp. " + (selectedVariant ? priceFormat(variant && variant[selectedVariant]?.price) : data.price)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        {
                            variant && Array.isArray(variant) &&
                            <View>
                                <Text>Varian {variant[0]?.type}</Text>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}} >
                                    {
                                        variant.map((item, index)=>(
                                            <TouchableOpacity onPress={()=>handleSelectVariant(index)} style={{margin:4}}>
                                                <View style={{flexDirection:'row', borderRadius:4, backgroundColor: (selectedVariant == index) ? 'green' : '#ccc', alignItems:'center', padding:4}} >
                                                    <Image source={{uri:item?.image}} style={{width:40,height:30}}/>
                                                    <Text>{item?.name}</Text>
                                                </View>
                                            </TouchableOpacity>  
                                        ))
                                    }
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{ padding: 5 }}>
                        <HTML html={data.features} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <HTML html={data.body} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ paddingTop: 15, alignSelf: "center", fontSize: 20, color: "#212529", fontWeight: "bold" }}>
                        Produk Terkait
                </Text>
                    <ProductItemCard datas={filterItems()} source={source} navigation={props.navigation} />
                </View>
                {/* <View style={{
                backgroundColor: "#009975",
                borderTopWidth: 4,
                borderTopColor: "#005642",
                paddingHorizontal: 15
            }}>
                <Text style={{
                    fontSize: 17,
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderBottomColor: "white",
                    borderBottomWidth: 1,
                    padding: 10
                }}>
                    INFORMASI
                </Text>
            </View> */}
            </ScrollView>
        
            
            <Footer>
                {/* { isShowNotification && notification ?
                    <View><Text>{notification}</Text></View> : <Text>Tidak ada notif</Text>
                } */}
                <FooterTab>
                   
                    <Button style={{ backgroundColor: "#009975", flex: 2 }} onPress={() => toKeranjangBelanja(data)}>
                        <FontAwesomeIcon style={{ color: "#ffffff" }} icon={faCartPlus} />
                        <Text style={{ color: "#ffffff", fontSize: 10, marginTop: 5 }}>
                            + Masukkan
                        </Text>
                    </Button>
                    <Button style={{ backgroundColor: "#e83e3e", flex: 2}} onPress={() => buyHandler(data)}>
                        <Text style={{ color: "#ffffff", fontSize: 20 }}>
                            Beli Langsung
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
            <Modal
                transparent={true}
                visible={isShowModal} 
            >
                 <View style={styles.ModalOuterContainer}>
                    <View style={styles.ModalInnerContainer}>
                        <Text style={{fontSize:24, fontWeight:'bold', marginBottom:16}}>Omiyago.com menyatakan</Text>
                        <Text style={{marginBottom:24}}>Maaf, stok produk tidak tersedia</Text>
                        <Button style={{alignSelf:'flex-end'}} onPress={()=>setIsShowModal(false)} small transparent>
                            <Text style={{color:'blue', padding:8}}>Ok</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        
        </Container>
    );

}


const mapDispatchToProps = dispatch => {
    return {
        fetchFlashsaleProduct: (data) => dispatch({ type: actionType.FETCH_FLASHSALE_PRODUCT, payload: data }),
        fetchSearchProduct:    (data) => dispatch({ type: actionType.FETCH_SEARCH_PRODUCT, payload: data }),
        fetchCategoryProduct:  (data) => dispatch({ type: actionType.FETCH_CATEGORY_PRODUCT, payload: data }),
        fetchOmiyagoProduct:   (data) => dispatch({ type: actionType.FETCH_OMIYAGO_PRODUCT, payload: data }),
        fetchNewProduct:       (data) => dispatch({ type: actionType.FETCH_NEW_PRODUCT, payload: data }),
        fetchPopulerProduct:   (data) => dispatch({ type: actionType.FETCH_POPULER_PRODUCT, payload: data }),
        fetchRecomendasiProduct:   (data) => dispatch({ type: actionType.FETCH_RECOMENDASI_PRODUCT, payload: data }),
    }
}

const mapStateToProps = state => {
    return {
        flashsaleProducts: state.flashsaleProducts,
        searchProducts:    state.searchProducts,
        categoryProducts:  state.categoryProducts,
        omiyagoProducts:   state.omiyagoProducts,
        newProducts:       state.newProducts,
        populerProducts:   state.populerProducts,
        wishlistProducts:  state.wishlistProducts,
        recomendasiProducts: state.recomendasiProducts,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = {
    btnLove: {
        width: 52,
        height: 52,
        top: 230,
        right: 16,
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px",
        position: "absolute",
        zIndex: 1,
        backgroundColor: "#fff",
        display: "flex",
        borderRadius: 50,
        justifyContent: "center"
    },
    heartButton: {
        color: colors.gray
    },
    redHeartButton: {
        color: "#ff0000",
        width: 30,
        height: 30
    },
    ModalOuterContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(00, 00, 00, 0.5)'
    },
    ModalInnerContainer:{
      backgroundColor: '#fff',
      width: '85%',
      borderRadius: 4,
      padding: 32
    },
};