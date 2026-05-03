window.addEventListener("DOMContentLoaded", async () => {

const grid = document.querySelector(".projects-grid");
if(!grid) return;

const response = await fetch(
"https://api.github.com/users/tiagzoc/repos",
{
headers: {
"Accept": "application/vnd.github.mercy-preview+json"
}
}
);

const repos = await response.json();

repos.forEach(repo => {

if(repo.fork) return;

if(!repo.topics || !repo.topics.includes("portfolio")) return;

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

const collabsArr = extra.collaborators || [];

let collabs = "";

if (collabsArr.length === 0) {

    collabs = `<span class="badge solo">Solo Project</span>`;

} else {

    collabs = collabsArr.map(name => {

        const link = contributorsMap[name] || "#";

        return `
        <a href="${link}" target="_blank" class="badge contributor">
            ${name}
        </a>
        `;

    }).join("");

}

const card = document.createElement("div");
card.className = "project-card";

const media = extra.media || "";

const mediaHTML = media.endsWith(".mp4")
? `<video src="${media}" autoplay muted loop></video>`
: `<img src="${media}" alt="${repo.name}">`;

card.innerHTML = `

<div class="project-layout">

    <div class="project-media">
        ${mediaHTML}
    </div>

    <div class="project-content">

        <div class="project-header">
            <h3>${repo.name}</h3>
            <div class="langs">${langs}</div>
        </div>

        <div class="meta">
            <div><strong>API :</strong> ${apis}</div>
            <div><strong>Librairies :</strong> ${libs}</div>
            <div><strong>Contributeurs :</strong> ${collabs}</div>
        </div>

        <p class="desc">${repo.description ?? ""}</p>

        <a class="project-button" href="${repo.html_url}" target="_blank">
            Voir le repo
        </a>

    </div>

</div>
`;

grid.appendChild(card);

});

});