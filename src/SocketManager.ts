import store from "./redux/store"
import { ROOM_TYPES, SOCKET_EVENTS, SOCKET_MANAGER_CONNECTION_STATUSES, TURN_STATUS } from "./enums";
import { setWebSocketServerStatus, loginAction, setRoomTurnState, appendRoomTurnHistoryItemAction } from "./redux/actions"
import { ISocketLoginData, ISocketJoinRoomData, IUser, ISocketSendNumberData, ITurnHistoryItem } from "./interface";

const io = require("socket.io-client");

class SocketManager {
    socketInstance: any;
    connectionStatus: SOCKET_MANAGER_CONNECTION_STATUSES = SOCKET_MANAGER_CONNECTION_STATUSES.DISCONNECTED;
    constructor() {
        this.socketInstance = io('http://localhost:8082')
        this.setConnectionStatus(SOCKET_MANAGER_CONNECTION_STATUSES.WAITING)
        this.bindEmitHandlers(this.socketInstance)
    }

    bindEmitHandlers(socketInstance: any) {
        socketInstance.on(SOCKET_EVENTS.ON_CONNECT, this.onConnected.bind(this))
            .on(SOCKET_EVENTS.ON_CONNECTION_ERROR, this.onConnectionError.bind(this))
            .on(SOCKET_EVENTS.ON_MESSAGE, this.onMessage.bind(this))
            .on(SOCKET_EVENTS.ON_TURN_INFO_CHANGED, this.onTurnToggle.bind(this))
            .on(SOCKET_EVENTS.ON_MOVE, this.onMoveReceived.bind(this))
            .on(SOCKET_EVENTS.ON_READY, this.onReady.bind(this))
            .on(SOCKET_EVENTS.ON_GAME_OVER, this.onGameOver.bind(this))
    }

    private onReady({ state }: { state: Boolean }) {
        if (state === true) {
            store.dispatch(setRoomTurnState(TURN_STATUS.READY))
        }
    }

    private onGameOver({ user : userName, isOver }: { user: string, isOver: Boolean }) {
        const { userInfo } = store.getState()
        if (userInfo?.name === userName) {
            store.dispatch(setRoomTurnState(TURN_STATUS.LOST))
        }
        else {
            store.dispatch(setRoomTurnState(TURN_STATUS.WON))
        }
    }

    private onConnected() {
        this.setConnectionStatus(SOCKET_MANAGER_CONNECTION_STATUSES.CONNECTED)
    }

    private onConnectionError() {
        this.setConnectionStatus(SOCKET_MANAGER_CONNECTION_STATUSES.DISCONNECTED)
    }

    private onTurnToggle({ state: newTurnState, user: socketId }: { state: TURN_STATUS, user: string }) {
        const { userInfo } = store.getState()
        if (userInfo?.socketId === socketId) {
            store.dispatch(setRoomTurnState(newTurnState))
        }
    }

    private onMessage(message: string) {
        console.log("Message Handler --->", message)
    }

    private onMoveReceived(item: ITurnHistoryItem) {
        store.dispatch(appendRoomTurnHistoryItemAction(item))
        if (item.isFirst) {
            store.dispatch(setRoomTurnState(TURN_STATUS.PLAY))
        }
    }


    setConnectionStatus(status: SOCKET_MANAGER_CONNECTION_STATUSES) {
        this.connectionStatus = status;
        store.dispatch(setWebSocketServerStatus(status))
    }

    async login(name: string) {
        const data: ISocketLoginData = { username: name }
        this.socketInstance.emit(SOCKET_EVENTS.EMIT_LOGIN, data)
        const user: IUser = { name, socketId: this.socketInstance.id }
        store.dispatch(loginAction(user))
    }

    joinRoom(userName: string, room: string, roomType: ROOM_TYPES) {
        const data: ISocketJoinRoomData = { username: userName, room, roomType }
        this.socketInstance.emit(SOCKET_EVENTS.EMIT_JOIN_ROOM, data)
        store.dispatch(setRoomTurnState(TURN_STATUS.WAITING_FOR_PLAYER))
    }

    leaveRoom() {
        this.socketInstance.emit(SOCKET_EVENTS.EMIT_LEAVE_ROOM)
    }

    letsPlay() {
        this.socketInstance.emit(SOCKET_EVENTS.EMIT_START_OFFER)
    }

    sendMove(calculatedNumber: Number, selectedNumber: Number) {
        const data: ISocketSendNumberData = { number: calculatedNumber, selectedNumber }
        this.socketInstance.emit(SOCKET_EVENTS.EMIT_SEND_MOVE, data)
    }

}

const SockManager = new SocketManager();

export default SockManager;