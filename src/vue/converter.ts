import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";
import { FileComponentsRelation } from "../types";

export function convertVueTemplate(source: string, file: string): string {
  const doc = new JSDOM(source).window.document;
  const lascaTags = doc.getElementsByTagName("lasca");

  for (let i = 0; i < lascaTags.length; i++) {
    const attr = lascaTags[i].attributes.getNamedItem("component");
    if (!attr) {
      throw new Error(
        `component attribute of lasca tag is not set at ${file}.`
      );
    }

    const filePath = `./lasca/assets/vue_template/${attr.value}.tpl`;
    if (!fs.existsSync(path.resolve(filePath))) {
      throw new Error(`component name ${attr.value} is not pulled at ${file}.`);
    }
    const template = fs.readFileSync(path.resolve(filePath), "utf-8");
    lascaTags[i].outerHTML = template;
  }

  return doc.body.innerHTML;
}

export function convertVueCss(
  source: string,
  file: string,
  relations: FileComponentsRelation[]
): string {
  let output = source;

  const relation = relations.find((v) => v.file === file);
  if (!relation) {
    return output;
  }

  for (let i = 0; i < relation.components.length; i++) {
    const filePath = `./lasca/assets/css/${relation.components[i]}.css`;

    if (!fs.existsSync(path.resolve(filePath))) {
      throw new Error(
        `component name ${relation.components[i]} is not pulled at ${file}.`
      );
    }

    const css = fs.readFileSync(path.resolve(filePath), "utf-8");
    output += css;
  }
  return output;
}
