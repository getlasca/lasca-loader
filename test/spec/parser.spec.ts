import { getComponentsFromCode } from "../../src/parser";

test("getComponentsFromCode", async () => {
  const components = await getComponentsFromCode(
    `<template lang="lasca"><lasca component="component_1"></lasca></template> <style lang="scss" scoped>.dummy {color: red;}</style>`
  );
  expect(components[0]).toBe("component_1");
});
