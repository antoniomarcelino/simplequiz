const strBtn = document.getElementById('str-btn')
const nxtBtn = document.getElementById('nxt-btn')
const questionContainer = document.getElementById('question-container')
const questionTitle = document.getElementById('question-title')
const optionButtons = document.getElementById('option-buttons')
let shuffledQuestions, currentQuestionIndex


strBtn.addEventListener('click', startGame)
nxtBtn.addEventListener('click', ()=>{
    currentQuestionIndex++
    setNextQuestion()
})
function startGame(){
    strBtn.classList.add('hide')
    shuffledQuestions = questions.sort(()=>Math.random()-.5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionTitle.innerText = question.title
    question.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        if(option.correct){
            button.dataset.correct = option.correct
        }
        button.addEventListener('click', selectOption)
        optionButtons.append(button)
    })

}

function resetState(){
    clearStatusClass(document.body)
    nxtBtn.classList.add('hide')
    while(optionButtons.firstChild){
        optionButtons.removeChild(optionButtons.firstChild)
    }
}

function selectOption(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(optionButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex+1){
        nxtBtn.classList.remove('hide')
    }else{
        strBtn.innerText = 'Restart'
        strBtn.classList.remove('hide')
    }
        

}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        title: "What is 2 + 2 = ?",
        options: [
            {text: '4', correct: true},
            {text: '1', correct: false},
            {text: '2', correct: false},
            {text: '8', correct: false}
        ]
    },
    {
        title: "What is 4 + 3 = ?",
        options: [
            {text: '4', correct: false},
            {text: '7', correct: true},
            {text: '2', correct: false},
            {text: '8', correct: false}
        ]
    },
    {
        title: "What is 6 + 6 = ?",
        options: [
            {text: '27', correct: false},
            {text: '10', correct: false},
            {text: '12', correct: true},
            {text: '18', correct: false}
        ]
    },
    {
        title: "What is 10 + 10 = ?",
        options: [
            {text: '20', correct: true},
            {text: '10', correct: false},
            {text: '200', correct: false},
            {text: '100', correct: false}
        ]
    }
]

