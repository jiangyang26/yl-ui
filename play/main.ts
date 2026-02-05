import { createApp } from "vue";
import App from "./App.vue";
import YlIcon from '@/icons/index'

import '@/theme-chalk/index'

const app = createApp(App);
app.use(YlIcon)
app.mount("#play")