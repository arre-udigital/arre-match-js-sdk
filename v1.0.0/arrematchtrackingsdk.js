(function () {
    var SDKName = window.SDKName || (window.SDKName = []);

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

    function initializeSDK() {
        var utmParams = getUTMParams(window.location.search);

        // Code to initialize the SDK
        // Use the utmParams as needed

        console.log('UTM parameters:',utmParams);
    }

    SDKName.push(initializeSDK);
})();
