import React, { Component } from 'react'
import { Container, Header, Badge, Input, Icon, Button, Grid, Row, Right } from 'native-base';
import { View,TouchableOpacity, TextInput, StyleSheet,Text } from 'react-native';
import HeaderHomeButton from '../HeaderHomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faAngleLeft,
  faShoppingBag,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import * as actionType from '../../store/actions/action-types';

class SearchDetail extends Component {
    state = {
        searchIcon:faSearch,
        searchText: ''
      };
  
      onPressSearchIcon = () => {
        this.setState({searchIcon:faSearch});
        this.setState({searchText:''});
        this.props.navigation.getParam('onCloseSearch')();
      };
  
      onChangeText = (text) => {
        this.props.navigation.getParam('onSearchProduct')(text);
        this.setState({searchText: text});
      }
  
      onStartSearch = () => {
        this.setState({searchIcon:faAngleLeft});
      }
  
    render() {
        const { icon } = styles;
       // const iconSearchStyle = { marginRight: 3, color: '#ccc' };
       
       const cartCount = this.props.cart && Array.isArray(this.props.cart.data) ? this.props.cart.totalData : 0;
        return (
            <Header searchBar rounded  style={{ backgroundColor: "#009975"}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <FontAwesomeIcon icon={faAngleLeft} style={styles.icon} style={{marginTop:15, color: '#ffffff'}} size={20} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Button transparent style={{width:30,height:30}} onPress={this.onPressSearchIcon}>
                        <FontAwesomeIcon icon={faSearch} style={styles.icon} style={{marginTop:2, color: '#ccc'}} />
                    </Button>
                    <TextInput style={styles.searchInput} placeholder="Cari di omiyago..." onChangeText={this.onChangeText} onFocus={this.onStartSearch} value={this.state.searchText}/>
                </View>
               
                <Right style={{ maxWidth: "10%" }}>
                    <Button transparent onPress={() => this.props.navigation.navigate('Keranjang')} style={{position:'relative'}} >   
                        <FontAwesomeIcon icon={faShoppingBag} style={{color:'#FFF', marginLeft:10}} />
                        <View style={styles.badge}>
                          <Text style={{fontSize:9, color:'#FFF', position:'relative'}}>{cartCount}</Text>
                        </View>
                    </Button>
                </Right>
            </Header>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: (data) => dispatch({ type: actionType.FETCH_CART, payload: data }),
  }
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetail);


const styles = StyleSheet.create ({
    icon: {
        marginRight: 3,
        color: "#ffffff"
    },
    badge:{
      position: 'absolute',
      right: 10,
      top: 10,
      backgroundColor: 'red',
      borderRadius: 7,
      width: 14,
      height: 14,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
        marginTop:10
      },
      searchInput: {
        flex: 1,
        color: '#666',
        fontSize: 12
      }
});