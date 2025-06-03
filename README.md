# Home Library Service

## Contents
1. [Get started](#get-started)
    1. [Prerequesties](#prerequisites)
    2. [Downloading](#downloading)
    3. [Installing](#installing-npm-modules)
    4. [Running](#running-application)
    5. [Testing](#testing)
    6. [Linting and Formating](#auto-fix-and-format)
2. [API Documentation](#api-documentation)
    1. [User](#user)
        1. [GET /user](#get-user)
        2. [GET /user/:id](#get-userid)
        3. [POST /user](#post-user)
        4. [PUT /user/:id](#put-usersid)
        5. [DELETE /user/:id](#delete-userid)
    2. [Track](#track)
        1. [GET /track](#get-track)
        2. [GET /track/:id](#get-trackid)
        3. [POST /track](#post-track)
        4. [PUT /track/:id](#put-tracksid)
        5. [DELETE /track/:id](#delete-trackid)
    3. [Artist](#artist)
        1. [GET /artist](#get-artist)
        2. [GET /artist/:id](#get-artistid)
        3. [POST /artist](#post-artist)
        4. [PUT /artist/:id](#put-artistsid)
        5. [DELETE /artist/:id](#delete-artistid)
    4. [Album](#album)
        1. [GET /album](#get-album)
        2. [GET /album/:id](#get-albumid)
        3. [POST /album](#post-album)
        4. [PUT /album/:id](#put-albumsid)
        5. [DELETE /album/:id](#delete-albumid)
    5. [Favorites](#favorites)
        1. [GET /favs](#get-favs)
        2. [POST /favs/track/:id](#post-favstrackid)
        3. [POST /favs/album/:id](#post-favsalbumid)
        4. [POST /favs/artist/:id](#post-favsartistid)
        5. [DELETE /favs/track/:id](#delete-favstrackid)
        6. [DELETE /favs/album/:id](#delete-favsalbumid)
        7. [DELETE /favs/artist/:id](#delete-favsartistid)

## Get started

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

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

### Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

# API Documentation

## User

### GET /user
Returns JSON with list of all existing users. By default list of users is empty.

Example:

#### Successful request

Request: **GET ``http://localhost:4000/user``**

Response:

- Status code: **200**
- Data:
    ```
    [
      {
        "id": "8e0ed616-0061-404a-9813-34413ef8d7c9",
        "login": "alan_wake",
        "version": 1,
        "createdAt": 1748851758422,
        "updatedAt": 1748851758422
      }
    ]
    ```

### GET /user/:id
Returns a JSON with an object with user info. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **GET ``http://localhost:4000/user/8e0ed616-0061-404a-9813-34413ef8d7c9``**

Response:

- Status code: **200**
- Data:
    ```
    {
      "id": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "login": "alan_wake",
      "version": 1,
      "createdAt": 1748851758422,
      "updatedAt": 1748851758422
    }
    ```

#### Failed request: user id isn't valid

Request: **GET ``http://localhost:4000/user/test_id``**

Response:

- Status code: **400**
- Data:
    ```
    {
      "message": "User ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: user doesn't exist

Request: **GET ``http://localhost:4000/user/2050bcaf-ade2-4393-b8ca-d8061a20444c``**

Response:

- Status code: **404**
- Data:
    ```
    {
      "message": "User with ID 2050bcaf-ade2-4393-b8ca-d8061a20444c was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### POST /user
Creates a new user record. Returns newly created record. Body should be a JSON with user data:

    ```
    {
      "login": "alan_wake" // required, string, min-length: 3 symbols
      "password": "CultOfTheTree"; // required, string, min-length: 6 symbols
    }
    ```

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/user``**
- Body:
	  ```
	  {
	  	"username": "nightcall",
	  	"password": "Drive1980"
	  }
	  ```

Response: 
- Status code: **201**
- Data:
    ```
    {
    	"id": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "login": "nightcall",
      "version": 1,
      "createdAt": 1748851758422,
      "updatedAt": 1748851758422
    }
    ```

#### Failed request: user data isn't valid

Request: **POST ``http://localhost:4000/user``**

- Body:
	  ```
	  {
	  	"login": "a",
      "password": ""
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": [
        "login must be longer than or equal to 3 characters",
        "password must be longer than or equal to 6 characters"
      ],
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

### PUT /users/:id
Update existing user with new data. Returns JSON with an updated object. ``:id`` should be a valid UUID. Body should be a JSON with user data:

    ```
    {
    	"oldPassword": "CultOfTheTree", // required, string, should match with user's password
      "newPassword": "ColdronLake" // requred, string
    }
    ```

Examples:

#### Successful request

Request: **PUT ``http://localhost:4000/users/8e0ed616-0061-404a-9813-34413ef8d7c9``**
- Body: 
	  ```
	  {
	    "oldPassword": "CultOfTheTree",
      "newPassword": "ColdronLake"
	  }
	  ```
Response:
- Status code: **201**
- Response:
    ```
    {
      "id": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "login": "alan_wake",
      "version": 2,
      "createdAt": 1748851758422,
      "updatedAt": 1748852996812
    }
    ```

#### Failed request: user data isn't valid

Request: **PUT ``http://localhost:4000/user/8e0ed616-0061-404a-9813-34413ef8d7c9``**

- Body:
	  ```
	  {
	    "oldPassword": "CultOfTheTree",
      "newPassword": 5
	  }
	  ```
Response:
- Status code: **400**
- Data
    ```
    {
        "message": [
            "newPassword must be a string"
        ],
        "error": "Bad Request",
        "statusCode": 400
    }
    ```

#### Failed request: user id isn't valid

Request: **PUT ``http://localhost:4000/user/test_id``**

- Body: 
	  ```
	  {
	    "oldPassword": "CultOfTheTree",
      "newPassword": "ColdronLake"
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "User ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: user doesn't exist

Request: **PUT ``http://localhost:4000/user/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

- Body: 
	  ```
	  {
	    "oldPassword": "CultOfTheTree",
      "newPassword": "ColdronLake"
	  }
	  ```
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "User with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### DELETE /user/:id
Deletes user record by id. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **DELETE ``http://localhost:4000/user/8e0ed616-0061-404a-9813-34413ef8d7c9``**

Response:
- Status code: **204**

#### Failed request: user id isn't valid

Request: **DELETE ``http://localhost:4000/user/test_id``**

Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "User ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: user doesn't exist

Request: **DELETE ``http://localhost:4000/user/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "User with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

## Track

### GET /track
Returns JSON with list of all existing tracks. By default list of tracks is empty.

Example:

#### Successful request

Request: **GET ``http://localhost:4000/track``**

Response:

- Status code: **200**
- Data:
    ```
    [
      {
        "id": "5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41",
        "name": "My Favourite Game",
        "artistId": "66d29d34-4d07-40d3-b248-45a8ffd6cb05",
        "albumId": "1a4e7fae-b096-4b06-8a57-a38f513afdb5",
        "duration": 220
      }
    ]
    ```

### GET /track/:id
Returns a JSON with an object with track info. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **GET ``http://localhost:4000/track/5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41``**

Response:

- Status code: **200**
- Data:
    ```
    {
      "id": "5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41",
      "name": "My Favourite Game",
      "artistId": "66d29d34-4d07-40d3-b248-45a8ffd6cb05",
      "albumId": "1a4e7fae-b096-4b06-8a57-a38f513afdb5",
      "duration": 220
    }
    ```

#### Failed request: track id isn't valid

Request: **GET ``http://localhost:4000/track/test_id``**

Response:

- Status code: **400**
- Data:
    ```
    {
      "message": "Track ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: track doesn't exist

Request: **GET ``http://localhost:4000/track/2050bcaf-ade2-4393-b8ca-d8061a20444c``**

Response:

- Status code: **404**
- Data:
    ```
    {
      "message": "Track with ID 2050bcaf-ade2-4393-b8ca-d8061a20444c was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### POST /track
Creates a new track record. Returns newly created record. Body should be a JSON with user data:

    ```
    {
      "name": "Nirvana - Come as you are", // required, string, min length: 1 symbol
      "artistId": null, // required, uuid or null
      "albumId": null, // required, uuid or null
      "duration": 218 // required, number
    }
    ```

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/track``**
- Body:
	  ```
	  {
	  	"name": "Nirvana - Come as you are",
      "artistId": null,
      "albumId": null,
      "duration": 218
	  }
	  ```

Response: 
- Status code: **201**
- Data:
    ```
    {
    	"id": "5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41",
      "name": "Nirvana - Come as you are",
      "artistId": null,
      "albumId": null,
      "duration": 218
    }
    ```

#### Failed request: track data isn't valid

Request: **POST ``http://localhost:4000/track``**

- Body:
	  ```
	  {
	  	"name": "",
      "artistId": null,
      "albumId": null,
      "duration": 0
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": [
        "name must be longer than or equal to 1 characters"
       ],
       "error": "Bad Request",
       "statusCode": 400
    }
    ```

### PUT /track/:id
Update existing track with new data. Returns JSON with an updated object. ``:id`` should be a valid UUID. Body should be a JSON with user data:

    ```
    {
    	"name": "Nirvana - Come as you are", // required, string, min length: 1 symbol
      "artistId": "8e0ed616-0061-404a-9813-34413ef8d7c9", // required, uuid or null
      "albumId": "null", // required, uuid or null
      "duration": 218000 // required, number
    }
    ```

Examples:

#### Successful request

Request: **PUT ``http://localhost:4000/track/5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41``**
- Body: 
	  ```
	  {
	    "name": "Nirvana - Come as you are",
      "artistId": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "albumId": "66d29d34-4d07-40d3-b248-45a8ffd6cb05",
      "duration": 220
	  }
	  ```
Response:
- Status code: **201**
- Response:
    ```
    {
      "id": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "login": "alan_wake",
      "version": 2,
      "createdAt": 1748851758422,
      "updatedAt": 1748852996812
    }
    ```

#### Failed request: track data isn't valid

Request: **PUT ``http://localhost:4000/track/5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41``**

- Body: 
	  ```
	  {
	    "name": "",
      "artistId": "test",
      "albumId": "random",
      "duration": "220"
	  }
	  ```
Response:
- Status code: **400**
- Data
    ```
    {
      "message": [
        "name must be longer than or equal to 1 characters",
        "artistId must be a UUID",
        "albumId must be a UUID",
        "duration must be an integer number"
      ],
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: track id isn't valid

Request: **PUT ``http://localhost:4000/track/test_id``**

- Body: 
	  ```
	  {
	    "name": "Nirvana - Come as you are",
      "artistId": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "albumId": "66d29d34-4d07-40d3-b248-45a8ffd6cb05",
      "duration": 220
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Track ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: track doesn't exist

Request: **PUT ``http://localhost:4000/track/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

- Body: 
	  ```
	  {
	    "name": "Nirvana - Come as you are",
      "artistId": "8e0ed616-0061-404a-9813-34413ef8d7c9",
      "albumId": "66d29d34-4d07-40d3-b248-45a8ffd6cb05",
      "duration": 220
	  }
	  ```
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Track with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### DELETE /track/:id
Deletes track record by id. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **DELETE ``http://localhost:4000/track/8e0ed616-0061-404a-9813-34413ef8d7c9``**

Response:
- Status code: **204**

#### Failed request: track id isn't valid

Request: **DELETE ``http://localhost:4000/track/test_id``**

Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Track ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: track doesn't exist

Request: **DELETE ``http://localhost:4000/track/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Track with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

## Artist

### GET /artist
Returns JSON with list of all existing artsists. By default list of artsists is empty.

Example:

#### Successful request

Request: **GET ``http://localhost:4000/artist``**

Response:

- Status code: **200**
- Data:
    ```
    [
      {
        "id": "698f29cc-d6c3-4fd1-8409-796bc08ce150",
        "name": "Nirvana",
        "grammy": true
      }
    ]
    ```

### GET /artist/:id
Returns a JSON with an object with artist info. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **GET ``http://localhost:4000/artist/698f29cc-d6c3-4fd1-8409-796bc08ce150``**

Response:

- Status code: **200**
- Data:
    ```
    {
      "id": "698f29cc-d6c3-4fd1-8409-796bc08ce150",
      "name": "Nirvana",
      "grammy": true
    }
    ```

#### Failed request: artist id isn't valid

Request: **GET ``http://localhost:4000/artist/test_id``**

Response:

- Status code: **400**
- Data:
    ```
    {
      "message": "Artist ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: artist doesn't exist

Request: **GET ``http://localhost:4000/artist/2050bcaf-ade2-4393-b8ca-d8061a20444c``**

Response:

- Status code: **404**
- Data:
    ```
    {
      "message": "Artist with ID 2050bcaf-ade2-4393-b8ca-d8061a20444c was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### POST /artist
Creates a new artist record. Returns newly created record. Body should be a JSON with user data:

    ```
    {
      name: "Nirvana", // required, string
      grammy: true // required, boolean
    }
    ```

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/artist``**
- Body:
	  ```
	  {
	  	"name": "Nirvana",
      "grammy": true
	  }
	  ```

Response: 
- Status code: **201**
- Data:
    ```
    {
      "id": "698f29cc-d6c3-4fd1-8409-796bc08ce150",
      "name": "Nirvana",
      "grammy": true
    }
    ```

#### Failed request: artist data isn't valid

Request: **POST ``http://localhost:4000/artist``**

- Body:
	  ```
	  {
	  	"name": "",
      "grammy": null
	  }
	  ```
Response:
- Status code: **400**
- Data:
  ```
  {
    "message": [
      "name must be longer than or equal to 2 characters",
      "grammy must be a boolean value"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

### PUT /artist/:id
Update existing artist with new data. Returns JSON with an updated object. ``:id`` should be a valid UUID. Body should be a JSON with user data:

    ```
    {
    	"name": "Nirvana", // required, string, min length: 1 symbol
      "grammy": false // required, boolean
    }
    ```

Examples:

#### Successful request

Request: **PUT ``http://localhost:4000/artist/698f29cc-d6c3-4fd1-8409-796bc08ce150``**
- Body: 
	  ```
	  {
	    "name": "Nirvana",
      "grammy": false
	  }
	  ```
Response:
- Status code: **201**
- Response:
    ```
    {
      "id": "698f29cc-d6c3-4fd1-8409-796bc08ce150",
      "name": "Nirvana",
      "grammy": false
    }
    ```

#### Failed request: artist data isn't valid

Request: **PUT ``http://localhost:4000/artist/5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41``**

- Body:
	  ```
	  {
	    "name": "",
      "grammy": null
	  }
	  ```
Response:
- Status code: **400**
- Data
  ```
  {
    "message": [
        "name must be longer than or equal to 2 characters",
        "grammy must be a boolean value"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

#### Failed request: artist id isn't valid

Request: **PUT ``http://localhost:4000/artist/test_id``**

- Body: 
	  ```
	  {
	    "name": "Nirvana",
      "grammy": false
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Artist ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: artist doesn't exist

Request: **PUT ``http://localhost:4000/artist/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

- Body: 
	  ```
	  {
	    "name": "Nirvana",
      "grammy": false
	  }
	  ```
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Artist with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### DELETE /artist/:id
Deletes artist record by id. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **DELETE ``http://localhost:4000/artist/8e0ed616-0061-404a-9813-34413ef8d7c9``**

Response:
- Status code: **204**

#### Failed request: artist id isn't valid

Request: **DELETE ``http://localhost:4000/artist/test_id``**

Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Artist ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: artist doesn't exist

Request: **DELETE ``http://localhost:4000/artist/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Artist with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

## Album

### GET /album
Returns JSON with list of all existing albums. By default list of albums is empty.

Example:

#### Successful request

Request: **GET ``http://localhost:4000/album``**

Response:

- Status code: **200**
- Data:
    ```
    [
      {
        "id": "e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e",
        "name": "Unknown Pleasures",
        "year": 1979,
        "artistId": null
      }
    ]
    ```

### GET /album/:id
Returns a JSON with an object with album info. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **GET ``http://localhost:4000/album/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**

Response:

- Status code: **200**
- Data:
    ```
    {
      "id": "e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e",
      "name": "Unknown Pleasures",
      "year": 1979,
      "artistId": null
    }
    ```

#### Failed request: album id isn't valid

Request: **GET ``http://localhost:4000/album/test_id``**

Response:

- Status code: **400**
- Data:
    ```
    {
      "message": "Album ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: album doesn't exist

Request: **GET ``http://localhost:4000/album/2050bcaf-ade2-4393-b8ca-d8061a20444c``**

Response:

- Status code: **404**
- Data:
    ```
    {
      "message": "Album with ID 2050bcaf-ade2-4393-b8ca-d8061a20444c was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### POST /album
Creates a new album record. Returns newly created record. Body should be a JSON with user data:

    ```
    {
      "name": "Unknown Pleasures", // required, string, min length: 1 symbol
      "year": 1979, // required, integer number
      "artistId": null // required, uuid string or null
    }
    ```

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/album``**
- Body:
	  ```
	  {
	  	"name": "Unknown Pleasures",
      "year": 1979,
      "artistId": null
	  }
	  ```

Response: 
- Status code: **201**
- Data:
    ```
    {
      "id": "698f29cc-d6c3-4fd1-8409-796bc08ce150",
      "name": "Unknown Pleasures",
      "year": 1979,
      "artistId": null
    }
    ```

#### Failed request: album data isn't valid

Request: **POST ``http://localhost:4000/album``**

- Body:
	  ```
	  {
	  	"name": "",
      "year": 1979.678,
      "artistId": "test"
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": [
         "name must be longer than or equal to 1 characters",
         "year must be an integer number",
         "Artist ID is not a valid UUID"
      ],
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

### PUT /album/:id
Update existing album with new data. Returns JSON with an updated object. ``:id`` should be a valid UUID. Body should be a JSON with user data:

    ```
    {
    	"name": "Unknown Pleasures", // required, string, min length: 1 symbol
      "year": 1979, // required, integer number
      "artistId": "698f29cc-d6c3-4fd1-8409-796bc08ce150" // required, uuid string or null
    }
    ```

Examples:

#### Successful request

Request: **PUT ``http://localhost:4000/album/698f29cc-d6c3-4fd1-8409-796bc08ce150``**
- Body: 
	  ```
	  {
	    "name": "Unknown Pleasures",
      "year": 1979,
      "artistId": "698f29cc-d6c3-4fd1-8409-796bc08ce150"
	  }
	  ```
Response:
- Status code: **201**
- Response:
  ```
  {
    "id": "698f29cc-d6c3-4fd1-8409-796bc08ce150",
    "name": "Unknown Pleasures",
    "year": 1979,
    "artistId": "698f29cc-d6c3-4fd1-8409-796bc08ce150"
  }
  ```

#### Failed request: album data isn't valid

Request: **PUT ``http://localhost:4000/album/5bbd529e-db0e-4fd4-a9f1-8b1aacb21f41``**

- Body:
	  ```
	  {
	    "name": "",
      "year": 1979.678,
      "artistId": "test"
	  }
	  ```
Response:
- Status code: **400**
- Data
  ```
  {
    "message": [
      "name must be longer than or equal to 1 characters",
      "year must be an integer number",
      "Artist ID is not a valid UUID"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

#### Failed request: album id isn't valid

Request: **PUT ``http://localhost:4000/album/test_id``**

- Body: 
	  ```
	  {
	    "name": "Unknown Pleasures",
      "year": 1979,
      "artistId": "698f29cc-d6c3-4fd1-8409-796bc08ce150"
	  }
	  ```
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Album ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: album doesn't exist

Request: **PUT ``http://localhost:4000/album/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

- Body: 
	  ```
	  {
	    "name": "Nirvana",
      "grammy": false
	  }
	  ```
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Album with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### DELETE /album/:id
Deletes album record by id. ``:id`` should be a valid UUID.

Examples:

#### Successful request

Request: **DELETE ``http://localhost:4000/album/8e0ed616-0061-404a-9813-34413ef8d7c9``**

Response:
- Status code: **204**

#### Failed request: album id isn't valid

Request: **DELETE ``http://localhost:4000/album/test_id``**

Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Album ID is not valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: album doesn't exist

Request: **DELETE ``http://localhost:4000/album/66d29d34-4d07-40d3-b248-45a8ffd6cb05``**

Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Album with ID 66d29d34-4d07-40d3-b248-45a8ffd6cb05 was not found",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

## Favorites

### GET /favs
Returns JSON with object with lists of all favorites. By default lists of favorites are empty.

Example:

#### Successful request

Request: **GET ``http://localhost:4000/favs``**

Response:

- Status code: **200**
- Data:
    ```
    {
      artists: [
        {
          "id": "4b924f71-4105-4b46-bad6-2826c3f8d557",
          "name": "Joy division",
          "grammy": false
        }
      ],
      albums: [
        {
          "id": "eda8b539-bdea-4974-b433-d087758792c2",
          "name": "Unknown Pleasures",
          "year": 1979,
          "artistId": null
        }
      ],
      tracks: [
        {
          "id": "c4fd9b4a-8397-4e5b-8a00-960774dd69f8",
          "name": "Nirvana - Come as you are",
          "artistId": null,
          "albumId": null,
          "duration": 220
        }
      ]
    }
    ```

### POST /favs/track/:id
Adds track with corresponding ``id`` to favorites.

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/favs/track/c4fd9b4a-8397-4e5b-8a00-960774dd69f8``**
Response: 
- Status code: **201**

#### Failed request: track id isn't valid

Request: **POST ``http://localhost:4000/favs/track/test_id``**
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Track ID is not a valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: track id isn't found

Request: **POST ``http://localhost:4000/favs/track/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**
Response:
- Status code: **422**
- Data:
    ```
    {
      "message": "Track with ID e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e was not added to favorites",
      "error": "Unprocessable Entity",
      "statusCode": 422
    }
    ```

### POST /favs/album/:id
Adds album with corresponding ``id`` to favorites.

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/favs/album/c4fd9b4a-8397-4e5b-8a00-960774dd69f8``**
Response: 
- Status code: **201**

#### Failed request: album id isn't valid

Request: **POST ``http://localhost:4000/favs/album/test_id``**
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Album ID is not a valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: album id isn't found

Request: **POST ``http://localhost:4000/favs/album/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**
Response:
- Status code: **422**
- Data:
    ```
    {
      "message": "Album with ID e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e was not added to favorites",
      "error": "Unprocessable Entity",
      "statusCode": 422
    }
    ```

### POST /favs/artist/:id
Adds artist with corresponding ``id`` to favorites.

Examples:

#### Successful request

Request: **POST ``http://localhost:4000/favs/artist/c4fd9b4a-8397-4e5b-8a00-960774dd69f8``**
Response: 
- Status code: **201**

#### Failed request: artist id isn't valid

Request: **POST ``http://localhost:4000/favs/artist/test_id``**
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Artist ID is not a valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: artist id isn't found

Request: **POST ``http://localhost:4000/favs/artist/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**
Response:
- Status code: **422**
- Data:
    ```
    {
      "message": "Artist with ID e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e was not added to favorites",
      "error": "Unprocessable Entity",
      "statusCode": 422
    }
    ```

### DELETE /favs/track/:id
Deletes track with corresponding ``id`` from favorites.

Examples:

#### Successful request

Request: **DELETE ``http://localhost:4000/favs/track/c4fd9b4a-8397-4e5b-8a00-960774dd69f8``**
Response: 
- Status code: **204**

#### Failed request: track id isn't valid

Request: **DELETE ``http://localhost:4000/favs/track/test_id``**
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Track ID is not a valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: track id isn't found

Request: **DELETE ``http://localhost:4000/favs/track/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Track with ID e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e was not added to favorites",
      "error": "Not Found",
      "statusCode": 404
    }
    ```

### DELETE /favs/album/:id
Deletes album with corresponding ``id`` to favorites.

Examples:

#### Successful request

Request: **DEELETE ``http://localhost:4000/favs/album/c4fd9b4a-8397-4e5b-8a00-960774dd69f8``**
Response: 
- Status code: **204**

#### Failed request: album id isn't valid

Request: **DELETE ``http://localhost:4000/favs/album/test_id``**
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Album ID is not a valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: album id isn't found

Request: **DELETE ``http://localhost:4000/favs/album/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Album with ID e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e was not added to favorites",
      "error": "Unprocessable Entity",
      "statusCode": 422
    }
    ```

### DELETE /favs/artist/:id
Deletes artist with corresponding ``id`` to favorites.

Examples:

#### Successful request

Request: **DELETE ``http://localhost:4000/favs/artist/c4fd9b4a-8397-4e5b-8a00-960774dd69f8``**
Response: 
- Status code: **204**

#### Failed request: artist id isn't valid

Request: **DELETE ``http://localhost:4000/favs/artist/test_id``**
Response:
- Status code: **400**
- Data:
    ```
    {
      "message": "Artist ID is not a valid UUID",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

#### Failed request: artist id isn't found

Request: **DELETE ``http://localhost:4000/favs/artist/e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e``**
Response:
- Status code: **404**
- Data:
    ```
    {
      "message": "Artist with ID e6a3900c-2bb1-4c0f-8485-2fa5a8f4713e was not added to favorites",
      "error": "Unprocessable Entity",
      "statusCode": 422
    }
    ```
