interface UseImageOptions {
  src: string
  srcset?: string
  sizes?: string
  alt?: string
  class?: string
  loading?: HTMLImageElement['loading']
  crossorigin?: string
  referrerPolicy?: HTMLImageElement['referrerPolicy']
}

function imgToDataUrl(img: HTMLImageElement) {
  const newImg = new Image()
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = img.width
  canvas.height = img.height
  canvas.textContent = img.alt

  context?.drawImage(img, 0, 0)
  newImg.src = canvas.toDataURL('image/png')
  localStorage.setItem('savedImageData', canvas.toDataURL('image/png'))
  return newImg
}

export async function loadImage(options: UseImageOptions): Promise<HTMLImageElement | string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const {
      src,
      srcset,
      sizes,
      class: clazz,
      loading,
      crossorigin,
      referrerPolicy,
    } = options

    if (srcset) {
      img.srcset = srcset
    }
    if (sizes) {
      img.sizes = sizes
    }
    if (clazz) {
      img.className = clazz
    }
    if (loading) {
      img.loading = loading
    }
    if (referrerPolicy) {
      img.referrerPolicy = referrerPolicy
    }

    img.onerror = reject

    // check if //domain.com or http://domain.com is a different origin
    if (/^([\w]+:)?\/\//.test(src) && !src.includes(location.host)) {
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const imgCors = imgToDataUrl(img)
        resolve(imgCors)
      }

      // launch the loading
      img.src = `${src}?${Date.now()}` // to avoid caching

      return
    } else if (crossorigin) {
      img.crossOrigin = crossorigin
    }

    img.onload = () => resolve(img)
    // launch the loading
    img.src = src
  })
}
