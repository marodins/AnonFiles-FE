
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {useState, useEffect} from 'react';

import {Home} from './screens/home';
import {Rooms} from './screens/rooms';
import config from './config.json';
import SocketConnect from './models/connection';
import {io} from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(0);

  useEffect(()=>{
    const newSock = new SocketConnect();
    newSock.init_sock();
    setSocket(newSock);
    return ()=>{
      newSock.socket.close();
    }
  }, [setSocket]);
  
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home sock={socket}/>}/>
          <Route path='/rooms' element={<Rooms sock={socket}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
