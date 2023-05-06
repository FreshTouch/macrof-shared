// eslint-disable-next-line spaced-comment
/// <reference types="@types/jest" />;
/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.css';
declare module '*.less';
