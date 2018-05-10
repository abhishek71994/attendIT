import Ticket from './model';
import nodeMailer from 'nodemailer';
import MongoClient from 'mongodb';
export const createTicket = async (req,res) => {
	const { name, enrollment_no, date, event, department,section,year } = req.body;
	const day = "Saturday";
	const newTicket = new Ticket({ name, enrollment_no, date, event, department, section, year });
	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			const db = client.db('studentTicket');
			db.collection('tickets').find({ enrollment_no:enrollment_no.toString(),event:event }).toArray(async (err,data)=>{

				if(err) console.log(err);
				else if(data.length >= 1){
					return res.status(404).json({ticket: "already created"});
				}
				else{
					db.collection('count').update({year : year , section : section , department: department, day: day },{ $inc:{"count":1} });
					return res.status(201).json({ticket: await newTicket.save()});
				}
				console.log(enrollment_no,event,data);
			});
			// update the count
			
			
		});

		
	}catch(e){
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}