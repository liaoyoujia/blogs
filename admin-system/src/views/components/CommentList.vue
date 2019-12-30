<template>
  <div class="comment-list">
    <template v-if="commentList&&commentList.length">
      <div class="comment-item"
        v-for="(item,index) in commentList"
        :key="index">
        <p>{{item}}</p>
        <el-divider></el-divider>
      </div>
    </template>
  </div>
</template>

<script>
import { reqCommentList } from '@/plugins/axios/index'

export default {
  data () {
    return {
      commentList: []
    }
  },
  mounted () {
    this.initListData()
  },
  methods: {
    async initListData () {
      const res = await reqCommentList()
      if (res.errno === 0) {
        this.commentList = res.data
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-list {
  width: 100%;
  .comment-item {
    width: 100%;
  }
}
</style>
