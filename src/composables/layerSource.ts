import type { GeoJSONSource, Map, SourceSpecification } from 'maplibre-gl'
import { inject, ref, Ref } from 'vue'

export function useSource(id: Ref<string>) {
  const map = inject<Ref<Map | null>>('map', ref(null))

  function removeSource() {
    if (getSource()) {
      map.value?.removeSource(id.value)
    }
  }

  function updateSource(source: SourceSpecification) {
    removeSource()
    map.value?.addSource(id.value, source)
  }

  function getSource<T = GeoJSONSource>() {
    return map.value?.getSource(id.value) as T
  }

  return {
    getSource,
    updateSource,
    removeSource,
  }
}
