import Vue from 'vue'
import Router from 'vue-router'
import HourlyWage from '@/components/HourlyWage'
import DatePicker from '@/components/DatePicker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/datePicker',
      name: 'DatePicker',
      component: DatePicker
    },
    {
      path: '/',
      name: 'HourlyWage',
      component: HourlyWage
    }
  ]
})
