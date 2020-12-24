import React, { Component } from 'react'
import { Container, Header, Item, Input, Icon, Button, Text, Grid, Row, Right } from 'native-base';
import { View,TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import HeaderHomeButton from '../HeaderHomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faAngleLeft,
  faShoppingBag,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

export default class SearchBar extends Component {
    render() {
        const { icon } = styles;
       // const iconSearchStyle = { marginRight: 3, color: '#ccc' };
        return (
            <Header searchBar rounded style={{ backgroundColor: "#009975", marginTop:20 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <FontAwesomeIcon icon={faAngleLeft} style={styles.icon} style={{marginTop:15, color: '#ffffff'}} size={20} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchInput}>Akun</Text>
                </View>
               
               
            </Header>
        )
    }
}

const styles = StyleSheet.create ({
    icon: {
        marginRight: 3,
        color: "#ffffff"
    },
    searchContainer: {
        paddingHorizontal: 10,
        marginLeft: 3,
        marginRight: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        
        borderRadius: 5,
        height: 35,
        marginTop:10
      },
      searchInput: {
        flex: 1,
        color: '#fff',
        marginLeft: 30,
        fontSize: 15
      }
});