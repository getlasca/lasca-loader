import { getOptions } from "loader-utils";
import path from "path";
import fs from "fs";
import { Component, FileComponent } from "./types";

export default function loader(source: string) {
  const fileComponents: FileComponent[] = (getOptions(this) as any)
    .fileComponents;
  const components: Component[] = JSON.parse(
    fs.readFileSync(path.resolve("./.lasca/components.json"), "utf-8")
  );

  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];

  if (ext === "jsx") {
    // TODO: react
    // source = source.replace(
    //   /\<lasca\>\<\/lasca\>/g,
    //   `<div>${output.template}<style>{\`${output.css}\`}</style></div>`
    // );
  } else if (this.resourceQuery.includes("type=template")) {
    source = convertVueTemplate(source, components);
  } else if (this.resourceQuery.includes("type=style")) {
    source = convertVueCss(
      source,
      this.resourcePath,
      components,
      fileComponents
    );
  }

  return source;
}

function convertVueTemplate(source: string, components: Component[]): string {
  const el = document.createElement("body");
  el.innerHTML = source;
  const lascaTags = el.getElementsByTagName("lasca");

  for (let i = 0; i < lascaTags.length; i++) {
    // TODO: FIX error handling
    const attr = lascaTags[i].attributes.getNamedItem("component");
    if (!attr) {
      throw new Error("component attribute is not set at lasca tag.");
    }
    const component = components.find(
      (component) => component.name === attr.value
    );
    if (!component) {
      throw new Error(`component name ${attr.value} is not set.`);
    }
    lascaTags[i].outerHTML = component.template;
  }

  return el.innerHTML;
}

function convertVueCss(
  source: string,
  file: string,
  components: Component[],
  fileComponents: FileComponent[]
): string {
  let output = source;

  const fileComponent = fileComponents.find(
    (fileComponent) => fileComponent.file === file
  );
  if (!fileComponent) {
    return output;
  }

  const targetComponents = components.filter((component) => {
    return fileComponent.components.includes(component.name);
  });
  for (let i = 0; i < targetComponents.length; i++) {
    output = output + targetComponents[i].css;
  }

  return output;
}

export { LascaLoaderVuePlugin } from "./plugin";
