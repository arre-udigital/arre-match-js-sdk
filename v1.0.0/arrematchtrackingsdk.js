(function () {
    // namespace
    var SDKName = window.SDKName || (window.SDKName = []);

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

    // Function to send UTM parameters to API endpoint
    // function sendUTMParamsToAPI(utmParams) {
    //     var apiEndpoint = '';

    //     var xhr = new XMLHttpRequest();

    //     xhr.open('POST',apiEndpoint,true);

    //     xhr.setRequestHeader('Content-Type','application/json');

    //     // Handle the response
    //     xhr.onload = function () {
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             console.log('UTM parameters sent successfully!');
    //         } else {
    //             console.error('Error sending UTM parameters:',xhr.status,xhr.statusText);
    //         }
    //     };

    //     xhr.onerror = function () {
    //         console.error('Error sending UTM parameters: Request failed');
    //     };

    //     xhr.send(JSON.stringify(utmParams));
    // }

    function trackUTMParameters() {
        var utmParams = getUTMParams(window.location.search);
        logUTMParamsToConsole(utmParams);
        // sendUTMParamsToAPI(utmParams);
    }

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

document.addEventListener('DOMContentLoaded',function () {
    SDKName.push(function () {
        initializeSDK();
    });
});
