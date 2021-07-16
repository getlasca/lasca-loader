import { GraphQLClient, gql } from "graphql-request";

const ENDPOINT_URL = "https://api.lasca.app/query";

export default async function request(
  token: string,
  _components: any[]
): Promise<any> {
  const client = new GraphQLClient(process.env.ENDPOINT_URL || ENDPOINT_URL);
  client.setHeader("X-LASCA-TOKEN", token);

  const query = gql`
    query GetBreakpoints {
      breakpoints {
        min
        max
        variables {
          nodeId
          expression
        }
        conditions {
          nodeId
          expression
        }
        loops {
          nodeId
          variable
          itemVariable
        }
        events {
          nodeId
          eventType
          name
        }
        importedFigma {
          figma
          figmaMixedText
          importedImages {
            nodeId
            imageId
          }
        }
      }
    }
  `;
  const res = await client.request(query);
  const breakpoints = res.breakpoints.map((b: any) => {
    b.figma = JSON.parse(b.importedFigma.figma);
    b.mixedTexts = JSON.parse(b.importedFigma.figmaMixedText);
    b.nodeImages = b.importedFigma.importedImages;
    return b;
  });
  return breakpoints;
}
