import { render, createVNode, type ComponentPublicInstance } from "vue";
import WeatherConstructor from "./weatherBox.vue";

const WeatherInstacne = new Map();

const initInstance = (props: any, container: HTMLElement) => {
  const vnode = createVNode(WeatherConstructor, props);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  return vnode.component;
};

const genContainer = () => {
  return document.createElement("div");
};

const showWeather = (options: any) => {
  const container = genContainer();
  options.onVanish = () => {
    vm.visible = false;
    // 淡出
    setTimeout(() => {
      render(null, container);
    }, 200);
  };

  const instance = initInstance(options, container);

  const vm = instance?.proxy as ComponentPublicInstance<{
    visible: boolean;
  }>;

  // 淡入
  setTimeout(() => {
    vm.visible = true;
  });

  return vm;
};

async function WeatherBox(options: any) {
  const vm = showWeather(options);

  WeatherInstacne.set(vm, {});
}

export default WeatherBox;
