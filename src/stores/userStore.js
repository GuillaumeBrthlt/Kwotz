import Cookies from 'js-cookie'
import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createUserStore() {
  return {
    auth_token: null,
    user: {
      id: null,
      username: null,
      email: null,
      has_profile: false
    },
    loading: true,
    hasErrors: false,
    authenticated: false,
    tokenOutdated: false,

    has_profile() {
      this.user.has_profile= true
    },

    async register(payload) {
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.post(`${BASE_URL}users`, payload);
        if (response.data.user) {
          runInAction (() => {
            this.authenticated = true
            this.loading = false
            this.auth_token = response.headers.authorization;
            this.user = response.data.user
            axios.defaults.headers.common["Authorization"] = this.auth_token
            Cookies.set('authToken', this.auth_token)
          })
        } else {
          throw new Error('invalid password or email')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },

    noLogin() {
      this.loading = false
    },

    async loginUser(payload) {
      runInAction (() => {
        this.loading = true
        this.tokenOutdated = false
        this.hasErrors = false
      })

      try {
        let response = await axios.post(`${BASE_URL}users/sign_in`, payload);
        if (response.data.user) {
          runInAction (() => {
            this.authenticated = true
            this.auth_token = response.headers.authorization;
            this.user = response.data.user
            axios.defaults.headers.common["Authorization"] = this.auth_token
            Cookies.set('authToken', this.auth_token)
            this.loading = false
          })
        } else {
          throw new Error('invalid password or email')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },

    async logoutUser() {
      const config = {
        headers: {
          authorization: this.auth_token
        }
      }

      try {
        await axios.delete(`${BASE_URL}users/sign_out`, config)
        runInAction(() => {
          this.user = {
            id: null,
            username: null,
            email: null,
            has_profile: null
          };
          this.tokenOutdated = false
          this.auth_token = null;
          this.authenticated = false;
          Cookies.remove("authToken");
          axios.defaults.headers.common["Authorization"] = null;
        })
      } catch(error) {
        console.error(error)
      }
    },

    async loginUserWithToken(payload) {
      runInAction (() => {
        this.hasErrors = false
      })
      const config = {
        headers: {
          Authorization: payload
        }
      };

      try {
        let response = await axios.get(`${BASE_URL}member-data`, config)
        if (response.data.user) {
          runInAction(() => {
            this.authenticated = true
            this.loading = false
            this.tokenOutdated = false
            this.user = response.data.user;
            this.auth_token = Cookies.get('authToken');
            axios.defaults.headers.common["Authorization"] = this.auth_token
          })
        } else {
          throw new Error(response.statusText)
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false
          this.tokenOutdated = true
        })
      } 
    },

    async validateEmail(token) {
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })

      try {
        let response = await axios.get(`${BASE_URL}users/confirmation?confirmation_token=${token}`)
        if (response.statusText === "OK") {
          runInAction(() => {
            this.hasErrors = false
            this.loading = false
          })
        } else {
          throw new Error(response.statusText)
        }
      } catch (error) {
        runInAction(() => {
          this.hasErrors = true
          this.loading = false
        })
      } 
    },

    async editPassword(payload) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })

      try {
        let response = await axios.put(`${BASE_URL}users/`, payload)
        if (response.statusText === "OK") {
          runInAction(()=> {
            this.loading = false
            this.hasErrors = false
          })
        } else {
          throw new Error(response.statusText)
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    }
  }
}
