# Breach Checker

The Email Pawn Checker is a web application that allows users to determine if their email address has been compromised in any data breaches. By entering an email address, the app will query a database of known breaches to provide information on whether the email address has been pawned or not. It helps users identify potential security risks associated with their email accounts and take necessary actions to protect their online presence.

## Authors

- [@Usman Asif](https://github.com/usmanasif)

## Prerequisites

- Node.js (version 14 or higher)
- NPM (Node Package Manager)

## Getting Started

Follow the instructions below to get the app up and running on your local machine.

## Installation

Navigate to the project directory:

```bash
  cd express-app
```

Install the dependencies:

```bash
  npm install
```

## Configuration

- Create a .env file in the root of the project.
- Set the following environment variables in the .env file:

```bash
  APP_PORT=8080
  HIBP_API_URL=https://api.example.com
  HIBP_API_KEY=your-api-key
```

Replace APP_PORT with the desired port number for running the server locally. Modify HIBP_API_URL and HIBP_API_KEY with the appropriate values for your environment.

## Usage

- Start the development server:

```bash
  npm run start:dev
```

The server should now be running at http://localhost:8080 (or the port number you specified in the .env file).

## API Endpoints

```bash
  GET /breaches?email=johndoe@example.com
```

Example Response:

```bash
[
  {
    "name": "Breach 1",
    "domain": "example.com",
    "breachDate": "2022-01-01",
    "description": "This is a sample breach",
    "dataClasses": ["Passwords", "Emails"],
    "isVerified": true,
    "isFabricated": false,
    "isSensitive": true,
    "isRetired": false,
    "isSpamList": false,
    "isMalware": false,
    "logoPath": "/logos/breach1.png"
  },
  {
    "name": "Breach 2",
    "domain": "example.com",
    "breachDate": "2022-02-01",
    "description": "Another sample breach",
    "dataClasses": ["Usernames", "Passwords", "Emails"],
    "isVerified": true,
    "isFabricated": false,
    "isSensitive": true,
    "isRetired": false,
    "isSpamList": false,
    "isMalware": false,
    "logoPath": "/logos/breach2.png"
  }
]
```

## Test Cases

To run test cases:

```bash
  npm test
```
