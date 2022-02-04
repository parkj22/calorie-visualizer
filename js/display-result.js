import {displayArticle, onOptionClick} from "./article.js";

let graphVal = [1662, 1493, 0, 0];
let consumedFood = new Map();
let articleID = 0;

$(document).ready(function () {
    const user_bmr = calculateBMR().toFixed(2);
    const user_name = getQueryStr()["user_name"].replace("+", " ");
    const articleHeaders = [
        `Hello, ${user_name}. Your BMR is ${user_bmr} kcal/day.`,
        `Basal metabolic rate (BMR) can be another dietary viewpoint.`,
        `How is basal metabolic rate calculated?`
    ];
    const articleParagraphs = [
        `That means you would burn about ${user_bmr} calories if you were to do nothing and\
         relax on your comfy bed all day long. Most research suggest that you look into other\
          factors, such as your current activity level, when planning your diet. However, BMR\
           could definitely help in laying down the foundations when you are working towards a\
            fitness goal. Use this website to get a better understanding of your BMR!`,
        `Basal metabolic rate is the number of calories your body burn each day to perform its\
         life-sustaining functions. Although it does not account for the calories you spend for\
          your daily exercise, BMR shows a rough estimate of your daily energy expenditure. So\
           knowing your BMR is knowing how much calorie intake is needed in a day to stay the\
            same. This can greatly help optimize your diet; if you want to lose fat, run a\
             caloric deficit.`,
        `There are a number of factors that goes into calculating basal metabolic rate,\
         including genetics, age, gender, hormones, and body composition. However in this\
          website, for the sake of simplicity, BMR is calculated using revised Harris-Benedict\
           equation (For men: BMR = 13.397W + 4.799H - 5.677A + 88.362; for women: BMR = 9.247W\
             + 3.098H - 4.330A + 447.593; W = weight in kg, H = height in cm, A = age).`
    ];
    $("#article-header").text(articleHeaders[articleID]);
    $("#article-paragraph").text(articleParagraphs[articleID]);
    graphVal[2] = user_bmr;

    $(".page-logo").css("color", getRandomColor());
    $(".avg-male").css("background-color", getRandomColor());
    $(".avg-female").css("background-color", getRandomColor());
    $(".user").css("background-color", getRandomColor());
    $(".custom").css("background-color", getRandomColor());

    graphBMR("avg-male-graph", graphVal[0]);
    graphBMR("avg-female-graph", graphVal[1]);
    graphBMR("user-graph", graphVal[2]);
    graphBMR("custom-graph", graphVal[3]);

    $(".nav-article div").click(onOptionClick(this));

    $("button").click(function () {
        addFood($(this).children(".food-name").text().trim());
        graphCustom($(this).val());
    });

    let origVal = $(".button-header").text();
    $("button").hover(
        function () {
            updateButtonHeader(`${$(this).children(".food-name").text()} contain(s) about ${$(this).val()} calories.`);
        },
        function () {
            updateButtonHeader(origVal);
        }
    );
});

function getQueryStr() {
    let data = {};
    let queryStr = location.search.slice(1);
    let regex = /([^&=]+)=([^&]*)/g, m;

    while (m = regex.exec(queryStr)) {
        data[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return data;
}

function calculateBMR() {
    const user_info = getQueryStr();
    if (user_info["user_gender"] == "male") {
        return 13.397 * user_info["user_weight"] + 4.799 * user_info["user_height"] - 5.677 * user_info["user_age"] + 88.362;
    }
    return 9.247 * user_info["user_weight"] + 3.098 * user_info["user_height"] - 4.330 * user_info["user_age"] + 447.593;
}

function getRandomIntensity() {
    return Math.floor(Math.random() * 256);
}

function getRandomColor() {
    return `rgb(${getRandomIntensity()}, ${getRandomIntensity()}, ${getRandomIntensity()})`;
}

function graphBMR(graphID, cal) {
    const maxCal = 2500;
    const maxWidth = $(".graph-div").width() * 0.85;
    const graphLen = (cal / maxCal) * maxWidth;
    $(`#${graphID} > .graph-head`).css("transform", `translate(${graphLen}px)`);
    $(`#${graphID} > .graph-body`).css("transform", `scaleX(${graphLen})`);
    $(`#${graphID} > .graph-val`).css("transform", `translate(${graphLen}px)`);
    $(`#${graphID} > .graph-val`).text(`${cal} kcal`);
}

function graphCustom(cal) {
    graphVal[3] += parseInt(cal);
    const maxCal = 2500;
    const maxWidth = $(".graph-div").width() * 0.85;
    let newLen = graphVal[3] / maxCal * maxWidth;
    newLen = newLen < maxWidth ? newLen : maxWidth;
    $("#custom-graph > .graph-head").css("transform", `translate(${newLen}px)`);
    $("#custom-graph > .graph-body").css("transform", `scaleX(${newLen})`);
    $(`#custom-graph > .graph-val`).css("transform", `translate(${newLen}px)`);
    $(`#custom-graph > .graph-val`).text(`${graphVal[3]} kcal`);
}

function addFood(foodName) {
    let elementID = foodName.replaceAll(" ", "");
    console.log(elementID);
    if(consumedFood.has(foodName)) {
        consumedFood.set(foodName, consumedFood.get(foodName) + 1);
        $(`#${elementID}`).text(`${consumedFood.get(foodName)} ${foodName}'s`);
    } else {
        consumedFood.set(foodName, 1);
        let newElement = $(`<p id="${elementID}"></p>`).text(`1 ${foodName}`);
        $(".add-section div").append(newElement);
    }
}

function updateButtonHeader(str) {
    $(".button-header").text(str);
}