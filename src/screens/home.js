
import {Button, Grid, TextField, Divider, Container} from '@mui/material';
import {TextFieldHome} from '../components/room_input';
import {useNavigate} from 'react-router';

export var Home =({sock})=>{

    let navigate = useNavigate();
    const submitButtonHandler = ()=>{
        if(sock.socket.connected){
            sock.socket.emit("make_room");
            navigate('/rooms');         
        }else{
            console.log('socket not connected');
        }
    }
    return (
        <Container>
            <Grid
            container spacing={2}
            rowSpacing={2}
            columnSpacing={{xs:3, md:2}}
            direction='column'
            alignItems='center'
            justifyContent='center'
            >
                <Grid item xs>
                    <Button variant="contained" onClick={submitButtonHandler}>
                        Make Room
                    </Button>
                </Grid>
                <Grid item xs>
                <Divider>or</Divider> 
                </Grid>
                
                <TextFieldHome sock={sock}/>
      

            </Grid>
        </Container>

    );
}