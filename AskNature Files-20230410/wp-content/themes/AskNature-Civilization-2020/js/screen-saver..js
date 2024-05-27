    //This file only controls the timeout to start the slideshow. 
    //The timing for the slides is embedded in the screensaver.html
    const idleDurationSecs = 60*3;    // 60 * X number of seconds = X minutes
        const redirectUrl = '../screensaver/slideshow.html';  // Redirect idle users to this URL
        let idleTimeout; // variable to hold the timeout, do not modify

        const resetIdleTimeout = function() {

            // Clears the existing timeout
            if(idleTimeout) clearTimeout(idleTimeout);

            idleTimeout = setTimeout(() => location.href = redirectUrl, 
                idleDurationSecs * 1000);
        };

        // Init on page load
        resetIdleTimeout();

        // Reset the idle timeout on any of the events listed below
        ['click', 'touchstart', 'mousemove'].forEach(evt =>
            document.addEventListener(evt, resetIdleTimeout, false)
        );

