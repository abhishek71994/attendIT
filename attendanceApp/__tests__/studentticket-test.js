import 'react-native';
import React from 'react';
// import Login from '../components/login';
// import App from '../App';
// import StudentPicker from '../components/studentpicker';
import StudentTicket from '../components/studentticket';
// import Upload from '../components/upload';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// it('should set state on mount', () => {
//   const tree = renderer.create(
//     //<Login />
//     //<StudentPicker />
//     //<App />
//     <StudentTicket />
//     //<Upload />
//   );
// });
it('renders correctly', () => {
    const mockState={
    	state:{
    		params:{
    			dept:'CSE',
    			username: 'Abhishek',
    			enrollmentNo: '12014002002056',
    			id: 'something'
    		}
    	}
    }
    const tree = renderer.create(
    <StudentTicket navigation={mockState}/>
  );
  })
