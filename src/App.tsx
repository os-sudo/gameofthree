import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { LOGIN_PHASES_ENUMS } from "./enums";
import { IGameState, IUser } from "./interface";
import { SOCKET_MANAGER_CONNECTION_STATUSES } from "./enums";
const App = () => {
  const loginStatus: LOGIN_PHASES_ENUMS = useSelector((state: IGameState) => state.loginStatus);
  const webServerConnectionStatus: SOCKET_MANAGER_CONNECTION_STATUSES = useSelector((state: IGameState) => state.webServerStatus);
  const userInfo: IUser | null = useSelector((state: IGameState) => state.userInfo);
  const webSocketStatusMessages = {
    [SOCKET_MANAGER_CONNECTION_STATUSES.WAITING]: 'Connecting...',
    [SOCKET_MANAGER_CONNECTION_STATUSES.DISCONNECTED]: 'Disconnected !',
    [SOCKET_MANAGER_CONNECTION_STATUSES.CONNECTED]: 'Connected !'
  }
  return <div>
    <div style={{ backgroundColor: 'lightyellow', padding:"5px" }}>
      <b>=== DEBUG INFO ===</b><br />
      Login Status : {loginStatus} <br />
      Web Socket Status : {webSocketStatusMessages[webServerConnectionStatus]} <br />
      User Info : {JSON.stringify(userInfo)}
    </div>

    <Outlet />
  </div >;
}

export default App;

