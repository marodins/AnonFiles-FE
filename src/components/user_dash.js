import {useEffect, useState} from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';

import socket from '../models/connection';


export const UsersDash = ()=>{
    const [users, setUsers] = useState(0);
    useEffect(()=>{
        socket.socket.on('joined', ({user})=>{
            users.append(user);
            setUsers(users)
        })
    })
    return (
        <Grid container justifyContent={'left'}>
            <List>
             {
                users.map((item, index)=>{
                    return (
                        <ListItem>
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
        </Grid>
    )
}