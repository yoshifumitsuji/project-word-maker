import InputCursor from './index.vue'

export default {
  component: InputCursor,
  args: {
    position: { x: 0, y: 0 },
  },
  decorators: [
    () =>
      '<div style="font-size: 50px; padding-left: 1em;"><div style="position: relative;"><story /></div></div>',
  ],
}

export const Default = {}
