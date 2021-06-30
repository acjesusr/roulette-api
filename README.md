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

- Request's body:

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
  "colorGamblers": [
    {
      "id": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betResult": "win",
      "amount": 15480
    },
    {
      "id": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betResult": "lose",
      "amount": 8600
    },
    {
      "id": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betResult": "win",
      "amount": 15480
    }
  ],
  "numberGamblers": [
    {
      "id": "2dd6119c-f8ed-4a35-b073-9b407b32314d",
      "betResult": "win",
      "amount": 43000
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
