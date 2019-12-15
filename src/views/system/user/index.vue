<template>
  <div>
    <list-page
      loadPage
      uri="/system/user"
      dialogTitle="用户"
      dialogWidth="500px"
      :columns="columns"
      :modelRules="modelRules"
      :model.sync="model"
      @on-page-loaded="pageLoaded"
    >
      <template slot="queryForm">
        <el-form-item prop="keyword">
          <el-input v-model="queryParams.keyword" placeholder="用户名、手机号、姓名"></el-input>
        </el-form-item>
      </template>
      <template>
        <el-form-item prop="branchId" label="所属机构">
          <ref-input type="branch" v-model="model.branchId" :label.sync="model.branchName"></ref-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="model.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="model.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-switch v-model="model.status"></el-switch>
        </el-form-item>
        <el-form-item prop="roles" label="角色">
          <el-select multiple v-model="model.roles" placeholder="清选择">
            <el-option
              v-for="option in page.roles"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </list-page>
  </div>
</template>

<script>
import RefInput from "@/views/components/ref-input/index";
import ListPage from "@/views/components/list-page/index";
export default {
  name: "SystemUser",
  components: { ListPage, RefInput },
  data() {
    return {
      queryParams: {},
      columns: [],
      modelRules: {
        branchId: [
          { required: true, message: "请选择用户所属机构", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      model: {},
      page: {}
    };
  },
  methods: {
    pageLoaded(page) {
      this.page = page;
    }
  },
  created() {
    this.columns = [
      {
        type: "selection",
        width: 55
      },
      {
        prop: "id",
        label: "编码",
        width: 100
      },
      {
        prop: "username",
        label: "用户名",
        width: 150
      },
      {
        prop: "name",
        label: "姓名",
        width: 150
      },
      {
        prop: "mobile",
        label: "手机号",
        width: 200
      },
      {
        prop: "status",
        type: "tag",
        label: "状态",
        tagTypes: {
          0: 'info',
          1: 'success'
        },
        tagLabels: {
          0: '禁用',
          1: '启用'
        }
      }
    ];
  }
};
</script>>
