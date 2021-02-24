import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Button, Icon } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import * as actionType from '../../store/actions/action-types';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';

const SearchProduct = (props) => {
  const [searchProduct, setSearchProduct] = React.useState([]);
  const [searchIndex, setSearchIndex] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);

  const toDetail = (params) => {
    props.navigation.push('Detail', {
      index: params,
      source: 'searchProducts',
    });
  };

  const filteringProducts = React.useCallback(
    debounce(() => {
      const filtered = props.allProducts.filter(
        (item) =>
          item.title.toLowerCase().indexOf(props.text.toLowerCase()) !== -1
      );
      setSearchProduct(filtered);
      props.fetchSearchProduct(filtered);
      setIsReady(true);
    }, 300),
    [props.text, props.allProducts]
  );

  React.useEffect(() => {
    setIsReady(false);
    filteringProducts();
  }, [filteringProducts]);

  const searchProductDisplay = searchProduct.filter((product, idx) => idx < 10);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
        padding: 10,
        paddingTop: 54 + getStatusBarHeight(),
      }}>
      <SearchBar
        navigation={props.navigation}
        text={props.text}
        searchIcon={faAngleLeft}
        styles={{ backgroundColor: '#009975' }}
      />
      {isReady &&
        (searchProduct.length ? (
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 7,
                borderBottomColor: '#eaeaea',
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
              }}>
              <Text>Hasil Pencarian {searchProduct.length} Product</Text>
              <Button
                success
                bordered
                small
                iconRight
                onPress={() => props.navigation.navigate('Search')}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#009975',
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}>
                  LIHAT SEMUA
                </Text>
                <Icon name="arrow-forward" />
              </Button>
            </View>
            {searchProductDisplay.map((product, index) => {
              return (
                <TouchableOpacity onPress={() => toDetail(index)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 7,
                      borderBottomColor: '#eaeaea',
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                    }}>
                    <Text style={{ fontSize: 12, flexShrink: 1 }}>
                      {product.title}
                    </Text>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{ marginTop: 2, color: '#ccc' }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{ backgroundColor: '#ffffff', height: '100%', padding: 10 }}>
            <Text>Tidak ada produk ditemukan. Coba kata kunci lainnya</Text>
            <Image
              style={{ width: '100%', height: 300 }}
              source={{
                uri:
                  'http://m.omiyago.com/public/images/global/empty_product.png',
              }}
            />
          </View>
        ))}
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFlashsaleProduct: (data) =>
      dispatch({ type: actionType.FETCH_FLASHSALE_PRODUCT, payload: data }),
    fetchSearchProduct: (data) =>
      dispatch({ type: actionType.FETCH_SEARCH_PRODUCT, payload: data }),
    fetchCategoryProduct: (data) =>
      dispatch({ type: actionType.FETCH_CATEGORY_PRODUCT, payload: data }),
    fetchOmiyagoProduct: (data) =>
      dispatch({ type: actionType.FETCH_OMIYAGO_PRODUCT, payload: data }),
    fetchNewProduct: (data) =>
      dispatch({ type: actionType.FETCH_NEW_PRODUCT, payload: data }),
    fetchPopulerProduct: (data) =>
      dispatch({ type: actionType.FETCH_POPULER_PRODUCT, payload: data }),
  };
};

const mapStateToProps = (state) => {
  return {
    flashsaleProducts: state.flashsaleProducts,
    searchProducts: state.searchProducts,
    categoryProducts: state.categoryProducts,
    omiyagoProducts: state.omiyagoProducts,
    newProducts: state.newProducts,
    populerProducts: state.populerProducts,
    allProducts: state.allProducts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
