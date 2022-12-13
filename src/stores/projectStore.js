import React from 'react'
import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createProjectStore() {
  return {
    loading: null,
    hasErrors: false,
    projects: [],
    projectDetails: null,
    names: null,
    sent: false,
    latestProject: null,
    created: null,
    consultation: null,

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
            this.latestProject = response.data
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

    async sendProject(payload) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios.post(`${BASE_URL}quote_requests`, payload)
        let data = await response.data
        if (data) {
          runInAction(() => {
            this.sent = true
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getProjects() {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}projects`)
        let data = await response.data
        if (data) {
          runInAction(() => {
            this.loading = false
            this.projects = data
            let names = []
            data.map(project => names.push(project.name))
            let uniqueNames = [...new Set(names)]
            this.names = uniqueNames
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getDetails(id) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        await this.getProjects()
        let findProject = this.projects.filter(project => project.id == id)[0]
        this.projectDetails = findProject
      } catch(error) {
        console.error(error)
      }
    },

    async getConsultation(id) {
      runInAction(() => {
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}quote_requests/${id}`)
        if (response.data) {
          runInAction(() => {
            this.consultation = response.data
          })
        } else {
          throw new Error('impossible de trouver la page demandée')
        }
      } catch(error) {
        this.hasErrors = true
        console.error(error)
      }
    },

    async updateProject(id, payload) {
      runInAction(() => {
        this.hasErrors = false
      })
      try {
        let response = await axios.patch(`${BASE_URL}projects/${id}`, payload)
        if (response.data) {
          runInAction(() => {
            this.getDetails(id)
          })
        } else {
          throw new Error('impossible de trouver la page demandée')
        }
      } catch(error) {
        this.hasErrors = true
        console.error(error)
      }
    },
  }
}
