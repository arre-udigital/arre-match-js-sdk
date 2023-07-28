(function () {
    // Create the arrematch namespace if it doesn't exist
    var arrematch = window.arrematch || {};

    // Function to extract UTM parameters from the URL
    function getUTMParams(url) {
        var params = {};
        var searchParams = new URLSearchParams(url);
        params.utm_source = searchParams.get("utm_source");
        params.utm_medium = searchParams.get("utm_medium");
        params.utm_campaign = searchParams.get("utm_campaign");
        params.utm_term = searchParams.get("utm_term");
        params.utm_content = searchParams.get("utm_content");
        return params;
    }

    // Function to log UTM parameters to the console
    function logUTMParamsToConsole(utmParams) {
        console.log('UTM parameters:',utmParams);
    }

    // Function to track UTM parameters and log them to console
    function trackUTMParameters() {
        var utmParams = getUTMParams(window.location.search);

        // Check if utm_source is "arrematch" and make the API call here
        if (utmParams.utm_source === 'arrematch') {
            // Perform your API call here with the utmParams
        }

        logUTMParamsToConsole(utmParams);
    }

    // Function to initialize the SDK
    function initializeSDK() {
        // Check if the cookie is writable
        if (!navigator.cookieEnabled) {
            console.error('Initialization failed. Cookies should be enabled in the browser.');
            return;
        }

        // Load the SDK asynchronously
        setTimeout(trackUTMParameters,0);
    }

    // Add functions to the arrematch namespace
    arrematch.logUTMParamsToConsole = logUTMParamsToConsole;
    arrematch.initializeSDK = initializeSDK;

    // Expose the arrematch namespace globally
    window.arrematch = arrematch;
})();
