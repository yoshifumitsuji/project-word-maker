<template>
  <div class="cursor"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputCursor',
})
</script>

<style lang="scss" scoped>
@use '../../../styles/mixins/index' as m;
@use '../../../styles/animations/flush';

.cursor {
  width: 1px;
  height: 1em;
  background-color: #000;
  @include m.animation(flush 0.5s steps(2, end) alternate infinite);
}
</style>
