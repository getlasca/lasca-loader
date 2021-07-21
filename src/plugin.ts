import * as webpack from "webpack";
import { getFileComponents } from "./parser";

export class LascaLoaderVuePlugin {
  static defaultOptions = {};
  options: any = {};

  constructor(options = {}) {
    this.options = { ...LascaLoaderVuePlugin.defaultOptions, ...options };
  }

  apply(compiler: webpack.Compiler) {
    const rule = compiler.options.module.rules.find((rule) => {
      if (rule === "...") {
        return false;
      }
      if (rule.loader === "lasca-loader") {
        return true;
      }

      return (
        rule.use &&
        (rule.use as any).loader &&
        (rule.use as any).loader.includes("lasca-loader")
      );
    });
    if (rule && rule !== "...") {
      const options = {
        fileComponents: getFileComponents(),
      };
      if (rule.use) {
        (rule.use as any).options = options;
      } else {
        rule.options = options;
      }
    }
  }
}

export default LascaLoaderVuePlugin;
