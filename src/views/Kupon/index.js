import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import {
  Body,
  Card,
  CardItem,
  Header,
  Left,
  Title,
  Icon,
  Button
} from "native-base"

const Kupon = (props) => (
  <TouchableOpacity>
      <Header style={{ backgroundColor: "#fff", marginTop: 20 }}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon style={{ color: "#212529" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "#212529", marginLeft: -70 }}>
            Cari Promo
          </Title>
        </Body>
      </Header>
      
      <Card>
        <CardItem>
          <Left>
            <Body>
              
              <View
                style={{
                  paddingBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{`Kode Kupon 11 11 `}</Text>
                
                <Text style={{ color: "blue" }}></Text>
              </View>
              <Button
                block
                style={{
                  marginTop: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: "#009975"
                }}
                onPress={() => props.navigation?.push("RiwayatPoin")}
              >
                <Text style={{ color: "#ffffff", fontSize: 17 }}>
                  Detail
                </Text>
              </Button>
            </Body>
          </Left>
        </CardItem>
      </Card>
       
    </TouchableOpacity>
)
export default Kupon

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})