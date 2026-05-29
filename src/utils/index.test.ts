import { describe, expect, it } from 'vitest'
import { defaultMapLibreConfig } from './index'

describe('defaultMapLibreConfig', () => {
  it('exposes stable defaults for plugin installation', () => {
    expect(defaultMapLibreConfig.i18n).toBe(false)
    expect(defaultMapLibreConfig.style).toContain('cartocdn.com')
  })
})
