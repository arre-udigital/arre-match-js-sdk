(function () {
    // Create the arrematch namespace if it doesn't exist
    var arrematch = window.arrematch || {};

    // Function to check if cookies are enabled
    function checkCookiesEnabled() {
        try {
            // Create a test cookie
            document.cookie = 'cookietest=1';
            var ret = document.cookie.indexOf('cookietest=') !== -1;
            // Delete the test cookie
            document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return ret;
        } catch (error) {
            return false;
        }
    }

    // Function to extract UTM parameters from the URL
    function getUTMParams(url) {
        var params = {};
        var searchParams = new URLSearchParams(url);
        params.utm_source = searchParams.get('utm_source');
        params.utm_medium = searchParams.get('utm_medium');
        params.utm_campaign = searchParams.get('utm_campaign');
        params.utm_term = searchParams.get('utm_term');
        params.utm_content = searchParams.get('utm_content');
        return params;
    }

    // Function to log UTM parameters to the console
    function logUTMParamsToConsole(utmParams) {
        console.log('UTM parameters:',utmParams);
    }

    // Function to send API call with UTM parameters
    function sendAPIRequest(utmParams) {
        //  API call using fetch:
        // fetch('', {
        //   method: 'POST',
        //   body: JSON.stringify(utmParams),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data))
        //   .catch((error) => console.error('  failed:', error));
    }

    // Function to track UTM parameters and log them to console
    function trackUTMParameters() {
        var utmParams = getUTMParams(window.location.href);

        // Check if utm_source is "arrematch" and make the API call here
        if (utmParams.utm_source === 'arrematch') {
            // Perform your API call here with the utmParams
            sendAPIRequest(utmParams);
        }

        logUTMParamsToConsole(utmParams);
    }

    //initialize the SDK
    function initializeSDK() {
        // Check if the cookie is writable
        if (!checkCookiesEnabled()) {
            var errorResponse = {
                status: "failed",
                statusCodeForClient: "InitilizationFailed",
                actionRequired: "Cookies should be writable in the browser."
            };
            console.error('Initialization failed. Cookies should be enabled in the browser.');
            throw new Error(JSON.stringify(errorResponse));
        }

        setTimeout(trackUTMParameters,0);
    }

    // Function to mark conversion event
    function markConversion() {
        // Perform the validation check to ensure a single sessionId can have only one conversion event
        // If the validation passes, make the API call with isConversionEvent as true
        //   Perform a validation check to ensure that a single sessionId can have only one conversion event. 
        //   If that already exists,ignore all the other API requests received in such way because it may be due to a bug
        // in the client installation.  
    }

    // Add functions to the arrematch namespace
    arrematch.logUTMParamsToConsole = logUTMParamsToConsole;
    arrematch.initializeSDK = initializeSDK;
    arrematch.markConversion = markConversion;

    // Expose the arrematch namespace globally
    window.arrematch = arrematch;

    arrematch.initializeSDK();
})();
