# Amio Talio Front Page

## To run a project localy

1. Use `nvm` to use `node@15.8`. Current `node-sass` package is locked in to use `Node@15.8`. Sass compiler breaks with newer node versions. Will be resolved in future updates.

2. Clone repo and install dependencies:

```
npm install
```

3. Create `.env` file with the below values:

```
GATSBY_API_ENDPOINT_BASEPATH=https://amiotaliouniversity.herokuapp.com/api/v1
GATSBY_API_ENDPOINT_PASSWORD=https://amiotaliouniversity.herokuapp.com/api/password
GATSBY_DISCORD_GROUP_URL=https://discord.gg/p46rWDZf
GATSBY_TELEGRAM_GROUP_URL=https://t.me/+6RsiRBh04zA3ZDFk
GATSBY_STRIPE_PUBLIC_KEY=***<stripe_public_key>***
```

4. Run the project locally:

```
npm start
```


