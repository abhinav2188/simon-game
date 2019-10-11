<template lang="html">
  <div :class="{'pressed':pressed}" :style="{'background-color' :color}" class="btn" @click.prevent="flash()" >

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
    playSound : function(){
        try{
        var audio = new Audio(this.audioFile);
        audio.play();
        }catch(err){
        console.log(err.message);
      }
      },
    flash : function(){
      this.pressed = true ;
      var self = this;
      setTimeout(function(){
        self.pressed = false;
      },100);
      // this.playSound();
    },
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

.game-over {
  background-color: red;
  opacity: 0.8;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}

.yellow {
  background-color: yellow;
}
.pressed {
  box-shadow: 0 0 20px black;
  /* background-color: grey; */
}

</style>
