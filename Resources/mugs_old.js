String.prototype.capitalize = function() {
	str = this.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
};

var win = Ti.UI.currentWindow;

win.hideNavBar();

// Background image view
var bgImage = Ti.UI.createImageView({
	image	: 'img/background.jpg',
	top		: -57,
	width	: '100%',
	zIndex	: 0
});
win.add(bgImage);


/**
 * Comments
 */
comments = Ti.UI.createWebView({ zIndex: 103 });

var btnComment = Ti.UI.createImageView({
	image	: 'img/btn-comments.png',
	left	: 15,
	top		: '90%',
	width	: 'auto',
	zIndex	: 110
});
win.add(btnComment);

btnComment.addEventListener( 'click', function () {
	win.add(comments);
	
	var close = Titanium.UI.createButton({
		title	: 'Close',
		style	: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	close.addEventListener( 'click', function() {
		win.remove(comments);
		win.setToolbar( null, { animated: true } );
	});
	
	win.setToolbar([close]);
});



/**
 * Information
 */
info = Ti.UI.createTableView({
	bottom	: 0,
	layout	: 'vertical',
	zIndex	: 110
});

var btnInfo = Ti.UI.createImageView({
	image	: 'img/btn-info.png',
	right	: 15,
	top		: '90%',
	width	: 'auto',
	zIndex	: 110
});
win.add(btnInfo);

btnInfo.addEventListener( 'click', function () {
	win.add(info);
	
	var close = Titanium.UI.createButton({
		title	: 'Close',
		style	: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	close.addEventListener( 'click', function() {
		win.remove(info);
		win.setToolbar( null, { animated: true } );
	});
	
	win.setToolbar([close]);
});



/**
 * Remote XHR Request
 * 
 * @description		Request the images dynamically, with a simple GET, then render the image in the view
 * @todo			Get the back-end random function working
 * @todo			Hot or Not rating Ability
 */
var loading = false; 

function loadMug ()
{	
	loading = true;
	var xhr = Ti.Network.createHTTPClient();

	xhr.onload = function () 
	{		
		offender = JSON.parse(this.responseText);
		
		if ( typeof mug != 'undefined' ) {
			win.remove(mug);
			offender_data = null;
			offender = JSON.parse(this.responseText);
		}
		
		mug = Ti.UI.createImageView({
			height	: '100%',
			image	: Ti.Utils.base64decode(offender.image),
			top		: 0,
			width	: '100%',
			zIndex	: 1
		});
		win.add(mug);	
		
		comments.html = '<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:comments href="http://mugshotjunkie.com/inmate/mugshot/'+offender.booking_id+'/" num_posts="5" width="'+(win.width - 12)+'"></fb:comments>';
		
		info.data = [
			{ title: offender.firstname.capitalize()+' '+offender.lastname.capitalize(), leftImage: 'img/txt/name.png' },
			{ title: offender.scrape.capitalize()+', '+offender.state.capitalize(), leftImage: 'img/txt/from.png' },
			{ title: offender.age.toString(), leftImage: 'img/txt/age.png' },
			{ title: offender.gender.capitalize(), leftImage: 'img/txt/gender.png' }
		];;
	};
	
	xhr.onerror = function () {
		Ti.API.info('error requesting data');
	};
	
	xhr.open( 'GET', 'http://ve.6jkwbbxq.vesrv.com/offender/random/' );
	xhr.send();
	
	loading = false;
}

/* Prev Button
var btnPrev = Ti.UI.createImageView({
	image	: 'img/btn-prev.png',
	left	: 15,
	top		: '10%',
	width	: 'auto',
	zIndex	: 100
});
	win.add(btnPrev);
	btnPrev.addEventListener( 'click', loadMug );
*/
	
// Next Button
var btnNext = Ti.UI.createImageView({
	image	: 'img/btn-next.png',
	right	: 15,
	top		: '10%',
	width	: 'auto',
	zIndex	: 100
});
	win.add(btnNext);
	btnNext.addEventListener( 'click', loadMug );
		

win.addEventListener( 'open', loadMug );
win.addEventListener( 
	'swipe', 
	function () 
	{ 
		if(loading === false) 
			loadMug(); 
	}
);
