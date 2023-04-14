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

## Some images of the app (I don't find out screen2gif tool on mac to record video)

- Swagger
  <img width="1438" alt="image" src="https://user-images.githubusercontent.com/16593431/232015713-188a619c-73ea-42e2-ac91-72e275663cb3.png">

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/16593431/232015767-87b5be50-e589-4e44-96ca-5b50683b874e.png">
- ER diagram
<img width="521" alt="image" src="https://user-images.githubusercontent.com/16593431/232013212-5e3e4638-a968-43dd-b4c2-6667b750b68c.png">
- RLS policies
<img width="1134" alt="image" src="https://user-images.githubusercontent.com/16593431/232013914-6d4e6c34-c695-40a5-9c1d-fb917412bd2e.png">

## TODO to improve the app

```js
// TODO: install esbuild
// TODO: apply absolute import (fix nodemon absolute import issue)
// TODO: add convert camelcase keys, snakecase key feature
// TODO: try another ways to reduce code smell - duplicate codes in defining schemas.
```
