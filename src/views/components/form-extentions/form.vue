<template>
  <div>
    <el-form ref="form" v-bind="$attrs">
      <slot />
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'XForm',
  inheritAttrs: false,
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      formStates: this.formStates
    }
  },
  data() {
    return {
      formStates: {
        readonly: this.readonly
      }
    }
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields()
    }
  },
  watch: {
    readonly: function(value) {
      this.formStates.readonly = value
    }
  }
}
</script>
