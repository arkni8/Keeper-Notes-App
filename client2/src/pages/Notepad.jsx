import delReq from '../component/requestHandler/deleteReq';
import editReq from '../component/requestHandler/editRequest';
import getReq from '../component/requestHandler/getRequest';
import submitReq from '../component/requestHandler/submitReq';
import Header from "../component/Header";
import Footer from "../component/Footer";
import Note from "../component/Note";
import CreateArea from "../component/CreateArea";
import Dialog from '../component/Dialog';
import { useAuth } from '../App';
import { useCallback, useEffect, useState, useRef } from 'react';

let idStore;
let dbIdStore;

export default function Notepad2() {
    const [user] = useAuth();    

    const y = useRef(0);
    const [noteArray, setNoteArray] = useState([]);
    const [noteEdit, setNoteEdit] = useState(false);
    const [update, setUpdate] = useState(true);
    const [open, setOpen] = useState({});

    useEffect(() => {
        if (update) {
            callAPI();
            setUpdate(false);
        }
      }, [update]);  
    
    async function callAPI() {
        const response = await getReq(user.token);
        setNoteArray(state => { return [...response.note] });
    }

    //Functon that adds a new Note to the noteArray.
    async function submit(newNote) {
        document.querySelector(".create-note textarea").style.paddingTop = "0.4ch";
        const response = await submitReq(newNote, user.token);
        if (response) {
            setUpdate(true);
            // callAPI();
        }
    }
    
    //Function that gets triggered from inside Note.jsx compoenent, and passes the index of an individual note in order to edit.
    function onEdit(id,dbId){
        if(noteEdit){
            alert("Please cancel out of current note to edit other notes.");
        } else {
            setNoteEdit(true);
            idStore=id;
            dbIdStore = dbId;
            const element = document.querySelector("html");
            y.current = element.scrollTop;
            document.querySelector(".create-note").scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    //Function that gets triggered from inside CreateArea.jsx component to edit the values at noteArray[idStore]
    async function storeEdit(editedNote) {
        setNoteEdit(false);
        // Sending request to backend for updating DB              <----------------- This part is new
        if (editedNote) {
            const response = await editReq(dbIdStore, editedNote, user.token);          
            if (response) {
                setUpdate(true);
                // callAPI();
            }
        }
        const element = document.querySelector("html");
        element.scrollTo({ top: y.current, behavior: 'smooth' });
        document.querySelector(".create-note textarea").style.paddingTop = "0.4ch";
    }

    //Function that gets triggered from inside CreateArea.jsx compoenent, and passes the index of an individual note in order to delete.
    async function onDelete(id) {
        if (noteEdit) {
            alert("Please cancel out of current note to delete.");
        } else {
            setNoteEdit(false);
            const response = await delReq(id, user.token);
            if (response) {
                setUpdate(true);
                // callAPI();
            }
        }
    }

    //Function that gets triggered from inside CreateArea.jsx component, in order to send back a null so input can be cancelled properly.
    function cancelfunction(a, b) {
        document.querySelector(".create-note textarea").style.paddingTop = "0.4ch";
        return;
    }
        

    //Function that gets called by .map() in order to render them individually
    function eachNote(object, index) {
        return (
            <Note
                key={object._id}
                index={index}
                dbIndex={object._id}
                title={object.title}
                content={object.content}
                delete={onDelete}                   // function callback for deleting a note from Array.
                edit={onEdit}                       //function callback for editing a note in Array.
                open={dialogOpen}
            />
        );
    }

    // Function that controls the opening of dialogue box
    function dialogOpen(content) {
        if (noteEdit) {
            alert("Please cancel the edit of current note to proceed");
        } else {
            setOpen(content);
        }
    }


    // Function uses useCallback feature to stop the eventListener from pointing to a new function
    // because eventListeners always want to add and remove the listeners and point to a same function.
    // Make sure you put the empty dependency array.
    const keyHandler = useCallback(event => {
        if (event.key === "Escape") {
            dialogOpen({});
        }
    }, []);

    useEffect(() => {
        if (open.title || open.content) {
            document.addEventListener('keydown', keyHandler);
            const element = document.querySelector("html");
            y.current = element.scrollTop;
            document.querySelector(".pop-out").scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => document.documentElement.style.overflow = 'hidden', 600); 
        } else {
            document.removeEventListener('keydown', keyHandler);
            const element = document.querySelector("html");
            element.scrollTo({ top: y.current, behavior: 'smooth' });
            document.documentElement.style.overflow = 'auto';  // firefox, chrome
        }
    }, [open]);


    return (
        <>
            <div className="wrapper">
                <Header />
                {(noteEdit)? <CreateArea 
                   editValue={noteEdit} 
                   edit={storeEdit} 
                   titleValue={noteArray[idStore].title} 
                   contentValue={noteArray[idStore].content} /> 
                 : <CreateArea
                   editValue={false}
                   edit={cancelfunction} 
                   titleValue="" 
                   contentValue="" 
                   onAdd={submit} /> }
                <div className="noteArea">
                    {noteArray.map(eachNote)}
                </div>
                <Footer/>
            </div>
            {(open.title||open.content) && <Dialog content={open} close={dialogOpen}/>}
        </>
    );
}