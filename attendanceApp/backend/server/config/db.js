import mongoose from 'mongoose';
export default () => {
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/studentTicket');
	mongoose.connection
	.on('connected',()=> console.log('mongodb running'))
	.on('error',err => console.log('error is ',error));
}