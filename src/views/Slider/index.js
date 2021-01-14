import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
const carouselImages = [
  require('../../assets/img/bnare.jpg'),
  require('../../assets/img/bnare.jpg'),
  require('../../assets/img/bnare.jpg'),
];

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
          borderRadius: 5,
          height: '100%',
          marginLeft: 25,
          marginRight: 25,
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
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          paddingTop: 50,
        }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Carousel
            layout={'default'}
            ref={(ref) => (this.carousel = ref)}
            data={carouselImages}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />

          <Pagination
            dotsLength={carouselImages.length}
            activeDotIndex={this.state.activeIndex}
            containerStyle={{ backgroundColor: 'transparent' }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'grey',
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.handleHideSlider()}
          style={{
            marginBottom: 32,
            backgroundColor: 'grey',
            width: 300,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            Skip
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
