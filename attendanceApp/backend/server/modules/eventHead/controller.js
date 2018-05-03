import csv from 'csvtojson';
const studentList = [];
export const handleFile = (req,res)=>{
	const file = req.file.path;
	console.log("the process  ",req);
	csv()
	.fromFile(file)
	.on('json',(jsonObj)=>{
	    // combine csv header row and csv line to a json object
	    // jsonObj.a ==> 1 or 4
	    studentList.push(jsonObj);
	})
	.on('done',(error)=>{
	    console.log(studentList);
	    //find a way to remove tickets that are not matching
	    //send email to the HOD's of the remaining tickets(check if that is possible.)
	    return res.status(201).json({msg:"File uploaded"});
	})
}