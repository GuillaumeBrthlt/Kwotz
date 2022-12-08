import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createColdRoomStore() {
  return {
    loading: null,
    hasErrors: null,
    coldRoom: {
      name: null,
      temperature: null,
      condensing_unit: null,
      prod_outside: null,
      refrigerant_type: null,
      length: null,
      width: null,
      height: null,
      volume: null,
      product_types: null,
      entries_frequency: null,
      entries_quantity: null,
      heat_sources_power: null,
      heat_sources: null,
      comment: null,
      project_id: null
    },
    created: null,

    async createColdRoom(profileData) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = profileData
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