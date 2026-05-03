window.addEventListener("load", async () => {

const grid = document.querySelector(".projects-grid");
if(!grid) return;

const response = await fetch(
"https://api.github.com/users/tiagzoc/repos"
);

const repos = await response.json();

repos.forEach(repo => {

if(repo.fork) return;

const extra = projectsData[repo.name] || {};

const card = document.createElement("div");
card.className = "project-card";

// badges HTML
const languages = (extra.languages || []).map(l => 
`<span class="badge">${l}</span>`).join("");

const apis = (extra.apis || []).map(a => 
`<span class="badge">${a}</span>`).join("");

const collaborators = (extra.collaborators || []).map(c => 
`<span class="badge">${c}</span>`).join("");

card.innerHTML = `
<h3>${repo.name}</h3>

<p>${repo.description ?? ""}</p>

<div class="project-meta">
${languages}
${apis}
${collaborators}
</div>

<a class="project-link" href="${repo.html_url}" target="_blank">
Voir repo →
</a>
`;

grid.appendChild(card);

});

});