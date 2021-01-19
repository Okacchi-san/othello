import vue from 'vue/dist/vue';
import App from './components/App.vue';


new vue({
  el: '#app',
  render: h => h(App)
});