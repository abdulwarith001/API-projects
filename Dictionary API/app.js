const resultTemplate = document.querySelector('#resultTemplate');
const input = document.querySelector('#input');
const searchBtn = document.querySelector('#searchBtn');
const resultContainer = document.querySelector('#resultContainer');
//Clones the first child of the template of the result
const result = resultTemplate.content.cloneNode(true).children[0]
    //gets the divs that is contained in the result template
const searchedWord = result.querySelector('.searchedWord')
const wordDetails = result.querySelector('.wordDetails')
const phoneticsPartOfSpeech = wordDetails.querySelector('.phoneticsPartSpeech');
const partOfSpeech = phoneticsPartOfSpeech.querySelector('.partOfSpeech');
const phonetics = phoneticsPartOfSpeech.querySelector('.phonetics')
const defination = wordDetails.querySelector('.defination');
const example = wordDetails.querySelector('.exampleWord');
let url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

//function to get the word from the api
const getSearchedWord = async() => {
    try {
        const getData = await fetch(`${url}${input.value}`);
        const data = getData.json()
        return data
    } catch (error) {
        console.error('Pls check if you have internet connection...', error);
    }
}

const assignWord_Display = () => {
    if (input.value === "") { return }
    resultContainer.innerHTML = '';
    searchedWord.textContent = `${input.value}:`
    wordDetails.innerHTML = 'Pls wait while dictionry loads...'
    let receivedData = getSearchedWord()
    receivedData.then((word) => {
            wordDetails.innerHTML = `
        <div class="phoneticsPartSpeech">
            <div class="partOfSpeech">${word[0].meanings[0].partOfSpeech}</div>
            <div class="phonetics">${word[0].phonetics[0].text}</div>
        </div>
        <div class="defination">${word[0].meanings[0].definitions[0].definition}</div>
        <div class="exampleWord">${word[0].meanings[0].definitions[0].example || "Example is unavailable"}</div>`

        })
        .catch(() => resultContainer.innerHTML = 'Sorry, we could not find that word...')
    resultContainer.append(result)
    input.value = ''
}

//Addiing event listeners
searchBtn.addEventListener('click', assignWord_Display)
window.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        assignWord_Display()
    }
})