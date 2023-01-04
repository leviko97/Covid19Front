import { defineStore } from 'pinia';
import axios from 'axios';
import {axios_error_print} from "@/helpers/axios_error_print";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        returnUrl: null
    }),
    actions: {
        setToken(token?:string){
            if (!token){
                delete axios.defaults.headers.common['Authorization'];
                localStorage.removeItem('token');
            }else{
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
        fetchUser() {
            let token = localStorage.getItem('token');

            if (!token)
                return;

            this.setToken(token);

            axios.get('/api/auth/user')
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => this.setToken())
        },
        login(data: { email:string, password:string }) {
            axios.post('/api/auth/login', data)
                .then(response => {
                    this.setToken(response.data.token);
                    this.user = response.data.user;

                    this.router.push({name: 'home'})
                })
                .catch(error => axios_error_print(error.response))
        },
        register(data: { name: string, email: string, password: string, password_confirmation: string}){
            axios.post('/api/auth/register', data)
                .then(response => {
                    this.setToken(response.data.token);
                    this.user = response.data.user;

                    this.router.push({name: 'home'})
                })
                .catch(error => axios_error_print(error.response))
        },
        logout() {
            axios.post('/api/auth/logout')
                .then(() => {
                    this.setToken();
                    this.user = null;
                    this.router.push({name: 'login'})
                })
                .catch(() => {
                    this.setToken();
                })

        }
    },
});