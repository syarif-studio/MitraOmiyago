import React from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar'

const Search = (props) => {

  const [searchIndex, setSearchIndex] = React.useState(0);

  Search.navigationOptions = () => ({
    header: <SearchBar />
  });

  const onPressNext = () => {
    if(props.searchProducts.length > searchIndex + 10)
      setSearchIndex( idx => idx + 10)
  }
  
  const onPressPrev = () => {
    if(searchIndex >= 10)
      setSearchIndex( idx => idx - 10)
  }
  
  const toDetail = (params) => {
    props.navigation.navigate('Detail', { index: params, source: 'searchProducts' })
  }
  
  const searchProductDisplay = props.searchProducts.filter((product, idx) => idx >= searchIndex && idx < searchIndex + 10)

  return(
    <Container>
      <Header transparent style={{borderBottomColor: "#eaeaea", borderBottomWidth: 2, borderBottomStyle: "solid"}}>
        <Left>
          <Button transparent onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-back" style={{color:'#212529'}} />
          </Button>
        </Left>
        <Body>
          <Title style={{color:'#212529'}}>Search</Title>
        </Body>
      </Header>
   
      {
        props.searchProducts.length ?
          <SafeAreaView style={{ backgroundColor: "#ffffff", flex:1, marginBottom:20 }}>
            <ScrollView>
              <View>
                {
                  searchProductDisplay.map((product, index) => {
                    return(
                      <TouchableOpacity key={index + searchIndex} onPress={() => toDetail(index)}>
                        <View style={{flexDirection:'row', borderBottomColor: "#eaeaea", borderBottomWidth: 1, borderBottomStyle: "solid"}}>
                          <Image style={{width: 68, height: 45, margin:10}} source={{uri:product.image}} />
                          <View style={{marginTop:10,marginRight:10, width: 0,flexGrow: 1}}>
                            <Text style={{fontSize:12, flexShrink:1}}>{product.title}</Text>
                            <Text>Rp {product.price}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                <View style={{flexDirection:'row', margin:10}}>
                  <Text style={{backgroundColor:'#dad4d4', padding:5}}>{`${searchIndex + 1} - ${searchIndex + searchProductDisplay.length}`}</Text>
                  <Text style={{marginLeft:10, backgroundColor:'#009975', color:'#fff', padding:5}}>{`${props.searchProducts.length} Produk`}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                  <TouchableOpacity onPress={onPressPrev} style={{padding:5,borderColor: "#eaeaea", borderWidth: 1, borderStyle: "solid", borderRadius: 3}}><Text style={{fontSize:10}}>Previous</Text></TouchableOpacity>  
                  <TouchableOpacity onPress={onPressNext} style={{padding:5,borderColor: "#eaeaea", borderWidth: 1, borderStyle: "solid", borderRadius: 3}}><Text style={{fontSize:10}}>Next</Text></TouchableOpacity>  
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>    
      :
        <SafeAreaView style={{ backgroundColor: "#ffffff", height: "100%", padding: 10 }}>
          <Text>Tidak ada produk ditemukan. Coba kata kunci lainnya</Text>
          <Image style={{width:"100%", height:300}} source={{uri:'http://m.omiyago.com/public/images/global/empty_product.png'}} />
        </SafeAreaView>
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    searchProducts: state.searchProducts,
  }
}

export default connect(mapStateToProps)(Search);