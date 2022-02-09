import reducer from '../redux/reducer'
import { initialState } from "../redux/reducer";
import {
    loginAction,
    logoutAction,
    setWebSocketServerStatus,
    setRoomListAction,
    setActiveRoomAction,
    setRoomTurnState,
    appendRoomTurnHistoryItemAction,
    purgeRoomStateAction
} from "../redux/actions"
import { IRoom, ITurnHistoryItem, IUser } from '../interface';
import {
    LOGIN_PHASES_ENUMS,
    ROOM_TYPES,
    SOCKET_MANAGER_CONNECTION_STATUSES,
    TURN_STATUS
} from '../enums';


const sampleRoom1: IRoom = {
    id: 'SAMPLE_ROOM_ID',
    name: 'SAMPLE ROOM',
    owner: 'SAMPLE OWNER',
    type: ROOM_TYPES.CPU
}

const sampleRoom2: IRoom = {
    id: 'SAMPLE_ROOM_2_ID',
    name: 'SAMPLE ROOM__2',
    owner: 'SAMPLE OWNER__2',
    type: ROOM_TYPES.CPU
}


const sampleRooms: IRoom[] = [
    sampleRoom1,
    sampleRoom2
]


const sampleTurnHistoryItem : ITurnHistoryItem = {
    isFirst: false,
    isCorrectResult: false,
    number: 1000,
    selectedNumber:1,
    user: 'SAMPLE_USER'
}

test('inital state', () => {
    expect(reducer(undefined, ({}) as any)).toEqual(initialState);
})

test('login', () => {
    const sampleUser: IUser = {
        name: 'guest_sample',
        socketId: 'sample_socket_id'
    }
    const loginActionResponse = loginAction(sampleUser)
    expect(reducer(initialState, loginActionResponse)).toEqual({
        ...initialState,
        userInfo: sampleUser,
        loginStatus: LOGIN_PHASES_ENUMS.LOGGED_IN
    });
});

test('logout', () => {
    const sampleUser: IUser = {
        name: 'guest_sample',
        socketId: 'sample_socket_id'
    }
    const logoutActionResponse = logoutAction()
    expect(reducer(initialState, logoutActionResponse)).toEqual({
        ...initialState,
        loginStatus: LOGIN_PHASES_ENUMS.LOGGED_OUT
    });
});

test('web socket server status', () => {
    const setWebSocketServerStatusResponse = setWebSocketServerStatus(SOCKET_MANAGER_CONNECTION_STATUSES.CONNECTED)
    expect(reducer(initialState, setWebSocketServerStatusResponse)).toEqual({
        ...initialState,
        webServerStatus: SOCKET_MANAGER_CONNECTION_STATUSES.CONNECTED
    });
});

test('set room list', () => {
    const setRoomListActionResponse = setRoomListAction(sampleRooms)
    expect(reducer(initialState, setRoomListActionResponse)).toEqual({
        ...initialState,
        roomList: sampleRooms
    });
});

test('set active room', () => {
    const setActiveRoomActionResponse = setActiveRoomAction(sampleRoom1)
    expect(reducer(initialState, setActiveRoomActionResponse)).toEqual({
        ...initialState,
        activeRoom: sampleRoom1
    });
});



test('set room turn state', () => {
    const setRoomTurnStateResponse = setRoomTurnState(TURN_STATUS.PLAY)
    expect(reducer(initialState, setRoomTurnStateResponse)).toEqual({
        ...initialState,
        roomState: {
            turnHistory: [],
            turnStatus: TURN_STATUS.PLAY
        }
    });
});

test('append turn history item', () => {
    const appendRoomTurnHistoryItemActionResponse = appendRoomTurnHistoryItemAction(sampleTurnHistoryItem)
    expect(reducer(initialState, appendRoomTurnHistoryItemActionResponse)).toEqual({
        ...initialState,
        roomState: {
            turnHistory: [sampleTurnHistoryItem],
            turnStatus: TURN_STATUS.NOT_STARTED
        }
    });
});

test('purge room state', () => {
    const purgeRoomStateActionResponse = purgeRoomStateAction()
    expect(reducer(initialState, purgeRoomStateActionResponse)).toEqual({
        ...initialState,
        roomState: {
            turnHistory: [],
            turnStatus: TURN_STATUS.NOT_STARTED
        }
    });
})