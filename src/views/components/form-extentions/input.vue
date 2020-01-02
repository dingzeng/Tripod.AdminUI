<template>
  <div>
    <template v-if="formStates.readonly">
      {{ $attrs.value }}
    </template>
    <template v-else>
      <el-input v-bind="$attrs" @input="input"></el-input>
    </template>
  </div>
</template>

<script>
export default {
  name: 'XInput',
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
