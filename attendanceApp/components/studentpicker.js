import React,{ Component } from 'react';
import {
	Text,
	View,
	CheckBox,
	Button
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

export default class StudentPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			students : ['Abhishek Prasad', 'Gal Gadot', 'John Cena'],
			selectedStudents : [],
		};
		this.onSelectionsChange = this.onSelectionsChange.bind(this);
	}
	onSelectionsChange = (selectedStudents) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedStudents });
    //addition done removal left
  }
	render(){
		return(
			<View>
				<Text>StudentPicker component</Text>
				<SelectMultiple
		          items={this.state.students}
		          selectedItems={this.state.selectedStudents}
		          onSelectionsChange={this.onSelectionsChange} />
		          <Button title='Submit' />
			</View>
		)
	}
}