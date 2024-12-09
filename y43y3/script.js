document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    let timer;
    let remainingTime = 0;

    const themeButton = document.getElementById("themeButton");
    const clickButton = document.getElementById("clickButton");
    const timerElement = document.getElementById("timer");
    const resultElement = document.getElementById("result");
    const finalScore = document.getElementById("finalScore");
    const scoreElement = document.getElementById("score");
    const leaderboardTable = document.getElementById("leaderboard-table");
    const welcomeModal = document.getElementById("welcomeModal");
    const closeModal = document.getElementById("closeModal");

    
    setTimeout(() => {
        welcomeModal.style.display = "flex";
    }, 500);

    closeModal.addEventListener("click", () => {
        welcomeModal.style.display = "none";
    });

    
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const themeIcon = document.body.classList.contains("dark-theme") ? "Light" : "Dark";
        themeButton.textContent = themeIcon;
    });

    
    const modeButtons = document.querySelectorAll(".mode-btn");
    modeButtons.forEach(button => {
        button.addEventListener("click", function () {
            score = 0;
            scoreElement.textContent = `Очки: ${score}`;
            resultElement.style.display = "none";
            remainingTime = parseInt(this.getAttribute("data-time"));
            timerElement.textContent = `Таймер: ${remainingTime}s`;
            clickButton.disabled = false;

            
            clearInterval(timer);
            timer = setInterval(function () {
                remainingTime--;
                timerElement.textContent = `Таймер: ${remainingTime}s`;
                if (remainingTime <= 0) {
                    clearInterval(timer);
                    clickButton.disabled = true;
                    resultElement.style.display = "block";
                    finalScore.textContent = score;

                    
                    addToLeaderboard(score);
                }
            }, 1000);
        });
    });

    
    clickButton.addEventListener("click", function () {
        score++;
        scoreElement.textContent = `Очки: ${score}`;
    });

    
    function addToLeaderboard(score) {
        const name = prompt("Введите ваше имя для таблицы лидеров:");
        if (!name) return;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td></td><td>${name}</td><td>${score}</td>`;
        leaderboardTable.appendChild(newRow);

        
        const rows = Array.from(leaderboardTable.rows);
        rows.sort((rowA, rowB) => {
            const scoreA = parseInt(rowA.cells[2].textContent);
            const scoreB = parseInt(rowB.cells[2].textContent);
            return scoreB - scoreA;
        });

        
        rows.slice(0, 5).forEach((row, index) => {
            row.cells[0].textContent = index + 1;
            leaderboardTable.appendChild(row);
        });
    }

    

    
    const reactionTestBtn = document.getElementById("reactionTestBtn");
    const reactionTestDiv = document.getElementById("reactionTest");
    const reactionButton = document.getElementById("reactionButton");
    const reactionResult = document.getElementById("reactionResult");

    reactionTestBtn.addEventListener("click", function () {
        reactionTestDiv.style.display = "block";
        startReactionTest();
    });

    function startReactionTest() {
        let timeout;

        timeout = setTimeout(function () {
            reactionButton.textContent = "Нажмите!";
            const start = Date.now();

            reactionButton.addEventListener("click", function () {
                const end = Date.now();
                const reactionTime = (end - start) / 1000;
                reactionResult.textContent = `Ваша реакция: ${reactionTime.toFixed(2)} секунд`;
                reactionButton.disabled = true;
            });
        }, Math.random() * 4000 + 1000);
    }

    const clickSpeedTestBtn = document.getElementById("clickSpeedTestBtn");
    const clickSpeedTestDiv = document.getElementById("clickSpeedTest");
    let clickSpeedScore = 0;

    clickSpeedTestBtn.addEventListener("click", function () {
        clickSpeedTestDiv.style.display = "block";
        document.body.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                clickSpeedScore++;
                document.getElementById("clickSpeedResult").textContent = `Очки: ${clickSpeedScore}`;
            }
        });
    });

    
    const mouseSpinTestBtn = document.getElementById("mouseSpinTestBtn");
    let mouseSpinScore = 0;

    mouseSpinTestBtn.addEventListener("click", function () {
        const mouseSpinTestDiv = document.getElementById("mouseSpinTest");
        mouseSpinTestDiv.style.display = "block";
        document.addEventListener("mousemove", () => {
            mouseSpinScore++;
            document.getElementById("mouseSpinResult").textContent = `Количество вращений: ${mouseSpinScore}`;
        });
    });
});
