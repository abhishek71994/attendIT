import React, { Component } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { View,StyleSheet,Text,Button } from 'react-native';
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
		this.onDayPress = this.onDayPress.bind(this);
	}
	onDayPress(day) {
	    this.setState({
	      selected: new Date(day.dateString)
	    });
	  }
	render(){
		return(
			<View>
				<Calendar
				current={this.state.selected} 
				onDayPress={this.onDayPress}/>
				<Dropdown 
				label='Select event'
        		data={this.state.data}/>
				<Button title="Raise Ticket" />
			</View>
		)
	}
}