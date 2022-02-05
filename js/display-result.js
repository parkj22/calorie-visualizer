/**
 * display-result.js
 * 
 * @author Jinyoung Park (parkj22)
 * @version February 6, 2022
 * @description This module initializes the page by displaying information onto the page
 * and setting handler functions for allowed inputs.
 */

import {getUserName, getUserBmr, handleClick, handleHover} from "./input.js"
import {initArticle, displayArticle, onOptionClick} from "./article.js";
import {graphAll} from "./graph.js"

// Initialize and handle inputs when document is ready
$(document).ready(function () {
    initPage();
    handleInput();
});

/**
 * Initializes the webpage by...
 *  creating articles based on user's name and user's BMR value
 *  displaying those articles
 *  setting colors for page logo and graphs
 *  displaying all graphs
 */
function initPage() {
    // Getting article from article.js here
    initArticle(getUserName(), getUserBmr());
    displayArticle();

    setColors();
    graphAll();
}

/**
 * Calls on functions from input.js to handle inputs
 */
function handleInput() {
    handleClick();
    handleHover();
}

/**
 * Sets random background colors for page logo and BMR graphs
 */
function setColors() {
    $(".page-logo").css("color", getRandomColor());
    $(".avg-male").css("background-color", getRandomColor());
    $(".avg-female").css("background-color", getRandomColor());
    $(".user").css("background-color", getRandomColor());
    $(".custom").css("background-color", getRandomColor());
}

/**
 * Gets a random value between 0 - 255 to be used for color intensity
 * @returns An integer value from 0 to 255
 */
function getRandomIntensity() {
    return Math.floor(Math.random() * 256);
}

/**
 * Gets a random color, used in setColors function
 * @returns A string containing an RGB value with random intensities
 */
function getRandomColor() {
    return `rgb(${getRandomIntensity()}, ${getRandomIntensity()}, ${getRandomIntensity()})`;
}