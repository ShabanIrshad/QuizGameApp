// ------------------------//GETTIN ELEMENTS BY DOM------------------------//
const b=document.querySelector('body');
const scoreDiv=document.getElementById('score');
const questDiv=document.getElementById('question');
const opt=document.getElementById('optionDiv');
const nextButton=document.getElementById("next-btn");
const result=document.getElementById('result');
const rulesDiv=document.getElementById("rulesDiv");
const menuDiv=document.getElementById('menu-div');
const startQuiz=document.getElementById('start-quiz');
const refreshDiv=document.getElementById('refreshDiv');
const refreshBtn=document.getElementById('refresh')

//--------------- RAW DATA FOR PLAYING QUIZ------------------------------/
const quesJSon=[
    {
        id:1,
        correctOption:'Leu',
        options:['Dollar','Rupee','Euro','Leu'],
        question:'What is the currency of Romania?'
    },
    {
        id:2,
        correctOption:'President',
        options:['President','Police','civillians','Prime-Minister'],
        question:'Who is the first person of India?'
    },
    {
        id:3,
        correctOption:'Oceania',
        options:['Asia','Malayshiya','Oceania','south-America'],
        question:'What do we call the Australian Continent?'
    },
    {
        id:4,
        correctOption:'Dhaka',
        options:['Nagaland','Dhaka','Bangkok','Kolkata'],
        question:'What is the capital of Bangladesh?'
    },
    {
        id:5,
        correctOption:'Kiki Hakansson',
        options:['Angelina Jolly','May-Louise Flodin','Kiki Hakansson','Aishwarya Rai'],
        question:'What is the name of first miss world?'
    },
     {
        id:6,
        correctOption:'27474',
        options:['34748','27474','30154','27574','None of these'],
        question:'(?) + 3699 + 1985 - 2047 = 31111'
    },
      {
        id:7,
        correctOption:'23 years',
        options:['23 years','24 years','25 years','None of these'],
        question:'The captain of a cricket team of 11 members is 26 years old and the wicket keeper is 3 years older. If the ages of these two are excluded, the average age of the remaining players is one year less than the average age of the whole team. What is the average age of the team?'
    },
      {
        id:8,
        correctOption:'22',
        options:['20','21','22','24'],
        question:'How many times do the hands of a clock coincide in a day?'
    },
      {
        id:9,
        correctOption:'28',
        options:['28','21','24','30'],
        question:'6, 9, 15, 21, 24, 28, 30  Odd man out'
    },
      {
        id:10,
        correctOption:'11',
        options:['10','11','12','9'],
        question:'find Wrong number in 4, 6, 8, 9, 10, 11, 12'
    },
      
     

];

//  ------------------------//CREATED RESULT ARRAY FOR BEST INTIMATIONS ABOUT RESULT//------------------------//
const resArr=[];


//------------------------------//USING VARIABLES FOR GRINDING VALUES//------------------------------// 
let currentQuestion=0;
let score=0;
scoreDiv.textContent=`Score : 0/${quesJSon.length}`;



// Add suffle
function shuffleOptions(arr) {
    const copied = [...arr];
    for (let i = copied.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
}
//------------------------------NEXT QUESTION FUNCTION------------------------------/

function nextQuestion(index) {
    opt.textContent = "";
    questDiv.textContent = "";

    if (index >= quesJSon.length) {
        // End of quiz
        showResult(resArr);
        nextButton.style.display = 'none';
        questDiv.textContent = "Quiz Completed !!";
        scoreDiv.textContent = `Final Score: ${score}/${quesJSon.length}`;
        scoreDiv.style.backgroundColor = score > 3.0 ? "#4561ed" : "red";
        scoreDiv.textContent += score > 3.0 ? "\nYou've successfully passed the test!" : "\nYou've failed!";
        return;
    }

    currentQuestion = index;
    const { id, question, options, correctOption } = quesJSon[index];
    questDiv.textContent = question;
    nextButton.style.display = "none";

    const shuffled = shuffleOptions(options);

    shuffled.forEach(option => {
        const p = document.createElement('p');
        p.classList.add('option');
        p.textContent = option;
        opt.appendChild(p);

        p.addEventListener('click', () => {
            // Disable all other options
            document.querySelectorAll('.option').forEach(btn => btn.style.pointerEvents = "none");

            let correct = option === correctOption;
            if (correct) {
                score++;
                p.style.backgroundColor = "green";
            } else {
                score -= 0.25;
                p.style.backgroundColor = "red";
            }

            // Push to result array ONCE
            resArr.push({ id, question, answer: option, correct });

            scoreDiv.textContent = `Score : ${score}/${quesJSon.length}`;

            if (correct) {
                // Jump to next after short delay
                setTimeout(() => nextQuestion(currentQuestion + 1), 500);
            } else {
                // Wait for user to click "Next"
                nextButton.style.display = "block";
            }
        });
    });
}


nextButton.addEventListener('click', () => {
    nextButton.style.display = "none";
    nextQuestion(currentQuestion + 1);
});

//------------------------------//JUMP QUESTION FUNCTION//------------------------------//
function jumpQuestion(currentQuestion){
    console.log(currentQuestion+" in jump question");
    if(currentQuestion<quesJSon.length-1){
        nextQuestion(currentQuestion+1)
    }else{
        showResult(resArr);
        nextButton.style.display='none';
        questDiv.textContent="Quiz Completed !!";
        scoreDiv.textContent=`Final Score: ${score}/${quesJSon.length}\n`;
        if(score>3.0){
            // console.log(score);
           scoreDiv.style.backgroundColor="#4561ed"; 
           scoreDiv.textContent+="\nYou've successfuly passed the test !";
        }else{
            scoreDiv.style.backgroundColor="red";
            scoreDiv.textContent+="\nYou've got failed!";
        }
        
        
    }
    
}

//------------------------------//SHOW RESULT FUNCTION//------------------------------//
function showResult(arr) {
    result.style.display = "block";
    const table = document.getElementById('table');
    const caption=document.getElementById('caption');

    table.innerHTML = ""; 
    table.appendChild(caption);
    

    arr.forEach(obj => {
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.textContent = obj.id;

        const td2 = document.createElement('td');
        td2.textContent = obj.question;

        const td3 = document.createElement('td');
        td3.textContent = obj.answer;

        const td4 = document.createElement('td');
        td4.textContent = obj.correct ? "Correct" : "Wrong";
        td4.style.fontWeight = "700";

        tr.style.backgroundColor = obj.correct ? "#68c94b" : "#f55d67";
        if (!obj.correct) td3.style.textDecoration = "line-through";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);
    });
}

function loadQuiz(){
    rulesDiv.style.display="block";
    question.style.display="none";
    opt.style.display="none";
    result.style.display="none"; 
     scoreDiv.style.backgroundColor="";   
    scoreDiv.style.display="none";
    menuDiv.style.display="none";
    refreshDiv.style.display="none";   
}
startQuiz.addEventListener('click',()=>{
     rulesDiv.style.display="none";
    question.style.display="block";
    opt.style.display="block";
    result.style.display="none";    
    scoreDiv.style.display="block";
    menuDiv.style.display="block";    
    nextQuestion(currentQuestion);
})
loadQuiz();
