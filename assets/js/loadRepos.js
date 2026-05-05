window.addEventListener("DOMContentLoaded", async () => {

    const grid = document.querySelector(".projects-grid");
    if (!grid) return;


    const response = await fetch(
        "https://api.github.com/users/tiagzoc/repos",
        {
            headers: {
                "Accept": "application/vnd.github.mercy-preview+json"
            }
        }
    );

    const repos = await response.json();
-

    repos.sort((a, b) => {

        const aData = projectsData[a.name] || {};
        const bData = projectsData[b.name] || {};

        const aPriority = aData.priority ?? 999;
        const bPriority = bData.priority ?? 999;

        return aPriority - bPriority;
    });


    function formatLangClass(lang) {
        return lang
            .replace("++", "pp")
            .replace("#", "sharp");
    }

    function getYouTubeEmbed(url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    }

    function buildBadges(list, type, emptyText) {
        if (!list || list.length === 0) {
            return `<span class="badge empty">${emptyText}</span>`;
        }

        return list
            .map(item => `<span class="badge ${type}">${item}</span>`)
            .join(" ");
    }

    function buildCollaborators(collabsArr) {
        if (!collabsArr || collabsArr.length === 0) {
            return `<span class="badge solo">Solo Project</span>`;
        }

        return collabsArr.map(name => {
            const link = contributorsMap[name] || "#";

            return `
                <a href="${link}" target="_blank" class="badge contributor">
                    ${name}
                </a>
            `;
        }).join("");
    }

    function buildMedia(media, repoName) {
        if (!media) return "";

        if (media.includes("youtube.com") || media.includes("youtu.be")) {
            const embed = getYouTubeEmbed(media);

            return `
                <iframe 
                    src="${embed}" 
                    frameborder="0"
                    allowfullscreen>
                </iframe>
            `;
        }

        return `<img src="${media}" alt="${repoName}">`;
    }


    repos.forEach(repo => {

        if (repo.fork) return;
        if (!repo.topics || !repo.topics.includes("portfolio")) return;

        const extra = projectsData[repo.name] || {};

        const langs = (extra.languages || [])
            .map(l => `<span class="badge lang-${formatLangClass(l)}">${l}</span>`)
            .join(" ");

        const apis = buildBadges(extra.apis, "api", "Aucune API");
        const libs = buildBadges(extra.libraries, "lib", "Aucune librairie");
        const collabs = buildCollaborators(extra.collaborators);

        const mediaHTML = buildMedia(extra.media, repo.name);

        const isFeatured = extra.priority === 0;

        const featuredBadge = isFeatured
            ? `<span class="badge featured">⭐ Top Project</span>`
            : "";

        const card = document.createElement("div");
        card.className = `project-card ${isFeatured ? "featured" : ""}`;

        card.innerHTML = `
            <div class="project-layout">

                <div class="project-media">
                    ${mediaHTML}
                </div>

                <div class="project-content">

                    <div class="project-header">
                        <h3>${repo.name}</h3>
                        ${featuredBadge}
                        <div class="langs">${langs}</div>
                    </div>

                    <div class="meta">
                        <div><strong>Render API :</strong> ${apis}</div>
                        <div><strong>Additional Libraries :</strong> ${libs}</div>
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