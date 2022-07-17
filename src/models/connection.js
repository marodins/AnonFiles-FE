
import { io, Socket } from "socket.io-client";
import config from '../config.json';
import {Room} from './room';
import User from '../models/user';

class SocketConnect {
    constructor(){
        this.socket = null;
        this.current_rooms = [];
        this.user = new User();
    }
    init_sock(token){
        this.socket=io(config.server_url+'/user', {auth:{token:token}, transports:['websocket'], upgrade:false});
        this.user.token = token
    }
    
    registerEvents(){
        this.socket.on('disconnect', ()=>{
            console.log('disconnected');
        })
        this.socket.on('created', (room_info)=>{
            const new_room = new Room(room_info["room"], room_info["password"]);
            this.current_rooms.push(new_room);

        });
        this.socket.on('connected_data', ({user_id, user_name})=>{
            this.user.user_id = user_id;
            this.user.name = user_name;
        });
        this.socket.on('error', (err)=>{
            console.log('err', err);
        });
    }

}

export default new SocketConnect();
