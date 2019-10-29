<template>

  <div  :class="{'gameover':isGameover}" class="h-screen simon" >

    <div id="app" class="container">

      <h1 class="game-title" >{{title}}</h1>
      <button v-if="isGameStarted" class="btn border border-gray-600 rounded-lg p-2 text-sm hint-button hover:bg-white" type="button" name="button" @click="displayHint()">show hint</button>
      <!-- <h1 v-if="!isGameover && isGameStarted" class="game-title"> Your Score :{{score}} </h1> -->

      <table class="mx-auto p-8 ">
        <tr>
          <td>
            <audio-button color="#ff1" audio-file="https://actions.google.com/sounds/v1/cartoon/metal_twang.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
          </td>
          <td>
            <audio-button color="#11f" audio-file="https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
          </td>
        </tr>
        <tr>
          <td>
            <audio-button color="#f11" audio-file="https://actions.google.com/sounds/v1/water/air_woosh_underwater.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
          </td>
          <td>
            <audio-button color="#1f1" audio-file="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" @buttonPressed="userPressedButton($event)"></audio-button>
          </td>
        </tr>
      </table>

      <h1 v-if='isGameStarted' class="text-2xl text-white">  Score : {{score}}</h1>

    </div>

  </div>

</template>


<style>

.simon{
  background-image: linear-gradient(rgb(250,230,122),black);
}
#app {
  font-family: 'VT323', monospace;
  position:relative;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
}
.hint-button{
  position: absolute;
  right: 0;
  top: 1rem;
}
.container{
  width: 60%;
  margin:auto ;
}
.game-title{
  padding-top: 1rem;
  font-size : 4rem;
}
.gameover{
  background-color : red;
  opacity: 0.8;
}
</style>

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
      isGameover : false,
      score: 0,
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
      this.title = "Gameover, press any key to start  Your Score : "+ this.score;
      this.isGameover = true;
      this.score = 0;

      var audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
      audio.play()
      .catch(err =>
        console.log("error playing audio" + err))

      setTimeout(function(){
        audio.pause();
      },3000);

      var self = this;
      setTimeout(function(){
          self.isGameover = false;
      },100);
    },

    //check function to validate the button pressed by the user
    checkButtonPressed :function(){
      if(this.isGameStarted)
      {
        if(this.gameSequence[this.buttonPressCount] == this.inputSequence[this.buttonPressCount] ){
          this.score = this.score + this.level + this.buttonPressCount;
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
