import React, { Component } from 'react';
import { Image, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Container, Header, FooterTab, Content, Footer, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View,Title, ActionSheetk , Spinner } from 'native-base';
import cart from './../../services/cart'
import { connect } from 'react-redux'
import { retrieveData } from "../../services/storage"
import * as actionType from '../../store/actions/action-types';

const Keranjang = (props)=> {  

  const [userData, setUserData] = React.useState(null);

  React.useEffect(()=>{
    getUserData()
  },[])

  const handleToCheckout = () => props.navigation.navigate('Checkout')
  const handleAddQty = async(id) => {
    //Add tocart
    await cart.addToCart({
      userId    : userData.userId, 
      productId : id,
      qty:        1    
    })

    //Update cart item
    const res = await cart.getCart(userData.userId)
    props.fetchCart(res)
  }

  const handleReduceQty = async(index) => {

    const {item, product} = props.cart.data[index]

    if(item.qty > 1){

      const qty = item.qty - 1
    
      //remove cart item
      await cart.removeFromCart({      
        userId   : userData.userId,
        cartItem : item.id, 
      })  
    
      //Add tocart
      await cart.addToCart({
        userId    : userData.userId, 
        productId : product.id,
        qty    
      })

    }
    else{
    
      //remove cart item
      await cart.removeFromCart({      
        userId   : userData.userId,
        cartItem : item.id, 
      })

    }

    //Update cart item
    const res = await cart.getCart(userData.userId)
    props.fetchCart(res)

  }

  const handleSetQty = async(qty, index) =>{

    const {item, product} = props.cart.data[index]
    
    //remove cart item
    await cart.removeFromCart({      
      userId   : userData.userId,
      cartItem : item.id, 
    })
  
    //Add tocart
    await cart.addToCart({
      userId    : userData.userId, 
      productId : product.id,
      qty    
    })

    //Update cart item
    const res = await cart.getCart(userData.userId)
    props.fetchCart(res)

  }

  const getUserData = async() => {
    const userData = await retrieveData('userData')
    if(userData){
      const res = await cart.getCart(userData.userId)      
      props.fetchCart(res)
      setUserData(userData)
    }
  }
  
  const handleDeleteCartItem = async (itemId) => {
    
    if(userData){

      //remove cart item
      const remove = await cart.removeFromCart({      
        userId   : userData.userId,
        cartItem : itemId, 
      })
      
      //Update cart item
      const res = await cart.getCart(userData.userId)      
      props.fetchCart(res)
      setIsShowModal(false)
    }
  }

  return (
    <Container>
      <Header transparent style={{borderBottomColor: "#eaeaea", borderBottomWidth: 2, borderBottomStyle: "solid"}}>
        <Left>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Home')}>
            <Icon name="arrow-back" style={{color:'#212529'}} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title style={{color:'#212529'}}>Keranjang Belanja</Title>
        </Body>
      </Header>  
      { props.cart && Array.isArray(props.cart.data) ?
        <>    
          <Content style={{padding:20}}>
            {props.cart.data && props.cart.data.map((cartItem, index)=>(
              <View style={styles.product}>
                <View style={{marginRight:20}}>
                  <Thumbnail square small source={{uri: cartItem?.product?.image?.url}} />
                </View>
                <View style={{flex:1}}>
                  <Text>{cartItem.product.detail.name}</Text>
                  {
                    !!cartItem?.variant?.status &&
                    <Text style={{color:'green', fontSize:10, fontStyle:'italic'}}>{cartItem?.variant?.desc}</Text>                  
                  }
                  <View style={{paddingBottom:5, flexDirection:"row", justifyContent:"space-between", }}>
                    <View style={{flexDirection:'row'}}>
                      <Text>Rp {cartItem?.product?.price?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                      <Text>x {cartItem?.item?.qty}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <Text>Rp {(cartItem?.product?.price * cartItem?.item?.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                     
                    </View>
                  </View>
                  
                  <View style={{flexDirection:'row', marginBottom:16}}>
                    <TouchableOpacity style={{marginRight:16}} onPress={()=> handleDeleteCartItem(cartItem?.item?.id)}>
                      <Icon name="trash" style={{fontSize: 32, color: 'red'}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBorder} onPress={()=> handleReduceQty(index)}>
                      <Icon name="remove" />
                    </TouchableOpacity>
                    <TextInput 
                      keyboardType={'numeric'} 
                      onChangeText={text => handleSetQty(text, index)}
                      value={cartItem.item.qty.toString()} 
                      style={{ height: 30, width: 40, textAlign:'center', borderBottomColor: 'gray', borderBottomWidth: 1, marginLeft:5, marginRight:5 }}
                      />
                    <TouchableOpacity style={styles.iconBorder} onPress={()=> handleAddQty(cartItem?.product?.id)}>
                      <Icon name="add" />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            ))}              
          </Content>
          <Footer>
            <FooterTab>
              <Button style={{ backgroundColor: "#009975", flex: 2 }}>
                  <Text style={{ color: "#ffffff", fontSize: 10, marginTop: 5 }}>
                    {props.cart.totalData}
                  </Text>
                  <Text style={{ color: "#ffffff", fontSize: 10, marginTop: 5 }}>Produk</Text>
              </Button>
              <Button style={{ backgroundColor: "#009975", flex: 2 }} >
                  <Text style={{ color: "#ffffff", fontSize: 10, marginTop: 5 }}>
                    Rp {props.cart.cartSubtotal.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Text>
                  <Text style={{ color: "#ffffff", fontSize: 10, marginTop: 5 }}>Subtotal</Text>
              </Button>
              <Button style={{ backgroundColor: "#e83e3e", flex: 3}} onPress={handleToCheckout}>
                  <Text style={{ color: "#ffffff"}}>
                    Checkout
                  </Text>
              </Button>
            </FooterTab>        
          </Footer>
      </>
      :
      <View>     
          <Image style={{width:"auto", height:300}} source={{uri:'http://m.omiyago.com/public/images/global/empty_product.png'}} />
      </View>
    }
    </Container>
  );
  
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: (data) => dispatch({ type: actionType.FETCH_CART, payload: data }),
  }
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keranjang);

const styles = {
  product:{
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    flexDirection: 'row',
    marginBottom: 10
  },
  editBorder : {
    borderColor: '#009975',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    padding: 4,
    marginLeft: 4
  },  
  iconBorder:{
    width:30, 
    height:30, 
    justifyContent:'center', 
    alignItems:'center' ,
    borderColor: 'gray', 
    borderWidth:1, 
    borderRadius:20,
  },
  ModalOuterContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(00, 00, 00, 0.5)'
  },
  ModalInnerContainer:{
      backgroundColor: '#fff',
      width: 300,
      height: 200,
      borderRadius: 4,
      padding: 10
  }
}