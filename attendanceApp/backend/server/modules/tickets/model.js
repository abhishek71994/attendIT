import mongoose,{ Schema } from 'mongoose';

const TicketSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	enrollment_no:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: true
	},
	event:{
		type: String,
		required: true
	},
	department:{
		type:String,
		required :true
	}
});

export default mongoose.model('Tickets',TicketSchema);