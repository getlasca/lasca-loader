import axios from "axios";

const ENDPOINT_URL =
  "https://zjhb2e1fl7.execute-api.ap-northeast-1.amazonaws.com/dev";

export default async function loader(source: string) {
  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];
  console.log(this.request);
  console.log(this.query);
  console.log(this.resource);
  console.log(this.resourceQuery);
  console.log(this.resourcePath);
  console.log(ext);

  const res = await axios.get(`${ENDPOINT_URL}/page/hoge`);

  if (this.resourceQuery.includes("type=template")) {
    console.log("template");
    source = source.replace(/\<lasca\>\<\/lasca\>/g, res.data.template);
  } else if (this.resourceQuery.includes("type=style")) {
    console.log("style");
    source = source + res.data.css;
  }

  console.log(source);
  return source;
}
