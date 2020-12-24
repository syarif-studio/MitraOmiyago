import React, { useState} from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
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
  Input
} from 'native-base';
import cart from '../../services/cart'
import { connect } from 'react-redux'
import * as actionType from '../../store/actions/action-types';


const KeranjangBelanja = (props) => {

    const [qty, setQty] = useState(1);

    const data     = props.navigation.getParam("data", null);
    const userData = props.navigation.getParam("userData", null);
    const source   = props.navigation.getParam("source", null);
    const index    = props.navigation.getParam("index", null);

    const handleAddQty = () => setQty(parseInt(qty) + 1)
    const handleReduceQty = () => parseInt(qty) > 1 ? setQty(parseInt(qty) - 1) : setQty(1)
    const handleAddToCart = async () => {      
      //Add to cart
      const add = await cart.addToCart({
        userId    : userData.userId, 
        productId : data.id,
        variantId : data.variant?.id,
        qty    
      }).catch((err)=> console.error(err))

      //Update cart item
      const res = await cart.getCart(userData.userId)
      props.fetchCart(res)
      props.navigation.push('Detail', {notification:res.status, source, index})
    }
 
    return (
      <Container style={{flex:1}}>
        
        <Header transparent style={{backgroundColor: '#fff'}}>
          <Left>
            <Button transparent onPress={()=>props.navigation.goBack()}>
              <Icon style={{color:"212529"}} name='close' />
            </Button>
          </Left>
          <Body >
            <Title style={{color:"212529", marginLeft: -20}}>Detail Produk</Title>
          </Body>
        </Header>
        
        <Content>              
          <View style={{marginBottom:20,  paddingRight:5, paddingLeft:5}}>  

            <View style={{marginBottom:20}} >
              <Card> 
                <CardItem>
                  <Left>
                    <Thumbnail square medium source={{uri: data.image}} />
                    <Body>
                      <Text note>{data.title}</Text>
                      {
                        !!data.variant &&
                        <Text style={{color:'green', fontSize:10, fontStyle:'italic'}}>{`${data.variant?.type} ${data.variant?.name}`}</Text>                  
                      }
                      <Text>Rp {data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', padding:8}}>
              <Text>Jumlah</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.iconBorder} onPress={handleReduceQty}>
                  <Icon name="remove" />
                </TouchableOpacity>
                <TextInput 
                  keyboardType={'numeric'} 
                  onChangeText={text => setQty(text)}
                  value={qty.toString()} 
                  style={{ height: 40, width: 40, textAlign:'center',fontSize:18, borderBottomColor: 'gray', borderBottomWidth: 1, marginLeft:5, marginRight:5 }}
                  />
                <TouchableOpacity style={styles.iconBorder} onPress={handleAddQty}>
                  <Icon name="add" />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View style={{...styles.buyBorder, backgroundColor:"#fff", height:65, alignItems:"center", flexDirection:"row",justifyContent:"space-between"}}>
            <View>
              <Text>Subtotal</Text>
              <Text style={{...styles.textHeader, marginBottom:5}}>Rp {(parseInt(data.price) * qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </View>
            <Button danger style={{height:35}} onPress={handleAddToCart}>
              <Text>Tambah Ke Keranjang</Text>
            </Button>
          </View>
        </Content>       
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
    borderTopWidth: 1,
    borderTopStyle: "solid",
    paddingTop:15,
    marginLeft:20,
    marginRight:20
  },
  iconBorder:{
    width:30, 
    height:30, 
    justifyContent:'center', 
    alignItems:'center' ,
    borderColor: 'gray', 
    borderWidth:1, 
    borderRadius:20,
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(KeranjangBelanja);