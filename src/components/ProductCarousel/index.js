import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from '../../components/SliderEntry';
import styles, { colors } from '../../assets/styles/index.style';
import {
  sliderWidth,
  sliderHeight,
  itemWidth,
} from '../../assets/styles/SliderEntry.style';
import { ENTRIES1 } from '../../assets/static/entries';
import banner from './../../services/banner';

const SLIDER_1_FIRST_ITEM = 1;

class ProductCarousel extends Component {
  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry data={item} even={(index + 1) % 2 === 0} homepage={true} />
    );
  }

  state = {
    slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    banner: [],
  };

  componentWillMount = async () => {
    this.getBanner();
  };

  getBanner = async () => {
    try {
      const res = await banner.getBanner();
      this.setState({
        banner: res.data.sliderBanner,
      });
    } catch (err) {}
  };

  mainExample() {
    const { banner, slider1ActiveSlide } = this.state;

    return (
      <View>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={banner.filter(
            (data) => data.id === 24 || data.id === 13 || data.id == 14
          )}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={2000}
          autoplayInterval={4000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  render() {
    const example1 = this.mainExample();

    return <View>{example1}</View>;
  }
}

export default ProductCarousel;
