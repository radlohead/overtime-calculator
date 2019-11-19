import Vue from 'vue'
import HourlyWage from '@/components/HourlyWage.vue'

describe('HourlyWage.vue', () => {
  it('Function numberWithCommas', () => {
    const Constructor = Vue.extend(HourlyWage)
    const vm = new Constructor().$mount()

    expect(vm.numberWithCommas(1000)).toBe('1,000')
    expect(vm.numberWithCommas(10000)).toBe('10,000')
    expect(vm.numberWithCommas(1000000)).toBe('1,000,000')
  })
})
