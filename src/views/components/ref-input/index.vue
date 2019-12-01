<template>
  <div>
    <el-input 
      v-model="innerLabel" 
      clearable
      :placeholder="placeholder"
      :disabled="disabled"
      readonly
      @blur="inputBlur"
      @clear="inputClear">
      <el-button slot="append" icon="el-icon-menu" @click="clickMore"></el-button>
    </el-input>
    <component 
      ref="dialog"
      :is="listDialogComponentName"
      :visible.sync="dialogVisible"
      @on-complete="dialogComplete">
    </component>
  </div>
</template>

<script>
import DynamicDialogComponentMixin from './mixins/dynamicDialogCompnentMixin'
export default {
  name: 'RefInput',
  mixins: [DynamicDialogComponentMixin],
  data () {
    return {
      innerValue: this.value,
      innerLabel: this.label,
      dialogVisible: false
    }
  },
  props: {
    value: {
      type: [String,Number],
      default: () => ""
    },
    label: String,
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: () => "请选择"
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    readonly: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    inputBlur() {
      // TODO auto search ,if not exist only one then show the list dialog.
    },
    inputClear() {
      this.innerValue = ''
    },
    dialogComplete(value, label, selection){
      this.innerValue = value
      this.innerLabel = label
    },
    clickMore() {
      this.dialogVisible = true
    }
  },
  computed: {
    listDialogComponentName() {
      return `${this.type}ListDialog`
    }
  },
  watch: {
    innerValue(newValue) {
      this.$emit('input', newValue)
    },
    value(newValue) {
      this.innerValue = newValue
    },
    innerLabel(newValue) {
      this.$emit('update:label', newValue)
    },
    label(newValue) {
      this.innerLabel = newValue
    }
  }
}
</script>