document.getElementById('search-button').addEventListener('click', searchGitHub);

async function searchGitHub() {
    const query = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Kosongkan hasil sebelumnya

    if (!query) {
        resultsContainer.innerHTML = '<p>Masukkan kata kunci untuk memulai pencarian.</p>';
        return;
    }

    const apiUrl = `https://api.github.com/search/repositories?q=${query}`;

    try {
        // Lakukan permintaan ke GitHub API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Tampilkan hasil
        if (data.items.length > 0) {
            data.items.forEach(repo => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h3>
                    <p>${repo.description || 'Tidak ada deskripsi.'}</p>
                    <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = '<p>Tidak ada hasil yang ditemukan.</p>';
        }

    } catch (error) {
        console.error('Error saat melakukan pencarian:', error);
        resultsContainer.innerHTML = '<p>Terjadi kesalahan saat mencari. Silakan coba lagi.</p>';
    }
}