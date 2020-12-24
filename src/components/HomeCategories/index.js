import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    StyleSheet
} from 'react-native';

const HomeCategories = (props) => {

    const { data } = props;

    return (
        <>
            {
                data.map((first) => {
                  
                     if (first.name === 'Omiyago Produk') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Makanan Basah') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Makanan Ringan') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Kopi Nusantara') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Minuman') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Bumbu & Rempah') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Saus & Sambal') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Jelajah Nusantara') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Cemilan') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('ProductCategory', {catId: first.id})}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    else if (first.name === 'Flash Sale') {
                        return (
                            <TouchableOpacity
                                style={{ marginRight: 10, alignItems: "center" }}
                                style={styles.subCategory}
                                onPress={() => props.navigation.navigate('FlashSale')}
                            >
                                <Image style={{ width: 50, height: 50 }} source={first.image} />
                                <Text style={styles.subCategoryTitle} style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                            </TouchableOpacity>
                            
                        );
                    }
                    return (
                        <View style={{ marginRight: 10, alignItems: "center" }}>
                            <Image style={{ width: 50, height: 50 }} source={first.image} />
                            <Text style={{ fontSize: 10, textAlign: "center" }}>{first.name}</Text>
                        </View>
                    )
                   
                })
                
            }
        </>
    )
};

const styles = StyleSheet.create({
    
    subCategory: {
      alignItems: 'center',
      marginRight: 10,
      padding: 10,
      backgroundColor: '#fff',
      width: 100,
      height: 100,
      borderRadius: 5,
      elevation: 2
    },
    subCategoryIcon: {
      width: 40,
      height: 40,
      marginBottom: 5
    },
    subCategoryTitle: {
      fontSize: 14,
      textAlign: 'center'
    }
  });

export default HomeCategories;