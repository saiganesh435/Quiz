let questions = [
	{
		text: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Rome"],
		answer: 0
	},
	{
		text: "What is the largest planet in our solar system?",
		options: ["Earth", "Saturn", "Jupiter", "Uranus"],
		answer: 2
	},
	{
		text: "What is the smallest country in the world?",
		options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
		answer: 0
	},
	{
		text: "What is the largest living species of lizard?",
		options: ["Komodo dragon", "Saltwater crocodile", "Black mamba", "Green anaconda"],
		answer: 0
	},
	{
		text: "What is the highest mountain peak in the solar system?",
		options: ["Mount Everest", "Olympus Mons", "Mauna Kea", "Denali"],
		answer: 1
	}
];

let currentQuestion = 0;
let score = 0;
let answers = [];

document.getElementById("question-text").textContent = questions[currentQuestion].text;
document.getElementById("option1-text").textContent = questions[currentQuestion].options[0];
document.getElementById("option2-text").textContent = questions[currentQuestion].options[1];
document.getElementById("option3-text").textContent = questions[currentQuestion].options[2];
document.getElementById("option4-text").textContent = questions[currentQuestion].options[3];

document.getElementById("next-button").addEventListener("click", nextQuestion);
document.getElementById("previous-button").addEventListener("click", previousQuestion);
document.getElementById("submit-button").addEventListener("click", submitQuiz);
document.getElementById("show-button").addEventListener("click", showAnswers);

function nextQuestion() {
	if (document.querySelector('input[name="option"]:checked')) {
		let answer = document.querySelector('input[name="option"]:checked').id;
        answers.push(answer);
		currentQuestion++;
	
		if (currentQuestion < questions.length) {
			document.getElementById("question-text").textContent = questions[currentQuestion].text;
			document.getElementById("option1-text").textContent = questions[currentQuestion].options[0];
			document.getElementById("option2-text").textContent = questions[currentQuestion].options[1];
			document.getElementById("option3-text").textContent = questions[currentQuestion].options[2];
			document.getElementById("option4-text").textContent = questions[currentQuestion].options[3];
			document.querySelectorAll('input[name="option"]').forEach(option => option.checked = false);
		} else {
			document.getElementById("submit-button").style.display = "block";
			document.getElementById("next-button").style.display = "none";
		}
	} else {
		alert("Please select an option before moving to the next question.");
	}
}

function previousQuestion() {
	if (currentQuestion > 0) {
		currentQuestion--;
		document.getElementById("question-text").textContent = questions[currentQuestion].text;
		document.getElementById("option1-text").textContent = questions[currentQuestion].options[0];
		document.getElementById("option2-text").textContent = questions[currentQuestion].options[1];
		document.getElementById("option3-text").textContent = questions[currentQuestion].options[2];
		document.getElementById("option4-text").textContent = questions[currentQuestion].options[3];
		document.getElementById("submit-button").style.display = "none";
		document.getElementById("next-button").style.display = "block";
	}
}

function submitQuiz() {
	for (let i = 0; i < answers.length; i++) {
		if (answers[i] === `option${questions[i].answer + 1}`) {
			score++;
		}
	}
	document.getElementById("result-text").textContent = `You scored ${score} out of ${questions.length}.`;
	document.getElementById("submit-button").style.display = "none";
	document.getElementById("show-button").style.display = "block";
	document.getElementById("previous-button").style.display = "none";
}

function showAnswers() {
	let answerHTML = "";
	for (let i = 0; i < questions.length; i++) {
		if (answers[i] === `option${questions[i].answer + 1}`) {
			answerHTML += `<p class="correct">${questions[i].text} - You answered: ${questions[i].options[questions[i].answer]} (Correct)</p>`;
		} else {
			answerHTML += `<p class="incorrect">${questions[i].text} - You answered: ${questions[i].options[parseInt(answers[i].slice(6)) - 1]} (Incorrect - Correct answer: ${questions[i].options[questions[i].answer]})</p>`;
		}
	}
	document.getElementById("answer-container").innerHTML = answerHTML;
}