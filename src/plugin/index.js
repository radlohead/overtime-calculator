const plugin = {}

plugin.install = function(Vue, options) {
  ;(Vue.prototype.NumberWithCommas = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }),
    Vue.filter('numberWithCommas', value =>
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    )
}

export default plugin
