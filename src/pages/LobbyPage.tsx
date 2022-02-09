import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import RoomList from "../components/RoomList";
import PlayArea from "../components/PlayArea";
import "./LobbyPage.scss"
import { IGameState, IRoom, ITurnHistoryItem, IUser } from "../interface";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import to from "await-to-js";
import { setRoomListAction, setActiveRoomAction,purgeRoomStateAction } from "../redux/actions";
import SockManager from "../SocketManager";
import { TURN_STATUS } from "../enums";

const LobbyPage = () => {
    const dispatch = useDispatch();
    const rooms: IRoom[] = useSelector((state: IGameState) => state.roomList);
    const activeRoom: null | IRoom = useSelector((state: IGameState) => state.activeRoom);
    const userInfo: IUser | null = useSelector((state: IGameState) => state.userInfo);
    const turnHistory: ITurnHistoryItem[] = useSelector((state: IGameState) => state.roomState.turnHistory)
    const turnStatus: TURN_STATUS = useSelector((state: IGameState) => state.roomState.turnStatus)

    const loadRooms = async () => {
        const [err, serverResponse] = await to(axios.get("http://localhost:3004/rooms"))
        if (!err) {
            const { data = [] }: any = serverResponse;
            dispatch(setRoomListAction(data))
        }
    }
    
    const onRoomSelectedHandler = (room: IRoom) => {
        const { name: roomName, type: roomType } = room;
        const userName = userInfo?.name || '';
        SockManager.joinRoom(userName, roomName, roomType);
        dispatch(setActiveRoomAction(room))
    }

    const onMoveExecutedHandler = (calculatedNumber: Number, selectedNumber: Number) => {
        SockManager.sendMove(calculatedNumber, selectedNumber)
    }

    const onStartHandler = () => {
        SockManager.letsPlay()
    }

    const onRoomExitHandler = () => {
        SockManager.leaveRoom()
        dispatch(purgeRoomStateAction())
    }

    useEffect(() => {
        loadRooms()
    }, [])

    return <div>
        <AppBar className="lobby-top-bar" position="static" >
            GAME OF THREE
        </AppBar>
        <Grid container spacing={0} className="grid-container">
            <Grid item xs={3} border={1}>
                <RoomList rooms={rooms}
                    onRoomSelected={onRoomSelectedHandler}
                    onRoomExit={onRoomExitHandler}
                    selectedRoom={activeRoom} />
            </Grid>
            <Grid item xs={9} border={1}>
                {activeRoom && <PlayArea turnHistory={turnHistory}
                    userInfo={userInfo}
                    turnStatus={turnStatus}
                    room={activeRoom}
                    onStart={onStartHandler}
                    onMoveExecuted={onMoveExecutedHandler} /> || <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Please select a room to start the game.
                    </Alert>}
            </Grid>
        </Grid>
    </div>
};

export default LobbyPage;