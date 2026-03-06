// console.log("I am js")

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLesson(json));
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

const displayLesson = (lesson) => {
    // console.log(lesson.data);

    const levelContainer = document.getElementById("level-Container")

    levelContainer.innerHTML = "";

    // console.log(lesson.data)

    lesson.data.forEach(element => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${element.level_no}" onclick="loadLevelWord(${element.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}</button>`;

        levelContainer.append(btnDiv);
    });
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(element => {
        element.classList.remove("active");
    });
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");

    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");

    }
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);

    fetch(url).then(res => res.json()).then(data => {
        const clickBtn = document.getElementById(`lesson-btn-${id}`);

        removeActive();

        clickBtn.classList.add("active");
        displayLevelWord(data.data);

    });
}

const displayLevelWord = (words) => {
    // console.log(words);

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = "";
        wordContainer.innerHTML = `
        <div class="text-center col-span-full  rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="english-janala-resources/assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class=" font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`
        manageSpinner(false);
        return;
    }

    for (let i = 0; i < words.length; i++) {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${words[i].word ? words[i].word : "Word Not Found!"}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">"${words[i].meaning ? words[i].meaning : "no meaning found"} / ${words[i].pronunciation ? words[i].pronunciation : "no pron found"}"</div>
            <div class="flex justify-between items-center">
                <button onClick="loadWordDetail(${words[i].id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
                <button onClick="pronounceWord('${words[i].word}')" class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    };
    manageSpinner(false);
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();

    displayWordDetails(details);
    // word_modal.showModal();
}

const displayWordDetails = (word) => {

    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                <div class="">
                    <h2 class="text-2xl font-bold">${word.data.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.data.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>"${word.data.meaning}"</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.data.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                <div class="">
                    ${createElements(word.data.synonyms)}
                </div>
                </div>
    `;

    document.getElementById("word_modal").showModal();
};

const createElements = (arr) => {
    const htmlElemts = arr.map((el) => `<span class="btn">${el}</span>`);

    return (htmlElemts.join(" "));
}



loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all").then(res => res.json()).then(data => {
        const allWords = data.data;
        // console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    })
})