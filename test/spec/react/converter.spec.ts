import { convertReact } from "../../../src/react/converter";

describe("getComponentsFromCode", () => {
  test("simple", async () => {
    const source = await convertReact(
      `
      import React from "react"
      import ReactDOM from "react-dom"
      
      class App extends React.Component {
        constructor(props) {
          super(props);
          this.state = {count: 10};
          this.handleClick = this.handleClick.bind(this);
        }
      
        handleClick() {
          this.setState(state => ({
            count: state.count + 1
          }));
        }
      
        render() {
          return (
            <lasca component="component_1"></lasca>
          );
        }
      }
      
      ReactDOM.render(
        <App />,
        document.getElementById('app')
      );
      `,
      [
        {
          name: "component_1",
          template: `<div class="breakpoint"><div>`,
          css: ".breakpoint{ cuesor: pointer; }",
        },
      ],
      ""
    );
    expect(
      source.includes(
        `<div><div class="breakpoint"><div><style>.breakpoint{ cuesor: pointer; }</style></div>`
      )
    ).toBeTruthy();
  });
});
