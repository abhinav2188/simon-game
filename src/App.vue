<template>
  <div id="app" :class="{'gameover':isGameover}">

    <h1 class="game-title" >{{title}}</h1>
    <button class="btn btn-outline-primary" type="button" name="button" @click="displayHint()">show hint</button>

    <div class="container">
      <div class="row">
        <audio-button color="#ff1" audio-file="https://actions.google.com/sounds/v1/cartoon/metal_twang.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
        <audio-button color="#11f" audio-file="https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
      </div>
      <div class="row">
        <audio-button color="#f11" audio-file="https://actions.google.com/sounds/v1/water/air_woosh_underwater.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
        <audio-button color="#1f1" audio-file="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
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

    // function called on each level up - nextSequence()
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

    // gameover function()
    gameover: function(){
      this.gameSequence = [];
      this.inputSequence = [];
      this.isGameStarted = false;
      this.level = 1;
      this.buttonPressCount = -1;
      this.title = "Gameover , press any key to start again";
      this.isGameover = true;

      var audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
      audio.play()
      .catch(err =>
        console.log("error playing audio" + err))

      setTimeout(function(){
        audio.pause();
      },2000);

      var self = this;
      setTimeout(function(){
          self.isGameover = false;
      },1000);
    },

    //check function to validate the button pressed by the user
    checkButtonPressed :function(){
      if(this.gameSequence[this.buttonPressCount] == this.inputSequence[this.buttonPressCount] ){
        var self = this;
        if(this.gameSequence.length-1 == this.buttonPressCount)
        {
          setTimeout(function(){
            self.nextSequence();
          },500);
        }
      }
      else {
        this.gameover();
      }

    },

    // event handler function ... used to keep track of the buttons pressed by user
    userPressedButton: function(btn){
      for ( var i=0; i<this.$children.length ; i++)
      {
        if ( this.$children[i].color == btn)
            this.inputSequence.push(i);
      }
      this.buttonPressCount+=1;
      this.checkButtonPressed();
    },

    // display the complete sequence from starting
    displayHint: function(){
      var self = this;
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
    window.addEventListener('keypress',function(){
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
  text-align: center;
}
.row{
  text-align : center;
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
