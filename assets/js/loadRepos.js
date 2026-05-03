window.addEventListener("DOMContentLoaded", async () => {

const grid = document.querySelector(".projects-grid");
if(!grid) return;

const response = await fetch("https://api.github.com/users/tiagzoc/repos");
const repos = await response.json();

repos.forEach(repo => {

if(repo.fork) return;

const extra = projectsData[repo.name] || {};

const langs = (extra.languages || []).map(l => 
`<span class="badge">${l}</span>`).join(" ");

const apisArr = (extra.apis || []);
const libsArr = (extra.libraries || []);

const apis = apisArr.length
? apisArr.map(a => `<span class="badge api">${a}</span>`).join(" ")
: `<span class="badge empty">Aucune API</span>`;

const libs = libsArr.length
? libsArr.map(l => `<span class="badge lib">${l}</span>`).join(" ")
: `<span class="badge empty">Aucune librairie</span>`;

const card = document.createElement("div");
card.className = "project-card";

card.innerHTML = `
<div class="project-header">
    <h3>${repo.name}</h3>
    <div class="langs">${langs}</div>
</div>

<p class="desc">${repo.description ?? ""}</p>

<div class="meta">
    <div><strong>API :</strong> ${apis}</div>
    <div><strong>Librairies :</strong> ${libs}</div>
</div>

<a class="project-link" href="${repo.html_url}" target="_blank">
Voir repo →
</a>
`;

grid.appendChild(card);

});

});