document.addEventListener('DOMContentLoaded', () => {
    const shootBtn = document.getElementById('shootBtn');
    const targetImg = document.getElementById('targetImg');
    const targetArea = document.getElementById('targetArea');
    const shootSound = document.getElementById('shootSound');
    const scoreElement = document.getElementById('score');

    let score = 0; // Menyimpan jumlah tembakan

    shootBtn.addEventListener('click', () => {
        // 1. Update Skor
        score++;
        scoreElement.innerText = score;

        // 2. Mainkan Suara (Bisa berulang cepat)
        shootSound.currentTime = 0; 
        shootSound.play().catch(e => console.log("Audio diblokir browser."));

        // 3. Efek Getar (Shake)
        targetImg.classList.remove('shake');
        void targetImg.offsetWidth; // Trik restart animasi
        targetImg.classList.add('shake');

        // 4. Bikin Rame! Panggil banyak cipratan sekaligus
        createMilkSplat(true); // Cipratan besar utama
        
        // Tambahkan 3-5 cipratan kecil menyebar biar rame
        let extraSplats = Math.floor(Math.random() * 3) + 3;
        for(let i = 0; i < extraSplats; i++) {
            setTimeout(() => {
                createMilkSplat(false);
            }, i * 50); // Delay sedikit tiap cipratan kecil
        }
    });

    function createMilkSplat(isMain) {
        const splat = document.createElement('div');
        splat.classList.add('splat');
        
        const areaWidth = targetArea.offsetWidth;
        const areaHeight = targetArea.offsetHeight;
        
        // Posisi X dan Y
        let randomX, randomY, size;

        if (isMain) {
            // Cipratan utama ukurannya besar dan cenderung di tengah
            randomX = Math.floor(Math.random() * (areaWidth * 0.6)) + (areaWidth * 0.2);
            randomY = Math.floor(Math.random() * (areaHeight * 0.6)) + (areaHeight * 0.2);
            size = Math.floor(Math.random() * 60) + 70; // Ukuran 70px - 130px
        } else {
            // Cipratan kecil menyebar di seluruh foto
            randomX = Math.floor(Math.random() * (areaWidth - 20)) + 10;
            randomY = Math.floor(Math.random() * (areaHeight - 20)) + 10;
            size = Math.floor(Math.random() * 30) + 20; // Ukuran 20px - 50px
        }
        
        // Rotasi acak biar bentuknya beda-beda
        const randomRot = Math.floor(Math.random() * 360);

        // Masukkan nilai ke CSS variabel untuk animasi
        splat.style.setProperty('--startY', `${randomY}px`);
        splat.style.setProperty('--rot', `${randomRot}deg`);
        
        splat.style.left = `${randomX}px`;
        splat.style.top = `${randomY}px`;
        splat.style.width = `${size}px`;
        splat.style.height = `${size}px`;
        
        targetArea.appendChild(splat);

        // Hapus elemen dari HTML setelah animasi selesai (4.3 detik) agar tidak ngelag
        setTimeout(() => {
            splat.remove();
        }, 4300);
    }
});
