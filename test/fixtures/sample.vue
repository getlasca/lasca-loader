<template lang="lasca">
  <lasca component="test"></lasca>
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
