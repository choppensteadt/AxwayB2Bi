function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getCommunities() {
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities?limit=50&offset=0&orderBy=partyName";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    Ti.API.info("Get communities response code: " + this.status);
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing communities failed.", this.responseText, e);
                }
                var communities = [];
                for (var i in response.results) {
                    var id = "@id";
                    var communityId = response.results[i][id];
                    var communityName = response.results[i].partyName;
                    response.results[i].subscribedPartners;
                    var primaryContactId = response.results[i].primaryContact[id];
                    var primaryContact = response.results[i].primaryContact.name;
                    var primaryContactEmail = response.results[i].primaryContact.email;
                    var secondLineText = primaryContact + ", " + primaryContactEmail;
                    var defaultRoutingIdId = response.results[i].defaultRoutingId[id];
                    communities.push({
                        properties: {
                            searchableText: communityName,
                            backgroundColor: "transparent",
                            selectedBackgroundColor: "#CCC"
                        },
                        leftimage: {
                            image: "/images/community.png"
                        },
                        communityName: {
                            text: communityName
                        },
                        primaryContact: {
                            text: secondLineText
                        },
                        communityId: {
                            text: communityId
                        },
                        defaultRoutingIdId: {
                            text: defaultRoutingIdId
                        },
                        primaryContactId: {
                            text: primaryContactId
                        },
                        template: "communityDetailTemplate"
                    });
                }
                $.communityListSection.setItems(communities);
                $.activityIndicator.hide();
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                console.error(e);
                return false;
            },
            timeout: 5e3
        });
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", Alloy.Globals.creds);
        xhr.send();
    }
    function openCommunityDetail(e) {
        var community = $.communityListSection.getItemAt(e.itemIndex);
        var communityId = community.communityId.text;
        var defaultRoutingIdId = community.defaultRoutingIdId.text;
        var primaryContactId = community.primaryContactId.text;
        Alloy.Globals.defaultRoutingIdId = defaultRoutingIdId;
        Alloy.Globals.primaryContactId = primaryContactId;
        var args = {
            communityId: communityId,
            defaultRoutingIdId: defaultRoutingIdId,
            primaryContactId: primaryContactId
        };
        var communityDetail = Alloy.createController("communityDetail", args).getView("communityDetail");
        Alloy.Globals.mainwin.openWindow(communityDetail);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "communities";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.community = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "community",
        title: "Communities"
    });
    $.__views.community && $.addTopLevelView($.__views.community);
    $.__views.searchBar = Ti.UI.createSearchBar({
        id: "searchBar",
        showCancel: true,
        hintText: "Search Communities"
    });
    var __alloyId11 = {};
    var __alloyId13 = [];
    var __alloyId14 = {
        type: "Ti.UI.ImageView",
        bindId: "leftimage",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                left: 6,
                width: 40,
                height: 40
            });
            Alloy.deepExtend(true, o, {
                bindId: "leftimage"
            });
            return o;
        }()
    };
    __alloyId13.push(__alloyId14);
    var __alloyId15 = {
        type: "Ti.UI.Label",
        bindId: "communityName",
        properties: function() {
            var o = {};
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
                bindId: "communityName"
            });
            return o;
        }()
    };
    __alloyId13.push(__alloyId15);
    var __alloyId16 = {
        type: "Ti.UI.Label",
        bindId: "primaryContact",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                top: 40,
                left: 60,
                font: {
                    fontSize: 14,
                    fontFamily: "OpenSans-Regular"
                }
            });
            Alloy.deepExtend(true, o, {
                bindId: "primaryContact"
            });
            return o;
        }()
    };
    __alloyId13.push(__alloyId16);
    var __alloyId17 = {
        type: "Ti.UI.Label",
        bindId: "communityId",
        properties: {
            bindId: "communityId",
            visible: false
        }
    };
    __alloyId13.push(__alloyId17);
    var __alloyId18 = {
        type: "Ti.UI.Label",
        bindId: "defaultRoutingIdId",
        properties: {
            bindId: "defaultRoutingIdId",
            visible: false
        }
    };
    __alloyId13.push(__alloyId18);
    var __alloyId19 = {
        type: "Ti.UI.Label",
        bindId: "primaryContactId",
        properties: {
            bindId: "primaryContactId",
            visible: false
        }
    };
    __alloyId13.push(__alloyId19);
    var __alloyId20 = {
        type: "Ti.UI.ImageView",
        bindId: "notificationSentYesNo",
        properties: function() {
            var o = {};
            Alloy.isHandheld && Alloy.deepExtend(true, o, {
                right: 6,
                width: 30,
                height: 30
            });
            Alloy.deepExtend(true, o, {
                bindId: "notificationSentYesNo"
            });
            return o;
        }()
    };
    __alloyId13.push(__alloyId20);
    var __alloyId12 = {
        properties: {
            height: 80,
            name: "communityDetailTemplate"
        },
        childTemplates: __alloyId13
    };
    __alloyId11["communityDetailTemplate"] = __alloyId12;
    var __alloyId22 = [];
    $.__views.communityListItem = {
        properties: {
            id: "communityListItem"
        }
    };
    __alloyId22.push($.__views.communityListItem);
    $.__views.communityListSection = Ti.UI.createListSection({
        id: "communityListSection"
    });
    $.__views.communityListSection.items = __alloyId22;
    var __alloyId23 = [];
    __alloyId23.push($.__views.communityListSection);
    $.__views.lvwCommunities = Ti.UI.createListView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 20
        });
        Alloy.deepExtend(true, o, {
            sections: __alloyId23,
            templates: __alloyId11,
            searchView: $.__views.searchBar,
            id: "lvwCommunities",
            caseInsensitiveSearch: true,
            canScroll: true,
            showVerticalScrollIndicator: true
        });
        return o;
    }());
    $.__views.community.add($.__views.lvwCommunities);
    openCommunityDetail ? $.addListener($.__views.lvwCommunities, "itemclick", openCommunityDetail) : __defers["$.__views.lvwCommunities!itemclick!openCommunityDetail"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: -50,
        width: "50",
        height: "50",
        indicatorColor: "black",
        id: "activityIndicator"
    });
    $.__views.community.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    console.info("Communities page Alloy.Globals.hostIP: " + Alloy.Globals.hostIP);
    console.info("Alloy.Globals.creds: " + Alloy.Globals.creds);
    getCommunities();
    __defers["$.__views.lvwCommunities!itemclick!openCommunityDetail"] && $.addListener($.__views.lvwCommunities, "itemclick", openCommunityDetail);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;