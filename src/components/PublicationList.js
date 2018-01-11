import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import map from 'lodash/map';

import PublicationDetail from './PublicationDetail';

class PublicationList extends Component {
  render() {
    return (
      <ScrollView>
        {
          map(this.props.publications, (publication, key) => (
            <PublicationDetail
              key={key}
              publication={publication}
            />
          ))
        }
      </ScrollView>
    );
  }
}

export default PublicationList;
