import * as webpack from "webpack";
import fs from "fs";
import path from "path";
import { getFileComponentsRelations } from "./parser";

export class LascaLoaderVuePlugin {
  static defaultOptions = {};
  options: any = {};

  constructor(options = {}) {
    this.options = { ...LascaLoaderVuePlugin.defaultOptions, ...options };
  }

  apply(compiler: webpack.Compiler) {
    if (!fs.existsSync(path.resolve("./lasca/code.json"))) {
      throw new Error(
        "[ERROR] lasca components should be pulled by `lasca pull` command."
      );
    }

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
        fileComponents: getFileComponentsRelations(),
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
