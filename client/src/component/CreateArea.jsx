import React, { useContext } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Zoom from '@mui/material/Zoom';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadContext } from '../App';

let c = 0;    // used to check for edit mode and keep infinite loop in check

function CreateArea(props) {

    // Variable to check if cancelling is getitng triggered.
    let cancelling = false;
    const [_isLoading, setLoading] = useContext(LoadContext);

    const [note, setNote] = React.useState({title: props.titleValue, content: props.contentValue});
    const [focus, setFocus] = React.useState(false);

    function focusLogic() {
        setFocus(true);
        document.querySelector(".create-note textarea").style.paddingTop = "1ch";
    }

    if (props.editValue && c === 0) {
        note.title = props.titleValue;
        note.content = props.contentValue;
        setFocus(true);
        document.querySelector(".create-note textarea").style.paddingTop = "1ch";
        c++;
    }

    // Function to listen to events pertaining to change occuring in text-area - and catch the words being typed.
    function screenText(event) {
        const {name, value} = event.target;             // Object destructuring from event.target
        setNote((prevValue) => {
            if (name === "title") {
                return {
                    ...prevValue,
                    title: value
                };
            } else {
                return {
                    ...prevValue,
                    content: value
                };
            }
        });
    }

    function submitHandler(event) {
        event.preventDefault();                                         /* to prevent default behavior of submitting and refreshing the page*/
        setLoading(true);                                                       
        if (cancelling) {
            props.edit();
            setLoading(false);
        } else {
            props.editValue ? props.edit(note) : props.onAdd(note)            /* condition to either go edit path or add path.*/
        }                               
        setNote({ title: "", content: "" });                                    /* resets the form*/
        setFocus(false);                                                       /* Take focus away */
        c = 0;                                                         /* cancels the call and gets a null back, hence no changes.*/
    }

    // The return path
    return (
        <div>  {/* Form starts here */}
            <form className="create-note"
                onSubmit={submitHandler}>
                {
                focus && <input onChange={screenText}
                    name="title"
                    placeholder="Title"
                      /* The control for user input */
                    value={note.title}                                                                      
                    />
                }
                <textarea onClick={focusLogic}
                    onFocus={focusLogic}
                    onChange={screenText}
                    name="content"
                    placeholder="Take a note..."
                    rows={focus ? "3" : "1"}                    
                    value={note.content}/>                                                                  

 {/* The material UI Zoom API for zooming animation on load */}
 {/* The material UI floating action bar (Fab) element */}

                <Zoom in={focus}>                                                                            
                    <Fab type="submit">                                                                        
                        { props.editValue ? <ModeEditIcon />: <AddIcon sx={{ fontSize: 40 }}/> }
                    </Fab>
                </Zoom>

                <Zoom in={focus}  >
                    <Fab id="cancel-bttn" type="submit" onClick={() => { cancelling= true; }}>
                        <CancelIcon sx={{ fontSize: 46 }} />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
