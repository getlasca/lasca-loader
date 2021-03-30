import axios from "axios";

const ENDPOINT_URL =
  "https://zjhb2e1fl7.execute-api.ap-northeast-1.amazonaws.com/dev";

export default async function loader(source: string) {
  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];
  console.log(this.resourcePath);
  console.log(ext);

  const res = await axios.get(`${ENDPOINT_URL}/page/hoge`);
  const output = source.replace(/\<lasca\>\<\/lasca\>/g, res.data.template);

  console.log(output);

  return output;
}
