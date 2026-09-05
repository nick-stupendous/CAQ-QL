const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "#000000";

// --- MUSIC CONTROL (AUTO-PLAY ON LOAD) ---
const originalTheme = document.getElementById('originalTheme');
const tchaikovskyAllegro = document.getElementById('tchaikovskyAllegro');
const nutcrackerTheme = document.getElementById('nutcrackerTheme');
const gameOverSong = document.getElementById('gameOverSong');
let currentSong = null;
let isGameOver = false;
let musicStarted = false;

// Set volume to 30% for all songs
originalTheme.volume = 0.3;
tchaikovskyAllegro.volume = 0.3;
nutcrackerTheme.volume = 0.3;
gameOverSong.volume = 0.3;

// --- PLAY FUNCTIONS ---

// ORIGINAL THEME - Korobeiniki
function playOriginalTheme() {
    if (currentSong && !currentSong.paused) {
        currentSong.pause();
        currentSong.currentTime = 0;
    }
    originalTheme.currentTime = 0;
    originalTheme.play().catch(e => console.log('Play error:', e));
    currentSong = originalTheme;
    musicStarted = true;
}

// Tchaikovsky - Allegro Moderato
function playTchaikovskyAllegro() {
    if (currentSong && !currentSong.paused) {
        currentSong.pause();
        currentSong.currentTime = 0;
    }
    tchaikovskyAllegro.currentTime = 0;
    tchaikovskyAllegro.play().catch(e => console.log('Play error:', e));
    currentSong = tchaikovskyAllegro;
    musicStarted = true;
}

// Nutcracker Theme
function playNutcrackerTheme() {
    if (currentSong && !currentSong.paused) {
        currentSong.pause();
        currentSong.currentTime = 0;
    }
    nutcrackerTheme.currentTime = 0;
    nutcrackerTheme.play().catch(e => console.log('Play error:', e));
    currentSong = nutcrackerTheme;
    musicStarted = true;
}

// Game Over - Chopin Sonata No. 2
function playGameOverSong() {
    if (currentSong && !currentSong.paused) {
        currentSong.pause();
        currentSong.currentTime = 0;
    }
    gameOverSong.currentTime = 0;
    gameOverSong.play().catch(e => console.log('Play error:', e));
    currentSong = gameOverSong;
}

// Stop Music
function stopMusic() {
    if (currentSong && !currentSong.paused) {
        currentSong.pause();
        currentSong.currentTime = 0;
        currentSong = null;
    }
}

// Toggle Music
function toggleMusic() {
    if (currentSong && !currentSong.paused) {
        currentSong.pause();
    } else if (currentSong) {
        currentSong.play().catch(e => console.log('Play error:', e));
    } else {
        playOriginalTheme();
    }
}

// --- ORIGINAL THEME BUTTON ---
const korobeinikiBtn = document.getElementById('playKorobeinikiBtn');
if (korobeinikiBtn) {
    korobeinikiBtn.addEventListener('click', function() {
        playOriginalTheme();
        this.textContent = 'ORIGINAL THEME';
        this.style.background = '#00ff41';
        this.style.color = '#000000';
        setTimeout(() => {
            this.textContent = 'ORIGINAL THEME';
        }, 1000);
    });
}

// --- AUTO-START MUSIC ON PAGE LOAD ---
function autoStartMusic() {
    if (!musicStarted) {
        playOriginalTheme();
    }
}

window.addEventListener('load', function() {
    setTimeout(autoStartMusic, 100);
});

document.addEventListener('click', function startOnClick() {
    if (!musicStarted) {
        playOriginalTheme();
    }
    document.removeEventListener('click', startOnClick);
}, { once: true });

document.addEventListener('keydown', function startOnKey() {
    if (!musicStarted) {
        playOriginalTheme();
    }
    document.removeEventListener('keydown', startOnKey);
}, { once: true });

// --- PREVENT PAGE SCROLL ON ARROW KEYS ---
document.addEventListener('keydown', function(event) {
    const keys = [32, 37, 38, 39, 40];
    if (keys.includes(event.keyCode)) {
        event.preventDefault();
    }
}, { passive: false });

// --- NEON COLORS FOR BLOCK OUTLINES ---
const NEON_COLORS = {
    Z: "#ff0040",
    S: "#39ff14",
    T: "#ff00de",
    O: "#00ffff",
    L: "#ff7308",
    I: "#0066ff",
    J: "#b802fd"
};

// Draw a square - NO SHADOW EFFECTS for clean lines
function drawSquare(x, y, color) {
    if (color === VACANT || color === "WHITE" || color === "#ffffff" || !color) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
        return;
    }
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// Create the board
let board = [];
for (r = 0; r < ROW; r++) {
    board[r] = [];
    for (c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// Clear the canvas completely
function clearCanvas() {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}

// Draw the board with grid lines
function drawBoard() {
    clearCanvas();
    
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
    
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 0.5;
    
    for (let c = 0; c <= COL; c++) {
        ctx.beginPath();
        ctx.moveTo(c * SQ, 0);
        ctx.lineTo(c * SQ, ROW * SQ);
        ctx.stroke();
    }
    
    for (let r = 0; r <= ROW; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * SQ);
        ctx.lineTo(COL * SQ, r * SQ);
        ctx.stroke();
    }
}

// Draw neon border
function drawNeonBorder() {
    ctx.shadowColor = "#00ff41";
    ctx.shadowBlur = 30;
    ctx.strokeStyle = "#00ff41";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, COL * SQ, ROW * SQ);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
}

drawBoard();
drawNeonBorder();

// PIECES
const PIECES = [
    [Z, NEON_COLORS.Z],
    [S, NEON_COLORS.S],
    [T, NEON_COLORS.T],
    [O, NEON_COLORS.O],
    [L, NEON_COLORS.L],
    [I, NEON_COLORS.I],
    [J, NEON_COLORS.J]
];

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;
}

Piece.prototype.fill = function(color) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                const x = this.x + c;
                const y = this.y + r;
                if (y >= 0 && y < ROW && x >= 0 && x < COL) {
                    drawSquare(x, y, color);
                }
            }
        }
    }
}

Piece.prototype.draw = function() {
    this.fill(this.color);
}

Piece.prototype.unDraw = function() {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                const x = this.x + c;
                const y = this.y + r;
                if (y >= 0 && y < ROW && x >= 0 && x < COL) {
                    drawSquare(x, y, board[y][x]);
                }
            }
        }
    }
}

function fullRedraw() {
    drawBoard();
    if (p && !isGameOver) {
        p.draw();
    }
    drawNeonBorder();
}

Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.y++;
        fullRedraw();
    } else {
        this.lock();
        p = randomPiece();
        fullRedraw();
    }
}

Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.x++;
        fullRedraw();
    }
}

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.x--;
        fullRedraw();
    }
}

Piece.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;
    
    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
            kick = -1;
        } else {
            kick = 1;
        }
    }
    
    if (!this.collision(kick, 0, nextPattern)) {
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        fullRedraw();
    }
}

let score = 0;

Piece.prototype.lock = function() {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) continue;
            if (this.y + r < 0) {
                isGameOver = true;
                playGameOverSong();
                swal({
                    title: "GAME OVER",
                    text: "Score: " + score,
                    icon: "error",
                    button: "RESTART",
                }).then(() => {
                    location.reload();
                });
                gameOver = true;
                return;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    
    for (r = 0; r < ROW; r++) {
        let isRowFull = true;
        for (c = 0; c < COL; c++) {
            if (board[r][c] === VACANT) {
                isRowFull = false;
                break;
            }
        }
        if (isRowFull) {
            for (y = r; y > 1; y--) {
                for (c = 0; c < COL; c++) {
                    board[y][c] = board[y - 1][c];
                }
            }
            for (c = 0; c < COL; c++) {
                board[0][c] = VACANT;
            }
            score += 10;
        }
    }
    scoreElement.innerHTML = score;
}

Piece.prototype.collision = function(x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            if (!piece[r][c]) continue;
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if (newX < 0 || newX >= COL || newY >= ROW) return true;
            if (newY < 0) continue;
            if (board[newY][newX] !== VACANT) return true;
        }
    }
    return false;
}

// KEYBOARD CONTROLS
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if (isGameOver) return;
    
    event.preventDefault();
    
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.rotate();
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown();
    }
}

let dropStart = Date.now();
let gameOver = false;

function drop() {
    if (isGameOver) return;
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }
    
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

drop();