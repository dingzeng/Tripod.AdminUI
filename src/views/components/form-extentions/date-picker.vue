<template>
  <div>
    <!-- TODO -->
  </div>
</template>

<script>
export default {
  name: 'XDatePicker',
  inheritAttrs: false,
  inject: ['formStates'],
  data() {
    return {
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    }
  }
}
</script>
