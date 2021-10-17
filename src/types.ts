export interface Component {
  name: string;
  template: string;
  css: string;
}

export interface FileComponentsRelation {
  file: string;
  components: string[];
}
