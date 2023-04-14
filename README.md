# MetaPlay backend

MetaPlay dummy site backend

## Prerequisites

- nodejs - ^16.x.x
- yarn - ^1.22.18

## Local instructions:

```sh
yarn install

# Run the app
yarn dev
```

## Api docs:

- After the app starting up, access http://localhost:8080/docs to see the swagger docs.
- You can test api directly in swagger docs.

## How to get access token to run authorization required APIs.

- Run the frontend app and login to get the access token.
  https://github.com/hieuvecto/metaplay-frontend

## Some test account (email authentication)

- Admin -
  Email: crypto.hieuvecto@gmail.com
  Pass: 123abc

- User -
  Email: hieuvectograb@gmail.com
  Pass: 123abc

## TODO to improve the app

```js
// TODO: install esbuild
// TODO: apply absolute import (fix nodemon absolute import issue)
// TODO: add convert camelcase keys, snakecase key feature
// TODO: try another ways to reduce code smell - duplicate codes in defining schemas.
```
