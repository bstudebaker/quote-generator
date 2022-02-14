const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show the site is loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show one quote
function newQuote() {
    loading();
    // Get one random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Checking if the author field is blank and replace it with "Unknown" if it is
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    // Checking the quote length to determine the style
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

// Get the quotes from the API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        //Catch any errors
        console.log('Could not get quote');
    }
}

//Tweet the quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();