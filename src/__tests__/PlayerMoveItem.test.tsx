import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerMoveItem from '../components/PlayerMoveItem';
import { ITurnHistoryItem } from "../interface"

const sampleMoveInfo: ITurnHistoryItem = {
    isFirst: false,
    isCorrectResult: false,
    number: 1000,
    selectedNumber: 1,
    user: "SAMPLE_USER"
}

const samplePlayerMoveItemPlayer = <PlayerMoveItem moveInfo={sampleMoveInfo} previousResult={2000} isOpponent={false} />
const samplePlayerMoveItemOpponent = <PlayerMoveItem moveInfo={sampleMoveInfo} previousResult={2000} isOpponent={true} />


test('renders move user', () => {
    const { getByTestId } = render(samplePlayerMoveItemPlayer);
    const itemContent = getByTestId("player-move-item-content").innerHTML;
    expect(itemContent).toContain(sampleMoveInfo.user);
});


test('render move formula', () => {
    const { getByTestId } = render(samplePlayerMoveItemPlayer);
    const itemContent = getByTestId("player-move-item-content").innerHTML;
    const formula = `[(${sampleMoveInfo.selectedNumber} + 2000) / 3] = ${sampleMoveInfo.number}`
    expect(itemContent).toContain(formula);
});

test(`render from the right side of screen if it is player's move`, () => {
    const { getByTestId } = render(samplePlayerMoveItemPlayer);
    const item = getByTestId("player-move-item-content");
    expect(item).toHaveStyle(`margin-left: auto`)
});

test(`render background color is lightgreen if it is player's move`, () => {
    const { getByTestId } = render(samplePlayerMoveItemPlayer);
    const item = getByTestId("player-move-item-content");
    expect(item).toHaveStyle(`background-color: lightgreen`)
});


test(`render from the left side of screen if it is opponent's move`, () => {
    const { getByTestId } = render(samplePlayerMoveItemOpponent);
    const item = getByTestId("player-move-item-content");
    expect(item).toHaveStyle(`margin-left: unset`)
});

