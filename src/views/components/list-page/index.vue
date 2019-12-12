<template>
  <div>
    <list-layout>
      <template slot="topLeft">
        <el-form :inline="true" :model="queryParams" class="demo-form-inline" size="small">
          <slot name="queryForm"></slot>
          <el-form-item v-if="$slots.queryForm">
            <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="topRight">
        <el-button type="primary" icon="el-icon-plus" size="small" plain @click="handleAdd">新增</el-button>
      </template>
      <template>
        <el-table
          :data="data"
          style="width: 100%"
          size='small'
          stripe
          border
          highlight-current-row
          @row-dblclick="handleView"
        >
          <template v-for="col in columns">
            <el-table-column v-if="col.type=='opt'" label="操作" width="150" :key="col.prop">
              <template slot-scope="scope">
                <el-button
                  v-if="col.actions.indexOf('edit') > -1"
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
                <el-button
                  v-if="col.actions.indexOf('delete') > -1"
                  size="mini"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column 
              v-else-if="col.type=='tag'"
              :label="col.label"
              :key="col.prop"
              :width="col.width">
              <template slot-scope="scope">
                <el-tag :type="col.tagTypes[scope.row[col.prop]]">{{col.tagLabels[scope.row[col.prop]]}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="col.prop"
              :type="col.type"
              :prop="col.prop"
              :label="col.label"
              :width="col.width"
            ></el-table-column>
          </template>
        </el-table>
      </template>
      <template slot="footer">
        <Pagination v-if="isPaging" :total="totalCount" :page.sync="pageIndex" :limit.sync="pageSize" @pagination="handlePaging"></Pagination>
      </template>
    </list-layout>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :fullscreen="dialogFullscreen"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :before-close="closeDialog"
      @closed="dialogClosed"
    >
      <el-form
        ref="modelForm"
        :model="innerModel"
        :rules="modelRules"
        :disabled="action=='view'"
        label-width="100px"
        size="small"
      >
        <slot></slot>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="small">取 消</el-button>
        <el-button type="primary" @click="doSave" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      width="300px"
      :show-close="false"
      :visible.sync="confirmDialogVisible"
      :close-on-click-modal="false"
    >
      <p>你想要保存更改吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="confirmDialogVisible = false;dialogVisible = false" size="small">不保存</el-button>
        <el-button type="primary" @click="confirmDialogVisible = false;doSave()" size="small">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import request from "@/utils/request";
import ListLayout from "@/views/components/list-layout/index";
import Pagination from "@/components/Pagination/index";
export default {
  name: "ListPage",
  components: { ListLayout, Pagination },
  data() {
    return {
      data: [],
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      dialogVisible: false,
      confirmDialogVisible: false,
      innerModel: this.model,
      action: "", // add | view | edit
      modelChanged: false
    };
  },
  props: {
    uri: {
      type: String,
      required: true
    },
    pk: {
      type: String,
      default: "id"
    },
    queryDelegate: Function,
    getDelegate: Function,
    initDelegate: Function,
    addDelegate: Function,
    updateDelegate: Function,
    deleteDelegate: Function,
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
    modelRules: {
      type: Object,
      default: () => {}
    },
    isPaging: {
      type: Boolean,
      default: true
    },
    dialogTitle: {
      type: String,
      default: ""
    },
    dialogWidth: {
      type: String,
      default: "50%"
    },
    dialogFullscreen: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => {}
    },
    loadPage: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    query() {
      const request = {
        params: this.queryParams
      };
      if (this.isPaging) {
        request.pageIndex = this.pageIndex;
        request.pageSize = this.pageSize;
      }
      this.queryFn(request).then(response => {
        const { data } = response;
        if (this.isPaging) {
          this.data = data.list;
          this.totalCount = data.totalCount;
        } else {
          this.data = data;
        }
      });
    },
    handleAdd() {
      this.action = "add";
      this.dialogVisible = true;
      this.initFn().then(response => {
        this.innerModel = Object.assign({}, this.model, response.data);
        this.$nextTick(() => {
          this.modelChanged = false;
        });
      });
    },
    handleView(row, column, event) {
      this.action = "view";
      this.dialogVisible = true;
      this.getFn(row[this.pk]).then(response => {
        if (response.code != 20000) {
          this.$message.error(response.message);
          return;
        }
        this.innerModel = response.data;
        this.$nextTick(() => {
          this.modelChanged = false;
        });
      });
    },
    handleEdit(index, row) {
      this.action = "edit";
      this.dialogVisible = true;
      this.getFn(row[this.pk]).then(response => {
        if (response.code != 20000) {
          this.$message.error(response.message);
          return;
        }
        this.innerModel = response.data;
        this.$nextTick(() => {
          this.modelChanged = false;
        });
      });
    },
    handleDelete(index, row) {
      this.$confirm("确定要删除吗？", "提示").then(() => {
        this.deleteFn(row[this.pk]).then(response => {
          if (response.code != 20000) {
            this.$message.error(response.message);
            return;
          }
          this.$message.success("删除成功");
          this.query();
        });
      });
    },
    handlePaging() {
      this.query()
    },
    closeDialog() {
      // control dialog visible
      if (this.modelChanged) {
        this.confirmDialogVisible = true;
        return;
      }
      this.dialogVisible = false;
    },
    doSave() {
      this.$refs.modelForm.validate(valid => {
        if (valid) {
          if (this.action == "view") {
            this.dialogVisible = false;
            return;
          }
          const promise =
            this.action == "add"
              ? this.addFn(this.innerModel)
              : this.updateFn(this.innerModel);

          promise.then(response => {
            if (response.code != 20000) {
              this.$message.error(response.message);
              return;
            }
            this.$message.success("保存成功");
            this.query();
            this.dialogVisible = false;
          });
        }
      });
    },
    dialogClosed() {
      this.$refs.modelForm.resetFields();
    }
  },
  computed: {
    title() {
      let actionText = "";
      switch (this.action) {
        case "view":
          actionText = "查看";
          break;
        case "add":
          actionText = "新增";
          break;
        case "edit":
          actionText = "修改";
          break;
        default:
          break;
      }
      const star = this.modelChanged ? "*" : "";
      return `${actionText}${this.dialogTitle} ${star}`;
    },
    queryFn() {
      if (this.queryDelegate) return this.queryDelegate;
      return function(query) {
        const obj = Object.assign({}, query.params, {
          pageIndex: query.pageIndex,
          pageSize: query.pageSize
        });
        const querystring = qs.stringify(obj);
        return request({
          url: this.uri + "?" + querystring,
          method: "get"
        });
      }.bind(this);
    },
    getFn() {
      if (this.getDelegate) return this.getDelegate;
      return function(id) {
        return request({
          url: this.uri + "/" + id,
          method: "get"
        });
      }.bind(this);
    },
    initFn() {
      if (this.initDelegate) return this.initDelegate;
      return function() {
        return new Promise(function(resolve, reject) {
          resolve({});
        });
      }.bind(this);
    },
    addFn() {
      if (this.addDelegate) return this.addDelegate;
      return function(model) {
        return request({
          url: this.uri,
          method: "post",
          data: model
        });
      }.bind(this);
    },
    updateFn() {
      if (this.updateDelegate) return this.updateDelegate;
      return function(model) {
        return request({
          url: this.uri,
          method: "put",
          data: model
        });
      }.bind(this);
    },
    deleteFn() {
      if (this.deleteDelegate) return this.deleteDelegate;
      return function(id) {
        return request({
          url: this.uri + "/" + id,
          method: "delete"
        });
      }.bind(this);
    }
  },
  mounted() {
    if (this.loadPage) {
      request({
        url: this.uri + "/_page",
        method: "get"
      }).then(response => {
        this.$emit("on-page-loaded", response.data);
      });
    }
    this.query();
  },
  watch: {
    innerModel: {
      handler: function(newValue) {
        this.$emit("update:model", newValue);
        this.modelChanged = true;
      },
      deep: true
    },
    model(newValue) {
      this.innerModel = newValue;
    }
  }
};
</script>
<style lang="scss" scoped>
  /deep/ .el-form-item {
    margin-bottom: 0px;
  }
</style>