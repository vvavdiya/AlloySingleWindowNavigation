var navigation = Alloy.createController("navigation");
Alloy.Globals.navigation = navigation;
var conf = {};

/* -- Bootstrap your application below this line -- */

conf = {
	index: "demo_welcome",
	defaultViewMode: 'nav',
	defaultOpenTransition: {transition: 'none', duration: 150},
	defaultBackTransition: {transition: 'none', duration: 150},
	indexOptions: {
		topLevel: true,
		viewMode: 'nav',
		transition: 'none',
		title: 'Welcome',
		identifier: 'index',
	},
	menuDriver: 'demo_menu',
	//nav: 'demo_navControls',
	//defaultViewDriver: 'demo_view',
	bindMenu: true,
	confirmOnExit: true,
};

/* -- Bootstrap your application above this line -- */

navigation.init(conf);