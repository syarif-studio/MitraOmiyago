import React, { useState} from 'react';
import { View, FlatList, Image, StatusBar, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
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
  
} from 'native-base';

import flashSale from '../../services/flashSale'
import * as actionType from '../../store/actions/action-types';
import { connect } from 'react-redux';
import { retrieveData } from "../../services/storage"

const ITEM_SIZE = 170;
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FlashSale = (props) => {

  const[isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {

    const fetchData = async () => {
      const response = await flashSale.getFlashSale().catch((err) => { console.error(err); });  
      setIsLoading(false)
      if(response?.data){           
        var cardData = [];            
        for (let i = 0; i < response?.data?.length; i++) {
          var item = {
            "id"       : response?.data[i].product.id,
            "title"    : response?.data[i].product.detail.name,
            "price"    : response?.data[i].product.price,
            "base_price"  : response?.data[i].product.base_price,
            "image"    : response?.data[i].product.image.url,
            "features" : response?.data[i].product.detail.summary,
            "body"     : response?.data[i].product.detail.description,
            "stock"    : response?.data[i].product.status.stock
          }
          
          cardData.push(item)
        }         
        props.fetchFlashsale(cardData)
      }
    };
      
    fetchData();

  }, []);

  return (
    <Container style={{flex:1, paddingTop:StatusBar.currentHeight}}>
      <Header style={{backgroundColor: '#fff'}}>
        <Left>
          <Button transparent onPress={()=>props.navigation.goBack()}>
            <Icon style={{color:"#212529"}} name='arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:"#212529", marginLeft: -20}}>Flash Sale</Title>
        </Body>
      </Header>
      
      <SafeAreaView>         
        <View style={styles.container}>
          {
            !isLoading &&
            (
              props.flashsaleProducts ?
              <FlatList
              contentContainerStyle={{ alignItems: 'center' }}
                data={props.flashsaleProducts}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Detail', { index, source: 'flashsaleProducts'})}>
                    <View style={styles.card}>
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: ITEM_SIZE,
                          height: ITEM_SIZE,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }} resizeMethod="resize"
                      />
                  
                      <View style={styles.footer}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={{ justifyContent:'space-around'}}>
                            {(item.base_price !== item.price) &&
                                <Text style={{ fontSize: 22, textDecorationLine: 'line-through' }}>
                                    Rp. {item.base_price}
                                </Text>
                            }
                                <Text style={{ color: "rgb(250, 89, 29)", fontSize: 22 }}>
                                 Rp {numberWithCommas(item.price)}
                            </Text>
                        </View>
                        
                      </View>
                        
                    </View>
                  </TouchableWithoutFeedback>
                )}
                numColumns={2}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
              />
              
              :

              <View style={{ backgroundColor: "#ffffff", height: "100%", padding: 10 }}>
                <Text style={{textAlign:'center',padding:8}}>Tidak ada flash sale yang aktif</Text>
                <Image style={{width:"100%", height:300}} source={{uri:'https://m.omiyago.com/public/images/global/empty_product.png'}} />
              </View>
            )
          }
        </View>
      </SafeAreaView>       
    </Container>
  );
  
}

const styles = {
  ontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  card: {
    width: ITEM_SIZE,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 5
  },
  footer: {
    padding: 5
  },
  title: {
    fontSize: 12,
    margin: 5,
    marginBottom: 0
  },
  price: {
    color: '#333333',
    fontWeight: 'bold',
    margin: 5
  },
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFlashsale: (data) => dispatch({ type: actionType.FETCH_FLASHSALE_PRODUCT, payload: data }),
  }
}

const mapStateToProps = state => {
  return {
    flashsaleProducts: state.flashsaleProducts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);