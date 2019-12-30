import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Firebase, Auth} from './firebase';

import {Header, Button, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};

  componentDidMount() {
    Firebase;

    Auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.container}>
            <Button style={styles.logout} onPress={() => Auth.signOut()}>
              Log out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: 70,
    marginHorizontal: 20,
  },
  logout: {
    marginTop: 40,
  },
});

export default App;
