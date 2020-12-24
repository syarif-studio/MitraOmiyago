import React from 'react';
import { Card } from 'native-base';
import { Image, View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity,  StyleSheet,
    TouchableWithoutFeedback, } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
//import SkeletonContent from "react-native-skeleton-content-nonexpo";
const ITEM_SIZE = 170;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
const ProductItemCard = (props) => {
    const { datas, navigation } = props;
    const { cardContainer } = styles;

    const toDetail = (params) => {
        navigation.push('Detail', { index: params, source: props.source })
    }

    const isLoading =  !datas.length;

    return (
        <SafeAreaView>
                
                <FlatList
           contentContainerStyle={{ alignItems: 'center' }}
           data={datas}
           keyExtractor={(item, index) => props.source + index + item.id}
           horizontal={false}
           numColumns={2}
           showsHorizontalScrollIndicator={false}
           initialNumToRender={2}
           renderItem={
               ({item : product, index}) => {
                   const productIndex = index;
                   return (
              <TouchableWithoutFeedback onPress={() => toDetail(productIndex)}>
                <View style={styles.card}>
                    <ShimmerPlaceHolder autoRun={true} visible={true}>
                        <Image style={{ width: ITEM_SIZE,
                      height: ITEM_SIZE,
                      alignItems: 'center',
                      justifyContent: 'center' }} source={{ uri: product.image }} resizeMethod="resize" />
                   </ShimmerPlaceHolder>
                  
                  <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <Text style={styles.title}>{product.title}</Text>
                    </View>
                    <View style={{ justifyContent:'space-around'}}>
                          {(product.base_price !== product.price) &&
                              <Text style={{ fontSize: 14, textDecorationLine: 'line-through' }}>
                                 Rp. {numberWithCommas (product.base_price)}
                              </Text>
                          }
                          <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgb(250, 89, 29)" }}>
                              Rp. {numberWithCommas (product.price)}
                          </Text>
                      </View>
                    
                  </View>
                     
                </View>
              </TouchableWithoutFeedback>
                    )
                }
            }            
        />
           
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    card: {
      width: ITEM_SIZE,
      margin: 6,
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 5
    },
    footer: {
      padding: 5
    },
    title: {
      fontSize: 13,
      margin: 5,
      marginBottom: 0
    },
    price: {
      color: '#333333',
      fontWeight: 'bold',
      margin: 5
    },
    sheetItem: {
      height: 50,
      paddingLeft: 15,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#f5f5f5'
    },
    sheetText: {
      color: '#222'
    },
    shadow:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 1
    },
   
  });
export default ProductItemCard;