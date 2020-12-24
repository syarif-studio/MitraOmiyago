import React from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView, Modal, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import ProductCarousel from '../../components/ProductCarousel';
import styles from '../../assets/styles/index.style';
import HomeCategories from '../../components/HomeCategories';
import Categories from '../../utils/Categories/CategoriesData';
import CategoriesSplitter from '../../components/CategoriesSplitter';
import ProductItemCard from '../../components/ProductItemCard';
import flashSale from '../../utils/Categories/DummyData/flashSale';
import SearchProduct from '../../components/SearchProduct'
import SearchBar from '../../components/SearchBar'
import Loading from '../../components/Loading';
import * as actionType from '../../store/actions/action-types';
import { connect } from 'react-redux';
import { retrieveData } from "../../services/storage"
import home  from "../../services/home"
import LinearGradient from 'react-native-linear-gradient';
import config from "../../config"
import PoinKupon from "../../components/PoinKupon"


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Home = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [version, setVersion] = React.useState('1.0')

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);       
        props.fetchNewProduct([]);
        fetchNewProduct();
        props.fetchOmiyagoProduct([]);
        fetchOmiyagoProduct();
        props.fetchPopulerProduct([]);
        fetchPopulerProduct();
        props.fetchRecomendasiProduct([]);
        fetchRecomendasiProduct();
        props.fetchFlashsaleProduct([]);
        fetchFlashsaleProduct();
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    
    const onSearchProduct = (text) => {
        setIsSearch(true);
        setSearchText(text);
    }
      
    const onCloseSearch = () => {
        setIsSearch(false);
    }

    React.useEffect(() => {
        setLoading(true);

        checkForUpdate();

        //SplashScreen.hide();
        props.navigation.setParams({ 
            onSearchProduct: onSearchProduct,
            onCloseSearch:  onCloseSearch
          });
        
        fetchNewProduct();
        fetchOmiyagoProduct();
        fetchPopulerProduct();
        fetchRecomendasiProduct();
        fetchFlashsaleProduct();
        getCartData();

        wait(2000).then(() => setLoading(false));
        fetchAllProduct()
    }, []);

    const checkForUpdate = async () => {
        const res = await home.getPlatform().catch((err) => { console.error(err); });
        const platform = Array.isArray(res?.data) && res?.data?.find(item => item.status === 'update')
        if(platform.version && parseFloat(platform.version) > parseFloat(config.VERSION)){
            setVersion(platform.version)
            setShowModal(true)
        }
    }

    const fetchProduct = (response, fetchCallback) => {        
        if(response){           
            var cardData = [];            
            for (let i = 0; i < response.length; i++) {
                if(response[i].product.status?.enabled == '1'){
                  var item = {
                      "id"       : response[i].product.id,
                      "title"    : response[i].product.detail.name,
                      "price"    : response[i].product.price,
                      "base_price"  : response[i].product.base_price,
                      "image"    : response[i].product.image.url,
                      "features" : response[i].product.detail.summary,
                      "body"     : response[i].product.detail.description,
                      "stock"    : response[i].product.status.stock
                  }
                  cardData.push(item)
                }
              } 
            fetchCallback(cardData)
        }
    }

    const fetchNewProduct = async () => {
        const res = await home.getNewProduct().catch((err) => { console.error(err); });  
        fetchProduct(res.data, props.fetchNewProduct)  
    };

    const fetchOmiyagoProduct = async () => {        
                  
        const res = await home.getOmiyagoProduct().catch((err) => { console.error(err); }); 
        fetchProduct(res.data.productCategory, props.fetchOmiyagoProduct)

    };

    const fetchPopulerProduct = async () => {        
                  
        const res = await home.getPopulerProduct().catch((err) => { console.error(err); }); 
        fetchProduct(res.data, props.fetchPopulerProduct) 

    };

    const fetchRecomendasiProduct = async () => {        
                  
        const res = await home.getRecomendasiProduct().catch((err) => { console.error(err); }); 
        fetchProduct(res.data, props.fetchRecomendasiProduct) 

    };

    const fetchFlashsaleProduct = async () => {

        const res = await home.getFlashSale().catch((err)=> { console.error(err);});
        fetchProduct(res.data, props.fetchFlashsaleProduct)
    };

    const fetchAllProduct = async () => {        
                  
        const res = await home.getAllProduct().catch((err) => { console.error(err); }); 
        fetchProduct(res.data, props.fetchAllProduct) 

    };

    const getCartData = async () => {
        const userData = await retrieveData('userData');
        if(userData){
            const res = await home.getCart(userData.userId)
            props.fetchCart(res)
        }
        else{
            props.fetchCart(null)
        }
    }   

    const handleScroll = (e) => {
        props.navigation.setParams({
            bgColor: e.nativeEvent.contentOffset.y > 5
                ? '#009975' 
                : 'transparent',
        });
    };

    const renderLoading = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Loading isVisible={true} size={70} color="#009975" />
            </View>
        );
    };

    if(isSearch){
        return <SearchProduct 
          isSearch={isSearch}
          text={searchText}
          navigation={props.navigation}
          fetchFlashSaleProduct={props.fetchFlashSaleProduct}
        />      
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", height: "100%", paddingTop: 5 }}>
            <SearchBar navigation={props.navigation} />
            {loading ? renderLoading() 
                : <ScrollView
                    onScroll={handleScroll}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    >
                    <ProductCarousel />
                    <PoinKupon navigation={props.navigation} />
                    <View style={{ flex: 1, padding: 10, marginTop: 10  }}>
                        <LinearGradient colors={['#fff', '#b0dcd2']} style={styless.subCategoryContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    Categories.map((category, index) => {
                                        return (
                                            <HomeCategories data={Object.values(category)} {...props} />
                                        )
                                    })
                                }
                            </ScrollView>
                        </LinearGradient> 
                        {
                            !!props.flashsaleProducts.length &&
                            <>
                                <CategoriesSplitter categoryName={"FLASH SALE"} navigation={props.navigation}/>
                                <ProductItemCard datas={props.flashsaleProducts.slice(0,10)} source={'flashsaleProducts'} navigation={props.navigation} />
                            </>
                        }
                        <CategoriesSplitter categoryName={"PRODUK TERBARU"} navigation={props.navigation}/>
                        <ProductItemCard datas={props.newProducts.slice(0,10)} source={'newProducts'} navigation={props.navigation} />
                        <CategoriesSplitter categoryName={"OMIYAGO PRODUK"}  navigation={props.navigation} />
                        <ProductItemCard datas={props.omiyagoProducts.slice(0,10)} source={'omiyagoProducts'} navigation={props.navigation} />
                        <CategoriesSplitter categoryName={"PRODUK REKOMENDASI"} navigation={props.navigation} />
                        <ProductItemCard datas={props.recomendasiProducts.slice(0,10)} source={'recomendasiProducts'} navigation={props.navigation} />
                        {/* <CategoriesSplitter categoryName={"Produk OMIYAGO"} />
                        <ProductItemCard datas={flashSale} goToDetail={() => props.navigation.navigate("Detail")} />
                        <CategoriesSplitter categoryName={"Rekomendasi"} />
                        <ProductItemCard datas={flashSale} goToDetail={() => props.navigation.navigate("Detail")} /> */}
                    </View>
                </ScrollView>
            }
            <Modal
                transparent={true}
                visible={showModal} 
            >
                <View style={styless.ModalOuterContainer}>                    
                    <View style={{padding:16, alignItems:'center', backgroundColor:'#FDF2F3', borderColor:'#F9D5D3',borderStyle:'solid',borderWidth:1, borderRadius:4, margin:24}}>
                        <View style={{ flexDirection:'row'}}>
                            <Icon name="information-circle" style={{marginRight:5}}/>
                            <Text>Update Aplikasi Tersedia, Silahkan Perbarui Aplikasi anda untuk melanjutkan!</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={ ()=>{ Linking.openURL('https://play.google.com/store/apps/details?id=com.omiyago.mobile')}}
                            style={{marginTop:16, padding:8, borderRadius:4, marginLeft:'auto', backgroundColor:"green"}}
                        >
                            <View style={{ flexDirection:'row', alignItems:'center'}}>
                                <Icon name="md-appstore" style={{marginRight:5, color:'white'}}/>
                                <Text style={{fontSize:16, color:'white'}}>{`Update V${version}`}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFlashsaleProduct: (data) => dispatch({ type: actionType.FETCH_FLASHSALE_PRODUCT, payload: data }),
        fetchSearchProduct:    (data) => dispatch({ type: actionType.FETCH_SEARCH_PRODUCT, payload: data }),
        fetchCategoryProduct:  (data) => dispatch({ type: actionType.FETCH_CATEGORY_PRODUCT, payload: data }),
        fetchOmiyagoProduct:   (data) => dispatch({ type: actionType.FETCH_OMIYAGO_PRODUCT, payload: data }),
        fetchNewProduct:       (data) => dispatch({ type: actionType.FETCH_NEW_PRODUCT, payload: data }),
        fetchPopulerProduct:   (data) => dispatch({ type: actionType.FETCH_POPULER_PRODUCT, payload: data }),
        fetchAllProduct:       (data) => dispatch({ type: actionType.FETCH_ALL_PRODUCT, payload: data }),
        fetchRecomendasiProduct:   (data) => dispatch({ type: actionType.FETCH_RECOMENDASI_PRODUCT, payload: data }),
        fetchCart:             (data) => dispatch({ type: actionType.FETCH_CART, payload: data }),
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
        recomendasiProducts: state.recomendasiProducts,
        cart:              state.cart
    }
}
const styless = StyleSheet.create({
    
    shadow:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 1
    },
    subCategoryContainer: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 10
    },
    ModalOuterContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(00, 00, 00, 0.5)'
    },
    
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);