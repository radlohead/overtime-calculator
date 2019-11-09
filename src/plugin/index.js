const plugin = {}

plugin.install = function(Vue, options) {
  ;(Vue.prototype.NumberWithCommas = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }),
    Vue.filter('numberWithCommas', value =>
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    ),
    Vue.directive('focus', {
      inserted: el => el.focus()
    })
}

export default plugin
