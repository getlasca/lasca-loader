import { JSDOM } from "jsdom";
import { Component, FileComponentsRelation } from "../types";

export function convertVueTemplate(
  source: string,
  components: Component[],
  file: string
): string {
  const doc = new JSDOM(source).window.document;
  const lascaTags = doc.getElementsByTagName("lasca");

  for (let i = 0; i < lascaTags.length; i++) {
    const attr = lascaTags[i].attributes.getNamedItem("component");
    if (!attr) {
      throw new Error(
        `component attribute of lasca tag is not set at ${file}.`
      );
    }
    const component = components.find(
      (component) => component.name === attr.value
    );
    if (!component) {
      throw new Error(`component name ${attr.value} is not pulled at ${file}.`);
    }
    lascaTags[i].outerHTML = component.vueTemplate;
  }

  return doc.body.innerHTML;
}

export function convertVueCss(
  source: string,
  file: string,
  components: Component[],
  relations: FileComponentsRelation[]
): string {
  let output = source;

  const relation = relations.find((v) => v.file === file);
  if (!relation) {
    return output;
  }

  const targetComponents = components.filter((component) => {
    return relation.components.includes(component.name);
  });
  for (let i = 0; i < targetComponents.length; i++) {
    output = output + targetComponents[i].css;
  }

  return output;
}
