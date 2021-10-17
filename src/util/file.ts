import fs from "fs";

export function readdirVueRecursively(dir: string): string[] {
  const files = readdirRecursively(dir);
  return files.filter((file) => {
    const dotSplit = file.split("/").reverse()[0].split(".");
    const extension = dotSplit[dotSplit.length - 1];
    return extension === "vue";
  });
}

function readdirRecursively(dir: string, files: string[] = []): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      if (dirent.name === "node_modules" || dirent.name === ".nuxt") {
        continue;
      }
      dirs.push(`${dir}/${dirent.name}`);
    }
    if (dirent.isFile()) {
      files.push(`${dir}/${dirent.name}`);
    }
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
}
