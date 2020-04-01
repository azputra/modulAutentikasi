# Dashboard Autentikasi
Dokumentasi API Dashboard Autentikasi.

### create .env and input environment variabeles

```PORT = 
JWT_SECRET = rahasia
PORT = 3000
EMAIL = 'yourmail@gmail.com'
API_SENDGRID = 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
```

## USAGE

```text
javascript
npm install
sequelize db:create
sequelize db:migrate
npm run dev
```

## BASE URL

```
https://localhost:3000
```

##  ACCESS

```````text
Access server port: 3000
```````

- ## USER ROUTES

  | Routing         | HTTP | Header(s)                         | Body                                                         | Response                                           | Description       |
  | --------------- | ---- | --------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | ----------------- |
  | /users/register | POST | application/x-www-form-urlencoded | name : String (***required***), email : String (***required***), password : String (***required***), numberSecret : String | Error: Internal server error Success: add new user | Create new user   |
  | /users/login    | POST | application/x-www-form-urlencoded | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login user   | normal user login |
  |                 |      |                                   |                                                              |                                                    |                   |

  ## USER REGISTER

  - **URL's**

    ```
    /users/register
    ```

  - **URL Params**

    - Require : `none`
    - Optional : `none`

  - **Data Params**

    - Require : `name:string` , `email:string` , `password:string`
    - Optional : `numberSecret:string`

  - **Headers**

    - application/x-www-form-urlencoded

  - **HTTP Method**

    `POST`

  - **Success Response**

    - Code : 201 CREATED

    - Content :

      ```
      {
          "user": {
              "id": 1,
              "name": "azputra",
              "email": "ahmadzp@gmail.com",
              "password": "$2b$08$1/s3523PsAzAuhkDzqracOUHceDfEBkXoUYUmIMzVzF5RbM3wqsaG",
              "updatedAt": "2020-04-01T00:49:36.159Z",
              "createdAt": "2020-04-01T00:49:36.159Z",
              "numberSecret": "$2b$08$PZ.QIk/Y7puspzml/vqc..YJbrZUQJJCRt2nnDIxHFN4V.d4g9Yw6"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg1NzAyMTc2fQ.EmJxH7Riw2l6QyoR0XSHeyKgqiR5BDxIVHSFSdV-zQo"
      }
      ```

  - **Error Response**

    - Validation name

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill name"
        ```

        - Code : 400 Bad Request

        - Content :

          ```
          "please enter your name"
          ```

    - Validation password

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill password"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "Please enter your password"
        ```

    - Validation Email

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill email"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "Please enter your email"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "format email wrong"
        ```

    - Validation Unique Email

      - Code : 400 Bad Request

      - Content :

        ```
        "email already exist"
        ```

    - Validation Unique username

      - Code : 400 Bad Request

      - Content :

        ```
        "username already exist"
        ```

    - Validation min length password

      - Code : 400 Bad Request

      - Content :

        ```
        "minimal password 6 character"
        ```


  ## USER LOGIN

  - **URL's**

    ```
    /users/login
    ```

  - **URL Params**

    - Require : `none`
    - Optional : `none`

  - **Data Params**

    - Require : `email:string` , `password:string`

  - **Headers**

    - application/x-www-form-urlencoded

  - **HTTP Method**

    `GET`

  - **Success Response**

    - Code : 200 OK

    - Content :

      ```
      {
          "id": 1,
          "name": "azputra",
          "email": "ahmadzp@gmail.com",
          "password": "$2b$08$1/s3523PsAzAuhkDzqracOUHceDfEBkXoUYUmIMzVzF5RbM3wqsaG",
          "numberSecret": "$2b$08$PZ.QIk/Y7puspzml/vqc..YJbrZUQJJCRt2nnDIxHFN4V.d4g9Yw6",
          "createdAt": "2020-04-01T00:49:36.159Z",
          "updatedAt": "2020-04-01T00:49:36.159Z"
      }
      ```

  - **Error Response**

    - Validation email or password

      - Code : 400 Bad Request

      - Content :

        ```
        "email or password wrong"
        ```

  ## SEND 2FA

  - **URL's**

    ```
    /users/send2FA/:userId
    ```

  - **URL Params**

    - Require : `userId:integer`
    - Optional : `none`

  - **Data Params**

    - Require : none

  - **Headers**

    - application/x-www-form-urlencoded

  - **HTTP Method**

    `GET`

  - **Success Response**

    - Code : 200 OK

    - Content :

      ```
      "Success Send 6 Digit Number"
      ```

  - **Error Response**

    - Wrong user id

      - Code : 404 Data Not Found

      - Content :

        ```
        "Not Found User Account"
        ```

  ## CHECK 2FA

  - **URL's**

    ```
    /users/check2FA/:userId
    ```

  - **URL Params**

    - Require : `userId:integer`
    - Optional : `none`

  - **Data Params**

    - Require : `numberSecret:integer`

  - **Headers**

    - application/x-www-form-urlencoded

  - **HTTP Method**

    `GET`

  - **Success Response**

    - Code : 200 OK

    - Content :

      ```
      {
          "user": {
              "id": 1,
              "name": "azputra",
              "email": "ahmadzp@gmail.com",
              "password": "$2b$08$1/s3523PsAzAuhkDzqracOUHceDfEBkXoUYUmIMzVzF5RbM3wqsaG",
              "numberSecret": "$2b$08$wU7txNkBwybx7bUpmLBXiO.5uBGFBYOmnadhfcJ78MWn41bbAkbmO",
              "createdAt": "2020-04-01T00:49:36.159Z",
              "updatedAt": "2020-04-01T01:10:06.776Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg1NzAzODYwfQ.bJ1U6cayhT2LC-Rsdj2_RY3l6oCfIwH1uYqH0YDoAyE"
      }
      ```

  - **Error Response**

    - Validation wrong user id

      - Code : 404 Data Not Found

      - Content :

        ```
        "Not Found User Account"
        ```

    - Validation wrong 6 digit code from email

      - Code : 400 Bad Request

      - Content :

        ```
        "Please Fill Correct 6 Digit Number"
        ```


## RESET PASSWORD

- **URL's**

  ```
  /users/resetPassword
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `oldPassword:string, newPassword:string, checkNewPassword:string`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    "Success Reset Password"
    ```

- **Error Response**

  - Validation token

    - Code : 404 Data Not Found

    - Content :

      ```
      "jwt must be provided"
      ```

  - Validation wrong token

    - Code : 404 Data Not Found

    - Content :

      ```
      "invalid signature"
      ```

  - Validation old password wrong

    - Code : 400 Bad Request

    - Content :

    ```
    "Old Password Wrong"
    ```

  - Validation newPassword is not same as checkNewPassword

    - Code : 400 Bad Request

    - Content :

    ```
    "Please Fill Same Password"
    ```

  - Validation wrong user id

    - Code : 404 Data Not Found

    - Content :

    ```
    "Not Found User Account"
    ```
