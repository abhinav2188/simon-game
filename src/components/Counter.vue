<template lang="html">
  <div class="counter">
    <h2>Count : {{count}}</h2>
    <button type="button" name="button" @click="count+=1">increment</button>
  </div>
</template>

<script>
export default {
  name : 'Counter' ,
  data(){
    return{
      count:0,
    }
  }
}
</script>

<style lang="css" scoped>
</style>
