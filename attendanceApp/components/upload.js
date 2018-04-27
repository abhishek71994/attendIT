import React,{ Component } from 'react';
import {
	ScrollView,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DocumentPicker, ImagePicker} from 'expo';
export default class Upload extends Component{
	constructor(props){
		super(props);
	}
	_pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  alert(result.uri);
      console.log(result);
	}
	render(){
		return(
			<ScrollView style={{padding: 20}}>
				<Text>Upload the attendance file</Text>
				<Icon
				name='plus-circle'
				size={300}
				onPress={this._pickDocument}
				style={{ marginLeft:40 }}
				/>
				<TouchableOpacity><Text>Upload File</Text></TouchableOpacity>
			</ScrollView>
			)
	}
}