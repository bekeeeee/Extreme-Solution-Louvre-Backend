# Online Louvre

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bekeeeee/Extreme-Solution-Louvre-Backend)

# Description

This project aims to create a mini online version of the Louvre museum in which guests can login and
view ancient art pieces and know about their history and artists, That required the following:

- service is responsible for authenticate and login users.
- service is responsible for validating whether logged user is permitted to do get, update and delete an art .
- service is resbonsible for loggin users out from the system

# Table of Contents

- [Installation](#installation)

- [Getting started](#gettinStarted)

- [Tests](#tests)

- [Updates](#updates)

- [License](#license)

# Installation

The following necessary dependencies must be installed to run the application properly: nodejs and typescript

# Getting started

- Clone the repository

```
git clone  https://github.com/bekeeeee/Extreme-Solution-Louvre-Backend
```

- Install dependencies

```
npm install
```

- Import all arts and users to DB

```
npm run import:data
```

```

Now you can login as an admin by
{
    username: "Ahmed",
    password: 12345

}
or by a user
{
    username: "Mohamed",
    password: 12345

}
```

- Build and run the project

```
npm run dev
```

Navigate to `http://localhost:5000`

- API Document endpoints

http://localhost:5000/api/v1/user

post `http://localhost:5000/api/v1/user` to signup

post `http://localhost:5000/api/v1/user/login` to login

get `http://localhost:5000/api/v1/user` to get all users

get `http://localhost:5000/api/v1/user/currentUser` to get currentUser

get `http://localhost:5000/api/v1/user/signout` to signout

http://localhost:5000/api/v1/art

post `http://localhost:5000/api/v1/art` to create an art

get `http://localhost:5000/api/v1/art` to get all arts

patch `http://localhost:5000/api/v1/art/:id` to edit an art

delete `http://localhost:5000/api/v1/art/:id` to delete an art

## Testing

The tests are written in Jest.

- Run tests files

```
npm run test

```

## Updates

In the next version we implement forgot password, reset password and using nodemailer.

# License

This project is license under the MIT license.
