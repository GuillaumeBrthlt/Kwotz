import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createColdRoomStore() {
  return {
    loading: null,
    hasErrors: null,
    coldRooms: [],
    created: null,

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