import React, { Component } from 'react';
import {
  Image,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
  ActionSheet,
  Spinner,
} from 'native-base';
import promo from './../../services/promo';
import HTML from 'react-native-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

var BUTTONS = [
  { text: 'Beranda', icon: 'home', iconColor: '#2c8ef4' },
  { text: 'Kategori', icon: 'analytics', iconColor: '#f42ced' },
  { text: 'Promo', icon: 'gift', iconColor: '#ea943b' },
  { text: 'Bantuan', icon: 'cog', iconColor: '#fa213b' },
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class CardImageExample extends Component {
  state = {
    promos: [],
    refreshing: false,
  };

  componentWillMount = async () => {
    this.getPromo();
  };

  getPromo = async () => {
    try {
      const res = await promo.getPromos();
      this.setState({
        promos: res.data.promo,
      });
    } catch (err) {}
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    this.getPromo();
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const { promos, refreshing } = this.state;

    return (
      <Container>
        <Header
          searchBar
          rounded
          transparent
          style={{ backgroundColor: '#009975' }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ color: '#ffffff' }}
                size={20}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title
              style={{
                width: 350,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Promo
            </Title>
          </Body>
          <Right style={{ maxWidth: '20%' }}>
            <Button
              transparent
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    //title: "Testing ActionSheet"
                  },
                  (buttonIndex) => {
                    // this.setState({ clicked: BUTTONS[buttonIndex] });
                    //    alert('test')
                    if (0 === buttonIndex) {
                      // alert('option 0')
                      this.props.navigation.navigate('Home');
                    } else if (1 === buttonIndex) {
                      this.props.navigation.navigate('Screen2');
                    } else if (2 === buttonIndex) {
                      this.props.navigation.navigate('Promo');
                    }
                  }
                )
              }>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>

        <Content
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          {promos.length > 0 ? (
            promos.map((data, index) => {
              return (
                <Card key={index}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: data.image }} />
                      <Body>
                        <Text style={{ fontSize: 15 }}>{data.title}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: data.image }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <HTML
                        html={data.description}
                        imagesMaxWidth={Dimensions.get('window').width}
                      />
                    </Left>
                  </CardItem>
                </Card>
              );
            })
          ) : (
            <Spinner />
          )}
        </Content>
      </Container>
    );
  }
}
