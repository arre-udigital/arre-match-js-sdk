(function () {
    var arrematch = window.arrematch || {};
    var SDKName = 'arrematch'; // Set the SDK name here

    function checkCookiesEnabled() {
        try {
            document.cookie = 'cookietest=1';
            var ret = document.cookie.indexOf('cookietest=') !== -1;
            document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return ret;
        } catch (error) {
            return false;
        }
    }

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

    function logUTMParamsToConsole(utmParams) {
        console.log('UTM parameters:',utmParams);
    }

    function sendAPIRequest(utmParams) {
        //  API call implementation here...
    }

    function trackUTMParameters() {
        var utmParams = getUTMParams(window.location.href);

        if (utmParams.utm_source === 'arrematch') {
            sendAPIRequest(utmParams);
        }

        logUTMParamsToConsole(utmParams); // Log UTM parameters to the console
        localStorage.setItem('arrematch_utm_params',JSON.stringify(utmParams));
    }

    function retrieveUTMParametersFromStorage() {
        var storedParams = localStorage.getItem('arrematch_utm_params');
        if (storedParams) {
            return JSON.parse(storedParams);
        }
        return null;
    }

    function printCookieInformation() {
        var utmParams = retrieveUTMParametersFromStorage();
        if (utmParams) {
            console.log('Information in the cookie:',utmParams);
        }
    }

    function markConversion() {
        //  mark conversion implementation here...
    }

    function initializeSDK() {
        if (!checkCookiesEnabled()) {
            var errorResponse = {
                status: 'failed',
                statusCodeForClient: 'InitializationFailed',
                actionRequired: 'Cookies should be writable in the browser.',
            };
            console.error('Initialization failed. Cookies should be enabled in the browser.');
            throw new Error(JSON.stringify(errorResponse));
        }

        // Add the following variables to store page information
        var pageRelativeUrl = window.location.pathname;
        var domainName = window.location.hostname;
        var userAgent = navigator.userAgent;
        var vendor = navigator.vendor;
        var platform = navigator.platform;

        console.log('Page Relative URL:',pageRelativeUrl);
        console.log('Domain Name:',domainName);
        console.log('User Agent:',userAgent);
        console.log('Vendor:',vendor);
        console.log('Platform:',platform);

        // Add the tracking function to the SDKName.q queue
        if (!window[SDKName]) {
            window[SDKName] = {q: []};
        }
        window[SDKName].q.push(function () {
            trackUTMParameters();
        });

        // Rest of the initialization code...
    }

    arrematch.logUTMParamsToConsole = logUTMParamsToConsole;
    arrematch.initializeSDK = initializeSDK;
    arrematch.markConversion = markConversion;
    arrematch.printCookieInformation = printCookieInformation;

    // Expose the arrematch namespace globally
    window.arrematch = arrematch;

    // Initialize the SDK asynchronously
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded',function () {
            initializeSDK();
        });
    } else {
        initializeSDK();
    }
})();
