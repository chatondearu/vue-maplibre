import { createApp } from 'vue'

// Using import aliases in Vite
import App from './App.vue'
import VueMapLibre from 'vue-maplibre'

const app = createApp(App)
app.use(VueMapLibre)

app.mount('#app')
