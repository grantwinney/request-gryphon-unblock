chrome.browserAction.onClicked.addListener(function(tab) {
    let url = new URL(tab.url);
    let timeoutSeconds = 15;
    if (confirm(`Request that this site be unblocked? [${url.hostname}]\r\n\r\n(Note that after you press OK, it may take a few seconds to complete submitting the request before you see another prompt.)`)) {
        $.ajax({
            type: "POST",
            url: `http://gryphoncare.com/cgi-bin/luci/site_access_request/?url=${url.hostname}`,
            timeout: timeoutSeconds * 1000,
            success: function(_data, _textStatus, _xhr) {
                alert(`Submitted an unblock request for: ${url.hostname}\r\n\r\nNOTE: The site will remain blocked until the request is handled by your network admin, who can unblock it or leave it as-is.`);
            },
            error: function(_jqXHR, textStatus, errorThrown) {
                if (textStatus === 'timeout') {
                    alert(`Unable to request an unblock for: ${url.hostname}\r\n\r\nReason: The request took too long (> ${timeoutSeconds} seconds) and a timeout occurred. Are you on the network with the Gryphon router?`);
                } else {
                    if (errorThrown === '') {
                        alert(`Unable to request an unblock for: ${url.hostname}\r\n\r\nReason: An unknown error occurred. Are you on the network with the Gryphon router?`);
                    } else {
                        alert(`Unable to request an unblock for: ${url.hostname}\r\n\r\nReason: ${errorThrown}`);
                    }
                }
            }
        });
    }
});
