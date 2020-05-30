<template>
  <div :class="{ 'bg-red-800' : isGameover }" class="h-screen py-12">
    <div id="app" class="lg:w-2/3 md:w-3/4 w-11/12 mx-auto flex flex-col items-center text-center h-full relative">
      <button
        v-if="isGameStarted"
        class="rounded md:p-2 p-1 md:text-sm text-xs bg-gray-900 text-white my-4 self-end"
        type="button"
        name="button"
        @click="displayHint()"
      >
        show hint
      </button>
      <h1 class="lg:text-5xl md:text-3xl text-xl font-bold">{{ title }}</h1>
      <button v-if="!isGameStarted" class="rounded md:p-2 p-1 md:text-sm text-xs bg-gray-900 text-white" @click="startGame()">start game</button>
    
      <div class="grid grid-cols-2 md:gap-4 gap-2 py-16 ">
        <audio-button
          color="#ff1"
          audio-file="https://actions.google.com/sounds/v1/cartoon/metal_twang.ogg"
          @buttonPressed="userPressedButton($event)"
        ></audio-button>
        <audio-button
          color="#11f"
          audio-file="https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg"
          @buttonPressed="userPressedButton($event)"
        ></audio-button>
        <audio-button
          color="#f11"
          audio-file="https://actions.google.com/sounds/v1/water/air_woosh_underwater.ogg"
          @buttonPressed="userPressedButton($event)"
        ></audio-button>
        <audio-button
          color="#1f1"
          audio-file="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
          @buttonPressed="userPressedButton($event)"
        ></audio-button>
      </div>

      <h1 v-if="isGameStarted & !isGameover" class="font-bold">
        Score : {{ score }}
      </h1>
    </div>
  </div>
</template>

<style>
.absolute-center{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>

<script>
import audioButton from "./components/audioButton.vue";

export default {
  name: "app",
  components: {
    "audio-button": audioButton,
  },
  data: function () {
    return {
      title: "Press start",
      level: 1,
      isGameStarted: false,
      gameSequence: [],
      inputSequence: [],
      buttonPressCount: -1,
      isGameover: false,
      score: 0,
    };
  },
  methods: {
    // function called on each level up - nextSequence()
    nextSequence: function () {
      this.title = "Level " + this.level;
      this.level += 1;
      var random = Math.floor(Math.random() * 4);
      this.$children[random].flash();
      this.gameSequence.push(random);
      this.buttonPressCount = -1;
      this.inputSequence = [];
      // console.log(this.gameSequence);
      // console.log(this.inputSequence);
    },

    // gameover function()
    gameover: function () {
      this.gameSequence = [];
      this.inputSequence = [];
      this.isGameStarted = false;
      this.level = 1;
      this.buttonPressCount = -1;
      this.title =
        "Gameover, Your Score : " + this.score;
      this.isGameover = true;
      this.score = 0;

      var audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );
      audio.play().catch((err) => console.log("error playing audio" + err));

      setTimeout(function () {
        audio.pause();
      }, 3000);

      var self = this;
      setTimeout(function () {
        self.isGameover = false;
      }, 100);
    },

    //check function to validate the button pressed by the user
    checkButtonPressed: function () {
      if (this.isGameStarted) {
        if (
          this.gameSequence[this.buttonPressCount] ==
          this.inputSequence[this.buttonPressCount]
        ) {
          this.score = this.score + this.level + this.buttonPressCount;
          var self = this;
          if (this.gameSequence.length - 1 == this.buttonPressCount) {
            setTimeout(function () {
              self.nextSequence();
            }, 500);
          }
        } else {
          this.gameover();
        }
      }
    },

    // event handler function ... used to keep track of the buttons pressed by user
    userPressedButton: function (btn) {
      for (var i = 0; i < this.$children.length; i++) {
        if (this.$children[i].color == btn) this.inputSequence.push(i);
      }
      this.buttonPressCount += 1;
      this.checkButtonPressed();
    },

    // display the complete sequence from starting
    displayHint: function () {
      var self = this;
      var i = 0;
      var l = this.gameSequence.length;
      var temp = setInterval(function () {
        if (i == l) {
          clearInterval(temp);
        } else {
          self.$children[self.gameSequence[i]].flash();
          i++;
        }
      }, 500);
    },
    startGame: function () {
      var self = this;
      if (!self.isGameStarted) {
        self.isGameStarted = true;
        self.nextSequence();
      }
    },
  },
};
</script>
