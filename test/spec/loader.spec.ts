import { getOutput } from "../helper";

test("simple vue.js", async () => {
  const output = await getOutput("sample.vue");
  expect(output).toBe('"<template><p>hoge</p></template>"');
});
