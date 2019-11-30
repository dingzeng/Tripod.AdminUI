<template>
  <div>
    <data-list 
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
          <branch-select></branch-select>
        </el-form-item>
        <el-form-item prop="Username" label="用户名">
          <el-input v-model="model.Username"></el-input>
        </el-form-item>
        <el-form-item prop="Password" label="密码">
          <el-input v-model="model.Password" type="password"></el-input>
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
    </data-list>
  </div>
</template>

<script>
import BranchSelect from '@/views/components/selects/branchSelect'
import DataList from '@/views/components/data-list/index'
export default {
  name: 'SystemUser',
  components: { DataList, BranchSelect },
  data() {
    return {
      queryParams: {},
      columns: [],
      modelRules: {
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
        Status: true
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
