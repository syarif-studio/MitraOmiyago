import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}



export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error remove data
  }
};

export const retrieveData = async (key) => {
  try {
    let value = '';
    await AsyncStorage.getItem(key, (err, result) => {
      value = result;
    });
    
    return JSON.parse(value);
  } catch (error) {
    // Error retrieving data
  }
};
