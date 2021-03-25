import axios from "axios";
import { getOutput } from "./helper";

jest.mock("axios");

test("simple vue.js", async () => {
  const resp = {
    data: {
      template: "<p>hoge</p>",
    },
  };
  (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(resp);

  const output = await getOutput("sample.vue");
  expect(output).toBe('"<template><p>hoge</p></template>\\n"');
});
