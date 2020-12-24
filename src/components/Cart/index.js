import React, { Component } from 'react';
import { Image, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Container, Header, FooterTab, Content, Footer, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View,Title, ActionSheetk , Spinner } from 'native-base';
import cart from './../../services/cart'
import { connect } from 'react-redux'
import * as actionType from '../../store/actions/action-types';

const Cart = ({userData, ...props})=> {  

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
    <View>
      { props.cart && Array.isArray(props.cart.data) &&
        <>    
          <View style={{paddingLeft:16, paddingRight:16}}>
            {props.cart.data && props.cart.data.map((cartItem, index)=>(
              <View style={styles.product}>
                <View style={{marginRight:20}}>
                  <Thumbnail square small source={{uri: cartItem?.product?.image?.url}} />
                </View>
                <View style={{flex:1}}>
                  <Text>{cartItem.product.detail.name}</Text>
                  {
                    !!cartItem?.variantId?.status &&
                    <Text style={{color:'red', fontSize:10, fontStyle:'italic'}}>{cartItem?.variantId?.desc}</Text>                  
                  }
                  {
                    !cartItem?.voucher?.status && props.cart?.cartVoucher?.id &&
                    <Text style={{color:'red', fontSize:10, fontStyle:'italic'}}>voucher tidak berlaku</Text>                  
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
                      style={{ height: 40, width: 40, textAlign:'center', borderBottomColor: 'gray', borderBottomWidth: 1, marginLeft:5, marginRight:5 }}
                      />
                    <TouchableOpacity style={styles.iconBorder} onPress={()=> handleAddQty(cartItem?.product?.id)}>
                      <Icon name="add" />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            ))}              
          </View>
      </>
    }
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

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