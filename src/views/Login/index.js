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
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

//import ProductItemCard from '../../components/ProductItemCard';
//import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { StyleSheet, FlatList,TouchableWithoutFeedback } from 'react-native';
// import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faComments,
  faInfo,
} from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import login from '../../services/login';
import { storeData } from '../../services/storage';

import { View, Text } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnterPassword: false,
      isShowNotification: false,
      notification: '',
      isEmail: false,
      text: '',
      userData: {
        user: '',
        password: '',
      },
    };
  }

  loginHandler = async () => {
    if (this.state.isEnterPassword) {
      const redirect = this.props.navigation.getParam('redirect', null);
      const dataRedirect = this.props.navigation.getParam('dataRedirect', null);
      let data = { ...this.state.userData, password: this.state.text };
      this.setState({
        userData: data,
      });

      let userId = 0;

      try {
        let res;
        if (this.state.isEmail) {
          res = await login.userLoginEmail(data);
        } else {
          res = await login.userLoginPonsel(data);
        }

        userId = res.data.user_id;

        if (userId) {
          storeData(
            'userData',
            JSON.stringify({ ...res.data, name: res.data.first_name, userId })
          );
          if (redirect) {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: redirect,
                  params: dataRedirect,
                }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          } else {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'BottomNavigation' }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          }
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

      if (/^\d+$/.test(this.state.text)) {
        isValid = true;
      } else if (emailRegex.test(this.state.text)) {
        isEmail = true;
        isValid = true;
      } else {
        isValid = false;
        this.setState({
          notification: 'Format ponsel/email salah',
          isShowNotification: true,
        });
      }

      if (isValid) {
        if (!isEmail) {
          const resp = await login.sendOtp(this.state.text);
          if (resp?.data?.user_id) {
            this.setState({
              isEnterPassword: true,
              userData: { ...this.state.userData, user: this.state.text },
              text: '',
              isShowNotification: false,
              isEmail,
            });
          } else {
            this.setState({
              notification: resp.data,
              isShowNotification: true,
            });
          }
        } else {
          this.setState({
            isEnterPassword: true,
            userData: { ...this.state.userData, user: this.state.text },
            text: '',
            isShowNotification: false,
            isEmail,
          });
        }
      }
    }
  };

  cancelHandler = () => {
    this.setState({
      isEnterPassword: false,
      isShowNotification: false,
      text: '',
    });
  };

  _signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo && userInfo.user) {
        const { user } = userInfo;
        const res = await login.userLoginGoogle({
          id_google: user.id,
          email: user.email,
          name: user.name,
        });
        if (res.success == 1) {
          if (res.google_user) {
            await storeData('userData', JSON.stringify(res.google_user));
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'BottomNavigation' }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          }
        }
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          Alert.alert('google cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert('google in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
      }
    }
  };

  render() {
    return (
      <Container style={{ paddingTop: StatusBar.currentHeight }}>
        <ScrollView>
          <View style={styles.container}>
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
            <Text style={styles.TextInput}>
              {this.state.isEnterPassword
                ? this.state.isEmail
                  ? 'Password'
                  : 'OTP'
                : 'Nomor Ponsel atau Email'}
            </Text>
            <Form>
              <Item floatingLabel style={styles.ItemInput}>
                <Input
                  secureTextEntry={this.state.isEnterPassword}
                  value={this.state.text}
                  onChangeText={(text) => this.setState({ text })}
                />
              </Item>
            </Form>
            <Button
              block
              style={styles.ButtonBlock}
              onPress={this.loginHandler}>
              <Text style={styles.TextButton}>
                {this.state.isEnterPassword ? 'Masuk' : 'Lanjut'}
              </Text>
            </Button>
            {this.state.isEnterPassword ? (
              <>
                <Button
                  block
                  style={styles.ButtonBlockCancel}
                  onPress={this.cancelHandler}>
                  <Text style={styles.TextButton}>Batal</Text>
                </Button>

                {this.state.isEmail && (
                  <Button
                    block
                    light
                    style={{ marginTop: 30 }}
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }>
                    <Text style={{ color: '#212529' }}>Lupa Password</Text>
                  </Button>
                )}
              </>
            ) : (
              <View
                style={{
                  paddingVertical: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text>Lupa Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Daftar')}>
                  <Text>Daftar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 32,
  },
  ItemInput: {
    marginTop: -10,
    marginLeft: 0,
  },
  TextInput: {
    paddingTop: 70,
    fontSize: 14,
    color: '#212529',
  },
  ButtonBlock: {
    marginTop: 30,
    backgroundColor: '#009975',
  },
  ButtonBlockCancel: {
    marginTop: 30,
    backgroundColor: '#D35757',
  },
  TextButton: {
    color: '#ffffff',
    fontSize: 17,
  },
  ButtonGoogle: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  ButtonFb: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  GoogleSignInContainer: {
    marginTop: 5,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
