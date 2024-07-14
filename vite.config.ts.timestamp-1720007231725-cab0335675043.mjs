// vite.config.ts
import { resolve } from "node:path";
import { loadEnv } from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.5_less@4.2.0/node_modules/vite/dist/node/index.js";
import { format } from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/date-fns@3.0.6/node_modules/date-fns/index.mjs";

// build/utils.ts
import dotenv from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/lib/main.js";
function isReportMode() {
  return process.env.REPORT === "true";
}
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

// build/vite/plugin/index.ts
import Components from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/unplugin-vue-components@0.26.0_rollup@4.9.1_vue@3.3.13/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/unplugin-vue-components@0.26.0_rollup@4.9.1_vue@3.3.13/node_modules/unplugin-vue-components/dist/resolvers.js";
import vue from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/@vitejs+plugin-vue@5.0.0_vite@5.0.10_vue@3.3.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.32_rollup@4.9.1_vite@5.0.10/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.7.0_rollup@4.9.1/node_modules/unplugin-auto-import/dist/vite.js";

// build/vite/plugin/html.ts
import { createHtmlPlugin } from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.0.10/node_modules/vite-plugin-html/dist/index.mjs";

// package.json
var package_default = {
  name: "vue3-vant4-mobile",
  type: "module",
  version: "2.1.0",
  private: true,
  packageManager: "pnpm@8.6.10",
  author: {
    name: "xiangshu233",
    email: "xiangshu233@outlook.com",
    url: "https://github.com/xiangshu233"
  },
  license: "MIT",
  repository: {
    type: "git",
    url: "git+https://github.com/xiangshu233/vue3-vant4-mobile.git"
  },
  bugs: {
    url: "https://github.com/xiangshu233/vue3-vant4-mobile/issues"
  },
  scripts: {
    preinstall: "npx only-allow pnpm",
    bootstrap: "pnpm install",
    serve: "npm run dev",
    dev: "cross-env VITE_CJS_IGNORE_WARNING=true vite dev",
    "dev:debugcjs": "cross-env VITE_CJS_TRACE=true vite dev",
    build: "cross-env NODE_ENV=production vite build && esno ./build/script/postBuild.ts",
    "build:no-cache": "pnpm clean:cache && npm run build",
    report: "cross-env REPORT=true npm run build",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "vite preview",
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    "clean:lib": "rimraf node_modules",
    lint: "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:lint-staged": "lint-staged"
  },
  dependencies: {
    "@better-scroll/core": "^2.5.1",
    "@better-scroll/pull-down": "^2.5.1",
    "@better-scroll/pull-up": "^2.5.1",
    "@types/lodash-es": "^4.17.12",
    "@unocss/reset": "^0.58.5",
    "@vueuse/core": "^10.7.0",
    axios: "^1.4.0",
    "crypto-js": "^4.2.0",
    "date-fns": "^3.0.6",
    echarts: "^5.4.3",
    "lodash-es": "^4.17.21",
    mockjs: "^1.1.0",
    nprogress: "^0.2.0",
    pinia: "^2.1.7",
    "pinia-plugin-persist": "^1.0.0",
    qs: "^6.11.2",
    vant: "^4.8.1",
    vue: "^3.3.13",
    "vue-router": "4.2.5"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.6.3",
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@iconify/json": "^2.2.188",
    "@types/fs-extra": "^11.0.4",
    "@types/mockjs": "^1.0.10",
    "@types/node": "^20.10.5",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.11",
    "@unocss/eslint-plugin": "^0.58.4",
    "@unocss/preset-icons": "^0.58.5",
    "@unocss/preset-rem-to-px": "^0.58.5",
    "@unocss/transformer-directives": "^0.58.4",
    "@unocss/transformer-variant-group": "^0.58.4",
    "@vitejs/plugin-vue": "^5.0.0",
    autoprefixer: "^10.4.16",
    "cross-env": "^7.0.3",
    "cz-git": "^1.8.0",
    dotenv: "^16.3.1",
    eslint: "^8.56.0",
    "eslint-plugin-format": "^0.1.0",
    esno: "^0.16.3",
    "fs-extra": "^11.2.0",
    less: "^4.2.0",
    "lint-staged": "^15.2.0",
    "only-allow": "^1.2.1",
    picocolors: "^1.0.0",
    postcss: "^8.4.32",
    "postcss-mobile-forever": "^4.0.0",
    rimraf: "^3.0.2",
    rollup: "^4.9.1",
    "rollup-plugin-visualizer": "^5.11.0",
    "simple-git-hooks": "^2.9.0",
    typescript: "^5.3.3",
    unocss: "^0.58.5",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0",
    vite: "^5.0.10",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-mock": "^2.9.8",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-tsc": "^1.8.27"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged",
    "commit-msg": "npx --no-install commitlint --edit $1"
  },
  "lint-staged": {
    "*": "eslint --fix"
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// build/constant.ts
var GLOB_CONFIG_FILE_NAME = "app.config.js";
var OUTPUT_DIR = "dist/vant-mobile";

// build/vite/plugin/html.ts
function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;
  const path2 = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  const getAppConfigSrc = () => {
    return `${path2 || "/"}${GLOB_CONFIG_FILE_NAME}?v=${package_default.version}-${(/* @__PURE__ */ new Date()).getTime()}`;
  };
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      // 需要注入 index.html ejs 模版的数据 使用在 html 中 ：<div><%= title %></div>
      data: {
        title: VITE_GLOB_APP_TITLE
      },
      // Embed the generated app.config.js file 需要注入的标签列表
      tags: isBuild ? [
        {
          tag: "script",
          attrs: {
            src: getAppConfigSrc()
          }
        }
      ] : []
    }
  });
  return htmlPlugin;
}

// build/vite/plugin/mock.ts
import { viteMockServe } from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@5.0.10/node_modules/vite-plugin-mock/dist/index.js";
function configMockPlugin(isBuild, prodMock) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild && prodMock,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `
  });
}

// build/vite/plugin/compress.ts
import compressPlugin from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.0.10/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// build/vite/plugin/visualizer.ts
import visualizer from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/rollup-plugin-visualizer@5.11.0_rollup@4.9.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    });
  }
  return [];
}

// build/vite/plugin/svgSprite.ts
import path from "node:path";
import { createSvgIconsPlugin } from "file:///Users/zou/WebstormProjects/vue3-vant4-mobile/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.10/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function configSvgIconsPlugin(isBuild) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    // 是否压缩
    svgoOptions: isBuild,
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]"
  });
  return svgIconsPlugin;
}

// build/vite/plugin/index.ts
function createVitePlugins(viteEnv, isBuild, prodMock) {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const vitePlugins = [
    // have to
    vue(),
    // 按需引入VantUi且自动创建组件声明
    Components({
      dts: true,
      resolvers: [VantResolver()],
      types: []
    }),
    // UnoCSS
    UnoCSS(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/
        // .vue
      ],
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core"
      ],
      dts: "types/auto-imports.d.ts"
    })
  ];
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  vitePlugins.push(configVisualizerConfig());
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild, prodMock));
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  if (isBuild) {
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }
  return vitePlugins;
}

// build/vite/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      // 如果您secure="true"只允许来自 HTTPS 的请求，则secure="false"意味着允许来自 HTTP 和 HTTPS 的请求。
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// vite.config.ts
var { dependencies, devDependencies, name, version } = package_default;
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
var __APP_INFO__ = {
  // APP 后台管理信息
  pkg: { dependencies, devDependencies, name, version },
  // 最后编译时间
  lastBuildTime: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss")
};
var vite_config_default = ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT, VITE_PROXY, VITE_GLOB_PROD_MOCK } = viteEnv;
  const prodMock = VITE_GLOB_PROD_MOCK;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    root,
    // 别名
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /\@\//,
          replacement: `${pathResolve("src")}/`
        },
        // #/xxxx => types/xxxx
        {
          find: /\#\//,
          replacement: `${pathResolve("types")}/`
        }
      ],
      dedupe: ["vue"]
    },
    // 定义全局常量替换方式
    define: {
      // 在生产中 启用/禁用 intlify-devtools 和 vue-devtools 支持，默认值 false
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    esbuild: {
      // 使用 esbuild 压缩 剔除 console.log
      drop: VITE_DROP_CONSOLE ? ["debugger", "console"] : []
      // minify: true, // minify: true, 等于 minify: 'esbuild',
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: "es2015",
      minify: "esbuild",
      // 构建后是否生成 source map 文件(用于线上报错代码报错映射对应代码)
      sourcemap: false,
      cssTarget: "chrome80",
      // 指定输出路径（相对于 项目根目录)
      outDir: OUTPUT_DIR,
      // 只有 minify 为 terser 的时候, 本配置项才能起作用
      // terserOptions: {
      //   compress: {
      //     // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
      //     keep_infinity: true,
      //     // 打包是否自动删除 console
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // 启用/禁用 gzip 压缩大小报告
      // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2e3,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js",
          // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          // 资源文件像 字体，图片等
          // 将 node_modules 三方依赖包最小化拆分
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const paths = id.toString().split("node_modules/");
              if (paths[2]) {
                return paths[2].split("/")[0].toString();
              }
              return paths[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          // 注入全局 less 变量
          additionalData: `@import "src/styles/var.less";`
        }
      }
    },
    server: {
      host: true,
      // 服务启动时是否自动打开浏览器
      open: true,
      // 服务端口号
      port: Number(VITE_PORT),
      proxy: createProxy(VITE_PROXY),
      // 预热文件以降低启动期间的初始页面加载时长
      warmup: {
        // 预热的客户端文件：首页、views、 components
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    optimizeDeps: {
      /**
       * 依赖预构建，vite 启动时会将下面 include 里的模块，编译成 esm 格式并缓存到 node_modules/.vite 文件夹，
       * 页面加载到对应模块时如果浏览器有缓存就读取浏览器缓存，如果没有会读取本地缓存并按需加载
       * 尤其当您禁用浏览器缓存时（这种情况只应该发生在调试阶段）必须将对应模块加入到 include 里，
       * 否则会遇到开发环境切换页面卡顿的问题（vite 会认为它是一个新的依赖包会重新加载并强制刷新页面），
       * 因为它既无法使用浏览器缓存，又没有在本地 node_modules/.vite 里缓存
       * 温馨提示：如果你使用的第三方库是全局引入，也就是引入到 src/main.ts 文件里，
       * 就不需要再添加到 include 里了，因为 vite 会自动将它们缓存到 node_modules/.vite
       */
      include: [
        "pinia",
        "lodash-es",
        "axios"
      ],
      // 打包时强制排除的依赖项
      exclude: [
        // https://www.mulingyuer.com/archives/928/
        "vant",
        "@vant/use"
      ]
    },
    // 加载插件
    plugins: createVitePlugins(viteEnv, isBuild, prodMock)
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaHRtbC50cyIsICJwYWNrYWdlLmpzb24iLCAiYnVpbGQvY29uc3RhbnQudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vbW9jay50cyIsICJidWlsZC92aXRlL3BsdWdpbi9jb21wcmVzcy50cyIsICJidWlsZC92aXRlL3BsdWdpbi92aXN1YWxpemVyLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL3N2Z1Nwcml0ZS50cyIsICJidWlsZC92aXRlL3Byb3h5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnXG5pbXBvcnQgeyB3cmFwcGVyRW52IH0gZnJvbSAnLi9idWlsZC91dGlscydcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC92aXRlL3BsdWdpbidcbmltcG9ydCB7IE9VVFBVVF9ESVIgfSBmcm9tICcuL2J1aWxkL2NvbnN0YW50J1xuaW1wb3J0IHsgY3JlYXRlUHJveHkgfSBmcm9tICcuL2J1aWxkL3ZpdGUvcHJveHknXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuXG5jb25zdCB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0gPSBwa2dcblxuLy8gXHU1RjUzXHU0RjdGXHU3NTI4XHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHU4REVGXHU1Rjg0XHU3Njg0XHU1MjJCXHU1NDBEXHU2NUY2XHVGRjBDXHU4QkY3XHU1OUNCXHU3RUM4XHU0RjdGXHU3NTI4XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHUzMDAyXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU3Njg0XHU1MjJCXHU1NDBEXHU1MDNDXHU0RjFBXHU1MzlGXHU1QzAxXHU0RTBEXHU1MkE4XHU1NzMwXHU4OEFCXHU0RjdGXHU3NTI4XHVGRjBDXHU1NkUwXHU2QjY0XHU2NUUwXHU2Q0Q1XHU4OEFCXHU2QjYzXHU1RTM4XHU4OUUzXHU2NzkwXHUzMDAyXG4vLyBwYXRoLnJlc29sdmUgKCkgXHU2NUI5XHU2Q0Q1XHU3NTI4XHU0RThFXHU1QzA2XHU0RTAwXHU3Q0ZCXHU1MjE3XHU4REVGXHU1Rjg0XHU2QkI1XHU4OUUzXHU2NzkwXHU0RTNBXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHUzMDAyXHU1QjgzXHU5MDFBXHU4RkM3XHU1OTA0XHU3NDA2XHU0RUNFXHU1M0YzXHU1MjMwXHU1REU2XHU3Njg0XHU4REVGXHU1Rjg0XHU1RThGXHU1MjE3XHU2NzY1XHU1REU1XHU0RjVDXHVGRjBDXHU1NzI4XHU2QkNGXHU0RTJBXHU4REVGXHU1Rjg0XHU0RTRCXHU1MjREXHU2REZCXHU1MkEwXHVGRjBDXHU3NkY0XHU1MjMwXHU1MjFCXHU1RUZBXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHUzMDAyXG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLicsIGRpcilcbn1cblxuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICAvLyBBUFAgXHU1NDBFXHU1M0YwXHU3QkExXHU3NDA2XHU0RkUxXHU2MDZGXG4gIHBrZzogeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9LFxuICAvLyBcdTY3MDBcdTU0MEVcdTdGMTZcdThCRDFcdTY1RjZcdTk1RjRcbiAgbGFzdEJ1aWxkVGltZTogZm9ybWF0KG5ldyBEYXRlKCksICd5eXl5LU1NLWRkIEhIOm1tOnNzJyksXG59XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ30gKi9cbmV4cG9ydCBkZWZhdWx0ICh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIC8vIHByb2Nlc3MuY3dkKCkgXHU2NUI5XHU2Q0Q1XHU4RkQ0XHU1NkRFIE5vZGUuanMgXHU4RkRCXHU3QTBCXHU3Njg0XHU1RjUzXHU1MjREXHU1REU1XHU0RjVDXHU3NkVFXHU1RjU1XG4gIC8vIG1vZGUgXHU4RkQ0XHU1NkRFXHU1RTk0XHU3NTI4XHU3Njg0XHU3M0FGXHU1ODgzXHU2QTIxXHU1RjBGIGRldmVsb3BtZW50XHVGRjA4XHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHVGRjA5IFx1NjIxNlx1ODAwNSBwcm9kdWN0aW9uXHVGRjA4XHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHVGRjA5XG4gIC8vIGNvbW1hbmQgXHU4RkQ0XHU1NkRFXHVGRjA4ZGV2L3NlcnZlIFx1NjIxNiBidWlsZFx1RkYwOVx1NTQ3RFx1NEVFNFx1NkEyMVx1NUYwRlx1RkYwQ3lhcm4gZGV2IFx1OEZENFx1NTZERSBkZXYvc2VydmUgeWFybiBidWlsZCBcdThGRDRcdTU2REUgYnVpbGRcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcbiAgLy8gbG9hZEVudigpIFx1NjgzOVx1NjM2RSBtb2RlIFx1NjhDMFx1NjdFNSByb290KFx1OTg3OVx1NzZFRVx1NjgzOVx1OERFRlx1NUY4NCkgXHU4REVGXHU1Rjg0XHU0RTBCIC5lbnZcdTMwMDEuZW52LmRldmVsb3BtZW50IFx1NzNBRlx1NTg4M1x1NjU4N1x1NEVGNlx1RkYwQ1x1OEY5M1x1NTFGQSBOT0RFX0VOViBcdTU0OEMgVklURV8gXHU1RjAwXHU1OTM0XHU3Njg0XHU5NTJFXHU1MDNDXHU5NjFGXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdClcbiAgLy8gXHU4QkZCXHU1M0Q2XHU1RTc2XHU1OTA0XHU3NDA2XHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2IC5lbnZcbiAgY29uc3Qgdml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KVxuXG4gIGNvbnN0IHsgVklURV9QVUJMSUNfUEFUSCwgVklURV9EUk9QX0NPTlNPTEUsIFZJVEVfUE9SVCwgVklURV9QUk9YWSwgVklURV9HTE9CX1BST0RfTU9DSyB9XG4gICAgPSB2aXRlRW52XG5cbiAgY29uc3QgcHJvZE1vY2sgPSBWSVRFX0dMT0JfUFJPRF9NT0NLXG5cbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcbiAgLy8gY29tbWFuZCA9PT0gJ2J1aWxkJ1xuICByZXR1cm4ge1xuICAgIGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXG4gICAgcm9vdCxcblxuICAgIC8vIFx1NTIyQlx1NTQwRFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIC8vIEAveHh4eCA9PiBzcmMveHh4eFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL1xcQFxcLy8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3BhdGhSZXNvbHZlKCdzcmMnKX0vYCxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gIy94eHh4ID0+IHR5cGVzL3h4eHhcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9cXCNcXC8vLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwYXRoUmVzb2x2ZSgndHlwZXMnKX0vYCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkZWR1cGU6IFsndnVlJ10sXG4gICAgfSxcblxuICAgIC8vIFx1NUI5QVx1NEU0OVx1NTE2OFx1NUM0MFx1NUUzOFx1OTFDRlx1NjZGRlx1NjM2Mlx1NjVCOVx1NUYwRlxuICAgIGRlZmluZToge1xuICAgICAgLy8gXHU1NzI4XHU3NTFGXHU0RUE3XHU0RTJEIFx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjggaW50bGlmeS1kZXZ0b29scyBcdTU0OEMgdnVlLWRldnRvb2xzIFx1NjUyRlx1NjMwMVx1RkYwQ1x1OUVEOFx1OEJBNFx1NTAzQyBmYWxzZVxuICAgICAgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXzogZmFsc2UsXG4gICAgICBfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXyksXG4gICAgfSxcblxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIC8vIFx1NEY3Rlx1NzUyOCBlc2J1aWxkIFx1NTM4Qlx1N0YyOSBcdTUyNTRcdTk2NjQgY29uc29sZS5sb2dcbiAgICAgIGRyb3A6IFZJVEVfRFJPUF9DT05TT0xFID8gWydkZWJ1Z2dlcicsICdjb25zb2xlJ10gOiBbXSxcbiAgICAgIC8vIG1pbmlmeTogdHJ1ZSwgLy8gbWluaWZ5OiB0cnVlLCBcdTdCNDlcdTRFOEUgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgfSxcblxuICAgIGJ1aWxkOiB7XG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTY3MDBcdTdFQzhcdTY3ODRcdTVFRkFcdTc2ODRcdTZENEZcdTg5QzhcdTU2NjhcdTUxN0NcdTVCQjlcdTc2RUVcdTY4MDdcbiAgICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICAgIC8vIFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMCBzb3VyY2UgbWFwIFx1NjU4N1x1NEVGNihcdTc1MjhcdTRFOEVcdTdFQkZcdTRFMEFcdTYyQTVcdTk1MTlcdTRFRTNcdTc4MDFcdTYyQTVcdTk1MTlcdTY2MjBcdTVDMDRcdTVCRjlcdTVFOTRcdTRFRTNcdTc4MDEpXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgY3NzVGFyZ2V0OiAnY2hyb21lODAnLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RThFIFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NSlcbiAgICAgIG91dERpcjogT1VUUFVUX0RJUixcbiAgICAgIC8vIFx1NTNFQVx1NjcwOSBtaW5pZnkgXHU0RTNBIHRlcnNlciBcdTc2ODRcdTY1RjZcdTUwMTksIFx1NjcyQ1x1OTE0RFx1N0Y2RVx1OTg3OVx1NjI0RFx1ODBGRFx1OEQ3N1x1NEY1Q1x1NzUyOFxuICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xuICAgICAgLy8gICBjb21wcmVzczoge1xuICAgICAgLy8gICAgIC8vIFx1OTYzMlx1NkI2MiBJbmZpbml0eSBcdTg4QUJcdTUzOEJcdTdGMjlcdTYyMTAgMS8wXHVGRjBDXHU4RkQ5XHU1M0VGXHU4MEZEXHU0RjFBXHU1QkZDXHU4MUY0IENocm9tZSBcdTRFMEFcdTc2ODRcdTYwMjdcdTgwRkRcdTk1RUVcdTk4OThcbiAgICAgIC8vICAgICBrZWVwX2luZmluaXR5OiB0cnVlLFxuICAgICAgLy8gICAgIC8vIFx1NjI1M1x1NTMwNVx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NTIyMFx1OTY2NCBjb25zb2xlXG4gICAgICAvLyAgICAgZHJvcF9jb25zb2xlOiBWSVRFX0RST1BfQ09OU09MRSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyBcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXG4gICAgICAvLyBcdTUzOEJcdTdGMjlcdTU5MjdcdTU3OEJcdThGOTNcdTUxRkFcdTY1ODdcdTRFRjZcdTUzRUZcdTgwRkRcdTRGMUFcdTVGODhcdTYxNjJcdUZGMENcdTU2RTBcdTZCNjRcdTc5ODFcdTc1MjhcdThCRTVcdTUyOUZcdTgwRkRcdTUzRUZcdTgwRkRcdTRGMUFcdTYzRDBcdTlBRDhcdTU5MjdcdTU3OEJcdTk4NzlcdTc2RUVcdTc2ODRcdTY3ODRcdTVFRkFcdTYwMjdcdTgwRkRcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgICAgLy8gY2h1bmsgXHU1OTI3XHU1QzBGXHU4QjY2XHU1NDRBXHU3Njg0XHU5NjUwXHU1MjM2XHVGRjA4XHU0RUU1IGticyBcdTRFM0FcdTUzNTVcdTRGNERcdUZGMDlcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcbiAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NUU5NVx1NUM0Mlx1NzY4NCBSb2xsdXAgXHU2MjUzXHU1MzA1XHU5MTREXHU3RjZFXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIC8vIFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTIwNlx1N0M3Qlx1NjI1M1x1NTMwNVxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTVGMTVcdTUxNjVcdTY1ODdcdTRFRjZcdTU0MERcdTc2ODRcdTU0MERcdTc5RjBcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTUzMDVcdTc2ODRcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTU0MERcdTc5RjBcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nLCAvLyBcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdTUwQ0YgXHU1QjU3XHU0RjUzXHVGRjBDXHU1NkZFXHU3MjQ3XHU3QjQ5XG4gICAgICAgICAgLy8gXHU1QzA2IG5vZGVfbW9kdWxlcyBcdTRFMDlcdTY1QjlcdTRGOURcdThENTZcdTUzMDVcdTY3MDBcdTVDMEZcdTUzMTZcdTYyQzZcdTUyMDZcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGF0aHMgPSBpZC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylcbiAgICAgICAgICAgICAgaWYgKHBhdGhzWzJdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhzWzJdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHBhdGhzWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIG1vZGlmeVZhcnM6IHt9LFxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIC8vIFx1NkNFOFx1NTE2NVx1NTE2OFx1NUM0MCBsZXNzIFx1NTNEOFx1OTFDRlxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcInNyYy9zdHlsZXMvdmFyLmxlc3NcIjtgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgLy8gXHU2NzBEXHU1MkExXHU1NDJGXHU1MkE4XHU2NUY2XHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgLy8gXHU2NzBEXHU1MkExXHU3QUVGXHU1M0UzXHU1M0Y3XG4gICAgICBwb3J0OiBOdW1iZXIoVklURV9QT1JUKSxcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKSxcbiAgICAgIC8vIFx1OTg4NFx1NzBFRFx1NjU4N1x1NEVGNlx1NEVFNVx1OTY0RFx1NEY0RVx1NTQyRlx1NTJBOFx1NjcxRlx1OTVGNFx1NzY4NFx1NTIxRFx1NTlDQlx1OTg3NVx1OTc2Mlx1NTJBMFx1OEY3RFx1NjVGNlx1OTU3RlxuICAgICAgd2FybXVwOiB7XG4gICAgICAgIC8vIFx1OTg4NFx1NzBFRFx1NzY4NFx1NUJBMlx1NjIzN1x1N0FFRlx1NjU4N1x1NEVGNlx1RkYxQVx1OTk5Nlx1OTg3NVx1MzAwMXZpZXdzXHUzMDAxIGNvbXBvbmVudHNcbiAgICAgICAgY2xpZW50RmlsZXM6IFsnLi9pbmRleC5odG1sJywgJy4vc3JjL3t2aWV3cyxjb21wb25lbnRzfS8qJ10sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIC8qKlxuICAgICAgICogXHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXHVGRjBDdml0ZSBcdTU0MkZcdTUyQThcdTY1RjZcdTRGMUFcdTVDMDZcdTRFMEJcdTk3NjIgaW5jbHVkZSBcdTkxQ0NcdTc2ODRcdTZBMjFcdTU3NTdcdUZGMENcdTdGMTZcdThCRDFcdTYyMTAgZXNtIFx1NjgzQ1x1NUYwRlx1NUU3Nlx1N0YxM1x1NUI1OFx1NTIzMCBub2RlX21vZHVsZXMvLnZpdGUgXHU2NTg3XHU0RUY2XHU1OTM5XHVGRjBDXG4gICAgICAgKiBcdTk4NzVcdTk3NjJcdTUyQTBcdThGN0RcdTUyMzBcdTVCRjlcdTVFOTRcdTZBMjFcdTU3NTdcdTY1RjZcdTU5ODJcdTY3OUNcdTZENEZcdTg5QzhcdTU2NjhcdTY3MDlcdTdGMTNcdTVCNThcdTVDMzFcdThCRkJcdTUzRDZcdTZENEZcdTg5QzhcdTU2NjhcdTdGMTNcdTVCNThcdUZGMENcdTU5ODJcdTY3OUNcdTZDQTFcdTY3MDlcdTRGMUFcdThCRkJcdTUzRDZcdTY3MkNcdTU3MzBcdTdGMTNcdTVCNThcdTVFNzZcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcbiAgICAgICAqIFx1NUMyNFx1NTE3Nlx1NUY1M1x1NjBBOFx1Nzk4MVx1NzUyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0YxM1x1NUI1OFx1NjVGNlx1RkYwOFx1OEZEOVx1NzlDRFx1NjBDNVx1NTFCNVx1NTNFQVx1NUU5NFx1OEJFNVx1NTNEMVx1NzUxRlx1NTcyOFx1OEMwM1x1OEJENVx1OTYzNlx1NkJCNVx1RkYwOVx1NUZDNVx1OTg3Qlx1NUMwNlx1NUJGOVx1NUU5NFx1NkEyMVx1NTc1N1x1NTJBMFx1NTE2NVx1NTIzMCBpbmNsdWRlIFx1OTFDQ1x1RkYwQ1xuICAgICAgICogXHU1NDI2XHU1MjE5XHU0RjFBXHU5MDQ3XHU1MjMwXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU1MjA3XHU2MzYyXHU5ODc1XHU5NzYyXHU1MzYxXHU5ODdGXHU3Njg0XHU5NUVFXHU5ODk4XHVGRjA4dml0ZSBcdTRGMUFcdThCQTRcdTRFM0FcdTVCODNcdTY2MkZcdTRFMDBcdTRFMkFcdTY1QjBcdTc2ODRcdTRGOURcdThENTZcdTUzMDVcdTRGMUFcdTkxQ0RcdTY1QjBcdTUyQTBcdThGN0RcdTVFNzZcdTVGM0FcdTUyMzZcdTUyMzdcdTY1QjBcdTk4NzVcdTk3NjJcdUZGMDlcdUZGMENcbiAgICAgICAqIFx1NTZFMFx1NEUzQVx1NUI4M1x1NjVFMlx1NjVFMFx1NkNENVx1NEY3Rlx1NzUyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0YxM1x1NUI1OFx1RkYwQ1x1NTNDOFx1NkNBMVx1NjcwOVx1NTcyOFx1NjcyQ1x1NTczMCBub2RlX21vZHVsZXMvLnZpdGUgXHU5MUNDXHU3RjEzXHU1QjU4XG4gICAgICAgKiBcdTZFMjlcdTk5QThcdTYzRDBcdTc5M0FcdUZGMUFcdTU5ODJcdTY3OUNcdTRGNjBcdTRGN0ZcdTc1MjhcdTc2ODRcdTdCMkNcdTRFMDlcdTY1QjlcdTVFOTNcdTY2MkZcdTUxNjhcdTVDNDBcdTVGMTVcdTUxNjVcdUZGMENcdTRFNUZcdTVDMzFcdTY2MkZcdTVGMTVcdTUxNjVcdTUyMzAgc3JjL21haW4udHMgXHU2NTg3XHU0RUY2XHU5MUNDXHVGRjBDXG4gICAgICAgKiBcdTVDMzFcdTRFMERcdTk3MDBcdTg5ODFcdTUxOERcdTZERkJcdTUyQTBcdTUyMzAgaW5jbHVkZSBcdTkxQ0NcdTRFODZcdUZGMENcdTU2RTBcdTRFM0Egdml0ZSBcdTRGMUFcdTgxRUFcdTUyQThcdTVDMDZcdTVCODNcdTRFRUNcdTdGMTNcdTVCNThcdTUyMzAgbm9kZV9tb2R1bGVzLy52aXRlXG4gICAgICAgKi9cbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ2xvZGFzaC1lcycsXG4gICAgICAgICdheGlvcycsXG4gICAgICBdLFxuICAgICAgLy8gXHU2MjUzXHU1MzA1XHU2NUY2XHU1RjNBXHU1MjM2XHU2MzkyXHU5NjY0XHU3Njg0XHU0RjlEXHU4RDU2XHU5ODc5XG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3Lm11bGluZ3l1ZXIuY29tL2FyY2hpdmVzLzkyOC9cbiAgICAgICAgJ3ZhbnQnLFxuICAgICAgICAnQHZhbnQvdXNlJyxcbiAgICAgIF0sXG4gICAgfSxcblxuICAgIC8vIFx1NTJBMFx1OEY3RFx1NjNEMlx1NEVGNlxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQsIHByb2RNb2NrKSxcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC91dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdXRpbHMudHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52J1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdkZXZlbG9wbWVudCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXG59XG5cbi8qKlxuICogV2hldGhlciB0byBnZW5lcmF0ZSBwYWNrYWdlIHByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVwb3J0TW9kZSgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52LlJFUE9SVCA9PT0gJ3RydWUnXG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbi8vIFx1OEJGQlx1NTNENlx1NUU3Nlx1NTkwNFx1NzQwNlx1NjI0MFx1NjcwOVx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNiAuZW52XG5leHBvcnQgZnVuY3Rpb24gd3JhcHBlckVudihlbnZDb25mOiBSZWNvcmRhYmxlKTogVml0ZUVudiB7XG4gIGNvbnN0IHJldDogYW55ID0ge31cblxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcbiAgICAvLyBcdTUzQkJcdTk2NjRcdTdBN0FcdTY4M0NcbiAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKVxuICAgIHJlYWxOYW1lID0gcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWVcblxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QT1JUJykge1xuICAgICAgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXG4gICAgfVxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSlcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnJvcikge31cbiAgICB9XG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWVcbiAgICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IHJlYWxOYW1lXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIEdldCB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIHN0YXJ0aW5nIHdpdGggdGhlIHNwZWNpZmllZCBwcmVmaXhcbiAqIEBwYXJhbSBtYXRjaCBwcmVmaXhcbiAqIEBwYXJhbSBjb25mRmlsZXMgZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZDb25maWcobWF0Y2ggPSAnVklURV9HTE9CXycsIGNvbmZGaWxlcyA9IFsnLmVudicsICcuZW52LnByb2R1Y3Rpb24nXSkge1xuICBsZXQgZW52Q29uZmlnID0ge31cbiAgY29uZkZpbGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZW52ID0gZG90ZW52LnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgaXRlbSkpKVxuICAgICAgZW52Q29uZmlnID0geyAuLi5lbnZDb25maWcsIC4uLmVudiB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge31cbiAgfSlcblxuICBPYmplY3Qua2V5cyhlbnZDb25maWcpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYF4oJHttYXRjaH0pYClcbiAgICBpZiAoIXJlZy50ZXN0KGtleSkpIHtcbiAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoZW52Q29uZmlnLCBrZXkpXG4gICAgfVxuICB9KVxuICByZXR1cm4gZW52Q29uZmlnXG59XG5cbi8qKlxuICogR2V0IHVzZXIgcm9vdCBkaXJlY3RvcnlcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290UGF0aCguLi5kaXI6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdml0ZS9wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC92aXRlL3BsdWdpbi9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCB7IGNvbmZpZ0h0bWxQbHVnaW4gfSBmcm9tICcuL2h0bWwnXG5pbXBvcnQgeyBjb25maWdNb2NrUGx1Z2luIH0gZnJvbSAnLi9tb2NrJ1xuaW1wb3J0IHsgY29uZmlnQ29tcHJlc3NQbHVnaW4gfSBmcm9tICcuL2NvbXByZXNzJ1xuaW1wb3J0IHsgY29uZmlnVmlzdWFsaXplckNvbmZpZyB9IGZyb20gJy4vdmlzdWFsaXplcidcbmltcG9ydCB7IGNvbmZpZ1N2Z0ljb25zUGx1Z2luIH0gZnJvbSAnLi9zdmdTcHJpdGUnXG5cbi8qKlxuICogXHU5MTREXHU3RjZFIHZpdGUgXHU2M0QyXHU0RUY2XG4gKiBAcGFyYW0gdml0ZUVudiB2aXRlIFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1OTUyRVx1NTAzQ1x1OTYxRiBvYmplY3RcbiAqIEBwYXJhbSBpc0J1aWxkIFx1NjYyRlx1NTQyNlx1NjYyRiBidWlsZCBcdTczQUZcdTU4ODMgdHJ1ZS9mYWxzZVxuICogQHJldHVybnMgdml0ZVBsdWdpbnNbXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudjogVml0ZUVudiwgaXNCdWlsZDogYm9vbGVhbiwgcHJvZE1vY2s6IGJvb2xlYW4pIHtcbiAgLy8gVklURV9CVUlMRF9DT01QUkVTUyBcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjggZ3ppcCBcdTUzOEJcdTdGMjlcdTYyMTYgYnJvdGxpIFx1NTM4Qlx1N0YyOVxuICAvLyBcdTUzRUZcdTkwMDk6IGd6aXAgfCBicm90bGkgfCBub25lXHVGRjBDXG4gIC8vIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1OTcwMFx1ODk4MVx1NTkxQVx1NzlDRFx1NUY2Mlx1NUYwRlx1RkYwQ1x1NEY2MFx1NTNFRlx1NEVFNVx1NzUyOCcsJ1x1Njc2NVx1NTIwNlx1OTY5NFxuXG4gIC8vIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIFx1NjI1M1x1NTMwNVx1NEY3Rlx1NzUyOFx1NTM4Qlx1N0YyOVx1NjVGNlx1NjYyRlx1NTQyNlx1NTIyMFx1OTY2NFx1NTM5Rlx1NTlDQlx1NjU4N1x1NEVGNlx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQSBmYWxzZVxuICBjb25zdCB7IFZJVEVfVVNFX01PQ0ssIFZJVEVfQlVJTERfQ09NUFJFU1MsIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIH0gPSB2aXRlRW52XG5cbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcbiAgICAvLyBoYXZlIHRvXG4gICAgdnVlKCksXG4gICAgLy8gXHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1VmFudFVpXHU0RTE0XHU4MUVBXHU1MkE4XHU1MjFCXHU1RUZBXHU3RUM0XHU0RUY2XHU1OEYwXHU2NjBFXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0sXG4gICAgICB0eXBlczogW10sXG4gICAgfSksXG4gICAgLy8gVW5vQ1NTXG4gICAgVW5vQ1NTKCksXG5cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIC8vIHRhcmdldHMgdG8gdHJhbnNmb3JtXG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgIF0sXG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgIC8vIHByZXNldHNcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgIH0pLFxuICBdXG5cbiAgLy8gXHU1MkEwXHU4RjdEIGh0bWwgXHU2M0QyXHU0RUY2IHZpdGUtcGx1Z2luLWh0bWxcbiAgdml0ZVBsdWdpbnMucHVzaChjb25maWdIdG1sUGx1Z2luKHZpdGVFbnYsIGlzQnVpbGQpKVxuXG4gIC8vIHJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ1Zpc3VhbGl6ZXJDb25maWcoKSlcblxuICAvLyB2aXRlLXBsdWdpbi1tb2NrXG4gIFZJVEVfVVNFX01PQ0sgJiYgdml0ZVBsdWdpbnMucHVzaChjb25maWdNb2NrUGx1Z2luKGlzQnVpbGQsIHByb2RNb2NrKSlcblxuICAvLyB2aXRlLXBsdWdpbi1zdmctaWNvbnNcbiAgdml0ZVBsdWdpbnMucHVzaChjb25maWdTdmdJY29uc1BsdWdpbihpc0J1aWxkKSlcblxuICBpZiAoaXNCdWlsZCkge1xuICAgIC8vIHJvbGx1cC1wbHVnaW4tZ3ppcFxuICAgIC8vIFx1NTJBMFx1OEY3RCBnemlwIFx1NjI1M1x1NTMwNVxuICAgIHZpdGVQbHVnaW5zLnB1c2goXG4gICAgICBjb25maWdDb21wcmVzc1BsdWdpbihWSVRFX0JVSUxEX0NPTVBSRVNTLCBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRSksXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHZpdGVQbHVnaW5zXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC92aXRlL3BsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luL2h0bWwudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luL2h0bWwudHNcIjsvKipcbiAqIFBsdWdpbiB0byBtaW5pbWl6ZSBhbmQgdXNlIGVqcyB0ZW1wbGF0ZSBzeW50YXggaW4gaW5kZXguaHRtbC5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4taHRtbFxuICovXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCBwa2cgZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJ1xuaW1wb3J0IHsgR0xPQl9DT05GSUdfRklMRV9OQU1FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQnXG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdIdG1sUGx1Z2luKGVudjogVml0ZUVudiwgaXNCdWlsZDogYm9vbGVhbikge1xuICBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUsIFZJVEVfUFVCTElDX1BBVEggfSA9IGVudlxuXG4gIGNvbnN0IHBhdGggPSBWSVRFX1BVQkxJQ19QQVRILmVuZHNXaXRoKCcvJykgPyBWSVRFX1BVQkxJQ19QQVRIIDogYCR7VklURV9QVUJMSUNfUEFUSH0vYFxuXG4gIGNvbnN0IGdldEFwcENvbmZpZ1NyYyA9ICgpID0+IHtcbiAgICByZXR1cm4gYCR7cGF0aCB8fCAnLyd9JHtHTE9CX0NPTkZJR19GSUxFX05BTUV9P3Y9JHtwa2cudmVyc2lvbn0tJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gXG4gIH1cblxuICAvLyBcdTVGNTNcdTYyNjdcdTg4NEMgeWFybiBidWlsZCBcdTY3ODRcdTVFRkFcdTk4NzlcdTc2RUVcdTRFNEJcdTU0MEVcdUZGMENcdTRGMUFcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgX2FwcC5jb25maWcuanMgXHU2NTg3XHU0RUY2XHU1RTc2XHU2M0QyXHU1MTY1IGluZGV4Lmh0bWxcbiAgLy8gX2FwcC5jb25maWcuanMgXHU3NTI4XHU0RThFXHU5ODc5XHU3NkVFXHU1NzI4XHU2MjUzXHU1MzA1XHU1NDBFXHVGRjBDXHU5NzAwXHU4OTgxXHU1MkE4XHU2MDAxXHU0RkVFXHU2NTM5XHU5MTREXHU3RjZFXHU3Njg0XHU5NzAwXHU2QzQyXHVGRjBDXHU1OTgyXHU2M0E1XHU1M0UzXHU1NzMwXHU1NzQwXG4gIC8vIFx1NEUwRFx1NzUyOFx1OTFDRFx1NjVCMFx1OEZEQlx1ODg0Q1x1NjI1M1x1NTMwNVx1RkYwQ1x1NTNFRlx1NTcyOFx1NjI1M1x1NTMwNVx1NTQwRVx1NEZFRVx1NjUzOSAvZGlzdC9fYXBwLmNvbmZpZy5qcyBcdTUxODVcdTc2ODRcdTUzRDhcdTkxQ0ZcdUZGMENcdTUyMzdcdTY1QjBcdTUzNzNcdTUzRUZcdTY2RjRcdTY1QjBcdTRFRTNcdTc4MDFcdTUxODVcdTc2ODRcdTVDNDBcdTkwRThcdTUzRDhcdTkxQ0ZcblxuICBjb25zdCBodG1sUGx1Z2luOiBQbHVnaW5PcHRpb25bXSA9IGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgIG1pbmlmeTogaXNCdWlsZCxcbiAgICBpbmplY3Q6IHtcbiAgICAgIC8vIEluamVjdCBkYXRhIGludG8gZWpzIHRlbXBsYXRlXG4gICAgICAvLyBcdTk3MDBcdTg5ODFcdTZDRThcdTUxNjUgaW5kZXguaHRtbCBlanMgXHU2QTIxXHU3MjQ4XHU3Njg0XHU2NTcwXHU2MzZFIFx1NEY3Rlx1NzUyOFx1NTcyOCBodG1sIFx1NEUyRCBcdUZGMUE8ZGl2PjwlPSB0aXRsZSAlPjwvZGl2PlxuICAgICAgZGF0YToge1xuICAgICAgICB0aXRsZTogVklURV9HTE9CX0FQUF9USVRMRSxcbiAgICAgIH0sXG5cbiAgICAgIC8vIEVtYmVkIHRoZSBnZW5lcmF0ZWQgYXBwLmNvbmZpZy5qcyBmaWxlIFx1OTcwMFx1ODk4MVx1NkNFOFx1NTE2NVx1NzY4NFx1NjgwN1x1N0I3RVx1NTIxN1x1ODg2OFxuICAgICAgdGFnczogaXNCdWlsZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFnOiAnc2NyaXB0JyxcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBzcmM6IGdldEFwcENvbmZpZ1NyYygpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdXG4gICAgICAgIDogW10sXG4gICAgfSxcbiAgfSlcbiAgcmV0dXJuIGh0bWxQbHVnaW5cbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcInZ1ZTMtdmFudDQtbW9iaWxlXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInZlcnNpb25cIjogXCIyLjEuMFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJwYWNrYWdlTWFuYWdlclwiOiBcInBucG1AOC42LjEwXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJ4aWFuZ3NodTIzM1wiLFxuICAgIFwiZW1haWxcIjogXCJ4aWFuZ3NodTIzM0BvdXRsb29rLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3hpYW5nc2h1MjMzXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL3hpYW5nc2h1MjMzL3Z1ZTMtdmFudDQtbW9iaWxlLmdpdFwiXG4gIH0sXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20veGlhbmdzaHUyMzMvdnVlMy12YW50NC1tb2JpbGUvaXNzdWVzXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXG4gICAgXCJib290c3RyYXBcIjogXCJwbnBtIGluc3RhbGxcIixcbiAgICBcInNlcnZlXCI6IFwibnBtIHJ1biBkZXZcIixcbiAgICBcImRldlwiOiBcImNyb3NzLWVudiBWSVRFX0NKU19JR05PUkVfV0FSTklORz10cnVlIHZpdGUgZGV2XCIsXG4gICAgXCJkZXY6ZGVidWdjanNcIjogXCJjcm9zcy1lbnYgVklURV9DSlNfVFJBQ0U9dHJ1ZSB2aXRlIGRldlwiLFxuICAgIFwiYnVpbGRcIjogXCJjcm9zcy1lbnYgTk9ERV9FTlY9cHJvZHVjdGlvbiB2aXRlIGJ1aWxkICYmIGVzbm8gLi9idWlsZC9zY3JpcHQvcG9zdEJ1aWxkLnRzXCIsXG4gICAgXCJidWlsZDpuby1jYWNoZVwiOiBcInBucG0gY2xlYW46Y2FjaGUgJiYgbnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVwb3J0XCI6IFwiY3Jvc3MtZW52IFJFUE9SVD10cnVlIG5wbSBydW4gYnVpbGRcIixcbiAgICBcInR5cGU6Y2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0IC0tc2tpcExpYkNoZWNrXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJjbGVhbjpjYWNoZVwiOiBcInJpbXJhZiBub2RlX21vZHVsZXMvLmNhY2hlLyAmJiByaW1yYWYgbm9kZV9tb2R1bGVzLy52aXRlXCIsXG4gICAgXCJjbGVhbjpsaWJcIjogXCJyaW1yYWYgbm9kZV9tb2R1bGVzXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC5cIixcbiAgICBcImxpbnQ6Zml4XCI6IFwiZXNsaW50IC4gLS1maXhcIixcbiAgICBcImxpbnQ6bGludC1zdGFnZWRcIjogXCJsaW50LXN0YWdlZFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBiZXR0ZXItc2Nyb2xsL2NvcmVcIjogXCJeMi41LjFcIixcbiAgICBcIkBiZXR0ZXItc2Nyb2xsL3B1bGwtZG93blwiOiBcIl4yLjUuMVwiLFxuICAgIFwiQGJldHRlci1zY3JvbGwvcHVsbC11cFwiOiBcIl4yLjUuMVwiLFxuICAgIFwiQHR5cGVzL2xvZGFzaC1lc1wiOiBcIl40LjE3LjEyXCIsXG4gICAgXCJAdW5vY3NzL3Jlc2V0XCI6IFwiXjAuNTguNVwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjcuMFwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS40LjBcIixcbiAgICBcImNyeXB0by1qc1wiOiBcIl40LjIuMFwiLFxuICAgIFwiZGF0ZS1mbnNcIjogXCJeMy4wLjZcIixcbiAgICBcImVjaGFydHNcIjogXCJeNS40LjNcIixcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJtb2NranNcIjogXCJeMS4xLjBcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0XCI6IFwiXjEuMC4wXCIsXG4gICAgXCJxc1wiOiBcIl42LjExLjJcIixcbiAgICBcInZhbnRcIjogXCJeNC44LjFcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjMuMTNcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCI0LjIuNVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiXjIuNi4zXCIsXG4gICAgXCJAY29tbWl0bGludC9jbGlcIjogXCJeMTguNC4zXCIsXG4gICAgXCJAY29tbWl0bGludC9jb25maWctY29udmVudGlvbmFsXCI6IFwiXjE4LjQuM1wiLFxuICAgIFwiQGljb25pZnkvanNvblwiOiBcIl4yLjIuMTg4XCIsXG4gICAgXCJAdHlwZXMvZnMtZXh0cmFcIjogXCJeMTEuMC40XCIsXG4gICAgXCJAdHlwZXMvbW9ja2pzXCI6IFwiXjEuMC4xMFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTAuNVwiLFxuICAgIFwiQHR5cGVzL25wcm9ncmVzc1wiOiBcIl4wLjIuM1wiLFxuICAgIFwiQHR5cGVzL3FzXCI6IFwiXjYuOS4xMVwiLFxuICAgIFwiQHVub2Nzcy9lc2xpbnQtcGx1Z2luXCI6IFwiXjAuNTguNFwiLFxuICAgIFwiQHVub2Nzcy9wcmVzZXQtaWNvbnNcIjogXCJeMC41OC41XCIsXG4gICAgXCJAdW5vY3NzL3ByZXNldC1yZW0tdG8tcHhcIjogXCJeMC41OC41XCIsXG4gICAgXCJAdW5vY3NzL3RyYW5zZm9ybWVyLWRpcmVjdGl2ZXNcIjogXCJeMC41OC40XCIsXG4gICAgXCJAdW5vY3NzL3RyYW5zZm9ybWVyLXZhcmlhbnQtZ3JvdXBcIjogXCJeMC41OC40XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE2XCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJeNy4wLjNcIixcbiAgICBcImN6LWdpdFwiOiBcIl4xLjguMFwiLFxuICAgIFwiZG90ZW52XCI6IFwiXjE2LjMuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1mb3JtYXRcIjogXCJeMC4xLjBcIixcbiAgICBcImVzbm9cIjogXCJeMC4xNi4zXCIsXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4yLjBcIixcbiAgICBcImxlc3NcIjogXCJeNC4yLjBcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMFwiLFxuICAgIFwib25seS1hbGxvd1wiOiBcIl4xLjIuMVwiLFxuICAgIFwicGljb2NvbG9yc1wiOiBcIl4xLjAuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzJcIixcbiAgICBcInBvc3Rjc3MtbW9iaWxlLWZvcmV2ZXJcIjogXCJeNC4wLjBcIixcbiAgICBcInJpbXJhZlwiOiBcIl4zLjAuMlwiLFxuICAgIFwicm9sbHVwXCI6IFwiXjQuOS4xXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMS4wXCIsXG4gICAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IFwiXjIuOS4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC41OC41XCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE3LjVcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjYuMFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjAuMTBcIixcbiAgICBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1tb2NrXCI6IFwiXjIuOS44XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjI3XCJcbiAgfSxcbiAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IHtcbiAgICBcInByZS1jb21taXRcIjogXCJwbnBtIGxpbnQtc3RhZ2VkXCIsXG4gICAgXCJjb21taXQtbXNnXCI6IFwibnB4IC0tbm8taW5zdGFsbCBjb21taXRsaW50IC0tZWRpdCAkMVwiXG4gIH0sXG4gIFwibGludC1zdGFnZWRcIjoge1xuICAgIFwiKlwiOiBcImVzbGludCAtLWZpeFwiXG4gIH0sXG4gIFwiY29uZmlnXCI6IHtcbiAgICBcImNvbW1pdGl6ZW5cIjoge1xuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL2NvbnN0YW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC9jb25zdGFudC50c1wiOy8qKlxuICogVGhlIG5hbWUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gZmlsZSBlbnRlcmVkIGluIHRoZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gKi9cbmV4cG9ydCBjb25zdCBHTE9CX0NPTkZJR19GSUxFX05BTUUgPSAnYXBwLmNvbmZpZy5qcydcblxuZXhwb3J0IGNvbnN0IE9VVFBVVF9ESVIgPSAnZGlzdC92YW50LW1vYmlsZSdcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdml0ZS9wbHVnaW4vbW9jay50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdml0ZS9wbHVnaW4vbW9jay50c1wiOy8qKlxuICogTW9jayBwbHVnaW4gZm9yIGRldmVsb3BtZW50IGFuZCBwcm9kdWN0aW9uLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FubmN3Yi92aXRlLXBsdWdpbi1tb2NrXG4gKi9cbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnTW9ja1BsdWdpbihpc0J1aWxkOiBib29sZWFuLCBwcm9kTW9jazogYm9vbGVhbikge1xuICByZXR1cm4gdml0ZU1vY2tTZXJ2ZSh7XG4gICAgaWdub3JlOiAvXlxcXy8sXG4gICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICBsb2NhbEVuYWJsZWQ6ICFpc0J1aWxkLFxuICAgIHByb2RFbmFibGVkOiBpc0J1aWxkICYmIHByb2RNb2NrLFxuICAgIGluamVjdENvZGU6IGBcbiAgICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9tb2NrL19jcmVhdGVQcm9kdWN0aW9uU2VydmVyJztcblxuICAgICAgc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xuICAgICAgYCxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdml0ZS9wbHVnaW4vY29tcHJlc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luL2NvbXByZXNzLnRzXCI7LyoqXG4gKiBVc2VkIHRvIHBhY2thZ2UgYW5kIG91dHB1dCBnemlwLiBOb3RlIHRoYXQgdGhpcyBkb2VzIG5vdCB3b3JrIHByb3Blcmx5IGluIFZpdGUsIHRoZSBzcGVjaWZpYyByZWFzb24gaXMgc3RpbGwgYmVpbmcgaW52ZXN0aWdhdGVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXG4gKi9cbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcblxuaW1wb3J0IGNvbXByZXNzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnQ29tcHJlc3NQbHVnaW4oXG4gIGNvbXByZXNzOiAnZ3ppcCcgfCAnYnJvdGxpJyB8ICdub25lJyxcbiAgZGVsZXRlT3JpZ2luRmlsZSA9IGZhbHNlLFxuKTogUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10ge1xuICBjb25zdCBjb21wcmVzc0xpc3QgPSBjb21wcmVzcy5zcGxpdCgnLCcpXG5cbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXVxuXG4gIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIGNvbXByZXNzUGx1Z2luKHtcbiAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZSxcbiAgICAgIH0pLFxuICAgIClcbiAgfVxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIGNvbXByZXNzUGx1Z2luKHtcbiAgICAgICAgZXh0OiAnLmJyJyxcbiAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlLFxuICAgICAgfSksXG4gICAgKVxuICB9XG4gIHJldHVybiBwbHVnaW5zXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC92aXRlL3BsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luL3Zpc3VhbGl6ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luL3Zpc3VhbGl6ZXIudHNcIjsvKipcbiAqIFBhY2thZ2UgZmlsZSB2b2x1bWUgYW5hbHlzaXNcbiAqL1xuaW1wb3J0IHZpc3VhbGl6ZXIgZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgaXNSZXBvcnRNb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdWaXN1YWxpemVyQ29uZmlnKCkge1xuICBpZiAoaXNSZXBvcnRNb2RlKCkpIHtcbiAgICByZXR1cm4gdmlzdWFsaXplcih7XG4gICAgICBmaWxlbmFtZTogJy4vbm9kZV9tb2R1bGVzLy5jYWNoZS92aXN1YWxpemVyL3N0YXRzLmh0bWwnLFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICB9KSBhcyBQbHVnaW5PcHRpb25cbiAgfVxuICByZXR1cm4gW11cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGUvcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvem91L1dlYnN0b3JtUHJvamVjdHMvdnVlMy12YW50NC1tb2JpbGUvYnVpbGQvdml0ZS9wbHVnaW4vc3ZnU3ByaXRlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC92aXRlL3BsdWdpbi9zdmdTcHJpdGUudHNcIjsvKipcbiAqICBWaXRlIFBsdWdpbiBmb3IgZmFzdCBjcmVhdGluZyBTVkcgc3ByaXRlcy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tc3ZnLWljb25zXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdTdmdJY29uc1BsdWdpbihpc0J1aWxkOiBib29sZWFuKSB7XG4gIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuICBjb25zdCBzdmdJY29uc1BsdWdpbiA9IGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTUzOEJcdTdGMjlcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZCxcbiAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICB9KVxuICByZXR1cm4gc3ZnSWNvbnNQbHVnaW5cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pvdS9XZWJzdG9ybVByb2plY3RzL3Z1ZTMtdmFudDQtbW9iaWxlL2J1aWxkL3ZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC92aXRlL3Byb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96b3UvV2Vic3Rvcm1Qcm9qZWN0cy92dWUzLXZhbnQ0LW1vYmlsZS9idWlsZC92aXRlL3Byb3h5LnRzXCI7LyoqXG4gKiBVc2VkIHRvIHBhcnNlIHRoZSAuZW52LmRldmVsb3BtZW50IHByb3h5IGNvbmZpZ3VyYXRpb25cbiAqL1xuaW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ11cblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXVxuXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucyAmIHsgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nIH0+XG5cbmNvbnN0IGh0dHBzUkUgPSAvXmh0dHBzOlxcL1xcLy9cblxuLyoqXG4gKiBHZW5lcmF0ZSBwcm94eVxuICogQHBhcmFtIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XG4gIGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge31cbiAgZm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIGxpc3QpIHtcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldClcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9odHRwLXBhcnR5L25vZGUtaHR0cC1wcm94eSNvcHRpb25zXG4gICAgcmV0W3ByZWZpeF0gPSB7XG4gICAgICB0YXJnZXQsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB3czogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxuICAgICAgLy8gaHR0cHMgaXMgcmVxdWlyZSBzZWN1cmU9ZmFsc2VcbiAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjBBOHNlY3VyZT1cInRydWVcIlx1NTNFQVx1NTE0MVx1OEJCOFx1Njc2NVx1ODFFQSBIVFRQUyBcdTc2ODRcdThCRjdcdTZDNDJcdUZGMENcdTUyMTlzZWN1cmU9XCJmYWxzZVwiXHU2MTBGXHU1NDczXHU3NzQwXHU1MTQxXHU4QkI4XHU2NzY1XHU4MUVBIEhUVFAgXHU1NDhDIEhUVFBTIFx1NzY4NFx1OEJGN1x1NkM0Mlx1MzAwMlxuICAgICAgLi4uKGlzSHR0cHMgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0XG5cbiAgLy8gcmV0XG4gIC8vIHtcbiAgLy8gICAnL3Rlc3QvYXBpJzoge1xuICAvLyAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDgwL3Rlc3QvYXBpJyxcbiAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgLy8gICAgIHdzOiB0cnVlLFxuICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKC9eXFwvdGVzdC9hcGkvKSwgJycpLFxuICAvLyAgIH0sXG4gIC8vICAgJy91cGxvYWQnOiB7XG4gIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwMDEvdXBsb2FkJyxcbiAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgLy8gICAgIHdzOiB0cnVlLFxuICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKC9eXFwvdXBsb2FkLyksICcnKSxcbiAgLy8gICB9XG4gIC8vIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsU0FBUyxlQUFlO0FBRWpWLFNBQVMsZUFBZTtBQUN4QixTQUFTLGNBQWM7OztBQ0R2QixPQUFPLFlBQVk7QUFhWixTQUFTLGVBQXdCO0FBQ3RDLFNBQU8sUUFBUSxJQUFJLFdBQVc7QUFDaEM7QUFJTyxTQUFTLFdBQVcsU0FBOEI7QUFDdkQsUUFBTSxNQUFXLENBQUM7QUFF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
