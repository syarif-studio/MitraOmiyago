import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Left, Body,Title, Button,Icon, Text } from 'native-base';
export default class UnderlinedTextboxExample extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#fff'}}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                <Icon style={{color:"212529"}} name='arrow-back' />
              </Button>
            </Left>
            <Body >
              <Title style={{color:"212529", marginLeft: -20}}>Ulasan Pelanggan</Title>
            </Body>
          </Header>
        <Content>
          <Item>
            <Input placeholder="Nama" />
          </Item>
          <Item>
            <Input placeholder="Masukan Ulasan" />
          </Item>
          <Button block style={{marginTop: 25}}>
            <Text>Kirim</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}