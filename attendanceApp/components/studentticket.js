import React, { Component } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class studentticket extends Component{
	
	constructor(props){
		super(props);
		this.state={
					data : [{
						      value: 'Innovacion',
						    }, {
						      value: 'Cultural fest',
						    }, {
						      value: 'Food fest',
						    }],
						    selected: Date(),
				};
	}

	raise = () =>{
		fetch('http://localhost:3001/api/ticket',{
			method : 'POST',
			headers : {
				'Accept' : 'application/json', 
				'Content-Type' : 'application/json', 
			},
			body : JSON.stringify({
				name : this.state.username,
				enrollment_no : this.state.enrollNo,
				date : this.state.selected,
				event : this.state.event,
				department : this.state.dept
			})
		})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			alert("Ticket created!")
		})
	}
	changeEvent = (e) => {
		this.setState({ event: e });
	}
	componentDidMount(){
		console.log(this.props.navigation.state.params);
		this.setState({ id : this.props.navigation.state.params.id ,
		 username : this.props.navigation.state.params.username,
		 enrollNo : this.props.navigation.state.params.enrollNo,
		 dept : this.props.navigation.state.params.dept,
		  });
	}
	render(){
		return(
				<View style={styles.wrapper}>
					<Calendar
					current={this.state.selected}
					style = { styles.container }/>
					<Dropdown 
				label='Select event'
	        	data={this.state.data}
	        	onChangeText = { this.changeEvent }
	        	style={styles.textInput}/>
				<TouchableOpacity style={styles.button} onPress={this.raise}><Text>Raise Ticket</Text></TouchableOpacity>
				</View>
				
			
		)
	}
}
const styles = StyleSheet.create({
	wrapper:{
		flex : 1,
		backgroundColor : '#1abc9c',
		paddingLeft : 40,
		paddingRight : 40
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