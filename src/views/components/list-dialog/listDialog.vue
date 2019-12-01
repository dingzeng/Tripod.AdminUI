<template>
  <div>
    <el-dialog :visible.sync="innerVisible" :title="dialogTitle" :modal-append-to-body="false" :append-to-body="true">
      <list-layout>
        <template slot="topLeft">
          <el-form :inline="true" :model="queryParams" class="demo-form-inline" size="small">
            <slot name="queryForm"></slot>
            <el-form-item v-if="$slots.queryForm">
              <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template>
          <el-row>
            <el-col :span="4">
              <slot name="mainLeft"></slot>
            </el-col>
            <el-col :span="$slots.mainLeft ? 20 : 24">
              <el-table 
                :data="data" 
                style="width: 100%" 
                stripe 
                highlight-current-row 
                :height="400" 
                @selection-change="selectionChange"
                @row-dblclick="rowDblclick">
                <template v-for="col in columns">
                  <el-table-column 
                    :key="col.prop"
                    :type="col.type"
                    :prop="col.prop"
                    :label="col.label"
                    :width="col.width">
                  </el-table-column>
                </template>
              </el-table>
            </el-col>
          </el-row>
          <Pagination v-if="isPaging" :total="totalCount" :page="pageIndex" :limit="pageSize"></Pagination>
        </template>
      </list-layout>
      <template slot="footer">
        <el-button @click="innerVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="complete" size="small">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import request from '@/utils/request'
  import ListLayout from '@/views/components/list-layout/index'
  import Pagination from '@/components/Pagination/index'
  export default {
    name: 'ListDialog',
    components: { ListLayout, Pagination },
    data() {
      return {
        data: [],
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
        innerVisible: this.visible,
        selection: []
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      uri: {
        type: String,
        required: true
      },
      queryDelegate: Function,
      columns: {
        type: Array,
        required: true
      },
      queryParams: {
        type: Object,
        default: () => {}
      },
      paramsRules: {
        type: Object,
        default: () => {}
      },
      isPaging: {
        type: Boolean,
        default: true
      },
      dialogTitle: {
        type: String,
        default: ''
      },
      dialogWidth: {
        type: String,
        default: '50%'
      },
    },
    methods: {
      query() {
        const request = {
          params: this.queryParams
        }
        if(this.isPaging) {
          request.pageIndex = this.pageIndex
          request.pageSize = this.pageSize
        }
        this.queryFn(request).then(response => {
          const { data } = response
          if(this.isPaging) {
            this.data = data.list
            this.totalCount = data.totalCount
          } else {
            this.data = data
          }
        })
      },
      selectionChange(selection) {
        this.selection = selection
      },
      complete(){
        if(this.selection.length == 0){
          this.$message.warning("未选中任何行")
          return
        }
        this.$emit('on-complete', this.selection)
        this.innerVisible = false
      },
      rowDblclick(row, column, event) {
        this.$emit('on-complete', [row])
        this.innerVisible = false
      }
    },
    computed: {
      queryFn(){
        if(this.queryDelegate) return this.queryDelegate
        return function(query) {
          const obj = Object.assign({}, query.params, { pageIndex: query.pageIndex, pageSize: query.pageSize })
          const querystring = qs.stringify(obj)
          return request({
            url: this.uri + '?' + querystring,
            method: 'get'
          })
        }.bind(this)
      },
    },
    mounted() {
      this.query()
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
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }
</style>