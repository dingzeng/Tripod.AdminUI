import Checkbox from './checkbox'
import DatePicker from './date-picker'
import Form from './form'
import Input from './input'
import Radio from './radio'
import Select from './select'
import Switch from './switch'

export default {
  install: function(Vue) {
    Vue.component('XCheckbox', Checkbox)
    Vue.component('XDatePicker', DatePicker)
    Vue.component('XForm', Form)
    Vue.component('XInput', Input)
    Vue.component('XRadio', Radio)
    Vue.component('XSelect', Select)
    Vue.component('XSwitch', Switch)
  }
}
