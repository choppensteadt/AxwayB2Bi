function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getCertificates(username) {
        $.activityIndicator.show();
        var KeyId = "bb7b2c65-b9e2-46d3-be51-c5ff2599dc6b";
        var url = "https://208.67.130.50:8065/api/csos/v1/certificate/certificate";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                var response = JSON.parse(this.responseText);
                var certificates = [];
                for (var i in response.certificates) {
                    var friendlyName = response.certificates[i].friendlyName;
                    var certExpiryDateUtcSeconds = response.certificates[i].endDate;
                    response.certificates[i].type;
                    response.certificates[i].subjectCommonName;
                    var dte = getNumberOfDaysUntilExpiration(certExpiryDateUtcSeconds);
                    var show = false;
                    var date = new Date(certExpiryDateUtcSeconds);
                    var certExpirationDate = date.toString();
                    var certDetails = "Expires: " + formatDate(certExpirationDate);
                    dte < Alloy.Globals.daysToExpire && dte > 0 && (show = true);
                    show = !(true != show && 0 != Alloy.Globals.daysToExpire);
                    true == show && certificates.push({
                        leftimage: {
                            image: "/images/cert.png"
                        },
                        certName: {
                            text: friendlyName
                        },
                        certDetails: {
                            text: certDetails
                        },
                        certDte: {
                            text: dte
                        },
                        template: "certDetailTemplate"
                    });
                }
                $.certListSection.setItems(certificates);
                $.activityIndicator.hide();
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 5e3
        });
        xhr.open("GET", url);
        xhr.setRequestHeader("KeyId", KeyId);
        xhr.send();
    }
    function notifyCertificateHolderOfPendingExpiry() {
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_SEND,
            type: "text/plain"
        });
        intent.putExtra(Ti.Android.EXTRA_EMAIL, [ "info@axway.com" ]);
        intent.putExtra(Ti.Android.EXTRA_BCC, [ "info@axway.com" ]);
        intent.putExtra(Ti.Android.EXTRA_SUBJECT, "Notice of Impending Certificate Expiry");
        intent.putExtra(Ti.Android.EXTRA_TEXT, "The public key certificate being used to decrypt your B2B messages and validate your digital signature is set to expire within " + Alloy.Globals.daysToExpire + " days. \n \n To avoid B2B processing delays, please visit us at https://www.axway.com/en/enterprise-solutions/ecosystem-engagement to update your certificate. \n \n Best regards, \n \n Axway B2B Support Team");
        try {
            Ti.Android.currentActivity.startActivity(intent);
        } catch (ex) {
            Ti.UI.createNotification({
                message: "No email applications installed"
            }).show();
        }
    }
    function getNumberOfDaysUntilExpiration(expirationDate) {
        var d = new Date();
        var n = d.getTime();
        var e = expirationDate;
        var mte = e - n;
        var dte = mte / 864e5;
        return dte;
    }
    function formatDate(dateVal) {
        var newDate = new Date(dateVal);
        var sMonth = padValue(newDate.getMonth() + 1);
        var sDay = padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        padValue(newDate.getMinutes());
        var sAMPM = "AM";
        var iHourCheck = parseInt(sHour);
        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        } else 0 === iHourCheck && (sHour = "12");
        sHour = padValue(sHour);
        return sMonth + "-" + sDay + "-" + sYear;
    }
    function padValue(value) {
        return 10 > value ? "0" + value : value;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "certificates";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.userprofile = Ti.UI.createWindow({
        backgroundColor: "#E9EAEA",
        id: "userprofile",
        title: "Axway B2Bi"
    });
    $.__views.userprofile && $.addTopLevelView($.__views.userprofile);
    $.__views.btnAddCert = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 10,
            right: 10,
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            color: "white",
            backgroundColor: "#407CA0",
            borderRadius: "5",
            font: {
                fontSize: 22,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 10,
            right: 10,
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            color: "white",
            backgroundColor: "#407CA0",
            borderRadius: "5",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            title: "Notify Cert Owners",
            id: "btnAddCert"
        });
        return o;
    }());
    $.__views.userprofile.add($.__views.btnAddCert);
    notifyCertificateHolderOfPendingExpiry ? $.addListener($.__views.btnAddCert, "click", notifyCertificateHolderOfPendingExpiry) : __defers["$.__views.btnAddCert!click!notifyCertificateHolderOfPendingExpiry"] = true;
    $.__views.lblCurrentCerts = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 80,
            height: Ti.UI.SIZE,
            width: "100%",
            backgroundColor: "#989998",
            color: "white",
            opacity: ".9",
            textAlign: "center",
            font: {
                fontSize: 22,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 80,
            height: Ti.UI.SIZE,
            width: "100%",
            backgroundColor: "#989998",
            color: "white",
            opacity: ".9",
            textAlign: "center",
            font: {
                fontSize: 16,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "Certificates",
            id: "lblCurrentCerts"
        });
        return o;
    }());
    $.__views.userprofile.add($.__views.lblCurrentCerts);
    var __alloyId0 = {};
    var __alloyId2 = [];
    var __alloyId3 = {
        type: "Ti.UI.ImageView",
        bindId: "leftimage",
        properties: function() {
            var o = {};
            Alloy.isTablet && Alloy.deepExtend(true, o, {
                left: 6,
                width: 48,
                height: 48
            });
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 6,
                width: 48,
                height: 48
            });
            Alloy.deepExtend(true, o, {
                bindId: "leftimage"
            });
            return o;
        }()
    };
    __alloyId2.push(__alloyId3);
    var __alloyId4 = {
        type: "Ti.UI.Label",
        bindId: "certName",
        properties: function() {
            var o = {};
            Alloy.isTablet && Alloy.deepExtend(true, o, {
                top: 10,
                left: 60,
                font: {
                    fontWeight: "bold",
                    fontSize: 22,
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 60,
                font: {
                    fontWeight: "bold",
                    fontSize: 22,
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "certName"
            });
            return o;
        }()
    };
    __alloyId2.push(__alloyId4);
    var __alloyId5 = {
        type: "Ti.UI.Label",
        bindId: "certDetails",
        properties: function() {
            var o = {};
            Alloy.isTablet && Alloy.deepExtend(true, o, {
                top: 40,
                left: 60,
                font: {
                    fontSize: 20,
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 60,
                font: {
                    fontSize: 20,
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "certDetails"
            });
            return o;
        }()
    };
    __alloyId2.push(__alloyId5);
    var __alloyId6 = {
        type: "Ti.UI.Label",
        bindId: "certDte",
        properties: {
            bindId: "certDte",
            visible: false
        }
    };
    __alloyId2.push(__alloyId6);
    var __alloyId7 = {
        type: "Ti.UI.ImageView",
        bindId: "notificationSentYesNo",
        properties: function() {
            var o = {};
            Alloy.isTablet && Alloy.deepExtend(true, o, {
                right: 6,
                width: 48,
                height: 48
            });
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                right: 6,
                width: 48,
                height: 48
            });
            Alloy.deepExtend(true, o, {
                bindId: "notificationSentYesNo"
            });
            return o;
        }()
    };
    __alloyId2.push(__alloyId7);
    var __alloyId1 = {
        properties: {
            height: 80,
            name: "certDetailTemplate"
        },
        childTemplates: __alloyId2
    };
    __alloyId0["certDetailTemplate"] = __alloyId1;
    var __alloyId9 = [];
    $.__views.certListItem = {
        properties: {
            id: "certListItem"
        }
    };
    __alloyId9.push($.__views.certListItem);
    $.__views.certListSection = Ti.UI.createListSection({
        id: "certListSection"
    });
    $.__views.certListSection.items = __alloyId9;
    var __alloyId10 = [];
    __alloyId10.push($.__views.certListSection);
    $.__views.lvwCertificates = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 100
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 100
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId10,
            templates: __alloyId0,
            id: "lvwCertificates",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.userprofile.add($.__views.lvwCertificates);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: "50%",
        left: "50%",
        style: Ti.UI.ActivityIndicatorStyle.BIG_DARK,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator"
    });
    $.__views.userprofile.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    if (0 != Alloy.Globals.daysToExpire) {
        $.lblCurrentCerts.text = "Certificates set to expire within " + Alloy.Globals.daysToExpire + " days";
        $.btnAddCert.visible = true;
    } else {
        $.lblCurrentCerts.text = "All Certificates";
        $.btnAddCert.visible = false;
    }
    getCertificates(Alloy.Globals.username);
    __defers["$.__views.btnAddCert!click!notifyCertificateHolderOfPendingExpiry"] && $.addListener($.__views.btnAddCert, "click", notifyCertificateHolderOfPendingExpiry);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;