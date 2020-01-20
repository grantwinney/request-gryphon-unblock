chrome.browserAction.onClicked.addListener(function(tab) {
    let url = new URL(tab.url);
    if (confirm(`You're about to send a request to unblock ${url.hostname}.\r\n\r\nCONTINUE?`)) {
        let postUrl = `http://gryphoncare.com/cgi-bin/luci/site_access_request/?url=${url.hostname}`;
        $.post(postUrl, function(_data, textStatus, xhr) {
            if (xhr.status == 200) {
                alert(`Submitted a request to unblock ${url.hostname}.\r\n\r\nNOTE: The site will remain blocked until your network admin sees your request and unblocks it.`)
            } else {
                alert(`A problem occurred while requesting that ${url.hostname} be unblocked.\r\n\r\nSTATUS: ${textStatus}`)
            }
        })
    }
});
