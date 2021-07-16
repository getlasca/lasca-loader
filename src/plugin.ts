import * as webpack from "webpack";
import fs from "fs";

export class LascaLoaderPlugin {
  static defaultOptions = {};
  options: any = {};

  constructor(options = {}) {
    this.options = { ...LascaLoaderPlugin.defaultOptions, ...options };
  }

  apply(compiler: webpack.Compiler) {
    if (!process.env.LASCA_API_TOKEN) {
      throw new Error("[LascaLoaderPlugin Error] Environment variable LASCA_API_TOKEN is not set.")
    }
    
    console.log((compiler.options.entry as any).main.import);

    const text = fs.readFileSync(
      (compiler.options.entry as any).main.import[0],
      "utf8"
    );
    console.log(text);

    console.log(
      ((compiler.options.module.rules[0] as webpack.RuleSetRule).use as any)
        .options
    );

    ((compiler.options.module.rules[0] as webpack.RuleSetRule)
      .use as any).options = {
      aaa: "xxx",
    };
  }
}

export default LascaLoaderPlugin;
