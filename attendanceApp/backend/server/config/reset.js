import Schedule from 'node-schedule';
export default ()=>{
	Schedule.scheduleJob('*/5 * * * * *',function(){
		console.log("Hurricane!");
	})
}