import React, { useState } from 'react';
import { View, Modal, Image } from 'react-native';
import {  
  Button, 
  Text, 
  Icon,
  Card,
  Toast,
} from 'native-base';
import {  ScrollView, TouchableOpacity, TextInput, CheckBox } from "react-native";
import checkout from '../../services/checkout'
import { add } from 'react-native-reanimated';

const Address = (props) =>{
  
  const [isShowModal, setIsShowModal] = useState(false)
  const [addrs, setAddrs] = useState(null);  
  const [selectedAddr, setSelectedAddr] = useState(null)
  const [defaultAddr, setDefaultAddr] = useState(null)
  const [isAddressForm, setIsAddressForm] = useState(false)
  const [isAddAddress, setIsAddAddress] = useState(false)

  const [isMainAddr, setIsMainAddr] = useState(false)
  const [addrAlias, setAddrAlias] = useState('')
  const [addr, setAddr] = useState('')
  const [receiver, setReceiver] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [postcode, setPostcode] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [phone, setPhone] = useState('')
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({})

  React.useEffect(()=>{
    getUserData()
  },[getUserData])

  const getUserData = React.useCallback( async() => {
    if(props.userData){
      const addrs = await checkout.getAddress(props.userData.userId)  
      
      if(addrs && addrs.data && Array.isArray(addrs.data)){
        for(var i = 0; i<addrs.data.length; i++){
          if(addrs.data[i].address.default){
            setDefaultAddr(addrs.data[i].address)
            break;
          }
        }
      }
      
      setAddrs(addrs)
      const customer = await checkout.getCustomer(props.userData.userId)  
      setEmail(customer && customer.data && customer.data.customer && customer.data.customer.email)
    }
  },[props.userData])

    
  const handleSelectAddress = async (data, value) =>{
    if(value){
      setIsShowModal(false)
      const selectAddr = await checkout.updateCart(props.userData.userId, data.id, 'address')
      props.updateCart()
      if(selectAddr.data){
        Toast.show({
          type: selectAddr.success === 'true' ? 'success' : 'warning',
          text: selectAddr.data,
          buttonText: "Okay",          
          duration: 3000
        })
      }  

      props.updateCouriers(data.id)
      
    }
  }

  const handleModalSelectAddress = () =>{
    setIsAddressForm(false)
    setIsShowModal(true)
    setIsAddAddress(false)
  }

  const handleAddAddress= () =>{
    setIsAddressForm(true)
    setIsAddAddress(true)
    setIsShowModal(true) 
    setIsMainAddr(false)
    setReceiver('')
    setAddrAlias('')
    setAddr('')
    //setEmail('')
    setKecamatan('')
    setPhone('')
    setPostcode('')
    setNote('')
  }

  const handleChangeAddress = (addr) => {    
    setIsAddressForm(true)
    setSelectedAddr(addr)
    setIsMainAddr(!!addr.default)
    setReceiver(addr.name)
    setAddrAlias(addr.alias)
    setAddr(addr.address1)
    //setEmail(addr.email)
    setKecamatan(addr.address2)
    setPhone(addr.phone1)
    setPostcode(addr.postcode)
    setNote(addr.remark)
    setSelectedLocation({
      "id": addr.id,
      "code": addr.shipping_code,
      "region_code": "",
      "region_name": "",
      "district_code": addr.city_id,
      "district_name": ""
    })
  }

  const handleSearchLocation = async(loc) =>{
    setKecamatan(loc)
    
    if(loc.length > 2){
      const res = await checkout.getLocation(loc)
      if(Array.isArray(res.data)){
        setLocations(res.data) 
      }
    }
    else{
      setLocations([])
    }
  }

  const handleSelectLocation = (location) => {
    setSelectedLocation(location)
    setKecamatan('Kec. ' + location.district_name + ', ' + location.region_name )
    setLocations([])
  }

  const handleSaveAddressChange = async() =>{
    let dataAddress = {
      name: receiver,
      default: isMainAddr ? 1 : 0,
      alias: addrAlias,
      address: addr,
      lokasi: kecamatan,
      email: email,
      phone: phone,
      postcode: postcode,
      remark: note,
      city_id: selectedLocation.district_code,
      shipping_code: selectedLocation.code,
      location_id: selectedLocation.id
    }

    let resp = null
    if(isAddAddress){
      resp = await checkout.addAddress(props.userData.userId, JSON.stringify(dataAddress)) 
    }
    else{
      resp = await checkout.changeAddress(selectedAddr.id, JSON.stringify(dataAddress)) 
    }

    if(resp?.data?.address?.id){
      handleSelectAddress({id: resp?.data?.address?.id}, true)
    }

    const getAddress = await checkout.getAddress(props.userData.userId)  
    setAddrs(getAddress)
    setIsShowModal(false)
    if(resp.data){
      Toast.show({
        type: resp.success === 'true' ? 'success' : 'warning',
        text: resp.success === 'true' ? 'Alamat berhasil diubah' : 'Alamat gagal diubah',
        buttonText: "Okay",          
        duration: 3000
      })
    }
  }

  const handleDeleteAddress = async () => {
    const deleteAddr = await checkout.removeAddress(selectedAddr.id)
    const getAddress = await checkout.getAddress(props.userData.userId)  
    setAddrs(getAddress)
    setIsShowModal(false)
    if(deleteAddr.data){
      Toast.show({
        type: deleteAddr.success === 'true' ? 'success' : 'warning',
        text: deleteAddr.data,
        buttonText: "Okay",          
        duration: 3000
      })
    }

    if(selectedAddr.id === props.address.id){
      props.updateCart()
    }
  }

  return (
    <View>
      <View style={{...styles.viewBorder, paddingBottom:20, marginBottom:20 }}>
        <Text style={{...styles.textBorder, paddingBottom:8, marginBottom:10, ...styles.textHeader}}>
          Alamat Pengiriman 
        </Text>
          {
            props.address && props.address.name ? (              
              <View >
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontWeight:'bold'}}>{props.address.name}</Text>
                  <Text style={{color:'#6c757d'}}>{' ('+ props.address.alias + ')'}</Text>
                </View>
                <Text>{props.address.phone}</Text>
                <Text>{props.address.receipent}</Text>                
              </View>
            )
            :
            (
              defaultAddr ? (              
                <View >
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold'}}>{defaultAddr.name}</Text>
                    <Text style={{color:'#6c757d'}}>{' ('+ defaultAddr.alias + ')'}</Text>
                  </View>
                  <Text>{defaultAddr.phone1}</Text>
                  <Text>{defaultAddr.address1 + ', ' + defaultAddr.address2 + ', ' + defaultAddr.postcode}</Text>                
                </View>
              )
              :
              <Text>
                Belum ada alamat
              </Text>
            )
          }
        <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:20}} >
          <Button small bordered success onPress={handleModalSelectAddress}>
            <Text uppercase={false}>Pilih Alamat Lain</Text>
          </Button>
          <Button small bordered success onPress={handleAddAddress}>
            <Text uppercase={false}>Buat Alamat Baru</Text>
          </Button>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isShowModal} 
        >
        <View style={styles.ModalOuterContainer}>
          <View style={styles.ModalInnerContainer}>

            <ScrollView>
              { isAddressForm ? 
                <View style={{marginBottom:16}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:16}}>
                    <Text>Ubah Alamat</Text>
                    <TouchableOpacity onPress={()=>setIsShowModal(false)}>
                      <Icon name='close' style={{fontSize: 22}} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
                    <CheckBox value={isMainAddr} onValueChange={setIsMainAddr} />
                    <Text>Alamat Utama</Text>
                  </View>

                  <Text>Alias untuk alamat ini</Text>
                  <View style={{flexDirection:'row', marginBottom:8}}>
                    <View style={styles.IconContainer}>
                      <Icon type='MaterialIcons' name="contacts" />
                    </View>
                    <TextInput value={addrAlias} onChangeText={text=>setAddrAlias(text)} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8,  flex:1}} />
                  </View>

                <Text>Alamat</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='MaterialIcons' name="book" />
                  </View>
                  <TextInput value={addr} onChangeText={text=>setAddr(text)} multiline numberOfLines={5} style={{ borderColor: '#ced4da', padding:8, borderWidth: 1, flex:1}} />
                </View>
                
                <Text>Nama Penerima</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='MaterialIcons' name="account-box" />
                  </View>
                  <TextInput value={receiver} onChangeText={text=>setReceiver(text)} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8, flex:1}} />
                </View>
                
                <Text>Kecamatan</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='MaterialIcons' name="place" />
                  </View>
                  <TextInput value={kecamatan} onChangeText={handleSearchLocation} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8, flex:1}} />
                </View>      
                
                {
                  locations && locations.map((data)=>(
                    <TouchableOpacity  onPress={()=>handleSelectLocation(data.lokasi)}>
                      <View 
                        key={data.lokasi.id} 
                        style={{backgroundColor:'#228e57', padding:8, borderBottomColor:'#FFF', borderBottomStyle:'solid', borderBottomWidth:1}}>
                        <Text style={{color:'#FFF'}}>
                          {'Kec. ' + data.lokasi.district_name + ', ' + data.lokasi.region_name }
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                  ))
                }
                
                <Text>Kode Pos</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='FontAwesome' name="inbox" />
                  </View>
                  <TextInput value={postcode} onChangeText={text=>setPostcode(text)} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8, flex:1}} />
                </View>
                
                {/* <Text>Email</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='MaterialIcons' name="email" />
                  </View>
                  <TextInput value={email} onChangeText={text=>setEmail(text)} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8, flex:1}} />
                </View> */}
                
                <Text> Nomor kontak</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='MaterialIcons' name="phone" />
                  </View>
                  <TextInput value={phone} onChangeText={text=>setPhone(text)} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8, flex:1}} />
                </View>
                
                <Text>Catatan untuk kurir</Text>
                <View style={{flexDirection:'row', marginBottom:8}}>
                  <View style={styles.IconContainer}>
                    <Icon type='MaterialIcons' name="note" />
                  </View>
                  <TextInput value={note} placeholder="Catatan..." onChangeText={text=>setNote(text)} style={{ borderColor: '#ced4da', borderWidth: 1, padding:8, flex:1}} />
                </View>

                <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:16}}>
                  { 
                    !isAddAddress &&
                    <Button danger onPress={handleDeleteAddress} style={{marginRight:8}} ><Text>Hapus</Text></Button>
                  }
                  <Button primary onPress={handleSaveAddressChange}><Text>Simpan</Text></Button>
                </View>
                
                  
                </View>
              :
                <>
                  <View style={{flexDirection:'row', justifyContent:'space-between', paddingBottom:8, marginBottom:8, ...styles.viewBorder}}>
                    <Text>Pilih Alamat Lain</Text>
                    <TouchableOpacity onPress={()=>setIsShowModal(false)}>
                      <Icon name='close' style={{fontSize: 22}} />
                    </TouchableOpacity>
                  </View>
                  {
                    addrs && addrs.data && Array.isArray(addrs.data) ? addrs.data.map(({address}) => (
                      <>
                      <Card key={address.id} style={{borderRadius:4}}>
                          <View style={{padding:12}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                              <Text style={{color:'#6c757d'}}>{address.alias}</Text>
                              <CheckBox value={(props.address && props.address.id ) == address.id} onValueChange={(value)=> handleSelectAddress(address, value)} />
                            </View>
                            <Text style={{fontWeight:'bold'}}>{address.name}</Text>
                            <Text>{address.phone1}</Text>
                            <Text>{address.address1}</Text>
                            <Text>{address.address2 + ' ' + address.postcode}</Text>
                          </View>
                        
                        <Button transparent onPress={()=>handleChangeAddress(address)} style={{backgroundColor:'rgba(0,0,0,0.03)',justifyContent:'center'}}>
                          <Text uppercase={false} style={{color:'#6c757d'}}>Ubah Alamat</Text>
                        </Button>
                      </Card>
                      </>
                    ))
                    :
                    <View>     
                      <Image style={{width:"auto", height:300}} source={{uri:'http://m.omiyago.com/public/images/global/empty_product.png'}} />
                    </View>
                  }

                </>
              }
            </ScrollView>

          </View>
        </View>

      </Modal>
    </View>
  )
}

const styles = {
  textHeader:{
    fontSize:17, 
    fontWeight:"600",
    color:"#474747"
  },
  viewBorder:{
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 4,
    borderBottomStyle: "solid"
  },
  textBorder:{
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1
    
  },
  ModalOuterContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:30,
    paddingBottom:30,
    backgroundColor: 'rgba(00, 00, 00, 0.5)'
  },
  ModalInnerContainer:{
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 4,
    padding: 10
  },
  IconContainer:{
    padding:8, 
    backgroundColor:'#e9ecef', 
    justifyContent:'center', 
    alignItems:'center'
  }
}

export default Address