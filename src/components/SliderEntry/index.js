import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../../assets/styles/SliderEntry.style';


export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        homepage: PropTypes.bool,
    };

    get image() {
        const { data: {image:{url:illustration}}, homepage } = this.props

        return homepage ? (
            <Image
                source={{ uri: illustration }}
                style={styles.imageCarouselHome}
            />
        ) : (
                <Image
                    source={{ uri: illustration }}
                    style={styles.image}
                />
            );
    }

    render() {
        const { homepage, even } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={homepage ? styles.slideInnerContainer : styles.slideInnerContainerDetail}
                onPress={() => {}}
            >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    {this.image}
                </View>
            </TouchableOpacity>
        );
    }
}