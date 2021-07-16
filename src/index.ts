import { getOptions } from "loader-utils";

export default function loader(source: string) {
  const options = getOptions(this);
  console.log("options: " + JSON.stringify(options));

  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];

  const output = {
    template: "<div>template</div>",
    css: "body { color: red; }",
  };

  if (ext === "jsx") {
    source = source.replace(
      /\<lasca\>\<\/lasca\>/g,
      `<div>${output.template}<style>{\`${output.css}\`}</style></div>`
    );
  } else if (this.resourceQuery.includes("type=template")) {
    source = source.replace(/\<lasca\>\<\/lasca\>/g, output.template);
  } else if (this.resourceQuery.includes("type=style")) {
    source = source + output.css;
  }

  return source;
}

export { LascaLoaderPlugin } from "./plugin";
