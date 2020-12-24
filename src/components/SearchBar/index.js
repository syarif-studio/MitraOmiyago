import React, { Component } from 'react'
import { Header, Button } from 'native-base';
import { View,TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { retrieveData, storeData } from '../../services/storage';

export default class SearchBar extends Component {
  state = {
    searchIcon: this.props.searchIcon || faSearch,
    searchText: this.props.text || '',
    notifCount: 0,
  };

  componentDidMount = async() => {
    const userNotif = await retrieveData('userNotif')
    this.setState({ notifCount: userNotif.count });
  };

  onPressSearchIcon = () => {
    this.setState({ searchIcon: faSearch, searchText: '' });
    this.props.navigation.getParam('onCloseSearch')();
  };

  onChangeText = (text) => {
    this.props.navigation.getParam('onSearchProduct')(text);
    this.setState({ searchText: text });
  }

  onStartSearch = () => {
    this.setState({ searchIcon: faAngleLeft });
  }

  handleToNotif = async() => {
    const storeNotif = await storeData('userNotif',  JSON.stringify({ count: 0 }));
    this.props.navigation.navigate('Notification');
  }

  render() {
    const { icon } = styles;
    const { params } = this.props.navigation.state;
    let bgColor = 'transparent';
    if (params && params.bgColor) bgColor = params.bgColor;
    
    return (
      <View style={[styles.wrapper, { backgroundColor: bgColor }, this.props.styles]}>
        <View style={styles.searchContainer}>
          <Button transparent style={{ width: 30, height: 30}} onPress={this.onPressSearchIcon}>
            <FontAwesomeIcon icon={this.state.searchIcon} style={styles.icon} style={{ marginTop: 2, color: '#ccc' }} />
          </Button>
          <TextInput style={styles.searchInput}
            placeholder="Cari di omiyago..."
            onChangeText={this.onChangeText}
            onFocus={this.onStartSearch}
            value={this.state.searchText}
          />  
        </View>
        <View style={{ width: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Promo')}>
            <FontAwesomeIcon icon={faEnvelope} style={icon} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.handleToNotif}>
            <FontAwesomeIcon icon={faBell} style={icon} />
            {this.state.notifCount ?
              <View style={styles.badge}>
                <Text style={{ fontSize: 9, color: '#fff', position:'relative' }}>{this.state.notifCount}</Text>
              </View>
              : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  wrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
    elevation: 0,
    zIndex: 1,
  },
  icon: {
    marginRight: 3,
    color: '#fff',
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
