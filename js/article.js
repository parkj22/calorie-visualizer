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

let articleID = 0;

export function displayArticle() {
    $("#article-header").text(articleHeaders[articleID]);
    $("#article-paragraph").text(articleParagraphs[articleID]);
}

export function onOptionClick(element) {
    articleID = $(element).data("id");
    $("#main-article").fadeOut(500, () => {
        $("#article-header").text(articleHeaders[articleID]);
        $("#article-paragraph").text(articleParagraphs[articleID]);
        $("#main-article").fadeIn(500);
    });
}