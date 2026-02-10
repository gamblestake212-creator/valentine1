const startBtn = document.getElementById('start-btn');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const music = document.getElementById('bg-music');
const sadSound = document.getElementById('sad-sound');
const video = document.getElementById('bg-video');

// 1. Start Experience
startBtn.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Force video to show and play
    video.style.opacity = "1";
    video.load();
    video.play().catch(e => console.log("Playback error:", e));
    music.play();
});

// 2. Flyaway "No" Button (Boundary Fix)
noBtn.addEventListener('mouseover', () => {
    music.pause();
    sadSound.currentTime = 0;
    sadSound.play();

    const padding = 60;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    // Use Math.max to ensure it doesn't go above top padding
    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = "none"; // Remove initial centering

    let currentScale = parseFloat(yesBtn.style.transform.replace('scale(', '')) || 1;
    yesBtn.style.transform = `scale(${currentScale * 1.15})`;
});

// 3. Win Logic
yesBtn.addEventListener('click', () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.remove('hidden');
    noBtn.classList.add('hidden'); 
    
    sadSound.pause();
    music.currentTime = 0;
    music.play();
    
    const container = document.getElementById('hearts-container');
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
});