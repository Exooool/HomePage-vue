import type { browserAppConfig } from "@/types/app";

export const config = {
  defaultApps: [
    {
      size: "large",
      title: "日历",
      type: "component",
      component: "calendar",
    },
    {
      size: "large",
      title: "天气",
      type: "component",
      component: "weather",
    },
    {
      size: "large",
      title: "待办事项",
      type: "component",
      component: "todo",
    },
    {
      size: "small",
      title: "哔哩哔哩",
      type: "website",
      url: "https://www.bilibili.com/",
      iconType: "img",
      icon: "bilibili",
    },
    {
      size: "small",
      title: "知乎",
      type: "website",
      url: "https://www.zhihu.com/",
      iconType: "img",
      icon: "zhihu",
    },
    {
      size: "small",
      title: "百度贴吧",
      type: "website",
      url: "https://tieba.baidu.com/",
      iconType: "img",
      icon: "tieba",
    },
    {
      size: "small",
      title: "QQ音乐",
      type: "website",
      url: "https://y.qq.com/",
      iconType: "img",
      icon: "qqmusic",
    },
    {
      size: "small",
      title: "网易云音乐",
      type: "website",
      url: "https://music.163.com/",
      iconType: "img",
      icon: "netease",
    },
    {
      size: "small",
      title: "微博",
      type: "website",
      url: "https://weibo.com/",
      iconType: "img",
      icon: "weibo",
    },
  ],
};

export const browserAppConfigs: browserAppConfig[] = [
  {
    categoryName: "影视",
    list: [
      {
        title: "哔哩哔哩",
        type: "website",
        url: "https://bilibili.com/",
        iconType: "img",
        icon: "bilibili",
      },
      {
        title: "优酷",
        type: "website",
        url: "https://youku.com/",
        iconType: "img",
        icon: "bilibili",
      },
      {
        title: "腾讯",
        type: "website",
        url: "httpsimgv.qq.com/",
        iconType: "img",
        icon: "bilibili",
      },
      {
        title: "芒果tv",
        type: "website",
        url: "https://www.mgtv.com/",
        iconType: "img",
        icon: "bilibili",
      },
      {
        title: "AcFun",
        type: "website",
        url: "https://www.acfun.cn/",
        iconType: "img",
        icon: "bilibili",
      },
      {
        title: "斗鱼",
        type: "website",
        url: "https://www.douyu.com/",
        iconType: "img",
        icon: "bilibili",
      },
    ],
  },
  {
    categoryName: "音乐",
    list: [
      {
        title: "QQ音乐",
        type: "website",
        url: "https://y.qq.com/",
        iconType: "img",
        icon: "qqmusic",
      },
      {
        title: "网易云音乐",
        type: "website",
        url: "https://music.163.com/",
        iconType: "img",
        icon: "netease",
      },
    ],
  },
  {
    categoryName: "新闻",
    list: [
      {
        title: "头条",
        type: "website",
        url: "http://toutiao.com/",
        iconType: "img",
        icon: "netease",
      },
      {
        title: "网易新闻",
        type: "website",
        url: "https://www.163.com/",
        iconType: "img",
        icon: "netease",
      },
    ],
  },
  {
    categoryName: "社交",
    list: [
      {
        title: "知乎",
        type: "website",
        url: "https://www.zhihu.com/",
        iconType: "img",
        icon: "zhihu",
      },
      {
        title: "百度贴吧",
        type: "website",
        url: "https://tieba.baidu.com/",
        iconType: "img",
        icon: "tieba",
      },
      {
        title: "微博",
        type: "website",
        url: "https://weibo.com/",
        iconType: "img",
        icon: "weibo",
      },
    ],
  },
  {
    categoryName: "出行",
    list: [],
  },
  {
    categoryName: "生活",
    list: [],
  },
  {
    categoryName: "游戏",
    list: [],
  },
  {
    categoryName: "教育",
    list: [],
  },
  {
    categoryName: "金融",
    list: [],
  },
  {
    categoryName: "科技",
    list: [],
  },
];
