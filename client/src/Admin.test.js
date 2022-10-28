import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Admin from './Admin.js';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import './AdminLogin.js';
import AdminLogin from "./AdminLogin.js";

let mockAxios;
let container;

beforeAll(() => {
    mockAxios = new MockAdapter(axios)
});

afterAll(() => {
    mockAxios.restore()
});

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container)
})

afterEach(() => {
    document.body.removeChild(container);
    container = null;
    mockAxios.reset()
});

export const authenticateMockResponse = {
        "data": {
            "id": 1,
            "fname": "Dave",
            "lname": "Buckley",
            "email": "davidpaulbuckley@gmail.com"
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "*",
            "access-control-allow-origin": "*",
            "connection": "close",
            "content-length": "78",
            "content-type": "application/json; charset=utf-8",
            "date": "Fri, 28 Oct 2022 05:00:26 GMT",
            "etag": "W/\"4e-5IWvjzoY3amSL1UigW6w4j/z244\"",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "transitional": {
                "silentJSONParsing": true,
                "forcedJSONParsing": true,
                "clarifyTimeoutError": false
            },
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {
                "FormData": null
            },
            "headers": {
                "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "admin/authenticate"
        },
        "request": {}
    }

export const guestMockResponse = {
    "data": [
            {
                "id": 4,
                "invite_id": 2,
                "fname": "Four",
                "lname": "Guest",
                "email": "guest4@ga.com",
                "rsvp": "Yes",
                "dietary_reqs": "N/A",
                "age_bracket": "A",
                "invite_status": "To be invited",
                "logged_in_timestamp": null,
                "logged_in_guest": null,
                "comments": "Hey Dave and Tyson, congratulations on your wedding, how exciting! We're totally gonna be there!"
            },
            {
                "id": 15,
                "invite_id": 2,
                "fname": "Five",
                "lname": "Guest",
                "email": "guest5@ga.com",
                "rsvp": "Yes",
                "dietary_reqs": "No seafood if possible",
                "age_bracket": "A",
                "invite_status": "To be invited",
                "logged_in_timestamp": null,
                "logged_in_guest": null,
                "comments": "Hey Dave and Tyson, congratulations on your wedding, how exciting! We're totally gonna be there!"
            },
            {
                "id": 2,
                "invite_id": 1,
                "fname": "Two",
                "lname": "Guest",
                "email": "guest2@ga.com",
                "rsvp": "No",
                "dietary_reqs": "Vegetarian",
                "age_bracket": "A",
                "invite_status": "To be invited",
                "logged_in_timestamp": null,
                "logged_in_guest": null,
                "comments": "This is a test"
            },
            {
                "id": 1,
                "invite_id": 1,
                "fname": "One",
                "lname": "Guest",
                "email": "guest1@ga.com",
                "rsvp": "Yes",
                "dietary_reqs": "Vegan",
                "age_bracket": "A",
                "invite_status": "To be invited",
                "logged_in_timestamp": null,
                "logged_in_guest": null,
                "comments": "This is a test"
            },
            {
                "id": 17,
                "invite_id": 5,
                "fname": "Glenn",
                "lname": "Erskine",
                "email": "glenn@ga.com",
                "rsvp": "Yes",
                "dietary_reqs": "",
                "age_bracket": "A",
                "invite_status": "To be invited",
                "logged_in_timestamp": null,
                "logged_in_guest": null,
                "comments": "Hi guys, so excited! Can't wait for the big night!"
            },
            {
                "id": 19,
                "invite_id": 5,
                "fname": "Ellie",
                "lname": "Erskine",
                "email": "ellie@ga.com",
                "rsvp": "Yes",
                "dietary_reqs": "",
                "age_bracket": "A",
                "invite_status": "To be invited",
                "logged_in_timestamp": null,
                "logged_in_guest": null,
                "comments": "Hi guys, so excited! Can't wait for the big night!"
            }
        ]
    }

describe("login", () => {

    test("Renders login when not logged in", () => {
        act(() => {
            ReactDOM.createRoot(container).render(<AdminLogin />);
        });
        const form = screen.getByTestId('login-form')
        expect(form).toBeInTheDocument();
    });

    test("Login works", async () => {
        mockAxios.onPost().reply(200, guestMockResponse);
        const login = jest.fn();
        act(() => {
            ReactDOM.createRoot(container).render(<AdminLogin />);
        });

        const form = screen.getByTestId('login-form')
        form.onsubmit = login

        const email = screen.getByTestId('email-input')
        email.value = 'test@ga.com'

        const password = screen.getByTestId('password-input')
        password.value = 'test'

        const loginButton = screen.getByTestId('login-button');

        await act(() => {
            fireEvent.click(loginButton)
        });
        expect(login).toHaveBeenCalledTimes(1);
        expect(mockAxios.handlers.post[0][4].data.length).toBeGreaterThan(0);
    });
});
