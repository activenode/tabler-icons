import fs from 'fs';
import { getRollupPlugins } from '../../.build/build-icons.mjs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const packageName = '@tabler/icons-vue';
const outputFileName = 'tabler-icons-vue';
const outputDir = 'dist';
const inputs = ['./src/tabler-icons-vue.js'];
const bundles = [
  {
    format: 'umd',
    inputs,
    outputDir,
    minify: true,
  },
  {
    format: 'umd',
    inputs,
    outputDir,
  },
  {
    format: 'cjs',
    inputs,
    outputDir,
  },
  {
    format: 'es',
    inputs,
    outputDir,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
    extension: 'mjs',
  },
];

const configs = bundles
  .map(
    ({
      inputs,
      outputDir,
      format,
      minify,
      preserveModules,
      extension = 'js',
    }) =>
      inputs.map((input) => ({
        input,
        plugins: getRollupPlugins(pkg, minify),
        external: ['vue'],
        output: {
          name: packageName,
          ...(preserveModules
            ? {
                dir: `${outputDir}/${format}`,
                entryFileNames: `[name].${extension}`,
              }
            : {
                file: `${outputDir}/${format}/${outputFileName}${
                  minify ? '.min' : ''
                }.${extension}`,
              }),
          format,
          preserveModules,
          sourcemap: true,
          globals: {
            vue: 'vue',
          },
        },
      }))
  )
  .flat();

export default configs;
