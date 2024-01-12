import 'react-native-url-polyfill/auto'

import { setupServer } from 'msw/native'

import { game } from './handlers/game'
import { games } from './handlers/games'

/**
 * JSON mocks can be updated from IR's postman collection:
 * https://infinitered.postman.co/workspace/RN-Essentials~55d940f6-3d2e-4523-be26-b46db813a0ea/request/5586709-6c690fab-f460-40d6-8459-1ec5fc142fd4?ctx=documentation
 */

const server = setupServer(games, game)

export function setupMockServer(opts: { debug?: boolean } = {}) {
  try {
    if (opts.debug) {
      server.events.on('request:start', req => {
        console.log('MSW intercepted:', req.method, req.url)
      })
    }
    server.listen({
      onUnhandledRequest: 'bypass',
    })
  } catch (error) {
    console.error(error)
  }
}
