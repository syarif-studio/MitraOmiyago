import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import Login from '../Login';
import { retrieveData } from '../../services/storage';

export default class HomeAuth extends React.Component {
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
      this.props.navigation.navigate('BottomNavigation');
    } else {
      this.setState({
        signedIn: false,
        checkedSignIn: true,
      });
    }
  };

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn || signedIn) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }

    return <Login navigation={this.props.navigation} />;
  }
}
