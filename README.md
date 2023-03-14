# 2023-bootstrap-react-graphql

## Technologies

- ReactJS
- [Chakra-UI](https://chakra-ui.com)
- [Vite](https://vitejs.dev/), with
  - Typescript support
  - [And SWC](https://swc.rs/)
- [React router](https://reactrouter.com/en/main)
- i18n: [useLocales](https://github.com/fabienjuif/use-locales)
- store: [zustand](https://github.com/pmndrs/zustand)
- GraphQL with [urql](https://formidable.com/open-source/urql/)

## Commands

- `yarn` install dependencies
- `yarn start` start the local dev env
- `yarn start:server` start the local GraphQL server
- `yarn build` build the production version
- `yarn format` format code

## Commits & Wode workflow

When we want to code something in this repo, we have to:

1. Create a branch
2. Open a PR
3. Wait for review, then merge the PR with "squash" an remove the #<number>
4. We have to use [gitmoji convention](https://gitmoji.dev/) for the commit names
