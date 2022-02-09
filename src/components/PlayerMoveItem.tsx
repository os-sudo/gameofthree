import * as React from "react";
import { ITurnHistoryItem } from "../interface";
import Paper from '@mui/material/Paper';
import { Avatar } from "@mui/material";
import "./PlayerMoveItem.scss"

interface componentProps {
    moveInfo: ITurnHistoryItem,
    isOpponent: Boolean,
    previousResult: number
}

const InitialMoveItem = ({ moveInfo, isOpponent,previousResult }: componentProps) => {

    return <>
        <Paper className="player-move-item-content" data-testid="player-move-item-content" 
               sx={{ marginLeft: `${!isOpponent ? 'auto' : 'unset'}` , backgroundColor:`${!isOpponent ? 'lightgreen' : ''}` }}>
            <b>{moveInfo.user} :</b> <br />
            <Avatar className="player-avatar">{moveInfo.selectedNumber}</Avatar>
            [({moveInfo.selectedNumber} + { previousResult}) / 3] = {moveInfo.number} <br /><br />
            {moveInfo.number}
        </Paper>
    </>
}
export default InitialMoveItem;