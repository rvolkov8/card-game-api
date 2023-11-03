# Card Game API

This is a simple Nest.js API for managing card games. It allows you to create card games, shuffle decks, draw cards, and compare cards.

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

The API should now be running at [http://localhost:3000](http://localhost:3000).

## Test

```bash
# unit tests
$ npm run test
```

## Usage

### Creating a Game

To create a new card game, you can make a POST request to the `/game` endpoint. You need to provide the names of the first and second players in the request body.

**Example Request:**

```http
POST /game
Content-Type: application/json

{
  "firstPlayer": "Player 1",
  "secondPlayer": "Player 2"
}
```

**Example Response:**

```json
{
  "id": "a-unique-game-id",
  "firstPlayer": "Player 1",
  "secondPlayer": "Player 2"
}
```

### Shuffling the Deck

You can shuffle the deck of a game by making a PATCH request to the `/game/{id}/shuffle` endpoint, where `{id}` is the unique game ID.

**Example Request:**

```http
PATCH /game/a-unique-game-id/shuffle
```

This action return a response with 204 status code and shuffles the deck in the specified game.

### Drawing a Card

To draw a card from the deck of a game, make a PATCH request to the `/game/{id}/draw` endpoint, where `{id}` is the unique game ID.

**Example Request:**

```http
PATCH /game/a-unique-game-id/draw
```

**Example Response:**

```json
{
  "suit": "hearts",
  "rank": 7
}
```

### Comparing Cards

You can compare two or more cards to find the winning card by making a GET request to the `/game/compare` endpoint. Provide an array of card names in the request body.

**Example Request:**

```http
GET /game/compare
Content-Type: application/json

["Ace of spades", "King of hearts", "5 of diamonds"]
```

**Example Response:**

```json
{
  "winningCard": "Ace of spades"
}
```

## API Endpoints

- `POST /game`: Create a new game.
- `PATCH /game/{id}/shuffle`: Shuffle the deck in a game.
- `PATCH /game/{id}/draw`: Draw a card from a game's deck.
- `GET /game/compare`: Compare multiple cards to find the winning card.

