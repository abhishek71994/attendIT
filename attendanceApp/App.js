import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./components/login";
import StudentTicket from './components/studentticket';
import StudentPicker from './components/studentpicker';
import Upload from './components/upload';
import { StackNavigator } from 'react-navigation';
import "babel-polyfill";
if(typeof global.self === "undefined")
{
    global.self = global;
}
export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Application />
      </View>
    );
  }
}
const Application = StackNavigator({
  Home:{ screen:Login ,navigationOptions: { header: null }},
  StudentPicker : { screen : StudentPicker,navigationOptions: { header: null } },
  Upload : {screen: Upload,navigationOptions: { header: null }},
  StudentTicket : { screen : StudentTicket,navigationOptions: { header: null } }
  },{
    transitionConfig: () => ({
    containerStyle: {
    }
  })
  });
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
