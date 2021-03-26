import axios from "axios";

const ENDPOINT_URL =
  "https://zjhb2e1fl7.execute-api.ap-northeast-1.amazonaws.com/dev";

export default async function loader(source: string) {
  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];
  console.log(ext);

  const res = await axios.get(`${ENDPOINT_URL}/page/hoge`);
  source = source.replace(/\<lasca\>\<\/lasca\>/g, res.data.template);

  return JSON.stringify(source);
}
