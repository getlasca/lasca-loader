export interface Component {
  name: string;
  template: string;
  css: string;
}

export interface FileComponent {
  file: string;
  components: string[];
}
