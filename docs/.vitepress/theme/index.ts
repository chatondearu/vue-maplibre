import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VueMapLibre from 'vue-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import './custom.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueMapLibre, {
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      i18n: true,
    })
  },
}

export default theme
