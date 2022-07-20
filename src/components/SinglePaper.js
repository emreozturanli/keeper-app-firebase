import {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TitleIcon from '@mui/icons-material/Title';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import EditIcon from '@mui/icons-material/Edit';
import DialogComponent from './DialogComponent';
import { Grid, Paper, Typography } from '@mui/material'

const SinglePaper = ({deleteNote, updateNote,e}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Grid item >
            <DialogComponent title={e.title} desc={e.desc} author={e.author} open={open} setOpen={setOpen} />
            <Paper sx={{ width: '300px', borderRadius: '20px' }} >
                <List sx={{ width: '100%', bgcolor: 'whitesmoke', borderRadius: '20px' }}>
                    <ListItem sx={{ overflow: 'hidden' }}>
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <TitleIcon color='info' />
                            </Avatar>
                        </ListItemAvatar>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}> <Typography noWrap variant='h5' > {e.title}</Typography>  </div>
                    </ListItem>

                    <ListItem sx={{ overflow: 'hidden' }}>
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <PersonIcon color='info' />
                            </Avatar>
                        </ListItemAvatar>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}> <Typography noWrap variant='h6'> {e.author}</Typography>  </div>
                    </ListItem>

                    <ListItem >
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <DescriptionIcon color='info' />
                            </Avatar>
                        </ListItemAvatar>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}> <Typography noWrap > {e.desc}</Typography>  </div>
                    </ListItem>

                    <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <DeleteIcon color='error' sx={{
                                    cursor: 'pointer', '&:hover': {
                                        transform: 'scale(1.2)'
                                    }
                                }} onClick={() => deleteNote(e.id)} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar >
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <AspectRatioIcon color='warning' sx={{
                                    cursor: 'pointer', '&:hover': {
                                        transform: 'scale(1.2)'
                                    }
                                }} onClick={handleClickOpen} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar >
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <EditIcon color='success' sx={{
                                    cursor: 'pointer', '&:hover': {
                                        transform: 'scale(1.2)'
                                    }
                                }} onClick={() => updateNote(e)} />
                            </Avatar>
                        </ListItemAvatar>
                    </ListItem>
                </List>

            </Paper>
        </Grid>
    )
}

export default SinglePaper