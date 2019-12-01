import ListDialog from './listDialog'
export default {
  components: { ListDialog },
  data() {
    return {
      innerVisible: this.visible
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    /**
     * 触发完成事件，默认取Id、Name的数据，需要自定义，则在组件中覆盖complete方法
     * @param {列表对话框选择的数据数组} selection 
     */
    complete(selection) {
      const value = selection[0]['Id']
      const label = selection[0]['Name']
      this.$emit('on-complete', value, label, selection)
    }
  },
  watch: {
    visible(newValue) {
      this.innerVisible = newValue
    },
    innerVisible(newValue) {
      this.$emit('update:visible', newValue)
    }
  }
}