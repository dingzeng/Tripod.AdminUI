<template>
  <div>
    <el-switch v-bind="$attrs" :disabled="formStates.readonly" @input="input"></el-switch>
  </div>
</template>

<script>
export default {
  name: 'XSwitch',
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
