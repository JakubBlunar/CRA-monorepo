/// <reference types="react-scripts" />

declare module '*.png'
declare module '*.svg'
declare module '*.json' {
  const content: any
  export default content
}

declare module '@fvilers/disable-react-devtools' {
  export const disableReactDevTools: () => void
}
