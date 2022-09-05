<template>
  <span class="char" :class="variant" :style="{ left: x, top: y }">
    {{ value }}
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  PropType,
  watchEffect,
} from 'vue'

import { Position } from '../../../types'

type Props = {
  value: string
  variant: string
  position: Position
}

export default defineComponent({
  name: 'InputChar',
  props: {
    value: { type: String, required: true },
    variant: { type: String, required: true },
    position: { type: Object as PropType<Position>, required: true },
  },
  setup(props: Props) {
    const { position } = toRefs(props)
    const x = ref<string>(`${props.position.x * 10}%`)
    const y = ref<string>('-1.5em')
    const down = () => {
      y.value = `${position.value.y * 1.5}em`
    }
    onMounted(() => setTimeout(() => down(), 100))
    watchEffect(() => down())
    return { x, y }
  },
})
</script>

<style lang="scss" scoped>
@use '../../../styles/mixins/index' as m;

.char {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  transition: top 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &.success {
    color: purple;
  }
}
</style>
