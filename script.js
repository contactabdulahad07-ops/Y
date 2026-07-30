let currentScore = 0;
const targetScore = 10;

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('errorMsg');
    
    if (input.value === "Falak123") {
        nextScene(2);
    } else {
        input.classList.add('shake');
        error.style.display = 'block';
        setTimeout(() => {
            input.classList.remove('shake');
        }, 400);
    }
}

function nextScene(sceneNumber) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene${sceneNumber}`).classList.add('active');
    
    if (sceneNumber === 3) startHeartGame();
    if (sceneNumber === 7) runTypewriter();
}

// Scene 3: Heart Game Logic
function startHeartGame() {
    const area = document.getElementById('game-area');
    const scoreEl = document.getElementById('score');
    
    const interval = setInterval(() => {
        if (currentScore >= targetScore) {
            clearInterval(interval);
            setTimeout(() => nextScene(4), 1000);
            return;
        }

        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * (area.clientWidth - 30) + 'px';
        heart.style.top = '-50px';
        
        area.appendChild(heart);

        let top = -50;
        const fall = setInterval(() => {
            top += 3;
            heart.style.top = top + 'px';
            
            if (top > area.clientHeight) {
                clearInterval(fall);
                heart.remove();
            }
        }, 20);

        heart.onclick = () => {
            currentScore++;
            scoreEl.innerText = currentScore;
            heart.remove();
            clearInterval(fall);
            createSparkle(heart.offsetLeft, heart.offsetTop);
        };
    }, 800);
}

// Scene 4: Cake Cutting Logic
function cutCake() {
    const knife = document.getElementById('knife');
    const cake = document.getElementById('mainCake');
    const candles = document.querySelectorAll('.candle');
    const btn = document.getElementById('cutBtn');

    knife.classList.add('cut-animation');
    
    setTimeout(() => {
        cake.classList.add('split');
        candles.forEach(c => c.classList.add('blown-out'));
        startConfetti();
        btn.innerText = "Next Step";
        btn.onclick = () => nextScene(5);
    }, 1000);
}

// Scene 7: Love Letter Typewriter
const lines = [
    "Happy Birthday Meri Jaan ❤️",
    "You are the most beautiful part of my life.",
    "Your smile makes my world beautiful.",
    "I pray Allah always keeps you happy.",
    "You are my biggest blessing.",
    "Thank you for being in my life.",
    "I will always respect and care for you.",
    "May all your dreams come true.",
    "I wish every happiness for you.",
    "I love you more every day.",
    "You are my forever.",
    "Happy Birthday My Love ❤️",
    "\nForever Yours ❤️"
];

function runTypewriter() {
    const container = document.getElementById('typewriter');
    let lineIdx = 0;
    let charIdx = 0;

    function type() {
        if (lineIdx < lines.length) {
            if (charIdx < lines[lineIdx].length) {
                container.innerHTML += lines[lineIdx].charAt(charIdx);
                charIdx++;
                setTimeout(type, 50);
            } else {
                container.innerHTML += "<br>";
                lineIdx++;
                charIdx = 0;
                setTimeout(type, 500);
            }
        } else {
            document.getElementById('playAgainBtn').style.display = 'block';
            startConfetti();
        }
    }
    type();
}

function startLetter() {
    nextScene(7);
}

// Visual Effects
function createSparkle(x, y) {
    const s = document.createElement('div');
    s.innerHTML = '✨';
    s.style.position = 'absolute';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.pointerEvents = 'none';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 500);
}

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
            
            p.y += Math.cos(p.d) + 1 + p.r / 2;
            p.tilt += Math.sin(0.01);
            if (p.y > canvas.height) p.y = -20;
        });
        requestAnimationFrame(draw);
    }
    draw();
}
