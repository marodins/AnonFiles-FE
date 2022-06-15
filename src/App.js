
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
import config from './config.json';

import {io} from 'socket.io-client';
import {Room} from './screens/room';
import axios from './network/axios_instance';
import {useCookies} from 'react-cookie';

function App() {
  const [, setSocket] = useState(0);
  const [cookies, setCookie] = useCookies(['token_id'])

  useEffect(()=>{
    //send cookie on connect only!!!
    //handle on connect server side
    console.log(cookies);
    sock.init_sock();
    sock.socket.on('connect', ()=>{  
      setSocket(sock);
      console.log('user connected', sock.socket.id);
    })
    return ()=>{
      sock.socket.close();
    }
  }, [setSocket]);
  
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<Rooms/>}/>
          <Route path='/room' element={<Room/>}/>
        </Routes>
    </Router>
  );
}

export default App;
