// Fetch GitHub user details
async function getUser() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username");
        return;
    }

    const profileDiv = document.getElementById("profile");
    const reposDiv = document.getElementById("repos");
    reposDiv.innerHTML = "";

    try {
        // Fetch profile
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error("User not found");

        const userData = await userResponse.json();

        // Display profile (no image, no external link)
        profileDiv.innerHTML = `
      <h2>${userData.name || userData.login}</h2>
      <p>${userData.bio || "No bio available"}</p>
      <p>Followers: ${userData.followers} | Following: ${userData.following}</p>
      <p>Public Repos: ${userData.public_repos}</p>
    `;

        // Fetch repos
        const repoResponse = await fetch(userData.repos_url);
        const repos = await repoResponse.json();

        reposDiv.innerHTML = "<h3>Repositories:</h3>";
        repos.slice(0, 10).forEach(repo => {
            const repoEl = document.createElement("div");
            repoEl.classList.add("repo");
            repoEl.innerHTML = `
        <strong>${repo.name}</strong>
        <p>${repo.description || "No description"}</p>
        ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}
        <br>
        <button onclick="getIssues('${repo.owner.login}', '${repo.name}', this)">View Issues</button>
        <div class="issues"></div>
      `;
            reposDiv.appendChild(repoEl);
        });

    } catch (error) {
        profileDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

// Fetch repository issues
async function getIssues(owner, repo, button) {
    const issuesDiv = button.nextElementSibling;

    // Toggle if already loaded
    if (issuesDiv.dataset.loaded === "true") {
        issuesDiv.innerHTML = "";
        issuesDiv.dataset.loaded = "false";
        button.textContent = "View Issues";
        return;
    }

    issuesDiv.innerHTML = "Loading issues...";

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
        if (!response.ok) throw new Error("Could not fetch issues");

        const issues = await response.json();
        if (issues.length === 0) {
            issuesDiv.innerHTML = "<p>No issues found.</p>";
            return;
        }

        issuesDiv.innerHTML = "<h4>Issues:</h4>";
        issues.slice(0, 5).forEach(issue => {
            const issueEl = document.createElement("div");
            issueEl.innerHTML = `
        <a href="${issue.html_url}" target="_blank">#${issue.number} - ${issue.title}</a>
      `;
            issuesDiv.appendChild(issueEl);
        });

        issuesDiv.dataset.loaded = "true";
        button.textContent = "Hide Issues";

    } catch (error) {
        issuesDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}
