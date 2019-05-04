import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

class LoginScreen extends Component {
  onEmailChange(text) {
    // note: this method comes from the 'actions' index.js
    // it sends the action of type 'email_changed' to all reducers
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Card style={{ paddingTop: 40 }}>

        <CardSection>
          <Input
            label="Email"
            placeholder="email@example.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}
        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  // adds this.props.email etc to available props inside component
  // also causes the component to update and rerender whenever email is changed
  //   in the textbox, because whenever props change a component updates and rerenders
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

// the emailChanged action becomes a function inside our component (this.props.emailChanged())
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginScreen);
