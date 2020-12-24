import React, { Component } from 'react';
import { Button, Content, Header,Left,Right,Body,Title,Icon, List, ListItem, Thumbnail, Container,
  Card,CardItem,H2 
} from 'native-base';
import { ScrollView, TouchableOpacity, StyleSheet, Modal, Image} from 'react-native'

import { connect } from 'react-redux';
import * as actionType from '../../store/actions/action-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { retrieveData, storeData } from '../../services/storage'
import payment from '../../services/payment'
import { 
    View,
    Text
} from 'react-native'


const priceFormat = (price) => {
  
  if(!price) return '0'

  if( price.includes('.') )
    return price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const midtransPayment = [ 2, 6, 10 ]
const hidePayments = [8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 3, 4, 5, 13]

class Payment extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          showModal : false,
          userData: null,
          payments: null,
          payment: null
      }
    }

    async componentDidMount(){
      const userData = await retrieveData('userData')
      const payments = await payment.getPayment()
      this.setState({userData, payments})
    }

    handleSelectPayment = (payment) => {
      this.setState({showModal:true, payment})
    }

    handlePaymentProcess = async ()=> {
      const processPayment = await payment.processPayment(this.state.userData.userId, this.state.payment.id)
      
      if(midtransPayment.includes(this.state.payment.id)){

        this.setState({showModal:false}); 
        
        this.props.navigation.navigate('Midtrans', {payment: [this.state.payment.slug.replace('-', '_')]});
      }
      else{
        const processTransaction = await payment.processTransaction (this.state.userData.userId)
        this.setState({showModal:false}); 
        const userNotif = await retrieveData('userNotif')
        let count = userNotif?.count ?? 0
        count++
        const storeNotif = await storeData('userNotif',JSON.stringify({count}))
        
        this.props.navigation.navigate('ThankyouPage', { total: priceFormat(this.props.cart && this.props.cart.cartTotal) });
      }
    }
   
    render() { 

        const {payments, payment} = this.state
        const total = priceFormat(this.props.cart && this.props.cart.cartTotal)

        return ( 
            <Container>
                       
                <Modal
                    transparent={true}
                    visible={this.state.showModal} 
                >
                    <View style={styles.ModalOuterContainer}>
                        <View style={styles.ModalInnerContainer}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <H2 style={{textAlign:"center", marginBottom: 10, marginLeft:20}}>Metode Pembayaran</H2>
                          <TouchableOpacity onPress={()=>this.setState({showModal:false})}>
                            <Icon name='close' style={{fontSize: 22}} />
                          </TouchableOpacity>
                        </View>
                        
                          <Card>
                            <CardItem>
                              { payment &&
                                <Body>
                                  <Title style={{color:"#333333", marginBottom: 10}}>Informasi Pembayaran</Title>
                                  <Text>
                                    {`Anda memilih untuk membayar via ${payment.name}`}
                                  </Text>
                                  <Text style={{marginBottom: 30}}>
                                    Total pesanan anda Rp {total}
                                  </Text>
                                  <Text style={{marginBottom: 10}}>
                                    * Kode unik digunakan oleh omiyago untuk mempermudah verifikasi pembayaran
                                  </Text>
                                </Body>
                              }
                            </CardItem>
                          </Card>
                            <Button block style={styles.ButtonBlock} 
                              onPress={this.handlePaymentProcess}
                            >
                                <Text style={styles.TextButton}>Proses Pembayaran</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
                

                <Header transparent style={{borderBottomColor: "#eaeaea", borderBottomWidth: 2, borderBottomStyle: "solid"}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon style={{color:"#212529"}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{marginLeft: -35, color:"#212529" }}>Pilih Type Pembayaran</Title>
                    </Body>
                    
                </Header>
                <ScrollView>
                  <List>

                     {  payments && payments.data && Array.isArray(payments.data) && payments.data
                          .filter(({payment}) => !(hidePayments.includes(payment.id)))
                          .map( ({payment, index}) => (
                            <ListItem key={payment.id} avatar>
                              <Left>
                                <Thumbnail square resizeMode="center" style={{width:70, height:35}} source={{uri: payment.image.url}}/>
                              </Left>
                              <Body>
                                <Text>{payment.name}</Text>
                                <Text note>{payment.desc}</Text>
                              </Body>
                              
                              <Button transparent onPress={()=> this.handleSelectPayment(payment)}>
                                <Icon style={{ fontSize: 15}} name='arrow-forward' />
                              </Button>                        
                            </ListItem>
                          ))                      
                      }
                    </List>
                  
                </ScrollView>
            
            
         </Container>

         );
    }
}
 
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: (data) => dispatch({ type: actionType.FETCH_CART, payload: data }),
  }
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    ItemInput: {
        marginTop: -10,
        marginRight: 10,
    },
    TextInput: {
        paddingTop: 65,  
        fontSize: 14, 
        color: "#212529", 
        marginLeft: 20
    },
    ButtonBlock: {
        marginTop: 15, 
        marginLeft: 10, 
        marginRight: 10, 
        backgroundColor: '#009975', 
    },
    TextButton: {
        color:'#ffffff', 
        fontSize: 17,
    },
    ButtonGoogle: {
        marginTop: 30, 
        marginLeft: 10, 
        marginRight: 10 
    },
    ButtonFb: {
        marginTop: 15, 
        marginLeft: 10, 
        marginRight: 10 
    },
    ModalOuterContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(00, 00, 00, 0.5)'
    },
    ModalInnerContainer:{
        backgroundColor: '#fff',
        width: 350,
        height: 350,
        borderRadius: 5,
        padding: 10
    }
   
  });