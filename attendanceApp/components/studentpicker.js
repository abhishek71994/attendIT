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
		};
		this.onSelectionsChange = this.onSelectionsChange.bind(this);
		this.fetchResult = this.fetchResult.bind(this);
	}
	onSelectionsChange = (selectedStudents) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedStudents });
    //addition done removal left
  }

  
  componentWillMount(){
  	/* istanbul ignore next */
  	this.setState(
  		{ dept : this.props.navigation.state.params.dept })
  	;
  }
  /* istanbul ignore next */
  fetchResult=() => {
  	fetch('http://localhost:3001/api/student/verified',{
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
  componentDidMount(){
  	this.fetchResult();
			
  }
	render(){
		return(
			<View style = {styles.wrapper}>
				<Text>StudentPicker component</Text>
				<SelectMultiple
		          items={this.state.students}
		          selectedItems={this.state.selectedStudents}
		          onSelectionsChange={this.onSelectionsChange} />
		          <TouchableOpacity style={styles.button}><Text>Approve</Text></TouchableOpacity>
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
		marginTop : 10,
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