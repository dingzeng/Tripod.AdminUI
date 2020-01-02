<template>
  <div>
    <x-input
      v-model="innerLabel"
      clearable
      readonly
      :placeholder="placeholder"
      :disabled="disabled"
      @blur="inputBlur"
      @clear="inputClear"
    >
      <el-button slot="append" icon="el-icon-menu" @click="clickMore"></el-button>
    </x-input>
    <component
      :is="listDialogComponentName"
      ref="dialog"
      :visible.sync="dialogVisible"
      :query-params.sync="innerQueryParams"
      @on-complete="dialogComplete"
    >
    </component>
  </div>
</template>

<script>
import DynamicDialogComponentMixin from './mixins/dynamicDialogCompnentMixin'
export default {
  name: 'RefInput',
  mixins: [DynamicDialogComponentMixin],
  data() {
    return {
      innerValue: this.value,
      innerLabel: this.label,
      dialogVisible: false,
      innerQueryParams: this.queryParams
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: () => ''
    },
    label: String,
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    inputBlur() {
      // TODO auto search ,if not exist only one then show the list dialog.
    },
    inputClear() {
      this.innerValue = ''
    },
    dialogComplete(value, label, selection) {
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

      // HACK fixbug:form组件的 resetFields方法对ref-input组件绑定的label属性不会重置
      // （只重置在form-item上写了prop的数据）
      if (!newValue) {
        this.innerLabel = ''
      }
    },
    innerLabel(newValue) {
      this.$emit('update:label', newValue)
    },
    label(newValue) {
      this.innerLabel = newValue
    },
    queryParams: {
      handler: function(newValue) {
        this.innerQueryParams = newValue
      },
      deep: true
    },
    innerQueryParams: {
      handler: function(newValue) {
        this.$emit('update:queryParams', newValue)
      },
      deep: true
    }
  }
}
</script>
