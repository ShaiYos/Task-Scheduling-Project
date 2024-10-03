import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// this component stands for a single mission the user wants to add to his to do list
export default function Mission( {addNewMission}) {
    
    

    
    return (
        <form>
            <h2>Add new mission :)</h2>
            <TextField  id="mission" label="To Do" variant="outlined" placeholder="type a mission"
            name="mission" value={mission} onChange={addNewMission}/>
            <Button variant="Add new To Do" onSubmit="addingNewMission"  >Outlined</Button>
        </form>
    )
}