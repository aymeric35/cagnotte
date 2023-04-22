# Nuxt-fullstack-starter monorepo

This repository is a starter that help create a nuxt 3 fullstack application.
It aimed to be modular by letting users choose their preferred stacks.
It based around monorepo and nuxt layers / modules.

## What's inside?

Utilities:
- [pnpm](https://pnpm.io) as the package manager
- [Turborepo](https://turbo.build/repo) for the monorepo
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [ESLint](https://eslint.org/) for code linting, with [antfu](https://github.com/antfu/eslint-config) config
- [Stylelint](https://stylelint.io/) for CSS linting

Nuxt 3 layers and modules:
- [DaisyUI](https://daisyui.com/) That include:
    - [Tailwindcss](https://tailwindcss.com/) with [Nuxt tailwind](https://tailwindcss.nuxtjs.org/)
    - A home made toast system, see `./packages/ui`
    - A home made form system, see `./packages/layers/nuxt-layer-daisyui-form`
    - A home made modal system, see `./packages/ui`

- nuxt-auth with [Auth0](https://auth0.com/) as provider (from [Sidebase](https://sidebase.io/)) that:
    - handle authentication and everthing that Auth0 offer
- [Prisma ORM](https://www.prisma.io/) that:
    - Register prisma into the context and make it available everywhere in your backend
- [tRPC](https://trpc.io/) that:
    - easily register router
    - easily inject context
    - **TODO**: trpc-shield

## Getting Started

See `./apps` folder for examples.

You can run all examples at once with:
> **you need to install dependencies first**
> ```bash
> pnpm i
> ```
```bash
pnpm run dev
```

or individually:
> **you need turbo installed globally and dependencies first**
> ```bash
> pnpm i
> ```
> ```bash
> pnpm add turbo --global
> ```
- for webapp:
    ```bash
    turbo run dev --filter=./apps/webapp
    ```
See [nuxt doc](https://nuxt.com/docs/getting-started/layers) for informations about Layers.


You can build your fullstack applications using the layers and modules inside the `packages` folder.
All you need to do is to include them, configure them if needed, and start your application.
You can include only the one that you need.


> The following pnpm commands are executed at the root of this repository
> They execute the corresponding commands of the apps and packages `package.json`
> you can skip this and go directly to [add a new app](#add-a-new-app--prerequisites-for-nuxt-3-app)

#### Setup

To install all dependencies, run the following command:

```bash
pnpm install
```

#### Develop

To develop all apps and packages, run the following command:

```bash
pnpm run dev
```

#### Lint

To check & fix linter through all apps and packages, run the following command:

```bash
pnpm run lint
pnpm run lint:fix
```

#### Test

To run tests through all apps and packages, run the following command:

```bash
pnpm run test
```

#### Test

To run tests through all apps and packages, run the following command:

```bash
pnpm run docs:dev
```

#### Build

To build all apps and packages, run the following command:

```bash
pnpm run build
```

#### Add a new nuxt 3 app

- With this project opened in vscode, open the terminal then go to `apps` folder
    ```bash
        cd apps
    ```
- Create your app, we are going to [create a nuxt 3 app](https://nuxt.com/docs/getting-started/installation):
    ```bash
        pnpm dlx nuxi init <project-name>
    ```
- run
    ```bash
        pnpm i
    ```
- then
    ```bash
        pnpm run dev
    ```
- And that it


Now that you have a nuxt 3 project, you can start adding layers and modules:

*go see [What's inside?](#whats-inside) for details on each layer and module.*
- [Start using ui with daisyui](#start-using-ui)
- [Start using nuxt-layer-auth0](#start-using-nuxt-layer-auth0)
- [Start using nuxt-layer-prisma](#start-using-nuxt-layer-prisma)
- [Start using nuxt-layer-trpc](#start-using-nuxt-layer-trpc)



## Start using ui

- Open the `package.json` file of your app, then in the `devDependencies` add this package:
    ```
    "@nuxt-fullstack-starter/ui": "workspace:*"
    ```
- Open the `nuxt.config.ts` file of your app, then add to the extends array:
    ```ts
    '@nuxt-fullstack-starter/ui'
    ```
    example:
    ```ts
    export default defineNuxtConfig({
      extends: [
        '@nuxt-fullstack-starter/ui'
      ],
    })
    ```
- run `pnpm i` (at the root of this repository), this will install dependencies.
- update config if needed in `./packages/tailwind-preset/index.js`, see [doc](https://daisyui.com/docs/config/)
- I recommend to define the themes you want to use in the config file, see [How to remove unused themes?](https://daisyui.com/docs/themes)
- this layer use `@nuxt/color-mode` for theme selection, see this [example](https://tailwindcss.nuxtjs.org/examples/daisyui/) for information

## Start using nuxt-layer-auth0

- Open the `package.json` file of your app, then in the `devDependencies` add this package:
    ```
    "@nuxt-fullstack-starter/nuxt-layer-auth0": "workspace:*"
    ```
- Open the `nuxt.config.ts` file of your app, then add to the extends array:
    ```ts
    '@nuxt-fullstack-starter/nuxt-layer-auth0'
    ```
    example:
    ```ts
    export default defineNuxtConfig({
      extends: [
        '@nuxt-fullstack-starter/nuxt-layer-auth0'
      ],
    })
    ```
- Create a Tenant (development environnement) and an application on [Auth0 website](https://manage.auth0.com/dashboard) and:
    - for application creation:
        - choose application type: **`Regular Web Application`**
        - Allowed Callback URLs: **`http://localhost:3000/api/auth/callback/auth0`**
        - Allowed Logout URLs: **`http://localhost:3000/api/auth/signin/auth0`** to redirect user to login
        - keep the page open for the next step
- copy the file `.env.example` from the `./packages/nuxt-layer-auth0` folder, then past it into your newly created application.
- edit the .env file, set Auth0 values
- run `pnpm i` (at the root of this repository), this will install dependencies

## Start using nuxt-layer-prisma

- Open the `package.json` file of your app, then in the `devDependencies` add this package:
    ```
    "@nuxt-fullstack-starter/nuxt-layer-prisma": "workspace:*"
    ```
- Open the `nuxt.config.ts` file of your app, then add to the extends array:
    ```ts
    '@nuxt-fullstack-starter/nuxt-layer-prisma'
    ```
    example:
    ```ts
    export default defineNuxtConfig({
      extends: [
        '@nuxt-fullstack-starter/nuxt-layer-prisma'
      ],
    })
    ```
- Into `./packages/database`, rename **`.env.example`** into **`.env`**
- Edit the **.env** file with your liking
- Edit `prisma/prisma.schema` to your liking
- Run **`pnpm run db:push`** to sync the schema to your database after changing the schema
- Run **`pnpm run db:generate`** to re-generate the client after changing the schema (if you delete node_modules, you need to rerun this command too)

## Start using nuxt-layer-trpc

- Open the `package.json` file of your app, then in the `devDependencies` add this package:
    ```
    "@nuxt-fullstack-starter/nuxt-layer-trpc": "workspace:*"
    ```
- Open the `nuxt.config.ts` file of your app, then add to the extends array:
    ```ts
    '@nuxt-fullstack-starter/nuxt-layer-trpc'
    ```
    example:
    ```ts
    export default defineNuxtConfig({
      extends: [
        '@nuxt-fullstack-starter/nuxt-layer-trpc'
      ],
    })
    ```
- copy `./packages/nuxt-layer-trpc/server/trpc` folder into your app server folder
- you can modify `context.ts` file (the one you copied), see file content for infos. Useful if you need to pass database connection for example
- modify `routers` folder (the one you copied) to add queries and mutations
- see [example](https://github.com/wobsoriano/trpc-nuxt/tree/next/playground) or `./apps/trpc` folder
