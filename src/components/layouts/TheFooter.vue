<template>
  <div class="footer_wrap">
    <footer>
      © {{ year }} Pordle, developed by <a href="https://twitter.com/milmemo_net">@mirumi</a>.<span class="mobile_none"> Source code is <a href="https://github.com/mirumirumi/pordle">here</a>.</span>
      <!-- https://github.com/mirumirumi?tab=repositories&q=pordle&type=&language=&sort=name -->
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
.footer_wrap {
  footer {
    width: 100%;
    max-width: 1000px;
    height: 30px;
    margin: auto;
    padding: 5px 0 5px;
    color: #59595f;
    font-size: 0.87em;
    text-align: center;
    border-top: solid 1px #59595f;
    a {
      color: #59595f;
    }
  }
}
</style>
