async function loadRepos(){

const response = await fetch(
"https://api.github.com/users/tiagzoc/repos",
{
headers: {
"Accept": "application/vnd.github.mercy-preview+json"
}
}
);

const repos = await response.json();

const grid = document.querySelector(".projects-grid");

repos.forEach(repo => {

if(repo.fork) return;

// filtre portfolio (optionnel)
//if(!repo.topics || !repo.topics.includes("portfolio")) return;

const card = document.createElement("div");

card.className = "project-card";

card.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description ?? ""}</p>
<a href="${repo.html_url}" target="_blank">Voir repo</a>
`;

grid.appendChild(card);

});

}

loadRepos();