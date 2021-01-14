import React from 'react';
import Router from './router';
import { Provider } from 'react-redux';
import store from './store/store';
import { Root } from 'native-base';
import { GoogleSignin } from '@react-native-community/google-signin';
import { WEB_CLIENT_ID } from './config';
import Slider from './views/Slider/';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  handleHideSlider = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    this._configureGoogleSignIn();

    var that = this;
    // setTimeout(function () {
    //   that.Hide_Splash_Screen();
    // }, 3000);
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  }

  render() {
    return (
      <Provider store={store}>
        {!this.state.isVisible ? (
          <Root>
            <Router />
          </Root>
        ) : (
          <Slider handleHideSlider={this.handleHideSlider} />
        )}
      </Provider>
    );
  }
}

export default App;
