const jokesContainer = document.querySelector('.jokeContainer');
const newJokeBtn = document.querySelector('.getJokeBtn');
const emojiContainer = document.querySelector('.jokeEmoji')
// const angryEmoji = '&#128520'
const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'

newJokeBtn.addEventListener('click', ()=>{
    fetch(url)
    .then(res => res.json())
    .then(data  => jokesContainer.textContent = data.joke)
    .catch(jokesContainer.innerHTML = 'Pls wait while Joke is loading!!!')
})