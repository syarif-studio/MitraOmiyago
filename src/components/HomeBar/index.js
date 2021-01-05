import React, { Component } from 'react';
import { Header, Button } from 'native-base';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { retrieveData, storeData } from '../../services/storage';

export default class HomeBar extends Component {
  state = {
    searchIcon: this.props.searchIcon || faSearch,
    searchText: this.props.text || '',
    notifCount: 0,
  };

  componentDidMount = async () => {
    const userNotif = await retrieveData('userNotif');
    this.setState({ notifCount: userNotif.count });
  };

  onPressSearchIcon = () => {
    this.setState({ searchIcon: faSearch, searchText: '' });
    this.props.navigation.getParam('onCloseSearch')();
  };

  onChangeText = (text) => {
    this.props.navigation.getParam('onSearchProduct')(text);
    this.setState({ searchText: text });
  };

  onStartSearch = () => {
    this.setState({ searchIcon: faAngleLeft });
  };

  handleToNotif = async () => {
    const storeNotif = await storeData(
      'userNotif',
      JSON.stringify({ count: 0 })
    );
    this.props.navigation.navigate('Notification');
  };

  render() {
    const { icon } = styles;

    return (
      <View style={[styles.wrapper, this.props.styles]}>
        {this.props.user ? (
          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: 4,
              paddingHorizontal: 8,
            }}>
            <Text>{`Halo ${this.props.user.first_name}`}</Text>
          </View>
        ) : (
          <View />
        )}
        <View
          style={{
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Promo')}>
            <FontAwesomeIcon icon={faEnvelope} style={icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleToNotif}>
            <FontAwesomeIcon icon={faBell} style={icon} />
            {this.state.notifCount ? (
              <View style={styles.badge}>
                <Text
                  style={{ fontSize: 9, color: '#fff', position: 'relative' }}>
                  {this.state.notifCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight(),
    height: 32 + getStatusBarHeight(),
  },
  icon: {
    marginRight: 3,
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 10,
    marginLeft: 3,
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 35,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    color: '#666',
    fontSize: 12,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 7,
    width: 14,
    height: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
