const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 9;
const select = [];

function calResult(){
    var pointArray = [
        //FND,U2D,DA,SWT,DM,WD,SA,BND
        {name: 'FND', value: 0, key: 0},
        {name: 'U2D', value: 0, key: 1},
        {name: 'DA', value: 0, key: 2},
        {name: 'SWT', value: 0, key: 3},
        {name: 'DM', value: 0, key: 4},
        {name: 'WD', value: 0, key: 5},
        {name: 'SA', value: 0, key: 6},
        {name: 'BND', value: 0, key: 7},
    ]

    for(let i = 0; i < endPoint; i++){
        var target = qnaList[i].a[select[i]];
        for(let j = 0; j < target.type.length; j++){
            for(let k = 0; k < pointArray.length; k++){
                if(target.type[j] == pointArray[k].name){
                    pointArray.value += 1;
                }
            }
        }
    }

    var resultArray = pointArray.sort(function (a,b){
        if(a.value > b.value){
            return -1;
        }
        if(a.value > b.value){
            return 1;
        }
        return 0;
    })
    let resultword = resultArray[0].key;
    return resultword;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.aniamation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.aniamation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        },450)
    }); 

    //console.log(select);
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox')
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer)
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 1s";
            children[i].style.aniamation = "fadeOut 1s";
        }
        setTimeout(() => {
            select[qIdx] = idx;
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    }, false);
}
function goNext(qIdx){
    if(qIdx == endPoint){
        goResult()
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.aniamation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.aniamation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        },450)
        let qIdx = 0;
        goNext(qIdx);
    },450);
}