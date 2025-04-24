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
    actionCooldown: 5000, // 5 seconds
    opponent: null
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

// Battle Connection Elements
const battlePopup = document.getElementById('battle-popup');
const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const roomCreation = document.getElementById('room-creation');
const roomJoining = document.getElementById('room-joining');
const roomCodeDisplay = document.getElementById('room-code');
const roomInput = document.getElementById('room-input');
const connectBtn = document.getElementById('connect-btn');
const battleStatus = document.getElementById('battle-status');
const connectionStatus = document.getElementById('connection-status');
const closeBattlePopup = document.getElementById('close-battle-popup');

// WebRTC variables
let peer;
let conn;
let currentRoomCode = '';

// Initialize game
function initGame() {
    updateUI();
    startDecay();

    // Event listeners for main game
    feedBtn.addEventListener('click', feedDragon);
    playBtn.addEventListener('click', playWithDragon);
    trainBtn.addEventListener('click', trainDragon);
    battleBtn.addEventListener('click', showBattlePopup);
    closeEvolutionBtn.addEventListener('click', closeEvolution);
    logToggle.addEventListener('click', toggleLog);
    closePopup.addEventListener('click', toggleLog);
    popupOverlay.addEventListener('click', toggleLog);

    // Event listeners for battle connection
    createRoomBtn.addEventListener('click', createRoom);
    joinRoomBtn.addEventListener('click', showJoinRoom);
    connectBtn.addEventListener('click', joinRoom);
    closeBattlePopup.addEventListener('click', closeBattleConnection);

    // Add initial log entries
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

// Show battle popup
function showBattlePopup() {
    if (gameState.hunger < 30 || gameState.happiness < 30) {
        addLog("Rồng không đủ khỏe để chiến đấu!");
        return;
    }

    battlePopup.style.display = 'flex';
    popupOverlay.style.display = 'block';
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
    battleBtn.disabled = cooldownActive;
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

// Battle connection functions
function createRoom() {
    // Tạo mã phòng ngẫu nhiên 5 ký tự
    currentRoomCode = Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Khởi tạo Peer
    peer = new Peer(currentRoomCode);
    
    connectionStatus.textContent = "Đang chờ đối thủ kết nối...";
    roomCodeDisplay.textContent = currentRoomCode;
    
    // Hiển thị phần tạo phòng
    document.querySelector('.connection-options').style.display = 'none';
    roomCreation.style.display = 'block';
    battleStatus.style.display = 'block';
    
    // Xử lý kết nối
    peer.on('connection', (connection) => {
        conn = connection;
        setupConnection();
    });
    
    peer.on('error', (err) => {
        console.error('Peer error:', err);
        connectionStatus.textContent = "Lỗi kết nối: " + err;
    });
}

function showJoinRoom() {
    document.querySelector('.connection-options').style.display = 'none';
    roomJoining.style.display = 'block';
    battleStatus.style.display = 'block';
}

function joinRoom() {
    const roomCode = roomInput.value.trim();
    if (!roomCode) {
        alert("Vui lòng nhập mã phòng!");
        return;
    }
    
    currentRoomCode = roomCode;
    peer = new Peer();
    
    connectionStatus.textContent = "Đang kết nối đến phòng...";
    
    peer.on('open', () => {
        conn = peer.connect(roomCode);
        setupConnection();
    });
    
    peer.on('error', (err) => {
        console.error('Peer error:', err);
        connectionStatus.textContent = "Lỗi kết nối: " + err;
    });
}

function setupConnection() {
    conn.on('open', () => {
        connectionStatus.textContent = "Đã kết nối! Chuẩn bị chiến đấu...";
        
        // Gửi thông tin rồng của bạn
        sendDragonData();
        
        // Bắt đầu trận chiến sau 3 giây
        setTimeout(startMultiplayerBattle, 3000);
    });
    
    conn.on('data', (data) => {
        handleBattleData(data);
    });
    
    conn.on('close', () => {
        connectionStatus.textContent = "Đối thủ đã ngắt kết nối";
    });
    
    conn.on('error', (err) => {
        console.error('Connection error:', err);
        connectionStatus.textContent = "Lỗi kết nối: " + err;
    });
}

function closeBattleConnection() {
    battlePopup.style.display = 'none';
    popupOverlay.style.display = 'none';
    
    // Reset trạng thái
    document.querySelector('.connection-options').style.display = 'grid';
    roomCreation.style.display = 'none';
    roomJoining.style.display = 'none';
    battleStatus.style.display = 'none';
    
    // Đóng kết nối nếu có
    if (conn) conn.close();
    if (peer) peer.destroy();
    
    // Reset opponent data
    gameState.opponent = null;
}

function sendDragonData() {
    if (!conn || conn.open !== true) return;
    
    const dragonData = {
        level: gameState.level,
        stats: gameState.stats,
        stage: gameState.stage
    };
    
    conn.send({
        type: 'dragon_data',
        data: dragonData
    });

    if (gameState.stage === 'baby') {
        addLog("Rồng non của bạn đã sẵn sàng chiến đấu!");
    }
}

function handleBattleData(data) {
    if (data.type === 'dragon_data') {
        // Lưu thông tin đối thủ
        gameState.opponent = data.data;
        addLog(`Đã kết nối với đối thủ cấp ${gameState.opponent.level}`);
    } else if (data.type === 'battle_result') {
        // Xử lý kết quả trận đấu
        if (data.data.winner === 'you') {
            addLog("Bạn đã chiến thắng!");
            gameState.xp += 15 + Math.floor(gameState.level * 1.5);
        } else {
            addLog("Bạn đã thua cuộc...");
            gameState.xp += 5 + Math.floor(gameState.level * 0.5);
        }
        checkLevelUp();
        updateUI();
    }
}

function startMultiplayerBattle() {
    if (!gameState.opponent) {
        addLog("Chưa nhận được dữ liệu đối thủ");
        return;
    }
    
    // Tính toán sức mạnh với hệ số cân bằng
    const yourPower = (gameState.stats.strength + gameState.stats.defense + gameState.stats.speed) * 
                     (0.9 + gameState.level * 0.02);
    const opponentPower = (gameState.opponent.stats.strength + gameState.opponent.stats.defense + gameState.opponent.stats.speed) * 
                         (0.9 + gameState.opponent.level * 0.02);
    
    // Giảm chỉ số sau trận đấu (ít hơn cho cấp thấp)
    const hungerLoss = Math.max(5, 15 - Math.floor(gameState.level / 2));
    const happinessLoss = Math.max(3, 10 - Math.floor(gameState.level / 3));
    
    gameState.hunger = Math.max(0, gameState.hunger - hungerLoss);
    gameState.happiness = Math.max(0, gameState.happiness - happinessLoss);
    
    // Thêm ngẫu nhiên để tăng tính bất ngờ (10%)
    const randomFactor = 1 + (Math.random() * 0.2 - 0.1);
    const finalYourPower = yourPower * randomFactor;
    const finalOpponentPower = opponentPower * (1 + (Math.random() * 0.2 - 0.1));
    
    // Xác định người chiến thắng
    let winner;
    if (finalYourPower > finalOpponentPower) {
        winner = 'you';
        addLog("Rồng của bạn đã chiến thắng!");
    } else if (finalYourPower < finalOpponentPower) {
        winner = 'opponent';
        addLog("Rồng của đối thủ mạnh hơn!");
    } else {
        winner = 'draw';
        addLog("Trận đấu hòa!");
    }
    
    // Gửi kết quả cho đối thủ
    if (conn && conn.open) {
        conn.send({
            type: 'battle_result',
            data: { winner: winner === 'you' ? 'opponent' : 'you' }
        });
    }
    
    // Cập nhật XP
    const baseXP = 10 + Math.min(gameState.level, 10);
    if (winner === 'you') {
        gameState.xp += baseXP * 1.5;
    } else if (winner === 'opponent') {
        gameState.xp += baseXP * 0.7;
    } else {
        gameState.xp += baseXP;
    }
    
    checkLevelUp();
    updateUI();
    closeBattleConnection();
}

// Initialize the game
window.onload = initGame;
