# 👷‍♂️🚧 ZNSConnect API 🚧👷‍♂️ 

## Getting started

### Prerequisites

Clone this repo.
```shell
git clone https://github.com/ZNS-Connect/zns-api-core.git
```

### Installation

install dependencies
```shell
npm install
```

### Usage

To run locally for development
```shell
npm start
```

To build a bundled transpiled javascript app
```shell
npm run build
```

You should see the output in your terminal:
```
# npm start
> nodemon

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): src/**/* main.ts
[nodemon] watching extensions: ts
[nodemon] starting `ts-node ./main.ts`
Server running at: http://mypc.local:3000
```

### Deployment

#### Deploying manually
Build the bundle: leveraging webpack, we can compile our code and bundle it together so you no longer need to maintain dependencies in production environment.

```node
npm run bundle
```

Above script will produce `dist` folder that contains your compiled application. you can now simply `node ./dist/index.js` or use `pm2` as your process manager `pm2 start ./dist/index.js`


#### Docker

For a devOps, you cannot ignore the contributions made by [Docker](https://www.docker.com/) to bring inner peace in their lives. 

TODO: Docker deployment guide

In progress. 

# TODO
 - [x] Stop being lazy and move the kit to opensource.
 - [x] Configure basic structure
 - [x] `Typescript`
 - [x] `@Hapi/hapi` v19
 - [x] LICENSE
 - [x] Folder structure
 - [ ] `supertest` integration
 - [x] Write Dockerfile
 - [ ] Write docker-compose.yml file
 - [ ] Write `FAQ`
 - [ ] Write `Features`
 - [ ] Configure `TravisCI`

# Features
TODO: Features
In progress.

# FAQ
TODO: FAQ
In progress.

# Support
Use any of the following medium for support:

- Raise a ticket on [github](https://github.com/ZNS-Connect/zns-api-core/issues)