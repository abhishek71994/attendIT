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
						    selected: new Date(),
				};
	}

	raise = () =>{
		fetch('http://192.168.0.101:3001/api/ticket',{
			method : 'POST',
			headers : {
				'Accept' : 'application/json', 
				'Content-Type' : 'application/json', 
			},
			body : JSON.stringify({
				name : this.state.username,
				enrollment_no : this.state.enrollNo,
				date : Date(),
				event : this.state.event,
				department : this.state.dept,
				section : this.state.section,
				year : this.state.year
			})
		})
		.then((resp) => {
			if(resp.status===201){
				return resp.json();
			}
			else if(resp.status === 403){
				return resp.json();
			}
			else{
				throw new Error("Not working");
			}
		})
		.then((res) => {
			alert(res.ticket);
		}).catch(function(error) {
			alert("Ticket already exists");
		});
	}
	changeEvent = (e) => {
		this.setState({ event: e });
	}
	/* istanbul ignore next */
	componentDidMount(){
		
		this.setState({ id : this.props.navigation.state.params.id ,
		 username : this.props.navigation.state.params.username,
		 enrollNo : this.props.navigation.state.params.enrollNo,
		 dept : this.props.navigation.state.params.dept,
		 section : this.props.navigation.state.params.section,
		 year : this.props.navigation.state.params.year
		  });
	}
	getTime(){
		const time = new Date();
		return((time.getHours()>=9 && time.getMinutes()>0));
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
				<TouchableOpacity 
				style={styles.button} 
				disabled={this.getTime()}
				onPress={this.raise}
				>
				<Text>Raise Ticket</Text>
				</TouchableOpacity>
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
		marginTop : 40,
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