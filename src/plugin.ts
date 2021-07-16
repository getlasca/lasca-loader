import * as webpack from "webpack";
// import fs from "fs";
import convert from "@lasca/template-converter";
import request from "./request";

export class LascaLoaderPlugin {
  static defaultOptions = {};
  options: any = {};

  constructor(options = {}) {
    this.options = { ...LascaLoaderPlugin.defaultOptions, ...options };
  }

  async apply(compiler: webpack.Compiler) {
    if (!process.env.LASCA_API_TOKEN) {
      throw new Error(
        "[LascaLoaderPlugin Error] Environment variable LASCA_API_TOKEN is not set."
      );
    }

    const breakpoints = await request(process.env.LASCA_API_TOKEN, []);
    const output = convert(breakpoints);

    console.log("output: " + output);

    ((compiler.options.module.rules[3] as webpack.RuleSetRule)
      .use as any).options = {
      aaa: "xxx",
    };

    ((compiler.options.module.rules[6] as webpack.RuleSetRule)
      .use as any).options = {
      bbb: "yyy",
    };
  }
}

export default LascaLoaderPlugin;
