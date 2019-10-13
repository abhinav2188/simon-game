<template>
  <div id="app" :class="{'gameover':isGameover}">
    <h1 class="game-title" >{{title}}</h1>
    <button type="button" name="button" @click="displayHint()">show hint</button>
    <div class="container">
      <div class="row">
        <audio-button color="#ff1" audio-file="../assets/sounds/yellow.mp3" @buttonPressed="userPressedButton($event)"></audio-button>
        <audio-button color="#11f" audio-file="./assets/sounds/blue.mp3" @buttonPressed="userPressedButton($event)"></audio-button>
      </div>
      <div class="row">
        <audio-button color="#f11" audio-file="./assets/sounds/red.mp3" @buttonPressed="userPressedButton($event)"></audio-button>
        <audio-button color="#1f1" audio-file="./assets/sounds/green.mp3" @buttonPressed="userPressedButton($event)"></audio-button>
      </div>
    </div>
  </div>
</template>

<script>
import audioButton from './components/audioButton.vue'

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
      gameSequence : [],
      inputSequence : [],
      buttonPressCount : -1,
      isGameover : false
    }
  },
  methods :{
    nextSequence: function(){
      this.title = "Level "+this.level;
      this.level+=1;
      var random = Math.floor(Math.random()*4);
      this.$children[random].flash();
      this.gameSequence.push(random);
      this.buttonPressCount = -1;
      this.inputSequence = [];
      // console.log(this.gameSequence);
      // console.log(this.inputSequence);
    },
    gameover: function(){
      this.gameSequence = [];
      this.inputSequence = [];
      this.isGameStarted = false;
      this.level = 1;
      this.buttonPressCount = -1;
      this.title = "Gameover , press any key to start again";
      this.isGameover = true;
      var audio = new Audio("assets/sounds/wrong.mp3");
      audio.play();
      var self = this;
      setTimeout(function(){
          self.isGameover = false;
      },100);
    },
    checkButtonPressed :function(){
      // console.log("checkButtonPressed");
      // console.log(this.buttonPressCount);
      // console.log('game'+this.gameSequence[this.buttonPressCount]);
      // console.log('input'+this.inputSequence[this.buttonPressCount]);
      if(this.gameSequence[this.buttonPressCount] == this.inputSequence[this.buttonPressCount] ){
        // console.log(this.gameSequence.length);
        // console.log(this.buttonPressCount);
        self = this;
         if(this.gameSequence.length-1 == this.buttonPressCount)
         {
           console.log("next level "+this.level);
           setTimeout(function(){
             self.nextSequence();
             //alert("next coming");
           },500);
         }
      }
      else {
        console.log('gameover');
        this.gameover();
      }

    },
    userPressedButton: function(btn){
      for ( var i=0; i<this.$children.length ; i++)
      {
        if ( this.$children[i].color == btn)
            this.inputSequence.push(i);
      }
      this.buttonPressCount+=1;
      this.checkButtonPressed();
    },
    displayHint: function(){
      console.log(this.gameSequence);
      self = this;
      // for(var i of this.gameSequence) {
      //   console.log(i);
      //   setTimeout(function(){
      //   },500);
      // }
      var i = 0;
      var l = this.gameSequence.length;
      var temp = setInterval(function(){
        if(i == l){
          clearInterval(temp);
       }else{
         self.$children[self.gameSequence[i]].flash();
         i++;
       }
     },500);
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
.gameover{
  background-color : red;
  opacity: 0.8;
}
</style>
