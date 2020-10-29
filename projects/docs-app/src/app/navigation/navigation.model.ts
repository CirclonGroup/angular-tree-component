export interface NavigationNode {
  title: string;
  url?: string;
  link?: string[];
  hidden?: boolean;
  tooltip?: string;
  children?: NavigationNode[];
}
