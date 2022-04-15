<template>
  <div class="app-container">用户管理</div>
</template>

<script>
import { getUserList } from '@/api/system/user'

export default {
  name: 'User',
  data () {
    return {
      queryParams: {
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  mounted () {
    // this.initList()
  },
  methods: {
    initList () {
      getUserList(this.queryParams).then(res => {
        console.log(res);
      })
    }
  }
}
</script>