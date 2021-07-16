import compiler from "./compiler";

export async function getOutput(fileName: string): Promise<string> {
  const stats = await compiler(fileName);
  const modules = stats.toJson({ source: true }).modules;
  const sources = modules!
    .filter((module) => !!module.source)
    .map((module) => {
      return module.source!.toString();
    });
  return sources[0];
}
