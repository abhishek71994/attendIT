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
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
export default class Upload extends Component{
	constructor(props){
		super(props);
		this.uploadFile = this.uploadFile.bind(this);
	}
	uploadFile() {
		console.log('Upload pressed');

		DocumentPicker.show({
	      filetype: [DocumentPickerUtil.pdf()],
	    },(error,res) => {
	      // Android
	      console.log(
	         res.uri,
	         res.type, // mime type
	         res.fileName,
	         res.fileSize
	      );
	    });
	} 
	render(){
		return(
			<ScrollView style={{padding: 20}}>
				<Text>Upload the attendance file</Text>
				<Icon
				name='plus-circle'
				size={300}
				onPress={this.uploadFile}
				style={{ marginLeft:40 }}
				/>
				<TouchableOpacity><Text>Upload File</Text></TouchableOpacity>
			</ScrollView>
			)
	}
}