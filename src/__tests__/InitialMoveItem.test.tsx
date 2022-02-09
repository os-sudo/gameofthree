import React from 'react';
import { render, screen } from '@testing-library/react';
import InitialMoveItem from '../components/InitialMoveItem';
import { ITurnHistoryItem } from "../interface"

const sampleMoveInfo: ITurnHistoryItem = {
    isFirst: true,
    isCorrectResult: false,
    number: 9999,
    selectedNumber: 0,
    user: "SAMPLE_USER"
}

test('render initial number', () => {
    const { getByTestId } = render(<InitialMoveItem moveInfo={sampleMoveInfo} />);
    const itemContent = getByTestId("initial-move-item-content").innerHTML;
    expect(itemContent).toContain("Game has started, your beginning number is : <b>9999</b>");
});
