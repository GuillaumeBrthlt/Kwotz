import React from 'react'
import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createUserProfileStore() {
  return {
    loading: null,
    hasErrors: null,
    profileDetails: {
      company: null,
      address: null,
      zipcode: null,
      city: null,
      role: null,
      first_name: null,
      last_name: null,
      shipping_alias: null,
      shipping_address: null,
      shipping_zipcode: null,
      shipping_city: null,
      phone_number: null
    },

    async createProfile(profileData) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = profileData
      console.log(payload)
      try {
        let response = await axios.post(`${BASE_URL}user_profiles`, payload);
        if (response.status == 201) {
          runInAction (() => {
            this.loading = false
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
