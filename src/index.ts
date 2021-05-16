import { GraphQLClient, gql } from "graphql-request";

const ENDPOINT_URL = "https://api.lasca.app/query";

export default async function loader(source: string) {
  const endpoint = process.env.ENDPOINT_URL || ENDPOINT_URL;
  // const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];

  const client = new GraphQLClient(endpoint);
  client.setHeader("X-LASCA-TOKEN", process.env.LASCA_API_TOKEN || "no_token");

  const query = gql`
    query GetBreakpoints {
      breakpoints {
        min
        max
        figma
      }
    }
  `;

  const res = await client.request(endpoint, query);
  console.log(res);

  // if (ext === "jsx") {
  //   source = source.replace(
  //     /\<lasca\>\<\/lasca\>/g,
  //     `<div>${res.data.jsx}<style>{\`${res.data.css}\`}</style></div>`
  //   );
  // } else if (this.resourceQuery.includes("type=template")) {
  //   source = source.replace(/\<lasca\>\<\/lasca\>/g, res.data.template);
  // } else if (this.resourceQuery.includes("type=style")) {
  //   source = source + res.data.css;
  // }

  return source;
}
