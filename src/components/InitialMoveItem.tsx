import * as React from "react";
import { ITurnHistoryItem } from "../interface";
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import "./InitialMoveItem.scss";

interface componentProps {
    moveInfo: ITurnHistoryItem,
}

const InitialMoveItem = ({ moveInfo }: componentProps) => {
    return <>
        <Paper className="initial-move-item">
            <b>Server :</b>
            <Chip data-testid="initial-move-item-content"
                className="initial-move-item-content"
                label={<div>Game has started, your beginning number is : <b>{moveInfo.number}</b></div>}
                color="success"
                variant="outlined" />
        </Paper>
        <Divider sx={{ marginBottom: "20px" }}>
            <Chip label="Choose your number and continue..." />
        </Divider>
    </>
}
export default InitialMoveItem;