Sam.UI.validation = Sam.UI.validation || {};

Sam.UI.validation = {
    init: function () {

        jQuery.validator.addMethod(
            "alphanumericspaces", function (value, element) {
                return this.optional(element) || /^[A-Za-z][a-z0-9\-\s]+$/i.test(value);
            }, "Letters, numbers, spaces, dashes or underscores only please"
        );

        // Set default validate behavior to error/success based on bootstrap styles
        $.validator.setDefaults(
            {
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                    $(element).removeClass('hide').css('display', 'inline-block');
                },
                success: function (element) {
                    $(element)
                    .css('display', 'none')
                    .closest('.form-group').removeClass('has-error').addClass('has-success');
                }
            }
        );
        Sam.UI.validation.contactUsFormValidator = $("#contactUsForm").validate(
            {
                errorPlacement: function (error, element) {
                    if (element.attr("name") == "recaptcha_response_field") {
                        error.insertAfter(".captcha");
                    } else {
                        error.insertAfter(element);
                    }
                },
                rules: {
                    FirstName: {
                        required: true,
                        alphanumeric: true
                    },
                    LastName: {
                        required: true,
                        alphanumeric: true
                    },
                    Email: {
                        required: true,
                        email: true
                    },
                    Phone: {
                        required: true,
                        phoneUS: true
                    },
                    Message: {
                        required: true,
                        maxlength: 500
                    },
                    Extension: {
                        number: true,
                        maxlength: 5
                    },
                    recaptcha_response_field: {
                        required: true
                    }
                },
                messages: {
                    FirstName: {
                        required: 'First name is required',
                        alphanumeric: 'Only letters and numbers are allowed for this field'
                    },
                    LastName: {
                        required: 'Last name is required',
                        alphanumeric: 'Only letters and numbers are allowed for this field'
                    },
                    Email: {
                        required: 'Email is required',
                        email: 'Please enter a valid email'
                    },
                    Phone: {
                        required: 'Phone is required',
                        phoneUS: 'Please enter a valid phone number'
                    },
                    Message: {
                        required: 'Message is required',
                        maxlength: "Limit 500 characters"
                    },
                    Extension: {
                        number: "Only numbers are allowed for this field"
                    },
                    recaptcha_response_field: {
                        required: 'Please enter the image validation'
                    }
                }
            }
        );

        Sam.UI.validation.colleagueFormValidator = $("#colleagueForm").validate(
            {
                errorPlacement: function (error, element) {
                    error.insertAfter(element);
                },
                rules: {
                    FirstName: {
                        required: true,
                        alphanumeric: true
                    },
                    EmailAddress: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    FirstName: {
                        required: 'Please enter your name above',
                        alphanumeric: 'Only letters and numbers are allowed for this field'
                    },
                    EmailAddress: {
                        required: 'Please enter your friend\'s email above',
                        email: 'Please enter a valid email'
                    }
                }
            }
        );

        $("#stayInformedForm").validate(
            {

                errorPlacement: function (error, element) {
                    if (element.attr("name") == "MailList") {
                        error.insertAfter(".regpage_checkboxText:first");
                    }
                    else if (element.attr("name") == "Specialty") {
                        error.insertAfter(".specialty");
                    }
                    else if (element.attr("name") == "CertifyApproval") {
                        error.insertAfter(".regpage_checkboxText:last");
                    }
                    else {
                        error.insertAfter(element);
                    }

                },
                rules: {
                    FirstName: {
                        required: true,
                        alphanumeric: true
                    },
                    LastName: {
                        required: true,
                        alphanumericspaces: true
                    },
                    EmailAddress: {
                        required: true,
                        email: true
                    },
                    AddressLine1: {
                        required: true
                    },
                    City: {
                        required: true
                    },
                    State: {
                        required: true,
                        maxlength: 2
                    },
                    PostalCode: {
                        required: true,
                        maxlength: 5,
                        number: true
                    },
                    Specialty: {
                        required: true
                    },
                    Designation: {
                        required: true
                    },
                    MailList: {
                        required: true
                    },
                    CertifyApproval: {
                        required: true
                    },
                    NpiNumber: {
                        number: true,
                        minlength: 10,
                        maxlength: 10
                    },
                    StateOfLicense: {
                        maxlength: 2
                    }

                },
                messages: {
                    FirstName: {
                        required: 'Please enter your first name above',
                        alphanumeric: 'Only letters and numbers are allowed for this field'
                    },
                    LastName: {
                        required: 'Please enter your last name above',
                        alphanumeric: 'Only letters and numbers are allowed for this field'
                    },
                    EmailAddress: {
                        required: 'Please enter your email above',
                        email: 'Please enter a valid email'
                    },
                    AddressLine1: {
                        required: 'Please enter your address'
                    },
                    City: {
                        required: 'Please enter your city'
                    },
                    State: {
                        required: 'Please select a state',
                        maxlength: "Please select a state"
                    },
                    PostalCode: {
                        required: 'Please enter your zip code above',
                        number: "Please enter a valid zip code"
                    },
                    Specialty: {
                        required: 'Please enter your speciality above'
                    },
                    Designation: {
                        required: 'Please enter your professional designation above'
                    },
                    MailList: {
                        required: 'Please check to sign up'
                    },
                    CertifyApproval: {
                        required: 'Please check to sign up'
                    },
                    NpiNumber: {
                        number: 'Only numbers are allowed for this field',
                        minlength: 'Please enter exactly 10 digits for the NPI #',
                        maxlength: 'Please enter exactly 10 digits for the NPI #'
                    },
                    StateOfLicense: {
                        maxlength: "Please select a state"
                    }
                }
            }
        );

        $("#stayInformed2Form").validate(
            {
                errorPlacement: function (error, element) {
                    error.insertAfter(element);
                },
                rules: {
                    City: {
                        required: true
                    },
                    State: {
                        required: true,
                        maxlength: 2
                    },
                    PostalCode: {
                        alphanumeric: true
                    },
                    OfficePhoneNumber: {
                        alphanumeric: true
                    },
                    NpiNumber: {
                        number: true,
                        minlength: 10,
                        maxlength: 10
                    }
                },
                messages: {
                    City: {
                        required: 'Please enter your city',
                    },
                    State: {
                        required: 'Please select a state',
                        maxlength: "Please select a state"
                    },
                    PostalCode: {
                        alphanumeric: 'Please enter a valid zip code'
                    },
                    OfficePhoneNumber: {
                        alphanumeric: 'Please enter a valid phone number'
                    },
                    NpiNumber: {
                        number: 'Only numbers are allowed for this field',
                        minlength: 'Please enter exactly 10 digits for the NPI #',
                        maxlength: 'Please enter exactly 10 digits for the NPI #'
                    }
                }
            }
        );

    }
}