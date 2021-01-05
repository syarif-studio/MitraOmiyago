import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
} from 'native-base';
import {
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import { Form, Item, Input, Label, DatePicker } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment';

//import ProductItemCard from '../../components/ProductItemCard';
//import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { StyleSheet, FlatList,TouchableWithoutFeedback } from 'react-native';
// import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import register from '../../services/register';
import { storeData } from '../../services/storage';

import { View, Text } from 'react-native';

class Daftar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        userName: '',
        user: '',
        password: '',
      },
      isEnterPassword: false,
      isShowNotification: false,
      notification: '',
      isEmail: false,
    };
  }

  registerHandler = async () => {
    if (this.state.isEnterPassword) {
      let userId = 0;

      try {
        let res;

        if (this.state.isEmail) {
          res = await register.userRegisterEmail(this.state.userData);
        } else {
          res = await register.userRegisterPonsel(this.state.userData);
        }

        userId = res.data.user_id;

        if (userId) {
          await storeData(
            'userData',
            JSON.stringify({
              email: res.data.email,
              name: res.data.first_name,
            })
          );
          ToastAndroid.show(
            'Selamat datang di omiyago, ' + res.data.first_name + '!',
            ToastAndroid.SHORT
          );
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'BottomNavigation' }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({
            notification: res.data,
            isShowNotification: true,
          });
        }
      } catch (err) {}
    } else {
      let isEmail = false;
      let isValid = false;
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (/^\d+$/.test(this.state.userData.email)) {
        isValid = true;
      } else if (emailRegex.test(this.state.userData.email)) {
        isEmail = true;
        isValid = true;
      } else {
        isValid = false;
        this.setState({
          notification: 'Format ponsel/email salah',
          isShowNotification: true,
        });
      }

      if (this.state.userData.name === '') {
        isValid = false;
        this.setState({
          notification: 'Nama tidak boleh kosong',
          isShowNotification: true,
        });
      } else if (this.state.userData.phone === '') {
        isValid = false;
        this.setState({
          notification: 'Telepon tidak boleh kosong',
          isShowNotification: true,
        });
      } else if (this.state.dob === '') {
        isValid = false;
        this.setState({
          notification: 'Tanggal lahir tidak boleh kosong',
          isShowNotification: true,
        });
      }

      if (isValid) {
        this.setState({
          isEnterPassword: true,
          isShowNotification: false,
          isEmail,
        });
      }
    }
  };

  cancelHandler = () => {
    this.setState({
      isEnterPassword: false,
      isShowNotification: false,
    });
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFF' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Login')}>
              <Icon style={{ color: '#333' }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ marginLeft: -25, color: '#333' }}>Daftar</Title>
          </Body>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Right>
              <Title style={{ margin: 15, color: '#333' }}>Masuk</Title>
            </Right>
          </TouchableOpacity>
        </Header>
        <ScrollView>
          <View style={{ margin: 16 }}>
            {this.state.isShowNotification ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FDF2F3',
                  borderColor: '#F9D5D3',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 5,
                  margin: 20,
                }}>
                <Icon name="information-circle" style={{ marginRight: 5 }} />
                <Text>{this.state.notification}</Text>
              </View>
            ) : (
              <View style={{ margin: 20 }}></View>
            )}
            <Image
              style={{ alignSelf: 'center' }}
              source={require('../../assets/img/icon.png')}
            />
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>
              Mitra Omiyago
            </Text>

            <Form style={{ paddingRight: 16 }}>
              {this.state.isEnterPassword ? (
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input
                    secureTextEntry={true}
                    value={this.state.userData.password}
                    onChangeText={(password) =>
                      this.setState({
                        userData: { ...this.state.userData, password },
                      })
                    }
                  />
                </Item>
              ) : (
                <>
                  <Item floatingLabel>
                    <Label>Nama Lengkap</Label>
                    <Input
                      value={this.state.userData.name}
                      onChangeText={(name) =>
                        this.setState({
                          userData: { ...this.state.userData, name },
                        })
                      }
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                      value={this.state.userData.email}
                      onChangeText={(email) =>
                        this.setState({
                          userData: { ...this.state.userData, email },
                        })
                      }
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label>No. Telepon</Label>
                    <Input
                      value={this.state.userData.phone}
                      onChangeText={(phone) =>
                        this.setState({
                          userData: { ...this.state.userData, phone },
                        })
                      }
                    />
                  </Item>
                  <View style={{ flexDirection: 'column' }}>
                    <Label style={{ marginTop: 10, marginLeft: 10 }}>
                      Tanggal Lahir
                    </Label>
                    <DatePicker
                      defaultDate={new Date(2018, 4, 4)}
                      minimumDate={new Date(1923, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={'en'}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={'fade'}
                      androidMode={'default'}
                      placeHolderText="Select date"
                      textStyle={{ color: 'green' }}
                      placeHolderTextStyle={{ color: '#d3d3d3' }}
                      onDateChange={(dob) => {
                        dob = moment(dob).format('YYYY-MM-DD');
                        this.setState({
                          userData: { ...this.state.userData, dob },
                        });
                      }}
                      disabled={false}
                    />
                  </View>
                </>
              )}
            </Form>
            <Button
              block
              onPress={this.registerHandler}
              style={{
                marginTop: 30,
                marginLeft: 10,
                marginRight: 10,
                backgroundColor: '#009975',
              }}>
              <Text style={{ color: '#ffffff', fontSize: 17 }}>
                {this.state.isEnterPassword ? 'Daftar' : 'Lanjut'}
              </Text>
            </Button>
            {this.state.isEnterPassword ? (
              <Button
                block
                style={{
                  marginTop: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: '#D35757',
                }}
                onPress={this.cancelHandler}>
                <Text style={{ color: '#ffffff', fontSize: 17 }}>Batal</Text>
              </Button>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Daftar;
