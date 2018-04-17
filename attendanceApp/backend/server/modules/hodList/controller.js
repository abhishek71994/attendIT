import MongoClient from 'mongodb';
export const verify = async (req,res) => {
	const { department } = req.body;
	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			
			const db = client.db('studentTicket');
			
			db.collection('tickets').find({ department : department }).toArray((err, data) =>{
				if (err) console.log(err)
				else{
					return res.status(201).json(data);
				}
			});
		});
		
	}catch(e){
		console.log("The error is here");
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}