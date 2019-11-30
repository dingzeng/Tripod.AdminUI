<template>
  <div>
    <el-select 
      v-model="model" 
      placeholder="请选择" 
      filterable
      remote
      :remote-method="remoteMethod"
      :multiple="multiple" 
      :clearable="clearable">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import { query } from '@/api/branch'
  export default {
    name: 'BranchSelect',
    data() {
      return {
        model: '',
        options: []
      }
    },
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      remoteMethod(keyword) {
        console.log(keyword)
        const request = {
          pageIndex: 1,
          pageSize: 50,
          keyword: keyword
        }
        query(request).then(response => {
          console.log(response)
          this.options = response.list.map(b => {
            return {
              value: b.Id,
              label: `[${b.Id}]${b.Name}`
            }
          })
        })
      }
    }
  }
</script>