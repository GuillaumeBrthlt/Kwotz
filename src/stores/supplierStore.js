import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createSupplierStore() {
  return {
    loading: null,
    hasErrors: null,
    supplierData: {
      alias: null,
      address: null,
      city: null,
      zipcode: null,
      favorite: false
    },
    created: null,

    async createSupplier(supplierData) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = supplierData
      try {
        let response = await axios.post(`${BASE_URL}suppliers`, payload);
        if (response.status == 201) {
          runInAction (() => {
            this.loading = false
            this.created = true
          })
        } else {
          throw new Error('informations non valides')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },
  }
}