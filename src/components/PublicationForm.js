import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import isEmpty from 'lodash/isEmpty';

import { connect } from 'react-redux';
import {
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import { setTitle, setDescription, setPublication, doUpload } from '../actions/PublicationActions';
import { Card, CardSection, Input, Button, Spinner } from './common';


class PublicationForm extends Component {
  constructor() {
    super();
    this.state = {
      avatarSource: null,
      imgBase64: '',
      error: '',
    };
  }

  componentDidMount() {
    // upload progress
    DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
      const bytesWritten = data.totalBytesWritten;
      const bytesTotal = data.totalBytesExpectedToWrite;
      const progress = data.progress;
      console.log(bytesWritten, bytesTotal);
      console.log(`upload progress: ${progress} %`);
    });
  }

  onTitleChange(text) {
    this.props.setTitle(text);
  }

  onDescriptionChange(text) {
    this.props.setDescription(text);
  }

  onButtonPress() {
    if (!isEmpty(this.state.imgBase64)) {
      this.setState({ error: '' });
      this.props.doUpload(this.state.imgBase64)
        .then((response) => {
          const publication = {
            title: this.props.title,
            description: this.props.description,
            image: response.data.uri,
            id: this.props.id,
          };
          this.props.setPublication(publication);
        });
    } else {
      const publication = {
        title: this.props.title,
        description: this.props.description,
        image: '',
        id: this.props.id,
      };
      this.props.setPublication(publication);
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 0.75,
      maxWidth: 300,
      maxHeight: 300,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };
    this.setState({ error: '' });
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        let source;
        // You can display the image using either:
        source = { uri: `data:image/jpeg;base64,${response.data}`, isStatic: true };

        const temp = response.data;

        //Or:
        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }

        this.setState({
          avatarSource: source,
          imgBase64: temp,
        });
      }
    });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Publicar
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Titulo:"
            placeholder="Titulo"
            onChangeText={this.onTitleChange.bind(this)}
            value={this.props.title}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Descripción:"
            placeholder="Descripción..."
            onChangeText={this.onDescriptionChange.bind(this)}
            value={this.props.description}
          />
        </CardSection>

        <View style={styles.container}>
          <CardSection>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
              { this.state.avatarSource === null ? <Text>Seleccionar imagen</Text> :
                <Image style={styles.avatar} source={this.state.avatarSource} />
              }
              </View>
            </TouchableOpacity>
          </CardSection>
        </View>

        <Text>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 200,
    height: 200
  }

};

const mapStateToProps = (state) => {
  return {
    title: state.publicationState.publication.title,
    description: state.publicationState.publication.description,
    image: state.publicationState.publication.image,
    id: state.auth.userId,
  };
};

export default connect(
  mapStateToProps,
  {
    setTitle,
    setDescription,
    setPublication,
    doUpload,
  }
)(PublicationForm);
