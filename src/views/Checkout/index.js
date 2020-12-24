import React, { useState, useRef} from 'react';
import { View } from 'react-native';
import { 
  Container, 
  Button, 
  Text, 
  Header, 
  Left, 
  Body, 
  Title, 
  Icon,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Input,
  ActionSheet,
  Toast
} from 'native-base';
import {  ScrollView, TouchableOpacity, Image } from "react-native";
import checkout from './../../services/checkout'
import Cart from '../../components/Cart'
import Address from '../../components/Address'
import UsePoint from "../../components/UsePoint"
import { connect } from 'react-redux'
import { retrieveData } from "../../services/storage"
import * as actionType from '../../store/actions/action-types';
import { text } from '@fortawesome/fontawesome-svg-core';

const priceFormat = (price) => {
  
  if(!price) return '0'

  if( price.includes('.') )
    return price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


const Checkout = (props) => {

    const [toggleCoupon, setToggleCoupon] = useState(false);
    const [coupon, setCoupon] = useState('')
    const [couriers, setCouriers] = useState(null);
    const [courier, setCourier] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [point, setPoint] = useState(0)

    React.useEffect(()=>{
      getUserData()
    },[])

    const getUserData = async() => {
      const userData = await retrieveData('userData')
     
      if(userData){
        const cart = await checkout.getCart(userData.userId)    
        
        props.fetchCart(cart)    
        
        setUserData(userData)
        
        setIsLoading(false)

        if(cart && cart.cartAddress && cart.cartAddress.id) {
          let couriers = await checkout.getCourier(userData.userId, cart.cartAddress.id)
          
          couriers.data = couriers.data.filter(({shipping}) => {
            return ((shipping.status_desc === "Digunakan") && (shipping.carrier_id !== 158)  && (shipping.carrier_id !== 9))
          })          
          setCouriers(couriers)   
        }   
        else{
          const addrs = await checkout.getAddress(userData.userId) 
          if(addrs && addrs.data && Array.isArray(addrs.data)){
            for(var i = 0; i<addrs.data.length; i++){
              if(addrs.data[i].address.default){
                let couriers = await checkout.getCourier(userData.userId, addrs.data[i].address.id)
                couriers.data = couriers.data.filter(({shipping}) => {
                  return ((shipping.status_desc === "Digunakan") && (shipping.carrier_id !== 158)  && (shipping.carrier_id !== 9))
                })          
                setCouriers(couriers)   
                break
              }
            }
          }
        }     
      }
    }
    
    const cartVoucher = props.cart && props.cart.cartVoucher
    const cartAddress = props.cart && props.cart.cartAddress
    const isUsingCoupon  = cartVoucher && cartVoucher.value

    const removeCoupon = async() => {
      const updateCoupon = await checkout.updateCart(userData.userId, cartVoucher.code, 'remove_voucher')  
      const updateCart = await checkout.getCart(userData.userId)   
      props.fetchCart(updateCart) 
      if(updateCoupon.data){
         Toast.show({
          type: updateCoupon.success === 'true' ? 'success' : 'warning',
          text: updateCoupon.data,
          buttonText: "Okay",                   
          duration: 3000
        })
      }
    }

    const addCoupon = async() => {
      const updateCoupon = await checkout.updateCart(userData.userId, coupon, 'voucher')  
      const updateCart = await checkout.getCart(userData.userId)    
      
      const isValid = updateCart?.data.find(item => item?.voucher?.status)   
      if(isValid){
        props.fetchCart(updateCart) 
        if(updateCoupon.data){
          Toast.show({
            type: updateCoupon.success === 'true' ? 'success' : 'warning',
            text: updateCoupon.data,
            buttonText: "Okay",          
            duration: 3000
          })
        }
      }
      else{
        Toast.show({
          type: 'warning',
          text: 'Tidak dapat menggunakan voucher tersebut',
          buttonText: "Okay",          
          duration: 3000
        })
        updateCoupon = await checkout.updateCart(userData.userId, cartVoucher.code, 'remove_voucher') 
      }
    }

    const handleCoupon = () => {
      if(isUsingCoupon){
        removeCoupon()        
      }
      else if(toggleCoupon){        
        addCoupon()   
      }
      setToggleCoupon(!toggleCoupon)
    }

    const handleSelectCourier = () =>{
                      
      if(couriers && couriers.totalData){
        ActionSheet.show(
          {
            options: courierOptions,
            cancelButtonIndex: couriers.totalData,
            destructiveButtonIndex: couriers.totalData,
            title: "Pilih Kurir"
          },
          async buttonIndex => {
            if(couriers.data[buttonIndex] && couriers.data[buttonIndex].shipping.carrier_id){
              const updateCourier = await checkout.updateCart(userData.userId, couriers.data[buttonIndex].shipping.carrier_id, 'courier')  
              const updateCart = await checkout.getCart(userData.userId)     
              props.fetchCart(updateCart) 
              setCourier( couriers.data[buttonIndex]);
              if(updateCourier.data){
                Toast.show({
                 type: updateCourier.success === 'true' ? 'success' : 'warning',
                 text: updateCourier.success === 'true' ? 'Kurir berhasil dipilih' : updateCourier.data,
                 buttonText: "Okay",          
                 duration: 3000
               })
             }
            }            
          }
        )
      }
      else{        
        Toast.show({
          type: 'warning',
          text: 'Pilih alamat dulu',
          buttonText: "Okay",          
          duration: 3000
        })
      }
      
    }

    const handleUpdateCart = async () => {
      const updateCart = await checkout.getCart(userData.userId)     
      props.fetchCart(updateCart) 
    }

    const handleUpdateCouriers = async (id) => {
      let couriers = await checkout.getCourier(userData.userId, id)
      couriers.data = couriers.data.filter(({shipping}) => {
        return ((shipping.status_desc === "Digunakan") && (shipping.carrier_id !== 158)  && (shipping.carrier_id !== 9))
      })          
      setCouriers(couriers)   
    }

    const handlePayment = () => {
      if(props.cart.cartCarrier && props.cart.cartCarrier.name){
        props.navigation.navigate('Payment')
      }
      else{
        Toast.show({
          type: 'warning',
          text: 'Pilih kurir pengiriman dulu',
          buttonText: "Okay",          
          duration: 3000
        })
      }
    }

    let courierOptions = couriers && couriers.data && Array.isArray(couriers.data) && couriers.data.map(({shipping}) => shipping.service_display + ' : Rp ' + priceFormat(shipping.cost) )
    if(Array.isArray(courierOptions)){
      courierOptions.push('Cancel')
    }

    return (
      <Container style={{flex:1}}>
        <ScrollView>
          <Header transparent style={{borderBottomColor: "#eaeaea", borderBottomWidth: 2, borderBottomStyle: "solid"}}>
            <Left>
              <Button transparent onPress={()=>props.navigation.goBack()}>
                <Icon style={{color:"#01906e"}} name='arrow-back' />
              </Button>
            </Left>
            <Body >
              <Title style={{color:"#01906e", marginLeft: -35}}>Checkout</Title>
            </Body>
          </Header>

          { isLoading ? null :
            
            props.cart && Array.isArray(props.cart.data) && userData ?
          
            <Content style={{paddingLeft: 15, paddingRight: 15}}>         

              <View style={{...styles.viewBorder, marginBottom:20, paddingBottom:20, paddingTop:5}} >
                <Card> 
                  <View style={{padding: 10, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    {!isUsingCoupon && toggleCoupon ? 
                      <Input onChangeText={text => setCoupon(text)} placeholder='Kode voucher/promo' style={{height:50,borderWidth:1,borderStyle:"solid",borderColor:"#01906e",marginRight:10}} /> 
                      :
                      <Text style={{color:"#01906e", fontSize: 15}}>Gunakan promo Omiyago</Text>
                    }
                    <Button small warning
                      onPress={handleCoupon}
                    > 
                      { isUsingCoupon ?
                        <Text uppercase={false}>Batal</Text>
                        :
                        <Text uppercase={false}>{toggleCoupon ? "OK" : "Kupon"}</Text>
                      }
                     
                    </Button>
                  </View>
                  { isUsingCoupon &&
                    <View style={{padding: 10, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                      <Text>{cartVoucher.code}</Text>
                      <Text>{cartVoucher.metode === 'percent' ? `${cartVoucher.value}%` : `Rp ${priceFormat(cartVoucher.discount)}`}</Text>
                    </View>
                  }
                  
                </Card>
                <UsePoint userData={userData} updateCart={handleUpdateCart} onSetPoint={(value)=>setPoint(value)}/>
              </View>

              <View style={{marginBottom:20,  paddingRight:15, paddingLeft:15}}>
                
                <Address 
                  userData={userData} 
                  address={cartAddress} 
                  updateCart={handleUpdateCart}
                  updateCouriers={handleUpdateCouriers}
                />

                <View style={{marginBottom:20}} >
                  <Card>
                    <CardItem header>
                      <Text style={{...styles.textBorder, ...styles.textHeader, width:"100%", paddingBottom:5}}>Produk</Text>
                    </CardItem>
                    <Cart userData={userData} />
                  </Card>           
                </View>

                <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:16}}>              
                  <Text>Pilih Kurir</Text>
                  <Button success small
                    onPress={handleSelectCourier}>
                    <Text uppercase={false}>Pilih</Text>
                  </Button>
                </View>
                {
                    props.cart.cartCarrier && props.cart.cartCarrier.name ?
                    <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:20, paddingBottom:20, ...styles.textBorder}}>              
                      <Text>{props.cart.cartCarrier.name}</Text>      
                      <Text>Rp {priceFormat(props.cart.cartCarrier.cost)}</Text> 
                    </View>
                    :
                    <Text style={{marginBottom:20}}>{props.cart.cartCarrier.status}</Text>
                }                       

                <View style={{...styles.textBorder, paddingBottom:20, marginBottom:20}}>
                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>              
                      <Text>Pilih Box</Text>
                      <Button success small>
                        <Text uppercase={false}>Pilih</Text>
                      </Button>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                      <View style={{borderWidth:1,borderStyle:"solid",borderColor:"#ccc",padding:5,marginRight:20}}>
                        <Thumbnail square style={{width:75}} source={{uri: 'https://m.omiyago.com/public/images/box/box_standart.png'}} />
                      </View>              
                      <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
                        <Text uppercase={false}>Standart</Text>
                        <Text uppercase={false}>Gratis</Text>
                      </View> 
                  </View>
                </View>

                <View style={{...styles.viewBorder, paddingBottom:20, marginBottom:20 }}>
                  <Text style={{...styles.textBorder, paddingBottom:8, ...styles.textHeader}}>
                    Ringkasan Belanja
                  </Text>
                  <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}} >
                    <Text style={styles.textSub}>Sub total</Text>
                    <Text style={styles.textSub}>Rp {priceFormat(props.cart.cartSubtotal)}</Text>
                  </View>
                  <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}} >
                    <Text style={styles.textSub}>Shipping</Text>
                    <Text style={styles.textSub}>Rp {priceFormat(props.cart.cartCarrier.cost)}</Text>
                  </View>
                  <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}} >
                    <Text style={styles.textSub}>Potongan</Text>
                    <Text style={styles.textSub}>{cartVoucher.metode === 'percent' ? `${cartVoucher.value}%` : `Rp ${priceFormat(cartVoucher.discount)}`}</Text>
                  </View>
                  {
                      point > 0 && (
                        <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}} >
                                    <Text style={styles.textSub}>PotonganPoin</Text>
                                    <Text style={styles.textSub}>Rp -{priceFormat(point)}</Text>
                        </View>
                      )
                      }
                  <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}} >
                    <Text style={styles.textSub}>Box</Text>
                    <Text style={styles.textSub}>Rp 0</Text>
                  </View>
                </View>
                
                 
                

                <Button small style={{width:"100%",alignItems:"center",justifyContent:"center",backgroundColor:"#007bff"}}
                onPress={() => props.navigation.navigate('Home')} >
                  <Text uppercase={false} style={{}} >
                    Lanjut Belanja
                  </Text>
                </Button>                 

              </View>

            </Content>
            :
            <View>     
                <Image style={{width:"auto", height:300}} source={{uri:'https://m.omiyago.com/public/images/global/empty_product.png'}} />
                <Text style={{fontSize: 23,fontWeight:'bold', textAlign: 'center', marginBottom: 10}}>Keranjang Belanjamu Kosong</Text>
                <Text style={{fontSize: 15, textAlign: 'center', marginBottom: 10}}>Daripada di kosongin keranjang mu, mending isi dengan produk omiyago</Text>
                <Button block success onPress={() => props.navigation.navigate('Home')} style={{marginLeft: 20, marginRight: 20, backgroundColor:"#009975"}}>
                  <Text style={{fontSize: 15}}>Mulai Belanja</Text>
                </Button>
            </View>
            
          }
        </ScrollView>
        

        <View style={{...styles.buyBorder, backgroundColor:"#fff", height:65, alignItems:"center", flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{...styles.textHeader, marginBottom:5}}>Rp {priceFormat(props.cart && props.cart.cartTotal)}</Text>
          <Button danger style={{height:35}} onPress={handlePayment}>
            <Text>Bayar</Text>
          </Button>
        </View>
      </Container>
    );
  
}

const styles = {
  textHeader:{
    fontSize:17, 
    fontWeight:"600",
    color:"#474747"
  },
  textSub:{
    fontSize:14, 
    fontWeight:"600",
    color:"#212529"
  },
  textBorder:{
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    borderBottomStyle: "solid"
  },
  viewBorder:{
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 4,
    borderBottomStyle: "solid"
  },
  buyBorder:{
    borderTopColor: "#e6e6e6",
    borderTopWidth: 4,
    borderTopStyle: "solid",
    paddingTop:15,
    marginLeft:20,
    marginRight:20
  },
  product:{
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    flexDirection: 'row',
    marginBottom: 10
  },
  
};


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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);