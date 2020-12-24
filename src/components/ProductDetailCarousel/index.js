import React, { Component } from 'react'
import { View, Text, ScrollView, StatusBar, SafeAreaView } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ENTRIES1 } from '../../assets/static/entries';

import SliderEntry from '../../components/SliderEntry';
import styles, { colors } from '../../assets/styles/index.style';
import { sliderWidth, sliderHeight, itemWidth } from '../../assets/styles/SliderEntry.style';

const SLIDER_2_FIRST_ITEM = 1;

class ProductDetailCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider2ActiveSlide: SLIDER_2_FIRST_ITEM
        };
    }

    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                homepage={false}
            />
        );
    }


    mainExample(number, title) {
        const { slider2ActiveSlide } = this.state;
        const { data } = this.props;
        return (
            <View>
                <Carousel
                    data={data}
                    ref={c => this._slider2Ref = c}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    sliderHeight={sliderHeight}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_2_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.sliderDetail}
                    contentContainerCustomStyle={styles.sliderContentContainerDetail}
                    onSnapToItem={(index) => this.setState({ slider2ActiveSlide: index })}
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider2ActiveSlide}
                    containerStyle={styles.paginationContainerDetail}
                    dotColor={colors.white}
                    inactiveDotColor={colors.white}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={1}
                    carouselRef={this._slider2Ref}
                    tappableDots={!!this._slider2Ref}
                />
            </View>
        );
    }

    render() {
        const example1 = this.mainExample();

        return (
            <View>
                {example1}
            </View>
        );
    }
}

export default ProductDetailCarousel;