var wallet = 500;
var totalBetAmount = 0;
var playerChoice = 'T';
var diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function updateDisplay() {
    document.getElementById('wallet').textContent = 'Xu: ' + wallet;
    document.getElementById('bet-display').textContent = 'Số xu cược: ' + totalBetAmount;
}

document.getElementById('betButton').addEventListener('click', function() {
    var betAmount = parseInt(document.getElementById('betInput').value);
    playerChoice = document.getElementById('choice').value;

    if (isNaN(betAmount)) {
        alert('Vui lòng nhập một số hợp lệ.');
        return;
    }

    if (betAmount > wallet) {
        alert('Số xu cược không được lớn hơn số dư xu của bạn.');
        return;
    }

    wallet -= betAmount;
    totalBetAmount += betAmount;
    updateDisplay();
});

document.getElementById('rollButton').addEventListener('click', function() {
    if (totalBetAmount === 0) {
        alert('Vui lòng đặt cược trước khi lắc xúc xắc.');
        return;
    }

    var dices = document.getElementsByClassName('dice');
    var rollCount = 0;
    var rolls = 10; // Số lần lăn xúc xắc
    var intervalId = setInterval(function() {
        for (var i = 0; i < dices.length; i++) {
            var diceValue = Math.floor(Math.random() * 6);
            dices[i].textContent = diceFaces[diceValue];
        }
        rollCount++;
        if (rollCount >= rolls) {
            clearInterval(intervalId);
            var sum = Array.from(dices).reduce(function(acc, dice) {
                return acc + parseInt(dice.textContent.charCodeAt(0)) - 9856; // 9856 là mã Unicode cho ⚀
            }, 0);

            setTimeout(function() {
                if ((sum >= 4 && sum <= 9 && playerChoice === 'X') || (sum >= 12 && sum <= 16 && playerChoice === 'T')) {
                    wallet += totalBetAmount * 2;
                    alert('Bạn đã thắng! Số xu hiện tại: ' + wallet);
                } else {
                    alert('Bạn đã thua. Số xu hiện tại: ' + wallet);
                }

                totalBetAmount = 0;
                updateDisplay();
            }, 1000); // Độ trễ 1 giây (1000 milliseconds) cho thông báo kết quả
        }
    }, 100); // Độ trễ giữa các lần lăn là 100 milliseconds
});

// var wallet = 500;
//         var totalBetAmount = 0;
//         var playerChoice = 'T';
//         var diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

//         document.getElementById('betButton').addEventListener('click', function() {
//             betAmount = parseInt(document.getElementById('betInput').value);
//             playerChoice = document.getElementById('choice').value;

//             if (betAmount > wallet) {
//                 alert('Số xu cược không được lớn hơn số dư xu của bạn.');
//                 return;
//             }

//             wallet -= betAmount;
//             totalBetAmount += betAmount;
//             document.getElementById('wallet').textContent = 'Xu: ' + wallet;
//             document.getElementById('bet-display').textContent = 'Số xu cược: ' + totalBetAmount;
//         });

//         document.getElementById('rollButton').addEventListener('click', function() {
//             if (totalBetAmount === 0) {
//                 alert('Vui lòng đặt cược trước khi lắc xúc xắc.');
//                 return;
//             }
        
//             var sum = 0;
//             var dices = document.getElementsByClassName('dice');
//             for (var i = 0; i < dices.length; i++) {
//                 var diceValue = Math.floor(Math.random() * 6);
//                 dices[i].textContent = diceFaces[diceValue];
//                 sum += diceValue + 1; // Cộng 1 vì mảng bắt đầu từ 0
//             }
//         // thay đổi phạm vi thắng của người chơi =))))))))))))))))))))
//             if ((sum >= 4 && sum <= 9 && playerChoice === 'X') || (sum >= 12 && sum <= 16 && playerChoice === 'T')) {
//                 wallet += totalBetAmount * 2;
//                 alert('Bạn đã thắng! Số xu hiện tại: ' + wallet);
//             } else {
//                 alert('Bạn đã thua. Số xu hiện tại: ' + wallet);
//             }
        
//             document.getElementById('wallet').textContent = 'Xu: ' + wallet;
//             totalBetAmount = 0; // Đặt lại tổng số xu cược về 0 sau mỗi lần lắc
//             document.getElementById('bet-display').textContent = 'Số xu cược: ' + totalBetAmount;
//         });