import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import SocketManager from "../SocketManager";
import "./LoginPage.scss"

const LoginPage = () => {
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value = '' } = event.target;
        const validUserName: string = value.trim().replace(/\W/g, '');
        setUserName(validUserName);
    };

    const generateNickName = () => {
        const uniqueExtension: number = new Date().getTime();
        const randomUserName: string = `Guest_${uniqueExtension}`
        setUserName(randomUserName)
    }

    const handleLogin = async () => {
        await SocketManager.login(userName)
        navigate('/lobby')
    }

    return <>
        <div className="login-form-container">
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="component-outlined">Enter Your Nickname</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            data-testid="username-input"
                            value={userName}
                            onChange={handleChange}
                            label="Enter Your Username"

                        />
                        <Box marginTop={2}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                                <Button variant="contained" data-testid="login-button" color="success" disabled={!userName} onClick={handleLogin} fullWidth>Enter Lobby</Button>
                                <Button variant="outlined"  data-testid="generate-nickname" fullWidth onClick={generateNickName}>Generate Nickname</Button>
                            </ButtonGroup>
                        </Box>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    </>
};

export default LoginPage;