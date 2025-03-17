function removeActive() {
  const btns = document.getElementsByClassName("active");
  for (let btn of btns) {
    btn.classList.remove("active");
  }
}

function showLoading() {
  const loading = document.getElementById("load-sect");
  loading.classList.add("flex");
  loading.classList.remove("hidden");
  document.getElementById("card-container").classList.add("hidden");
}

function hideLoading() {
  const loading = document.getElementById("load-sect");
  loading.classList.remove("flex");
  loading.classList.add("hidden");
  document.getElementById("card-container").classList.remove("hidden");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

function loadLevels() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevels(data.data));
}

function displayLevels(levelsData) {
  levelsData.forEach((level) => {
    const btnContainer = document.getElementById("btn-container");
    const div = document.createElement("div");
    div.innerHTML = `
            <button id="${level.level_no}" onClick='loadWords("${level.level_no}")'
              class="px-4 py-1 text-[#422AD5] border border-[#422AD5] hover:text-white hover:bg-[#422AD5] rounded-sm duration-200"
            >
              <a href="#card-sect" class="flex items-center gap-2">
                <i class="fa-solid fa-book-open"></i>
                Level-${level.level_no}
              </a>
            </button>
        `;
    btnContainer.appendChild(div);
  });
}

function loadWords(id) {
  removeActive();
  showLoading();
  const activeBtn = document.getElementById(`${id}`);
  activeBtn.classList.add("active");
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWords(data.data));
}

const displayWords = (wordData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (wordData.length <= 0) {
    cardContainer.innerHTML = `
            <div class="col-span-full text-center space-y-4">
                    <div>
                        <img class="w-28 mx-auto" src="assets/alert-error.png" alt="Alert Error">
                    </div>
                    <p class="hind text-lg font-medium text-gray-500">   
                        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                    </p>
                    <h1 class="text-3xl hind font-medium">
                        নেক্সট Lesson এ যান
                    </h1>
            </div>
        `;
    hideLoading();
    return;
  }
  wordData.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="p-8 bg-white rounded-lg h-[300px] space-y-7 flex flex-col justify-between">
            <div class="text-center space-y-2">
              <h1 class="inter text-3xl font-bold">${word.word}</h1>
              <h3 class="text-xl font-medium inter">
                Meaning / Pronounciation
              </h3>
            </div>
            <h1 class="hind text-3xl font-semibold text-gray-700 text-center">
              "${
                word.meaning === null
                  ? "কোন অর্থ খুঁজে পাওয়া যায় নি"
                  : word.meaning
              } / ${word.pronunciation}"
            </h1>
            <div class="flex justify-between">
              <button
                onClick="loadDetails('${word.id}')"
                id="details-btn"
                class="px-3 py-2 rounded-md bg-[#1A91FF10] text-gray-600 hover:bg-gray-300 hover:text-gray-950 cursor-pointer duration-200"
              >
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button
              onClick="pronounceWord('${word.word}')"
                class="px-3 py-2 rounded-md bg-[#1A91FF10] text-gray-600 hover:bg-gray-300 hover:text-gray-950 cursor-pointer duration-200"
              >
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        `;
    cardContainer.appendChild(div);
  });
  hideLoading();
};

function loadDetails(detailsId) {
  const detailsUrl = `https://openapi.programming-hero.com/api/word/${detailsId}`;
  fetch(detailsUrl)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
}

const displayDetails = (details) => {
  const wordDetails = document.getElementById("wordDetails");
  const mainWord = document.getElementById("main-word");
  const wordMeaning = document.getElementById("word-meaning");
  const pronunciation = document.getElementById('pronun');
  const wordinSent = document.getElementById("word-sent");
  const synContainer = document.getElementById("syn-container");
  mainWord.innerHTML = `${details.word}`;
  wordMeaning.innerHTML = `${
    details.meaning ? details.meaning : "কোন অর্থ খুঁজে পাওয়া যায় নি"
  }`;
  pronunciation.innerHTML= `( <i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation} )`
  wordinSent.innerHTML = `${details.sentence}`;
  if (details.synonyms == []) {
    synContainer.innerHTML = "";
  } else {
    synContainer.innerHTML = "";
    for (let syn of details.synonyms) {
      const div = document.createElement("div");
      div.innerHTML = `
        <button class="px-4 py-2 bg-[#edf7ff] rounded-md pop font-medium text-gray-700">
          ${syn}
        </button>
      `;
      synContainer.appendChild(div);
    }
  }
  wordDetails.showModal();
};

loadLevels();
