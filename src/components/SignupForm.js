import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { emailChanged, passwordChanged, signupUser } from '../actions/SignupActions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignupForm extends Component {
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
    this.props.signupUser(data);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Registrarse
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
          <Button onPress={() => Actions.auth()}>Iniciar sesión</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.signup.email,
    password: state.signup.password,
    error: state.signup.error,
  };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    signupUser,
  }
)(SignupForm);
