import { Actions } from "./actions";
import { IGameState } from "../interface";
import { GAME_ACTION_TYPE_ENUMS, LOGIN_PHASES_ENUMS, SOCKET_MANAGER_CONNECTION_STATUSES, TURN_STATUS } from "../enums";

const initalRoomState = {
    turnStatus: TURN_STATUS.NOT_STARTED,
    turnHistory: []
}

export const initialState: IGameState = {
    roomList: [],
    loginStatus: LOGIN_PHASES_ENUMS.LOGGED_OUT,
    userInfo: null,
    webServerStatus: SOCKET_MANAGER_CONNECTION_STATUSES.DISCONNECTED,
    activeRoom: null,
    roomState: initalRoomState
}

export default function gameReducer(state: IGameState = initialState, action: Actions) {
    switch (action.type) {
        case GAME_ACTION_TYPE_ENUMS.LOGIN:
            return { ...state, loginStatus: LOGIN_PHASES_ENUMS.LOGGED_IN, userInfo: action.payload }
        case GAME_ACTION_TYPE_ENUMS.LOGOUT:
            return { ...state, loginStatus: LOGIN_PHASES_ENUMS.LOGGED_OUT }
        case GAME_ACTION_TYPE_ENUMS.SET_WEB_SOCKET_SERVER_STATUS:
            return { ...state, webServerStatus: action.payload }
        case GAME_ACTION_TYPE_ENUMS.SET_ROOM_LIST:
            return { ...state, roomList: [...action.payload] }
        case GAME_ACTION_TYPE_ENUMS.SET_ACTIVE_ROOM:
            return { ...state, activeRoom: action.payload }
        case GAME_ACTION_TYPE_ENUMS.SET_ROOM_TURN_STATE:
            return { ...state, roomState: { ...state.roomState, turnStatus: action.payload } }
        case GAME_ACTION_TYPE_ENUMS.APPEND_ROOM_TURN_HISTORY_ITEM:
            return { ...state, roomState: { ...state.roomState, turnHistory: [...state.roomState.turnHistory, action.payload] } }
        case GAME_ACTION_TYPE_ENUMS.PURGE_ROOM_STATE:
            return { ...state, activeRoom: null ,roomState: { ...initalRoomState } }
        default:
            return state;
    }

}
