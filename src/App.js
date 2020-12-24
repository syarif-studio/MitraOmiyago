import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Router from './router';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import logo from './assets/img/omiyagoLogo.jpeg';
import bnare from './assets/img/bnare.jpg';
import { Provider } from 'react-redux';
import store from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetail from './views/ProductDetail';
import { Root } from 'native-base';
import { GoogleSignin } from '@react-native-community/google-signin';
import { WEB_CLIENT_ID } from './config';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    this._configureGoogleSignIn();

    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 3000);
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={bnare}
            style={{ width: '98%', resizeMode: 'contain' }}
          />
        </View>
      </View>
    );
    return (
      <Provider store={store}>
        {!this.state.isVisible ? (
          <Root>
            <Router />
          </Root>
        ) : (
          Splash_Screen
        )}
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
});
