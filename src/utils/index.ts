export interface MapLibreConfig {
  i18n?: boolean
  style: string
}

export const defaultMapLibreConfig: MapLibreConfig = {
  i18n: false,
  style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
}
