import React from 'react';
import { render } from '@testing-library/react';
import LobbyPage from '../pages/LobbyPage';
import * as redux from 'react-redux'
import { IRoom } from '../interface';
import { ROOM_TYPES, TURN_STATUS } from '../enums';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

if (!window.setImmediate) {
    ((window.setImmediate) as any) = setTimeout
}

beforeEach(() => {
    jest.clearAllMocks();
});

const sampleRoom: IRoom = {
    id: 'SAMPLE_ROOM_ID',
    name: 'SAMPLE_ROOM',
    owner: 'SAMPLE OWNER',
    type: ROOM_TYPES.CPU
}
const mockState = {
    roomList: [sampleRoom],
    activeRoom: sampleRoom,
    userInfo: null,
    roomState: {
        turnHistory: [],
        turnStatus: TURN_STATUS.NOT_STARTED,
    }
}

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useDispatch: () => mockDispatch
    };
});

const mock_joinRoom = jest.fn();
const mock_leaveRoom = jest.fn();
const mock_letsPlay = jest.fn();
const mock_sendMove = jest.fn();

jest.mock("../SocketManager", () => {
    return {
        joinRoom: () => { mock_joinRoom() },
        leaveRoom: () => { mock_leaveRoom() },
        letsPlay: () => { mock_letsPlay() },
        sendMove: () => { mock_sendMove() }
    }
})


test('execute socket join when click room', async () => {
    const mockStore = configureStore();
    const store = mockStore(mockState);
    const { getByTestId } = render(<Provider store={store}><LobbyPage /></Provider>)
    const roomItem = getByTestId('room-item-button')
    userEvent.click(roomItem)
    expect(mock_joinRoom).toHaveBeenCalled();
});


test('execute socket leave room when click room exit button', async () => {
    const mockStore = configureStore();
    const store = mockStore(mockState);
    const { getByTestId } = render(<Provider store={store}><LobbyPage /></Provider>)
    const roomExitButton = getByTestId('room-exit-button')
    userEvent.click(roomExitButton)
    expect(mock_leaveRoom).toHaveBeenCalled();
});


test('execute socket lets play when click start game button', async () => {
    const modifiedState = { ...mockState, roomState: { ...mockState.roomState, turnStatus: TURN_STATUS.READY } };
    const mockStore = configureStore();
    const store = mockStore(modifiedState);
    const { getByTestId } = render(<Provider store={store}><LobbyPage /></Provider>)
    const roomExitButton = getByTestId('start-game-button')
    userEvent.click(roomExitButton)
    expect(mock_letsPlay).toHaveBeenCalled();
});


test('execute socket lets play when click start game button', async () => {
    const modifiedState = { ...mockState, roomState: { ...mockState.roomState, turnStatus: TURN_STATUS.PLAY } };
    const mockStore = configureStore();
    const store = mockStore(modifiedState);
    const { getByTestId } = render(<Provider store={store}><LobbyPage /></Provider>)
    const moveButton = getByTestId('move-button-0')
    userEvent.click(moveButton)
    expect(mock_sendMove).toHaveBeenCalled();
});
