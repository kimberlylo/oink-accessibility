// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    var checkTabs = new Array();
    chrome.tabs.query({audible: true}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            checkTabs[i] = tabs[i];
        }

        if (checkTabs.length == 0)
          window.console.log("NONE");
        else
          chrome.extension.getBackgroundPage().alert('Music is playing!');

        for (var i = 0; i < checkTabs.length; i++) {
            if (checkTabs[i] != null) {
              window.console.log("ON");
              window.console.log(checkTabs[i].url); 
            } else {
              window.console.log("OFF");
              window.console.log("??" + i);
            }
        }
        console.log("qu");
    });
});