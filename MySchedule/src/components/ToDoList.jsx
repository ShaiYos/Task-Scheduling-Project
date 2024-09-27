
import { useState } from "react";
import Mission from "./Mission";

export default function ToDoList() {
    const [mission, setMission] = useState("");

    const addNewMission = (evt) => {
        const newMission = evt.target.value;
        setMission(newMission); 
    }
    return (
        <Mission addNewMission={addNewMission}/>
    )
}