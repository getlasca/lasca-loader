// import axiosBase from "axios";

// const ENDPOINT_URL =
//   "https://zjhb2e1fl7.execute-api.ap-northeast-1.amazonaws.com/dev";

// const axios = axiosBase.create({
//   baseURL: ENDPOINT_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   responseType: "json",
// });

export default function loader(source: string) {
  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];
  console.log(ext);

  // const res = await axios.get(`/page/hoge`);
  // console.log(res.data.template);

  source = source.replace(/\<lasca\>\<\/lasca\>/g, "<p>hoge</p>");

  return JSON.stringify(source);
}
