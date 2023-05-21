# Demo of shared-routes library usage

The repository is a demo of how to use <a href="https://github.com/JeromeBu/shared-routes">the shared-routes library</a> in a monorepo.

There are two apps, the front, the backend. And the routes is a shared package :
- packages/front
- packages/back
- packages/routes

The monorepo is build with <a href="https://pnpm.io/workspaces">pnpm workspaces</a> and also <a href="https://turbo.build/repo">Turbo repo</a>.

##

## Setup the project localy

```bash
# clone the repository
git clone git@github.com:JeromeBu/shared-routes-demo.git

# install dependencies
pnpm install

# start the project
pnpm dev # at the root of the project
# (this will start both front and back each with pnpm dev)
```

You can run the backend tests with this command :

```bash
# from the root of the project :
pnpm --dir packages/back test

# or from the packages/back folder :
pnpm test
```

## Play with shared-routes definitions

You can now play with the shared-routes definitions, and see you keep every thing synchronized.

The shared definitions are in : `packages/routes/bookRoutes.ts`. Try editing the file, and see the changes in the front and back apps.

You can also change the contract, and see the compilation errors in the front and back apps.

