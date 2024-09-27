
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';


export default function LoginPage () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const changeUsername = () => {

    }
 
    const changePassword = () => {

    }
    return (
        <div>
            <h2>Log In</h2>
            <PersonIcon id="personIcon" />
            <TextField 
                id="outlined-basic" 
                label="Username" 
                variant="outlined" 
                value={username}
                onChange={changeUsername}

            />
            <LockOpenIcon/>
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                name="password"
                onChange={changePassword}
            />
        </div>
    )

}