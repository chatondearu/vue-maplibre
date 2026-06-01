import { createApp } from 'vue'

// Using import aliases in Vite
import VueMapLibre from 'vue-maplibre'
import App from './App.vue'

const app = createApp(App)
app.use(VueMapLibre)

app.mount('#app')
