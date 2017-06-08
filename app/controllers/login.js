var args = $.args;

var LoginGlobal = {};

(function main() {

	// Set localized strings on all controls
	$.lblProductName.text = L('product_name');
	$.lblWelcome.text = L('welcome_message');
	$.btnLogin.title = L('login');
	$.txtUserName.hintText = L('username');
	$.txtPassword.hintText = L('password');
	$.swcKeepMeSignedIn.title = L('remember');

	// Determine whether to remember host IP and username
	var rememberMeFromProperties = Ti.App.Properties.getBool('remember', false);

	// Read whether 'remember me' is checked from properties, if so default host IP address and username then set switch to true
	if (rememberMeFromProperties == true) {
		var hostFromProperties = Ti.App.Properties.getString('hostIP'),
		    usernameFromProperties = Ti.App.Properties.getString('username');

		$.txtHostIP.value = hostFromProperties;
		$.txtUserName.value = usernameFromProperties;
		$.swcKeepMeSignedIn.value = true;
		$.txtPassword.value = null;
		$.txtPassword.focus();
	} else {
		Ti.App.Properties.setBool('remember', false);
		$.txtPassword.value = null;
		$.txtHostIP.focus();
	}

	// Establishes user session
	LoginGlobal.login = function(hostIP, username, password) {

		Alloy.Globals.creds = "Basic " + Ti.Utils.base64encode(username + ":" + password);
		var url = "http://" + hostIP + ":6080/rest/v1/login";

		var xhr = Ti.Network.createHTTPClient({
			onload : function(e) {

				Alloy.Globals.hostIP = hostIP;
				Alloy.Globals.username = username;
				Alloy.Globals.password = password;

				console.info('Login: ' + this);

				var home = Alloy.createController('home', args).getView();
				$.activityIndicator.hide();

				if (OS_IOS) {
					home.open({
						transition : Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT,
						duration : 500
					});
				} else {
					home.open();
				}

				return true;
			},
			onerror : function(e) {
				Alloy.Globals.hostIP = null;
				Alloy.Globals.username = null;
				Alloy.Globals.password = null;
				Alloy.Globals.sessionToken = null;
				$.activityIndicator.hide();
				alert("Login invalid");
				alert(e.error);
				return false;
			},
			timeout : 10000 /* in milliseconds */
		});
		xhr.open("POST", url);
		xhr.setRequestHeader('Authorization', Alloy.Globals.creds);
		xhr.send();
	};

	// Ends user session
	LoginGlobal.logout = function() {
		var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/logout";

		var xhr = Ti.Network.createHTTPClient({
			onload : function(e) {
				console.info('Logout success: ' + this.responseText);
				return true;
			},
			onerror : function(e) {
				console.warn('Logout error: ' + this.status);
				return false;
			},
			timeout : 10000 /* in milliseconds */
		});
		xhr.open("POST", url);
		xhr.send();
	};

	// Saves the arguments hostURL and username as properties
	LoginGlobal.saveLoginInformationToProperties = function(username, hostIP) {
		Ti.App.Properties.setString('hostIP', hostIP);
		Ti.App.Properties.setString('username', username);
	};
})();

// Called when remember me switch is changed to update properties
function swcKeepMeSignedInChecked() {
	if ($.swcKeepMeSignedIn.value == true) {
		Ti.App.Properties.setBool('remember', true);
	} else {
		Ti.App.Properties.setBool('remember', false);
	}
}

// Set arguments and pass them to login() function
function btnLoginClicked() {
	if ($.txtUserName.value.length != 0 && $.txtPassword.value.length != 0) {
		$.activityIndicator.show();
		var hostIP = $.txtHostIP.value,
		    username = $.txtUserName.value,
		    password = $.txtPassword.value;

		if ($.swcKeepMeSignedIn.value == true) {
			LoginGlobal.saveLoginInformationToProperties(username, hostIP);
		}
		LoginGlobal.login(hostIP, username, password);
	} else {
		alert("Please enter a username and password.");
	}
}

// Disable the android physical back button on the login screen - catch event and do nothing
function loginBackButtonPressed() {
}

// Enable proper tab order between textFields
function nextField(e) {
	var data = JSON.stringify(e.source),
	    nextField = JSON.parse(data).nextTextBox;
	switch(nextField) {
	case "txtUserName":
		$.txtUserName.focus();
		break;
	case "txtPassword":
		$.txtPassword.focus();
		break;
	}
}

// This event is fired when the 'logout' menu item is clicked on other screens.  It resets the login page.
Ti.App.addEventListener('cleanUpAfterLogoutEvent', function() {
	LoginGlobal.logout();

	if (($.swcKeepMeSignedIn.value == true)) {
		Alloy.Globals.password = null;
		$.txtPassword.value = null;
		$.txtPassword.focus();
	} else {
		Alloy.Globals.hostIP = null;
		Alloy.Globals.username = null;
		Alloy.Globals.password = null;
		$.txtUserName.value = null;
		$.txtPassword.value = null;
		$.txtHostIP.focus();
	}
}); 