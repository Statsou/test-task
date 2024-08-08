import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

//custom directive
// app.directive('autofocus', {
//   mounted(el) {
//     el.focus()
//   }
// });
