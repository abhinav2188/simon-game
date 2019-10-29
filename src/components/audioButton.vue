<template lang="html">

<div class="col">
  <div :class="{'pressed':pressed}" :style="{'background-color' :color}" class="audio-btn" @click.prevent="buttonPressed()" >

  </div>

</div>

</template>

<script>

export default {

  data: function() {
    return {
      pressed: false,
    }
  },

  props: {
    color: {
      type: String,
      required: true,
    },
    audioFile: {
      type: String,
      required: true
    }
  },

  methods: {

    playSound: function() {
      var audio = new Audio(this.audioFile);
      audio.play()
      .catch(err =>
        console.log("error playing audio" + err))

    },

    flash: function() {
      this.playSound();
      this.pressed = true;
      var self = this;
      setTimeout(function() {
        self.pressed = false;
      }, 100);
    },

    buttonPressed: function() {
      this.flash();
      this.$emit('buttonPressed', this.color);

    }
  }
}
</script>

<style lang="css" scoped>

.audio-btn {
  margin: 25px;
  display: inline-block;
  height: 150px;
  width: 150px;
  border: 2px solid black;
  border-radius: 10%;
}

.pressed {
  box-shadow: 0 0 25px white;
  /* background-color: grey; */
}

</style>
