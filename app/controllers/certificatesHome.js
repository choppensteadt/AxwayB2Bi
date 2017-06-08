var args = $.args;
$.activityIndicator.hide();

function mnuLogoutClicked() {
   	var rememberMeFromProperties = Ti.App.Properties.getBool('remember'); 
	Ti.App.fireEvent('cleanUpAfterLogoutEvent');
	Alloy.createController('login').getView().open();
}
function btnGetAllCertificatesPressed() {
	Alloy.Globals.daysToExpire = 0;
	var certificates = Alloy.createController('certificates', args).getView();
	$.activityIndicator.show();
	Alloy.Globals.mainwin.openWindow(certificates);
	$.activityIndicator.hide();
}
function btnGetCertificatesThatWillExpireIn3DaysPressed() {
	Alloy.Globals.daysToExpire = 3;
	var certificates = Alloy.createController('certificates', args).getView();
	$.activityIndicator.show();
	Alloy.Globals.mainwin.openWindow(certificates);
	$.activityIndicator.hide();
}
function btnGetCertificatesThatWillExpireIn15DaysPressed() {
	Alloy.Globals.daysToExpire = 15;
	var certificates = Alloy.createController('certificates', args).getView();
	$.activityIndicator.show();
	Alloy.Globals.mainwin.openWindow(certificates);
	$.activityIndicator.hide();
}