document.addEventListener('DOMContentLoaded', function () {
    const pubList = document.getElementById('publications-list');
    const pubYears = document.getElementById('pub-years');
    const pubTopics = document.getElementById('pub-topics');
    const btnSelected = document.getElementById('show-selected');
    const btnDate = document.getElementById('show-date');
    const btnTopic = document.getElementById('show-topic');

    const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
    const topicsSet = new Set();
    publications.forEach(pub => (pub.topics || []).forEach(t => topicsSet.add(t)));
    const topics = Array.from(topicsSet);

    pubYears.innerHTML = "<strong>Year:</strong> " + years.map(y =>
        `<a href="#year-${y}" class="pub-year-link">${y}</a>`
    ).join(" / ");

    pubTopics.innerHTML = "<strong>Research Topics</strong>: " +
        topics.map(t =>
            `<a href="#topic-${encodeURIComponent(t)}" class="pub-topic-link">${t}</a>`
        ).join(" / ");

    function scrollToPubList() {
        const anchor = document.getElementById('publications-anchor');
        if (anchor) anchor.scrollIntoView();
    }

    function setActive(btn) {
        [btnSelected, btnDate, btnTopic].forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function renderSelected() {
        setActive(btnSelected);
        pubList.innerHTML = publications.filter(p => p.selected).map(renderPub).join('');
    }

    function renderByDate() {
        setActive(btnDate);
        let html = '';
        years.forEach(year => {
            html += `<h3 id="year-${year}" class="pub-sticky-header">${year}</h3>`;
            html += publications.filter(p => p.year === year).map(renderPub).join('');
        });
        pubList.innerHTML = html;
    }

    function renderByTopic() {
        setActive(btnTopic);
        let html = '';
        topics.forEach(topic => {
            html += `<h3 id="topic-${encodeURIComponent(topic)}" class="pub-sticky-header">${topic}</h3>`;
            html += publications.filter(p => p.topics && p.topics.includes(topic)).map(renderPub).join('');
        });
        pubList.innerHTML = html;
    }

    function renderPub(pub) {
        const hasImage = !!pub.image;
        return `
            <table class="publication-table">
            <tr>
                ${hasImage ? `<td class="pub-img-cell">
                    <img src="${pub.image}" alt="pub-img" class="pub-img" loading="lazy">
                </td>` : ''}
                <td class="pub-text-cell">
                    <div class="publication-title">${pub.title}</div>
                    <div class="publication-authors">${pub.authors}</div>
                    <div class="publication-meta">
                        <span class="publication-venue${pub.highlighted ? ' highlighted' : ''}">${pub.shortVenue || pub.venue + ', ' + pub.year}</span>
                        ${pub.links && pub.links.length ? `<span class="meta-sep">·</span>
                        <span class="publication-links">${pub.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener">[${link.label}]</a>`).join(' ')}</span>` : ''}
                    </div>
                    ${pub.badge ? `<span class="pub-badge">${pub.badge}</span>` : ''}
                </td>
            </tr>
            </table>
        `;
    }

    renderSelected();

    btnSelected.onclick = function () {
        renderSelected();
        setTimeout(scrollToPubList, 0);
    };
    btnDate.onclick = function () {
        renderByDate();
        setTimeout(scrollToPubList, 0);
    };
    btnTopic.onclick = function () {
        renderByTopic();
        setTimeout(scrollToPubList, 0);
    };

    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('pub-year-link')) {
            renderByDate();
            setTimeout(() => {
                document.getElementById(e.target.getAttribute('href').slice(1)).scrollIntoView({ behavior: "smooth", block: "start" });
            }, 10);
            e.preventDefault();
        }
        if (e.target.classList.contains('pub-topic-link')) {
            renderByTopic();
            setTimeout(() => {
                document.getElementById(e.target.getAttribute('href').slice(1)).scrollIntoView({ behavior: "smooth", block: "start" });
            }, 10);
            e.preventDefault();
        }
    });

    const updatedEl = document.getElementById('last-updated');
    if (updatedEl) {
        updatedEl.textContent = new Date().toISOString().slice(0, 10);
    }

    const citeEl = document.getElementById('citeBadge');
    if (citeEl && 'fetch' in window) {
        fetch('https://cdn.jsdelivr.net/gh/RockyChen0205/RockyChen0205.github.io@google-scholar-stats/results/gs_data_shieldsio.json')
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                if (d && d.message) {
                    citeEl.textContent = '';
                    const n = document.createElement('b');
                    n.textContent = d.message;
                    citeEl.appendChild(n);
                    citeEl.appendChild(document.createTextNode(' citations · Google Scholar'));
                    citeEl.hidden = false;
                }
            })
            .catch(() => {});
    }
});
