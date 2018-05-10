import Schedule from 'node-schedule';
import MongoClient from 'mongodb';
import nodeMailer from 'nodemailer';

export default ()=>{
	// Schedule.scheduleJob('*/5 * * * * *',function(){
	// 	console.log("Hurricane!");
	// });

	//defining rules for 9:05am teacher notification
	const rule = new Schedule.RecurrenceRule();
	rule.dayOfWeek = new Schedule.Range(2, 6);//from tuesday to saturday
	rule.hour = 9;
	rule.minute = 20;
		
	const approve = new Schedule.RecurrenceRule();
	approve.dayOfWeek = new Schedule.Range(2, 6);//from tuesday to saturday
	approve.hour = 5;
	approve.minute = 0;

	const deprecationRule = new Schedule.RecurrenceRule();
	deprecationRule.dayOfWeek = new Schedule.Range(2, 6);//from tuesday to saturday
	deprecationRule.hour = 22;
	deprecationRule.minute = 30;

	


	const j = Schedule.scheduleJob(rule, function(){
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			
			const db = client.db('studentTicket');
			db.collection('count').find().toArray((err, ret) =>{
				if (err) console.log(err)
				else{
					ret.forEach((data)=>{
						if(data.count > 0){
							db.collection('routine').find({day:data.day,year: data.year,section: data.section,department:data.department}).toArray((err, roudata) =>{
								if (err) console.log(err)
								else{
									if(roudata.length !== 0){
										roudata[0].routine.forEach((teach)=>{
											db.collection('teacher').find({ name:teach }).toArray((err, faculty) =>{
												if (err) console.log(err)
												else{
													faculty.forEach((mail)=>{
														const transporter = nodeMailer.createTransport({
															service : 'Gmail',
															auth : {
																user : 'xrace2018@gmail.com',
																pass : 'innovacion18'
															}
														});
														if(data.count>15){
															const message = {
																from : 'xrace2018@gmail.com',
																to : `${mail.email}`,
																subject : 'Ticket notification',
																text : `${data.count} students wont be attending your class`,
																html : `<p>${data.count} students wont be attending your class. You can request a backup class</p>`,
															}
														}
														else{
															const message = {
																from : 'xrace2018@gmail.com',
																to : `${mail.email}`,
																subject : 'Ticket notification',
																text : `${data.count} students wont be attending your class`,
																html : `<p>${data.count} student(s) wont be attending your class.</p>`,
															}
														}
														
														transporter.sendMail(message,(err,res)=>{
															if(err) console.log(err);

															console.log(res);
														})
													})
													
													
												}
											});
										})
									}
									
								}
							});
						}
					})
				}
			});
			
		});
		
		//check the count and tell about a backup class
	  console.log('Today is recognized by Rebecca Black!');
	});
	// const k = Schedule.scheduleJob(deprecationRule, function(){
	// 	//reset the tickets db
	//   console.log('Today is recognized by Rebecca Black!');
	// });
	const p = Schedule.scheduleJob(approve, function(){
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			
			const db = client.db('studentTicket');
			
			db.collection('loginData').find().toArray((err, data) =>{
				if (err) console.log(err)
				else{
					if(data.length === 0){
						return res.status(404).json({result:"Wrong credentials"});
					}
					else{
						data.forEach((mail)=>{
							const transporter = nodeMailer.createTransport({
							service : 'Gmail',
							auth : {
								user : 'xrace2018@gmail.com',
								pass : 'innovacion18'
							}
							});
							if(mail.approved===true){
								const message = {
									from : 'xrace2018@gmail.com',
									to : `${mail.email}`,
									subject : 'Ticket notification',
									text : `students wont be attending your class`,
									html : `<p>Your ticket has been approved</p>`,
								}
							}
							else{
								const message = {
									from : 'xrace2018@gmail.com',
									to : `${mail.email}`,
									subject : 'Ticket notification',
									text : `students wont be attending your class`,
									html : `<p>Your ticket has not been approved</p>`,
								}
							}
							
							transporter.sendMail(message,(err,res)=>{
								if(err) console.log(err);

								console.log(res);
							})
						})
					}
					
				}
			});
		});
	});
}

