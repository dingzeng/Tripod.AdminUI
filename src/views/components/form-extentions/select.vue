<template>
  <div>
    <el-select v-show="!formStates.readonly" ref="select" v-bind="$attrs" style="width: 100%;" @input="input">
      <slot />
    </el-select>
    <span v-show="formStates.readonly">
      {{ optionLabel() }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'XSelect',
  inheritAttrs: false,
  inject: ['formStates'],
  data() {
    return {
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    },
    optionLabel() {
      return this.$refs.select && this.$refs.select.selectedLabel
    }
  }
}
</script>
