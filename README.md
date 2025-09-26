# Pokemon Aracde: Creating a pokemon-based gaming platform from a boilerplate

### Welcome to our final group project for Dev Academy Aotearoa

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

```
git clone [your-project-ssh-address]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

### Auth0

| key           | value                                                            |
| ------------- | ---------------------------------------------------------------- |
| domain        | mako-nixon-25.au.auth0.com                                       |
| audience      | https://pokemon-arcade/apiapi                                    |
| client_id     | uhu7X6fXsJnSduCjchoU8NuAOPCk0VY6                                 |
| email         | pokemonarcade@example.com                                        |
| password      | CokeZero1000                                                     |

---

## Seeds and Migrations setup for testing

If you run ```npm run knex seed:run``` directly, the terminal will return the error - SQLITE_CONSTRAINT: FOREIGN KEY constraint failed
To reset the seeds,

```
knex --knexfile ./server/db/knexfile.js migrate:rollback --all 
knex --knexfile ./server/db/knexfile.js migrate:latest
npm run knex seed:run

```
You can match the data in http://localhost:5173/pokedex/ to the dev.sqlite3 file to check it has worked.

## Meet the team:
Aeron Glasgow Keene - Agile Facilitator
Annie Moffatt - Product Owner
Kaylin Chu - Gitkeeper
Nixon Cam - Vibes Watcher
Rena Gillespie - Gitkeeper
