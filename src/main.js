import { createApp } from 'vue';
import {GameState} from './stores/GameState'
import App from './App.vue'

const app = createApp(App).use(GameState);

app.mount('#app');
