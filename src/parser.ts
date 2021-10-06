import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";
import { readdirVueRecursively } from "./util/file";
import { FileComponent } from "./types";

export function getFileComponents(): FileComponent[] {
  const vueFiles = readdirVueRecursively(path.resolve("."));

  const fileComponents: FileComponent[] = vueFiles.map((file) => {
    let code = fs.readFileSync(file, "utf-8");
    const componentNames = getComponentsFromCode(code);
    return {
      file: file,
      components: componentNames,
    };
  });

  return fileComponents;
}

export function getComponentsFromCode(code: string): string[] {
  const componentNames: string[] = [];

  const template = code.replace(/\r?\n/g, "").match(/<template.+<\/template>/);
  if (!template) {
    return [];
  }

  const doc = new JSDOM(template[0]).window.document;
  const templateInner = doc.getElementsByTagName("template")[0].innerHTML;

  const docInner = new JSDOM(templateInner).window.document;
  const lascaTags = docInner.getElementsByTagName("lasca");

  for (let i = 0; i < lascaTags.length; i++) {
    const attr = lascaTags[i].attributes.getNamedItem("component");
    if (attr) {
      componentNames.push(attr.value);
    }
  }

  return componentNames;
}
