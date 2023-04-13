import fs from 'fs';
import { getRollupPlugins } from '../../.build/build-icons.mjs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const packageName = '@tabler/icons-react';
const outputFileName = 'tabler-icons-react';
const outputDir = 'dist';
const inputs = ['./src/tabler-icons-react.js'];
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
    extension: 'mjs',
    preserveModules: true,
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
        external: ['react', 'prop-types'],
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
          sourcemap: true,
          preserveModules,
          globals: {
            react: 'react',
            'prop-types': 'PropTypes',
          },
        },
      }))
  )
  .flat();

export default configs;
