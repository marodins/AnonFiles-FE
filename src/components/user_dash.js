import {useEffect, useState} from 'react';
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box
} from '@mui/material';

import socket from '../models/connection';


const UsersDash = ({room})=>{
    const [usersList, setUsers] = useState([socket.user.name]);
    useEffect(()=>{
        console.log('cb invoked');
        socket.socket.on('joined', ({user})=>{
            setUsers([...usersList, user])
        })
        socket.socket.on('all_users', ({users})=>{
            let filtered = users.filter(item=>!usersList.includes(item));
            filtered = [...filtered, ...usersList];
            setUsers(filtered)
            console.log('getting users', users);
    })
        socket.socket.emit('get_users', {"room":room});
    },[socket.socket, setUsers]);
    return (
    <Grid container direction='column' justifyContent='left' alignItems='left' spacing={0} xs={3}>
        <Grid item xs={1}>
            {usersList.length == 0? null:
                <List>
                {
                    usersList.map((item, index)=>{
                        return (
                            <ListItem key={item}>
                                <ListItemButton>
                                    <ListItemText>
                                        {item}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }               
                </List>
            }
        </Grid>
        </Grid>
    )
}

export default UsersDash;