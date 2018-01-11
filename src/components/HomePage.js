import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { getPublications, setFavourite, unsetFavourite } from '../actions/HomePageActions';
import PublicationList from './PublicationList';

class HomePage extends Component {
  componentWillMount() {
    this.props.getPublications();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PublicationList {...this.props} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    publications: state.homeState.publications,
  };
};

export default connect(
  mapStateToProps,
  {
    getPublications,
    setFavourite,
    unsetFavourite,
  }
)(HomePage);
