import MongoClient from 'mongodb';
export const approve = async (req,res)=>{
	//send the approved students emails
	try{
		MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			const db = client.db('studentTicket');
			// update the count
			req.body.data.map(dat=>{
					db.collection('tickets').update({ enrollment_no : dat.enrollment_no },{ $set:{approved : true }});
			})
			//db.collection('tickets').update({ enrollment_no : req.body.enrollment_no },{ $set:{approved : true }});
			return res.status(201).json({msg:"Students approved"});
		});
		
	}catch(e){
		console.log("The error is here");
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
	//get a csv file of those approved students to HOD.
}