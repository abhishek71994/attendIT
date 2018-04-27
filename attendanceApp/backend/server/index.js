import express from 'express';
import dbConfig from './config/db';
import Middleware from './config/middleware';
import { TicketRoute, LoginRoute, verifiedStudent } from "./modules";
import Reset from './config/reset';
const app = express();

const PORT = process.env.PORT || 3001;


// Configuring the database
dbConfig();

// middleware
Middleware(app);

//resetting the app
//Reset();

app.use('/api',[ TicketRoute,LoginRoute,verifiedStudent ]);

// for login details

app.listen(PORT,err=>{
	if(err){
		console.err(err);
	}
	else{
		console.log(`App is running on ${PORT}`);
	}
});