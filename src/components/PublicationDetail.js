import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Card, CardSection } from './common';

export default class PublicationDetail extends Component {
  constructor() {
    super();
    this.state = {
      favourite: false,
    };
  }

  setFavourite() {
    this.setState({
      ...this.state,
      favourite: true,
    });
  }

  unsetFavourite() {
    this.setState({
      ...this.state,
      favourite: false,
    });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <View
            style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
          >
            <Text>{this.props.publication.title}</Text>
            <Text>
              {`Publicado por: ${this.props.publication.user.username}`}
            </Text>
          </View>
        </CardSection>

        <CardSection>
          <Image
            style={{ width: 250, height: 250, flex: 1 }}
            source={{ uri: this.props.publication.image }}
          />
        </CardSection>

        <CardSection>
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <Text>{`Descripción: ${this.props.publication.description}`}</Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              flexDirection: 'row',
              flex: 1,
            }}
          >
          {
            (this.state.favourite) ?
            <Icon
              name="heart"
              size={30}
              color='#f42b60'
              onPress={() => this.unsetFavourite()}
            />
            :
            <Icon
              name="heart-o"
              size={30}
              onPress={() => this.setFavourite()}
            />
          }
          </View>
        </CardSection>

      </Card>
    );
  }
}
