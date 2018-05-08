import MongoClient from 'mongodb';
export const verify = async (req,res) => {
	const { username, password } = req.body;

	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			
			const db = client.db('studentTicket');
			
			db.collection('loginData').find({ username: username,password:password }).toArray((err, data) =>{
				if (err) console.log(err)
				else{
					if(data.length === 0){
						return res.status(404).json({result:"Wrong credentials"});
					}
					else{
						data.forEach(
							(doc) => {
								return res.status(201).json(doc);
								}
						);
					}
					
				}
			});
		});
		
	}catch(e){
		console.log("The error is here");
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
}