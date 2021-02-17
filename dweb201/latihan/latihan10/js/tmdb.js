const key = '7f697b5006b4ceaeaf851530192f5983'; //sesuai API Key Anda
const endpoint_url = 'https://api.themoviedb.org/3';

$(document).ready(() => {
    $('#searchForm').on('input', (e) => {

        let searchText = $('#searchText').val();

        if (searchText == null) {
            console.log(true);
        }

        getMovies(searchText);
        e.preventDefault();
    })
})

function movieSelected(id) {
    sessionStorage.setItem('id', id);
    window.location = 'movie.html';
    return false;
}

function getListMovie(services, sectiontitle) {
  fetch(endpoint_url + services + "?api_key=" + key + "&language=en-US&page=1")
    .then(status)
    .then(json)
    .then(function(data) {
      //objek atau array Javascript dari response.json() masuk lewat data
      //Menyusun komponen card movie secara dinamis
      var moviesHTML = "";
      data.results.forEach(function(movie) {
        moviesHTML += `
            <div class="col m3 s6">
              <div class="card">
                <a href="./movie.html?id=${movie.id}" onclick="movieSelected('${movie.id}')">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
                  </div>
                </a>
                <div class="card-content text-center warna-huruf2">
                  <strong>${movie.title}</strong><br>
                  <strong><p>Released: ${movie.release_date}</p></strong>
                  <strong><p>Rating: ${movie.vote_average} / 10</p></strong>
                </div>
              </div>
            </div>
            `;
      });
      document.getElementById("movie_list").innerHTML = moviesHTML;
      document.getElementById("section_title").innerHTML = sectiontitle;
    })
    .catch(error);
}

//
// function getMovie(movie_id){
// fetch(endpoint_url2 + movie_id + "?api_key=" + key + "&language=en-US")
//  .then(status)
//  .then(json)
//  .then(function(output) {
//   var detail = "";
// let date = output.release_date;
//   let year = date.slice(0, 4);
// let Rated;
//  let revenue = output.revenue / 1000000;
//  let budget = output.budget / 1000000;
// revenue = Math.round(revenue);
//  budget = Math.round(budget);
//
//  if (revenue === 0) {
//  revenue = "Revenue is less than million dollars"
//  }
//
// if (budget === 0) {
//  budget = "Budget is less than million dollars"
//  }
//   let genre = [];
//   output.genres.forEach(element => {
//    genre.push(element.name);
//   });
//   let company = [];
//          output.production_companies.forEach(element => {
//                 company.push(element.name);
//            });
//
//              let country = [];
//              output.production_countries.forEach(element => {
//                country.push(element.name);
//              });
//
//                let language = [];
//              output.spoken_languages.forEach(element => {
//                language.push(element.name);
//              });
//
//              genres = genre.join(' / ');
//               companies = company.join(' / ');
//               countries = country.join(' / ');
//                languages = language.join(' / ');
//
//   detail += `
//   <div class="row">
//                <div class="col s12 m6 l4">
//                       <img src="https://image.tmdb.org/t/p/w500${output.poster_path}" class="poster-image" style="height:450px;width:280px;">
//               </div>
//
//                <div class="col s12 m6 l8 warna-huruf2">
//                     <h4 class="movie-title" style="margin-top:10px; font-weight:bold">${output.title}</h4>
//                    <h5>${output.tagline}</h5>
//                     <h5>${year}</h5>
//                      <h5 style="margin-top: -10px;">${genres}</h5>
//
//                       <strong class="warna-huruf">Status: </strong> ${output.status} <br>
//                       <strong class="warna-huruf">Released Date: </strong> ${output.release_date} <br>
//                       <strong class="warna-huruf">Rating: </strong> ${output.vote_average} / 10 <br>
//                     <strong class="warna-huruf">Duration: </strong> ${output.runtime} min <br>
//                     <strong class="warna-huruf">Language: </strong> ${languages} <br>
//                       <strong class="warna-huruf">Budget: </strong> $ ${budget} million <br>
//                      <strong class="warna-huruf">Revenue: </strong> $ ${revenue} million <br>
//                     <strong class="warna-huruf">Popularity: </strong> ${output.popularity} <br>
//                       <strong class="warna-huruf">Production Companies: </strong> ${companies} <br>
//                       <strong class="warna-huruf">Production Countries: </strong> ${countries} <br>
//                     <strong class="warna-huruf">Homepage: </strong><a href="${output.homepage}" style="color:blue;font-weight:bold;">${output.homepage}</a>
//
//                  </div>
//              </div>
//
//
// `
// let output2 = `
//           <div class="col s12 warna-huruf2">
//                <h3 class="title-second">Synopsis</h3>
//                <p>${output.overview}</p>
//              </div>
//              `
//
//       document.getElementById("movie_detail").innerHTML = detail;
//       document.getElementById("synopsis").innerHTML = output2;
// })
//
//   .catch(error);
//
// }

function getMovie() {
    let movieId = sessionStorage.getItem('id');

    //test id -> 299536
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7f697b5006b4ceaeaf851530192f5983`)
        .then((response) => {
            // https://api.themoviedb.org/3/movie/299536/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1
            console.log(response);
            let moviel = response.data;

            if (moviel.poster_path === null) {
                poster = "../img/default-movie.png";
            } else {
                poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviel.poster_path;
            }

            let date = moviel.release_date;

            let year = date.slice(0, 4);
            let Rated;

            let revenue = moviel.revenue / 1000000;
            let budget = moviel.budget / 1000000;
            revenue = Math.round(revenue);
            budget = Math.round(budget);

            if (revenue === 0) {
                revenue = "Revenue is less than million dollars";
            } else {
              revenue = revenue + " million";
            }

            if (budget === 0) {
                budget = "Budget is less than million dollars"
            } else {
                budget = budget + " million";
            }

            let genre = [];
            moviel.genres.forEach(element => {
                genre.push(element.name);
            });

            let company = [];
            moviel.production_companies.forEach(element => {
                company.push(element.name);
            });

            let country = [];
            moviel.production_countries.forEach(element => {
                country.push(element.name);
            });

            let language = [];
            moviel.spoken_languages.forEach(element => {
                language.push(element.name);
            });

            genres = genre.join(' / ');
            companies = company.join(' / ');
            countries = country.join(' / ');
            languages = language.join(' / ');

            let output1 = `
            <div class="row">
                <div class="col s12 m6 l4">
                    <img src="${poster}" class="poster-image" style="height:450px;width:280px;">
                </div>

                <div class="col s12 m6 l8 warna-huruf2">
                    <h4 class="movie-title" style="margin-top:10px; font-weight:bold">${moviel.title}</h4>
                    <h5><i>${moviel.tagline}</i></h5>
                    <h5>${year}</h5>
                    <h5 style="margin-top: -10px;">${genres}</h5>

                    <strong class="warna-huruf">Status: </strong> ${moviel.status} <br>
                    <strong class="warna-huruf">Released Date: </strong> ${moviel.release_date} <br>
                    <strong class="warna-huruf">Rating: </strong> ${moviel.vote_average} / 10 <br>
                    <strong class="warna-huruf">Duration: </strong> ${moviel.runtime} min <br>
                    <strong class="warna-huruf">Language: </strong> ${languages} <br>
                    <strong class="warna-huruf">Budget: </strong> $ ${budget}  <br>
                    <strong class="warna-huruf">Revenue: </strong> $ ${revenue} <br>
                    <strong class="warna-huruf">Popularity: </strong> ${moviel.popularity} <br>
                    <strong class="warna-huruf">Production Companies: </strong> ${companies} <br>
                    <strong class="warna-huruf">Production Countries: </strong> ${countries} <br>
                    <strong class="warna-huruf">Homepage: </strong><a href="${moviel.homepage}" style="color:blue;font-weight:bold;">${moviel.homepage}</a>

                </div>
            </div>
            `

            let output2 = `
            <div class="col s12 warna-huruf2">
                <p>${moviel.overview}</p>
            </div>
            `

            $('#movie_detail').html(output1);
            $('#synopsis').html(output2);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getMovies(searchText) {

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=7f697b5006b4ceaeaf851530192f5983&query=' + searchText)
        //  axios.get('http://www.omdbapi.com/?apikey=a15bc27e&s=' + searchText)
        .then((response) => {
            console.log(response);

            let movies = response.data.results;
            let output = '';
            let output1 = '';
            $.each(movies, (index, movie) => {

                if (movie.poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path;
                }

                let date = movie.release_date;

                let year = date.slice(0, 4);
                output += `
                <div class="col m3 s6">
                  <div class="card">
                    <a href="./movie.html?id=${movie.id}" onclick="movieSelected('${movie.id}')">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
                      </div>
                    </a>
                    <div class="card-content text-center warna-huruf2">
                      <strong>${movie.title}</strong><br>
                      <strong><p>Released: ${movie.release_date}</p></strong>
                      <strong><p>Rating: ${movie.vote_average} / 10</p></strong>
                    </div>
                  </div>
                </div>
                `
            });
            $('#search_result').html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getReviews() {

    let movieId = sessionStorage.getItem('id');
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1`)

        .then((response) => {
            // https://api.themoviedb.org/3/movie/299536/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1
            console.log(response);
            let reviews = response.data.results;
            console.log(reviews);
            let output = '';

            $.each(reviews, (index, review) => {
                output += `
                        <div class="row">
                        <ul class="collection">
                          <li class="collection-item avatar">
                          <img src="../img/default-user.png" alt="user" class="circle">
                          <p>
                              <div class="col-md-10 box-review2">
                                  <h5>Reviewed by ${review.author}</h5>
                                  <div class="content">
                                      <p style="color:#000;">${review.content}</p>
                                      <a href="${review.url}" style="color:blue;">${review.url}</a>
                                  </div>
                              </div>
                          </p>
                          </li>
                        </ul>
                    </div>
                `
            });
            $('#reviews').html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getCredits() {
    let movieId = sessionStorage.getItem('id');

    //test id -> 299536
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7f697b5006b4ceaeaf851530192f5983&language=en-US`)
        .then((response) => {
            // https://api.themoviedb.org/3/movie/299536/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1
            console.log(response);
            let credit = response.data;

            let casts = [];
            credit.cast.forEach(element => {
                casts.push(element.name);
            });

            let crews = [];
            credit.crew.forEach(element => {
                crews.push(element.name);
            });

            castses = casts.join(' , ');
            crewed = crews.join(' , ');

            let output3= `
              <span>${castses}</span>
            `

            let output4= `
              <span>${crewed}</span>
            `

            $('#cast').html(output3);
            $('#crew').html(output4);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getTrailer() {

    let movieId = sessionStorage.getItem('id');
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US`)

        .then((response) => {
            // https://api.themoviedb.org/3/movie/299536/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1
            console.log(response);
            let videos = response.data.results;
            console.log(videos);
            let output5 = '';

            $.each(videos, (index, video) => {

                output5 += `
                    <iframe width="450" height="300" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>

                `
            });
            $('#trailer').html(output5);
        })
        .catch((error) => {
            console.log(error);
        });
}
