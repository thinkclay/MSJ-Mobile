// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#0f0e10');

var mugs_window = Titanium.UI.createWindow({  
	url		: 'mugs.js',
	title	: 'Mugs'
});
	var mugs = Titanium.UI.createTab({  
	    icon	: 'img/tabs/mugs.png',
	    title	: 'Mugs',
	    window	: mugs_window
	});


var twitter_window = Titanium.UI.createWindow({  
	url				: 'twitter.js',
	title			: 'Twitter'
});
	var twitter = Titanium.UI.createTab({  
	    icon	: 'img/tabs/twitter.png',
	    title	: 'Twitter',
	    window	: twitter_window
	});


var news_window = Titanium.UI.createWindow({  
	url		: 'news.js',
	title	: 'News'
});
	var news = Titanium.UI.createTab({  
	    icon	: 'img/tabs/news.png',
	    title	: 'Stories',
	    window	: news_window
	});
	
	
var settings_window = Titanium.UI.createWindow({  
	url		: 'settings.js',
	title	: 'Settings'
});
	var settings = Titanium.UI.createTab({  
	    icon	: 'img/tabs/settings.png',
	    title	: 'Settings',
	    window	: settings_window
	});


var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(mugs);  
tabGroup.addTab(twitter);  
tabGroup.addTab(news);
tabGroup.addTab(settings);
tabGroup.open();