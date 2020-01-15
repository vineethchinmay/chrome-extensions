$(function(){

	chrome.storage.sync.get('limit', function(budget){
		$('#limit').val(budget.limit);
	})

	$('#saveLimit').click(function(){
		var limit = $('#limit').val();
		if(limit){
			chrome.storage.sync.set({'limit':limit}, function(){
				close();
			});
		}
	});

	$('#resetTotal').click(function(){
		chrome.storage.sync.set({'total': 0},function(){
			var notifOptions = {
					type: 'basic',
					iconUrl: 'icon48.png',
					title: 'Total reset!',
					message: 'Looks like you have reset your total to 0!' 
				};
				chrome.notifications.create(makeid(7),notifOptions);
		});

	})
})

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}