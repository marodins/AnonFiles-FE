import {
    Alert,
    AlertTitle,
    Grid
} from '@mui/material';


export const not_connected = ()=>(
    <Grid 
        container
        spacing={0}
        direction='column'
        alignItems="center"
        justifyContent="center"
    >
        <Grid item xs={2}>
            <Alert severity='error'>
                <AlertTitle>Not Connected</AlertTitle>
                Unable to establish a connection - <strong>Please try again.</strong> 

            </Alert>

        </Grid>

    </Grid>
);
