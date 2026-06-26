import React, { useState } from "react";


function ListItem(props) {

    function handleClick(){
        props.removeFunction(props.id);
    }

    return (
        <div onClick={handleClick}>
            <li>
            {props.todoItem}
            </li>
        </div>
    )
}

export default ListItem;