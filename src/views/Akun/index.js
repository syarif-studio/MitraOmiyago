import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Text, Button, Title } from 'native-base';
import { removeData, retrieveData } from '../../services/storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Akun extends Component {
  state = {
    userData: null,
  };

  logoutHandler = () => {
    removeData('userData');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
    //this.props.navigation.navigate('Home')
  };

  downloadPdfHandler = () => {
    this.props.navigation.navigate('DisplayPdf');
  };

  async componentDidMount() {
    const user = await retrieveData('userData');
    this.setState({ userData: user });
  }

  render() {
    const user = this.state.userData;
    if (!user) return null;

    return (
      <Container>
        <View
          style={{
            backgroundColor: '#FFF',
            marginTop: 20,
            padding: 16,
            elevation: 1,
          }}>
          <Title style={{ color: '#333', alignSelf: 'center' }}>
            Akun Saya
          </Title>
        </View>
        <Content>
          <View style={{ backgroundColor: '#00D100', padding: 16 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Nama</Text>
              <Text>{user.name}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Email</Text>
              <Text>{user.email}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Telpon</Text>
              <Text>{user.phone}</Text>
            </View>
          </View>
          <View style={styles.Main}>
            <TouchableOpacity
              style={styles.Frow}
              onPress={() => this.props.navigation.navigate('RiwayatBelanja')}>
              <View style={styles.SubMain}>
                <View style={styles.TPromo}>
                  <Text style={styles.TText}>Transaksi</Text>
                  <Text style={{ fontSize: 13 }}>
                    Semua Daftar Riwayat Transaksi
                  </Text>
                </View>
              </View>
              <View style={styles.arr}>
                <Image
                  source={require('../../assets/img/next.png')}
                  style={styles.imgArr}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Main}>
            <TouchableOpacity
              style={styles.Frow}
              onPress={() => this.props.navigation.navigate('Wishlist')}>
              <View style={styles.SubMain}>
                <View style={styles.TPromo}>
                  <Text style={styles.TText}>Wishlist</Text>
                  <Text style={{ fontSize: 13 }}>
                    Lihat Produk yang sudah Anda Wishlist
                  </Text>
                </View>
              </View>
              <View style={styles.arr}>
                <Image
                  source={require('../../assets/img/next.png')}
                  style={styles.imgArr}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Main}>
            <TouchableOpacity
              style={styles.Frow}
              onPress={() => this.props.navigation.navigate('Bantuan')}>
              <View style={styles.SubMain}>
                <View style={styles.TPromo}>
                  <Text style={styles.TText}>Lacak Pesanan</Text>
                  <Text style={{ fontSize: 13 }}>Melacak Order pesananmu</Text>
                </View>
              </View>
              <View style={styles.arr}>
                <Image
                  source={require('../../assets/img/next.png')}
                  style={styles.imgArr}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Main}>
            <TouchableOpacity
              style={styles.Frow}
              onPress={() => this.props.navigation.navigate('Ulasan')}>
              <View style={styles.SubMain}>
                <View style={styles.TPromo}>
                  <Text style={styles.TText}>Ulasan Pelanggan</Text>
                  <Text style={{ fontSize: 13 }}>
                    Berikan penilaian dan ulasan produk
                  </Text>
                </View>
              </View>
              <View style={styles.arr}>
                <Image
                  source={require('../../assets/img/next.png')}
                  style={styles.imgArr}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Button
            bordered
            success
            onPress={this.downloadPdfHandler}
            style={{
              marginTop: 16,
              borderRadius: 8,
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text>Download Katalog Produk</Text>
          </Button>
          <Button
            bordered
            success
            onPress={this.logoutHandler}
            style={{
              marginTop: 16,
              borderRadius: 8,
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
  },
  SubMain: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  img: {
    height: 25,
    width: 25,
  },
  TPromo: {
    marginLeft: 10,
  },
  TText: {
    fontSize: 15,
  },
  arr: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 25,
  },
  Frow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    margin: 10,
    borderBottomColor: '#eee',
  },
  imgArr: {
    height: 10,
    width: 10,
  },
});
