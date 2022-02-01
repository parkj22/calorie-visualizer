$(document).ready(function() {
    $("#form-user-input").validate({
        errorClass: "invalid-entry",
        validClass: "valid-entry",
        rules: {
            user_name: {
                required: true,
                minlength: 1
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
        messages: {
            user_name: "",
            user_gender: "",
            user_age: "",
            user_height: "",
            user_weight: ""
        },
        highlight: function(element, errorClass, validClass) {
            $(element).removeClass(validClass).addClass(errorClass);
        },
        success: function(element) {
            $(element).removeClass("invalid-entry").addClass("valid-entry");
        },
        invalidHandler: function(event, validator) {
            let errors = validator.numberOfInvalids();
            $(".error-message").show();
        }
    });
});