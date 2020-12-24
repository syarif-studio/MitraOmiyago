import React from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import { View, TouchableOpacity, Modal} from 'react-native'


export default class Popup extends React.Component {

constructor()
{
  super();
  this.state={
    show:false
  }
}
  render() {
    return (
      <Container>
        <Content padder>
          
          <Button onPress={()=> {this.setState({show:true})}}>
            <Text>show modal</Text>
          </Button>
          <Modal
          transparent={true}
          visible={this.state.show} 
          >
            <View style={{backgroundColor:"#OOOOOOOaa", flex: 1 }}>
              <View style={{backgroundColor:"#ffffff", margin: 50, padding:40, borderRadius:10.1 }}>
                <Text style={{fontSize: 50}}>Nyoba</Text>
              </View>
              <Button  onPress={()=> {this.setState({show:false})}}>
                <Text>close modal</Text>
              </Button>
            </View>
          </Modal>
          
        </Content>
      </Container>
    );
  }
}