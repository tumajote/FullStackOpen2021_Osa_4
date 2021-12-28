const correctUser = {
    "username": "Jake",
    "name": "Rusberg",
    "password": "Salasnana"
}

const incorrectUserNoUsername = {
    "name": "Rusberg",
    "password": "Salasnana"
}

const incorrectUserNoPassword = {
    "name": "Rusberg",
    "username": "Jake"
}

const incorrectUserTooShortUsername = {
    "name": "Rusberg",
    "username": "Ja",
    "password": "Salafewafewa"
}

const incorrectUserTooShortPassword = {
    "name": "Rusberg",
    "username": "Jake",
    "password": "Sa"
}

module.exports= {
    correctUser,
    incorrectUserNoUsername,
    incorrectUserNoPassword,
    incorrectUserTooShortPassword,
    incorrectUserTooShortUsername
}