import React,{ Component } from 'react';
import {
	Text,
	View,
	CheckBox,
	Button,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
export default class StudentPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			students : [],
			selectedStudents : [],
			dept:''
		};
		this.fetchResult = this.fetchResult.bind(this);
		this.send = this.send.bind(this);
	}

	onSelect = (selectedStudents) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedStudents });
    //addition done removal left
  }

  onSelection =  async (selectedStudent) => {
    // selectedFruits is array of { label, value }
    console.log(selectedStudent);
    await this.setState({ selectedStudents : [...this.state.selectedStudents, selectedStudent ] });
    //addition done removal left
  }
  
  componentWillMount(){
  	// function checkProp(obj, key) {
   //    let r = false;
   //    for (let i in obj) {
   //      if (i == key) return true;
   //      if (typeof obj[i] == 'object') r = checkProp(obj[i], key)
   //    }
   //    return r;
   //  }
  	// /* istanbul ignore next */
  	// if(this.props){
  	// 	if(this.checkProp(this.props,dept)){
  	// 		this.setState({ dept : this.props.navigation.state.params.dept });
  	// 	}
  	// }
  	this.setState({ dept : this.props.navigation.state.params.dept });
  	
  }
  /* istanbul ignore next */
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
					this.setState({
						students : [ ...this.state.students , data.name ]
					});
			})
		})
  }
  // postResult = () =>{
  // 	fetch('http://192.168.0.101:3001/api/student/approved',{
		// 	method : 'POST',
		// 	headers : {
		// 		'Accept' : 'application/json', 
		// 		'Content-Type' : 'application/json', 
		// 	},
		// 	body : JSON.stringify({
		// 		department : this.state.dept
		// 	})
		// })
		// .then((resp)=> resp.json())
		// .then( (res) =>{
		// 	//taking care of async storage later
		// 	// res.forEach((data) => {
		// 	// 		this.setState({
		// 	// 			students : [ ...this.state.students , data.name ]
		// 	// 		});
		// 	// })
		// })
  // }
  componentDidMount(){
  	this.fetchResult();
			
  }
  send = () => {
  	console.log(this.state);
  }
	render(){
		return(
			<View style = {styles.wrapper}>
				<View style = {styles.container}>
				<Text>StudentPicker component</Text>
					<SelectMultiple
			        	items={this.state.students}
		          		onSelectionsChange={this.onSelection}
		          		selectedItems={this.state.selectedStudents} 
		          		enableEmptySections/>
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