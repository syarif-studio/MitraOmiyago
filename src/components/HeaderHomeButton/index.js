import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'native-base';

export default class HeaderHomeButton extends Component {
    render() {
        return (
            <View>
                <Button transparent>
                    <FontAwesomeIcon icon={faCoffee} />
                </Button>
            </View>
        )
    }
}
