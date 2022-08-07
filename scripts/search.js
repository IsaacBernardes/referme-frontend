

function getData() {

  // TODO: Request backend all movies

  const result = [
    {
      name: "Como treinar seu dragão",
      score: 5,
      image: "https://upload.wikimedia.org/wikipedia/pt/6/62/How_to_Train_Your_Dragon_%28filme%29_Poster.jpg",
      platforms: [
        "Netflix"
      ],
      sinopse: "Um jovem e desafortunado viking que aspira a caçar dragões se torna o improvável amigo de um jovem dragão, e descobre que pode haver mais nas criaturas do que ele supunha.",
      trailerURL: "https://www.youtube.com/watch?v=uv1V9BOb2M8"
    },
    {
      name: "Como treinar seu dragão 3",
      score: 4,
      image: "https://br.web.img3.acsta.net/pictures/18/11/13/12/10/5661398.jpg",
      platforms: [
        "Netflix"
      ],
      sinopse: "Quando Soluço descobre que Desdentado não é a única Fúria da Noite, ele deve procurar por \"O Mundo Oculto\", antes que um tirano contratado chamado Grimmel o encontre primeiro.",
      trailerURL: "https://www.youtube.com/watch?v=VS4owMPt7sg"
    },
    {
      name: "Vingadores: Ultimato",
      score: 5,
      image: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg",
      platforms: [
        "Disney"
      ],
      sinopse: "Após os eventos devastadores de Vingadores: Guerra Infinita , o universo está em ruínas, e com a ajuda de aliados os Vingadores se reúnem para desfazer as ações de Thanos e restaurar a ordem.",
      trailerURL: "https://www.youtube.com/watch?v=g6ng8iy-l0U"
    }
  ]


  const movieListDiv = document.getElementById("movie-list");
  movieListDiv.innerHTML = "";

  for (const movie of result) {
    const movieCard = document.createElement('movie-card');
    movieCard.setAttribute('data-object', JSON.stringify(movie));
    movieListDiv.appendChild(movieCard);
  }

}


function toggleFilters() {
  const filterRow = document.getElementById("filter-row");
	filterRow.style.display = filterRow.style.display == "none" ? "flex" : "none";
}

getData();