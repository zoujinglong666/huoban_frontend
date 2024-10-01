<script setup lang="ts">

export type Numberish = number | string;

// todo 以后只支持 vue3 的时候就可以换成vue提供的类型了
export interface SimpleImgHTMLAttributes {
  alt?: string;
  crossorigin?: 'anonymous' | 'use-credentials' | '';
  decoding?: 'async' | 'auto' | 'sync';
  height?: Numberish;
  sizes?: string;
  src?: string;
  srcset?: string;
  usemap?: string;
  width?: Numberish;
  type?: string;
}

// todo 看看这个能不能直接删了
export type ImgOption = {
  src: string;
} & SimpleImgHTMLAttributes;

// TODO: 封装 provider 来应对不同的接口
/** vite-imagetools 风格的 picture 数据格式 */
export type ImageToolsPictureOption = {
  fallback: {
    src: string;
    w?: number;
  } & SimpleImgHTMLAttributes;
  // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]
  sources: {
    [key: string]: {
      src: string;
      w?: number;
    }[];
  };
} |
  /**
   * 现在的数据格式是这样的
   * img: {src: '/@imagetools/19b8f0e7a78', w: 5304, h: 7952}
   * sources: {avif: '/@imagetools/6165531 5304w', webp: '/@imagetools/58dbfda 5304w'}
   */
  {
    img: {
      src: string;
      w?: number;
      h?: number;
    };
    sources: {
      [key: string]: string;
    };
  }

export type PictureOption = ImageToolsPictureOption;

// https://codepedia.info/detect-browser-in-javascript
function getBrowserName() {
  if (typeof navigator === 'undefined') {
    return 'other';
  }
  const agent = navigator.userAgent.toLowerCase();
  switch (
    true // case agent.indexOf("edge") > -1: return "MS Edge";
    ) {
    case agent.includes('chrome'):
      return 'Chrome';
    // case agent.indexOf("trident") > -1: return "MS IE";
    case agent.includes('firefox'):
      return 'Mozilla Firefox';
    case agent.includes('safari'):
      return 'Safari';
    default:
      return 'other';
  }
}


const props = withDefaults(defineProps<{
  src: PictureOption;
  // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变
  placeholder?: 'empty' | 'color';
}>(), {
  placeholder: 'empty',
});




const allSources = computed(() => props.src);



const bgColors = ['#A7D2CB', '#874C62', '#C98474', '#F2D388'];
const lightenColors = ['#dcedea', '#d4b2bf', '#e9cec7', '#faedcf'];

const bgIndex = Math.floor(Math.random() * bgColors.length);
const bgColor = bgColors[bgIndex];
const bgColorLight = lightenColors[bgIndex];
const loaded = ref(false);



const emit = defineEmits<{
  (event: 'load', ev: Event): void;
}>();

function handleLoad(ev: Event) {
  emit('load', ev);
  loaded.value = true;
}
const imgRef = ref<HTMLImageElement|null>();
defineOptions({inheritAttrs: false})
defineExpose(new Proxy({}, {
  get: function (target, key) {
    return imgRef?.value[key];
  },
  has: function (target, key) {
    return key in imgRef?.value;
  }
}))
</script>

<template>
  <picture
    class="image-container"
    :class="{ loaded: loaded, 'placeholder-player': placeholder === 'color' }"
  >
    <img
      ref="imgRef"
      loading="lazy"
      :src="allSources"
      @load="handleLoad"
    />
  </picture>
</template>

<style scoped>
.placeholder-player {
  animation: placeholder ease-in-out 2s infinite;
}

.image-container img {
  width: 100%;
}

@keyframes placeholder {
  0% {
    background-color: v-bind(bgColor);
  }
  50% {
    background-color: v-bind(bgColorLight);
  }
  100% {
    background-color: v-bind(bgColor);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.placeholder-player.loaded {
  animation: none;
}

.placeholder-player.loaded img {
  animation: fadeIn linear 0.5s;
}
</style>
