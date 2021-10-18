import { getComponentsFromCode } from "../../../src/vue/parser";

describe("getComponentsFromCode", () => {
  test("simple", async () => {
    const components = await getComponentsFromCode(
      `<template lang="lasca">
        <lasca component="component_1"></lasca>
      </template>
      
      <style lang="scss" scoped>
      .dummy {
        color: red;
      }
      </style>`
    );
    expect(components[0]).toBe("component_1");
  });

  test("sass", async () => {
    const components = await getComponentsFromCode(
      `<template lang="lasca">
        <lasca component="component_1"></lasca>
      </template>

      <style lang="scss" scoped>
      .dummy {
        color: red;
      }

      .signup-to-signin {
        margin-bottom: 16px;


        .signup-to-signin-link {
          @include button-text-primary;
        }
      }
      </style>`
    );
    expect(components[0]).toBe("component_1");
  });

  test("no lasca tag", async () => {
    const components = await getComponentsFromCode(
      `<template lang="lasca">
        <div>aaa</div>
      </template>

      <style lang="scss" scoped>
      .dummy {
        color: red;
      }

      .signup-to-signin {
        margin-bottom: 16px;


        .signup-to-signin-link {
          @include button-text-primary;
        }
      }
      </style>`
    );
    expect(components.length).toBe(0);
  });
});
