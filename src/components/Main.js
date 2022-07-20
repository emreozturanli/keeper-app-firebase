import { Grid, TextField, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { set, ref, push, onValue, remove, update } from 'firebase/database';
import SinglePaper from './SinglePaper';


const Main = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [author, setAuthor] = useState('')
    const [noteList, setNoteList] = useState([])
    const [edit, setEdit] = useState(false)
    const [tempId, setTempId] = useState();


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
            const noteArr = [];
            for (let id in data) {
                noteArr.push({
                    id,
                    ...data[id]
                })
            }
            // console.log(noteArr);
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

    const editNote = (e) => {
        e.preventDefault()
        update(ref(db, 'Notes/' + tempId), {
            title: title,
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
        <Grid container spacing={2} justifyContent='center' alignItems={'center'} sx={{ marginTop: '4rem' }}>
            <Grid item sm={12} md={4} sx={{ textAlign: 'center' }}>
                <form onSubmit={edit ? editNote : writeToDatabase}>

                    <TextField id="outlined-basic" label="Title" variant="filled" margin='normal' value={title} sx={{ backgroundColor: 'whitesmoke', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} onChange={(e) => setTitle(e.target.value)} /> <br />

                    <TextField id="outlined-basic" label="Author" variant="filled"
                        margin='normal' value={author} sx={{ backgroundColor: 'whitesmoke', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} onChange={(e) => setAuthor(e.target.value)} /> <br />

                    <TextField id="outlined-basic" label="Description" variant="filled" multiline
                        margin='normal' value={desc} sx={{ backgroundColor: 'whitesmoke', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} onChange={(e) => setDesc(e.target.value)} /> <br /><br />

                    <Button variant="contained" type='submit' >{edit ? 'Edit' : 'Add'}</Button>
                </form>
            </Grid>
            <Grid item sm={12} md={8}>
                <Grid container spacing={4} justifyContent='center'>
                    {noteList?.map((e, i) => {
                    
                        return <SinglePaper key={i} updateNote={updateNote} deleteNote={deleteNote} e ={e}/>
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Main