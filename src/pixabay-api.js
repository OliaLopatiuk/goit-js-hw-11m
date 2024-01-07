import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class PixabayAPIService {
    constructor() {
this.searchQuery='';
this.page = 1;
this.maxPage = 0;
    }

    async fetchPhotos() {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '41313462-a1bd1fc2b4382ed7475f290bb';
        const options = 'image_type=photo&orientation=horizontal&safesearch=true'

        // axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${options}&page=${this.page}&per_page=20`).then(r => {console.log(r.data)}).then(data => {
        //     this.incrementPage()
        //     this.maxPage = Math.ceil(data.totalHits/20) + 1;
        //     return data})
        
        // this.incrementPage()
        // this.maxPage = Math.ceil(data.totalHits/20) + 1;
        return axios
        .get(`?key=${API_KEY}&q=${this.searchQuery}&${options}&page=${this.page}&per_page=20`)
        .then(res => res.data)
        .catch(err => console.log(err));

    //    return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${options}&page=${this.page}&per_page=20`)
    //     .then(r => r.json()).then(data => {
    //         this.incrementPage()
    //         this.maxPage = Math.ceil(data.totalHits/20) + 1;
    //         return data})
    }

    get query() {
    return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}