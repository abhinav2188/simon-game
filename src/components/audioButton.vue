<template lang="html">
  <div class="col">
    <div
      :class="{ pressed: pressed }"
      :style="{ 'background-color': color }"
      class="md:w-32 md:h-32 w-24 h-24 rounded-lg shadow-lg"
      @click.prevent="buttonPressed()"
    ></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      pressed: false,
    };
  },

  props: {
    color: {
      type: String,
      required: true,
    },
    audioFile: {
      type: String,
      required: true,
    },
  },

  methods: {
    playSound: function() {
      var audio = new Audio(this.audioFile);
      audio.play().catch((err) => console.log("error playing audio" + err));
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
      this.$emit("buttonPressed", this.color);
    },
  },
};
</script>

<style lang="css" scoped>

.pressed {
  box-shadow: 0 0 25px black;
  /* background-color: grey; */
}
</style>
