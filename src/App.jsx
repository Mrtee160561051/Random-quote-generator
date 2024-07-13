import React from 'react'
import "tailwindcss/tailwind.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Loading...",
      author: "",
      color: 'rgb(0,0,0)'
    };
  }

  componentDidMount() {
    this.fetchQuote();
  }

  getRandomDarkColor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return `rgb(${r},${g},${b})`;
  }

  fetchQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then(data => {
        const randomQuote = this.getRandomQuote(data);
        this.setState({
          text: randomQuote.text,
          author: randomQuote.author || "Unknown",
          color: this.getRandomDarkColor()
        });
      })
      .catch(error => console.error("Error fetching quote:", error));
  }

  getRandomQuote(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  tweetQuote = () => {
    const { text, author } = this.state;
    const tweetText = `${text} - ${author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
  }

  fbQuote = () => {
    const { text, author } = this.state;
    const fbText = `${text} - ${author}`;
    const urlToShare = "https://codepen.io/Akinyemi-Testimony-I-Benjamin/pen/vYqYoZV?editors=0010"
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodeURIComponent(fbText)}`;
    window.open(fbUrl, "_blank");
  }

  render() {
    return (
      <main className="min-h-screen flex items-center justify-center flex-col gap-y-3" style={{backgroundColor: this.state.color}}>
        <section id="quote-box" className="flex flex-col gap-3 bg-white rounded px-[min(2em,5vw)] py-[1em]">
          <svg className="m-auto text-[3em]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
            <path fill={this.state.color} d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054q.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992a4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054q.094-.558.31-.992q.217-.434.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992a4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
          </svg>
          <div>
            <p id="text">{this.state.text}</p>
            <p id="author"><b>- {this.state.author}</b></p>
          </div>
          <article className="flex gap-2 justify-between mb-6">
            <div className="flex ml-1 w-[7%]">
              <div>
                <a className="cursor-pointer" id="tweet-quote" onClick={this.tweetQuote} target="_blank">
                  <svg className="text-[48px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="0.8em" viewBox="0 0 448 512">
                    <rect width="448" height="512" fill="none" />
                    <path fill={this.state.color} d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"/>
                  </svg>
                </a>
              </div>
              <div>
                <a className="cursor-pointer" onClick={this.fbQuote} target="_blank">
                  <svg className="text-[48px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="0.8em" viewBox="0 0 24 24">
                    <path fill={this.state.color} d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"/>
                  </svg>
                </a>
              </div>
            </div>
            <button 
              id="new-quote"
              className="cursor-pointer whitespace-nowrap text-white border-2 text-[14px] rounded p-[0_4px] w-[6em]" 
              onClick={this.fetchQuote}
              style={{ backgroundColor: this.state.color }}
            >
              New quote
            </button>
          </article>
        </section>
        <section className="text-white">By Teaz</section>
      </main>
    );
  }
}


export default App
