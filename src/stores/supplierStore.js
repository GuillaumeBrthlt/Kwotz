import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createSupplierStore() {
  return {
    loading: null,
    hasErrors: null,
    suppliers: [],
    created: null,
    details: null,

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

    async getSuppliers(id) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}suppliers`)
        let data = await response.data
        if (data) {
          runInAction(() => {
            this.loading = false
            this.suppliers = data.filter(supplier => supplier.user_id == id)
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getDetails(userId, supplierId) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        await this.getSuppliers(userId)
        let supplierDetails = await this.suppliers.filter(supplier => supplier.id == supplierId)[0]
        this.details = supplierDetails
      } catch(error) {
        console.error(error)
      }
    },

    async deleteSupplier(id) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })

      try {
        let response = await axios.delete(`${BASE_URL}suppliers/${id}`);
        if (response.status == 204) {
          runInAction (() => {
            this.loading = false
            this.getSuppliers()
          })
        } else {
          throw new Error('annonce non supprimée')
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