// test

async function fetchData(level) {
    const levelApi = {
        // Easy: 'https://quizapi.io/api/v1/questions?apiKey=gPNKESP86L1YttfsAddBmoLvQbmyL1Lkp3kgYnyc&category=code&difficulty=${level}&limit=1',
        Easy: 'https://quizapi.io/api/v1/questions?apiKey=CcZyi3fohI6Cb4CkhLsFoQvspIbRZXmvBFkjwq7j&limit=1',
        Medium: 'https://quizapi.io/api/v1/questions?apiKey=CcZyi3fohI6Cb4CkhLsFoQvspIbRZXmvBFkjwq7j&limit=1',
        Hard: 'https://quizapi.io/api/v1/questions?apiKey=CcZyi3fohI6Cb4CkhLsFoQvspIbRZXmvBFkjwq7j&limit=1',
    };
    try {
        // Fetch data from the Quiz API with a limit of 1 question
        const response = await fetch(levelApi[level])
        
        // Parse the JSON response
        const data = await response.json()
        
        // Log the data to the console
        console.log(data)
        
        // Display the first question from the fetched data
        displayQuestion(data[0])
    } catch (error) {
        // Handle any errors that occur
        console.error('An unexpected error occurred:', error)
    }
}

// Function to display the question and its answers
function displayQuestion(data) {
    // Set the question text
    document.getElementById('question').textContent = data.question
    
    // Create each answer option. Only include answers that are not null
    // document.getElementById('answers').textContent = data.answers
    const answerKey = ['answer_a', 'answer_b', 'answer_c','answer_d', 'answer_e', 'answer_f'];
    const anwerOptions = data.answers
    const answers = document.getElementById('answers');
    const htmlTemplate = [];
// option
// htmlTemplate.push(`<div class="options" >`)

Object.keys(anwerOptions).forEach( key => { 
    if(anwerOptions[key]){
        htmlTemplate.push(`<label><input class="select" type="checkbox" name="answer"> ${anwerOptions[key]}</label>  `) 
    }    
    
})

// button
htmlTemplate.push(`
</div>
<div class="buttons">
<button type="submit" class="btn submit">Submit</button>
</div>`)
{/* <button type="button" class="btn" id="feedback">Correct ✓</button> */}

answers.innerHTML = htmlTemplate.join('')
}

document.getElementById('easy').addEventListener('click', () => fetchData('Easy'));
document.getElementById('medium').addEventListener('click', () => fetchData('Medium'));
document.getElementById('hard').addEventListener('click', () => fetchData('Hard'));

// Call the fetchData function to initiate the process
fetchData(levelApi[level]);

// const $answers = {
//     "id": 1831,
//     "question": "What does the 'del' statement do in Python?",
//     "description": "The 'del' statement is used to delete references to objects in Python.",
//     "answers": {
//       "answer_a": "Deletes the object from memory",
//       "answer_b": "Deletes the reference to the object",
//       "answer_c": "Sets the object to zero",
//       "answer_d": "Copies the object"
//     },
//     "multiple_correct_answers": "false",
//     "correct_answers": {
//       "answer_a_correct": "false",
//       "answer_b_correct": "true",
//       "answer_c_correct": "false",
//       "answer_d_correct": "false"
//     }
// }
function displayAnswers(data){
const answerKey = ['answer_a', 'answer_b', 'answer_c','answer_d', 'answer_e', 'answer_f'];
const anwerOptions = data.answers
const answers = document.getElementById('answers');
answers.innerHTML=`<div class="options" >
<label><input class="select" type="checkbox" name="answer"> ${anwerOptions}</label>
<label><input class="select" type="checkbox" name="answer"> ${anwerOptions}</label>
<label><input class="select" type="checkbox" name="answer"> ${anwerOptions}</label>
<label><input class="select" type="checkbox" name="answer"> ${anwerOptions}</label>
</div>
`;

}


// scores
let correctAnswer = 0;
let incorrectAnswer = 0;

function scores(){
    correctAnswer.textContent = `Correct Answers: ${correctCount}`;
    incorrectAnswer.textContent = `Incorrect Answers: ${incorrectCount}`;
    localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
  console.log(localStorage.getItem('correctAnswer'), 'scores')
}

const correctAnswerLS = JSON.parse(localStorage.getItem('correctAnswer'))
console.log(localStorage.getItem('correctAnswer'),'LS')
if(correctAnswerLS){
  console.log(correctAnswerLS, 'inside if')
  correctAnswer = correctAnswerLS;
  scores();
}

scores();

// submit
document.querySelector('.submit').addEventListener('click', () => {
    const selectedAnswers = document.querySelectorAll('.select:checked');
    selectedAnswers.forEach(answer => {
        if (answer.getAttribute('data-correct') === 'true') {
            document.querySelector('correct_answer').textContent = 'Correct! 🎉';
            correctAnswer++;
        } else {
            incorrectAnswer++;
            document.querySelector('incorrect_answer').textContent = 'Incorrect! 🎉'
        }
    });

});


