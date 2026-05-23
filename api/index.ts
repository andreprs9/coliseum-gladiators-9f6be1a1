import { createStartHandler } from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

export default createStartHandler({
  createRouter: () => import('../src/router').then(m => m.createRouter()),
  getRouterManifest: () => getRouterManifest(),
})
