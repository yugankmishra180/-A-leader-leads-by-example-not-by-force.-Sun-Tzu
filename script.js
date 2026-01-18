const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const loader = document.getElementById("loader");

const colors = [
    "#1abc9c", "#3498db", "#9b59b6",
    "#e67e22", "#e74c3c", "#2c3e50"
];

async function getQuote() {
    quoteEl.innerText = "";
    authorEl.innerText = "";
    loader.style.display = "block";

    try {
        const url = "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random";
        const res = await fetch(url + "&t=" + new Date().getTime());
        const data = await res.json();

        loader.style.display = "none";
        quoteEl.innerText = `"${data[0].q}"`;
        authorEl.innerText = `— ${data[0].a}`;

        changeBackground();

    } catch (error) {
        loader.style.display = "none";
        quoteEl.innerText = "Failed to fetch new quote.";
        console.error(error);
    }
}

function copyQuote() {
    const text = `${quoteEl.innerText} ${authorEl.innerText}`;
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
}

function tweetQuote() {
    const text = `${quoteEl.innerText} ${authorEl.innerText}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
}

function changeBackground() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}

// Load quote on page load
getQuote();
