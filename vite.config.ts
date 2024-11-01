import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import licence from "rollup-plugin-license";

export const config = {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  } as any;
  
  export const ruLicence = (id: String) => {
    let fileName = `${id}.licence.txt`;
  
    return licence({
      sourcemap: true,
      banner: {
        content: `@license
  https://raw.githubusercontent.com/indus/nicetix/refs/heads/main/dist/${fileName}`,
      },
      thirdParty: {
        output: `./dist/${fileName}`,
        includeSelf: true,
      },
    });
  };
  
  const fileName = "nicetix.ts";
  
  export default defineConfig(Object.assign({}, config, {
    plugins: [
      dts(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/nicetix.ts"),
        name: "nicetix",
        fileName,
      },
      rollupOptions: {
        plugins: [ruLicence(fileName)],
      },
    },
  }));
  