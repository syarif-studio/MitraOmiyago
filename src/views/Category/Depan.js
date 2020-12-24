import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import CategoryHeader from '../../components/CategoryHeader';

const ITEM_SIZE = 170;
const ENDPOINT =
  'https://office.omiyago.com/api/product/demo/fe01ce2a7fbac8fafaed7c982a04e229T2ZmaWNlT21peWFnbw==dfiu6aewruif3Kdl4395lkjLKdfg043Ar33gs0i22MyDad';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
//const { datas, navigation } = props;
//const toDetail = (params) => {
//navigation.navigate('Detail', { index: params })
//}

export default class Screen extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.setState({ loading: true });

    Axios.get(ENDPOINT)
      .then((res) => {
        let data = [];
        let response = res.data.data;
        for (let i = 0; i < response.length; i++) {
          data.push({
            id: response[i].product.id,
            title: response[i].product.detail.name,
            price: response[i].product.price,
            img: response[i].product.image.url,
          });
        }
        this.setState({ data });
      })
      .catch()
      .finally(() => this.setState({ loading: false }));
  }

  handleOpenActionSheet() {
    this.RBSheet.open();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoryHeader
          navigation={this.props.navigation}
          handleOpenActionSheet={this.handleOpenActionSheet.bind(this)}
        />
        <View style={styles.container}>
          {this.state.loading == false && (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback>
                  <View style={styles.card}>
                    <Image
                      source={{ uri: item.img }}
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
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={200}
          duration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            },
          }}>
          <View style={styles.sheetItem}>
            <Text
              style={styles.sheetText}
              onPress={() => this.props.navigation.navigate('Home')}>
              Beranda
            </Text>
          </View>
          <View style={styles.sheetItem}>
            <Text style={styles.sheetText}>Kategori</Text>
          </View>
          <View style={styles.sheetItem}>
            <Text
              style={styles.sheetText}
              onPress={() => this.props.navigation.navigate('Promo')}>
              Promo
            </Text>
          </View>
          <View style={styles.sheetItem}>
            <Text
              style={styles.sheetText}
              onPress={() => this.props.navigation.navigate('Faq')}>
              Bantuan
            </Text>
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  sheetItem: {
    height: 50,
    paddingLeft: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sheetText: {
    color: '#222',
  },
});
