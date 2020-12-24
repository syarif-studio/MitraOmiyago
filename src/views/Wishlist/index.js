import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
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

import wishlist from '../../services/wishlist';
import * as actionType from '../../store/actions/action-types';
import { connect } from 'react-redux';
import { retrieveData } from '../../services/storage';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const ITEM_SIZE = 170;

const Wishlist = (props) => {
  const { fetchWishlist } = props;
  React.useEffect(() => {
    const fetchData = async () => {
      const userData = await retrieveData('userData');
      if (userData) {
        const response = await wishlist
          .getWishlist(userData.userId)
          .catch((err) => {
            console.error(err);
          });

        if (response?.data) {
          var cardData = [];
          for (let i = 0; i < response.data?.length; i++) {
            var item = {
              id: response?.data[i].product.id,
              title: response?.data[i].product.detail.name,
              price: response?.data[i].product.price,
              image: response?.data[i].product.image.url,
              features: response?.data[i].product.detail.summary,
              body: response?.data[i].product.detail.description,
              stock: response?.data[i].product.status.stock,
            };
            cardData.push(item);
          }
          fetchWishlist(cardData);
        }
      }
    };

    fetchData();
  }, [fetchWishlist]);

  return (
    <Container style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Header style={{ backgroundColor: '#fff' }}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon style={{ color: '#212529' }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: '#212529', marginLeft: -20 }}>Wishlist</Title>
        </Body>
      </Header>

      <Content>
        <View style={styles.container}>
          {props.wishlistProducts && (
            <FlatList
              data={props.wishlistProducts}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('Detail', {
                      index,
                      source: 'wishlistProducts',
                    })
                  }>
                  <View style={styles.card}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: ITEM_SIZE,
                        height: ITEM_SIZE,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />

                    <View style={styles.footer}>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                      <Text style={styles.price}>
                        Rp {numberWithCommas(item.price)}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              numColumns={2}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </Content>
    </Container>
  );
};

const styles = {
  ontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    width: ITEM_SIZE,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 5,
  },
  footer: {
    padding: 5,
  },
  title: {
    fontSize: 12,
    margin: 5,
    marginBottom: 0,
  },
  price: {
    color: '#333333',
    fontWeight: 'bold',
    margin: 5,
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWishlist: (data) =>
      dispatch({ type: actionType.FETCH_WISHLIST, payload: data }),
  };
};

const mapStateToProps = (state) => {
  return {
    wishlistProducts: state.wishlistProducts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
