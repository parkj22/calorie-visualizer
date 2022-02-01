$(document).ready(function() {
    let user_bmr = calculateBMR().toFixed(2);
    let user_name = getQueryStr()["user_name"].replace("+", " ");
    $("#result-msg").text("Hello, " + user_name + ". You would burn " + user_bmr + " calories if you were in bed all day.");
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
    user_info = getQueryStr();
    if(user_info["user_gender"] == "male") {
        return 13.397 * user_info["user_weight"] + 4.799 * user_info["user_height"] - 5.677 * user_info["user_age"] + 88.362;
    }
    return 9.247 * user_info["user_weight"] + 3.098 * user_info["user_height"] - 4.330 * user_info["user_age"] + 447.593;
}