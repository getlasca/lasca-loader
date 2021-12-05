import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

export function convertReact(
  source: string,
  file: string,
  selfStyleImport: boolean
): string {
  const tagExp = /<lasca(?: .+?)?>.*?<\/lasca>/g;

  let imports: string[] = [];
  if (!selfStyleImport) {
    imports =
      source.match(tagExp)?.map((tag) => {
        const doc = new JSDOM(tag).window.document;
        const attr = doc
          .getElementsByTagName("lasca")[0]
          .attributes.getNamedItem("component");
        if (!attr) {
          throw new Error(
            `component attribute of lasca tag is not set at ${file}.`
          );
        }

        const absoluteCssPath = `${process.cwd()}/lasca/assets/css/${
          attr.value
        }.css`;
        const relativeCssPath = path.relative(
          path.dirname(file),
          absoluteCssPath
        );

        return `import ${attr.value} from "${relativeCssPath}";`;
      }) || [];
  }

  const output = source.replace(tagExp, (tag) => {
    const doc = new JSDOM(tag).window.document;
    const attr = doc
      .getElementsByTagName("lasca")[0]
      .attributes.getNamedItem("component");
    if (!attr) {
      throw new Error(
        `component attribute of lasca tag is not set at ${file}.`
      );
    }

    const filePath = `./lasca/assets/jsx_template/${attr.value}.tpl`;
    if (!fs.existsSync(path.resolve(filePath))) {
      throw new Error(`component name ${attr.value} is not pulled at ${file}.`);
    }
    const template = fs.readFileSync(path.resolve(filePath), "utf-8");
    return template;
  });

  return imports.join(" ") + " " + output;
}
