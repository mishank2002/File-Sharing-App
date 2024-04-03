const { default: axios } = require("axios");

const sendEmail = (data) => {
    console.log("Data to be sent:", data); // Add console log to check data

    // Send request to the server
    return axios.post('/api/send', data)
        .then(response => {
            console.log("Email sent successfully:", response.data); // Add console log for successful response
            return response.data; // Return the response data
        })
        .catch(error => {
            console.error("Error sending email:", error); // Add console log for error
            throw error; // Throw the error for handling
        });
};

export default {
    sendEmail
};
