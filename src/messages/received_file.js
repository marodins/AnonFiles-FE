
import {
    Alert,
    AlertTitle,
    Grid,
    Button,
    List,
    ListItem,
    ListItemText,
    Link
} from '@mui/material';

import {
    Close
} from '@mui/icons-material'

export const ReceivedFile = ({downloadHandler, declineFiles, allFiles})=>{

    return (
        <Grid 
        container
        spacing={0}
        direction='column'
        alignItems="center"
        justifyContent="center"
        >
        <Grid item xs={2}>
            <Alert severity='success'>
                <AlertTitle>File Received</AlertTitle>
                <List>
                    {allFiles.map((file, index)=>{
                        return (   
                            <ListItem>
                                <Grid container direction='column'>
                                    <Grid item>
                                        <ListItemText>{file.name}</ListItemText>
                                    </Grid>
                                    <Grid item>
                                        
                                            <Link type='download' href={URL.createObjectURL(file.data)} download={file.name} underline='none'>
                                                <Button variant='contained'>
                                                    Accept
                                                </Button>
                                            </Link>
                                        
                                        <Button onClick={()=>declineFiles(index)}><Close/></Button>                             
                                    </Grid>

                                </Grid>   
                            </ListItem>
                        )
                    })}                    
                </List>



            </Alert>

        </Grid>

    </Grid>
    )
}