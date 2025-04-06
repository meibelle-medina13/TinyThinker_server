# TinyThinker Server (Backend)

## Description

This is a RESTful API built with Node.js and Express that provides backend services for a unity game developed application. It handles user accounts, scores, quarter or theme status of the game, and rewards collected where it includes CRUD operations. This server used MySQL database.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/meibelle-medina13/TinyThinker_server.git 
    ```

2. Install NPM Packages
    ```bash
    npm install
    ```

3. Setup environment variables by creating .env file. Here are the variables needed in .env file

    ```bash
    DATABASE_HOST = <host>
    DATABASE_USERNAME = <username>
    DATABASE_PASSWORD = <password>
    DATABASE_NAME = <dbname>
    PORT = <port>
    ```

4. Start the server
    ```bash
    npm run dev
    ```

    Your server should now be running at `http://localhost:3000/`

## Usage

### API Endpoints

#### /users
* `GET` : Get all users or players
* `POST` : Add new user or player

#### /users/updateLevel
* `PUT` : Update the level of the player

#### /users/updateTheme
* `PUT` : Update the theme of the player

#### /users_guardian
* `GET` : Get guardian information
* `POST` : Add new guardian

#### /scores
* `GET` : Get player's game level scores
* `PUT` : Update player's game level score

#### /test_score
* `GET` : Get player's pretest and posttest scores
* `POST` : Add player's test scores

#### /statistic
* `GET` : Get all the level scores of the player

#### /quarter_status
* `GET` : Get the status of all themes or quarters
* `PUT` : Update the status of each theme or quarter

#### /reward
* `GET` : Get all rewards collected of the player
* `POST`: Add or record new collected reward

#### /admin
* `GET` : Get the information of the admin
* `DELETE` : Delete or decline admin account

#### /admin/signup
* `POST` : Add new admin account

#### /admin/login
* `POST` : Login admin account

#### /admin/pending
* `GET` : Get all pending admin accounts

#### /admin/edit
* `PUT` : Update the admin's information

#### /admin/approve
* `PUT` : Update the status of admin account from pending to active account

Example on how to use the API:
```bash
http://localhost:3000/users
```