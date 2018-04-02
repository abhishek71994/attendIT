import mongoose from 'mongoose';

export default () => {
	mongoose.promises = global.promises;

	mongoose.connect('mongodb://localhost/studentTicket');
	mongoose.connection
	.once('open',()=>{
		console.log('mongodb running');
	}).on('error',err => console.err(error));
}