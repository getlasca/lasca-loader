import path from "path";
import webpack, { Stats } from "webpack";
import { createFsFromVolume, Volume } from "memfs";
import { VueLoaderPlugin } from "vue-loader";
import { LascaLoaderVuePlugin } from "../src";

export default (fixture: string, options = {}): Promise<Stats> => {
  const compiler = webpack({
    context: __dirname,
    entry: `./fixtures/${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"],
        },
        {
          test: /\.(lasca|css)$/,
          loader: "lasca-loader",
        },
      ],
    },
    plugins: [new LascaLoaderVuePlugin(), new VueLoaderPlugin()],
  });

  compiler.outputFileSystem = <any>createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (!stats) {
        reject("stats is undefined");
        return;
      }
      if (err) {
        reject(err);
      }
      if (stats.hasErrors()) {
        reject(stats.toJson().errors);
      }
      resolve(stats);
    });
  });
};
