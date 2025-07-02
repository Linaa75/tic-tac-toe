const arr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
console.log(arr);
let step = 1;

for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; k++) {
        const div = document.createElement('div');
        div.setAttribute('data-x', i);
        div.setAttribute('data-y', k);
        ttt.append(div);
    }
}

function click(event) {
    const x = +event.target.getAttribute('data-x');
    const y = +event.target.getAttribute('data-y');
    console.log(x, y);
    
    if (arr[x][y] !== 0) return;
    arr[x][y] = step;
    console.log(arr);

    draw();
    checkWinner(step);

    step = (step === 1) ? 2 : 1;
}

const tttDiv = document.querySelectorAll('#ttt>div');

function draw() {
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
            switch (arr[i][k]) {
                case 1:
                    tttDiv[i * 3 + k].textContent = 'X';
                    break
                case 2:
                    tttDiv[i * 3 + k].textContent = '0';
                    break
            }
        };
    };
}

function checkWinner(step) {
    if (
        (arr[0][0] === step && arr[0][1] === step && arr[0][2] === step)
        || (arr[1][0] === step && arr[1][1] === step && arr[1][2] === step)
        || (arr[2][0] === step && arr[2][1] === step && arr[2][2] === step)
        || (arr[0][0] === step && arr[1][0] === step && arr[2][0] === step)
        || (arr[0][1] === step && arr[1][1] === step && arr[2][1] === step)
        || (arr[0][2] === step && arr[1][2] === step && arr[2][2] === step)
        || (arr[0][0] === step && arr[1][1] === step && arr[2][2] === step)
        || (arr[0][2] === step && arr[1][1] === step && arr[2][0] === step)
    ) {
        showWin(step);
        return;
    }
    if (!arr.flat().includes(0)) showDraw();
}

function showWin(step) {
    console.log('Win '+(step === 1 ? 'X' : '0'));
    ttt.removeEventListener('click', click);
    ttt.style.opacity = .5;
    document.querySelector('.out').textContent = 'Win: '+(step === 1 ? 'X' : '0');
}

function showDraw() {
    console.log('Draw');
    ttt.removeEventListener('click', click);
    ttt.style.opacity = .5;
    document.querySelector('.out').textContent = 'Draw';
}

ttt.addEventListener('click', click);
document.querySelector('.button-start-new-game').onclick = function() {
    location.reload();
}