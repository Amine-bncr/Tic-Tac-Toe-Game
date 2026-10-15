    //ranking.js - manages user rankings using localStorage
(function(global){
    function getRankings() {
        return JSON.parse(localStorage.getItem('rankings')) || {};
    }
    // Save rankings back to localStorage
    function saveRankings(rankings) {
        localStorage.setItem('rankings', JSON.stringify(rankings));
    }

    function addWinForUser(username) {
        if (!username) return;
        const rankings = getRankings();
        if (!rankings[username]) rankings[username] = 0;
        rankings[username] = Number(rankings[username]) + 1;
        saveRankings(rankings);
    }
    // Returns an array of {username, wins} sorted by wins desc, then username asc
    function getSortedRankingsArray() {
        const rankings = getRankings();
        return Object.keys(rankings)
            .map(u => ({ username: u, wins: Number(rankings[u]) }))
            .sort((a, b) => b.wins - a.wins || a.username.localeCompare(b.username));
    }
    // Renders the ranking table into the specified tbody element
    function renderRankingTable(bodyElementId = 'rankingBody') {
        const tbody = document.getElementById(bodyElementId);
        if (!tbody) return;
        const rows = getSortedRankingsArray();
        if (rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3">No rankings yet. Play and win to appear here!</td></tr>';
            return;
        }
        tbody.innerHTML = rows.map((r, i) =>
            `<tr><td>${i + 1}</td><td>${escapeHtml(r.username)}</td><td>${r.wins}</td></tr>`
        ).join('');
    }

    // small helper to avoid simple HTML injection
    function escapeHtml(str) {
        return String(str).replace(/[&<>"'`=\/]/g, s => ({
            '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
        })[s]);
    }

    // Expose API
    global.Ranking = {
        addWinForUser,
        getRankings,
        renderRankingTable,
        getSortedRankingsArray
    };
})(window);
