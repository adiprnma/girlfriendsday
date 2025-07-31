document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Dapatkan nama file HTML saat ini (misal: "index.html", "page2.html")
    const currentPage = window.location.pathname.split('/').pop();

    // Logika untuk menampilkan/menyembunyikan tombol
    if (currentPage === 'index.html' || currentPage === '') { // '' untuk jika diakses langsung dari root
        if (prevBtn) prevBtn.style.display = 'none'; // Sembunyikan tombol previous di halaman sampul
        if (nextBtn) nextBtn.textContent = 'Buka Buku Ini!'; // Ubah teks tombol next di sampul
    } else if (currentPage.startsWith('page')) {
        const pageNumber = parseInt(currentPage.replace('page', '').replace('.html', ''));
        // Contoh: Jika kamu punya 3 halaman isi (page2, page3, page4.html)
        // Maka page4.html adalah halaman terakhir
        const lastPageNumber = 4; // <<< UBAH INI SESUAI JUMLAH HALAMAN TERAKHIRMU!
                                  // Contoh: jika kamu punya page2.html, page3.html, page4.html, maka ini 4.
                                  // Jika kamu cuma punya page2.html dan page3.html, maka ini 3.

        if (pageNumber === lastPageNumber) {
            if (nextBtn) nextBtn.style.display = 'none'; // Sembunyikan tombol next di halaman terakhir
        }
    }
    // Jika ada halaman di tengah, kedua tombol akan terlihat
});