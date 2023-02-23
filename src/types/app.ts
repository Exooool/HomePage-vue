export interface app {
  id: string;
  size: "large" | "small";
  title: string;
  type: "component" | "website";
  url?: string;
  iconType?: string;
  icon?: string;
  x?: number;
  y?: number;
}
