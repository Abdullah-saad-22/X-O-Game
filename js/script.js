

let title = document.querySelector('.title');
let turn = 'x'; // يبدأ اللاعب
let squares = [];
let gameOver = false; // متغير لتتبع ما إذا كانت اللعبة انتهت أم لا

function end(num1, num2, num3) {
    title.innerHTML = squares[num1];
    document.getElementById('item' + num1).style.background = '#000';
    document.getElementById('item' + num2).style.background = '#000';
    document.getElementById('item' + num3).style.background = '#000';
    gameOver = true; // الإشارة إلى أن اللعبة انتهت
    setInterval(function () { title.innerHTML += '.' }, 1000);
    setTimeout(function () { location.reload() }, 4000);
}

function checkDraw() {
    let isDraw = true;
    for (let i = 1; i < 10; i++) {
        if (squares[i] === '') {
            isDraw = false;
            break;
        }
    }
    if (isDraw && !gameOver) { // تحقق من عدم انتهاء اللعبة قبل إعلان التعادل
        title.innerHTML = 'It\'s a Draw!';
        gameOver = true; // إنهاء اللعبة بعد التعادل
        setTimeout(function () { location.reload() }, 4000);
    }
}

function winner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }

    // تحقق من جميع احتمالات الفوز
    if (squares[1] === squares[2] && squares[2] === squares[3] && squares[1] !== '') {
        end(1, 2, 3);
    } else if (squares[4] === squares[5] && squares[5] === squares[6] && squares[4] !== '') {
        end(4, 5, 6);
    } else if (squares[7] === squares[8] && squares[8] === squares[9] && squares[7] !== '') {
        end(7, 8, 9);
    } else if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== '') {
        end(1, 4, 7);
    } else if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== '') {
        end(2, 5, 8);
    } else if (squares[3] === squares[6] && squares[6] === squares[9] && squares[3] !== '') {
        end(3, 6, 9);
    } else if (squares[1] === squares[5] && squares[5] === squares[9] && squares[1] !== '') {
        end(1, 5, 9);
    } else if (squares[3] === squares[5] && squares[5] === squares[7] && squares[3] !== '') {
        end(3, 5, 7);
    } else {
        checkDraw(); // التحقق مما إذا كانت اللعبة انتهت بالتعادل
    }
}

function checkWinningMove(player) {
    // تحقق من جميع الاحتمالات لخطوة الفوز للاعب (اللاعب أو الكمبيوتر)
    let winningCombination = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let i = 0; i < winningCombination.length; i++) {
        let [a, b, c] = winningCombination[i];
        if (squares[a] === player && squares[b] === player && squares[c] === '') {
            return c;
        } else if (squares[a] === player && squares[b] === '' && squares[c] === player) {
            return b;
        } else if (squares[a] === '' && squares[b] === player && squares[c] === player) {
            return a;
        }
    }
    return null;
}

function computerMove() {
    if (gameOver) return;

    let move;

    // 1. محاولة الفوز
    move = checkWinningMove('O');
    if (move) {
        document.getElementById('item' + move).innerHTML = 'O';
        title.innerHTML = 'X\'s turn';
        turn = 'x';
        winner();
        return;
    }

    // 2. منع اللاعب من الفوز
    move = checkWinningMove('X');
    if (move) {
        document.getElementById('item' + move).innerHTML = 'O';
        title.innerHTML = 'X\'s turn';
        turn = 'x';
        winner();
        return;
    }

    // 3. إذا لم تكن هناك فرصة للفوز أو للمنع، اختر حركة عشوائية
    let availableSquares = [];
    for (let i = 1; i < 10; i++) {
        if (document.getElementById('item' + i).innerHTML === '') {
            availableSquares.push(i);
        }
    }

    if (availableSquares.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableSquares.length);
        let selectedSquare = availableSquares[randomIndex];
        document.getElementById('item' + selectedSquare).innerHTML = 'O';
        title.innerHTML = 'X\'s turn';
        turn = 'x';
        winner();
    }
}

function game(id) {
    let element = document.getElementById(id);
    if (!gameOver && element.innerHTML === '' && turn === 'x') { // التحقق مما إذا كانت اللعبة لم تنته وما إذا كانت الخلية فارغة ودور اللاعب
        element.innerHTML = 'X';
        turn = 'o'; // تغيير الدور إلى الكمبيوتر
        title.innerHTML = 'Computer\'s turn'; // تغيير العنوان ليشير إلى دور الكمبيوتر
        winner(); // التحقق مما إذا كان هناك فائز بعد حركة اللاعب
        if (!gameOver) {
            setTimeout(computerMove, 500); // جعل الكمبيوتر يتحرك بعد نصف ثانية
        }
    }
}
