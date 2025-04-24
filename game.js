// Game State
const gameState = {
    level: 1,
    stage: 'baby',
    hunger: 100,
    happiness: 100,
    xp: 0,
    xpToNextLevel: 100,
    stats: {
        strength: 10,
        defense: 10,
        speed: 10
    },
    lastActionTime: 0,
    actionCooldown: 5000 // 5 seconds
};

// DOM Elements
const babyDragon = document.getElementById('baby-dragon');
const adultDragon = document.getElementById('adult-dragon');
const godDragon = document.getElementById('god-dragon');

const hungerValue = document.getElementById('hunger-value');
const hungerBar = document.getElementById('hunger-bar');
const happinessValue = document.getElementById('happiness-value');
const happinessBar = document.getElementById('happiness-bar');
const xpValue = document.getElementById('xp-value');
const xpBar = document.getElementById('xp-bar');
const levelText = document.getElementById('level');
const stageText = document.getElementById('stage');

const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const trainBtn = document.getElementById('train-btn');
const battleBtn = document.getElementById('battle-btn');

const logContainer = document.getElementById('log-container');
const evolutionAnimation = document.getElementById('evolution-animation');
const evolutionText = document.getElementById('evolution-text');
const closeEvolutionBtn = document.getElementById('close-evolution');
const logToggle = document.getElementById('log-toggle');
const logPopup = document.getElementById('log-popup');
const closePopup = document.getElementById('close-popup');
const popupOverlay = document.getElementById('popup-overlay');

// Initialize game
function initGame() {
    updateUI();
    startDecay();

    // Event listeners
    feedBtn.addEventListener('click', feedDragon);
    playBtn.addEventListener('click', playWithDragon);
    trainBtn.addEventListener('click', trainDragon);
    battleBtn.addEventListener('click', startBattle);
    closeEvolutionBtn.addEventListener('click', closeEvolution);
    logToggle.addEventListener('click', toggleLog);
    closePopup.addEventListener('click', toggleLog);
    popupOverlay.addEventListener('click', toggleLog);

    // Disable battle button initially
    battleBtn.disabled = true;

    // Add log entry
    addLog("Chào mừng đến với Thần Long Kỷ Nguyên!");
    addLog("Bạn có một chú rồng con mới sinh!");
}

// Toggle log popup
function toggleLog() {
    logPopup.style.display = logPopup.style.display === 'flex' ? 'none' : 'flex';
    popupOverlay.style.display = popupOverlay.style.display === 'block' ? 'none' : 'block';
    
    if (logPopup.style.display === 'flex') {
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}

// Update all UI elements
function updateUI() {
    // Update stats
    hungerValue.textContent = `${gameState.hunger}%`;
    hungerBar.style.width = `${gameState.hunger}%`;
    happinessValue.textContent = `${gameState.happiness}%`;
    happinessBar.style.width = `${gameState.happiness}%`;
    xpValue.textContent = `${gameState.xp}/${gameState.xpToNextLevel}`;
    xpBar.style.width = `${(gameState.xp / gameState.xpToNextLevel) * 100}%`;
    levelText.textContent = gameState.level;

    // Update stage text
    switch (gameState.stage) {
        case 'baby':
            stageText.textContent = "Rồng non";
            break;
        case 'adult':
            stageText.textContent = "Rồng trưởng thành";
            break;
        case 'god':
            stageText.textContent = "Thần thú";
            break;
    }

    // Enable/disable buttons based on cooldown
    const currentTime = Date.now();
    const cooldownActive = currentTime - gameState.lastActionTime < gameState.actionCooldown;

    feedBtn.disabled = cooldownActive;
    playBtn.disabled = cooldownActive;
    trainBtn.disabled = cooldownActive;
    battleBtn.disabled = cooldownActive || gameState.stage === 'baby';
}

// Stats decay over time
function startDecay() {
    setInterval(() => {
        if (gameState.hunger > 0) gameState.hunger -= 2;
        if (gameState.happiness > 0) gameState.happiness -= 1;

        if (gameState.hunger <= 0) {
            addLog("Rồng của bạn đang đói! Hãy cho nó ăn!");
        }

        if (gameState.happiness <= 30) {
            addLog("Rồng của bạn đang buồn. Hãy chơi với nó!");
        }

        updateUI();
    }, 10000); // Decay every 10 seconds
}

// Feed the dragon
function feedDragon() {
    if (gameState.hunger >= 100) {
        addLog("Rồng của bạn no rồi!");
        return;
    }

    gameState.hunger = Math.min(100, gameState.hunger + 20);
    gameState.xp += 5;
    checkLevelUp();

    addLog("Bạn cho rồng ăn. Nó rất thích!");
    gameState.lastActionTime = Date.now();
    updateUI();
}

// Play with dragon
function playWithDragon() {
    if (gameState.happiness >= 100) {
        addLog("Rồng của bạn đang rất vui!");
        return;
    }

    gameState.happiness = Math.min(100, gameState.happiness + 15);
    gameState.xp += 3;
    checkLevelUp();

    addLog("Bạn chơi đùa với rồng. Nó cười khúc khích!");
    gameState.lastActionTime = Date.now();
    updateUI();
}

// Train dragon
function trainDragon() {
    if (gameState.hunger < 30) {
        addLog("Rồng quá đói để huấn luyện!");
        return;
    }

    gameState.hunger = Math.max(0, gameState.hunger - 10);
    gameState.xp += 10;
    gameState.stats.strength += 1;
    gameState.stats.defense += 1;
    gameState.stats.speed += 1;
    checkLevelUp();

    addLog("Bạn huấn luyện rồng. Các chỉ số được cải thiện!");
    gameState.lastActionTime = Date.now();
    updateUI();
}

// Start battle
function startBattle() {
    if (gameState.stage === 'baby') {
        addLog("Rồng non quá yếu để chiến đấu!");
        return;
    }

    if (gameState.hunger < 50 || gameState.happiness < 50) {
        addLog("Rồng không đủ khỏe để chiến đấu!");
        return;
    }

    // Simulate battle
    const enemyStrength = Math.floor(Math.random() * 20) + 10 * gameState.level;
    const dragonPower = gameState.stats.strength + gameState.stats.defense + gameState.stats.speed;

    gameState.hunger = Math.max(0, gameState.hunger - 15);
    gameState.happiness = Math.max(0, gameState.happiness - 10);

    if (dragonPower > enemyStrength) {
        const xpGain = 20 + Math.floor(Math.random() * 10);
        gameState.xp += xpGain;
        addLog(`Rồng chiến thắng! Nhận được ${xpGain} kinh nghiệm!`);
    } else {
        addLog("Rồng thua trận... Hãy huấn luyện thêm!");
    }

    checkLevelUp();
    gameState.lastActionTime = Date.now();
    updateUI();
}

// Check for level up
function checkLevelUp() {
    if (gameState.xp >= gameState.xpToNextLevel) {
        gameState.xp -= gameState.xpToNextLevel;
        gameState.level += 1;
        gameState.xpToNextLevel = Math.floor(gameState.xpToNextLevel * 1.5);

        addLog(`Rồng đã lên cấp ${gameState.level}!`);

        // Check for evolution
        checkEvolution();
    }

    updateUI();
}

// Check for evolution
function checkEvolution() {
    if (gameState.level === 5 && gameState.stage === 'baby') {
        evolveDragon('adult');
    } else if (gameState.level === 15 && gameState.stage === 'adult') {
        evolveDragon('god');
    }
}

// Evolve dragon
function evolveDragon(newStage) {
    gameState.stage = newStage;

    // Show evolution animation
    evolutionAnimation.classList.add('active');

    switch (newStage) {
        case 'adult':
            evolutionText.textContent = "Rồng của bạn đang tiến hóa thành Rồng trưởng thành!";
            setTimeout(() => {
                babyDragon.style.display = 'none';
                adultDragon.style.display = 'block';
            }, 1000);
            break;
        case 'god':
            evolutionText.textContent = "Rồng của bạn đang tiến hóa thành Thần thú!";
            setTimeout(() => {
                adultDragon.style.display = 'none';
                godDragon.style.display = 'block';
            }, 1000);
            break;
    }

    addLog(`Rồng đang tiến hóa thành ${newStage === 'adult' ? 'Rồng trưởng thành' : 'Thần thú'}!`);
}

// Close evolution animation
function closeEvolution() {
    evolutionAnimation.classList.remove('active');
    addLog(`Chúc mừng! Rồng của bạn đã tiến hóa!`);

    // Enable battle button when evolving to adult
    if (gameState.stage === 'adult') {
        battleBtn.disabled = false;
    }
}

// Add log entry
function addLog(message) {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = message;
    logContainer.appendChild(logEntry);

    // Auto-scroll to bottom if popup is open
    if (logPopup.style.display === 'flex') {
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}

// Initialize the game
window.onload = initGame;