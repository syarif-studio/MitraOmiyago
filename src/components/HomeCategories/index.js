import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeCategories = (props) => {
  const { data } = props;

  return (
    <>
      {data.map((first) => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10, alignItems: 'center' }}
            style={styles.subCategory}
            onPress={() => props.navigation.navigate('FlashSale')}>
            <Image style={styles.subCategoryIcon} source={first.image} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subCategoryText}>{first.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  subCategory: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  subCategoryIcon: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: 5,
  },
  subCategoryText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default HomeCategories;
