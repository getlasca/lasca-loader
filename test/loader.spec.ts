import compiler from "./compiler";

test("simple vue.js", async () => {
  const stats = await compiler("sample.vue");
  let output = "";
  const modules = stats.toJson({ source: true }).modules;
  if (modules) {
    output = <string>modules[0].source;
  }

  expect(output).toBe('"<template><p>hoge</p></template>\\n"');
});
