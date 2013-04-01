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


// Start an empty array where we'll append the RSS data
var data = [];

// Create the XHR object we'll use
var xhr = Ti.Network.createHTTPClient();

// Connect to the RSS feed
xhr.open("GET", "http://mugshotjunkie.com/feed");

// Once the feed is loaded...
xhr.onload = function() {
	try
	{
		var doc 	= this.responseXML.documentElement;
		var items 	= doc.getElementsByTagName("item");
		var x 		= 0;
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		
		// Look through each main XML node (each blog entry)
		for (var c = 0; c < items.length; c++) {
			// Assign a few items from the feed
			var item 	= items.item(c);
			var title 	= item.getElementsByTagName("title").item(0).text;

			// Assign the specific row
			var row = Ti.UI.createTableViewRow({
				color			: '#fff',
				backgroundColor : '#eee',
				height			: 50,
				selectedBackgroundColor: '#444',		
				hasChild		: true					
			});
			
			// Title
			var label = Ti.UI.createLabel({
				text	: title,
				font	: { fontSize: 12 },
				top		: 5,
				bottom	: 5,
				left	: 10,
				right	: 10,					
				color	: '#222'			
			});
			row.add(label);
			data[x++] = row;
			row.url = item.getElementsByTagName("link").item(0).text;
		}
		
		// Render the table with the blog feed
		var tableview = Titanium.UI.createTableView({
			data: data,
			backgroundColor	: 'transparent',
			layout			: 'vertical',
			bottom			: 0,
			height			: '73%',
			separatorColor	: '#999'			
		});
		win.add(tableview);
		
		// Handle a click event on the table
		tableview.addEventListener('click',function(e) {
			// Create the new window with the link from the post
			var blogWindow = Ti.UI.createWindow({
				title	: doctitle,
				modal	: true,
				barColor: '#050505',
				backgroundColor: '#050505'				
			});
			var webView = Ti.UI.createWebView({url:e.row.url});
			blogWindow.add(webView);
			
			// Create the close button to go in the left area of the navbar popup
			var close = Titanium.UI.createButton({
				title: 'Close',
				style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			blogWindow.setLeftNavButton(close);
			
			// Handle the close event
			close.addEventListener('click',function() {
				blogWindow.close();
			});
			
			blogWindow.open();
		});
	}
	// Do something if something went wrong with the XHR request
	catch(E)
	{
		alert(E);
	}
};
xhr.send();