import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import userEvent from '@testing-library/user-event';

if (!window.setImmediate) {
    ((window.setImmediate) as any) = setTimeout
}

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


const loginPage = <LoginPage />


test('play button must disabled if username is empty', () => {
    const { getByTestId } = render(loginPage)
    const loginButton = getByTestId('login-button')
    expect(loginButton).toHaveAttribute('disabled')
});


test('play button must not disabled if username is empty', () => {
    const { getByTestId } = render(loginPage)
    const loginButton = getByTestId('login-button')
    const usernameInput = getByTestId('username-input')
    userEvent.type(usernameInput, "GUEST_SAMPLEPLAYER");
    expect(loginButton).not.toHaveAttribute('disabled')
});


test('username handler should correct invalid characters', () => {
    const { getByTestId } = render(loginPage)
    const usernameInput = getByTestId('username-input')
    userEvent.type(usernameInput, "Guest _ - * %");
    const usernameInputElement = getByTestId('username-input').querySelector('input')
    expect((usernameInputElement as HTMLInputElement).value).toMatch(/Guest_/)
});


test('generate new nickname when generate nickname button click', () => {
    const { getByTestId } = render(loginPage)
    const generateNickNameButton = getByTestId('generate-nickname')
    userEvent.click(generateNickNameButton)
    const usernameInput = getByTestId('username-input').querySelector('input')
    expect((usernameInput as HTMLInputElement).value).toMatch(/Guest_/)
});


test('navigate to lobby when click play', async () => {
    const { getByTestId, container } = render(<LoginPage />)
    const generateNickNameButton = getByTestId('generate-nickname')
    const loginButton = getByTestId('login-button')
    userEvent.click(generateNickNameButton)
    userEvent.click(loginButton)
    await setTimeout(() => {},1)
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/lobby');
});