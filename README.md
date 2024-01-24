<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="images/nestjs.png" alt="Nest Logo" width="512" /></a>
</p>

<h1 align="center">NestJS GraphQL And Prisma Template</h1>

<p align="center">
  Template for new services based on NestJS with the Best Practices and Ready for Production
</p>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
</p>

## 🌟 What is including this template?

1. 👷 Use [SWC](https://swc.rs/) for compiling and running the tests of the service. As commented in the own [NestJS docs](https://docs.nestjs.com/recipes/swc), this is approximately x20 times faster than default typescript compiler that is the one that comes by default in NestJS.
2. ⚡️ Use [Fastify](https://fastify.dev/) as Web Framework. By default, [NestJS is using Express](https://docs.nestjs.com/techniques/performance) because is the most widely-used framework for working with NodeJS, however, this does not imply is the one is going to give us the most performance. Also, NestJS is fully compatible with Fastify, so we are providing this integration by default. You can check [here](https://github.com/fastify/benchmarks#benchmarks) comparison between different web frameworks.
3. 🐶 Integration with [husky](https://typicode.github.io/husky/) to ensure we have good quality and conventions while we are developing like:
   - 💅 Running the linter over the files that have been changed
   - 💬 Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure our commits have a convention.
   - ✅ Run the tests automatically.
   - ⚙️ Check our project does not have type errors with Typescript.
4. 🧪 Separate tests over production code. By default, NestJS is combining in the same folder, the `src`, the unit tests and the code we are developing for production. This is something I personally don't like so here I am separating this and having a dedicated folder for the unit tests.
5. 🤜🤛 Combine unit and e2e test coverage. In the services we may have both type of tests, unit and e2e tests, and usually we would like to see what is the combined test coverage, so we can see the full picture.
6. 📌 Custom path aliases, where you can define your own paths (you will be able to use imports like `@core/logger` instead of `../../../src/core/logger`).
7. 🚀 CI/CD using GitHub Actions, helping ensure a good quality of our code and providing useful insights about dependencies, security vulnerabilities and others.

## 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

## ⚙️ Building

```bash
npm run build
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
npm run test
```

If you are interested just in the unit tests, you can run:

```bash
npm run test:unit
```

Or if you want e2e tests, you can execute:

```bash
npm run test:e2e
```

## 💅 Linting

To run the linter you can execute:

```bash
npm run lint
```

And for trying to fix lint issues automatically, you can run:

```bash
npm run lint:fix
```
