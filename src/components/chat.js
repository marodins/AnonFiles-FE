import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Box
} from '@mui/material';

export const ChatMessages = ({messages})=>{

    return (
        <List>
            { messages==0?<Box></Box>:
                messages.map((m, index)=>{
                    return (
                        <ListItem key={index}>
                            <Grid item>
                                <ListItemText>
                                    {`${m.message}  
                                    ${m.time}   
                                    ${m.user}`}
                                </ListItemText>
                            </Grid>
                            
                        </ListItem>
                    );
                })
            }
        </List>
    )
}