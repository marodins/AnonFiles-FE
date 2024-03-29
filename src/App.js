
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {useState, useEffect} from 'react';
import sock from './models/connection';
import {Home} from './screens/home';
import {Rooms} from './screens/rooms';

import {io} from 'socket.io-client';
import {Room} from './screens/room';
import {useCookies} from 'react-cookie';


function App() {
  const [, setSocket] = useState(0);
  const [cookies, setCookie] = useCookies(['token_id'])

  useEffect(()=>{
    //send cookie on connect only!!!
    //handle on connect server side
    sock.init_sock(cookies.token);
    sock.registerEvents();
    sock.socket.on('connect', ()=>{

      setSocket();
      
    });
    return ()=>{
      sock.socket.close();
    }
  }, [setSocket]);
  
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home cookies={cookies}/>}/>
          <Route path='/rooms' element={<Rooms/>}/>
          <Route path='/room' element={<Room/>}/>
        </Routes>
    </Router>
  );
}

export default App;
