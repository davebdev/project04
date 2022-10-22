# A Wedding Manager

So, next year (2023), my partner and I are getting married. We've been engaged for about 4 years now, so it's been a long time coming. We're finally getting our act together and locking in a date. The topic of invites came up and I thought, with my newfound software engineering skills, I'd build our invites online. This webapp is the result of that thought.

## Login

To try out the app, go to [https://wedding-mgr.herokuapp.com/](https://wedding-mgr.herokuapp.com/) and use one of the below logins.

<u>Login as an admin:</u>



<u>Login as a guest:</u>



## Installation



## Technologies

### Backend

[Node.js](https://nodejs.org/en/) - used as the primary server environment

[Express.js](https://expressjs.com/) - a Node.js web application framework

[Twilio SendGrid](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail) - used to send emails from the app

[bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - used to hash the Admin passwords and the guest emails

[dotenv](https://github.com/motdotla/dotenv#readme) - used to load environment variables for the Twilio SendGrid API and Expression Secret Key

[express-session](https://github.com/expressjs/session#readme) - session middleware used in Express

[PostgreSQL](https://www.postgresql.org/) - the SQL database system used to store the guest and admin data

[node-postgres](https://node-postgres.com/) - a collection of node.js modules for interfacing with the PostgreSQL database

#### Backend Dev Dependancies

[nodemon](https://nodemon.io/) - automatically reloads the server environment upon detecting any new changes (when in development)

### Front End

[React](https://reactjs.org/) - a javascript library used to render components easily

[MUI Library](https://mui.com/material-ui/getting-started/overview/) - used to incorporate standardised React components that function well and look consistent.

[axios](https://axios-http.com/docs/intro) - used to make API calls to the backend

[react-router-dom](https://v5.reactrouter.com/web/guides/quick-start) - used to set up routes to different pages on the front end

#### Frontend Dev Dependancies

[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) - used to test react components


## Approach



## Unsolved problems



## Testing