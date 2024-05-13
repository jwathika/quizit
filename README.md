## QUIZIT

Phase 2 Moringa final project - A quiz app which generates random questions based on different categories.

**Demo video** => https://mega.nz/file/mbJXFLSB#dkzSZCY8o2cPqwQFYFW3d9Cw87Zi7DZPsv4Tggp8UAo

**Live link** => https://quizit-delta.vercel.app/

## Features

## Technologies used:

- React: for the frontend https://react.dev/
- Daisy UI: A tailwind based component library https://daisyui.com/
- Vercel: for hosting the web app https://vercel.com/

## How to run locally

Ensure you have node <= 18 installed with npm

```
node -v
npm -v
```

Clone the repo and cd to the directory

```
git clone https://github.com/jwathika/quizit --depth 1 && cd quizit
```

Install required packages

```
npm install
```

Then start the app

```
npm run start
```

## Challenges faced

- On page reload, the user has to restart the process of generating quizzes. This can be resolved by use of localstorage but it is yet to be fixed.
- Group quizzes and leaderboard not yet available.

## Future plans

- Incorporate login/signup

- Allow codes/links so that users can share the quizzes and play together.
