import axios from "axios";

const ENDPOINT_URL =
  "https://zjhb2e1fl7.execute-api.ap-northeast-1.amazonaws.com/dev";

export default async function loader(source: string) {
  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];

  const res = await axios.get(`${ENDPOINT_URL}/page/hoge`);

  if (ext === "jsx") {
    source = source.replace(
      /\<lasca\>\<\/lasca\>/g,
      `<div>${res.data.jsx}<style>{\`${res.data.css}\`}</style></div>`
    );
  } else if (this.resourceQuery.includes("type=template")) {
    source = source.replace(/\<lasca\>\<\/lasca\>/g, res.data.template);
  } else if (this.resourceQuery.includes("type=style")) {
    source = source + res.data.css;
  }

  return source;
}
