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
    consultations: [],
    reponse: null,

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

    setResponse(consultationID) {
      const filteredConsultation = this.consultations.filter(consultation => consultation.id == consultationID)[0]
      this.response = filteredConsultation
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

    async updateQuoteRequest(payload, id) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios.put(`${BASE_URL}quote_requests/${id}`, payload)
        let data = await response.data
        if (data) {
          runInAction(() => {
            this.loading = false
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
        runInAction(() => {
          let findProject = this.projects.filter(project => project.id == id)[0]
          this.projectDetails = findProject
        })
        
      } catch(error) {
        console.error(error)
      }
    },

    async getConsultation(id) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}quote_requests/${id}`)
        if (response.data) {
          runInAction(() => {
            this.consultation = response.data
            this.loading = false
          })
        } else {
          throw new Error('impossible de trouver la page demandée')
        }
      } catch(error) {
        runInAction(() => {
          this.hasErrors = true
        })
        console.error(error)
      }
    },

    async getConsultations(id) {
      runInAction(() => {
        this.hasErrors = false
      })
      try {
        let response = await axios(`${BASE_URL}quote_requests`)
        if (response.data) {
          runInAction(() => {
            let myConsultations = response.data.filter(consultation => consultation.attributes.user.id == id)
            this.consultations = myConsultations.map(consultation => consultation.attributes)
          })
        } else {
          throw new Error('impossible de trouver la page demandée')
        }
      } catch(error) {
        runInAction(() => {
          this.hasErrors = true
        })
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
        runInAction(() => {
          this.hasErrors = true
        })
        console.error(error)
      }
    },
  }
}
