import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';


export default [
  {
    input: './src/index.js',
    output: [
      {
        file:'dist/index.js',
        format:'cjs',
        name:"MorphWrapper"
      },
      {
        file:'dist/index.es.js',
        format:'es',
        exports:'named'
      }
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      commonjs({
        include: 'node_modules/**',
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        namedExports: {
          'node_modules/react/index.js': [
            'cloneElement',
            'Component',
            'createContext',
            'createElement',
            'createRef',
            'forwardRef',
            'Fragment',
            'isValidElement',
            'lazy',
            'memo',
            'Profiler',
            'PureComponent',
            'StrictMode',
            'Suspense',
            'useCallback',
            'useContext',
            'useDebugValue',
            'useEffect',
            'useImperativeHandle',
            'useLayoutEffect',
            'useMemo',
            'useReducer',
            'useRef',
            'useState',
            'version',
          ],
          'node_modules/react-dom/index.js': [
            'findDOMNode',
            'render',
            'unmountComponentAtNode',
          ],
          'node_modules/react-dom/server.js': [
            'renderToStaticMarkup',
            'renderToString',
          ],
          'node_modules/react-is/index.js': [
            'AsyncMode',
            'ConcurrentMode',
            'ContextConsumer',
            'ContextProvider',
            'Element',
            'ForwardRef',
            'Fragment',
            'isAsyncMode',
            'isConcurrentMode',
            'isContextConsumer',
            'isContextProvider',
            'isElement',
            'isForwardRef',
            'isFragment',
            'isLazy',
            'isMemo',
            'isPortal',
            'isProfiler',
            'isStrictMode',
            'isSuspense',
            'isValidElementType',
            'Lazy',
            'Memo',
            'Portal',
            'Profiler',
            'StrictMode',
            'Suspense',
            'typeOf',
          ],
        },
      })
    ]
  }
]