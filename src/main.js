import Vue from 'vue';
import bugsnagVue from '@bugsnag/plugin-vue';
import App from './views/App.vue';
import bugsnagClient from './lib/bugsnag';

Vue.config.productionTip = false;

bugsnagClient.use(bugsnagVue, Vue);

new Vue({
  render: h => h(App)
}).$mount('#root');
