import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import socket from '../models/connection'
import {Message, messageFromList, messageFromObject} from '../models/message';
import UserDash from "../components/user_dash";
import { ChatMessages } from "../components/chat";
import {Grid } from "@mui/material";
import { not_connected } from "../messages/errors";
import {Info} from "../components/room_info";
import user from '../models/user';
import { ReceivedFile } from "../messages/received_file";

export const Room = ()=>{
    const [error, setError] = useState(0);
    const [receivedFiles, setReceived] = useState(null);
    const {state} = useLocation();
    const roomId = state.roomId;



    useEffect(()=>{
        const fileHandler = (data)=>{
            const files = data["files"];
            const blobs = files.map((file, index)=>{
                return {
                    name:file.name,
                    type:file.type,
                    data: new Blob([new Uint8Array(file.data)])
                }
                
            })
            setReceived(blobs);
        }
        if(socket.socket && socket.socket.connected){
            socket.socket.on('received_files', fileHandler)
        }else{
            setError('connection');
        }
        

        return ()=>{
            socket.socket.off('received_file',fileHandler);
        }

    }, [socket.socket]);



    const handle_errors = ()=>{
        if(error === 'connection'){
            return not_connected();
        }
    }

    const downloadFiles = ()=>{
        for(var file of receivedFiles){
            let flink = document.createElement('a');
            flink.type='download';
            flink.href = URL.createObjectURL(file);
            flink.download='file.png';
            flink.click();
        }

    }

    const declineFiles = (index)=>{
        receivedFiles.splice(index, 1);
        setReceived([...receivedFiles]);
    }


    return (
        <div>
            {receivedFiles? <ReceivedFile downloadHandler={downloadFiles} declineFiles={declineFiles} allFiles={receivedFiles}/>:null}
            {error!==0 || !socket.socket?handle_errors():
                   
                <Grid container direction='row' alignContent='center' spacing={4}>

                        <Grid item>
                            <UserDash 
                                room = {roomId}
                                />                            
                        </Grid>

                        <Grid item>
                            <ChatMessages
                                roomId={roomId}
                                />                              
                        </Grid>
                        <Grid item>
                            <Info
                                roomId={roomId}
                                />                              
                        </Grid>                        
                  
                    </Grid>

                
            }
        </div>

    );



}