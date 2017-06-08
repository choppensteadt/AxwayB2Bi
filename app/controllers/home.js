var args = $.args;

Alloy.Globals.mainwin = $.getView();

if (OS_IOS) {
    $.community.hideNavBar(true, {
        animated : false
    });
}

function openCommunities(){
	var communities = Alloy.createController('communities', args).getView();
	Alloy.Globals.mainwin.openWindow(communities);
};
function openStuckMessages(){
	alert("show stuck messages");	
};
function openExpiringCertificates(){
	var certificatesHome = Alloy.createController('certificatesHome', args).getView();
	Alloy.Globals.mainwin.openWindow(certificatesHome);
};
function mnuLogoutClicked() {
   	var rememberMeFromProperties = Ti.App.Properties.getBool('remember'); 
	Ti.App.fireEvent('cleanUpAfterLogoutEvent');
	Alloy.createController('login').getView().open();
}