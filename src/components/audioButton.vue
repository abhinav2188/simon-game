<template lang="html">

  <div :class="{'pressed':pressed}" :style="{'background-color' :color}" class="btn" @click.prevent="buttonPressed()" >
  </div>

</template>

<script>
export default {
  data : function(){
    return {
      pressed : false,
    }
  },
  props : {
    color : {
      type : String,
      required : true,
    },
    audioFile : {
      type : String,
      required : true
    },
    next : {
      type : String,
      required : false
    }
  },
  computed : {
    isNext : function(){
      return this.next == this.color;
    }
  },
  methods : {
    getColor : function(){
      return this.color;
    },

    playSound : function(){
        try{
        var audio = new Audio(this.audioFile);
        audio.play();
        }catch(err){
        console.log(err.message);
      }
      },
    flash : function(){
      var self = this;
      this.pressed = true ;
      setTimeout(function(){
        self.pressed = false;
      },100);
    },
    buttonPressed : function(){
      // this.playSound();
      this.flash();
      this.$emit('buttonPressed',this.color);

    }
    // next : function(color){
    //   if(this.color == color){
    //     console.log("in the function")
    //     console.log(color);
    //     playSound();
    //     flash();
    //   }
    // }
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
