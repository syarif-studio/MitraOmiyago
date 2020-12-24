import React, { useState, useEffect } from "react"
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
import transaction from "../../services/history"

const Poin = (props) => {
  const pointData = props.navigation.getParam("poinData", null)
  const userId = props.navigation.getParam("userId", null)
  const history = pointData?.history

  const [userTransaction, setUserTransaction] = useState([])

  useEffect(() => {
    const getUserPoin = async () => {
      const result = await transaction.getHistory(userId)

      if (result?.data) {
        setUserTransaction(result?.data)
      }
    }

    getUserPoin()
  }, [userId])

  const handleToRiwayatPoin = (id) => {
    const data =
      Array.isArray(userTransaction) &&
      userTransaction?.find((item) => item?.orderId == id)
    props.navigation?.push("RiwayatPoin", { data })
  }

  return (
    <TouchableOpacity>
      <Header style={{ backgroundColor: "#fff", marginTop: 20 }}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon style={{ color: "#212529" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "#212529", marginLeft: -20 }}>
            Riwayat Poin
          </Title>
        </Body>
      </Header>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text note>{`Saldo Point : Rp ${pointData.point?.saldo} `}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      {history &&
        userTransaction &&
        Object.keys(history)?.map((key) => {
          return (
            <Card key={key}>
              <CardItem>
                <Left>
                  <Body>
                    <Text note>{`Tanggal : ${history[key]?.date}`}</Text>
                    <View
                      style={{
                        paddingBottom: 5,
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text>{`Saldo Awal : Rp ${history[key]?.saldo_before} `}</Text>
                      <Text>{`Saldo Akhir : Rp ${history[key]?.saldo_after} `}</Text>
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
                      onPress={() => handleToRiwayatPoin(history[key]?.data_id)}
                    >
                      <Text style={{ color: "#ffffff", fontSize: 17 }}>
                        Detail
                      </Text>
                    </Button>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          )
        })}
    </TouchableOpacity>
  )
}

export default Poin
