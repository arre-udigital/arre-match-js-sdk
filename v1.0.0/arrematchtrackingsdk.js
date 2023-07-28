(function () {
    // namespace
    var SDKName = window.SDKName || (window.SDKName = []);

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
        console.log(params," === param")
        return params;
    }

    // Function to log UTM parameters to the console
    function logUTMParamsToConsole(utmParams) {
        console.log('UTM parameters:',utmParams);
    }

    // Function to track UTM parameters and log them to console
    function trackUTMParameters() {
        var utmParams = getUTMParams(window.location.search);
        logUTMParamsToConsole(utmParams);
    }

    // Function to process queued events and initialize the SDK
    function initializeSDK() {
        while (SDKName.q.length > 0) {
            var event = SDKName.q.shift();
            if (event && typeof event === 'function') {
                event();
            }
        }

        trackUTMParameters();
    }

    SDKName.push(initializeSDK);
})();
