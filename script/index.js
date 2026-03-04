// console.log("I am js")

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLesson(json));
}

const displayLesson = (lesson) => {
    // console.log(lesson.data);

    const levelContainer = document.getElementById("level-Container")

    levelContainer.innerHTML = "";

    // console.log(lesson.data)

    lesson.data.forEach(element => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${element.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}</button>`;

        levelContainer.append(btnDiv);
    });
}

const loadLevelWord = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);

    fetch(url).then(res => res.json()).then(data => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        const card = document.createElement("div");
        card.innerHTML = `
            <p>Cat</p>
        `;
        wordContainer.append(card);
    }
}

loadLessons();