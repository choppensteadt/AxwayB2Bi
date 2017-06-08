var args = $.args;

if (Alloy.Globals.daysToExpire != 0){
	$.lblCurrentCerts.text = "Certificates set to expire within "+Alloy.Globals.daysToExpire+" days";
	$.btnAddCert.visible = true;
} else {
	$.lblCurrentCerts.text = "All Certificates";
	$.btnAddCert.visible = false;
}

var certificates = [];

getCertificates(Alloy.Globals.username);

function getCertificates(username) {

	$.activityIndicator.show();

	// This section must be configured to work with an Arrow instance that is pointed at the B2Bi host
	// The Arrow instance must be configured to expose the certificate API project - this project is also available for free on the Axway MarketPlace
	// Once the Arrow project is implemented, an App KeyId must be generated and pasted in the line just below.
	// The URL below is the Arrow server IP, port, and path to the API which gets certificates
	
	var KeyId = "bb7b2c65-b9e2-46d3-be51-c5ff2599dc6b";
	var url = "https://208.67.130.50:8065/api/csos/v1/certificate/certificate";

	var xhr = Ti.Network.createHTTPClient({
	    
	    onload: function(e) {
	    	
			var response = JSON.parse(this.responseText);
			var certificates = [];
						
			for(var i in response.certificates){
				
				var friendlyName = response.certificates[i].friendlyName;
				var certExpiryDateUtcSeconds = response.certificates[i].endDate;
				var certType = response.certificates[i].type;
				var subjectCommonName = response.certificates[i].subjectCommonName;
				var dte = getNumberOfDaysUntilExpiration(certExpiryDateUtcSeconds);
				var show = false;

				// Format expiration date for display (Wed Jan 12 2011 12:42:46 GMT-0800 (PST))
				var date = new Date(certExpiryDateUtcSeconds);
				var certExpirationDate = date.toString(); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)
				
				var certDetails = "Expires: "+formatDate(certExpirationDate);
				
				// See whether the certificate's number of days to expire (dte) is less that the selected 
				// range argument (Alloy.Globals.daysToExpire) and greater than zero
				if(dte < Alloy.Globals.daysToExpire && dte > 0){
					show = true;
				}
				
				if (show == true || Alloy.Globals.daysToExpire == 0){
					show = true;
				} else {
					show = false;
				}
				
				// If the row meets the criteria, then show it.
				if (show == true){
					certificates.push({
						leftimage:{image:"/images/cert.png"},
						certName:{text:friendlyName},
						certDetails:{text:certDetails},
						certDte:{text:dte},
						
						// Future funtionality to show whether a notification has already been sent or not
						// notificationSentYesNo:{image:"/images/notification.png"},

						template:'certDetailTemplate'}
					);
				}
			}
						
			$.certListSection.setItems(certificates);
			$.activityIndicator.hide();
			
		},
	    onerror: function(e) {
			$.activityIndicator.hide();
            alert(e.error);
	        return false;
	    },
	    timeout:5000  /* in milliseconds */
	});
	
	xhr.open("GET", url);
	xhr.setRequestHeader('KeyId',KeyId);
	xhr.send();
}

function openCertificateDetail(e){
	var certdetails = Alloy.createController('certdetails', args).getView();
	$.activityIndicator.hide();
	certdetails.open();	
}

function notifyCertificateHolderOfPendingExpiry() {
	var intent = Ti.Android.createIntent({
		action: Ti.Android.ACTION_SEND,
		type: 'text/plain'
	});
	intent.putExtra(Ti.Android.EXTRA_EMAIL,['info@axway.com']);
	intent.putExtra(Ti.Android.EXTRA_BCC,['info@axway.com']);
	intent.putExtra(Ti.Android.EXTRA_SUBJECT,'Notice of Impending Certificate Expiry');
	intent.putExtra(Ti.Android.EXTRA_TEXT,'The public key certificate being used to decrypt your B2B messages and validate your digital signature is set to expire within '+Alloy.Globals.daysToExpire+' days. \n \n To avoid B2B processing delays, please visit us at https://www.axway.com/en/enterprise-solutions/ecosystem-engagement to update your certificate. \n \n Best regards, \n \n Axway B2B Support Team');

	try {
		Ti.Android.currentActivity.startActivity(intent);
	} catch (ex){
		Ti.UI.createNotification({message: 'No email applications installed'}).show();
	}
}

function mnuLogoutClicked() {
	var rememberMeFromProperties = Ti.App.Properties.getBool('remember'); 
	Ti.App.fireEvent('cleanUpAfterLogoutEvent');
	Alloy.createController('login').getView().open();
}

function getNumberOfDaysUntilExpiration(expirationDate){
	var d = new Date();
	var n = d.getTime();
	var e = expirationDate;
	var mte = e - n;
	var dte = (mte/86400000);
	return dte;
}

function formatDate(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = padValue(newDate.getMonth() + 1);
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = padValue(newDate.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }

    sHour = padValue(sHour);

    return sMonth + "-" + sDay + "-" + sYear;
}

function padValue(value) {
    return (value < 10) ? "0" + value : value;
}

/* Future funtionality to select specific rows for notification
function checkToSeeWhetherAnyCertificatesAreSelected(e){
	
	// alert(e.itemIndex+" "+$.certListSection.getItems().length);

	var ialorc = isAtLeastOneRowSelected();
	
	// alert(ialorc);
	
	if(ialorc){
		alert("enableNotificationButton");
	} else {
		alert("disableNotificationButton");
	}
}
function isAtLeastOneRowSelected(){
	
	var YN = false;
	
	for (var i = 0; i < $.certListSection.getItems().length; i++) {
		var item = $.certListSection.getItemAt(i);
        // alert(item.certificateSelectedYesNo);
    }

	return YN;
}
*/