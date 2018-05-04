import MongoClient from 'mongodb';
export const verify = async (req,res)=>{
	//send the approved students emails
	const department  = req.body.department;
	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);

			
			db.collection('tickets').find({ verified:true, department: department }).toArray((err, data) =>{
				if (err) console.log(err)
				else{
					data.forEach(
						(doc) => {
							return res.status(201).json(doc);
							}
					);
					
				}
			});
		});
		
	}catch(e){
		console.log("The error is here");
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
	//get a csv file of those approved students to HOD.
}