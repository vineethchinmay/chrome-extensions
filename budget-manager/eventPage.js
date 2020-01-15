var contextMenuItem = {
	"id": "spendMoney",
	"title": "SpendMoney",
	"contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value){
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value,10));
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
		if(isInt(clickData.selectionText)){
			chrome.storage.sync.get(['total','limit'],function(budget){
				var newTotal = 0;
				if(budget.total){
					newTotal += parseInt(budget.total);
				}
				newTotal += parseInt(clickData.selectionText);
				chrome.storage.sync.set({'total': newTotal}, function(){
					if(newTotal >= budget.limit){
						var notifOptions = {
							type: 'basic',
							iconUrl: 'icon48.png',
							title: 'Limit reached!',
							message: 'Looks like you have reached your limit' 
						};
						chrome.notifications.create(makeid(7),notifOptions);
					}
				});
			});
		}
	}
});

chrome.storage.onChanged.addListener(function(changes, storageName){
	chrome.browserAction.setBadgeText({'text': changes.total.newValue.toString()});
})