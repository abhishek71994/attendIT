/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  SafeAreaView
} from 'react-native';
import StudentTicket from './components/studentticket';
import StudentPicker from './components/studentpicker';
import Login from './components/login';
import Upload from './components/upload';
import { StackNavigator } from 'react-navigation';
 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Application = StackNavigator({
  Home:{ screen:Login },
  StudentPicker : { screen : StudentPicker },
  Upload : {screen: Upload},
  StudentTicket : { screen : StudentTicket }
  },{
    navigatorOptions : {
      header: false,
    },
    transitionConfig: () => ({
    containerStyle: {
      marginTop: -40,
    }
  })
  });

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Application />
    );
  }
}

