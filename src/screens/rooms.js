import {
    Grid,
    Button,
    TextField, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemButton,
    CircularProgress,
    Box
} from '@mui/material';
import { useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';


export var Rooms = ({sock}) => {
    const [rooms, setRooms] = useState(0);
    const [selectedIndex, setSelected] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        if(sock){
            sock.socket.on('all_rooms',(rooms)=>{
                setRooms(rooms);
            } )
            sock.socket.emit('get_rooms');            
        }else{
            navigate('/');
        }

    }, [])

    return (
        
        <Grid>
            {rooms === 0? 
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>:
                        <List>
            
                        {rooms.map((val, index)=>{
                            return (
                                <ListItem alignItems='flex-start' key={val}>
                                    <ListItemButton
                                        selected={selectedIndex===index}
                                        onClick={(e)=>{
                                            setSelected(index);
                                        }}
                                    >
                                        <ListItemText primary={val}/>
            
                                    </ListItemButton>
                                </ListItem>
                            );
            
                        })}
                        </List>
            }

        </Grid>
    )
}