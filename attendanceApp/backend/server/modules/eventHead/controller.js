import csv from 'csvtojson';
import MongoClient from 'mongodb';
export const handleFile = (req,res)=>{
	const file = req.file.path;
	csv()
	.fromFile(file)
	.on('json',(jsonObj)=>{
	    // combine csv header row and csv line to a json object
	    // jsonObj.a ==> 1 or 4
	    const obj = jsonObj;
	    MongoClient.connect('mongodb://localhost/', (err,client) =>{
			if (err) console.log(err);
			const db = client.db('studentTicket');
			// update the count
			console.log(obj);
			db.collection('tickets').update({ enrollment_no : jsonObj.enrollment_no },{ $set:{verified : true }});
		});
	})
	.on('done',(error)=>{
	    //find a way to remove tickets that are not matching
	    //send email to the HOD's of the remaining tickets(check if that is possible.)
	    return res.status(201).json({msg:"File uploaded"});
	})
}