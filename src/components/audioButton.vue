<template lang="html">

  <div :class="{'pressed':pressed}" :style="{'background-color' :color}" class="btn" @click.prevent="buttonPressed()" >
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
      console.log(this.audioFile);
      try {
        if(this.audioFile)
        {
          var audio = new Audio(this.audioFile);
          audio.play();
        }
      }
      catch (err) {
        console.log(err.message);
      }
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
.btn {
  margin: 25px;
  display: inline-block;
  height: 150px;
  width: 150px;
  border: 2px solid black;
  border-radius: 10%;
}

.pressed {
  box-shadow: 0 0 20px black;
  /* background-color: grey; */
}

</style>
