import * as React from "react";
import { IRoom } from "../interface";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface componentProps {
    rooms: IRoom[],
    onRoomSelected: (room: IRoom) => void;
    onRoomExit: () => void;
    selectedRoom: IRoom | null
}

const RoomList = ({ rooms, onRoomSelected, onRoomExit, selectedRoom }: componentProps) => {

    const isRoomDisabled = (room: IRoom) => {
        return selectedRoom !== null && room.name !== selectedRoom?.name
    }

    const isRoomSelected = (room: IRoom) => {
        return room.name === selectedRoom?.name && room.id === selectedRoom?.id
    }

    return <>
        <List subheader={<ListSubheader>Room List</ListSubheader>}>
            {rooms.map((room, index) => 
                <ListItem
                          disabled={isRoomDisabled(room)}
                          selected={isRoomSelected(room)} 
                          key={index}
                          data-testid={`room-list-item-${index}`}
                          secondaryAction={
                            isRoomSelected(room) && 
                            <Tooltip title="Leave the room">
                                <IconButton edge="end" onClick={() => onRoomExit()} data-testid="room-exit-button">
                                    <MeetingRoomIcon />
                                </IconButton>
                            </Tooltip>
                          }>
                <ListItemButton data-testid="room-item-button" onClick={() => !isRoomDisabled(room) && onRoomSelected(room)}>
                    <ListItemText inset primary={room.name} />
                </ListItemButton>
            </ListItem>)}
        </List>
    </>
}

export default RoomList;