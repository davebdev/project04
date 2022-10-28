import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from './App';

import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import RsvpLogin from "./RsvpLogin.js";
import Rsvp from "./Rsvp.js";

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
            "infoMessage": "Successfully logged in"
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "*",
            "access-control-allow-origin": "*",
            "connection": "close",
            "content-length": "40",
            "content-type": "application/json; charset=utf-8",
            "date": "Fri, 28 Oct 2022 06:25:18 GMT",
            "etag": "W/\"28-FcmC60cXvR7f5zMOHviUSHM7mtY\"",
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
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            "method": "post",
            "url": "/guest/login",
            "data": "{\"email\":\"guest1@ga.com\"}"
        },
        "request": {}
    }

export const guestMockResponse = {
    "data": [
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
        }
    ],
    "status": 200,
    "statusText": "OK",
    "headers": {
        "access-control-allow-headers": "*",
        "access-control-allow-methods": "*",
        "access-control-allow-origin": "*",
        "connection": "close",
        "content-length": "487",
        "content-type": "application/json; charset=utf-8",
        "date": "Fri, 28 Oct 2022 06:25:18 GMT",
        "etag": "W/\"1e7-cvdzuZVgRB555PFJCxY/tIJ90+4\"",
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
        "url": "/guest"
    },
    "request": {}
}

describe("guest login", () => {

    test("Renders login when not logged in", () => {
        act(() => {
            ReactDOM.createRoot(container).render(<RsvpLogin />);
        });
        const form = screen.getByTestId('guest-login-form')
        expect(form).toBeInTheDocument();
    });

    test("Login works", async () => {
        mockAxios.onPost().reply(200, authenticateMockResponse);
        mockAxios.onGet().reply(200, guestMockResponse);
        const guestLogin = jest.fn();
        act(() => {
            ReactDOM.createRoot(container).render(<RsvpLogin />);
        });

        const form = screen.getByTestId('guest-login-form')
        form.onsubmit = guestLogin

        const email = screen.getByTestId('guest-email-input')
        email.value = 'test@ga.com'

        const loginButton = screen.getByTestId('guest-login-button');

        await act(() => {
            fireEvent.click(loginButton)
        });
        expect(guestLogin).toHaveBeenCalledTimes(1);
        expect(mockAxios.handlers.get[0][4].data.length).toBeGreaterThan(0);
    });
});
