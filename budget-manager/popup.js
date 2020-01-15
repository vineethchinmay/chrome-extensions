$(function(){

	chrome.storage.sync.get(['total','limit'], function(budget){
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	})

	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total','limit'], function(budget){
			var newTotal = 0;
			if(budget.total){
				newTotal += parseInt(budget.total);
			}

			var amount = $('#amount').val();
			if(amount){
				newTotal += parseInt(amount);
			}

			chrome.storage.sync.set({'total': newTotal},function(){
				if(amount && newTotal >= budget.limit){
					var notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit reached!',
						message: 'Looks like you have reached your limit' 
					};
					chrome.notifications.create(makeid(7),notifOptions);
				}
			});

			$('#total').text(newTotal);
			$('#amount').val('');
		})
	})
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}