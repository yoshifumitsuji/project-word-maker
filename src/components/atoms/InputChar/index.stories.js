import InputChar from './index.vue'

export default {
  component: InputChar,
  args: {
    value: 'あ',
    position: { x: 0, y: 0 },
    disabled: false,
  },
  decorators: [() => '<div style="font-size: 50px;"><story /></div>'],
}

export const Default = {
  args: {
    variant: 'default',
  },
}

export const Success = {
  args: {
    variant: 'success',
  },
}
