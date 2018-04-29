import csv from 'csvtojson';
const studentList = [];
export const handleFile = (req,res)=>{
	const file = req.file.path;
	console.log(file);
	csv()
	.fromFile(file)
	.on('json',(jsonObj)=>{
	    // combine csv header row and csv line to a json object
	    // jsonObj.a ==> 1 or 4
	    studentList.push(jsonObj);
	})
	.on('done',(error)=>{
	    console.log(studentList);
	    //retrieve backend then think of something
	    return res.status(201).json({msg:"File uploaded"});
	})
}