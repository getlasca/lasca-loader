export interface Component {
  name: string;
  jsxTemplate: string;
  vueTemplate: string;
  css: string;
}

export interface FileComponentsRelation {
  file: string;
  components: string[];
}
