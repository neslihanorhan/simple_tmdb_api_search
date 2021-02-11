// baseUrl: https://api.themoviedb.org/3
// url: https://api.themoviedb.org/3/search/movie?api_key=3c9cf09d3211ac8ca07581b027892310&language=en-US&page=1&include_adult=false
// model-view-controller

import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './base';
import * as searchView from './views/searchView';
import { Movie } from './models/Movie';
import * as movieView from './views/movieView';

const state = {

};

// Search Controller
const searchController = async () => {
    const keyword = elements.searchInput.value;
    if (keyword) {
        state.search = new Search(keyword);

        searchView.clearInput();
        searchView.clearResults();

        renderLoader(elements.movieListContainer);

        await state.search.getResults();
        // console.log(state.search.data);
        
        searchView.displayResults(keyword, state.search.data);

        setTimeout(() => {
            clearLoader(elements.movieListContainer);
        }, 1000);
    } else {
        alert("Anahtar kelime girmelisiniz.");
    }
};

elements.searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    searchController();
    // console.log("form submitted");
});

// Movie Controller

const movieController = async () => {
    const id = window.location.hash.replace('#', ''); 
    // console.log(id);
    if (id) {
        state.movie = new Movie(id);

        renderLoader(elements.movieDetailsContainer);

        await state.movie.getMovie();
        // console.log(state.movie);
        movieView.backToTop();
        movieView.displayMovie(state.movie.data);
        // console.log(state.movie.data);

        setTimeout(() => {
            clearLoader(elements.movieDetailsContainer);
        }, 1000);
    }
};

window.addEventListener('hashchange', movieController);
elements.movieDetailsClose.addEventListener("click", movieView.closeDetails);
