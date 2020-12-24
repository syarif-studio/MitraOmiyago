import React from 'react';
import { Container, Header, Content, Icon, CardItem, Body, Text, Button } from 'native-base';
import { View } from 'react-native';

const CategoriesSplitter = (props) => {
    const { categoryName } = props;
    
    const handlePress = () =>{
        let catId = 0
        if(categoryName.toLowerCase().includes('terbaru')){
            catId = 'terbaru'
        }
        
        if(categoryName.toLowerCase().includes('populer')){
            catId = 'populer'
        }
        
        if(categoryName.toLowerCase().includes('omiyago')){
            catId = 56
        }
        
        if(categoryName.toLowerCase().includes('rekomendasi')){
            catId = 'rekomendasi'
        }

        props.navigation.navigate('ProductCategory', {catId})
    }

    return (
        <CardItem style={{ backgroundColor: "#f1f1f1", marginTop: 20, marginBottom: 10 }}>
            <Body style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                {(categoryName === "flashsale") ?
                    <Text style={{ color: "#009975", fontSize: 12 }}>
                        FLASH
                    <Text style={{ fontWeight: "bold", color: "#009975", fontSize: 12 }}>
                            {" SALES"}
                        </Text>
                    </Text>
                    :
                    <Text style={{ color: "#009975", fontSize: 12 }}>
                        {categoryName}
                    </Text>
                }
                <Button 
                    onPress={handlePress}
                    small transparent style={{borderColor:'#009975', borderWidth:2, borderRadius:4}}
                >
                    <Text style={{ color: "#009975", fontSize: 12 }}>Lihat Semua</Text>
                    <Icon style={{color: '#009975'}} name='arrow-dropright' />
                </Button>
            </Body>
        </CardItem>
    )
};

export default CategoriesSplitter;