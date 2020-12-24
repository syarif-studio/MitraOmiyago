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
  Spinner,
} from 'native-base';
import { Image, RefreshControl } from 'react-native';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import faq from '../../services/faq';

//import ProductItemCard from '../../components/ProductItemCard';
//import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { StyleSheet, FlatList,TouchableWithoutFeedback } from 'react-native';
// import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { Text } from 'react-native';

export default class Faq extends Component {
  state = {
    faq: [],
    refreshing: false,
  };

  componentWillMount = async () => {
    this.getFaq();
  };

  getFaq = async () => {
    try {
      const res = await faq.getFaq();
      this.setState({
        faq: res.data.faq,
      });
    } catch (err) {}
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    this.getFaq();
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const { faq, refreshing } = this.state;

    return (
      <Container>
        <Header style={{ backgroundColor: '#009975' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ marginLeft: -25 }}>FAQ</Title>
          </Body>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          {faq.length > 0 ? (
            faq.map((data, index) => {
              return (
                <View style={styles.Main} key={index}>
                  <TouchableOpacity
                    style={styles.Frow}
                    onPress={() =>
                      this.props.navigation.navigate('FaqDetail', {
                        title: data.title,
                        body: data.body,
                      })
                    }>
                    <View style={styles.SubMain}>
                      <View style={styles.TFa}>
                        <Text style={styles.TText}>{data.title}</Text>
                      </View>
                    </View>
                    <View style={styles.arr}>
                      <Image
                        source={require('../../assets/img/next.png')}
                        style={styles.imgArr}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Spinner />
          )}
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    marginTop: 20,
  },
  SubMain: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  img: {
    height: 25,
    width: 25,
  },
  TFa: {
    marginLeft: 10,
  },
  TText: {
    fontSize: 16,
  },
  arr: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 25,
  },
  Frow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    margin: 10,
    borderBottomColor: '#eee',
  },
  imgArr: {
    height: 10,
    width: 10,
  },
});
