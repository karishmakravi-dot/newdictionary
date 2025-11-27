const input = document.getElementById('input');
const search_btn = document.getElementById('search_btn');

const not_found = document.querySelector('.not_found');
const defination_box = document.querySelector('.def');
const audio_box = document.querySelector('.audio');

search_btn.addEventListener('click', e => {
    e.preventDefault();

    const word = input.value.trim();
    if (word === "") {
        alert('Please type a word');
        return;
    }

    audio_box.innerHTML = "";
    not_found.innerText = "";
    defination_box.innerText = "";

    dataGet(word);
});

async function dataGet(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);

    // When word not found
    if (data.title === "No Definitions Found") {
        not_found.innerText = "No result found";
        return;
    }

    // Show definition
    defination_box.innerText = data[0].meanings[0].definitions[0].definition;

    // Show audio if exists
    let sound = data[0].phonetics[0]?.audio;
    if (sound) {
        let aud = document.createElement("audio");
        aud.src = sound;
        aud.controls = true;
        audio_box.appendChild(aud);
    } else {
        audio_box.innerText = "No audio available";
    }
}
