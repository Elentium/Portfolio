const tools = ["VSCode/Cursor", "Rojo/Argon", "Wally/Pesde", "Rokit", "Git & Github"];
const languages = ["C", "C++", "Rust", "HTML/CSS", "JavaScript/TypeScript", "Lua", "Luau", "Python", "Assembly(arm, x86, arm64, x64)"];

function renderTags(list, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    list.forEach(item => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.innerText = item;
        container.appendChild(span);
    });
}

export function initSkillsTags() {
    renderTags(tools, 'tools-container');
    renderTags(languages, 'languages-container');
}
