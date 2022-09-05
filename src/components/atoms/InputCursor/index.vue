<template>
  <div class="cursor" :style="{ left: x, top: y }"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, watchEffect, ref } from 'vue'

import { Position } from '../../../types'

type Props = {
  position: Position
}

export default defineComponent({
  name: 'InputCursor',
  props: {
    position: { type: Object as PropType<Position>, required: true },
  },
  setup(props: Props) {
    const { position } = toRefs(props)
    const x = ref<string>('0')
    const y = ref<string>('0')
    watchEffect(() => {
      x.value = `${position.value.x * 10}%`
      y.value = `${position.value.y * 1.5}em`
    })
    return {
      x,
      y,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '../../../styles/mixins/index' as m;

.cursor {
  position: absolute;
  width: 1px;
  height: 1.4em;
  background-color: #000;
  @include m.animation(flush 0.5s steps(2, end) alternate infinite);
}
</style>
