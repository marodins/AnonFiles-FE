
import { io, Socket } from "socket.io-client";
import config from '../config.json';
import {Room} from './room';

class SocketConnect {
    constructor(){
        this.socket = null;
        this.current_rooms = [];
    }
    init_sock(token){
        this.socket=io(config.server_url+'/user', {auth:{token:token}});
        this.registerEvents();

    }
    registerEvents(){
        this.socket.on('disconnect', ()=>{
            console.log('disconnected');
        })
        this.socket.on('created', (room_info)=>{
            const new_room = new Room(room_info["room"], room_info["password"]);
            this.current_rooms.push(new_room);

        });
        this.socket.on('error', (err)=>{
            console.log('err', err);
        });
    }

}

export default new SocketConnect();
