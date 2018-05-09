import Schedule from 'node-schedule';
import MongoClient from 'mongodb';
import nodeMailer from 'nodemailer';

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
	deprecationRule.hour = 22;
	deprecationRule.minute = 30;


	const j = schedule.scheduleJob(rule, function(){
		//notify the teacher about the tickets.
		db.collection('count').find().toArray((err, data) =>{
				if (err) console.log(err)
				else{
					if(data.count > 0){
						db.collection('routine').find({day:data.day,year: data.year,section: data.section,department:data.department}).toArray((err, roudata) =>{
							if (err) console.log(err)
							else{
								if(roudata.length !== 0){
									roudata.routine.foEach((teach)=>{
										db.collection('teacher').find({ name:teach }).toArray((err, data) =>{
											if (err) console.log(err)
											else{
												const transporter = nodeMailer.createTransport({
													service : 'Gmail',
													auth : {
														user : 'xrace2018@gmail.com',
														pass : ''
													}
												});
												const message = {
													from : 'xrace2018@gmail.com',
													to : 'abhishek71994@gmail.com',
													subject : 'Ticket notification',
													text : `${name} raised a ticket to not attend class on ${date}`,
													html : `<p>${name} raised a ticket to not attend class on ${date}</p>`,
												}
												transporter.sendMail(message,(err,res)=>{
													if(err) console.log(err);

													console.log(res);
												})
												
											}
										});
									})
								}
								
							}
						});
					}
					
				}
			});
		//check the count and tell about a backup class
	  console.log('Today is recognized by Rebecca Black!');
	});
	const k = schedule.scheduleJob(deprecationRule, function(){
		//reset the tickets db
	  console.log('Today is recognized by Rebecca Black!');
	});
}

