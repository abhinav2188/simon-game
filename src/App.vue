<template>
  <div id="app">
    <h1 class="game-title" >{{title}}</h1>
    <button type="button" name="button" @click="nextSequence()">button</button>
    <div class="container">
      <div class="row">
        <audio-button color="#ff1" audio-file="./assets/sounds/yellow.mp3"></audio-button>
        <audio-button color="#11f" audio-file="./assets/sounds/blue.mp3"></audio-button>
      </div>
      <div class="row">
        <audio-button color="#f11" audio-file="./assets/sounds/red.mp3"></audio-button>
        <audio-button color="#1f1" audio-file="./assets/sounds/green.mp3"></audio-button>
      </div>
    </div>
  </div>
</template>

<script>
import audioButton from './components/audioButton.vue'
import {eventBus} from './main.js'

export default {
  name: 'app',
  components: {
    'audio-button' : audioButton,
  },
  data: function()  {
    return{
      title : "Press any key to start",
      level : 1,
      isGameStarted : false,
    }
  },
  methods :{
    nextSequence: function(){
      this.title = "Level "+this.level;
      this.level+=1;
      var random = Math.floor(Math.random()*4);
      this.$children[random].flash();
    },
    foo : function(){
      console.log("do nothing");
    }
  },
  mounted :function(){
    var self = this;
    window.addEventListener('keypress',function(e){
      if(!self.isGameStarted){
        self.isGameStarted = true;
        self.nextSequence();
      }
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  width: 50%;
  margin:auto ;
}
.game-title{
  font-size : 4rem;
  font-family :monospace;
}
</style>
