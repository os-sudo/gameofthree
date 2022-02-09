import { IRoom, ITurnHistoryItem, IUser } from "../interface"
import { GAME_ACTION_TYPE_ENUMS, SOCKET_MANAGER_CONNECTION_STATUSES, TURN_STATUS } from "../enums"

export function loginAction(user: IUser) {
    return {
        type: GAME_ACTION_TYPE_ENUMS.LOGIN,
        payload: user
    } as const;
}

export function logoutAction() {
    return {
        type: GAME_ACTION_TYPE_ENUMS.LOGOUT
    } as const;
}

export function setWebSocketServerStatus(status: SOCKET_MANAGER_CONNECTION_STATUSES) {
    return {
        type: GAME_ACTION_TYPE_ENUMS.SET_WEB_SOCKET_SERVER_STATUS,
        payload: status
    } as const;
}

export function setRoomListAction(roomList: IRoom[]) {
    return {
        type: GAME_ACTION_TYPE_ENUMS.SET_ROOM_LIST,
        payload: roomList
    } as const;
}

export function setActiveRoomAction(room: IRoom) {
    return {
        type: GAME_ACTION_TYPE_ENUMS.SET_ACTIVE_ROOM,
        payload: room
    } as const;
}

export function setRoomTurnState(turnStatus: TURN_STATUS) {
    return {
        type: GAME_ACTION_TYPE_ENUMS.SET_ROOM_TURN_STATE,
        payload: turnStatus
    } as const;
}

export function appendRoomTurnHistoryItemAction(item: ITurnHistoryItem) {
    return {
        type: GAME_ACTION_TYPE_ENUMS.APPEND_ROOM_TURN_HISTORY_ITEM,
        payload: item
    } as const;
}

export function purgeRoomStateAction() {
    return {
        type: GAME_ACTION_TYPE_ENUMS.PURGE_ROOM_STATE,
        payload: null
    } as const;
}


export type Actions = | ReturnType<typeof loginAction>
    | ReturnType<typeof logoutAction>
    | ReturnType<typeof setWebSocketServerStatus>
    | ReturnType<typeof setRoomListAction>
    | ReturnType<typeof setActiveRoomAction>
    | ReturnType<typeof setRoomTurnState>
    | ReturnType<typeof appendRoomTurnHistoryItemAction>
    | ReturnType<typeof purgeRoomStateAction>