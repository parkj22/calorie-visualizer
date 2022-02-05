/**
 * graph.js
 * 
 * @author Jinyoung Park (parkj22)
 * @version February 6, 2022
 * @description This module maintains 4 BMR values and draws graphs onto the page using those values.
 */

import {getUserBmr} from "./input.js"

/* This array represents BMR values for:
    Average American male BMR graph,
    Average American female BMR graph,
    User's BMR graph,
    Customized BMR graph
*/
let graphVal = [1662, 1493, getUserBmr(), 0];

/**
 * Displays all four graphs according to graphVal array
 */
export function graphAll() {
    graphBMR("avg-male-graph", graphVal[0]);
    graphBMR("avg-female-graph", graphVal[1]);
    graphBMR("user-graph", graphVal[2]);
    graphBMR("custom-graph", graphVal[3]);
}

/**
 * Displays a graph with id value of 'id' and BMR value of 'cal'
 * @param {string} id Identifier for the graph to be displayed
 * @param {string} cal BMR value in calories
 */
function graphBMR(id, cal) {
    const len = calToLen(cal);
    graph(id, len, cal);
}

/**
 * Adds 'cal' to previous BMR value and updates the customized graph with the total BMR value.
 * @param {string} cal BMR value in calories
 */
export function graphCustom(cal) {
    graphVal[3] += parseInt(cal);
    let len = calToLen(graphVal[3]);
    graph("custom-graph", len, graphVal[3]);
}

/**
 * Animates graph parts (head and body) to correctly display the graph with the given 'len' and 'cal'
 * @param {string} id Identifier for the graph to be displayed
 * @param {string} len Length (in pixels) of the graph
 * @param {string} cal BMR value in calories
 */
function graph(id, len, cal) {
    // Animates graph head and body to correct length
    $(`#${id} > .graph-head`).css("transform", `translate(${len}px)`);
    $(`#${id} > .graph-body`).css("transform", `scaleX(${len})`);

    // Translates div to display BMR value next to the graph
    $(`#${id} > .graph-val`).css("transform", `translate(${len}px)`);
    $(`#${id} > .graph-val`).text(`${cal} kcal`);
}

/**
 * Converts given number of calories to pixels on webpage, used for correctly displaying graphs onto the screen
 * @param {string} cal BMR value in calories
 * @returns {string} Length in pixels (px)
 */
function calToLen(cal) {
    const maxCal = 2500;
    const maxWidth = $(".graph-div").width() * 0.85;
    let len = cal / maxCal * maxWidth;
    return len < maxWidth ? len : maxWidth;
}