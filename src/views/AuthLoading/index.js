import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import Login from '../Login';
import Akun from '../Akun';
import { retrieveData } from '../../services/storage';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    this.checkSignIn();
  }

  checkSignIn = async () => {
    const userToken = await retrieveData('userData');

    if (userToken) {
      this.setState({
        signedIn: true,
        checkedSignIn: true,
      });
    } else {
      this.setState({
        signedIn: false,
        checkedSignIn: true,
      });
    }
  };

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }

    if (signedIn) return <Akun navigation={this.props.navigation} />;
    else return <Login navigation={this.props.navigation} />;
  }
}
