<template>
  <div>
    <template v-if="formStates.readonly">
      {{ innerLabel }}
    </template>
    <template v-else>
      <el-input
        v-model="innerLabel"
        clearable
        :placeholder="placeholder"
        :disabled="disabled"
        @blur="inputBlur"
        @clear="inputClear"
      >
        <el-button slot="append" icon="el-icon-menu" @click="clickMore"></el-button>
      </el-input>
      <component
        :is="listDialogComponentName"
        ref="dialog"
        :visible.sync="dialogVisible"
        :query-params.sync="innerQueryParams"
        @on-ok="setCurrentData"
      >
      </component>
    </template>
  </div>
</template>

<script>
import warpper from './mixins/warpper'
import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: 'RefInput',
  inject: ['formStates'],
  mixins: [warpper, emitter],
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
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    inputBlur() {
      // TODO auto search ,if not exist only one then show the list dialog.
    },
    inputClear() {
      this.innerValue = ''
      this.innerLabel = ''
    },
    setCurrentData(data) {
      // NOTE 使用ListDialog的ref-input只支持单选
      if (Array.isArray(data)) {
        data = data[0]
      }
      this.innerValue = data[this.valueKey]
      this.innerLabel = data[this.labelKey]
      this.$nextTick(() => {
        this.dispatch('ElFormItem', 'el.form.blur', [data[this.valueKey]])
      })
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
