import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Button, Container, Header,Left,Right,Body,Title,Icon} from 'native-base';

export default class FaqDetail extends Component {
    render() {

        const title = this.props.navigation.getParam('title', '')
        const body = this.props.navigation.getParam('body', '')

        return (
            <Container>
				<Header style={{backgroundColor:"#009975" }}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Title style={{marginLeft: -25 }}>{title}</Title>
					</Body>
				</Header>
				<ScrollView ><Text>{body}</Text></ScrollView>
			</Container>
        )
    }
}
