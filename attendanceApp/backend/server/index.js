import express from 'express';
import dbConfig from './config/db';
import Middleware from './config/middleware';
import { TicketRoute, LoginRoute, verifiedStudent, uploadRoute,ApproveRoute,VerifyRoute,DownloadRoute } from "./modules";
import Reset from './config/reset';
const app = express();

const PORT = process.env.PORT || 3001;


// Configuring the database
dbConfig();

// middleware
Middleware(app);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});
//resetting the app
Reset();
//adding api routes
app.use('/api',[ TicketRoute,LoginRoute,verifiedStudent,uploadRoute, ApproveRoute, VerifyRoute, DownloadRoute ]);

// for login details

app.listen(PORT,err=>{
	if(err){
		console.err(err);
	}
	else{
		console.log(`App is running on ${PORT}`);
	}
});