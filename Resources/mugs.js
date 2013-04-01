String.prototype.capitalize = function() {
	str = this.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
};

var win = Ti.UI.currentWindow;
win.hideNavBar();

var info = Ti.UI.createTableView();
var win_info = Ti.UI.createWindow({
	title			: 'Information',
	modal			: true,
	barColor		: '#050505',
	backgroundColor	: '#050505'				
});
var info_close = Titanium.UI.createButton({
	title: 'Close',
	style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
win_info.setLeftNavButton(info_close);
info_close.addEventListener( 'click', function() { win_info.close(); } );


var comments = Ti.UI.createWebView();
var win_comment = Ti.UI.createWindow({
	title			: 'Comment',
	modal			: true,
	barColor		: '#050505',
	backgroundColor	: '#050505'				
});
var comment_close = Titanium.UI.createButton({
	title: 'Close',
	style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
win_comment.setLeftNavButton(comment_close);
comment_close.addEventListener( 'click', function() { win_comment.close(); } );


var btn_info = Titanium.UI.createButton({
	title	: 'Info',
	style	: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var btn_comment = Titanium.UI.createButton({
	title	: 'Comment',
	style	: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

win.setToolbar([btn_info, btn_comment]);
btn_info.addEventListener( 'click', function () { win_info.add(info); win_info.open(); });
btn_comment.addEventListener( 'click', function () { win_comment.add(comments); win_comment.open(); });


/**
 * Remote XHR Request
 * 
 * @description		Request the images dynamically, with a simple GET, then render the image in the view
 * @todo			Hot or Not rating Ability
 */
function loadMug ()
{	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.open( 'GET', 'http://ve.6jkwbbxq.vesrv.com/offender/random/' );
	xhr.send();
	
	xhr.onerror = function () { Ti.API.info('error requesting data'); };
	
	xhr.onload = function () 
	{
		try {
			offender = JSON.parse(this.responseText);
			
			if ( typeof mug != 'undefined' ) {
				win.remove(mug);
				mug = null;
				offender = JSON.parse(this.responseText);
			}
			
			
			mug = Ti.UI.createImageView({
				height	: '100%',
				image	: Ti.Utils.base64decode(offender.image),
				top		: 0,
				width	: '100%'
			});
			win.add(mug);	
			
			comments.html = '<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:comments href="http://mugshotjunkie.com/inmate/mugshot/'+offender.booking_id+'/" num_posts="5" width="'+(win.width - 12)+'"></fb:comments>';
			
			info.data = [
				{ title: offender.firstname.capitalize()+' '+offender.lastname.capitalize(), leftImage: 'img/txt/name.png' },
				{ title: offender.scrape.capitalize()+', '+offender.state.capitalize(), leftImage: 'img/txt/from.png' },
				{ title: offender.age.toString(), leftImage: 'img/txt/age.png' },
				{ title: offender.gender.capitalize(), leftImage: 'img/txt/gender.png' }
			];
		}
		
		catch (E) { Ti.API.info(E); }
	};
}


win.addEventListener( 'open', loadMug );

var swiped = 'none';
win.addEventListener( 'swipe', function (e) {            
    if ( e.direction != swiped ) {
        swiped = e.direction;
		loadMug();
	}
	setTimeout( function() { swiped = 'none'; }, 2000 );
});

setInterval(function() {
       Ti.API.debug(Titanium.Platform.availableMemory);
}, 1000);