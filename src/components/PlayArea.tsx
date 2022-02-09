import React, { useEffect } from 'react';
import { Button, CircularProgress, Stack } from "@mui/material";
import { TURN_STATUS } from "../enums";
import { IRoom, ITurnHistoryItem, IUser } from "../interface";
import InitialMoveItem from "./InitialMoveItem";
import PlayerMoveItem from "./PlayerMoveItem";
import "./PlayArea.scss"

interface componentProps {
    turnHistory: ITurnHistoryItem[],
    turnStatus: TURN_STATUS,
    room: IRoom,
    userInfo: IUser | null,
    onMoveExecuted: (calculatedNumber: Number, selectedNumber: Number) => void,
    onStart: () => void
}

const PlayArea = ({ turnHistory, turnStatus, room, userInfo, onMoveExecuted, onStart }: componentProps) => {

    const computedCalculatedNumber = turnHistory[turnHistory.length - 1]?.number;

    const renderMoveButtons = () => {
        return <>
            <Button data-testid="move-button-minus-1" onClick={() => onMoveExecuted(computedCalculatedNumber, -1)} variant="contained">-1</Button>
            <Button data-testid="move-button-0" onClick={() => onMoveExecuted(computedCalculatedNumber, 0)} variant="contained">0</Button>
            <Button data-testid="move-button-1" onClick={() => onMoveExecuted(computedCalculatedNumber, 1)} variant="contained">1</Button>
        </>;
    }

    const renderLoading = () => <CircularProgress data-testid="move-loading" />;

    const actionButtonsSwitch = (status: TURN_STATUS) => {
        switch (status) {
            case TURN_STATUS.PLAY:
                return renderMoveButtons()
            case TURN_STATUS.WAIT:
                return renderLoading()
            case TURN_STATUS.WAITING_FOR_PLAYER:
                return `Waiting for player...`
            case TURN_STATUS.READY:
                return <Button data-testid="start-game-button" onClick={() => onStart()} variant="contained">START GAME</Button>
            case TURN_STATUS.WON:
                return `You won ! Congratulations !`
            case TURN_STATUS.LOST:
                return `Sorry you lost...`
        }
    }

    const updateGameScreenScroll = () => {
        const target = document.getElementById("playArea");
        if (target) {
            target.scrollTop = target.scrollHeight;
        }
    }

    useEffect(() => {
        updateGameScreenScroll()
    }, [turnStatus])



    return <div data-testid="play-area" id="playArea">
        {turnHistory.map((item: ITurnHistoryItem, index: number) => {
            if (item.isFirst) {
                return <InitialMoveItem moveInfo={item}
                    key={index.toString()} />
            }
            else {
                return <PlayerMoveItem previousResult={turnHistory[index - 1].number}
                    moveInfo={item}
                    isOpponent={item.user !== userInfo?.name}
                    key={index.toString()} />
            }
        })}


        <Stack direction="row"
            id="turn-action-container"
            alignItems="center"
            justifyContent="center"
            spacing={2}>
            {actionButtonsSwitch(turnStatus)}
        </Stack>


    </div >
}

export default PlayArea;