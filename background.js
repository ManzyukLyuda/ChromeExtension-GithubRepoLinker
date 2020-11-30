
function RepoClick(info, tab){
    let url = info.linkUrl.split('/').filter(item => item !== '' && item !== 'app' && item !== 'index.html');
    let domen = url[1].split('.');
    if(domen.includes('github')){
        let urlTail = url.slice(3, url.length).join("/")
        let newUrl = `${url[0]}//github.com/${domen[0]}/${url[2]}/tree/master/${urlTail}/`
        chrome.tabs.create({ url: newUrl });
    }
    else{
        let timestamp = new Date().getTime();
        let id = 'myid' + timestamp;
        chrome.notifications.create(
            id,
            {
              type: "basic",
              iconUrl: "triangle.png",
              title: "Wron Repo type",
              message: "The link you try to rich isn't Githup Page",
            },
            function () {
                let clear = function(){chrome.notifications.getAll((items) => {
                    if ( items ) {
                        for (let key in items) {
                            chrome.notifications.clear(key);
                        }
                    }
                  })
                }
                setTimeout(clear, 3000)
              
            }
          );
    }
    
}

chrome.contextMenus.create({
    title: "Open GitHub project",
    contexts: ["link"],
    onclick: RepoClick
});
