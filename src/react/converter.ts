import { JSDOM } from "jsdom";
import { Component } from "../types";

export function convertReact(
  source: string,
  components: Component[],
  file: string
): string {
  return source.replace(/<lasca(?: .+?)?>.*?<\/lasca>/g, (tag) => {
    const doc = new JSDOM(tag).window.document;
    const attr = doc
      .getElementsByTagName("lasca")[0]
      .attributes.getNamedItem("component");
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
    return `<div>${component.template}<style>${component.css}</style></div>`;
  });
}
