const key = '7f697b5006b4ceaeaf851530192f5983'; //sesuai API Key Anda
const endpoint_url = 'https://api.themoviedb.org/3';
const endpoint_url2 = 'https://api.themoviedb.org/3/movie/';


function getListMovie(services, sectiontitle) {
  fetch(endpoint_url + services + "?api_key=" + key + "&language=en-US&page=1")
    .then(status)
    .then(json)
    .then(function(data) {
      //objek atau array Javascript dari response.json() masuk lewat data
      //Menyusun komponen card movie secara dinamis

      var moviesHTML = "";
      data.results.forEach(function(movie) {

        let date = movie.release_date;
        let d = new Date(date);
        let tanggal = d.getDate();
        let bulan = d.toLocaleString('en-us', {month:'long'});
        let tahun = d.getFullYear();
        let dateStr = bulan + " " + tanggal + ", " + tahun;

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
                  <strong>Released: ${dateStr} </strong><br>
                  <strong class="${getClassByRate(movie.vote_average)}">
                    <p>
                      <span class="warna-huruf2">Rating: </span>${movie.vote_average}
                      <span class="warna-huruf2">of </span>
                      <span style="color:green;">10 </span>
                      <span><i class="material-icons star">star_rate</i></span>
                    </p>
                  </strong>
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

function getMovie(movie_id){
  fetch(endpoint_url2 + movie_id + "?api_key=" + key + "&language=en-US")
    .then(status)
    .then(json)
    .then(function(output) {

      var detail = "";
      let date = output.release_date;
      let year = date.slice(0, 4);
      let time = output.runtime;
      let convert_time = Math.floor(time / 60) + 'h ' + time % 60 + 'min';

      let d = new Date(date);
      let tanggal = d.getDate();
      let bulan = d.toLocaleString('en-us', {month:'long'});
      let tahun = d.getFullYear();
      let dateStr = bulan + " " + tanggal + ", " + tahun;

      let revenue = output.revenue;
			revenue = new Intl.NumberFormat('de-DE').format(revenue);

      let budget = output.budget;
			budget = new Intl.NumberFormat('de-DE').format(budget);

      // let revenue = output.revenue / 1000000;
      // let budget = output.budget / 1000000;
      // revenue = Math.round(revenue);
      // budget = Math.round(budget);

      // if (revenue === 0) {
      //     revenue = "Revenue is less than million dollars";
      // } else {
      //     revenue = revenue + " million";
      // }

      // if (budget === 0) {
      //     budget = "Budget is less than million dollars"
      // } else {
      //     budget = budget + " million";
      // }

      let genre = [];
      output.genres.forEach(element => {
        genre.push(element.name);
      });

      let company = [];
      output.production_companies.forEach(element => {
        company.push(element.name);
      });

      let country = [];
      output.production_countries.forEach(element => {
        country.push(element.name);
      });

      let language = [];
      output.spoken_languages.forEach(element => {
        language.push(element.name);
      });

      genres = genre.join(', ');
      companies = company.join(' / ');
      countries = country.join(' / ');
      languages = language.join(' / ');

      detail += `
              <div class="row">
                <div class="col s12 m6 l4">
                    <img src="https://image.tmdb.org/t/p/w500${output.poster_path}" class="poster-image" style="height:500px;width:290px;">
                </div>

                 <div class="col s12 m6 l8 warna-huruf2">
                    <h4 class="movie-title" id="in" style="margin-top:10px; font-weight:bold">${output.title} (${year})</h4>
                    <h5 id="in2"><i>${output.tagline}</i></h5>
                    <h6 style="margin-left:-1px;">${genres}</h6>

                    <div style="margin-top:15px;">
                      <strong class="warna-huruf">Cast: </strong> <strong>${castses}</strong> <br>
                      <strong class="warna-huruf">Crew: </strong> <strong>${crewed}</strong> <br>
                      <strong class="warna-huruf">Status: </strong> <strong>${output.status}</strong> <br>
                      <strong class="warna-huruf">Release Date: </strong> <strong>${dateStr}</strong> <br>
                      <strong class="warna-huruf">Rating: </strong> <strong>${output.vote_average} of 10 <i class="material-icons star">star_rate</i> (${output.vote_count} votes) </strong><br>
                      <strong class="warna-huruf">Duration: </strong> <strong>${convert_time} </strong><br>
                      <strong class="warna-huruf">Language: </strong> <strong>${languages} </strong><br>
                      <strong class="warna-huruf">Budget: </strong> <strong> $ ${budget}</strong><br>
                      <strong class="warna-huruf">Revenue: </strong> <strong> $ ${revenue}</strong> <br>
                      <strong class="warna-huruf">Production Companies: </strong> <strong>${companies}</strong> <br>
                      <strong class="warna-huruf">Production Countries: </strong> <strong>${countries}</strong> <br>
                      <strong class="warna-huruf">Homepage: </strong> <a href="${output.homepage}" style="color:blue;font-weight:bold;">${output.homepage}</a>
                      <br>
                      <a class="btn" href="https://www.themoviedb.org/movie/${output.id}" target="_blank">More on TMDb</a>
                    </div>
                </div>
             </div>
             `
      let output1 = `
                    <div class="parallax">
                    <img src="https://image.tmdb.org/t/p/original${output.backdrop_path}"
                         srcset="https://image.tmdb.org/t/p/w300${output.backdrop_path} 300w,
                                 https://image.tmdb.org/t/p/w780${output.backdrop_path} 780w,
                                 https://image.tmdb.org/t/p/w1280${output.backdrop_path} 1280w"
                         size="100vw"
                         alt="${output.title}"
                         style="transform: translate3d(-50%, 0px, 0px);opacity: 1;width: 100%;height:100%;object-position: top;
                                display: block;object-fit:cover;"
                    >
                    </div>`

      let output2 = `
                      <div class="col s12 warna-huruf2">
                        <p>${output.overview}</p>
                      </div>
                    `


      document.getElementById("movie_detail").innerHTML = detail;
      document.getElementById("backdrop").innerHTML = output1;
      document.getElementById("synopsis").innerHTML = output2;
    })
    .catch(error);
}

function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    }
    else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
}

// function getMovie() {
//     let movieId = sessionStorage.getItem('id');
//
//     //test id -> 299536
//     axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7f697b5006b4ceaeaf851530192f5983`)
//         .then((response) => {
//             // https://api.themoviedb.org/3/movie/299536/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1
//             console.log(response);
//             let moviel = response.data;
//
//             if (moviel.poster_path === null) {
//                 poster = "../img/default-movie.png";
//             } else {
//                 poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviel.poster_path;
//             }
//
//             let date = moviel.release_date;
//
//             let year = date.slice(0, 4);
//             let Rated;
//
//             let revenue = moviel.revenue / 1000000;
//             let budget = moviel.budget / 1000000;
//             revenue = Math.round(revenue);
//             budget = Math.round(budget);
//
//             if (revenue === 0) {
//                 revenue = "Revenue is less than million dollars";
//             } else {
//               revenue = revenue + " million";
//             }
//
//             if (budget === 0) {
//                 budget = "Budget is less than million dollars"
//             } else {
//                 budget = budget + " million";
//             }
//
//             let genre = [];
//             moviel.genres.forEach(element => {
//                 genre.push(element.name);
//             });
//
//             let company = [];
//             moviel.production_companies.forEach(element => {
//                 company.push(element.name);
//             });
//
//             let country = [];
//             moviel.production_countries.forEach(element => {
//                 country.push(element.name);
//             });
//
//             let language = [];
//             moviel.spoken_languages.forEach(element => {
//                 language.push(element.name);
//             });
//
//             genres = genre.join(' / ');
//             companies = company.join(' / ');
//             countries = country.join(' / ');
//             languages = language.join(' / ');
//
//             let output1 = `
//             <div class="row">
//                 <div class="col s12 m6 l4">
//                     <img src="${poster}" class="poster-image" style="height:450px;width:280px;">
//                 </div>
//
//                 <div class="col s12 m6 l8 warna-huruf2">
//                     <h4 class="movie-title" style="margin-top:10px; font-weight:bold">${moviel.title}</h4>
//                     <h5><i>${moviel.tagline}</i></h5>
//                     <h5>${year}</h5>
//                     <h5 style="margin-top: -10px;">${genres}</h5>
//
//                     <strong class="warna-huruf">Status: </strong> ${moviel.status} <br>
//                     <strong class="warna-huruf">Released Date: </strong> ${moviel.release_date} <br>
//                     <strong class="warna-huruf">Rating: </strong> ${moviel.vote_average} / 10 <br>
//                     <strong class="warna-huruf">Duration: </strong> ${moviel.runtime} min <br>
//                     <strong class="warna-huruf">Language: </strong> ${languages} <br>
//                     <strong class="warna-huruf">Budget: </strong> $ ${budget}  <br>
//                     <strong class="warna-huruf">Revenue: </strong> $ ${revenue} <br>
//                     <strong class="warna-huruf">Popularity: </strong> ${moviel.popularity} <br>
//                     <strong class="warna-huruf">Production Companies: </strong> ${companies} <br>
//                     <strong class="warna-huruf">Production Countries: </strong> ${countries} <br>
//                     <strong class="warna-huruf">Homepage: </strong><a href="${moviel.homepage}" style="color:blue;font-weight:bold;">${moviel.homepage}</a>
//
//                 </div>
//             </div>
//             `
//
//             let output2 = `
//             <div class="col s12 warna-huruf2">
//                 <p>${moviel.overview}</p>
//             </div>
//             `
//
//             $('#movie_detail').html(output1);
//             $('#synopsis').html(output2);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

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
                              <strong class="${getClassByRate(movie.vote_average)}">
                                <p>
                                  <span class="warna-huruf2">Rating: </span>${movie.vote_average}
                                  <span class="warna-huruf2">of </span>
                                  <span style="color:green;">10 </span>
                                  <span><i class="material-icons star">star_rate</i></span>
                                </p>
                              </strong>
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
                          <p>
                              <div class="col-md-10 box-review2">
                                  <h5 style="margin-left:15px;">Reviewed by ${review.author}</h5>
                                  <div class="content">
                                      <p style="color:#000;margin-left:15px;margin-right:15px;">${review.content}</p>
                                      <a href="${review.url}" style="color:blue;margin-left:15px;">${review.url}</a>
                                  </div>
                              </div>
                          </p>
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

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7f697b5006b4ceaeaf851530192f5983&language=en-US`)
        .then((response) => {
            // https://api.themoviedb.org/3/movie/299536/reviews?api_key=5ec279387e9aa9488ef4d00b22acc451&language=en-US&page=1
            console.log(response);
            let credit = response.data;
            let cast = credit.cast;
            cast.length = 5;
            let crew = credit.crew;
            crew.length = 5;

            let casts = [];
            credit.cast.forEach(element => {
                casts.push(element.name);
            });

            let crews = [];
            credit.crew.forEach(element => {
                crews.push(element.name);
            });

            castses = casts.join(', ');
            crewed = crews.join(', ');
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
            // videos.length = 1;
            // console.log(videos);
            // let output5 = '';
            //
            // $.each(videos, (index, video) => {
            //
            //     output5 += `
            //         <iframe width="620" height="400" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            //
            //     `
            let min = 0;
    				// -1 so it takes into account if theres only 1 item in the trailer length( at position 0).
    				let max = videos.length - 1;
    				min = Math.ceil(min);
    				max = Math.floor(max);
    				let trailerNumber = Math.floor(Math.random() * (max-min +1)) + min;

    				let output5 = `
    					<iframe style="width:100%;height:400px;margin-left: auto;left: auto;right: auto;" src="https://www.youtube.com/embed/${videos[trailerNumber].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    					`;

            $('#trailer').html(output5);
        })
        .catch((error) => {
            console.log(error);
        });
}
