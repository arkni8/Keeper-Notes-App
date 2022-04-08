import React from "react";

function Note(props) {

  function click(event) {
    if (event.target.nodeName !== "BUTTON") {
      props.open({ title: props.title, content: props.content });
    }
  }

  return (
    <div id={props.dbIndex} className="parent-note-div">
      <div className="note" onClick={click}>
        <h1>{props.title}</h1>
        {props.content.length > 256
          ? <p>{props.content.substring(0, 120)} <strong style={{color: "darkgoldenrod", fontSize: "17.2px"}}>...Read more</strong></p>
          : props.content.split("\n").length > 5
            ? <p>{props.content.split("\n")[0]}
              {props.content.split("\n")[1]}
              {props.content.split("\n")[2]}<br/>
              <strong style={{color: "darkgoldenrod", fontSize: "17.2px"}}> ...Read more</strong></p>
            : <p>{props.content}</p>
        }
        <div className="button-components">
            <button onClick={() => props.edit(props.index, props.dbIndex)}>EDIT</button>
            <button onClick={() => props.delete(props.dbIndex)}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default Note;
