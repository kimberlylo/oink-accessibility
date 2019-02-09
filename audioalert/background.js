// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var alerted = new Array();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  if (tab.audible && !alerted.includes(tabId)){
    window.alert("This tab is playing audio!");
    alerted.push(tabId);
  }

});