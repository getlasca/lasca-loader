import path from "path";
import { getOptions } from "loader-utils";
import { convertReact } from "./react/converter";
import { convertVueTemplate, convertVueCss } from "./vue/converter";
import { FileComponentsRelation } from "./types";

export default function loader(source: string) {
  const options = getOptions(this) as any;

  if ([".jsx", ".tsx"].includes(path.extname(this.resourcePath))) {
    source = convertReact(source, this.resourcePath, options.selfStyleImport);
  } else if (this.resourceQuery.includes("type=template")) {
    source = convertVueTemplate(source, this.resourcePath);
  } else if (this.resourceQuery.includes("type=style")) {
    const relations: FileComponentsRelation[] = options.fileComponentRelations;
    source = convertVueCss(source, this.resourcePath, relations);
  }
  return source;
}

export { LascaLoaderVuePlugin } from "./vue/plugin";
