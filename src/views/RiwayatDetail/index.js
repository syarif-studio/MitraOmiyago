import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
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
import { ScrollView } from 'react-native';

const RiwayatDetail = (props) => {
  const data = props.navigation.getParam('data', {});
  const cartStatus = data.cartStatus?.length
    ? data.cartStatus[data.cartStatus?.length - 1]
    : null;

  return (
    <Container style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ScrollView>
        <Header style={{ backgroundColor: '#fff' }}>
          <Left>
            <Button transparent onPress={() => props.navigation.goBack()}>
              <Icon style={{ color: '#212529' }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#212529', marginLeft: -20 }}>
              Detail Pesanan
            </Title>
          </Body>
        </Header>

        <Content>
          <View style={{ marginBottom: 20, paddingRight: 5, paddingLeft: 5 }}>
            <View style={{ marginBottom: 20 }}>
              <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>Status : {cartStatus?.desc}</Text>
                      <Text note>No Order : {data?.referenceNo}</Text>
                      <View
                        style={{
                          paddingBottom: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>Tanggal Order : {cartStatus?.status_date}</Text>
                      </View>
                    </Body>
                  </Left>
                </CardItem>
              </Card>

              <Card>
                {data?.item?.map((item) => (
                  <View key={item?.id} style={{ paddingVertical: 8 }}>
                    <Title style={{ color: 'black' }}>Detail Order</Title>
                    <CardItem>
                      <Left>
                        <Thumbnail
                          square
                          small
                          source={{ uri: item?.product?.image?.url }}
                        />
                        <Body>
                          <Text note>{item?.product?.detail?.name}</Text>
                          <View
                            style={{
                              ...styles.textBorder,
                              paddingBottom: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{ color: '#f70d0d' }}>
                              Rp {item?.product?.price}
                            </Text>
                            <Text>{item?.qty} pcs</Text>
                          </View>
                        </Body>
                      </Left>
                    </CardItem>
                  </View>
                ))}
              </Card>

              <Card>
                <Title style={{ color: 'black', marginTop: 8 }}>
                  Detail Pengiriman
                </Title>
                <CardItem style={{ marginBottom: 8 }}>
                  <Left>
                    <Body>
                      <Text>Kurir : {data?.cartCarrier?.service_display}</Text>
                      <Text>{data?.cartAddress?.name}</Text>
                      <Text note>{data?.cartAddress?.receipent}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>

              <Card>
                <View style={{ padding: 16 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={styles.textSub}>Sub total</Text>
                    <Text style={styles.textSub}>Rp {data?.cartSubtotal}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={styles.textSub}>Shipping</Text>
                    <Text style={styles.textSub}>
                      Rp {data?.cartCarrier?.cost || 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={styles.textSub}>Potongan</Text>
                    <Text style={styles.textSub}>
                      Rp {data?.cartVoucher?.discount || 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={styles.textSub}>Box</Text>
                    <Text style={styles.textSub}>Rp 0</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={styles.textSub}>Total</Text>
                    <Text style={styles.textSub}>Rp {data?.cartTotal}</Text>
                  </View>
                </View>
              </Card>
            </View>
            <Button
              block
              style={{
                marginTop: 30,
                marginLeft: 10,
                marginRight: 10,
                backgroundColor: '#009975',
              }}>
              <Text style={{ color: '#ffffff', fontSize: 17 }}>
                Tulis Ulasan
              </Text>
            </Button>
          </View>
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = {
  textHeader: {
    fontSize: 17,
    fontWeight: '600',
    color: '#474747',
  },
  textSub: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  textBorder: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  viewBorder: {
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 4,
    borderBottomStyle: 'solid',
  },
  buyBorder: {
    borderTopColor: '#e6e6e6',
    borderTopWidth: 4,
    borderTopStyle: 'solid',
    paddingTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },
};

export default RiwayatDetail;
