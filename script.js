
/* =========================================
   AI STUDYMATE - MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. AI CHATBOT
========================================= */

const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.classList.add("message");
    message.classList.add(sender + "-message");

    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function getDemoReply(question) {

    const text = question.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
        return "Hello! What subject are you studying today?";
    }

    if (text.includes("photosynthesis")) {
        return "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to make glucose and release oxygen.";
    }

    if (text.includes("javascript")) {
        return "JavaScript is a programming language used to make websites interactive.";
    }

    if (text.includes("html")) {
        return "HTML stands for HyperText Markup Language. It provides the structure of a webpage.";
    }

    if (text.includes("css")) {
        return "CSS stands for Cascading Style Sheets. It controls the appearance of webpages.";
    }

    if (text.includes("python")) {
        return "Python is a beginner-friendly programming language used in AI, automation, and web development.";
    }

    if (text.includes("exam") || text.includes("study")) {
        return "Try studying for 25 minutes and taking a 5-minute break. Focus on one topic at a time.";
    }

    if (text.includes("quiz")) {
        return "Practice questions regularly to test your understanding and improve your knowledge.";
    }

    if (text.includes("thank")) {
        return "You're welcome! Keep learning!";
    }

    return "I'm still learning! Try asking me about HTML, CSS, JavaScript, Python, photosynthesis, or study tips.";
}


chatForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const question = chatInput.value.trim();

    if (question === "") {
        return;
    }

    addMessage(question, "user");

    chatInput.value = "";

    const reply = getDemoReply(question);

    addMessage(reply, "bot");

});


/* =========================================
   2. NOTES SUMMARIZER
========================================= */

const notesInput = document.querySelector("#notesInput");
const summarizeButton = document.querySelector("#summarizeButton");
const summaryText = document.querySelector("#summaryText");


summarizeButton.addEventListener("click", function () {

    const notes = notesInput.value.trim();

    if (notes === "") {

        summaryText.textContent = "Please paste your notes first!";

        return;
    }

    const sentences = notes.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

    if (sentences === null) {

        summaryText.textContent = notes;

        return;
    }

    const summary = sentences
        .slice(0, 3)
        .join(" ");

    summaryText.textContent = summary;

});


/* =========================================
   3. QUIZ GENERATOR
========================================= */


// Predefined quiz questions

const quizData = {

    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            answer: 0
        },
        {
            question: "Which tag is used to create a paragraph?",
            options: ["<h1>", "<p>", "<div>", "<br>"],
            answer: 1
        },
        {
            question: "Which tag is used to insert an image?",
            options: ["<image>", "<picture>", "<img>", "<src>"],
            answer: 2
        }
    ],

    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Style System",
                "Colorful Style Sheets"
            ],
            answer: 1
        },
        {
            question: "Which property changes text color?",
            options: ["background", "font-size", "color", "border"],
            answer: 2
        },
        {
            question: "Which property creates space inside an element?",
            options: ["margin", "padding", "gap", "outline"],
            answer: 1
        }
    ],

    javascript: [
        {
            question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
            options: ["var", "let", "const", "static"],
            answer: 2
        },
        {
            question: "Which method selects an HTML element using a CSS selector?",
            options: ["querySelector()", "getValue()", "createElement()", "innerHTML()"],
            answer: 0
        },
        {
            question: "Which symbol represents the AND operator?",
            options: ["||", "&&", "!", "=="],
            answer: 1
        }
    ],

    python: [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "define", "def", "fun"],
            answer: 2
        },
        {
            question: "Which data type stores multiple key-value pairs?",
            options: ["List", "Tuple", "Set", "Dictionary"],
            answer: 3
        },
        {
            question: "Which symbol is used for comments in Python?",
            options: ["//", "#", "/*", "<!--"],
            answer: 1
        }
    ]

};


// Select HTML elements

const quizTopic = document.querySelector("#quizTopic");
const generateQuiz = document.querySelector("#generateQuiz");
const quizContainer = document.querySelector("#quizContainer");
const quizScore = document.querySelector("#quizScore");

let currentQuestions = [];
let quizCompleted = false;

let quizCount = Number(localStorage.getItem("quizCount")) || 0;

let totalQuizScore = Number(localStorage.getItem("totalQuizScore")) || 0;


generateQuiz.addEventListener("click", function () {

    const topic = quizTopic.value.trim().toLowerCase();

    if (topic === "") {

        quizContainer.textContent = "Please enter a topic first!";

        return;
    }

    let selectedTopic = "";

    if (topic.includes("html")) {
        selectedTopic = "html";
    }
    else if (topic.includes("css")) {
        selectedTopic = "css";
    }
    else if (topic.includes("javascript") || topic === "js") {
        selectedTopic = "javascript";
    }
    else if (topic.includes("python")) {
        selectedTopic = "python";
    }

    if (selectedTopic === "") {

        quizContainer.textContent =
            "Currently, quizzes are available for HTML, CSS, JavaScript, and Python.";

        quizScore.textContent = "";

        return;
    }

    currentQuestions = quizData[selectedTopic];

    quizCompleted = false;

    quizScore.textContent = "";

    quizContainer.innerHTML = "";

    currentQuestions.forEach(function (item, index) {

        const questionDiv = document.createElement("div");

        questionDiv.classList.add("quiz-question");

        const heading = document.createElement("h3");

        heading.textContent =
            (index + 1) + ". " + item.question;

        questionDiv.appendChild(heading);

        item.options.forEach(function (option, optionIndex) {

            const label = document.createElement("label");

            label.classList.add("quiz-option");

            const radio = document.createElement("input");

            radio.type = "radio";

            radio.name = "question" + index;

            radio.value = optionIndex;

            label.appendChild(radio);

            label.appendChild(
                document.createTextNode(option)
            );

            questionDiv.appendChild(label);

        });

        quizContainer.appendChild(questionDiv);

    });


    const submitButton = document.createElement("button");

    submitButton.textContent = "Submit Quiz";

    submitButton.type = "button";

    submitButton.id = "submitQuiz";

    quizContainer.appendChild(submitButton);


    submitButton.addEventListener("click", checkQuizAnswers);

});


function checkQuizAnswers() {

    if (quizCompleted) {
        return;
    }

    let score = 0;

    let answered = 0;

    currentQuestions.forEach(function (item, index) {

        const selected = document.querySelector(
            'input[name="question' + index + '"]:checked'
        );

        if (selected !== null) {

            answered++;

            if (Number(selected.value) === item.answer) {

                score++;

            }

        }

    });


    if (answered !== currentQuestions.length) {

        quizScore.textContent = "Please answer all questions before submitting.";

        return;
    }


    quizCompleted = true;

    const percentage = Math.round(
        (score / currentQuestions.length) * 100
    );


    quizCount++;

    totalQuizScore += percentage;

    localStorage.setItem("quizCount", quizCount);

    localStorage.setItem("totalQuizScore", totalQuizScore);


    quizScore.textContent =
        "Your Score: " + score + "/" +
        currentQuestions.length + " (" + percentage + "%)";


    updateProgress();

    const options = quizContainer.querySelectorAll("input");

    options.forEach(function (option) {

        option.disabled = true;

    });

    document.querySelector("#submitQuiz").disabled = true;

}


/* =========================================
   4. STUDY PLANNER
========================================= */


const plannerForm = document.querySelector("#plannerForm");

const taskInput = document.querySelector("#taskInput");

const taskDate = document.querySelector("#taskDate");

const taskTime = document.querySelector("#taskTime");

const taskList = document.querySelector("#taskList");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        const message = document.createElement("p");

        message.classList.add("planner-placeholder");

        message.textContent = "No study tasks added yet.";

        taskList.appendChild(message);

    }


    tasks.forEach(function (task, index) {

        const taskDiv = document.createElement("div");

        taskDiv.classList.add("task-item");

        if (task.completed) {

            taskDiv.classList.add("completed");

        }


        const details = document.createElement("div");

        const title = document.createElement("strong");

        title.textContent = task.name;

        const dateInfo = document.createElement("p");

        dateInfo.textContent =
            task.date + " at " + task.time;


        details.appendChild(title);

        details.appendChild(dateInfo);


        const actions = document.createElement("div");

        actions.classList.add("task-actions");


        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function () {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();

            updateProgress();

        });


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

            updateProgress();

        });


        actions.appendChild(completeButton);

        actions.appendChild(deleteButton);


        taskDiv.appendChild(details);

        taskDiv.appendChild(actions);


        taskList.appendChild(taskDiv);

    });


    updateProgress();

}


plannerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = taskInput.value.trim();

    const date = taskDate.value;

    const time = taskTime.value;

    if (name === "" || date === "" || time === "") {
        return;
    }


    const newTask = {

        name: name,

        date: date,

        time: time,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    displayTasks();

    plannerForm.reset();

});


/* =========================================
   5. PROGRESS TRACKER
========================================= */


const completedTasks = document.querySelector("#completedTasks");

const pendingTasks = document.querySelector("#pendingTasks");

const progressQuizScore = document.querySelector("#progressQuizScore");

const progressFill = document.querySelector("#progressFill");

const progressPercentage = document.querySelector("#progressPercentage");


function updateProgress() {

    const completed = tasks.filter(function (task) {

        return task.completed;

    }).length;


    const pending = tasks.length - completed;


    let percentage = 0;

    if (tasks.length > 0) {

        percentage = Math.round(
            (completed / tasks.length) * 100
        );

    }


    const averageScore = quizCount > 0
        ? Math.round(totalQuizScore / quizCount)
        : 0;


    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

    progressQuizScore.textContent = averageScore + "%";

    progressFill.style.width = percentage + "%";

    progressPercentage.textContent =
        percentage + "% Completed";


    document.querySelector("#quizCount").textContent = quizCount;

    document.querySelector("#averageScore").textContent =
        averageScore + "%";

}


displayTasks();

updateProgress();


/* =========================================
   6. PDF ASSISTANT
========================================= */


const pdfInput = document.querySelector("#pdfInput");

const pdfFileName = document.querySelector("#pdfFileName");

const pdfQuestion = document.querySelector("#pdfQuestion");

const askPdfButton = document.querySelector("#askPdfButton");

const pdfAnswer = document.querySelector("#pdfAnswer");

let selectedPDF = null;


pdfInput.addEventListener("change", function () {

    const file = pdfInput.files[0];

    if (!file) {

        selectedPDF = null;

        pdfFileName.textContent = "No PDF selected.";

        return;
    }


    if (file.type !== "application/pdf") {

        selectedPDF = null;

        pdfInput.value = "";

        pdfFileName.textContent = "Please select a valid PDF file.";

        return;
    }


    selectedPDF = file;

    pdfFileName.textContent =
        "Selected PDF: " + file.name;

    pdfAnswer.textContent =
        "PDF selected successfully! Ask a question to continue.";

});


askPdfButton.addEventListener("click", function () {

    const question = pdfQuestion.value.trim();

    if (selectedPDF === null) {

        pdfAnswer.textContent = "Please upload a PDF first.";

        return;
    }


    if (question === "") {

        pdfAnswer.textContent = "Please enter your question.";

        return;
    }


    pdfAnswer.textContent =
        "Your question is ready, but PDF reading and AI question answering have not been connected yet. We will implement this using Python Flask and an AI service in the backend.";

});


/* =========================================
   7. INITIAL DASHBOARD SETUP
========================================= */


document.querySelector("#studyHours").textContent = "0 hrs";

