import { defineStore } from 'pinia'

export const useYear = defineStore('storeYear', {
  state: () => ({
  d: new Date()
  }),
actions: {
presentYear(){
this.d.getFullYear()
}
}
})
