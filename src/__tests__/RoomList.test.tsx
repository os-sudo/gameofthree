import React from 'react';
import { render } from '@testing-library/react';
import RoomList from '../components/RoomList';
import userEvent from '@testing-library/user-event';
import { IRoom } from '../interface';
import { ROOM_TYPES } from '../enums';

beforeEach(() => {
    jest.clearAllMocks();
});

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

const mockOnRoomExit = jest.fn();
const mockOnRoomSelected = jest.fn();

const RoomListFactory = (selectedRoom : IRoom | null = null) => {

    return <RoomList rooms={sampleRooms} 
                    selectedRoom={selectedRoom} 
                    onRoomExit={() => mockOnRoomExit() } 
                    onRoomSelected={() => mockOnRoomSelected() } />
}


test('render room list', () => {
    const roomList = RoomListFactory()
    const { container } = render(roomList);
    expect(container.innerHTML).toContain(sampleRoom1.name)
    expect(container.innerHTML).toContain(sampleRoom2.name)
})


test('disable non-selected rooms', () => {
    const roomList = RoomListFactory(sampleRoom1)
    const { getByTestId } = render(roomList)
    const nonSelectedItem = getByTestId('room-list-item-1')
    expect(nonSelectedItem).toHaveAttribute('disabled')
})

test('execute onroomselected when room selected', () => {
    const roomList = RoomListFactory()
    const { getAllByTestId } = render(roomList);
    const roomItemButton = getAllByTestId('room-item-button')[0]
    userEvent.click(roomItemButton)
    expect(mockOnRoomSelected).toHaveBeenCalled()
})



test('execute onroomexit when room exit button click', () => {
    const roomList = RoomListFactory(sampleRoom1)
    const { getAllByTestId } = render(roomList)
    const roomExitButton = getAllByTestId('room-exit-button')[0]
    userEvent.click(roomExitButton)
    expect(mockOnRoomExit).toHaveBeenCalled()
})


