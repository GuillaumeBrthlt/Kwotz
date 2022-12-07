import React from 'react'
import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createProjectStore() {
  return {
    loading: null,
    hasErrors: null,
    projectDetails: {
      name: null
    },

    async createProject(projectData) {

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = projectData
      try {
        let response = await axios.post(`${BASE_URL}projects`, payload);
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
