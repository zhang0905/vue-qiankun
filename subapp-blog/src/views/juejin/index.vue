<template>
  <div class="about">
    <h1>This is an about page{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: "blog",
  computed: {
    msg() {
      return this.$store.getters.msg;
    }
  }
}
</script>
