import mongoose,{ Schema } from 'mongoose';

const TicketSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	enrollment_no:{
		type: Number,
		required: true
	},
	data:{
		type: Date,
		required: true
	},
	event:{
		type: String,
		required: true
	}
});

export default mongoose.model('Tickets',TicketSchema);