import MongoClient from 'mongodb';
export const verify = async (req,res) => {
	const { username, password } = req.body;

	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			
			const db = client.db('studentTicket');
			
			db.collection('loginData').find({ username: username },(err, data) =>{
				if (err) console.log(err)
				else{
					console.log(data);
					return res.status(201).json({ticket: 'things are working'});
				}
			});
		});
		
	}catch(e){
		console.log("The error is here");
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}