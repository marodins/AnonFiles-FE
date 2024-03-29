
import { io, Socket } from "socket.io-client";
import c from '../config';
import {Room} from './room';
import User from '../models/user';

class SocketConnect {
    constructor(){
        this.socket = null;
        this.current_rooms = [];
        this.user = new User();
    }
    init_sock(token){
        const url = c.protocol+c.host+c.port+'/user';
        this.socket=io(url, {auth:{token:token}, transports:['websocket'], upgrade:false});
        console.log('socket is', this.socket.connected);
        this.user.token = token;
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
