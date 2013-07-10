// Hashtag: target hashtag
// target: string representing jQuery selector to append new photos to (example ".lovingday")
// pictureRequests: an integar representing the amount of API calls to make to instagram
// timeBetweenCall: Number (in seconds) between each API call

function instafeed(hashtag, target, pictureRequests, timeBetweenCall) {
	var timerId = 0;
	var pictureCount = 0;
	timerId = setInterval(function(){
	    		if (pictureCount<pictureRequests){
	    			// Show instagram feed 
	    	            $(target).instagram({
			                hash: hashtag, 
			                clientId: 'fc195c47de4b4f57a069e632e6ef96b8',
			                show : 1,
			                image_size : 'standard_resolution' // Image size to display. Choose one between 'low_resolution', 'thumbnail' or 'standard_resolution'.
				        });

	    			pictureCount++;
	    			console.log("Instagram feed for+ "+hashtag+" is on call "+pictureCount);

	    			// Now make sure there are no duplicates by adding the instagram ids to the array
	    			// if there is a duplicate, then delete one of them
	    			
	    			var numberofImages = $('.instagram-placeholder').length;
	    			var placeholderId = [];
	    			for (var i = 0; i < numberofImages-1; i++) {
	    				var tempid = $('.instagram-placeholder').eq(i).attr('id');
	    				placeholderId.push(tempid)
	    			};

	    			// Now sort the array and check if the next index is same as current and add those
	    			// to the duplicate array
	    			var sorted_placeholderId = placeholderId.sort()
	    			var duplicates = [];
	    			for (var i = 0; i < numberofImages-1; i++) {
					    if (sorted_placeholderId[i + 1] == sorted_placeholderId[i]) {
					        duplicates.push(sorted_placeholderId[i]);
					    }
					}

	    			// Now do a for loop that eliminates the first id of a duplicated instagram placeh-
	    			// er.

	    			for (var i = 0; i < duplicates.length; i++) {
	    				$("#"+duplicates[i]).remove();
	    			};

	    			// Now empty the main arrays for the next interval call
	    			placeholderId = [];
	    			duplicates = [];

	    		} else {
	    			clearInterval(timerId);
	    		}    	            
			},timeBetweenCall*1000)
}