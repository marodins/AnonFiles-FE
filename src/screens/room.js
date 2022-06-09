import { useEffect } from "react";
import socket from '../models/connection'
import Message from '../models/message';
import { UserDash } from "../components/user_dash";

export const Room = ({roomId})=>{
    const [messages, setMessages] = useState(0);
    const [messageInput, setMessageInput] = useState(0);
    const [inRoom, setInRoom] = useState(0);

    useEffect(()=>{
        socket.socket.on('all_messages', (res)=>{
            setMessages(res);
        })
        socket.socket.emit('get_all_messages', {"room":roomId})

    })
    const send_message = (e)=>{
        const message = new Message(socket.socket.id, messageInput);
        messages.push(message);
        setMessages(messages);
        socket.socket.emit('send_message', {"room":roomId, "message":messageInput})
    }

    return (
        <Grid>
            <UserDash/>
        </Grid>
    );



}