import ListDialog from './listDialog'
export default {
  components: { ListDialog },
  data() {
    return {
      innerVisible: this.visible,
      innerQueryParams: this.queryParams
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {

  },
  watch: {
    visible(newValue) {
      this.innerVisible = newValue
    },
    innerVisible(newValue) {
      this.$emit('update:visible', newValue)
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
