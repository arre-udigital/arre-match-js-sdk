(function () {
    var arrematch = window.arrematch || {};

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
        // API call using fetch:
        // fetch('', {
        //   method: 'POST',
        //   body: JSON.stringify(utmParams),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data))
        //   .catch((error) => console.error('Failed:', error));
    }

    function printCookieInformation() {
        var cookie = document.cookie;
        console.log('Cookie:',cookie);
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

        // Store UTM parameters in local storage
        var utmParams = getUTMParams(window.location.href);
        localStorage.setItem('utmParams',JSON.stringify(utmParams));

        logUTMParamsToConsole(utmParams);
        setTimeout(trackUTMParameters,0);
    }

    function trackUTMParameters() {
        var utmParams = getUTMParams(window.location.href);

        if (utmParams.utm_source === 'arrematch') {
            sendAPIRequest(utmParams);
        }

        logUTMParamsToConsole(utmParams);
    }

    function markConversion() {
        // Perform the validation check to ensure a single sessionId can have only one conversion event
        // If the validation passes, make the API call with isConversionEvent as true
        //   Perform a validation check to ensure that a single sessionId can have only one conversion event.
        //   If that already exists, ignore all the other API requests received in such way because it may be due to a bug
        // in the client installation.
    }

    arrematch.initializeSDK = initializeSDK;
    arrematch.markConversion = markConversion;
    arrematch.printCookieInformation = printCookieInformation;

    window.arrematch = arrematch;

    arrematch.initializeSDK();
})();
