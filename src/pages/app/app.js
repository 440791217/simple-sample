import Mv from '../../app/mv'
import App from './app.vue'

new Mv({
  el: '#app',
  render: h => h(App)
})
