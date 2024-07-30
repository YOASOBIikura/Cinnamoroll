import cDialog from './index.vue'

cDialog.install = (app) => {
  app.component(cDialog.name, cDialog)
}

export default cDialog