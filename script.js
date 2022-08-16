'use strict';

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '364cc82729ad473e874600b11dedd727',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Disable / Enable button
function toggoleButton() {
  // button.disabled = !button.disabled;
  button.toggleAttribute('disabled');
}

// Get Jokes from Joke API
async function getJokes() {
  const apiURL =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  let joke = '';

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // Text-to-Speech
    tellMe(joke);

    // Disable Button
    toggoleButton();
  } catch (error) {
    // Error code here
    console.log('Whoops', error);
  }
}

// getJokes();

// Event Listeners
button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggoleButton);
