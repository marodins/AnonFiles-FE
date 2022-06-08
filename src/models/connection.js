
import { io, Socket } from "socket.io-client";
import config from '../config.json';
import {Room} from './room';

class SocketConnect {
    constructor(){
        this.socket = null;
        this.current_rooms = [];
    }
    init_sock(){
        this.socket=io(config.server_url+'/user');
        this.registerEvents();

    }
    registerEvents(){
        this.socket.on('connect', ()=>{
            console.log('user_connected', this.socket.id, this.socket.connected);
        });
        this.socket.on('disconnect', ()=>{
            console.log('disconnected')
        })
        this.socket.on('joined', (room_info)=>{
            console.log('room info',room_info);
        });
        this.socket.on('created', (room_info)=>{
            const new_room = new Room(room_info["room"], room_info["password"]);
            this.current_rooms.push(new_room);

        });

        this.socket.on('message', (message)=>{
            console.log('message', message);
        });
    }

}

export default SocketConnect;
