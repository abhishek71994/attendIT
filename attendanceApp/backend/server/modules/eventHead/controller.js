import csv from 'csvtojson';
import MongoClient from 'mongodb';
export const handleFile = (req,res)=>{
	const file = req.file.path;
	csv()
	.fromFile(file)
	.on('json',(jsonObj)=>{
	    // combine csv header row and csv line to a json object
	    // jsonObj.a ==> 1 or 4
	    const obj = jsonObj;
	    MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			const db = client.db('studentTicket');
			// update the count
			db.collection('tickets').update({ enrollment_no : jsonObj.enrollment_no },{ $set:{verified : true }});
			db.collection('loginData').find({role:"hod"}).toArray((err, data) =>{
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
							const message = {
								from : 'xrace2018@gmail.com',
								to : `${mail.email}`,
								subject : 'Ticket notification',
								text : `students wont be attending your class`,
								html : `<p>The ticket has been updated. Please approve.</p>`,
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
	})
	.on('done',(error)=>{
	    //find a way to remove tickets that are not matching
	    //send email to the HOD's of the remaining tickets(check if that is possible.)
	    return res.status(201).json({msg:"File uploaded"});
	})
}