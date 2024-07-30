import cButton from './button/index.js'
import cInput from './input/index.js'
import cCarousel3D from './carousel3D/index.js'
import cDialog from './dialog/index.js'

const install = (app) => {
  app
    .use(cDialog)
    .use(cButton)
    .use(cInput)
    .use(cCarousel3D)

}

const Cinnamoroll = {
  install,
}

export {
  cButton
}

export default Cinnamoroll