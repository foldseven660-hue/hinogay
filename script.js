document.addEventListener('DOMContentLoaded', () => {
    const shootBtn = document.getElementById('shootBtn');
    const targetImg = document.getElementById('targetImg');
    const targetArea = document.getElementById('targetArea');
    const shootSound = document.getElementById('shootSound');

    shootBtn.addEventListener('click', () => {
        // 1. Mainkan Suara
        shootSound.currentTime = 0; // Reset audio ke awal agar bisa dipencet cepat berulang kali
        shootSound.play().catch(error => {
            console.log("Audio belum bisa diputar, butuh interaksi user pertama.");
        });

        // 2. Berikan Efek Getar (Shake)
        targetImg.classList.remove('shake');
        
        // Trik agar animasi bisa di-restart jika tombol dipencet berturut-turut dengan cepat
        void targetImg.offsetWidth; 
        
        targetImg.classList.add('shake');

        // 3. Buat Efek Cipratan Air
        createSplashEffect();
    });

    function createSplashEffect() {
        const splash = document.createElement('div');
        splash.classList.add('splash');
        
        // Ukuran area target
        const areaWidth = targetArea.offsetWidth;
        const areaHeight = targetArea.offsetHeight;
        
        // Posisi acak (random) untuk cipratan air di dalam foto
        const randomX = Math.floor(Math.random() * (areaWidth - 40)) + 20;
        const randomY = Math.floor(Math.random() * (areaHeight - 40)) + 20;
        
        // Ukuran cipratan diatur acak agar bervariasi
        const size = Math.floor(Math.random() * 60) + 40; // 40px sampai 100px
        
        splash.style.left = `${randomX}px`;
        splash.style.top = `${randomY}px`;
        splash.style.width = `${size}px`;
        splash.style.height = `${size}px`;
        
        // Masukkan cipratan ke dalam area foto
        targetArea.appendChild(splash);

        // Hapus elemen cipratan setelah animasinya selesai (0.5 detik)
        setTimeout(() => {
            splash.remove();
        }, 500);
    }
});
