import {useEffect, useState} from 'react';
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Typography,
    Divider
} from '@mui/material';

import socket from '../models/connection';


const UsersDash = ({room})=>{
    const user_id = socket.user.user_id;
    const user_name = socket.user.name;
    const [usersList, setUsers] = useState([{user_id:user_name}]);

    useEffect(()=>{
        console.log('adding join etc')
        const handleJoined = ({user})=>{
            setUsers((prev)=>[...prev,user]);
        }
        const handleAll = ({users})=>{
            //let user_ids = Object.keys(users);
            //let filtered = users.filter(item=>!usersList.includes(item));
            //filtered = [...filtered, ...usersList];
            setUsers(users);
        }
        const handleLeft = ({user})=>{
            setUsers((usersList)=>usersList.filter(item=>{
                const [user_id, user_name] = Object.entries(item)[0];
                return user_id !== user;
            }));
        }
        socket.socket.on('joined',handleJoined);
        socket.socket.on('all_users', handleAll);
        socket.socket.on('left', handleLeft);
        socket.socket.emit('get_users', {"room":room});

        return ()=>{
            console.log('removing joined, all_users, left');
            socket.socket.off('joined', handleJoined);
            socket.socket.off('all_users', handleAll);
            socket.socket.off('left', handleLeft);
        }

    }, [socket.socket]);
    return (
    <Grid container direction='column' justifyContent='left' alignItems='left' spacing={3}>
        <Grid item xs={2}>
            <Grid container justifyContent={'center'}>
                <Typography variant='h7'>USERS</Typography>
                <Divider/>                    
            </Grid>
           
        </Grid>
            
        
        <Grid item xs={1}>
            {usersList.length == 0? null:
                <List>
                {
                    usersList.map((item, index)=>{
                        let [user_id, user_name] = Object.entries(item)[0];
                        return (
                            <ListItem key={user_id}>
                                <ListItemButton>
                                    <ListItemText>
                                        {user_name}
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