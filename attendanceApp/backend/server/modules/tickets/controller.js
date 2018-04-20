import Ticket from './model';
import nodeMailer from 'nodemailer';

export const createTicket = async (req,res) => {
	const { name, enrollment_no, date, event, department } = req.body;
	const newTicket = new Ticket({ name, enrollment_no, date, event, department });
	try{
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
		return res.status(201).json({ticket: await newTicket.save()});
	}catch(e){
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}