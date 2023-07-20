
// Define the namespace
var arrematch = window.arrematch || (window.arrematch = []);

// Function to extract UTM parameters from the URL
function getUTMParams(url) {
    console.log(url," === url")
    var params = {};
    var searchParams = new URLSearchParams(url);
    params.utm_source = searchParams.get("utm_source");
    params.utm_medium = searchParams.get("utm_medium");
    params.utm_campaign = searchParams.get("utm_campaign");
    params.utm_term = searchParams.get("utm_term");
    params.utm_content = searchParams.get("utm_content");
    return params;
}

// Function to send UTM parameters to API endpoint
function sendUTMParamsToAPI(utmParams) {
    var apiEndpoint = 'API_ENDPOINT_URL';

    // Perform API call to send the UTM parameters
    fetch(apiEndpoint,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(utmParams),
    })
        .then(response => {
            // Handle the API response if needed
            console.log('UTM parameters sent successfully!');
        })
        .catch(error => {
            // Handle API call errors if needed
            console.error('Error sending UTM parameters:',error);
        });
}

// Function to track UTM parameters and send them to API
function trackUTMParameters() {
    var utmParams = getUTMParams(window.location.search);
    console.log(utmParams);

    // Send the UTM parameters to the API endpoint
    sendUTMParamsToAPI(utmParams);
}

// Execute the SDK code asynchronously using the queue event
arrematch.push(function () {
    trackUTMParameters();
});
