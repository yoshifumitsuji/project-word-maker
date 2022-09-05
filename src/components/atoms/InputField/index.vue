<template>
  <div class="frame">
    <div class="input">
      <InputCursor ref="cursor" :position="{ x: position.x, y: position.y }" />
      <div
        v-for="({ value, position: { x, y } }, i) in chars"
        :key="i"
        class="char"
      >
        <InputChar :value="value" :variant="'default'" :position="{ x, y }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Position, Char, CHARS } from '../../../types'
import InputChar from '../InputChar/index.vue'
import InputCursor from '../InputCursor/index.vue'

const LEN = 50
const initialValues: Char[] = CHARS.flatMap((_, x) =>
  CHARS[x].map((_, y) => {
    return {
      value: CHARS[x][y],
      position: { x, y },
      disabled: false,
    }
  })
)

export default defineComponent({
  name: 'InputField',
  components: { InputCursor, InputChar },
  setup() {
    const cursor = ref<HTMLDivElement>()
    const position = ref<Position>({ x: 0, y: 0 })
    const chars = ref<Char[]>(initialValues)

    function move(direction: 'x' | 'y', distance: number) {
      if (!cursor.value) return
      position.value[direction] = distance
    }

    function fall() {
      const blanks = chars.value.filter((it) => !it.disabled && !it.value)
      const targets = blanks.flatMap((b) =>
        chars.value.filter(
          ({ position: { x, y }, disabled }) =>
            !disabled && x === b.position.x && y < b.position.y
        )
      )
      targets.forEach((t) => (t.position.y = t.position.y + 1))
      blanks.forEach((it) => {
        it.disabled = true
      })

      const isReload = chars.value.filter((e) => !e.disabled).length < LEN
      if (!isReload) return

      chars.value.push({
        value: 'X',
        position: { x: position.value.x, y: 0 },
        disabled: false,
      })
    }

    function erase(x: number, y: number) {
      const char = chars.value.find(
        (c) => !c.disabled && c.position.x === x && c.position.y === y
      )

      if (!char) return
      char.value = ''
    }

    function keydown(event: any) {
      if (!event.ctrlKey) return

      switch (event.key) {
        case 'p':
          move('y', position.value.y - 1)
          break
        case 'n':
          move('y', position.value.y + 1)
          break
        case 'f':
          move('x', position.value.x + 1)
          break
        case 'b':
          move('x', position.value.x - 1)
          break
        case 'h':
          erase(position.value.x - 1, position.value.y)
          move('x', position.value.x - 1)
          break
        case 'd':
          erase(position.value.x, position.value.y)
          break
        default:
          break
      }

      fall()
    }

    document.addEventListener('keydown', keydown)

    return {
      chars,
      cursor,
      position,
    }
  },
})
</script>

<style lang="scss" scoped>
.frame {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 1em;
  overflow: hidden;
  border: 1px solid #ccc;
}

.input {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 50px;
}
</style>
