chrome.browserAction.onClicked.addListener(function(tab) {
    let url = new URL(tab.url);
    let hostname = `http://gryphoncare.com/cgi-bin/luci/site_access_request/?url=${url.hostname}`;

    $.post(hostname, function(_data, textStatus, xhr) {
        if (xhr.status == 200) {
            alert(`Submitted an unblock request for: ${url.hostname}\r\n\r\nNOTE: The site will remain blocked until the request is handled by your network admin, who can unblock it or leave it as-is.`)
        } else {
            alert(`A problem occurred while requesting an unblock for: ${url.hostname}\r\n\r\n${textStatus}`)
        }
    })
});
