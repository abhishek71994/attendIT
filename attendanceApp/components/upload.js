import React,{ Component } from 'react';
import {
	ScrollView,
	Text,
	TextInput,
	View,
	Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Upload extends Component{
	render(){
		return(
			<ScrollView style={{padding: 20}}>
				<Text>Upload the attendance file</Text>
				<Icon
				name='plus-circle'
				size={300}
				style={{ marginLeft:40 }}
				/>
				<Button title="Submit"/>
			</ScrollView>
			)
	}
}