import express from 'express';

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT,err=>{
	if(err){
		console.err(err);
	}
	else{
		console.log(`App is running on ${PORT}`);
	}
});