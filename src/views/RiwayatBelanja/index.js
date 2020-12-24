import React, { useState} from 'react';
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
import {  View, FlatList, TouchableOpacity, StatusBar } from "react-native";
import history  from '../../services/history'
import { retrieveData } from "../../services/storage"

const Item = ({data, navigation}) => {

  const cartStatus = data.cartStatus?.length ? data.cartStatus[data.cartStatus?.length - 1] : null

  return (
    <TouchableOpacity onPress={() => navigation.navigate('RiwayatDetail', {data})}>
      <Card>  
        <CardItem>
          <Left>          
            <Body>
              <Text note>No Order : {data.referenceNo}</Text>
              <View style={{paddingBottom:5, flexDirection:"row", justifyContent:"space-between", }}>
                <Text>Total : Rp {data.cartTotal}</Text>
                <Text style={{color:"blue"}}>{cartStatus.desc}</Text>
              </View>
            </Body>
          </Left>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}


const RiwayatBelanja = (props) => {

  const [data, setData] = useState([])

  const statusFilter = props.navigation.getParam("status", null);

  React.useEffect(()=>{

    const getHistoryData = async () =>{
      const user = await retrieveData('userData');
      const resp = await history.getHistory(user.userId)
      const data = statusFilter ? resp.data.filter(item => item?.cartStatus[0]?.status_code === statusFilter) : resp.data
      setData(data)
    }
    
    getHistoryData()   

  },[])

  return (
    <Container style={{flex:1, paddingTop:StatusBar.currentHeight}}>
        <Header style={{backgroundColor: '#fff'}}>
          <Left>
            <Button transparent onPress={()=>props.navigation.goBack()}>
              <Icon style={{color:"#212529"}} name='arrow-back' />
            </Button>
          </Left>
          <Body >
            <Title style={{color:"#212529", marginLeft: -20}}>Riwayat Belanja</Title>
          </Body>
        </Header>        
                
        <FlatList
          data={data}
          renderItem={({ item }) => <Item data={item} navigation={props.navigation}/>}
          keyExtractor={item => item.orderId}
        />      
      
    </Container>
  );
  
}

export default RiwayatBelanja;