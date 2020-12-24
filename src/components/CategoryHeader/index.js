import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Icon } from 'native-base';
import {
  faSearch,
  faAngleLeft,
  faShoppingBag,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  render() {
    const iconSearchStyle = { marginRight: 3, color: '#ccc' };
    const iconRightStyle = { margin: 5, color: '#fff' };
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
           <Icon name='arrow-back' style={{color: "#fff", marginRight:10}}/>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} style={styles.icon, {...iconSearchStyle}} />
          <TextInput style={styles.searchInput} placeholder="Cari di omiyago..." />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('KeranjangBelanja')}>
        <FontAwesomeIcon icon={faShoppingBag} style={styles.icon, {...iconRightStyle}} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.handleOpenActionSheet()}>
          <FontAwesomeIcon icon={faEllipsisV} style={styles.icon, {...iconRightStyle}} size={20} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009975',
    padding: 8,
    marginTop:25
  },
  icon: {
    marginRight: 3,
    color: '#fff'
  },
  searchContainer: {
    paddingHorizontal: 10,
    marginLeft: 3,
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5
  },
  searchInput: {
    flex: 1,
    color: '#666',
    fontSize: 12
  }
});