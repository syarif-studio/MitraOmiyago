import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity as Button,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { shuffle } from 'lodash';
import CategoryHeader from '../../components/CategoryHeader';
import * as actionType from '../../store/actions/action-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faSort,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import product from '../../services/product';
import Loading from '../../components/Loading';

const ITEM_SIZE = 170;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const SORT_MODES = ['price_highest', 'price_lowest'];

class ProductCategory extends Component {
  state = {
    data: [],
    subCategories: [],
    loading: false,
    isModalVisible: false,
    sortMode: null,
  };

  componentDidMount() {
    this.fetchProducts();
    this.fetchSubCategoryProduct(this.props.navigation.getParam('catId', 0));
  }

  componentWillUnmount() {
    this._timeout && clearTimeout(this._timeout);
  }

  fetchProducts = () => {
    const catId = this.props.navigation.getParam('catId', null);
    this.setState({ loading: true });

    if (catId === 'terbaru') {
      this.fetchNewProduct();
    } else if (catId === 'populer') {
      this.fetchPopulerProduct();
    } else if (catId === 'rekomendasi') {
      this.fetchRecomendasiProduct();
    } else if (catId === 'flashsale') {
      this.fetchFlashsaleProduct();
    } else {
      this.fetchCategoryProduct(catId);
    }
  };

  handleOpenActionSheet() {
    this.RBSheet.open();
  }

  fetchProduct = (response, fetchCallback) => {
    if (response) {
      var cardData = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].product.status?.enabled == '1') {
          var item = {
            id: response[i].product.id,
            title: response[i].product.detail.name,
            price: response[i].product.price,
            base_price: response[i].product.base_price,
            image: response[i].product.image.url,
            features: response[i].product.detail.summary,
            body: response[i].product.detail.description,
            stock: response[i].product.status.stock,
          };
          cardData.push(item);
        }
      }
      const shuffleData = shuffle(cardData);
      this.setState({ data: shuffleData, loading: false });
      fetchCallback(shuffleData);
      this._timeout = setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  };

  fetchFlashsaleProduct = async () => {
    const res = await product.getFlashSale().catch((err) => {
      console.error(err);
    });
    this.fetchProduct(res.data, this.props.fetchFlashsaleProduct);
  };

  fetchNewProduct = async () => {
    const res = await product.getNewProduct().catch((err) => {
      console.error(err);
    });
    this.fetchProduct(res.data, this.props.fetchNewProduct);
  };

  fetchCategoryProduct = async (id) => {
    const res = await product.getCategoryProduct(id).catch((err) => {
      console.error(err);
    });
    this.fetchProduct(
      res.data.productCategory,
      this.props.fetchCategoryProduct
    );
  };

  fetchSubCategoryProduct = async (idParentCategory) => {
    const res = await product
      .getSubCategoryProduct(idParentCategory)
      .then((res) => {
        if (res.data) {
          this.setState({
            subCategories: Array.isArray(res.data) ? res.data : [],
          });
        }
      })
      .catch((err) => console.warn(err));
  };

  fetchPopulerProduct = async () => {
    const res = await product.getPopulerProduct().catch((err) => {
      console.error(err);
    });
    this.fetchProduct(res.data, this.props.fetchPopulerProduct);
  };

  fetchRecomendasiProduct = async () => {
    const res = await product.getRecomendasiProduct().catch((err) => {
      console.error(err);
    });
    this.fetchProduct(res.data, this.props.fetchRecomendasiProduct);
  };

  setModalVisible = (isModalVisible) => {
    this.setState({ isModalVisible });
  };

  sortData = (sortMode) => {
    let { data } = this.state;

    if (data.length > 0) {
      if (sortMode === 'price_lowest') {
        data = data.sort((a, b) => a.price - b.price);
      } else if (sortMode === 'price_highest') {
        data = data.sort((a, b) => b.price - a.price);
      }

      this.setState({ data, sortMode });
    }
  };

  handleSort = (sortMode) => {
    this.sortData(sortMode);
    this.setModalVisible(false);
  };

  renderModalSorting = () => {
    const { sortMode } = this.state;

    return (
      <Modal
        isVisible={this.state.isModalVisible}
        backdropColor="#b0dcd2"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitle}>
            <Button onPress={() => this.setModalVisible(false)}>
              <FontAwesomeIcon
                icon={faTimes}
                style={styles.modalTitleIcon}
                size={20}
              />
            </Button>
            <Text style={styles.modalTitleText}>Urutkan</Text>
          </View>
          <View style={styles.modalOptions}>
            <Button
              style={styles.modalOption}
              onPress={() => this.handleSort('price_lowest')}>
              <Text
                style={[
                  styles.modalOptionText,
                  sortMode === 'price_lowest'
                    ? styles.modalOptionTextActive
                    : null,
                ]}>
                Harga Terendah
              </Text>
              {sortMode === 'price_lowest' && (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={styles.modalOptionCheck}
                  size={18}
                />
              )}
            </Button>
            <Button
              style={styles.modalOption}
              onPress={() => this.handleSort('price_highest')}>
              <Text
                style={[
                  styles.modalOptionText,
                  sortMode === 'price_highest'
                    ? styles.modalOptionTextActive
                    : null,
                ]}>
                Harga Tertinggi
              </Text>
              {sortMode === 'price_highest' && (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={styles.modalOptionCheck}
                  size={18}
                />
              )}
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  renderLoading = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Loading isVisible={true} size={70} color="#009975" />
      </View>
    );
  };

  render() {
    const catId = this.props.navigation.getParam('catId', null);
    let source = 'categoryProducts';
    if (catId === 'terbaru') {
      source = 'newProducts';
    } else if (catId === 'populer') {
      source = 'populerProducts';
    } else if (catId === 'rekomendasi') {
      source = 'recomendasiProducts';
    } else if (catId === 'flashsale') {
      source = 'flashsaleProducts';
    }

    const { subCategories, loading } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <CategoryHeader
          navigation={this.props.navigation}
          handleOpenActionSheet={this.handleOpenActionSheet.bind(this)}
        />
        {loading ? (
          this.renderLoading()
        ) : (
          <>
            {subCategories && subCategories.length > 0 && (
              <LinearGradient
                colors={['#fff', '#b0dcd2']}
                style={styles.subCategoryContainer}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {subCategories.map((sc, index) => (
                    <Button
                      key={`sc-${index}`}
                      style={styles.subCategory}
                      activeOpacity={0.7}
                      onPress={() => {
                        this.props.navigation.navigate({
                          routeName: 'ProductCategory',
                          params: { catId: sc.idCategory },
                          key: `${Date.now()}`,
                        });
                      }}>
                      <Image
                        style={styles.subCategoryIcon}
                        source={require('../../assets/img/categories/saos.png')}
                      />
                      <Text style={styles.subCategoryTitle}>
                        {sc.nameCategory}
                      </Text>
                    </Button>
                  ))}
                </ScrollView>
              </LinearGradient>
            )}
            <View style={styles.container}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {
                        index,
                        source,
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
                        resizeMethod="resize"
                      />

                      <View style={styles.footer}>
                        <View
                          style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-around' }}>
                          {item.base_price !== item.price && (
                            <Text
                              style={{
                                fontSize: 14,
                                textDecorationLine: 'line-through',
                              }}>
                              Rp. {item.base_price}
                            </Text>
                          )}
                          <Text style={styles.price}>
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
                removeClippedSubviews={true}
              />
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

            <View
              style={{ position: 'absolute', bottom: 50, left: 0, right: 0 }}>
              <View
                style={{
                  position: 'relative',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button onPress={() => this.setModalVisible(true)}>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      ...styles.shadow,
                    }}>
                    <FontAwesomeIcon
                      icon={faSort}
                      style={{ margin: 5, color: '#aaa' }}
                    />
                    <Text>Sort</Text>
                  </View>
                </Button>
              </View>
            </View>
            {this.renderModalSorting()}
          </>
        )}
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  subCategoryContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  subCategory: {
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 5,
    elevation: 2,
  },
  subCategoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  subCategoryTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#f8f8f8',
  },
  modalTitleIcon: {
    color: '#222',
    marginRight: 20,
  },
  modalTitleText: {
    fontSize: 18,
    color: '#222',
  },
  modalOptions: {
    paddingBottom: 10,
  },
  modalOption: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: 'black',
  },
  modalOptionTextActive: {
    color: '#009975',
  },
  modalOptionCheck: {
    color: '#009975',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFlashsaleProduct: (data) =>
      dispatch({ type: actionType.FETCH_FLASHSALE_PRODUCT, payload: data }),
    fetchCategoryProduct: (data) =>
      dispatch({ type: actionType.FETCH_CATEGORY_PRODUCT, payload: data }),
    fetchNewProduct: (data) =>
      dispatch({ type: actionType.FETCH_NEW_PRODUCT, payload: data }),
    fetchPopulerProduct: (data) =>
      dispatch({ type: actionType.FETCH_POPULER_PRODUCT, payload: data }),
    fetchRecomendasiProduct: (data) =>
      dispatch({ type: actionType.FETCH_RECOMENDASI_PRODUCT, payload: data }),
  };
};

const mapStateToProps = (state) => {
  return {
    flashsaleProducts: state.flashsaleProducts,
    categoryProducts: state.categoryProducts,
    newProducts: state.newProducts,
    populerProducts: state.populerProducts,
    recomendasiProducts: state.recomendasiProducts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);
