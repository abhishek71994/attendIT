import 'react-native';
import React from 'react';
// import Login from '../components/login';
// import App from '../App';
import StudentPicker from '../components/studentpicker';
// import StudentTicket from '../components/studentticket';
// import Upload from '../components/upload';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// it('renders correctly should set state on mount', () => {
//   const tree = renderer.create(
//     //<Login />
//     <StudentPicker />
//     //<App />
//     //<StudentTicket />
//     //<Upload />
//   );
// });
it('renders correctly', () => {
    const mockState={
    	state:{
    		params:{
    			dept:'CSE'
    		}
    	}
    }
    const tree = renderer.create(
    <StudentPicker navigation={mockState}/>
  );
  })
