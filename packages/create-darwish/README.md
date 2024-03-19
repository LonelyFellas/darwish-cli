# create-darwish <a href="https://npmjs.com/package/create-darwish"><img src="https://img.shields.io/npm/v/create-darwish" alt="npm package"></a>

## Scaffolding Your First Darwish Project

> **Compatibility Note:**
> darwish requires [Node.js](https://nodejs.org/en/) version 18+, 20+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

```bash
$ npm create darwish@latest
```

With Yarn:

```bash
$ yarn create darwish
```

With PNPM:

```bash
$ pnpm create darwish
```

With Bun:

```bash
$ bun create darwish
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a darwish + Vue project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create darwish@latest my-vue-app -- --template vue

# yarn
yarn create darwish my-vue-app --template vue

# pnpm
pnpm create darwish my-vue-app --template vue

# Bun
bun create darwish my-vue-app --template vue
```

Currently supported template presets include:

- `vanilla`
- `vanilla-ts`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `react-swc`
- `react-swc-ts`
- `preact`
- `preact-ts`
- `lit`
- `lit-ts`
- `svelte`
- `svelte-ts`
- `solid`
- `solid-ts`
- `qwik`
- `qwik-ts`

You can use `.` for the project name to scaffold in the current directory.

## Community Templates

create-darwish is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome darwish for [community maintained templates](https://github.com/darwishjs/awesome-darwish#templates) that include other tools or target different frameworks. You can use a tool like [degit](https://github.com/Rich-Harris/degit) to scaffold your project with one of the templates.

```bash
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

If the project uses `main` as the default branch, suffix the project repo with `#main`

```bash
npx degit user/project#main my-project
```