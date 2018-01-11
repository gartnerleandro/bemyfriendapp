import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, AsyncStorage } from 'react-native';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  prueba,
  loginUserSuccess
} from '../actions/AuthActions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  componentWillMount() {
    AsyncStorage.multiGet(['username', 'userId']).then((data) => {
      if (data[1][1]) {
        const user = {
          username: data[0][1],
          id: data[1][1],
        };
        this.props.loginUserSuccess(user);
      }
    });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    const data = {
      email,
      password
    };
    // this.props.loginUser({ email, password });
    this.props.prueba(data);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Entrar
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Correo:"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Contraseña:"
            placeholder="contraseña"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            secureTextEntry
          />
        </CardSection>

        <Text>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
            <Button onPress={() => Actions.register()} >Regístrate</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, error } = auth;

  return { email, password, loading, error };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    prueba,
    loginUser,
    loginUserSuccess,
  }
)(LoginForm);
