import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
// import {
//   blue,
//   cyan,
//   green,
//   lightBlue,
//   lightGreen,
//   lightRed,
//   magenta,
//   red,
//   reset,
//   yellow,
// } from "kolorist";

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ["_"] });
const cwd = process.cwd();

// type ColorFunc = (str: string | number) => string;
// type Framework = {
//   name: string;
//   display: string;
//   color: ColorFunc;
//   variants: FrameworkVariant[];
// };
// type FrameworkVariant = {
//   name: string;
//   display: string;
//   color: ColorFunc;
//   customCommand?: string;
// };
// const FRAMEWORKS: Framework[] = [
//   {
//     name: "vanilla",
//     display: "Vanilla",
//     color: yellow,
//     variants: [
//       {
//         name: "vanilla-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "vanilla",
//         display: "JavaScript",
//         color: yellow,
//       },
//     ],
//   },
//   {
//     name: "vue",
//     display: "Vue",
//     color: green,
//     variants: [
//       {
//         name: "vue-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "vue",
//         display: "JavaScript",
//         color: yellow,
//       },
//       {
//         name: "custom-create-vue",
//         display: "Customize with create-vue ↗",
//         color: green,
//         customCommand: "npm create vue@latest TARGET_DIR",
//       },
//       {
//         name: "custom-nuxt",
//         display: "Nuxt ↗",
//         color: lightGreen,
//         customCommand: "npm exec nuxi init TARGET_DIR",
//       },
//     ],
//   },
//   {
//     name: "react",
//     display: "React",
//     color: cyan,
//     variants: [
//       {
//         name: "react-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "react-swc-ts",
//         display: "TypeScript + SWC",
//         color: blue,
//       },
//       {
//         name: "react",
//         display: "JavaScript",
//         color: yellow,
//       },
//       {
//         name: "react-swc",
//         display: "JavaScript + SWC",
//         color: yellow,
//       },
//       {
//         name: "custom-remix",
//         display: "Remix ↗",
//         color: cyan,
//         customCommand:
//           "npm create remix@latest TARGET_DIR -- --template remix-run/remix/templates/vite",
//       },
//     ],
//   },
//   {
//     name: "preact",
//     display: "Preact",
//     color: magenta,
//     variants: [
//       {
//         name: "preact-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "preact",
//         display: "JavaScript",
//         color: yellow,
//       },
//     ],
//   },
//   {
//     name: "lit",
//     display: "Lit",
//     color: lightRed,
//     variants: [
//       {
//         name: "lit-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "lit",
//         display: "JavaScript",
//         color: yellow,
//       },
//     ],
//   },
//   {
//     name: "svelte",
//     display: "Svelte",
//     color: red,
//     variants: [
//       {
//         name: "svelte-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "svelte",
//         display: "JavaScript",
//         color: yellow,
//       },
//       {
//         name: "custom-svelte-kit",
//         display: "SvelteKit ↗",
//         color: red,
//         customCommand: "npm create svelte@latest TARGET_DIR",
//       },
//     ],
//   },
//   {
//     name: "solid",
//     display: "Solid",
//     color: blue,
//     variants: [
//       {
//         name: "solid-ts",
//         display: "TypeScript",
//         color: blue,
//       },
//       {
//         name: "solid",
//         display: "JavaScript",
//         color: yellow,
//       },
//     ],
//   },
//   {
//     name: "qwik",
//     display: "Qwik",
//     color: lightBlue,
//     variants: [
//       {
//         name: "qwik-ts",
//         display: "TypeScript",
//         color: lightBlue,
//       },
//       {
//         name: "qwik",
//         display: "JavaScript",
//         color: yellow,
//       },
//       {
//         name: "custom-qwik-city",
//         display: "QwikCity ↗",
//         color: lightBlue,
//         customCommand: "npm create qwik@latest basic TARGET_DIR",
//       },
//     ],
//   },
//   {
//     name: "others",
//     display: "Others",
//     color: reset,
//     variants: [
//       {
//         name: "create-vite-extra",
//         display: "create-vite-extra ↗",
//         color: reset,
//         customCommand: "npm create vite-extra@latest TARGET_DIR",
//       },
//       {
//         name: "create-electron-vite",
//         display: "create-electron-vite ↗",
//         color: reset,
//         customCommand: "npm create electron-vite@latest TARGET_DIR",
//       },
//     ],
//   },
// ];
// const TEMPLATES = FRAMEWORKS.map(
//   (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]
// ).reduce((a, b) => a.concat(b), []);
const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};
const defaultTargetDir = "vite-project";

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  let targetDir = argTargetDir || defaultTargetDir;
  // const argTemplate = argv.template || argv.t;

  // determine template
  // let template: string = variant || framework?.name || argTemplate
  const root = path.join(cwd, targetDir);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../templates",
    `template-react-ts`
  );

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };
  const files = fs.readdirSync(templateDir);

  // for (const file of files.filter((f) => f !== "package.json")) {
  for (const file of files) {
    write(file);
  }
}
function copy(src: string, dest: string) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    // 丢入异步线程
    setTimeout(() => {
      fs.copyFileSync(src, dest);
    });
  }
}
function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}
function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

init().catch((error) => {
  console.error(error);
});
