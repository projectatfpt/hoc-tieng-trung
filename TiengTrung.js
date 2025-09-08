// Biến toàn cục
let currentCardIndex = 0;
let filteredCards = [...vocabularyData];
let cardStatus = Array(vocabularyData.length).fill(0); // 0: chưa biết, 1: cần ôn, 2: đã biết
let isShuffled = false;

// DOM Elements
const chineseCharElement = document.getElementById('chinese-char');
const pinyinElement = document.getElementById('pinyin');
const meaningElement = document.getElementById('meaning');
const categoryElement = document.getElementById('category');
const flashcardElement = document.getElementById('flashcard');
const showMeaningButton = document.getElementById('show-meaning');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const progressTextElement = document.getElementById('progress-text');
const progressBarElement = document.getElementById('progress-bar');
const statsElement = document.getElementById('stats');
const categorySelectElement = document.getElementById('category-select');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const shuffleButton = document.getElementById('shuffle-btn');

// Khởi tạo ứng dụng
function initApp() {
    // Hiển thị thẻ đầu tiên
    showCard(currentCardIndex);

    // Cập nhật thống kê
    updateStats();

    // Thiết lập sự kiện
    setupEventListeners();
}

// Hiển thị thẻ
function showCard(index) {
    if (filteredCards.length === 0) return;

    const card = filteredCards[index];
    chineseCharElement.textContent = card.chinese;
    pinyinElement.textContent = card.pinyin;
    meaningElement.textContent = card.meaning;
    categoryElement.textContent = categoryNames[card.category];

    // Đặt lại trạng thái lật của thẻ
    flashcardElement.classList.remove('flipped');

    // Cập nhật progress
    progressTextElement.textContent = `Thẻ ${index + 1}/${filteredCards.length}`;
    progressBarElement.style.width = `${((index + 1) / filteredCards.length) * 100}%`;

    // Cập nhật trạng thái nút điều hướng
    prevButton.disabled = index === 0;
    nextButton.disabled = index === filteredCards.length - 1;
}

// Cập nhật thống kê
function updateStats() {
    const knownCount = cardStatus.filter(status => status === 2).length;
    const reviewCount = cardStatus.filter(status => status === 1).length;
    const unknownCount = cardStatus.filter(status => status === 0).length;

    statsElement.textContent = `Đã biết: ${knownCount} | Cần ôn: ${reviewCount} | Chưa biết: ${unknownCount}`;
}

// Xáo trộn thẻ
function shuffleCards() {
    for (let i = filteredCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
    }
    currentCardIndex = 0;
    showCard(currentCardIndex);
    isShuffled = true;

    // Cập nhật text nút xáo trộn
    shuffleButton.textContent = isShuffled ? "Sắp xếp lại" : "Xáo trộn thẻ";
}

// Sắp xếp lại thẻ theo thứ tự ban đầu
function sortCards() {
    const selectedCategory = categorySelectElement.value;

    if (selectedCategory === 'all') {
        filteredCards = [...vocabularyData];
    } else {
        filteredCards = vocabularyData.filter(card => card.category === selectedCategory);
    }

    currentCardIndex = 0;
    showCard(currentCardIndex);
    isShuffled = false;

    // Cập nhật text nút xáo trộn
    shuffleButton.textContent = isShuffled ? "Sắp xếp lại" : "Xáo trộn thẻ";
}

// Thiết lập sự kiện
function setupEventListeners() {
    // Nút hiện nghĩa
    showMeaningButton.addEventListener('click', () => {
        flashcardElement.classList.add('flipped');
    });

    // Nút điều hướng
    prevButton.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            showCard(currentCardIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentCardIndex < filteredCards.length - 1) {
            currentCardIndex++;
            showCard(currentCardIndex);
        }
    });

    // Nút đánh giá độ khó
    difficultyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const difficulty = e.target.dataset.difficulty;
            const originalIndex = vocabularyData.findIndex(
                card => card.chinese === filteredCards[currentCardIndex].chinese
            );

            if (difficulty === 'easy') {
                cardStatus[originalIndex] = 2; // Đã biết
                // Hiển thị nghĩa (lật thẻ)
                flashcardElement.classList.add('flipped');

                // Sau 1 giây lật lại rồi mới sang thẻ tiếp theo
                setTimeout(() => {
                    flashcardElement.classList.remove('flipped');

                    setTimeout(() => {
                        if (currentCardIndex < filteredCards.length - 1) {
                            currentCardIndex++;
                            showCard(currentCardIndex);
                        } else if (filteredCards.length > 0) {
                            currentCardIndex = 0; // quay lại đầu
                            showCard(currentCardIndex);
                        }
                    }, 300); // delay nhỏ để đảm bảo hiệu ứng lật xong
                }, 1000);

            } else if (difficulty === 'medium') {
                cardStatus[originalIndex] = 1; // Cần ôn
                if (currentCardIndex < filteredCards.length - 1) {
                    currentCardIndex++;
                    showCard(currentCardIndex);
                }
            } else {
                cardStatus[originalIndex] = 0; // Chưa biết
                if (currentCardIndex < filteredCards.length - 1) {
                    currentCardIndex++;
                    showCard(currentCardIndex);
                }
            }


            // Cập nhật thống kê
            updateStats();
        });
    });

    // Lọc theo danh mục
    categorySelectElement.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;

        if (selectedCategory === 'all') {
            filteredCards = [...vocabularyData];
        } else {
            filteredCards = vocabularyData.filter(card => card.category === selectedCategory);
        }

        // Reset về thẻ đầu tiên
        currentCardIndex = 0;
        showCard(currentCardIndex);

        // Nếu đang ở chế độ xáo trộn, hủy xáo trộn
        if (isShuffled) {
            isShuffled = false;
            shuffleButton.textContent = "Xáo trộn thẻ";
        }
    });

    // Nút xáo trộn thẻ
    shuffleButton.addEventListener('click', () => {
        if (isShuffled) {
            sortCards();
        } else {
            shuffleCards();
        }
    });
}

// Khởi chạy ứng dụng khi trang được tải
document.addEventListener('DOMContentLoaded', initApp);