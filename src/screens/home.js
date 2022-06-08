
import {Button, Grid, TextField, Divider, Container} from '@mui/material';
import {TextFieldHome} from '../components/room_input';
import {useHistory} from 'react-router';

export var Home =({sock})=>{

    let history = useHistory();
    const SubmitButtonHandler = ()=>{
        sock.socket.emit("make_room");
        history.push('/rooms')
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
                    <Button variant="contained">
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