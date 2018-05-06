import MongoClient from 'mongodb';
export const approve = async (req,res)=>{
	//send the approved students emails
	const approved = [];
	try{
		MongoClient.connect('mongodb://localhost/', async (err,client) =>{
			if (err) console.log(err);
			const db = client.db('studentTicket');
			// update the count
			req.body.data.map(async dat=>{
					await db.collection('tickets').update({ enrollment_no : dat.enrollment_no },{ $set:{approved : true }});
			})
			
			db.collection('tickets').update({ enrollment_no : req.body.enrollment_no },{ $set:{approved : true }});
			await db.collection('tickets').find({ department: req.body.department, approved : true }).toArray((err, data) =>{
				if (err) console.log(err)
				else{
					const stream = fs.createWriteStream(`attendance_${req.body.department}.csv`);
					stream.once('error', function(doc) { console.log(doc) });
					data.forEach(
						(doc) => {
 							  stream.write(JSON.stringify(doc));
							}
					);
					stream.end();
					const filename = __dirname+"../../../../"+`attendance_${req.body.department}.csv`;
					return res.status(201).send(doc:"file is created");
					
				}
			});
			//fs.writeFileSync(`../../uploads/attendance_${req.body.department}.csv`)
			
		});
		
	}catch(e){
		console.log("The error is here");
		return res.status(e.status).json({error:true,message:"Error with Tickets"});
	}
	//get a csv file of those approved students to HOD.
}