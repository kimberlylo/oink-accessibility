// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var curr_color = ["#FFFFFF", "#FFFFFF", "#FFFFFF"];
var new_color = ["#FFFFFF", "#FFFFFF" , "#FFFFFF"];

var table= document.createElement('table'),
    thead = document.createElement('thead'),
    tbody = document.createElement('tbody'),
    th,
    tr,
    td;
    th = document.createElement('th'),          
    th.innerHTML="Current Color";
    table.appendChild(th);
    th = document.createElement('th'); 
    th.innerHTML= "New Color"
    table.appendChild(th);
    table.appendChild(thead);            
    table.appendChild(tbody);
    
    document.body.appendChild(table);
 for(var i=0;i<curr_color.length;i++){
    tr = document.createElement('tr'),
    //for curr colors
    td= document.createElement('td');
    td.innerHTML=curr_color[i];
    tr.appendChild(td);

    //for new colors
    td = document.createElement('td');
    td.innerHTML="<label contenteditable=\"true\">" + new_color[i];
    tr.appendChild(td);

    tbody.appendChild(tr);
 }