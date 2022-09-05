import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const useStore = createPinia()
useStore.use(piniaPluginPersistedstate)

export default useStore
