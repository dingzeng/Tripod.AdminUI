<template>
  <div class="menu-wrapper">
    <el-submenu ref="subMenu" :index="item.code" popper-append-to-body>
      <template slot="title">
        <item v-if="item.icon" :icon="item.icon" :title="item.name" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
// import path from 'path'
// import { isExternal } from '@/utils/validate'
import Item from './Item'
// import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    findRouter() {
      return {}
    }
  }
}
</script>
