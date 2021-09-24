import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";
import { readdirVueRecursively } from "./util/file";
import { FileComponent } from "./types";

export function getFileComponents(): FileComponent[] {
  const vueFiles = readdirVueRecursively(path.resolve("."));

  const fileComponents: FileComponent[] = vueFiles.map((file) => {
    const componentNames: string[] = [];
    let code = fs.readFileSync(file, "utf-8");
    console.log("code: " + code);

    const doc = new JSDOM(code).window.document;
    console.log("template :" + doc.getElementsByTagName("template"));
    const templateTag = doc.getElementsByTagName("template")[0].innerHTML;

    const docInner = new JSDOM(templateTag).window.document;
    const lascaTags = docInner.getElementsByTagName("lasca");

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
