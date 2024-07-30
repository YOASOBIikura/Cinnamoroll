import cDrawer from './index.vue'

cDrawer.install = (app) => {
  app.component(cDrawer.name, cDrawer)
}

export default cDrawer