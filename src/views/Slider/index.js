import * as React from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
const carouselImages = [
  require('../../assets/img/bnare.jpg'),
  require('../../assets/img/bnare.jpg'),
  require('../../assets/img/bnare.jpg'),
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Image
          resizeMode="cover"
          source={item}
          style={{ width: windowWidth, height: windowHeight }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Carousel
          layout={'default'}
          ref={(ref) => (this.carousel = ref)}
          data={carouselImages}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />

        <Pagination
          dotsLength={carouselImages.length}
          activeDotIndex={this.state.activeIndex}
          containerStyle={{
            position: 'absolute',
            backgroundColor: 'transparent',
            bottom: 100,
            width: '100%',
            marginHorizontal: 'auto',
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'red',
          }}
          inactiveDotStyle={{
            backgroundColor: 'black',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            bottom: 24,
          }}>
          <TouchableOpacity
            onPress={() => this.props.handleHideSlider()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#009975',
              paddingHorizontal: 100,
              paddingVertical: 16,
              borderRadius: 30,
              margin: 24,
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
