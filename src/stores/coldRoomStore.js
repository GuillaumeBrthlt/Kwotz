import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createColdRoomStore() {
  return {
    loading: null,
    hasErrors: null,
    coldRooms: [],
    spareParts: [],

    async getColdRooms() {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}cold_rooms`)
        if (response.data) {
          runInAction(() => {
            this.loading = false
            this.coldRooms = response.data
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getSpareParts() {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}spare_parts`)
        if (response.data) {
          runInAction(() => {
            this.loading = false
            this.spareParts = response.data
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async createColdRoom(payload) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.post(`${BASE_URL}cold_rooms`, payload);
        if (response.status == 201) {
          runInAction (() => {
            this.loading = false
            this.getColdRooms()
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

    async createSparePart(payload) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.post(`${BASE_URL}spare_parts`, payload);
        if (response.status == 201) {
          runInAction (() => {
            this.loading = false
            this.getSpareParts()
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

    async deleteColdRoom(id) {
      
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.delete(`${BASE_URL}cold_rooms/${id}`);
        if (response.status == 204) {
          runInAction (() => {
            this.loading = false
            this.getColdRooms()
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

    async deleteSparePart(id) {
      
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.delete(`${BASE_URL}spare_parts/${id}`);
        if (response.status == 204) {
          runInAction (() => {
            this.loading = false
            this.getSpareParts()
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