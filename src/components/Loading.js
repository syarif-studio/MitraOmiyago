import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Spinner from 'react-native-spinkit';
const OMI_ICON = require('../assets/img/icon.png');

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ({ ...props }) => (
  <View style={[styles.container, { width: props.size, height: props.size }]}>
    <Spinner type="Circle" {...props} />
    <View style={styles.iconContainer}>
      <Image source={OMI_ICON} style={{ width: props.size / 2, height: props.size / 2 }} />
    </View>
  </View>
);
