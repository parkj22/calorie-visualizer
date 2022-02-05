/**
 * validate.js
 * 
 * @author Jinyoung Park (parkj22)
 * @version February 6, 2022
 * @description This module utilizes jQuery validation plugin to do form validation.
 */

$(document).ready(function() {
    $("#form-user-input").validate({
        errorClass: "invalid-entry", // Fields that don't follow rules are set to 'invalid-entry' class
        rules: {
            user_name: {
                required: true
            },
            user_gender: "required",
            user_age: {
                required: true,
                digits: true,
                min: 0
            },
            user_height: {
                required: true,
                digits: true,
                min: 0
            },
            user_weight: {
                required: true,
                digits: true,
                min: 0
            }
        },
        messages: { // Error messages are removes so that input fields are held in place
            user_name: "",
            user_gender: "",
            user_age: "",
            user_height: "",
            user_weight: ""
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass);
        },
        success: function(element) {
            $(element).removeClass("invalid-entry");
        },
        invalidHandler: function(event, validator) { // Show an error message when invalid form is submitted
            // let errors = validator.numberOfInvalids();
            $(".error-message").show();
        }
    });
});