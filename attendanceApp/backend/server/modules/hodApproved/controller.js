import MongoClient from 'mongodb';
export const approve = async (req,res)=>{
	//send the approved students emails
	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			const db = client.db('studentTicket');
			// update the count
			req.body.data.map(async dat=>{
					await db.collection('tickets').update({ enrollment_no : dat.enrollment_no },{ $set:{approved : true }});
			})
			//db.collection('tickets').update({ enrollment_no : req.body.enrollment_no },{ $set:{approved : true }});
			db.collection('tickets').find({ department: req.body.department, approved : true }).toArray((err, data) =>{
				if (err) console.log(err)
				else{
					data.forEach(
						(doc) => {
							console.log(doc);
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