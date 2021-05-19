import { GraphQLClient, gql } from "graphql-request";
import convert from "@lasca/template-converter";

const ENDPOINT_URL = "https://api.lasca.app/query";

export default async function loader(source: string) {
  const token = process.env.LASCA_API_TOKEN;
  const endpoint = process.env.ENDPOINT_URL || ENDPOINT_URL;
  const ext = this.resourcePath.split("/").reverse()[0].split(".")[1];
  const client = new GraphQLClient(endpoint);

  if (!token) {
    this.emitError(
      new Error("Environment variable LASCA_API_TOKEN is not set.")
    );
    return;
  }
  client.setHeader("X-LASCA-TOKEN", token);

  const query = gql`
    query GetBreakpoints {
      breakpoints {
        min
        max
        figma
      }
    }
  `;
  const res = await client.request(query);
  const breakpoints = res.breakpoints.map((b: any) => {
    return {
      min: b.min,
      max: b.max,
      figma: JSON.parse(b.figma),
    };
  });
  const output = convert({ breakpoints: breakpoints }, [], [], [], [], []);

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
