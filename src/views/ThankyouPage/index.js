import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, H1, H2, H3,Card, CardItem, Thumbnail, Text, Left,Body,Title,Button,Icon,Right } from 'native-base';

export default class ThankyouPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        ThankyouPage:false
    }
  }

  total = this.props.navigation.getParam("total", '0')
  
  render() {
    return (
      <Container>
        <Header transparent style={{borderBottomColor: "#eaeaea", borderBottomWidth: 2, borderBottomStyle: "solid"}}>
          <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('Checkout')}>
              <Icon style={{color:"#212529"}} name='arrow-back' />
              </Button>
          </Left>
          <Body>
              <Title style={{marginLeft: -35, color:"#212529" }}>Transaksi Selesai</Title>
          </Body>              
        </Header>

        <Content>        

          <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:100, backgroundColor:'#8BC34A'}}>
            <Text style={{color:'#FFF', fontSize:28}}>Success</Text>
          </View>
          <View style={{justifyContent:'center', alignItems:'center', padding:24}} >
            <Text style={{color:'#757575', fontSize:16, textAlign:'center', marginBottom:16}}>     
              TERIMA KASIH SUDAH BERBELANJA DI OMIYAGO
            </Text>
            <Text style={{color:'#757575', fontSize:16, textAlign:'center', marginBottom:16}}>     
              Konfirmasi Pembelian
            </Text>
            <Text style={{color:'#757575', fontSize:16, textAlign:'center', marginBottom:16}}>     
              Rp {this.total}
            </Text>
            <Text style={{color:'#757575', fontSize:10, textAlign:'center', marginBottom:24, fontStyle: 'italic'}}>     
              *Pastikan Transfer Tepat Sampai 2 Digit terkahir
            </Text>
            <Button onPress={()=>this.props.navigation.navigate('Home')} style={{backgroundColor:'#8BC34A',borderRadius:25, paddingHorizontal:20}}><Text>Selesai</Text></Button>
          </View>

        </Content>
      </Container>
    );
  }
}