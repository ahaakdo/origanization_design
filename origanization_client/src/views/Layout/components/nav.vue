<template>
  <nav class="top-nav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 -->
        <li><a href="javascript:;"><i class="iconfont icon-yonghu"></i>aaa</a></li>
        <li>
          <el-popconfirm @confirm="confirm" title="确认退出吗？" confirm-button-text="确认" cancel-button-text="取消">
            <template #reference>
              <a href="javascript:;">退出登录</a>
            </template>
          </el-popconfirm>
        </li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.top-nav {
  background-color: #333;

  ul {
    display: flex;
    height: 28px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 30px;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: #e6b7b7;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>