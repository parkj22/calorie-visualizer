/**
 * article.js
 * 
 * @author Jinyoung Park (parkj22)
 * @version February 6, 2022
 * @description Create articles with user's inputs and displays them to webpage
 */

let articleHeaders, articleParagraphs;

/**
 * Create articles with user's input
 * @param {string} name User's name
 * @param {string} bmr User's BMR value
 */
export function initArticle(name, bmr) {
    articleHeaders = [
        `Hello, ${name}. Your BMR is ${bmr} kcal/day.`,
        `Basal metabolic rate (BMR) can be another dietary viewpoint.`,
        `How is basal metabolic rate calculated?`
    ];
    articleParagraphs = [
        `That means you would burn about ${bmr} calories if you were to do nothing and\
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
             + 3.098H - 4.330A + 447.593; W = weight in kg, H = height in cm, A = age). You may\
              ask if your BMR is in a good range. According to livestrong.com. an average American\
               male's BMR is about 1662 kcal, whereas an average American female's is about 1493 kcal.`
    ];
}

/**
 * Display the specified article, or the first article if unspecified
 * @param {int} id Identifier for the article to be displayed
 */
export function displayArticle(id = 0) {
    $("#article-header").text(articleHeaders[id]);
    $("#article-paragraph").text(articleParagraphs[id]);
}

/**
 * Animates article element to show another article
 * @param {Element} element jQuery selector for the selected article option
 */
export function onOptionClick(element) {
    let clicked = $(element).data("id"); // Identify which option is clicked
    $("#main-article").fadeOut(500, () => { // Fade out/fade in new article
        displayArticle(clicked);
        $("#main-article").fadeIn(500);
    });
}