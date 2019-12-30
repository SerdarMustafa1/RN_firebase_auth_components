import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {Auth} from '../firebase';

import {Button, Card, CardSection, Spinner} from './common';

// const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    hidePassword: true,
    error: '',
    loading: false,
  };

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({error: '', loading: true});

    Auth.signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        Auth.createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({error: 'Authentication Failed!', loading: false});
  }

  onLoginSuccess() {
    this.setState({email: '', password: '', loading: false, error: ''});
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <CardSection>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="off"
              value={this.state.email}
              style={styles.input}
              placeholder="john@smith.com"
              onChangeText={email => this.setState({email})}
              keyboardType="email-address"
            />
          </CardSection>
          <CardSection>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="off"
              value={this.state.password}
              style={styles.input}
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              secureTextEntry={this.state.hidePassword}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touchableButton}
              onPress={this.setPasswordVisibility}>
              <Image
                source={
                  this.state.hidePassword
                    ? require('../../assets/hide.png')
                    : require('../../assets/view.png')
                }
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </CardSection>
          <Text style={styles.error}>{this.state.error}</Text>
          <CardSection>{this.renderButton()}</CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  inputLabel: {
    marginRight: 20,
  },
  input: {
    height: 20,
    width: deviceWidth - 32,
    flex: 2,
  },
  password: {
    height: 20,
    width: deviceWidth - 32,
    flex: 2,
  },
  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default LoginForm;
