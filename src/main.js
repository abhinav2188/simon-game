import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods : {
    levelUp : function(nextColor){
      this.$emit("level-up",nextColor)
      console.log(nextColor);
    }
  }
});


new Vue({
  render: h => h(App),
}).$mount('#app')
