import React from 'react'
import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createProjectStore() {
  return {
    loading: null,
    hasErrors: null,
    projects: [],
    projectDetails: null,
    names: null,
    sent: false,
    latestProject: null,
    created: null,

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
        console.log(data)
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
  }
}
