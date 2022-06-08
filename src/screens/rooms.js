import {Grid,Button,TextField, List, ListItem, ListItemText, ListItemButton} from '@mui/material';
import { useEffect } from 'react';



export var Rooms = ({socket}) => {
    const [rooms, setRooms] = useState(0);
    const [selectedIndex, setSelected] = useState(0);

    useEffect(()=>{
        socket.socket.emit('get_rooms');
        setRooms(socket.current_rooms);
    })

    return (
        <Grid>
            <List>
            
            {rooms.map((val, index)=>{
                return (
                    <ListItem alignItems='flex-start'>
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
        </Grid>
    )
}