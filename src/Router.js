import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HomePage from './components/HomePage';
import PublicationForm from './components/PublicationForm';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" initial />
      </Scene>

      <Scene key="register">
        <Scene key="signup" component={SignupForm} title="Signup" initial />
      </Scene>

      <Scene key="main">
        <Scene
        onRight={() => Actions.addpublication()}
        rightTitle="Add"
        key="home"
        component={HomePage}
        title="Inicio"
        />
        <Scene key="addpublication" component={PublicationForm} title="Add publication" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
