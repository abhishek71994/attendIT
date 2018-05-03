import Schedule from 'node-schedule';
export default ()=>{
	Schedule.scheduleJob('*/5 * * * * *',function(){
		console.log("Hurricane!");
	});

	//defining rules for 9:05am teacher notification
	const rule = new Schedule.RecurrenceRule();
	rule.dayOfWeek = new schedule.Range(2, 6);//from tuesday to saturday
	rule.hour = 9;
	rule.minute = 5;


	const deprecationRule = new Schedule.RecurrenceRule();
	deprecationRule.dayOfWeek = new schedule.Range(2, 6);//from tuesday to saturday
	deprecationRule.hour = 10;
	deprecationRule.minute = 30;


	const j = schedule.scheduleJob(rule, function(){
		//notify the teacher about the tickets.
		//check the count and tell about a backup class
	  console.log('Today is recognized by Rebecca Black!');
	});
	const k = schedule.scheduleJob(deprecationRule, function(){
		//reset the tickets db
	  console.log('Today is recognized by Rebecca Black!');
	});
}

