import path from "path";
import fs from "fs";
import { readdirVueRecursively } from "./util/file";
import { FileComponent } from "./types";

export function getFileComponents(): FileComponent[] {
  const vueFiles = readdirVueRecursively(path.resolve("."));

  const fileComponents: FileComponent[] = vueFiles.map((file) => {
    const componentNames: string[] = [];
    let code = fs.readFileSync(file, "utf-8");

    const templateEl = document.createElement("body");
    templateEl.innerHTML = code;
    const templateTag = templateEl.getElementsByTagName("template")[0]
      .innerHTML;

    const lascaEl = document.createElement("body");
    lascaEl.innerHTML = templateTag;
    const lascaTags = lascaEl.getElementsByTagName("lasca");

    for (let i = 0; i < lascaTags.length; i++) {
      const attr = lascaTags[i].attributes.getNamedItem("component");
      if (attr) {
        componentNames.push(attr.value);
      }
    }

    return {
      file: file,
      components: componentNames,
    };
  });

  return fileComponents;
}
