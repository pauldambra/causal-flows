!function(t){function e(e){for(var n,i,s=e[0],c=e[1],u=e[2],d=0,f=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);for(l&&l(e);f.length;)f.shift()();return a.push.apply(a,u||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],n=!0,s=1;s<r.length;s++){var c=r[s];0!==o[c]&&(n=!1)}n&&(a.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},o={0:0},a=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push(["/7QA",1]),r()}({"/7QA":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r("DtyJ"),o=r("ahDk"),a=r("CO/c"),i=r("6luj"),s=n.fromEvent(document.getElementById("diagram-text"),"input").pipe(o.map(t=>t.target),o.map(t=>t.value),o.debounceTime(375),o.map(a.toNodeVertexPairs));s.subscribe(t=>console.log(t)),new i.chart("#outlet",s)},"6luj":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.chart=void 0;const n=r("VphZ");e.chart=class{constructor(t,e){this.width=900,this.height=500,this.drag=t=>n.drag().on("start",(function(e){n.event.active||t.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y})).on("drag",(function(t){t.fx=n.event.x,t.fy=n.event.y})).on("end",(function(e){n.event.active||t.alphaTarget(0),e.fx=null,e.fy=null})),this.nodeByName=(t,e)=>{const r=t;r||(console.log(t,"d"),console.log(r,"d1"));const n=this.nodeNames.indexOf(r);return e.find(t=>t.index===n)},this.graphData$=e,this.init(t)}init(t){this.group=n.select(t).append("g"),this.graphData$.subscribe(t=>{const e=t.reduce((t,e)=>(t[e.start]=e.start,t[e.end]=e.end,t),{});this.nodeNames=Object.values(e);const r=this.nodeNames.map((t,e)=>({index:e,id:t})),o=t.map(t=>({id:t.start,source:t.start,target:t.end,direction:t.edge})),a=n.forceSimulation(r).force("link",n.forceLink(o).id(t=>this.nodeNames[t.index]||"unknown")).force("charge",n.forceManyBody()).force("center",n.forceCenter(this.width/2,this.height/2)),i=n.select("svg"),s=i.append("g").attr("stroke","#999").attr("stroke-opacity",.6).selectAll("line").data(o).join("line").attr("stroke-width",2),c=i.append("g").attr("stroke","#fff").attr("stroke-width",1.5).selectAll("circle").data(r).join("circle").attr("r",5).attr("fill","red").call(this.drag(a));c.append("title").text(t=>this.nodeNames[t.index]),a.on("tick",()=>{s.attr("x1",t=>this.asX(r,t.source)).attr("y1",t=>this.asY(r,t.source)).attr("x2",t=>this.asX(r,t.target)).attr("y2",t=>this.asY(r,t.target)),c.attr("cx",t=>t.x).attr("cy",t=>t.y)})})}asX(t,e){const r=this.nodeByName(e,t);return r?r.x:0}asY(t,e){const r=this.nodeByName(e,t);return r?r.y:0}}},"CO/c":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.toNodeVertexPairs=void 0;const n=t=>"+"===t||"-"===t;function o(t){const e={edge:"",start:"",end:""};let r=!1,o=!0;return t.split("").forEach(t=>{!function(t){return'"'===t}(t)?!function(t,e){return!t&&n(e)}(r,t)?o?e.start+=t:e.end+=t:(e.edge=t,o=!1):r=!r}),function(t){return""!==t.start&&""!==t.end&&n(t.edge)}(e)?{edge:"+"===e.edge?"increases":"decreases",start:e.start,end:e.end}:null}e.toNodeVertexPairs=t=>t.split("\n").map(o).filter(t=>null!==t)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jaGFydC9jaGFydGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UtZGVzY3JpcHRpb24vcGFyc2UudHMiXSwibmFtZXMiOlsid2VicGFja0pzb25wQ2FsbGJhY2siLCJkYXRhIiwibW9kdWxlSWQiLCJjaHVua0lkIiwiY2h1bmtJZHMiLCJtb3JlTW9kdWxlcyIsImV4ZWN1dGVNb2R1bGVzIiwiaSIsInJlc29sdmVzIiwibGVuZ3RoIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaW5zdGFsbGVkQ2h1bmtzIiwicHVzaCIsIm1vZHVsZXMiLCJwYXJlbnRKc29ucEZ1bmN0aW9uIiwic2hpZnQiLCJkZWZlcnJlZE1vZHVsZXMiLCJhcHBseSIsImNoZWNrRGVmZXJyZWRNb2R1bGVzIiwicmVzdWx0IiwiZGVmZXJyZWRNb2R1bGUiLCJmdWxmaWxsZWQiLCJqIiwiZGVwSWQiLCJzcGxpY2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwicyIsImluc3RhbGxlZE1vZHVsZXMiLCIwIiwiZXhwb3J0cyIsIm1vZHVsZSIsImwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsImpzb25wQXJyYXkiLCJ3aW5kb3ciLCJvbGRKc29ucEZ1bmN0aW9uIiwic2xpY2UiLCJkaWFncmFtRGVzY3JpcHRpb24kIiwiZnJvbUV2ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBpcGUiLCJtYXAiLCJlIiwidGFyZ2V0IiwiZGVib3VuY2VUaW1lIiwidG9Ob2RlVmVydGV4UGFpcnMiLCJzdWJzY3JpYmUiLCJjb25zb2xlIiwibG9nIiwiY2hhcnQiLCJjb250YWluZXIiLCJncmFwaERhdGEiLCJ3aWR0aCIsImhlaWdodCIsImRyYWciLCJzaW11bGF0aW9uIiwiZDMiLCJvbiIsImV2ZW50IiwiYWN0aXZlIiwiYWxwaGFUYXJnZXQiLCJyZXN0YXJ0IiwiZngiLCJ4IiwiZnkiLCJ5Iiwibm9kZUJ5TmFtZSIsImQxIiwiaW5kZXgiLCJ0aGlzIiwibm9kZU5hbWVzIiwiaW5kZXhPZiIsImZpbmQiLCJncmFwaERhdGEkIiwiaW5pdCIsImdyb3VwIiwic2VsZWN0IiwiYXBwZW5kIiwibm9kZURpY3QiLCJyZWR1Y2UiLCJwYWlyIiwic3RhcnQiLCJlbmQiLCJ2YWx1ZXMiLCJub2RlcyIsInYiLCJpZCIsImxpbmtzIiwic291cmNlIiwiZGlyZWN0aW9uIiwiZWRnZSIsImZvcmNlU2ltdWxhdGlvbiIsImZvcmNlIiwiZm9yY2VMaW5rIiwiZm9yY2VNYW55Qm9keSIsImZvcmNlQ2VudGVyIiwic3ZnIiwibGluayIsImF0dHIiLCJzZWxlY3RBbGwiLCJqb2luIiwibm9kZSIsInRleHQiLCJhc1giLCJhc1kiLCJub2RlTmFtZSIsImlzTGlua2luZ0NoYXIiLCJwYXJzZUxpbmUiLCJwb3RlbnRpYWwiLCJpblF1b3RlZFN0cmluZyIsInJlYWRpbmdTdGFydCIsInNwbGl0IiwiZm9yRWFjaCIsImlzV29yZEJvdW5kYXJ5IiwiZmluaXNoZWRSZWFkaW5nU3RhcnQiLCJpc1ZhbGlkUGFpciIsImZpbHRlciJdLCJtYXBwaW5ncyI6ImFBQ0UsU0FBU0EsRUFBcUJDLEdBUTdCLElBUEEsSUFNSUMsRUFBVUMsRUFOVkMsRUFBV0gsRUFBSyxHQUNoQkksRUFBY0osRUFBSyxHQUNuQkssRUFBaUJMLEVBQUssR0FJSE0sRUFBSSxFQUFHQyxFQUFXLEdBQ3BDRCxFQUFJSCxFQUFTSyxPQUFRRixJQUN6QkosRUFBVUMsRUFBU0csR0FDaEJHLE9BQU9DLFVB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QU8sR0FDUEMsSUFBSyxJQUdULElBQUkyQixHQUFpQixFQUNqQkMsR0FBZSxFQWtCbkIsT0FoQkE1RyxFQUFFNkcsTUFBTSxJQUNIQyxRQUFRakQsS0FuQmpCLFNBQXdCQSxHQUNwQixNQUFhLE1BQU5BLEVBbUJLa0QsQ0FBZWxELElBeEIvQixTQUE4QjhDLEVBQXlCOUMsR0FDbkQsT0FBUThDLEdBQWtCSCxFQUFjM0MsR0F5QnJCbUQsQ0FBcUJMLEVBQWdCOUMsR0FJeEMrQyxFQUNBRixFQUFVM0IsT0FBU2xCLEVBRW5CNkMsRUFBVTFCLEtBQU9uQixHQU5yQjZDLEVBQVVsQixLQUFPM0IsRUFDakIrQyxHQUFlLEdBSGZELEdBQWtCQSxJQWpCbEMsU0FBcUJELEdBQ2pCLE1BQTJCLEtBQXBCQSxFQUFVM0IsT0FBa0MsS0FBbEIyQixFQUFVMUIsS0FBY3dCLEVBQWNFLEVBQVVsQixNQTZCMUV5QixDQUFZUCxHQUFhLENBQzVCbEIsS0FBeUIsTUFBbkJrQixFQUFVbEIsS0FBZSxZQUFjLFlBQzdDVCxNQUFPMkIsRUFBVTNCLE1BQ2pCQyxJQUFLMEIsRUFBVTFCLEtBQ2YsS0FHSyxFQUFBckMsa0JBQXFCM0MsR0FDOUJBLEVBQUU2RyxNQUFNLE1BQ0h0RSxJQUFJa0UsR0FDSlMsT0FBT3JELEdBQVcsT0FBTkEiLCJmaWxlIjoibWFpbi5mY2FmODYzYjc0ZDVlN2RjZmZlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIvN1FBXCIsMV0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgbWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7dG9Ob2RlVmVydGV4UGFpcnN9IGZyb20gXCIuL3BhcnNlLWRlc2NyaXB0aW9uL3BhcnNlXCI7XG5pbXBvcnQge2NoYXJ0fSBmcm9tIFwiLi9jaGFydC9jaGFydGluZ1wiO1xuXG5cblxuY29uc3QgZGlhZ3JhbURlc2NyaXB0aW9uJCA9IGZyb21FdmVudDxJbnB1dEV2ZW50Pihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhZ3JhbS10ZXh0JyksICdpbnB1dCcpXG4gICAgLnBpcGUoXG4gICAgICAgIG1hcChlID0+IChlLnRhcmdldCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KSksXG4gICAgICAgIG1hcChlID0+IGUudmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzc1KSxcbiAgICAgICAgbWFwKHRvTm9kZVZlcnRleFBhaXJzKVxuICAgICk7XG5cbmRpYWdyYW1EZXNjcmlwdGlvbiQuc3Vic2NyaWJlKGUgPT4gY29uc29sZS5sb2coZSkpXG5cbm5ldyBjaGFydCgnI291dGxldCcsIGRpYWdyYW1EZXNjcmlwdGlvbiQpIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1BhaXJ9IGZyb20gXCIuLi9wYXJzZS1kZXNjcmlwdGlvbi9wYXJzZVwiO1xuaW1wb3J0IHtTaW11bGF0aW9uTm9kZURhdHVtLCBTaW11bGF0aW9uTGlua0RhdHVtfSBmcm9tIFwiZDNcIjtcbmltcG9ydCB7U2ltdWxhdGlvbn0gZnJvbSBcImQzLWZvcmNlXCI7XG5cbmludGVyZmFjZSBub2RlRGljdGlvbmFyeSB7XG4gICAgW2lkOiBzdHJpbmddOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIE5vZGUgZXh0ZW5kcyBTaW11bGF0aW9uTm9kZURhdHVtIHtcbn1cblxuaW50ZXJmYWNlIExpbmsgZXh0ZW5kcyBTaW11bGF0aW9uTGlua0RhdHVtPE5vZGU+IHtcbn1cblxuZXhwb3J0IGNsYXNzIGNoYXJ0IHtcbiAgICBwcml2YXRlIGdyb3VwOiBkMy5TZWxlY3Rpb248YW55LCBhbnksIGFueSwgYW55PjtcbiAgICBwcml2YXRlIGdyYXBoRGF0YSQ6IE9ic2VydmFibGU8UGFpcltdPjtcbiAgICBwcml2YXRlIG5vZGVOYW1lczogc3RyaW5nW11cbiAgICBwcml2YXRlIHdpZHRoID0gOTAwXG4gICAgcHJpdmF0ZSBoZWlnaHQgPSA1MDBcblxuICAgIHByaXZhdGUgZHJhZyA9IChzaW11bGF0aW9uOiBTaW11bGF0aW9uPE5vZGUsIExpbms+KSA9PiB7XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZ3N0YXJ0ZWQoZDogTm9kZSkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMC4zKS5yZXN0YXJ0KCk7XG4gICAgICAgICAgICBkLmZ4ID0gZC54O1xuICAgICAgICAgICAgZC5meSA9IGQueTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdnZWQoZDogTm9kZSkge1xuICAgICAgICAgICAgZC5meCA9IGQzLmV2ZW50Lng7XG4gICAgICAgICAgICBkLmZ5ID0gZDMuZXZlbnQueTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdlbmRlZChkOiBOb2RlKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LmFjdGl2ZSkgc2ltdWxhdGlvbi5hbHBoYVRhcmdldCgwKTtcbiAgICAgICAgICAgIGQuZnggPSBudWxsO1xuICAgICAgICAgICAgZC5meSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZDMuZHJhZygpXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBkcmFnc3RhcnRlZClcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZHJhZ2dlZClcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBkcmFnZW5kZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbm9kZUJ5TmFtZSA9IChkOiB1bmtub3duLCBuczogTm9kZVtdKTogTm9kZSA9PiB7XG4gICAgICAgIGNvbnN0IGQxID0gZCBhcyBzdHJpbmc7XG4gICAgICAgIGlmICghZDEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQsICdkJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQxLCAnZDEnKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ub2RlTmFtZXMuaW5kZXhPZihkMSlcbiAgICAgICAgcmV0dXJuIG5zLmZpbmQoeCA9PiB4LmluZGV4ID09PSBpbmRleClcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBzdHJpbmcsIGdyYXBoRGF0YTogT2JzZXJ2YWJsZTxQYWlyW10+KSB7XG4gICAgICAgIHRoaXMuZ3JhcGhEYXRhJCA9IGdyYXBoRGF0YVxuICAgICAgICB0aGlzLmluaXQoY29udGFpbmVyKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgaW5pdChjb250YWluZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLmdyb3VwID0gZDMuc2VsZWN0KGNvbnRhaW5lcikuYXBwZW5kKCdnJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaERhdGEkLnN1YnNjcmliZShlID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZURpY3QgPSBlLnJlZHVjZTxub2RlRGljdGlvbmFyeT4oKG5zLCBwYWlyKSA9PiB7XG4gICAgICAgICAgICAgICAgbnNbcGFpci5zdGFydF0gPSBwYWlyLnN0YXJ0XG4gICAgICAgICAgICAgICAgbnNbcGFpci5lbmRdID0gcGFpci5lbmRcbiAgICAgICAgICAgICAgICByZXR1cm4gbnNcbiAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgdGhpcy5ub2RlTmFtZXMgPSBPYmplY3QudmFsdWVzKG5vZGVEaWN0KVxuXG4gICAgICAgICAgICBjb25zdCBub2RlczogTm9kZVtdID0gdGhpcy5ub2RlTmFtZXMubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtpbmRleDogaSwgaWQ6IHZ9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCBsaW5rczogTGlua1tdID0gZS5tYXAodiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtpZDogdi5zdGFydCwgc291cmNlOiB2LnN0YXJ0LCB0YXJnZXQ6IHYuZW5kLCBkaXJlY3Rpb246IHYuZWRnZX1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzaW11bGF0aW9uOiBTaW11bGF0aW9uPE5vZGUsIExpbms+ID0gZDMuZm9yY2VTaW11bGF0aW9uKG5vZGVzKVxuICAgICAgICAgICAgICAgIC5mb3JjZShcImxpbmtcIiwgZDMuZm9yY2VMaW5rKGxpbmtzKS5pZChkID0+IHRoaXMubm9kZU5hbWVzW2QuaW5kZXhdIHx8IFwidW5rbm93blwiKSlcbiAgICAgICAgICAgICAgICAuZm9yY2UoXCJjaGFyZ2VcIiwgZDMuZm9yY2VNYW55Qm9keSgpKVxuICAgICAgICAgICAgICAgIC5mb3JjZShcImNlbnRlclwiLCBkMy5mb3JjZUNlbnRlcih0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKSk7XG5cblxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwic3ZnXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcIiM5OTlcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS1vcGFjaXR5XCIsIDAuNilcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwibGluZVwiKVxuICAgICAgICAgICAgICAgIC5kYXRhKGxpbmtzKVxuICAgICAgICAgICAgICAgIC5qb2luKFwibGluZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAxLjUpXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbChcImNpcmNsZVwiKVxuICAgICAgICAgICAgICAgIC5kYXRhKG5vZGVzKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJyXCIsIDUpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgICAgICAgICAgICAgLmNhbGwodGhpcy5kcmFnKHNpbXVsYXRpb24pKTtcblxuICAgICAgICAgICAgbm9kZS5hcHBlbmQoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgICAgIC50ZXh0KChkOiBOb2RlKSA9PiB0aGlzLm5vZGVOYW1lc1tkLmluZGV4XSk7XG5cbiAgICAgICAgICAgIHNpbXVsYXRpb24ub24oXCJ0aWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsaW5rXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDFcIiwgKGQ6IExpbmspID0+IHRoaXMuYXNYKG5vZGVzLCBkLnNvdXJjZSkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTFcIiwgKGQ6IExpbmspID0+IHRoaXMuYXNZKG5vZGVzLCBkLnNvdXJjZSkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDJcIiwgKGQ6IExpbmspID0+IHRoaXMuYXNYKG5vZGVzLCBkLnRhcmdldCkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTJcIiwgKGQ6IExpbmspID0+IHRoaXMuYXNZKG5vZGVzLCBkLnRhcmdldCkpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImN4XCIsIGQgPT4gZC54KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImN5XCIsIGQgPT4gZC55KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc1gobm9kZXM6IE5vZGVbXSwgbm9kZU5hbWU6IHN0cmluZyB8IG51bWJlciB8IE5vZGUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZUJ5TmFtZShub2RlTmFtZSwgbm9kZXMpO1xuICAgICAgICByZXR1cm4gbm9kZSA/IG5vZGUueCA6IDA7XG4gICAgfVxuICAgIHByaXZhdGUgYXNZKG5vZGVzOiBOb2RlW10sIG5vZGVOYW1lOiBzdHJpbmcgfCBudW1iZXIgfCBOb2RlKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGVCeU5hbWUobm9kZU5hbWUsIG5vZGVzKTtcbiAgICAgICAgcmV0dXJuIG5vZGUgPyBub2RlLnkgOiAwO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IGludGVyZmFjZSBQYWlyIHtcbiAgICBlZGdlOiBcImluY3JlYXNlc1wiIHwgXCJkZWNyZWFzZXNcIixcbiAgICBzdGFydDogc3RyaW5nXG4gICAgZW5kOiBzdHJpbmdcbn1cblxuY29uc3QgaXNMaW5raW5nQ2hhciA9ICh4OiBzdHJpbmcpID0+IHggPT09ICcrJyB8fCB4ID09PSAnLSc7XG5cbmZ1bmN0aW9uIGZpbmlzaGVkUmVhZGluZ1N0YXJ0KGluUXVvdGVkU3RyaW5nOiBib29sZWFuLCB4OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIWluUXVvdGVkU3RyaW5nICYmIGlzTGlua2luZ0NoYXIoeCk7XG59XG5cbmZ1bmN0aW9uIGlzV29yZEJvdW5kYXJ5KHg6IHN0cmluZykge1xuICAgIHJldHVybiB4ID09PSBcIlxcXCJcIjtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFBhaXIocG90ZW50aWFsOiB7IGVkZ2U6IHN0cmluZzsgc3RhcnQ6IHN0cmluZzsgZW5kOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiBwb3RlbnRpYWwuc3RhcnQgIT09IFwiXCIgJiYgcG90ZW50aWFsLmVuZCAhPT0gXCJcIiAmJiBpc0xpbmtpbmdDaGFyKHBvdGVudGlhbC5lZGdlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaW5lKHM6IHN0cmluZyk6IFBhaXIgfCBudWxsIHtcbiAgICBjb25zdCBwb3RlbnRpYWwgPSB7XG4gICAgICAgIGVkZ2U6IFwiXCIsXG4gICAgICAgIHN0YXJ0OiBcIlwiLFxuICAgICAgICBlbmQ6IFwiXCJcbiAgICB9XG5cbiAgICBsZXQgaW5RdW90ZWRTdHJpbmcgPSBmYWxzZVxuICAgIGxldCByZWFkaW5nU3RhcnQgPSB0cnVlXG5cbiAgICBzLnNwbGl0KCcnKVxuICAgICAgICAuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGlmIChpc1dvcmRCb3VuZGFyeSh4KSkge1xuICAgICAgICAgICAgICAgIGluUXVvdGVkU3RyaW5nID0gIWluUXVvdGVkU3RyaW5nXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbmlzaGVkUmVhZGluZ1N0YXJ0KGluUXVvdGVkU3RyaW5nLCB4KSkge1xuICAgICAgICAgICAgICAgIHBvdGVudGlhbC5lZGdlID0geFxuICAgICAgICAgICAgICAgIHJlYWRpbmdTdGFydCA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkaW5nU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcG90ZW50aWFsLnN0YXJ0ICs9IHhcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWwuZW5kICs9IHhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4gaXNWYWxpZFBhaXIocG90ZW50aWFsKSA/IHtcbiAgICAgICAgZWRnZTogcG90ZW50aWFsLmVkZ2UgPT09IFwiK1wiID8gXCJpbmNyZWFzZXNcIiA6IFwiZGVjcmVhc2VzXCIsXG4gICAgICAgIHN0YXJ0OiBwb3RlbnRpYWwuc3RhcnQsXG4gICAgICAgIGVuZDogcG90ZW50aWFsLmVuZFxuICAgIH0gOiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCB0b05vZGVWZXJ0ZXhQYWlycyA9IChzOiBzdHJpbmcpOiBBcnJheTxQYWlyPiA9PlxuICAgIHMuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgLm1hcChwYXJzZUxpbmUpXG4gICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSBudWxsKSJdLCJzb3VyY2VSb290IjoiIn0=