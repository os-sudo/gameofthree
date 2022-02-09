import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayArea from '../components/PlayArea';
import { ROOM_TYPES, TURN_STATUS } from "../enums";
import { IRoom, ITurnHistoryItem, IUser } from "../interface";
import userEvent from '@testing-library/user-event';
beforeEach(() => {
    jest.clearAllMocks();
});


const sampleRoom: IRoom = {
    id: 'XYZ-SAMPLE-ROOM',
    name: 'Sample Room',
    owner: 'sample owner',
    type: ROOM_TYPES.HUMAN
}
const sampleTurnHistory: ITurnHistoryItem[] = [];

const sampleUserInfo: IUser = { name: 'sample user', socketId: 'SAMPLE_SOCKET_ID' }



const mockOnMoveExecutedFunction = jest.fn();
const mockOnStartFunction = jest.fn();

const PlayAreaFactory = ({
    mockTurnHistory = sampleTurnHistory,
    mockUserInfo = sampleUserInfo,
    mockRoom = sampleRoom,
    mockTurnStatus = TURN_STATUS.PLAY,
    mockOnMoveExecuted = () => { mockOnMoveExecutedFunction() },
    mockOnStart = () => { mockOnStartFunction() }
}) => {
    return <PlayArea turnHistory={mockTurnHistory}
        room={mockRoom}
        turnStatus={mockTurnStatus}
        userInfo={mockUserInfo}
        onMoveExecuted={() => mockOnMoveExecuted()}
        onStart={() => mockOnStart()} />
}

test('render move buttons if turn state is play', () => {
    const samplePlayAreaIsPlayState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.PLAY})
    const { getByTestId } = render(samplePlayAreaIsPlayState);
    const actionButton = getByTestId('move-button-0')
    expect(actionButton).toBeTruthy()
});

test('do not render move buttons if turn state is not play', () => {
    const samplePlayAreaIsNotPlayState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.WAIT})
    const { queryByTestId } = render(samplePlayAreaIsNotPlayState);
    expect(queryByTestId(/action-button-container/i)).toBeFalsy();
});


test('render loading if turn state is wait', () => {
    const samplePlayAreaIsWaitState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.WAIT})
    const { getByTestId } = render(samplePlayAreaIsWaitState);
    const loadingElement = getByTestId('move-loading')
    expect(loadingElement).toBeTruthy()
});

test('do not render loading if turn state is not wait', () => {
    const samplePlayAreaIsNotWaitState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.PLAY})
    const { queryByTestId } = render(samplePlayAreaIsNotWaitState);
    expect(queryByTestId(/move-loading/i)).toBeFalsy();
});


test('render waiting for player info if turn state is waiting for player', () => {
    const samplePlayAreaIsWaitingForPlayerState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.WAITING_FOR_PLAYER})
    const { getByTestId } = render(samplePlayAreaIsWaitingForPlayerState);
    const playArea = getByTestId("play-area").innerHTML;
    expect(playArea).toContain("Waiting for player...");
});


test('do not render waiting for player info if turn state is not waiting for player', () => {
    const samplePlayAreaIsNotWaitForPlayerState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.PLAY})
    const { getByTestId } = render(samplePlayAreaIsNotWaitForPlayerState);
    const playAreaContent = getByTestId("play-area").innerHTML;
    expect(playAreaContent).not.toContain("Waiting for player...")
});


test('render won for player info if turn state is won', () => {
    const samplePlayAreaIsWonState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.WON})
    const { getByTestId } = render(samplePlayAreaIsWonState);
    const playArea = getByTestId("play-area").innerHTML;
    expect(playArea).toContain("You won ! Congratulations !");
});


test('do not render won info if turn state is not won', () => {
    const samplePlayAreaIsNotWaitForPlayerState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.PLAY})
    const { getByTestId } = render(samplePlayAreaIsNotWaitForPlayerState);
    const playAreaContent = getByTestId("play-area").innerHTML;
    expect(playAreaContent).not.toContain("You won ! Congratulations !")
});


test('render lost for player info if turn state is lost', () => {
    const samplePlayAreaIsWonState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.LOST})
    const { getByTestId } = render(samplePlayAreaIsWonState);
    const playArea = getByTestId("play-area").innerHTML;
    expect(playArea).toContain("Sorry you lost...");
});


test('do not render lost info if turn state is not lost', () => {
    const samplePlayAreaIsNotWaitForPlayerState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.WON})
    const { getByTestId } = render(samplePlayAreaIsNotWaitForPlayerState);
    const playAreaContent = getByTestId("play-area").innerHTML;
    expect(playAreaContent).not.toContain("Sorry you lost...")
});

test('render start button if turn state is ready', () => {
    const samplePlayAreaIsReadyState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.READY})
    const { getByTestId } = render(samplePlayAreaIsReadyState);
    const startGameButton = getByTestId('start-game-button')
    expect(startGameButton).toBeTruthy()
});


test('do not render start button if turn state is not ready', () => {
    const samplePlayAreaIsNotReadyState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.PLAY})
    const { queryByTestId } = render(samplePlayAreaIsNotReadyState);
    expect(queryByTestId(/start-game-button/i)).toBeFalsy();
});

test('execute onmoveexecuted when user made move', () => {
    const samplePlayAreaIsPlayState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.PLAY})
    const { getByTestId } = render(samplePlayAreaIsPlayState);
    const moveButton = getByTestId('move-button-1')
    userEvent.click(moveButton)
    expect(mockOnMoveExecutedFunction).toHaveBeenCalled()
});

test('render onstart when user click start game button', () => {
    const samplePlayAreaIsReadyState = PlayAreaFactory({ mockTurnStatus: TURN_STATUS.READY})
    const { getByTestId } = render(samplePlayAreaIsReadyState);
    const startGameButton = getByTestId('start-game-button')
    userEvent.click(startGameButton)
    expect(mockOnStartFunction).toHaveBeenCalled()
});







