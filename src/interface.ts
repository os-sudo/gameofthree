import { LOGIN_PHASES_ENUMS, SOCKET_MANAGER_CONNECTION_STATUSES, ROOM_TYPES, TURN_STATUS } from "./enums"

export interface IUser {
    name: string,
    socketId: any
}

export interface IRoom {
    id: string,
    name: string,
    owner: string,
    type: ROOM_TYPES,
}

export interface ISocketLoginData {
    username: string
}


export interface ISocketJoinRoomData {
    username : string,
    room : string,
    roomType: ROOM_TYPES
}

export interface ISocketSendNumberData {
    number: Number,
    selectedNumber: Number
}

export interface IGameState {
    roomList: IRoom[],
    activeRoom: IRoom | null,
    loginStatus: LOGIN_PHASES_ENUMS,
    userInfo: IUser | null,
    webServerStatus: SOCKET_MANAGER_CONNECTION_STATUSES,
    roomState: {
        turnStatus : TURN_STATUS,
        turnHistory : ITurnHistoryItem[]
    }
}

export interface ITurnHistoryItem {
    isFirst: Boolean,
    isCorrectResult: Boolean,
    number: number,
    selectedNumber: number,
    user: String
}
