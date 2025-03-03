import axios from "axios";

export const baseURL = 'https://upskilling-egypt.com:3006/api/v1';


export const axiosClient = axios.create({
    baseURL,
    headers: { Authorization: localStorage.getItem(`token`) }
});


export const USER_URLS = {
    login: `/users/login`,
    register: `/users/register`,
    forger_pass: `/users/Reset/Request`,
    reset_pass: `/users/Reset`,
    get_user: (id) => `/users/${id}`,
    change_pass: `Users/ChangePassword`
};

export const CATEGORIES_URLS = {
    getCategories: (size, number) => `/Category/?pageSize=${size}&pageNumber=${number}`,
    deleteCategory: (id) => `/Category/${id}`,
    addCategory: `/Category`,
    updateCategory: (id) => `/Category/${id}`
};

export const RECIPES_URLS = {
    getRecipe: (size, number) => `/Recipe/?pageSize=${size}&pageNumber=${number}`,
    deleteRecipe: (id) => `/Recipe/${id}`
};