/* Credits: Source Code for sendEmail.js API https://www.emailjs.com/docs/tutorial/creating-contact-form/*/
function sendMail(contactForm) {
    emailjs.send("gmail", "quizijuanna", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.message.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                alert("Thank you for contacting us. We'll respond within 24hours!");
            },
            function (error) {
                console.log("FAILED", error);
                alert("Something wrong happened!");
            }
        );
    return false;
}
 
