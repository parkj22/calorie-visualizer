/**
 * input.js
 * 
 * @author Jinyoung Park (parkj22)
 * @version February 6, 2022
 * @description This module handles inputs from the user, such as clicks or mouse hovers.
 */

import {graphCustom} from "./graph.js"
import { onOptionClick } from "./article.js";

// Global Map variable to keep track of the food button that has been pressed
let consumedFood = new Map();

/**
 * Gets user's name from the URL and format spaces
 * @returns {string} User's name
 */
export function getUserName() {
    return getQueryStr()["user_name"].replace("+", " ");
}

/**
 * Gets the calculated BMR value and trims it down to two decimal places
 * @returns {string} User's BMR value
 */
export function getUserBmr() {
    return calculateBMR().toFixed(2);
}

/**
 * Handles two cases when either article options are clicked or food buttons are clicked
 */
export function handleClick() {
    // When clicked, call onOptionClick() from article.js
    $(".nav-article div").click(function() {
        onOptionClick(this);
    });

    // When clicked, add the clicked item to the map and update the customized graph
    $("button").click(function () {
        addFood($(this).children(".food-name").text().trim());
        graphCustom($(this).val());
    });
}

/**
 * Handles the case when mouse hovers over food buttons
 */
export function handleHover() {
    let origVal = $(".button-header").text(); // Save current header string to restore later
    $("button").hover(
        function () { // Modify header text to inform user the hovered item's number of calories
            updateButtonHeader(`${$(this).children(".food-name").text()} contain(s) about ${$(this).val()} calories.`);
        },
        function () { // Restore header text when mouse leaves the button
            updateButtonHeader(origVal);
        }
    );
}

/**
 * Gets data object that contains key-value pairs from location.search
 * @returns Map containing user's input from index.html
 */
function getQueryStr() {
    let data = {};
    let queryStr = location.search.slice(1);
    let regex = /([^&=]+)=([^&]*)/g, m;

    while (m = regex.exec(queryStr)) {
        data[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return data;
}

/**
 * Calculates BMR value from the user's information (Gender, height, weight) using revised Harris-Benedict equation
 * @returns Calculated value of BMR
 */
function calculateBMR() {
    const user_info = getQueryStr();
    if (user_info["user_gender"] == "male") {
        return 13.397 * user_info["user_weight"] + 4.799 * user_info["user_height"] - 5.677 * user_info["user_age"] + 88.362;
    }
    return 9.247 * user_info["user_weight"] + 3.098 * user_info["user_height"] - 4.330 * user_info["user_age"] + 447.593;
}

/**
 * Adds food to the map and create a new element to be appended to the list
 * @param {string} foodName Identifier of the pressed button
 */
function addFood(foodName) {
    // Create an identifier for the new element, and remove any spaces, if any
    let elementID = foodName.replaceAll(" ", "");
    if(consumedFood.has(foodName)) { // If map already contains the food, then increment count and update the element
        consumedFood.set(foodName, consumedFood.get(foodName) + 1);
        $(`#${elementID}`).text(`${consumedFood.get(foodName)} ${foodName}'s`);
    } else { // If map does not contain the food, then add to map and append new element to the list
        consumedFood.set(foodName, 1);
        let newElement = $(`<p id="${elementID}"></p>`).text(`1 ${foodName}`);
        $(".add-section div").append(newElement);
    }
}

/**
 * Updates button-header element's text with str
 * @param {string} str New header text for ".button-header"
 */
function updateButtonHeader(str) {
    $(".button-header").text(str);
}