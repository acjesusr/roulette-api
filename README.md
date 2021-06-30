# Roulette API

## Description

[Nest](https://github.com/nestjs/nest) API simulatting an online roulette's behavior.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage

### Create a new roulette

Send a `POST` request to `/roulettes`.

- Response's body:

```json
{
  "rouletteId": "2dd6119c-f8ed-4a35-b073-9b407b32314d"
}
```

### Set a roulette open for bets

Send a `PATCH` request to `/roulettes/:id`.

- Response's body:

```json
{
  "status": "success"
}
```

### Place a bet

Send a `POST` request to `/roulettes/:id/bets`.

- Request's headers:

  - `X-USER-ID`: string with the user's id.

- Request's body:

```json
{
  "type": "number",
  "number": 36,
  "amount": 8500
}
```

### Close bets for a roulette

Send a `PATCH` request to `/roulettes/:id/close`.

- Response's body:

```json
{
  "color": "red",
  "number": 24,
  "gamblers": [
    {
      "userId": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betType": "color",
      "hasWon": true,
      "amount": 15480
    },
    {
      "userId": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betType": "number",
      "hasWon": true,
      "amount": 43000
    },
    {
      "userId": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betType": "number",
      "hasWon": false,
      "amount": 8600
    },
    {
      "userId": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betType": "color",
      "hasWon": true,
      "amount": 15480
    }
  ]
}
```

### Get the roulettes' statuses

Send a `GET` request to `/roulettes`.

- Response's body:

```json
{
  "roulettes": [
    {
      "id": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "status": "open"
    },
    {
      "id": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "status": "closed"
    }
  ]
}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
