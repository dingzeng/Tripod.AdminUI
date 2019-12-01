<template>
  <div>
    <list-page
      uri="/system/user"
      dialogTitle="用户"
      dialogWidth="500px"
      :columns="columns" 
      :modelRules="modelRules"
      :model.sync="model">
      <template slot="queryForm">
        <el-form-item prop='keyword'>
          <el-input v-model="queryParams.keyword" placeholder="用户名、手机号、姓名"></el-input>
        </el-form-item>
      </template>
      <template>
        <el-form-item prop="BranchCode" label="所属机构">
          <ref-input type="branch" v-model="model.BranchCode" :label.sync="model.BranchName"></ref-input>
        </el-form-item>
        <el-form-item prop="Username" label="用户名">
          <el-input v-model="model.Username"></el-input>
        </el-form-item>
        <el-form-item prop="Password" label="密码">
          <el-input v-model="model.Password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="Name" label="姓名">
          <el-input v-model="model.Name"></el-input>
        </el-form-item>
        <el-form-item prop="Mobile" label="手机号">
          <el-input v-model="model.Mobile"></el-input>
        </el-form-item>
        <el-form-item prop="Status" label="状态">
          <el-switch v-model="model.Status"></el-switch>
        </el-form-item>
      </template>
    </list-page>
  </div>
</template>

<script>
import RefInput from '@/views/components/ref-input/index'
import ListPage from '@/views/components/list-page/index'
export default {
  name: 'SystemUser',
  components: { ListPage, RefInput },
  data() {
    return {
      queryParams: {},
      columns: [],
      modelRules: {
        BranchCode: [
          { required: true, message: '请选择用户所属机构', trigger: 'blur' }
        ],
        Username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      model: {
        Status: true,
        BranchCode: '',
        BranchName: ''
      }
    }
  },
  methods: {
    
  },
  created(){
    this.columns = [
      {
        type: 'selection',
        width: 55
      },{
        prop: 'Id',
        label: '编码',
        width: 100
      },{
        prop: 'Username',
        label: '用户名',
        width: 150
      },{
        prop: 'Name',
        label: '姓名',
        width: 150
      },{
        prop: 'Mobile',
        label: '手机号',
        width: 200
      },{
        prop: 'Status',
        label: '状态'
      },{
        type: '_opt',
        label: '操作',
        width: 150,
        actions: ['edit','delete']
      }
    ]
  }
}
</script>>
