import React,{ Component } from 'react';
import {
	ScrollView,
	Text,
	TextInput,
	View,
	Image,
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
		 if(result.type === "success"){
		 	//check the type here
		 	let fileAr = result.name.split(".");
		 	let fileType = fileAr[fileAr.length-1];
		 	if(fileType.toLowerCase()==="csv"){
		 	// 	console.log(result);
				// var file = new File([""], result.name,{type: "text/csv", size: result.size});
				var data = new FormData();
				data.append("csvfile", { uri:result.uri, name:result.name,type: 'text/csv' });

				var xhr = new XMLHttpRequest();
				xhr.withCredentials = true;

				xhr.addEventListener("onload", function () {
				  alert("File uploaded");
				});

				xhr.open("POST", "http://192.168.0.101:3001/api/upload/attendance");
				xhr.setRequestHeader("Content-Type", "multipart/form-data");
				xhr.onload=()=>{
					alert("upload done");
				}
				xhr.send(data);
				// fetch("http://192.168.0.101:3001/api/upload/attendance", {
				//   method: 'post',
				//   header:{
				//   	"Content-Type" : "multipart/form-data"
				//   },
				//   body: data
				// }).then(res => {
				//   console.log(res)
				// });


		 	}
		 	else{
		 		alert("Upload a csv file please");
		 	}
		 }
      // if result.uri is not negative initiate the upload in an async way and when done show an alert.
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
			<View>
				<Text>The .csv should be of format:</Text>
				<Text>name,enrollment_no,department,event,year,section</Text>
				<Text>Abhishek,12014002002056,CSE,Innovacion,4,A</Text>
				<Text>Ekta Bihani,12014002002022,CSE,Innovacion,4,C</Text>
				<Text>Sanjana Jha,12014002002132,CSE,Innovacion,4,C</Text>
				<Text>Vivek Kedia,12014002002134,CSE,Innovacion,4,C</Text>
			</View>
			</ScrollView>
			)
	}
}