export interface app {
  id: string;
  size?: "large" | "small";
  title: string;
  description?: string;
  type: "component" | "website";
  url?: string;
  iconType?: string;
  icon?: string;
  x?: number;
  y?: number;
}

export interface browserApp {
  size?: "large" | "small";
  title: string;
  description?: string;
  type: "component" | "website";
  url?: string;
  iconType?: string;
  icon?: string;
  color?: string;
  background?: string | string[];
  backgroundAngle?: string;
}

export interface browserAppConfig {
  categoryName: string;
  list: browserApp[];
}
