<script setup></script>

<template>
  <div class="wrapper"></div>
  <router-view name="navbar"></router-view>
  <router-view name="left_sidebar"></router-view>
  <router-view></router-view>
  <router-view name="right_sidebar"></router-view>
  <router-view name="footer"></router-view>
</template>

<style scoped></style>