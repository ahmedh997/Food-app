export const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";
export const IMAGE_URL = "https://upskilling-egypt.com:3006";



export const USERS_ENDPOINTS = {
    LOGIN: `/users/login`,
    REGISTER: `/users/register`,
    VERIFY: `/users/verify`,
    FORGET_REQUEST: `/users/Reset/Request`,
    RESET: `/users/Reset`,
    GET_USERS: `/users`,
    DELETE_USER: (id) => `/users/${id}`,
    CHANGE_PASSWORD: `/Users/ChangePassword`
};

export const CATEGORIES_ENDPOINTS = {
    GET_CATEGORIES: () => `/Category/`,
    GET_CATEGORY_BY_ID: (id) => `/Category/${id}`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,
    UPDATE_CATEGORY: (id) => `/Category/${id}`,
    ADD_CATEGORY: `/Category`,
};

export const RECIPES_ENDPOINTS = {
    GET_RECIPES: () => `/Recipe/`,
    GET_RECIPE_BY_ID: (id) => `/Recipe/${id}`,
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
    UPDATE_RECIPE: (id) => `/Recipe/${id}`,
    ADD_RECIPE: `/Recipe`,
};


export const FAVORITES_ENDPOINTS = {
    GET_FAVORITES: `/userRecipe`,
    ADD_FAVORITES: `/userRecipe`,
    DELETE_FAVORITES: (id) => `/userRecipe/${id}`,
};