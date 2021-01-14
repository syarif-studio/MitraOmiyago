import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
const carouselImages = [
  require('../../assets/img/bnare.jpg'),
  require('../../assets/img/bnare.jpg'),
  require('../../assets/img/bnare.jpg'),
];

const windowWidth = Dimensions.get('window').width;

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
          resizeMode="contain"
          source={item}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => this.props.handleHideSlider()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              margin: 24,
            }}>
            <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
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
            bottom: 32,
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
      </View>
    );
  }
}
