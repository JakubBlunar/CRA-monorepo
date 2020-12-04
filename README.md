# JBL's monorepo

Monorepo boilerplate for React Create react app using:<br />
Lerna<br />
Yarn workspaces<br />
React 17<br />
Typescript<br />
Prettier<br />
Eslint<br />
Editorconfig<br />
Craco<br />

Package folders must be defined in package.json from root directory and each package must contain "main:src" entry in package json along with main describing entry point of library.

## Installation

In the root directory run:

```
yarn
```

or

```
yarn install
```

Set vs-code typescript version to 4.1.2! Without it you will have problems with jsx in typescript

## Installing new npm packages

New npm libraries can be easily added to specific workspace by specifying workspace in yarn add script.

```
yarn workspace @jbl/core add lodash
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the @jbl/frontend cra app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the tests in all packages.

### `yarn test:ci`

Run eslint and tests on all packages and generates code coverage. Used in CI because it onlu outputs results and not progress of operations.

### `yarn lint`

Launches lint in all packages.

### `yarn build`

Builds the @jbl/frontend for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn analyze`

Analyzes @jbl/frontend production bundle displaying all included dependences in production bundle.
