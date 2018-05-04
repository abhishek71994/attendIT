import Ticket from './model';
import nodeMailer from 'nodemailer';
import MongoClient from 'mongodb';
export const createTicket = async (req,res) => {
	const { name, enrollment_no, date, event, department,section,year } = req.body;
	const day = date.getDay();
	const newTicket = new Ticket({ name, enrollment_no, date, event, department, section, year });
	try{
		// const transporter = nodeMailer.createTransport({
		// 	service : 'Gmail',
		// 	auth : {
		// 		user : 'xrace2018@gmail.com',
		// 		pass : ''
		// 	}
		// });
		// const message = {
		// 	from : 'xrace2018@gmail.com',
		// 	to : 'abhishek71994@gmail.com',
		// 	subject : 'Ticket notification',
		// 	text : `${name} raised a ticket to not attend class on ${date}`,
		// 	html : `<p>${name} raised a ticket to not attend class on ${date}</p>`,
		// }
		// transporter.sendMail(message,(err,res)=>{
		// 	if(err) console.log(err);

		// 	console.log(res);
		// })
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			
			const db = client.db('studentTicket');
			//get the array of approves students
			//loop through those students to find the right ones.
			// send email to them and 
			db.collection('tickets').update({year : this.year , section : this.section , department: this.department, day: this.day })
		});

		return res.status(201).json({ticket: await newTicket.save()});
	}catch(e){
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}