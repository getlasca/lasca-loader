import path from "path";
import fs from "fs";
import { getOptions } from "loader-utils";
import { convertVueTemplate, convertVueCss } from "./vue/converter";
import { Component, FileComponentsRelation } from "./types";

export default function loader(source: string) {
  const relations: FileComponentsRelation[] = (getOptions(this) as any)
    .fileComponents;
  const components: Component[] = JSON.parse(
    fs.readFileSync(path.resolve("./lasca/code.json"), "utf-8")
  );

  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];

  if (ext === "jsx") {
    // TODO: react
    // source = source.replace(
    //   /\<lasca\>\<\/lasca\>/g,
    //   `<div>${output.template}<style>{\`${output.css}\`}</style></div>`
    // );
  } else if (this.resourceQuery.includes("type=template")) {
    source = convertVueTemplate(source, components, this.resourcePath);
  } else if (this.resourceQuery.includes("type=style")) {
    source = convertVueCss(source, this.resourcePath, components, relations);
  }

  return source;
}

export { LascaLoaderVuePlugin } from "./vue/plugin";
