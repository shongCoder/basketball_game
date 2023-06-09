//컴퓨터 오브젝트
var computer = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
}

//사용자 오브젝트
var user = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
}

//게임 오브젝트
var game = {
    isComputerTurn : true,
    shotsLeft : 15
}


//컴퓨터 슛 로직
function onCumputerShoot(){
    //안내문
    function showText(s){
        var textElem = document.getElementById('text');
        textElem.innerHTML = s;
    }

    //점수판 텍스트
    function updateComputerScore(score){
        computer.score += score;
        var comScoreElem =document.getElementById('computer-score')
        comScoreElem.innerHTML = computer.score;
    }

    if(!game.isComputerTurn){
        return;
    }

    function updateAI(){
        var diff = user.score - computer.score;

        if(diff >= 6){
            computer.percent2 = 0.6;
            computer.percent3 = 0.38;
        }else if(diff >= 10){
            computer.percent2 = 0.7;
            computer.percent3 = 0.43; //여기까진 이기고 있는 상황
        }else if(diff <= -6){
            computer.percent2 = 0.4;
            computer.percent3 = 0.28;
        }else if(diff <= -10){
            computer.percent2 = 0.3;
            computer.percent3 = 0.23; //지고 있는 상황
        }
    }
    
    updateAI();

    var comScoreElem = document.getElementById('computer-score');
    var shootType = Math.random() < 0.5 ? 2 : 3;
    
    
    if(Math.random() < computer['percent' + shootType]){
        showText('컴퓨터가' + shootType + '점슛을 성공시켰습니다!');
        updateComputerScore(shootType);
    }else{
        showText('컴퓨터가' + shootType + '점슛을 실패했습니다.');
    }

    game.isComputerTurn = false; //한 번 실행하면 턴 종료
    
    //버튼 비활성화
    function disableComputerButtons(flag){
        var computerButtons = document.getElementsByClassName('btn-computer');

        for(var i = 0; i < computerButtons.length; i++){
            computerButtons[i].disabled = flag;
        }
    }
    disableComputerButtons(true);

    function disableUserButtons(flag){
        var userButtons = document.getElementsByClassName('btn-user');

        for(var i = 0; i < userButtons.length; i++){
            userButtons[i].disabled = flag;
        }
    }
    disableUserButtons(false);
}

//사용자 슛 로직
function onUserShoot(shootType){
    //안내문
    function showText(s){
        var textElem = document.getElementById('text');
        textElem.innerHTML = s;
    }

    //점수판 텍스트
    function updateUserScore(score){
        user.score += score;
        var userScoreElem = document.getElementById('user-score');
        userScoreElem.innerHTML = user.score;
    }

    if(game.isComputerTurn){
        return;
    }
    
    if(Math.random() < user['percent' + shootType]){
        showText(shootType + '점슛이 성공했습니다!');
        updateUserScore(shootType);
    }else{
        showText(shootType + '점슛이 실패했습니다.');
    }
    game.isComputerTurn = true; //한 번 실행하면 컴퓨터의 턴

    //버튼 비활성화
    function disableComputerButtons(flag){
        var computerButtons = document.getElementsByClassName('btn-computer');

        for(var i = 0; i < computerButtons.length; i++){
            computerButtons[i].disabled = flag;
        }
    }
    disableComputerButtons(false);

    function disableUserButtons(flag){
        var userButtons = document.getElementsByClassName('btn-user');

        for(var i = 0; i < userButtons.length; i++){
            userButtons[i].disabled = flag;
        }
    }
    disableUserButtons(true);

    //남은 슛 횟수 감소
    game.shotsLeft--;

    var shotsLeftElem = document.getElementById('shots');
    shotsLeftElem.innerHTML = game.shotsLeft;

    //승패 여부 로직
    if(game.shotsLeft === 0){
        if(user.score > computer.score){
            showText('승리했습니다!!');
        }else if(user.score < computer.score){
            showText('넌 졌다');
        }else{
            showText('비겼습니다');
        }

        function disableComputerButtons(flag){
            var computerButtons = document.getElementsByClassName('btn-computer');
    
            for(var i = 0; i < computerButtons.length; i++){
                computerButtons[i].disabled = flag;
            }
        }
        disableComputerButtons(true);
    
        function disableUserButtons(flag){
            var userButtons = document.getElementsByClassName('btn-user');
    
            for(var i = 0; i < userButtons.length; i++){
                userButtons[i].disabled = flag;
            }
        }
        disableUserButtons(true);
    }
}