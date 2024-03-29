import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser"
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs'; 

export default {
  input: "src/index.ts",
  output: {
    file: "bin/index.mjs",
    format: "esm",
  }, 
  plugins: [nodeResolve(), typescript(), terser(), commonjs()]
}