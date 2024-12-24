let baseURL = "http://numbersapi.com/";

// 1
let favNum = 3;

$.getJSON(`${baseURL}${favNum}?json`)
    .then(res => console.log(res));


// 2
let nums = [1, 2, 3];
$.getJSON(`${baseURL}${nums}?json`)
    .then(res => {
        console.log(res)
        Object.entries(res).forEach(([key, value]) => $("body").append(`<p>${key}: ${value}</p>`))
    });


// 3 
let promises = [];
for (let i = 0; i < 4; i++) {
    promises.push($.getJSON(`${baseURL}${favNum}?json`));
}

Promise.all(promises)
    .then(res => {
        res.forEach(fact => $("body").append(`<p>${fact.text}</p>`));
    })