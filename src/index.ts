import path from "path";
import fs from "fs";
import { getOptions } from "loader-utils";
import { convertReact } from "./react/converter";
import { convertVueTemplate, convertVueCss } from "./vue/converter";
import { Component, FileComponentsRelation } from "./types";

export default function loader(source: string) {
  const components: Component[] = JSON.parse(
    fs.readFileSync(path.resolve("./lasca/code.json"), "utf-8")
  );

  if ([".jsx", ".tsx"].includes(path.extname(this.resourcePath))) {
    source = convertReact(source, components, this.resourcePath);
  } else if (this.resourceQuery.includes("type=template")) {
    source = convertVueTemplate(source, this.resourcePath);
  } else if (this.resourceQuery.includes("type=style")) {
    const relations: FileComponentsRelation[] = (getOptions(this) as any)
      .fileComponentRelations;
    source = convertVueCss(source, this.resourcePath, relations);
  }

  return source;
}

export { LascaLoaderVuePlugin } from "./vue/plugin";
