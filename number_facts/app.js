let baseURL = "http://numbersapi.com";
let favNum = 9;


// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.

async function favNumFact() {
let url = `${baseURL}/${favNum}?json`;
let data = await $.getJSON(url); 
console.log(data.text);
$("body").append(`<p>${data.text}</p>`); 
}

favNumFact();



/////////////////////////////////////////////////////////////////////////////

// 2. Get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

const favNums = [10, 20, 30]
async function getFavNumsFacts() {
  let data = await $.getJSON(`${baseURL}/${favNums}?json`)
  console.log(data)
  for (let key in data) { 
      $("body").append(`<p>${data[key]}</p>`); 
        } 
  }
  
getFavNumsFacts();


////////////////////////////////////////////////////////////////////////
// 3.Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.

async function get4Facts() {
  let facts = await Promise.all(
  Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNum}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}

get4Facts();
  

  

