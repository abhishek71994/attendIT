import React,{ Component } from 'react';
import {
	Text,
	View,
	Button,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
//import SelectMultiple from 'react-native-select-multiple'; remove this if this doesnt work
import CheckBox from "react-native-check-box";
// import FileSystem from "react-native-filesystem";
// import { RNFS } from 'react-native-fs';
//var FileSaver = require('file-saver');
export default class StudentPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			students : [],
			selectedStudents : [],
			dept:this.props.navigation.state.params.dept
		};
		this.fetchResult = this.fetchResult.bind(this);
		this.send = this.send.bind(this);
	}

	onSelect = (selectedStudents) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedStudents });
    //addition done removal left
  }

  onSelection =  (selectedStudent) => {
    // selectedFruits is array of { label, value }
    
    //if selected then remove
    if(this.state.selectedStudents.find(function(obj){ return obj.name === selectedStudent.name } )){
    	let index = this.state.selectedStudents.findIndex(function(obj){ return obj.name === selectedStudent.name  } );
    	this.setState(prevState => { // pass callback in setState to avoid race condition
      let newData = prevState.selectedStudents.slice() //copy array from prevState
      newData.splice(index, 1) // remove element
      return {selectedStudents: newData} // update state
    });
    }
    else{
    	this.setState({ selectedStudents : [...this.state.selectedStudents, selectedStudent ] });
    }
    
    //addition done removal left
  }
  
  async componentWillMount(){
  	await this.fetchResult();
  }
  fetchResult=() => {
  	fetch('http://192.168.0.101:3001/api/student/verified',{
			method : 'POST',
			headers : {
				'Accept' : 'application/json', 
				'Content-Type' : 'application/json', 
			},
			body : JSON.stringify({
				department : this.state.dept
			})
		})
		.then((resp)=> resp.json())
		.then( (res) =>{
			//taking care of async storage later
			res.forEach((data) => {
				let obj = {name: data.name, enrollment_no : data.enrollment_no};
				if(data.approved !== undefined){
					console.log("here");
					this.setState({
						selectedStudents : [ ...this.state.selectedStudents , obj ]
					});
				}
				this.setState({
					students : [ ...this.state.students , obj ]
				});
			})
		})
  }
  postResult = () =>{
  	if(this.state.selectedStudents.length>0){
	  	fetch('http://192.168.0.101:3001/api/student/approved',{
				method : 'POST',
				headers : {
					'Accept' : 'application/json', 
					'Content-Type' : 'application/json', 
				},
				body : JSON.stringify({
					data : this.state.selectedStudents,
					department : this.state.dept
				})
			})
			.then((resp)=> resp.json())
			.then( (res) =>{
				console.log(res);
			})
  	}
  	else{
  		alert("Please select a student to approve");
  	}
  }
  // writeToFile = (file) => {
		// 	  const fileContents = file;
		// 	  await FileSystem.writeToFile('my-directory/my-file.csv', fileContents);
		// 	  console.log('file is written');
		// 	}
  download = () =>{
  	fetch(`http://192.168.43.109:3001/api/student/download`,{
			method : 'GET',
			headers : {
				'Accept' : 'application/json', 
				'Content-Type' : 'application/json', 
				'Dept': this.state.dept
			}
		})
	  	.then((resp)=> resp.blob())
	  	.then((blob)=> {
	  		console.log(blob);
	  		var file = new File([blob], "student.csv");
	  		console.log(file);
	  		// writeToFile(file);


	  // 		var path = RNFS.DocumentDirectoryPath + '/test.csv';

			// // write the file
			// RNFS.writeFile(path, file, 'utf8')
			//   .then((success) => {
			//     console.log('FILE WRITTEN!');
			//   })
			//   .catch((err) => {
			//     console.log(err.message);
			//   });

	  		// saveAs(file);
	  		//download(blob);
	  	})


	// var xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;


	// xhr.open("GET", "http://192.168.43.109:3001/api/student/download");
	// xhr.setRequestHeader("dept", "CSE");
	// xhr.setRequestHeader("Cache-Control", "no-cache");
	// console.log(xhr.responseType);
	// xhr.send();

	// const { uri: "./" } = await FileSystem.downloadAsync("http://192.168.43.109:3001/api/student/download", FileSystem.documentDirectory + 'name.csv');


  }
  componentDidMount(){
  	
			
  }
  componentWillUpdate(){
  	
  }
  send = () => {
  	this.postResult();
  	console.log(this.state.selectedStudents)
  }
	render(){

		return(
			<View style = {styles.wrapper}>
				<View style = {styles.container}>
				<Text>StudentPicker component</Text>
					<View>
					{
					 		(this.state.students.length>0) && this.state.students.map(data=>{
						 		return(<CheckBox
						 		key={data.enrollment_no}
						 		isChecked={this.state.selectedStudents.find(function(obj){ return obj.enrollment_no === data.enrollment_no } ) !== undefined}
								
								leftText={data.name+"("+data.enrollment_no+")"}
								onClick={()=> this.onSelection(data)}
								/>)
							 })
				 	}

					</View>
					<View>
						{ (this.state.students.length===0) && <Text>Event Head is yet to upload a ticket</Text> }
					</View>
		          	<TouchableOpacity style={styles.button} onPress={this.send}><Text>Approve</Text></TouchableOpacity>
		        </View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	wrapper:{
		flex : 1,
		backgroundColor : '#1abc9c',
	},
	container : {
		marginTop : 20,
		flex:1
	},
	textInput : {
		alignSelf : 'stretch',
		width : 50
	},
	button : {
		backgroundColor : '#16a085',
		alignSelf : 'stretch',
		padding : 20,
		alignItems : 'center'
	}
})