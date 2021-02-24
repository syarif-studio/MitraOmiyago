import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeCategories = (props) => {
  const { data } = props;

  const handleOnpress = (cat) => {
    if (cat.name === 'Flash Sale') {
      props.navigation.navigate('FlashSale');
    } else {
      props.navigation.navigate('ProductCategory', { catId: cat.id });
    }
  };

  return (
    <>
      {data.map((first) => {
        return (
          <TouchableOpacity
            style={styles.subCategory}
            onPress={() => handleOnpress(first)}>
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
    marginRight: 10,
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
