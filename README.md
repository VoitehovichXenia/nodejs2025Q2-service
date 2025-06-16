# Home Library Service

## Contents
1. [Get started](#get-started)
    1. [Prerequesties](#prerequisites)
    2. [Downloading](#downloading)
    3. [Installing](#installing-npm-modules)
    4. [Scanning vulnerabilities](#scanning-vulnerabilities)
    5. [Creating .env file](#creating-env-file)
    5. [Add required env variables](#add-required-env-variables)
    4. [Running](#running-application-with-docker)
    5. [Testing](#testing)
    6. [Linting and Formating](#auto-fix-and-format)

## Get started

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)
- Create DockerHub account [DockerHub](https://hub.docker.com/)

### Downloading

```
git clone https://github.com/VoitehovichXenia/nodejs2025Q2-service.git
```

### Installing NPM modules

```
npm install
```

### Creating .env file

```
npm run create:env
```

or copy it manualy from `.env.example`

### Add required env variables

```
# Insert your username
POSTGRES_USER=<your_db_user>
# Insert your password
POSTGRES_PASSWORD=<your_db_password>
```

### Running application with Docker

```
npm run docker
```

running app in a dev mode:

```
npm run docker:dev
```

NOTE: if you're using docker desktop, please check if docker engine is running before running any docker command

NOTE: please wait while containers will be fully built

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Scanning vulnerabilities

```
npm run scan
```

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

To run test for jwt token refresh:

```
npm run test:refresh
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```