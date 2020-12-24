import React, { useState} from 'react';
import { View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { 
  Container, 
  Button, 
  Text, 
  Header, 
  Left, 
  Body, 
  Title, 
  Icon,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Right,
  
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


const Notification = (props) => {

  return (
    <Container  style={{flex:1, paddingTop:StatusBar.currentHeight}}>
      <ScrollView>
        <Header style={{backgroundColor: '#fff'}}>
          <Left>
            <Button transparent onPress={()=>props.navigation.goBack()}>
              <Icon style={{color:"#212529"}} name='arrow-back' />
            </Button>
          </Left>
          <Body >
            <Title style={{color:"#212529", marginLeft: -20}}>Pemberitahuan</Title>
          </Body>
        </Header>
        
        <Content>   
          <TouchableOpacity onPress={() => props.navigation.navigate('RiwayatBelanja')}>
            <Card>  
              <CardItem>
                <Left>          
                  <Body>
                    <View style={{padding:5, flexDirection:"row", justifyContent:"space-between", }}>
                      <Text>Menunggu Pembayaran</Text>
                      <FontAwesomeIcon icon={faAngleRight} style={{marginTop:2, color: '#ccc'}} />
                    </View>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>

        </Content>
      </ScrollView>
    
    </Container>
  );
  
}

export default Notification;



  