<template lang="lasca">
  <lasca></lasca>
</template>

<script>
export default {
  data() {
    return {
      count: 10,
    };
  },
  methods: {
    click: function ($event) {
      this.count++;
    },
  },
};
</script>

<style>
.dummy {
  color: red;
}
</style>
