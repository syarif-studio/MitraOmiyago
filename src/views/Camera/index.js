import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { storeData } from '../../services/storage';

class Camera extends PureComponent {
  render() {
    const isActive = this.props.navigation.isFocused();
    const type = this.props.navigation.getParam('type', 'back');

    if (isActive === true) {
      return (
        <View style={styles.container}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={
              type === 'front'
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
            flashMode={RNCamera.Constants.FlashMode.on}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View
            style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const slug = this.props.navigation.getParam('slug', 'userKTP');
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      await storeData(slug, JSON.stringify({ uri: data.uri }));

      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  };
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
