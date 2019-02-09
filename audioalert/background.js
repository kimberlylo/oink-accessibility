// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var alerted = new Array();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  // alert if playing audio on load
  if (tab.audible && !alerted.includes(tabId)){
    window.alert("This tab is playing audio!");
    alerted.push(tabId);
  }
});

// convert from hex to hsl
function hex_rgb_hsl(color) {
	// convert from hex to rgb
	var r = parseInt(color.substr(1,2), 16); 
	var g = parseInt(color.substr(3,2), 16);
	var b = parseInt(color.substr(5,2), 16);

	r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h*360, s*100, l*100];
};

// convert from hsl to hex
function hsl_rgb_hex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue_rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue_rgb(p, q, h + 1 / 3);
    g = hue_rgb(p, q, h);
    b = hue_rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// change saturation/brightness to adjust darker/lighter
function adjust(color, alpha) {
	// scale to a range of [0, 2]
	alpha /= 50;

	// where to get color(s)?
	var orig_color = hex_rgb_hsl(color);
	var new_color = [orig_color[0], orig_color[1] * alpha, orig_color[2] * alpha];
	var new_hex = hsl_rgb_hex(new_color[0], new_color[1], new_color[2])

	return new_hex;
}

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab){

	var color = '#c7d92c';
	console.log("HI, '#c7d92c'");

	var hsl_lst = hex_rgb_hsl(color);
	console.log(hsl_lst);

	var hex_val = hsl_rgb_hex(hsl_lst[0], hsl_lst[1], hsl_lst[2]);
	console.log(hex_val);

	var alpha_light = 70;
	var new_hex_light = adjust(color, alpha_light);
	console.log(new_hex_light);

	var alpha_dark = 30;
	var new_hex_dark = adjust(color, alpha_dark);
	console.log(new_hex_dark);

});