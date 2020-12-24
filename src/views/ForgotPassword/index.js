import React, { useState } from 'react';
import { Image, View, StatusBar, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Input, Item,Card, CardItem, Thumbnail, Text, Left,Body,Title,Button,Icon,Right } from 'native-base';
import login from '../../services/login'

export default function ForgotPassword(props) {

  const [text, setText] = useState('')
  const [account, setAccount] = useState('')
  const [code, setCode] = useState('')
  const [isSucces, setIsSuccesss] = useState(false)
  const [isEnterPassword, setIsEnterPassword] = useState(false)
  const [notification, setNotification] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)
  
  const handleResetPassword = async () => {

    if(isEnterPassword){
      const checkCode = await login.checkResetCode(account)
      if(checkCode?.data?.status){
        if(checkCode?.data?.code === code){
          const res = await login.changePassword(checkCode?.data?.user_id, text)
          setIsShowNotification(true)
          setNotification(res?.data)
          if(res?.success === 'false'){
          }
          else{
            setIsSuccesss(true)
          }
        }
        else{          
          setIsShowNotification(true)
          setNotification('Kode reset salah')
        }
      
      }
      else{
        setIsShowNotification(true)
        setNotification(checkCode?.data)
      }

    }
    else{
      const res = await login.resetPassword(text)
      if(res?.success === 'false'){
        setIsShowNotification(true)
        setNotification(res?.data)
      }
      else{
        setIsEnterPassword(true)
        setIsShowNotification(false)
        setIsSuccesss(false)
        setAccount(text)
        setText('')
      } 
    }
   
  }

  return (
    <Container style={{paddingTop:StatusBar.currentHeight}}>
      <Header style={{backgroundColor:"#009975", marginTop: 0 }}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
            <Title>Lupa Password</Title>
        </Body>              
      </Header>

      <Content> 
        <View style={styles.container}>
            {
              isShowNotification ?
                <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#FDF2F3', borderColor:'#F9D5D3',borderStyle:'solid',borderWidth:1, borderRadius:4, padding:5, margin:20}}>
                    <Icon name="information-circle" style={{marginRight:5}}/>
                    <Text>{notification}</Text>
                </View>
                :
                <View style={{margin:20}}></View>
            }
            <Form>
              {
                isEnterPassword &&
                <>
                  <Text style={styles.TextInput}>
                    Kode Reset
                  </Text>
                  <Item floatingLabel style={styles.ItemInput} >
                    <Input value={code} onChangeText={(text)=>setCode(text)} />
                  </Item>
                </>
              }

              <Text style={styles.TextInput}>
                  {isEnterPassword ? 'Password Baru' : 'Alamat email terdaftar' }
              </Text>
              <Item floatingLabel style={styles.ItemInput} >
                  <Input value={text} onChangeText={(text)=>setText(text)} />
              </Item>
            </Form>
            <Button block style={styles.ButtonBlock} onPress={ handleResetPassword }>
              <Text style={styles.TextButton}>
                  {isEnterPassword ? 'Reset Password' : 'Lanjutkan'}
              </Text>
            </Button> 
            {
              isSucces &&
              <Button block style={styles.ButtonBlocLogin} onPress={ () => props.navigation.navigate('Login') }>
                <Text style={styles.TextButton}>
                  Login
                </Text>
              </Button> 
            }
        </View>      

      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  ItemInput: {
      marginTop: -10,
      marginRight: 10,
  },
  TextInput: {
      paddingTop: 25,  
      fontSize: 14, 
      color: "#212529", 
      marginLeft: 20
  },
  ButtonBlock: {
      marginTop: 30, 
      marginLeft: 10, 
      marginRight: 10, 
      backgroundColor: '#009975', 
  },
  ButtonBlocLogin: {
      marginTop: 30, 
      marginLeft: 10, 
      marginRight: 10, 
      backgroundColor: 'blue', 
  },
  TextButton: {
      color:'#ffffff', 
      fontSize: 17,
  },
 
});
