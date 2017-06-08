function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getCommunityPartners() {
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/" + Alloy.Globals.communityId + "/subscriptions?limit=50&offset=0";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var count = response.count;
                $.lblNumberOfTradingPartners.text = count;
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getCommunityContacts() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwContacts.show();
        $.ivGetCommunityContacts.borderColor = "black";
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/" + Alloy.Globals.communityId + "/contacts";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var table = [];
                for (var i in response.results) {
                    var id = "@id";
                    var contactId = response.results[i][id];
                    var name = response.results[i].name;
                    var phone = response.results[i].phone;
                    var email = response.results[i].email;
                    var primaryYN = response.results[i].primary;
                    if (true == primaryYN) {
                        var primaryImage = "/images/default-icon.png";
                        Alloy.Globals.primaryContactEmail = email;
                    } else var primaryImage = "";
                    table.push({
                        properties: {
                            searchableText: name,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        contactId: {
                            text: contactId
                        },
                        contactLeftImage: {
                            image: "/images/contact.png"
                        },
                        contactName: {
                            text: name
                        },
                        contactPhone: {
                            text: phone
                        },
                        contactEmail: {
                            text: email
                        },
                        primaryRightImage: {
                            image: primaryImage
                        },
                        template: "contactDetailTemplate"
                    });
                }
                $.contactListSection.setItems(table);
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getCommunityCertificates() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwCertificates.show();
        $.ivGetCommunityCertificates.borderColor = "black";
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/security/" + Alloy.Globals.communityId + "/certificate/private";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var table = [];
                for (var i in response.results) {
                    var name = response.results[i].friendlyName;
                    var state = response.results[i].certificateState;
                    var usage = response.results[i].certificateUsage;
                    var expirationDate = response.results[i].validTo;
                    var formattedExpirationDate = new Date(expirationDate).toLocaleDateString();
                    var ed = new Date(expirationDate).getTime();
                    var dte = getNumberOfDaysUntilExpiration(ed);
                    if (31 > dte && dte > -1 && "OPERATIONAL" == state) var expire = "/images/alert.png"; else var expire = "";
                    table.push({
                        properties: {
                            searchableText: name,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        certificateLeftImage: {
                            image: "/images/certificate.png"
                        },
                        certName: {
                            text: name
                        },
                        certState: {
                            text: state
                        },
                        certUsage: {
                            text: usage
                        },
                        certExpirationDate: {
                            text: formattedExpirationDate
                        },
                        certificateRightImage: {
                            image: expire
                        },
                        template: "certDetailTemplate"
                    });
                }
                $.certListSection.setItems(table);
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getCommunityRoutingIds() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwRoutingIds.show();
        $.ivGetCommunityRoutingIds.borderColor = "black";
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/" + Alloy.Globals.communityId + "/routingIds";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var table = [];
                for (var i in response.results) {
                    var id = "@id";
                    var routingIdId = response.results[i][id];
                    var routingId = response.results[i].routingId;
                    if (routingIdId == Alloy.Globals.defaultRoutingIdId) var routingIdImage = "/images/default-icon.png"; else var routingIdImage = "";
                    table.push({
                        properties: {
                            searchableText: routingId,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        routingIdLeftImage: {
                            image: "/images/pickup.png"
                        },
                        routingIdId: {
                            text: routingId
                        },
                        routingId: {
                            text: routingId
                        },
                        routingIdRightImage: {
                            image: routingIdImage
                        },
                        template: "routingIdDetailTemplate"
                    });
                }
                $.routingIdListSection.setItems(table);
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getApplicationDeliveries() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwAppDeliveries.show();
        $.ivGetApplicationDeliveries.borderColor = "black";
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/application/exchange/delivery?limit=100&offset=0&orderBy=name";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var appDeliveries = [];
                for (var i in response.results) {
                    var id = "@id";
                    var tp = "@class";
                    var appDeliveryId = response.results[i][id];
                    var name = response.results[i].friendlyName;
                    var protocol = response.results[i].businessProtocol;
                    var transport = response.results[i][tp];
                    var url = response.results[i].url;
                    appDeliveries.push({
                        properties: {
                            searchableText: name,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        appDeliveryLeftImage: {
                            image: "/images/pickup.png"
                        },
                        appDeliveryId: {
                            text: appDeliveryId
                        },
                        appDeliveryName: {
                            text: name
                        },
                        appDeliveryProtocol: {
                            text: protocol
                        },
                        appDeliveryTransport: {
                            text: transport
                        },
                        appDeliveryUrl: {
                            text: url
                        },
                        template: "appDeliveryTemplate"
                    });
                }
                $.appDeliveryListSection.setItems(appDeliveries);
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getApplicationPickups() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwAppPickups.show();
        $.ivGetApplicationPickups.borderColor = "black";
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/application/exchange/pickup?limit=100&offset=0&orderBy=name";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var appPickups = [];
                for (var i in response.results) {
                    var id = "@id";
                    var tp = "@class";
                    var appPickupId = response.results[i][id];
                    var name = response.results[i].friendlyName;
                    var protocol = response.results[i].businessProtocol;
                    var transport = response.results[i][tp];
                    var url = response.results[i].url;
                    appPickups.push({
                        properties: {
                            searchableText: name,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        appPickupLeftImage: {
                            image: "/images/pickup.png"
                        },
                        appPickupId: {
                            text: appPickupId
                        },
                        appPickupName: {
                            text: name
                        },
                        appPickupProtocol: {
                            text: protocol
                        },
                        appPickupTransport: {
                            text: transport
                        },
                        appPickupUrl: {
                            text: url
                        },
                        template: "appPickupTemplate"
                    });
                }
                $.appPickupListSection.setItems(appPickups);
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getCommunityTradingPickups() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwTradingPickups.show();
        $.ivGetCommunityTradingPickups.borderColor = "black";
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/exchange/" + Alloy.Globals.communityId + "/trading/pickup";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var pickups = [];
                for (var i in response.results) {
                    var id = "@id";
                    var pickupId = response.results[i][id];
                    var name = response.results[i].friendlyName;
                    var protocol = response.results[i].businessProtocol;
                    var url = response.results[i].url;
                    pickups.push({
                        properties: {
                            searchableText: name,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        tradingPickupLeftImage: {
                            image: "/images/pickup.png"
                        },
                        tradingPickupId: {
                            text: pickupId
                        },
                        tradingPickupName: {
                            text: name
                        },
                        tradingPickupProtocol: {
                            text: protocol
                        },
                        tradingPickupUrl: {
                            text: url
                        },
                        template: "tradingPickupTemplate"
                    });
                }
                $.tradingPickupListSection.setItems(pickups);
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getCommunityTradingPartners() {
        hideAllTabs();
        hideAllBorderColors();
        $.lvwTradingPartners.show();
        $.ivGetCommunityTradingPartners.borderColor = "black";
        getCommunityPartners();
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/" + Alloy.Globals.communityId + "/subscriptions?limit=50&offset=0";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var tradingPartners = [];
                for (var i = 0; i < response.results.length; i++) if (response.results.length > 0) {
                    var tradingPartnerIdString = response.results[i];
                    var tradingPartnerId = tradingPartnerIdString.slice(20);
                    var url2 = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/tradingPartners/" + tradingPartnerId;
                    var xhr2 = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            var tradingPartnerDetailResponse = JSON.parse(this.responseText);
                            var tradingPartnerName = tradingPartnerDetailResponse.partyName;
                            var primaryContactName = tradingPartnerDetailResponse.primaryContact.name;
                            var primaryContactEmail = tradingPartnerDetailResponse.primaryContact.email;
                            var tradingPartnerDefaultRoutingId = tradingPartnerDetailResponse.defaultRoutingId.routingId;
                            tradingPartners.push({
                                properties: {
                                    searchableText: tradingPartnerName,
                                    backgroundColor: "transparent",
                                    selectedBackgroundColor: "#CCC"
                                },
                                tradingPartnerLeftImage: {
                                    image: "/images/partner.png"
                                },
                                tradingPartnerId: {
                                    text: tradingPartnerId
                                },
                                tradingPartnerName: {
                                    text: tradingPartnerName
                                },
                                tradingPartnerPrimaryContactName: {
                                    text: primaryContactName
                                },
                                tradingPartnerPrimaryContactEmail: {
                                    text: primaryContactEmail
                                },
                                tradingPartnerDefaultRoutingId: {
                                    text: tradingPartnerDefaultRoutingId
                                },
                                template: "tradingPartnerDetailTemplate"
                            });
                            $.tradingPartnerListSection.setItems(tradingPartners);
                            $.activityIndicator.hide();
                        },
                        onerror: function(e) {
                            $.activityIndicator.hide();
                            alert(e.error);
                            return false;
                        },
                        timeout: 1e4
                    });
                    xhr2.open("GET", url2);
                    xhr2.send();
                } else $.activityIndicator.hide();
                $.activityIndicator.hide();
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function getCommunity(communityId) {
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/" + communityId;
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var communityName = response.partyName;
                response.subscribedPartners;
                var primaryContact = response.primaryContact.name;
                var primaryContactEmail = response.primaryContact.email;
                var defaultRoutingId = response.defaultRoutingId.routingId;
                var communityNameAndDefaultRoutingId = communityName;
                var communityInformation = primaryContact + ", " + primaryContactEmail + ", " + defaultRoutingId;
                $.lblAppDescription.text = communityNameAndDefaultRoutingId;
                $.lblCommunityInformation.text = communityInformation;
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function openContactDetail(e) {
        var contact = $.contactListSection.getItemAt(e.itemIndex);
        var contactId = contact.contactId.text;
        var args = {
            mode: "view",
            contactId: contactId,
            communityId: Alloy.Globals.communityId
        };
        var contact = Alloy.createController("contact", args).getView();
        contact.open();
    }
    function addContact() {
        var args = {
            mode: "new",
            contactId: "",
            communityId: Alloy.Globals.communityId
        };
        var contact = Alloy.createController("contact", args).getView();
        contact.open();
    }
    function alertNotifyOfPendingYN(e) {
        var certificate = $.certListSection.getItemAt(e.itemIndex);
        var certificateAlert = certificate.certificateRightImage.image;
        if ("/images/alert.png" == certificateAlert) {
            var dialog = Ti.UI.createAlertDialog({
                title: L("notification_dialog_title"),
                message: L("notification_dialog_message"),
                buttonNames: [ L("notification_dialog_send"), L("notification_dialog_cancel") ],
                send: 1,
                cancel: 2
            });
            dialog.addEventListener("click", function(e) {
                if (1 === e.index) ; else if (0 === e.index) {
                    var emailDialog = Ti.UI.createEmailDialog();
                    emailDialog.toRecipients = [ Alloy.Globals.primaryContactEmail ];
                    emailDialog.subject = L("notification_email_dialog_subject");
                    emailDialog.messageBody = L("notification_email_dialog_body");
                    emailDialog.open();
                }
            });
            dialog.show();
        }
    }
    function hideAllTabs() {
        $.lvwAppDeliveries.hide();
        $.lvwAppPickups.hide();
        $.lvwTradingPickups.hide();
        $.lvwTradingPartners.hide();
        $.lvwContacts.hide();
        $.lvwRoutingIds.hide();
        $.lvwCertificates.hide();
        return true;
    }
    function hideAllBorderColors() {
        $.ivGetCommunityContacts.borderColor = "white";
        $.ivGetCommunityCertificates.borderColor = "white";
        $.ivGetCommunityRoutingIds.borderColor = "white";
        $.ivGetApplicationDeliveries.borderColor = "white";
        $.ivGetApplicationPickups.borderColor = "white";
        $.ivGetCommunityTradingPickups.borderColor = "white";
        $.ivGetCommunityTradingPartners.borderColor = "white";
        return true;
    }
    function getNumberOfDaysUntilExpiration(expirationDate) {
        var d = new Date();
        var n = d.getTime();
        var e = expirationDate;
        var mte = e - n;
        var dte = mte / 864e5;
        return dte;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "communityDetail";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.communityDetail = Ti.UI.createWindow({
        id: "communityDetail",
        layout: "vertical",
        backgroundColor: "white",
        title: "Community Detail"
    });
    $.__views.communityDetail && $.addTopLevelView($.__views.communityDetail);
    $.__views.svScrollView = Ti.UI.createScrollView({
        id: "svScrollView",
        scrollType: "vertical",
        scrollingEnabled: true
    });
    $.__views.communityDetail.add($.__views.svScrollView);
    $.__views.lblAppDescription = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 20,
            left: 10,
            font: {
                fontSize: 24
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblAppDescription"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblAppDescription);
    $.__views.lblCommunityInformation = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 50,
            left: 10,
            font: {
                fontSize: 14
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblCommunityInformation"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblCommunityInformation);
    $.__views.ivGetCommunityContacts = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "80",
            left: 15,
            height: Ti.UI.SIZE,
            width: "85",
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetCommunityContacts",
            image: "/images/navContact.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetCommunityContacts);
    getCommunityContacts ? $.addListener($.__views.ivGetCommunityContacts, "click", getCommunityContacts) : __defers["$.__views.ivGetCommunityContacts!click!getCommunityContacts"] = true;
    $.__views.ivGetCommunityCertificates = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "120",
            left: 15,
            width: "85",
            height: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetCommunityCertificates",
            image: "/images/navCertificates.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetCommunityCertificates);
    getCommunityCertificates ? $.addListener($.__views.ivGetCommunityCertificates, "click", getCommunityCertificates) : __defers["$.__views.ivGetCommunityCertificates!click!getCommunityCertificates"] = true;
    $.__views.ivGetCommunityRoutingIds = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 160,
            left: 15,
            width: "85",
            height: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetCommunityRoutingIds",
            image: "/images/navRoutingIds.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetCommunityRoutingIds);
    getCommunityRoutingIds ? $.addListener($.__views.ivGetCommunityRoutingIds, "click", getCommunityRoutingIds) : __defers["$.__views.ivGetCommunityRoutingIds!click!getCommunityRoutingIds"] = true;
    $.__views.ivGetApplicationDeliveries = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 80,
            left: 110,
            height: 50,
            width: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetApplicationDeliveries",
            image: "/images/navApplicationDelivery.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetApplicationDeliveries);
    getApplicationDeliveries ? $.addListener($.__views.ivGetApplicationDeliveries, "click", getApplicationDeliveries) : __defers["$.__views.ivGetApplicationDeliveries!click!getApplicationDeliveries"] = true;
    $.__views.ivGetApplicationPickups = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 140,
            left: 110,
            height: 50,
            width: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetApplicationPickups",
            image: "/images/navApplicationPickup.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetApplicationPickups);
    getApplicationPickups ? $.addListener($.__views.ivGetApplicationPickups, "click", getApplicationPickups) : __defers["$.__views.ivGetApplicationPickups!click!getApplicationPickups"] = true;
    $.__views.ivGetCommunityTradingPickups = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 80,
            left: 175,
            height: 50,
            width: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetCommunityTradingPickups",
            image: "/images/navTradingPickup.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetCommunityTradingPickups);
    getCommunityTradingPickups ? $.addListener($.__views.ivGetCommunityTradingPickups, "click", getCommunityTradingPickups) : __defers["$.__views.ivGetCommunityTradingPickups!click!getCommunityTradingPickups"] = true;
    $.__views.ivArrowRight = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 150,
            left: 185,
            height: 15,
            width: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivArrowRight",
            image: "/images/navArrowGrayRight.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivArrowRight);
    $.__views.ivCloud = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 80,
            left: 230,
            height: 120,
            width: Ti.UI.SIZE
        });
        Alloy.deepExtend(true, o, {
            id: "ivCloud",
            image: "/images/navInternet.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivCloud);
    $.__views.ivGetCommunityTradingPartners = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 110,
            left: 280,
            height: 50,
            width: Ti.UI.SIZE,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "ivGetCommunityTradingPartners",
            image: "/images/navTradingPartners.gif"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.ivGetCommunityTradingPartners);
    getCommunityTradingPartners ? $.addListener($.__views.ivGetCommunityTradingPartners, "click", getCommunityTradingPartners) : __defers["$.__views.ivGetCommunityTradingPartners!click!getCommunityTradingPartners"] = true;
    $.__views.lblNumberOfTradingPartners = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 160,
            left: 314,
            font: {
                fontSize: 14
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblNumberOfTradingPartners"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblNumberOfTradingPartners);
    $.__views.addContact = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            color: "#3d4051",
            left: 50,
            font: {
                fontSize: 16,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "addContact",
            text: L("add_contact")
        });
        return o;
    }());
    addContact ? $.addListener($.__views.addContact, "click", addContact) : __defers["$.__views.addContact!click!addContact"] = true;
    var __alloyId24 = {};
    var __alloyId26 = [];
    var __alloyId27 = {
        type: "Ti.UI.Label",
        bindId: "contactId",
        properties: {
            bindId: "contactId",
            visible: false
        }
    };
    __alloyId26.push(__alloyId27);
    var __alloyId28 = {
        type: "Ti.UI.ImageView",
        bindId: "contactLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "contactLeftImage"
            });
            return o;
        }()
    };
    __alloyId26.push(__alloyId28);
    var __alloyId29 = {
        type: "Ti.UI.Label",
        bindId: "contactName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 50,
                font: {
                    fontSize: 18,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "contactName"
            });
            return o;
        }()
    };
    __alloyId26.push(__alloyId29);
    var __alloyId30 = {
        type: "Ti.UI.Label",
        bindId: "contactEmail",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 30,
                left: 50,
                font: {
                    fontSize: 12,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "contactEmail"
            });
            return o;
        }()
    };
    __alloyId26.push(__alloyId30);
    var __alloyId31 = {
        type: "Ti.UI.Label",
        bindId: "contactPhone",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 30,
                left: 230,
                font: {
                    fontSize: 12,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "contactPhone"
            });
            return o;
        }()
    };
    __alloyId26.push(__alloyId31);
    var __alloyId32 = {
        type: "Ti.UI.ImageView",
        bindId: "primaryRightImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                right: 10,
                width: 20,
                height: 20
            });
            Alloy.deepExtend(true, o, {
                bindId: "primaryRightImage"
            });
            return o;
        }()
    };
    __alloyId26.push(__alloyId32);
    var __alloyId25 = {
        properties: {
            height: 80,
            name: "contactDetailTemplate"
        },
        childTemplates: __alloyId26
    };
    __alloyId24["contactDetailTemplate"] = __alloyId25;
    var __alloyId34 = [];
    $.__views.contactListItem = {
        properties: {
            id: "contactListItem",
            height: 20
        }
    };
    __alloyId34.push($.__views.contactListItem);
    $.__views.contactListSection = Ti.UI.createListSection({
        id: "contactListSection"
    });
    $.__views.contactListSection.items = __alloyId34;
    var __alloyId35 = [];
    __alloyId35.push($.__views.contactListSection);
    $.__views.lvwContacts = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId35,
            templates: __alloyId24,
            footerView: $.__views.addContact,
            id: "lvwContacts",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwContacts);
    openContactDetail ? $.addListener($.__views.lvwContacts, "itemclick", openContactDetail) : __defers["$.__views.lvwContacts!itemclick!openContactDetail"] = true;
    var __alloyId36 = {};
    var __alloyId38 = [];
    var __alloyId39 = {
        type: "Ti.UI.ImageView",
        bindId: "certificateLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "certificateLeftImage"
            });
            return o;
        }()
    };
    __alloyId38.push(__alloyId39);
    var __alloyId40 = {
        type: "Ti.UI.Label",
        bindId: "certName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 50,
                font: {
                    fontSize: 16,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "certName"
            });
            return o;
        }()
    };
    __alloyId38.push(__alloyId40);
    var __alloyId41 = {
        type: "Ti.UI.Label",
        bindId: "certState",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 30,
                left: 50,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "certState"
            });
            return o;
        }()
    };
    __alloyId38.push(__alloyId41);
    var __alloyId42 = {
        type: "Ti.UI.Label",
        bindId: "certUsage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 30,
                left: 200,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "certUsage"
            });
            return o;
        }()
    };
    __alloyId38.push(__alloyId42);
    var __alloyId43 = {
        type: "Ti.UI.Label",
        bindId: "certExpirationDate",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 30,
                left: 300,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "certExpirationDate"
            });
            return o;
        }()
    };
    __alloyId38.push(__alloyId43);
    var __alloyId44 = {
        type: "Ti.UI.ImageView",
        bindId: "certificateRightImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                right: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "certificateRightImage"
            });
            return o;
        }()
    };
    __alloyId38.push(__alloyId44);
    var __alloyId37 = {
        properties: {
            height: 80,
            name: "certDetailTemplate"
        },
        childTemplates: __alloyId38
    };
    __alloyId36["certDetailTemplate"] = __alloyId37;
    var __alloyId46 = [];
    $.__views.certListItem = {
        properties: {
            id: "certListItem"
        }
    };
    __alloyId46.push($.__views.certListItem);
    $.__views.certListSection = Ti.UI.createListSection({
        id: "certListSection"
    });
    $.__views.certListSection.items = __alloyId46;
    var __alloyId47 = [];
    __alloyId47.push($.__views.certListSection);
    $.__views.lvwCertificates = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId47,
            templates: __alloyId36,
            id: "lvwCertificates",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwCertificates);
    alertNotifyOfPendingYN ? $.addListener($.__views.lvwCertificates, "itemclick", alertNotifyOfPendingYN) : __defers["$.__views.lvwCertificates!itemclick!alertNotifyOfPendingYN"] = true;
    var __alloyId48 = {};
    var __alloyId50 = [];
    var __alloyId51 = {
        type: "Ti.UI.Label",
        bindId: "routingIdId",
        properties: {
            bindId: "routingIdId",
            visible: false
        }
    };
    __alloyId50.push(__alloyId51);
    var __alloyId52 = {
        type: "Ti.UI.ImageView",
        bindId: "routingIdLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "routingIdLeftImage"
            });
            return o;
        }()
    };
    __alloyId50.push(__alloyId52);
    var __alloyId53 = {
        type: "Ti.UI.Label",
        bindId: "routingId",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 25,
                left: 50,
                font: {
                    color: "#407CA0",
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "routingId"
            });
            return o;
        }()
    };
    __alloyId50.push(__alloyId53);
    var __alloyId54 = {
        type: "Ti.UI.ImageView",
        bindId: "routingIdRightImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                right: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "routingIdRightImage"
            });
            return o;
        }()
    };
    __alloyId50.push(__alloyId54);
    var __alloyId49 = {
        properties: {
            height: 80,
            name: "routingIdDetailTemplate"
        },
        childTemplates: __alloyId50
    };
    __alloyId48["routingIdDetailTemplate"] = __alloyId49;
    var __alloyId56 = [];
    $.__views.routingIdListItem = {
        properties: {
            id: "routingIdListItem"
        }
    };
    __alloyId56.push($.__views.routingIdListItem);
    $.__views.routingIdListSection = Ti.UI.createListSection({
        id: "routingIdListSection"
    });
    $.__views.routingIdListSection.items = __alloyId56;
    var __alloyId57 = [];
    __alloyId57.push($.__views.routingIdListSection);
    $.__views.lvwRoutingIds = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId57,
            templates: __alloyId48,
            id: "lvwRoutingIds",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwRoutingIds);
    var __alloyId58 = {};
    var __alloyId60 = [];
    var __alloyId61 = {
        type: "Ti.UI.ImageView",
        bindId: "appDeliveryLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "appDeliveryLeftImage"
            });
            return o;
        }()
    };
    __alloyId60.push(__alloyId61);
    var __alloyId62 = {
        type: "Ti.UI.Label",
        bindId: "appDeliveryId",
        properties: {
            bindId: "appDeliveryId",
            visible: false
        }
    };
    __alloyId60.push(__alloyId62);
    var __alloyId63 = {
        type: "Ti.UI.Label",
        bindId: "appDeliveryName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 50,
                font: {
                    fontSize: 16,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appDeliveryName"
            });
            return o;
        }()
    };
    __alloyId60.push(__alloyId63);
    var __alloyId64 = {
        type: "Ti.UI.Label",
        bindId: "appDeliveryProtocol",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 50,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appDeliveryProtocol"
            });
            return o;
        }()
    };
    __alloyId60.push(__alloyId64);
    var __alloyId65 = {
        type: "Ti.UI.Label",
        bindId: "appDeliveryTransport",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 140,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appDeliveryTransport"
            });
            return o;
        }()
    };
    __alloyId60.push(__alloyId65);
    var __alloyId66 = {
        type: "Ti.UI.Label",
        bindId: "appDeliveryUrl",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 300,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appDeliveryUrl",
                visible: false
            });
            return o;
        }()
    };
    __alloyId60.push(__alloyId66);
    var __alloyId59 = {
        properties: {
            height: 80,
            name: "appDeliveryTemplate"
        },
        childTemplates: __alloyId60
    };
    __alloyId58["appDeliveryTemplate"] = __alloyId59;
    var __alloyId68 = [];
    $.__views.appDeliveryListItem = {
        properties: {
            id: "appDeliveryListItem"
        }
    };
    __alloyId68.push($.__views.appDeliveryListItem);
    $.__views.appDeliveryListSection = Ti.UI.createListSection({
        id: "appDeliveryListSection"
    });
    $.__views.appDeliveryListSection.items = __alloyId68;
    var __alloyId69 = [];
    __alloyId69.push($.__views.appDeliveryListSection);
    $.__views.lvwAppDeliveries = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId69,
            templates: __alloyId58,
            id: "lvwAppDeliveries",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwAppDeliveries);
    var __alloyId70 = {};
    var __alloyId72 = [];
    var __alloyId73 = {
        type: "Ti.UI.ImageView",
        bindId: "appPickupLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "appPickupLeftImage"
            });
            return o;
        }()
    };
    __alloyId72.push(__alloyId73);
    var __alloyId74 = {
        type: "Ti.UI.Label",
        bindId: "appPickupId",
        properties: {
            bindId: "appPickupId",
            visible: false
        }
    };
    __alloyId72.push(__alloyId74);
    var __alloyId75 = {
        type: "Ti.UI.Label",
        bindId: "appPickupName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 50,
                font: {
                    fontSize: 16,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appPickupName"
            });
            return o;
        }()
    };
    __alloyId72.push(__alloyId75);
    var __alloyId76 = {
        type: "Ti.UI.Label",
        bindId: "appPickupProtocol",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 50,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appPickupProtocol",
                visible: false
            });
            return o;
        }()
    };
    __alloyId72.push(__alloyId76);
    var __alloyId77 = {
        type: "Ti.UI.Label",
        bindId: "appPickupTransport",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 50,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appPickupTransport"
            });
            return o;
        }()
    };
    __alloyId72.push(__alloyId77);
    var __alloyId78 = {
        type: "Ti.UI.Label",
        bindId: "appPickupUrl",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 300,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "appPickupUrl",
                visible: false
            });
            return o;
        }()
    };
    __alloyId72.push(__alloyId78);
    var __alloyId71 = {
        properties: {
            height: 80,
            name: "appPickupTemplate"
        },
        childTemplates: __alloyId72
    };
    __alloyId70["appPickupTemplate"] = __alloyId71;
    var __alloyId80 = [];
    $.__views.appPickupListItem = {
        properties: {
            id: "appPickupListItem"
        }
    };
    __alloyId80.push($.__views.appPickupListItem);
    $.__views.appPickupListSection = Ti.UI.createListSection({
        id: "appPickupListSection"
    });
    $.__views.appPickupListSection.items = __alloyId80;
    var __alloyId81 = [];
    __alloyId81.push($.__views.appPickupListSection);
    $.__views.lvwAppPickups = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId81,
            templates: __alloyId70,
            id: "lvwAppPickups",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwAppPickups);
    var __alloyId82 = {};
    var __alloyId84 = [];
    var __alloyId85 = {
        type: "Ti.UI.ImageView",
        bindId: "tradingPickupLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPickupLeftImage"
            });
            return o;
        }()
    };
    __alloyId84.push(__alloyId85);
    var __alloyId86 = {
        type: "Ti.UI.Label",
        bindId: "tradingPickupId",
        properties: {
            bindId: "tradingPickupId",
            visible: false
        }
    };
    __alloyId84.push(__alloyId86);
    var __alloyId87 = {
        type: "Ti.UI.Label",
        bindId: "tradingPickupName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 50,
                font: {
                    fontSize: 16,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPickupName"
            });
            return o;
        }()
    };
    __alloyId84.push(__alloyId87);
    var __alloyId88 = {
        type: "Ti.UI.Label",
        bindId: "tradingPickupProtocol",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 50,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPickupProtocol"
            });
            return o;
        }()
    };
    __alloyId84.push(__alloyId88);
    var __alloyId89 = {
        type: "Ti.UI.Label",
        bindId: "tradingPickupUrl",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 140,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPickupUrl"
            });
            return o;
        }()
    };
    __alloyId84.push(__alloyId89);
    var __alloyId83 = {
        properties: {
            height: 80,
            name: "tradingPickupTemplate"
        },
        childTemplates: __alloyId84
    };
    __alloyId82["tradingPickupTemplate"] = __alloyId83;
    var __alloyId91 = [];
    $.__views.tradingPickupListItem = {
        properties: {
            id: "tradingPickupListItem"
        }
    };
    __alloyId91.push($.__views.tradingPickupListItem);
    $.__views.tradingPickupListSection = Ti.UI.createListSection({
        id: "tradingPickupListSection"
    });
    $.__views.tradingPickupListSection.items = __alloyId91;
    var __alloyId92 = [];
    __alloyId92.push($.__views.tradingPickupListSection);
    $.__views.lvwTradingPickups = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId92,
            templates: __alloyId82,
            id: "lvwTradingPickups",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwTradingPickups);
    var __alloyId93 = {};
    var __alloyId95 = [];
    var __alloyId96 = {
        type: "Ti.UI.ImageView",
        bindId: "tradingPartnerLeftImage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 10,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPartnerLeftImage"
            });
            return o;
        }()
    };
    __alloyId95.push(__alloyId96);
    var __alloyId97 = {
        type: "Ti.UI.Label",
        bindId: "tradingPartnerId",
        properties: {
            bindId: "tradingPartnerId",
            visible: false
        }
    };
    __alloyId95.push(__alloyId97);
    var __alloyId98 = {
        type: "Ti.UI.Label",
        bindId: "tradingPartnerName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 10,
                left: 50,
                font: {
                    fontSize: 16,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPartnerName"
            });
            return o;
        }()
    };
    __alloyId95.push(__alloyId98);
    var __alloyId99 = {
        type: "Ti.UI.Label",
        bindId: "tradingPartnerPrimaryContactName",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 50,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPartnerPrimaryContactName"
            });
            return o;
        }()
    };
    __alloyId95.push(__alloyId99);
    var __alloyId100 = {
        type: "Ti.UI.Label",
        bindId: "tradingPartnerPrimaryContactEmail",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 200,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPartnerPrimaryContactEmail"
            });
            return o;
        }()
    };
    __alloyId95.push(__alloyId100);
    var __alloyId101 = {
        type: "Ti.UI.Label",
        bindId: "tradingPartnerDefaultRoutingId",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 390,
                font: {
                    fontSize: 14,
                    fontColor: "#407CA0",
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "tradingPartnerDefaultRoutingId"
            });
            return o;
        }()
    };
    __alloyId95.push(__alloyId101);
    var __alloyId94 = {
        properties: {
            height: 80,
            name: "tradingPartnerDetailTemplate"
        },
        childTemplates: __alloyId95
    };
    __alloyId93["tradingPartnerDetailTemplate"] = __alloyId94;
    var __alloyId103 = [];
    $.__views.tradingPartnerListItem = {
        properties: {
            id: "tradingPartnerListItem"
        }
    };
    __alloyId103.push($.__views.tradingPartnerListItem);
    $.__views.tradingPartnerListSection = Ti.UI.createListSection({
        id: "tradingPartnerListSection"
    });
    $.__views.tradingPartnerListSection.items = __alloyId103;
    var __alloyId104 = [];
    __alloyId104.push($.__views.tradingPartnerListSection);
    $.__views.lvwTradingPartners = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId104,
            templates: __alloyId93,
            id: "lvwTradingPartners",
            caseInsensitiveSearch: true,
            headerView: "searchView",
            backgroundColor: "#E9EAEA",
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lvwTradingPartners);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: -50,
        width: "50",
        height: "50",
        indicatorColor: "black",
        id: "activityIndicator"
    });
    $.__views.svScrollView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var communityId = args.communityId;
    Alloy.Globals.communityId = communityId;
    var defaultRoutingIdId = args.defaultRoutingIdId;
    Alloy.Globals.defaultRoutingIdId = defaultRoutingIdId;
    var primaryContactId = args.primaryContactId;
    Alloy.Globals.primaryContactId = primaryContactId;
    $.activityIndicator.hide();
    hideAllTabs();
    hideAllBorderColors();
    getCommunity(communityId);
    getCommunityPartners();
    getCommunityContacts();
    $.ivGetCommunityContacts.borderColor = "black";
    __defers["$.__views.ivGetCommunityContacts!click!getCommunityContacts"] && $.addListener($.__views.ivGetCommunityContacts, "click", getCommunityContacts);
    __defers["$.__views.ivGetCommunityCertificates!click!getCommunityCertificates"] && $.addListener($.__views.ivGetCommunityCertificates, "click", getCommunityCertificates);
    __defers["$.__views.ivGetCommunityRoutingIds!click!getCommunityRoutingIds"] && $.addListener($.__views.ivGetCommunityRoutingIds, "click", getCommunityRoutingIds);
    __defers["$.__views.ivGetApplicationDeliveries!click!getApplicationDeliveries"] && $.addListener($.__views.ivGetApplicationDeliveries, "click", getApplicationDeliveries);
    __defers["$.__views.ivGetApplicationPickups!click!getApplicationPickups"] && $.addListener($.__views.ivGetApplicationPickups, "click", getApplicationPickups);
    __defers["$.__views.ivGetCommunityTradingPickups!click!getCommunityTradingPickups"] && $.addListener($.__views.ivGetCommunityTradingPickups, "click", getCommunityTradingPickups);
    __defers["$.__views.ivGetCommunityTradingPartners!click!getCommunityTradingPartners"] && $.addListener($.__views.ivGetCommunityTradingPartners, "click", getCommunityTradingPartners);
    __defers["$.__views.addContact!click!addContact"] && $.addListener($.__views.addContact, "click", addContact);
    __defers["$.__views.lvwContacts!itemclick!openContactDetail"] && $.addListener($.__views.lvwContacts, "itemclick", openContactDetail);
    __defers["$.__views.lvwCertificates!itemclick!alertNotifyOfPendingYN"] && $.addListener($.__views.lvwCertificates, "itemclick", alertNotifyOfPendingYN);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;