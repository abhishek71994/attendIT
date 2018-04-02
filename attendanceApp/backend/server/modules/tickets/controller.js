import Ticket from './model';

export const createTicket = async (req,res) => {
	const { name, enrollment_no, date, event } = req.body;
	const newTicket = new Ticket({ name, enrollment_no, date, event });

	try{
		return res.status(201).json({ticket: await newTicket.save()});
	}catch(e){
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}