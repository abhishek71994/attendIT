import express from 'express';
import dbConfig from './config/db';
import Middleware from './config/middleware';
import { TicketRoute } from "./modules";

const app = express();

const PORT = process.env.PORT || 3001;


// Configuring the database
dbConfig();

// middleware
Middleware(app);

app.use('/api',[ TicketRoute ]);

app.listen(PORT,err=>{
	if(err){
		console.err(err);
	}
	else{
		console.log(`App is running on ${PORT}`);
	}
});