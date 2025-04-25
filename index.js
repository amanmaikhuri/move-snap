const $ = ((selector, err)=>{
    const el = document.querySelector(selector);
    if(!el && !err == false){
        console.error(`mising ${selector}`, err.message);
    }

    return el;
})

// dom elements

const dom = {
    prompt: $("#prompt"),
    activity: $("#activity"),
    quotes: $(".quotes"),
    activityLog: $("#activityLog"),
    logCard: $(".log-card")
}

let data = [];
let images =[];
//fetch motivational Quotes
async function getQuotes(){
  try{
    let res =await fetch("https://dummyjson.com/quotes");
    data = await res.json();
    data =data.quotes;
    console.log(data);
    showPrompt(data);
  } catch(err){
    console.error("data not found",err)
  }
}


const prompts = [
    "Stand up and stretch for 30 seconds!",
    "Take 10 deep breaths.",
    "Do a quick 5-min walk.",
    "Try 5 desk push-ups!"
  ];

function showPrompt() {
  try{
    data =data[Math.floor(Math.random() * prompts.length)]
    const randomPrompt = data.quote + "-" + data.author;
    dom.quotes.innerHTML = "";

    const quotePara = document.createElement("p");
    quotePara.classList.add("quote-para");

    quotePara.innerHTML = `<p>${randomPrompt}</p>`

    dom.quotes.appendChild(quotePara);
  } catch(err){
    console.error("Quote not found",err.message);
  }
}


  function logActivity() {
    const activity = dom.activity?.value;
    if (activity) {
      const log = JSON.parse(localStorage.getItem("activities") || "[]");
      const date = new Date();
      const timestamp = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
      log.unshift({ activity, timestamp: timestamp});
      localStorage.setItem("activities", JSON.stringify(log));
      dom.activity.value = "";
      displayLog();
    }
  }


  function displayLog() {
    const log = JSON.parse(localStorage.getItem("activities") || "[]");
    const logcard = dom.logCard;


    logcard.innerHTML = log.map(item => 
      `<li>
        <p id="time">${item.timestamp}</p>
        <p>${item.activity}</p>
      </li>`
    ).join("");
  }
  setInterval(showPrompt, 3600);
  displayLog();
  getQuotes();
  showPrompt(data);