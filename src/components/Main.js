import { Grid, Paper, TextField, Button } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { set, ref, push, onValue, remove, update } from 'firebase/database';

const Main = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [author, setAuthor] = useState('')
    const [noteList, setNoteList] = useState([])
    const [edit,setEdit] = useState(false)
    const [tempId,setTempId] = useState();

    const writeToDatabase = (e) => {
        e.preventDefault()
        const noteRef = ref(db, 'Notes');
        console.log(noteRef);
        const newNoteRef = push(noteRef)
        console.log(newNoteRef);
        set(newNoteRef, {
            title: title,
            desc: desc,
            author: author
        })
        console.log(db);
        setTitle('');
        setDesc('');
        setAuthor('');
    }


    useEffect(() => {
        const userRef = ref(db, "Notes");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            //   console.log(data)
            const noteArr = [];
            for (let id in data) {
                noteArr.push({
                    id,
                    ...data[id]
                })
            }
            console.log(noteArr);
            setNoteList(noteArr);
        })
    }, [])

    const updateNote = (note) => {
        setTitle(note.title)
        setDesc(note.desc)
        setAuthor(note.author)
        setEdit(true);
        console.log(note);
        setTempId(note.id)
        // setNote(note.todo)
      }

    const editNote = (e) =>{
        e.preventDefault()
        update(ref(db,'Notes/' + tempId),{
          title:title,
          desc: desc,
          author: author
        })
        setEdit(false)
        setTitle('');
        setDesc('');
        setAuthor('');
      }

    const deleteNote = (id) => {
        remove(ref(db, 'Notes/' + id))
      }
    

    return (
        <Grid container spacing={2} justifyContent='center' sx={{ marginTop: '4rem' }}>
            <Grid item sm={12} md={4} sx={{textAlign:'center'}}>
                <form onSubmit={edit ? editNote : writeToDatabase}>
                    <TextField id="outlined-basic" label="Title" variant="outlined" margin='normal' value={title} onChange={(e) => setTitle(e.target.value)} /> <br/>
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                        margin='normal' value={desc} onChange={(e) => setDesc(e.target.value)} /> <br/>
                    <TextField id="outlined-basic" label="Author" variant="outlined"
                        margin='normal' value={author} onChange={(e) => setAuthor(e.target.value)} /> <br/>
                    <Button variant="contained" type='submit' >{edit ? 'Edit' : 'Add'}</Button>
                </form>
            </Grid>
            <Grid item sm={12} md={8}>
                <Grid container spacing={2} justifyContent='center'>
                    {noteList?.map((e, i) => {
                        return <Grid item key={i} > <Paper >
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={e.title}  />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={e.author}  />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <BeachAccessIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={e.desc}  />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{backgroundColor:'transparent'}}>
                                            <DeleteIcon color='error' sx={{cursor:'pointer', '&:hover' :{
                                                transform: 'scale(1.2)'
                                            }}} onClick={()=>deleteNote(e.id)} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemAvatar>
                                        <Avatar sx={{backgroundColor:'transparent'}}>
                                            <EditIcon color='success' sx={{cursor:'pointer', '&:hover' :{
                                                transform: 'scale(1.2)'
                                            }}} onClick={()=>updateNote(e)} />
                                        </Avatar>
                                    </ListItemAvatar>
                                </ListItem>
                            </List>
                        </Paper>
                        </Grid>
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Main