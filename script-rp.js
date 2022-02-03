$(document).ready(function() {
    const user_bmr = calculateBMR().toFixed(2);
    const user_name = getQueryStr()["user_name"].replace("+", " ");
    $("#article-header").text(`Welcome, ${user_name}.`);
    $("#article-paragraph").text(`You would burn ${user_bmr} calories if you were in bed all day.`);
    
    $(".avg-male").css("background-color", getRandomColor());
    $(".avg-female").css("background-color", getRandomColor());
    $(".user").css("background-color", getRandomColor());
    $(".custom").css("background-color", getRandomColor());
    
    graphBMR("avg-male-graph", 1662);
    graphBMR("avg-female-graph", 1493);
    graphBMR("user-graph", user_bmr);
});

function getQueryStr() {
    let data = {};
    let queryStr = location.search.slice(1);
    let regex = /([^&=]+)=([^&]*)/g, m;

    while(m = regex.exec(queryStr)) {
        data[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return data;
}

function calculateBMR() {
    const user_info = getQueryStr();
    if(user_info["user_gender"] == "male") {
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

function graphBMR(graphID, cal){
    const maxCal = 2500;
    const maxWidth = $(".graph-div").width() * 0.9;
    const graphLen = (cal / maxCal) * maxWidth;
    $(`#${graphID} > .graph-head`).css("transform", `translate(${graphLen}px)`);
    $(`#${graphID} > .graph-body`).css("transform", `scaleX(${graphLen})`);
}