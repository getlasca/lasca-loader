import compiler from "./compiler";

export async function getOutput(fileName: string): Promise<string> {
  const stats = await compiler(fileName);
  let output = "";
  const modules = stats.toJson({ source: true }).modules;
  if (modules) {
    output = <string>modules[0].source;
  }
  return output;
}
