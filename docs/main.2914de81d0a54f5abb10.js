!function(e){function t(t){for(var n,i,s=t[0],c=t[1],d=t[2],u=0,f=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(l&&l(t);f.length;)f.shift()();return o.push.apply(o,d||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==a[c]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={0:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=c;o.push(["/7QA",1]),r()}({"/7QA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("DtyJ"),a=r("ahDk"),o=r("CO/c"),i=r("6luj"),s=n.fromEvent(document.getElementById("diagram-text"),"input").pipe(a.map(e=>e.target),a.map(e=>e.value),a.debounceTime(375),a.map(o.toNodeVertexPairs));new i.chart("#outlet",s)},"6luj":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.chart=void 0;const n=r("VphZ");t.chart=class{constructor(e,t){this.width=900,this.height=500,this.drag=e=>n.drag().on("start",(function(t){n.event.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y})).on("drag",(function(e){e.fx=n.event.x,e.fy=n.event.y})).on("end",(function(t){n.event.active||e.alphaTarget(0),t.fx=null,t.fy=null})),this.graphData$=t,this.init(e)}init(e){this.group=n.select(e).append("g"),this.graphData$.subscribe(e=>{const t=e.reduce((e,t)=>(e[t.start]=t.start,e[t.end]=t.end,e),{});console.log(t,"nd"),this.nodeNames=Object.values(t);const r=this.nodeNames.map((e,t)=>({index:t,id:e})),a=e.map(e=>({id:e.start,source:e.start,target:e.end,direction:e.edge})),o=n.forceSimulation(r).force("link",n.forceLink(a).id(e=>this.nodeNames[e.index]||"unknown")).force("charge",n.forceManyBody()).force("center",n.forceCenter(this.width/2,this.height/2)).force("collision",n.forceCollide().radius(30)),i=n.select("svg");i.append("svg:defs").append("svg:marker").attr("id","triangle").attr("viewBox","0 -5 10 10").attr("refX",15).attr("refY",-1.5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto");const s=i.selectAll(".line").data(a).join("line").attr("stroke-opacity",1).attr("class",e=>e.direction+" line").attr("data-link",e=>{const t=e;return JSON.stringify(t)}).attr("marker-center","url(#triangle)").attr("stroke-width",2).attr("stroke",e=>"increases"===e.direction?"green":"red");n.interval(()=>{i.selectAll(".line").each((function(e){console.log(e);n.select(this).attr("stroke-dasharray","5 5").attr("stroke-dashoffset",5).transition().ease(n.easeCircle).duration(200).attr("stroke-dashoffset",0)}))},200);const c=i.selectAll(".node").data(r).join("g").attr("class","node").call(this.drag(o));c.append("circle").attr("stroke","black").attr("stroke-width",1.5).attr("r",20).attr("fill","white"),c.append("text").attr("dx",e=>-5).text(e=>this.nodeNames[e.index]),c.append("title").text(e=>this.nodeNames[e.index]),o.on("tick",()=>{s.attr("x1",e=>e.source.x).attr("y1",e=>e.source.y).attr("x2",e=>e.target.x).attr("y2",e=>e.target.y),c.attr("transform",e=>`translate(${e.x}, ${e.y})`)})})}}},"CO/c":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toNodeVertexPairs=t.toSizedNodeVertexPairs=void 0,t.toSizedNodeVertexPairs=e=>{const r=t.toNodeVertexPairs(e),n=r.reduce((e,t)=>(e[t.start]||(e[t.start]={name:t.start,radius:0}),e[t.end]||(e[t.end]={name:t.end,radius:0}),"increases"===t.edge&&(e[t.end].radius+=5),"decreases"===t.edge&&(e[t.end].radius-=5),e),{});return{nodes:Object.values(n),links:r}},t.toNodeVertexPairs=e=>e.split("\n").map(a).filter(e=>null!==e);const n=e=>"+"===e||"-"===e;function a(e){const t={edge:"",start:"",end:""};let r=!1,a=!0;return e.split("").forEach(e=>{!function(e){return'"'===e}(e)?!function(e,t){return!e&&n(t)}(r,e)?a?t.start+=e:t.end+=e:(t.edge=e,a=!1):r=!r}),function(e){return""!==e.start&&""!==e.end&&n(e.edge)}(t)?{edge:"+"===t.edge?"increases":"decreases",start:t.start,end:t.end}:null}}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jaGFydC9jaGFydGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UtZGVzY3JpcHRpb24vcGFyc2UudHMiXSwibmFtZXMiOlsid2VicGFja0pzb25wQ2FsbGJhY2siLCJkYXRhIiwibW9kdWxlSWQiLCJjaHVua0lkIiwiY2h1bmtJZHMiLCJtb3JlTW9kdWxlcyIsImV4ZWN1dGVNb2R1bGVzIiwiaSIsInJlc29sdmVzIiwibGVuZ3RoIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaW5zdGFsbGVkQ2h1bmtzIiwicHVzaCIsIm1vZHVsZXMiLCJwYXJlbnRKc29ucEZ1bmN0aW9uIiwic2hpZnQiLCJkZWZlcnJlZE1vZHVsZXMiLCJhcHBseSIsImNoZWNrRGVmZXJyZWRNb2R1bGVzIiwicmVzdWx0IiwiZGVmZXJyZWRNb2R1bGUiLCJmdWxmaWxsZWQiLCJqIiwiZGVwSWQiLCJzcGxpY2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwicyIsImluc3RhbGxlZE1vZHVsZXMiLCIwIiwiZXhwb3J0cyIsIm1vZHVsZSIsImwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsImpzb25wQXJyYXkiLCJ3aW5kb3ciLCJvbGRKc29ucEZ1bmN0aW9uIiwic2xpY2UiLCJkaWFncmFtRGVzY3JpcHRpb24kIiwiZnJvbUV2ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBpcGUiLCJtYXAiLCJlIiwidGFyZ2V0IiwiZGVib3VuY2VUaW1lIiwidG9Ob2RlVmVydGV4UGFpcnMiLCJjaGFydCIsImNvbnRhaW5lciIsImdyYXBoRGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhZyIsInNpbXVsYXRpb24iLCJkMyIsIm9uIiwiZXZlbnQiLCJhY3RpdmUiLCJhbHBoYVRhcmdldCIsInJlc3RhcnQiLCJmeCIsIngiLCJmeSIsInkiLCJ0aGlzIiwiZ3JhcGhEYXRhJCIsImluaXQiLCJncm91cCIsInNlbGVjdCIsImFwcGVuZCIsInN1YnNjcmliZSIsIm5vZGVEaWN0IiwicmVkdWNlIiwicGFpciIsInN0YXJ0IiwiZW5kIiwiY29uc29sZSIsImxvZyIsIm5vZGVOYW1lcyIsInZhbHVlcyIsIm5vZGVzIiwidiIsImluZGV4IiwiaWQiLCJsaW5rcyIsInNvdXJjZSIsImRpcmVjdGlvbiIsImVkZ2UiLCJmb3JjZVNpbXVsYXRpb24iLCJmb3JjZSIsImZvcmNlTGluayIsImZvcmNlTWFueUJvZHkiLCJmb3JjZUNlbnRlciIsImZvcmNlQ29sbGlkZSIsInJhZGl1cyIsInN2ZyIsImF0dHIiLCJsaW5rIiwic2VsZWN0QWxsIiwiam9pbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbnRlcnZhbCIsImVhY2giLCJ0b3RhbExlbmd0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUNpcmNsZSIsImR1cmF0aW9uIiwibm9kZSIsInRleHQiLCJ0b1NpemVkTm9kZVZlcnRleFBhaXJzIiwicGFpcnMiLCJnYXRoZXJlZE5vZGVzIiwiYWNjIiwiY3VyciIsInNwbGl0IiwicGFyc2VMaW5lIiwiZmlsdGVyIiwiaXNMaW5raW5nQ2hhciIsInBvdGVudGlhbCIsImluUXVvdGVkU3RyaW5nIiwicmVhZGluZ1N0YXJ0IiwiZm9yRWFjaCIsImlzV29yZEJvdW5kYXJ5IiwiZmluaXNoZWRSZWFkaW5nU3RhcnQiLCJpc1ZhbGlkUGFpciJdLCJtYXBwaW5ncyI6ImFBQ0UsU0FBU0EsRUFBcUJDLEdBUTdCLElBUEEsSUFNSUMsRUFBVUMsRUFOVkMsRUFBV0gs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Q3BCLE1BQWEsTUFBTkEsRUFtQksrRCxDQUFlL0QsSUF4Qi9CLFNBQThCNEQsRUFBeUI1RCxHQUNuRCxPQUFRNEQsR0FBa0JGLEVBQWMxRCxHQXlCckJnRSxDQUFxQkosRUFBZ0I1RCxHQUl4QzZELEVBQ0FGLEVBQVU5QyxPQUFTYixFQUVuQjJELEVBQVU3QyxLQUFPZCxHQU5yQjJELEVBQVVqQyxLQUFPMUIsRUFDakI2RCxHQUFlLEdBSGZELEdBQWtCQSxJQWpCbEMsU0FBcUJELEdBQ2pCLE1BQTJCLEtBQXBCQSxFQUFVOUMsT0FBa0MsS0FBbEI4QyxFQUFVN0MsS0FBYzRDLEVBQWNDLEVBQVVqQyxNQTZCMUV1QyxDQUFZTixHQUFhLENBQzVCakMsS0FBeUIsTUFBbkJpQyxFQUFVakMsS0FBZSxZQUFjLFlBQzdDYixNQUFPOEMsRUFBVTlDLE1BQ2pCQyxJQUFLNkMsRUFBVTdDLEtBQ2YiLCJmaWxlIjoibWFpbi4yOTE0ZGU4MWQwYTU0ZjVhYmIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIvN1FBXCIsMV0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgbWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7dG9Ob2RlVmVydGV4UGFpcnN9IGZyb20gXCIuL3BhcnNlLWRlc2NyaXB0aW9uL3BhcnNlXCI7XG5pbXBvcnQge2NoYXJ0fSBmcm9tIFwiLi9jaGFydC9jaGFydGluZ1wiO1xuXG5cblxuY29uc3QgZGlhZ3JhbURlc2NyaXB0aW9uJCA9IGZyb21FdmVudDxJbnB1dEV2ZW50Pihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhZ3JhbS10ZXh0JyksICdpbnB1dCcpXG4gICAgLnBpcGUoXG4gICAgICAgIG1hcChlID0+IChlLnRhcmdldCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KSksXG4gICAgICAgIG1hcChlID0+IGUudmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzc1KSxcbiAgICAgICAgbWFwKHRvTm9kZVZlcnRleFBhaXJzKVxuICAgICk7XG5cbm5ldyBjaGFydCgnI291dGxldCcsIGRpYWdyYW1EZXNjcmlwdGlvbiQpIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1BhaXJ9IGZyb20gXCIuLi9wYXJzZS1kZXNjcmlwdGlvbi9wYXJzZVwiO1xuaW1wb3J0IHtTaW11bGF0aW9uTm9kZURhdHVtLCBTaW11bGF0aW9uTGlua0RhdHVtfSBmcm9tIFwiZDNcIjtcbmltcG9ydCB7U2ltdWxhdGlvbn0gZnJvbSBcImQzLWZvcmNlXCI7XG5cbmludGVyZmFjZSBub2RlRGljdGlvbmFyeSB7XG4gICAgW2lkOiBzdHJpbmddOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIE5vZGUgZXh0ZW5kcyBTaW11bGF0aW9uTm9kZURhdHVtIHtcbn1cblxuaW50ZXJmYWNlIExpbmsgZXh0ZW5kcyBTaW11bGF0aW9uTGlua0RhdHVtPE5vZGU+IHtcbiAgICBkaXJlY3Rpb246IFwiaW5jcmVhc2VzXCIgfCBcImRlY3JlYXNlc1wiXG59XG5cbmV4cG9ydCBjbGFzcyBjaGFydCB7XG4gICAgcHJpdmF0ZSBncm91cDogZDMuU2VsZWN0aW9uPGFueSwgYW55LCBhbnksIGFueT47XG4gICAgcHJpdmF0ZSBncmFwaERhdGEkOiBPYnNlcnZhYmxlPFBhaXJbXT47XG4gICAgcHJpdmF0ZSBub2RlTmFtZXM6IHN0cmluZ1tdXG4gICAgcHJpdmF0ZSB3aWR0aCA9IDkwMFxuICAgIHByaXZhdGUgaGVpZ2h0ID0gNTAwXG5cbiAgICBwcml2YXRlIGRyYWcgPSAoc2ltdWxhdGlvbjogU2ltdWxhdGlvbjxOb2RlLCBMaW5rPikgPT4ge1xuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdzdGFydGVkKGQ6IE5vZGUpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuYWN0aXZlKSBzaW11bGF0aW9uLmFscGhhVGFyZ2V0KDAuMykucmVzdGFydCgpO1xuICAgICAgICAgICAgZC5meCA9IGQueDtcbiAgICAgICAgICAgIGQuZnkgPSBkLnk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkcmFnZ2VkKGQ6IE5vZGUpIHtcbiAgICAgICAgICAgIGQuZnggPSBkMy5ldmVudC54O1xuICAgICAgICAgICAgZC5meSA9IGQzLmV2ZW50Lnk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkcmFnZW5kZWQoZDogTm9kZSkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMCk7XG4gICAgICAgICAgICBkLmZ4ID0gbnVsbDtcbiAgICAgICAgICAgIGQuZnkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGQzLmRyYWcoKVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZHJhZ3N0YXJ0ZWQpXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGRyYWdnZWQpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZHJhZ2VuZGVkKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IHN0cmluZywgZ3JhcGhEYXRhOiBPYnNlcnZhYmxlPFBhaXJbXT4pIHtcbiAgICAgICAgdGhpcy5ncmFwaERhdGEkID0gZ3JhcGhEYXRhXG4gICAgICAgIHRoaXMuaW5pdChjb250YWluZXIpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpbml0KGNvbnRhaW5lcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBkMy5zZWxlY3QoY29udGFpbmVyKS5hcHBlbmQoJ2cnKTtcblxuICAgICAgICB0aGlzLmdyYXBoRGF0YSQuc3Vic2NyaWJlKGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBub2RlRGljdCA9IGUucmVkdWNlPG5vZGVEaWN0aW9uYXJ5PigobnMsIHBhaXIpID0+IHtcbiAgICAgICAgICAgICAgICBuc1twYWlyLnN0YXJ0XSA9IHBhaXIuc3RhcnRcbiAgICAgICAgICAgICAgICBuc1twYWlyLmVuZF0gPSBwYWlyLmVuZFxuICAgICAgICAgICAgICAgIHJldHVybiBuc1xuICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlRGljdCwgJ25kJylcbiAgICAgICAgICAgIHRoaXMubm9kZU5hbWVzID0gT2JqZWN0LnZhbHVlcyhub2RlRGljdClcblxuICAgICAgICAgICAgY29uc3Qgbm9kZXM6IE5vZGVbXSA9IHRoaXMubm9kZU5hbWVzLm1hcCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7aW5kZXg6IGksIGlkOiB2fVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgbGlua3M6IExpbmtbXSA9IGUubWFwKHYgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7aWQ6IHYuc3RhcnQsIHNvdXJjZTogdi5zdGFydCwgdGFyZ2V0OiB2LmVuZCwgZGlyZWN0aW9uOiB2LmVkZ2V9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qgc2ltdWxhdGlvbjogU2ltdWxhdGlvbjxOb2RlLCBMaW5rPiA9IGQzLmZvcmNlU2ltdWxhdGlvbihub2RlcylcbiAgICAgICAgICAgICAgICAuZm9yY2UoXCJsaW5rXCIsIGQzLmZvcmNlTGluayhsaW5rcykuaWQoZCA9PiB0aGlzLm5vZGVOYW1lc1tkLmluZGV4XSB8fCBcInVua25vd25cIikpXG4gICAgICAgICAgICAgICAgLmZvcmNlKFwiY2hhcmdlXCIsIGQzLmZvcmNlTWFueUJvZHkoKSlcbiAgICAgICAgICAgICAgICAuZm9yY2UoXCJjZW50ZXJcIiwgZDMuZm9yY2VDZW50ZXIodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMikpXG4gICAgICAgICAgICAgICAgLmZvcmNlKCdjb2xsaXNpb24nLCBkMy5mb3JjZUNvbGxpZGUoKS5yYWRpdXMoMzApKTtcblxuXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJzdmdcIik7XG5cbiAgICAgICAgICAgIC8vYXJyb3dcbiAgICAgICAgICAgIHN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoXCJzdmc6bWFya2VyXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcInRyaWFuZ2xlXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsIFwiMCAtNSAxMCAxMFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwicmVmWFwiLCAxNSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInJlZllcIiwgLTEuNSlcbiAgICAgICAgICAgICAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsIDYpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiwgNilcbiAgICAgICAgICAgICAgICAuYXR0cihcIm9yaWVudFwiLCBcImF1dG9cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBzdmdcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwiLmxpbmVcIilcbiAgICAgICAgICAgICAgICAuZGF0YShsaW5rcylcbiAgICAgICAgICAgICAgICAuam9pbihcImxpbmVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS1vcGFjaXR5XCIsIDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGQgYXMgTGlua1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7bGluay5kaXJlY3Rpb259IGxpbmVgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cihcImRhdGEtbGlua1wiLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGQgYXMgTGlua1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobGluaylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWNlbnRlclwiLCBcInVybCgjdHJpYW5nbGUpXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGQgYXMgTGlua1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluay5kaXJlY3Rpb24gPT09IFwiaW5jcmVhc2VzXCIgPyBcImdyZWVuXCIgOiBcInJlZFwiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGQzLmludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKFwiLmxpbmVcIikuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICAgICAgLy9lYWNoIGxpbmUgZ2V0IHRoZSB0b3RhbCBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsTGVuZ3RoID0gNSAvLyBkLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vcGVyZm9ybSB0cmFuc2l0aW9uIGZvciBsaW5lIHVzaW5nIGRhc2hhcnJheSBhbmQgb2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2UtZGFzaGFycmF5XCIsIHRvdGFsTGVuZ3RoICsgXCIgXCIgKyB0b3RhbExlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgdG90YWxMZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZWFzZShkMy5lYXNlQ2lyY2xlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgMCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIDIwMClcblxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHN2Z1xuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoXCIubm9kZVwiKVxuICAgICAgICAgICAgICAgIC5kYXRhKG5vZGVzKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiZ1wiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJub2RlXCIpXG4gICAgICAgICAgICAgICAgLmNhbGwodGhpcy5kcmFnKHNpbXVsYXRpb24pKTtcblxuICAgICAgICAgICAgbm9kZS5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImJsYWNrXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMS41KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiclwiLCAyMClcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuXG4gICAgICAgICAgICAvKiBDcmVhdGUgdGhlIHRleHQgZm9yIGVhY2ggYmxvY2sgKi9cbiAgICAgICAgICAgIG5vZGUuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZHhcIiwgZCA9PiAtNSlcbiAgICAgICAgICAgICAgICAudGV4dCgoZDogTm9kZSkgPT4gdGhpcy5ub2RlTmFtZXNbZC5pbmRleF0pXG5cbiAgICAgICAgICAgIG5vZGUuYXBwZW5kKFwidGl0bGVcIilcbiAgICAgICAgICAgICAgICAudGV4dCgoZDogTm9kZSkgPT4gdGhpcy5ub2RlTmFtZXNbZC5pbmRleF0pO1xuXG4gICAgICAgICAgICBzaW11bGF0aW9uLm9uKFwidGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlua1xuICAgICAgICAgICAgICAgICAgICAuYXR0cihcIngxXCIsIChkOiBMaW5rKSA9PiAoZC5zb3VyY2UgYXMgTm9kZSkueClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5MVwiLCAoZDogTGluaykgPT4gKGQuc291cmNlIGFzIE5vZGUpLnkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDJcIiwgKGQ6IExpbmspID0+IChkLnRhcmdldCBhcyBOb2RlKS54KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInkyXCIsIChkOiBMaW5rKSA9PiAoZC50YXJnZXQgYXMgTm9kZSkueSk7XG5cbiAgICAgICAgICAgICAgICBub2RlXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGQgPT4gYHRyYW5zbGF0ZSgke2QueH0sICR7ZC55fSlgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG4iLCJleHBvcnQgY29uc3QgdG9TaXplZE5vZGVWZXJ0ZXhQYWlycyA9IChzOiBzdHJpbmcpOiBTaXplZFBhaXJzID0+IHtcbiAgICBjb25zdCBwYWlycyA9IHRvTm9kZVZlcnRleFBhaXJzKHMpXG5cbiAgICBjb25zdCBnYXRoZXJlZE5vZGVzID0gcGFpcnMucmVkdWNlPHtbaWQ6IHN0cmluZ106IFNpemVkTm9kZX0+KChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgaWYgKCFhY2NbY3Vyci5zdGFydF0pIHtcbiAgICAgICAgICAgIGFjY1tjdXJyLnN0YXJ0XSA9IHsgbmFtZTogY3Vyci5zdGFydCwgcmFkaXVzOiAwIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFjY1tjdXJyLmVuZF0pIHtcbiAgICAgICAgICAgIGFjY1tjdXJyLmVuZF0gPSB7IG5hbWU6IGN1cnIuZW5kLCByYWRpdXM6IDAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyLmVkZ2UgPT09IFwiaW5jcmVhc2VzXCIpIHtcbiAgICAgICAgICAgIGFjY1tjdXJyLmVuZF0ucmFkaXVzICs9IDVcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3Vyci5lZGdlID09PSBcImRlY3JlYXNlc1wiKSB7XG4gICAgICAgICAgICBhY2NbY3Vyci5lbmRdLnJhZGl1cyAtPSA1XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBub2RlczogT2JqZWN0LnZhbHVlcyhnYXRoZXJlZE5vZGVzKSxcbiAgICAgICAgbGlua3M6IHBhaXJzXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9Ob2RlVmVydGV4UGFpcnMgPSAoczogc3RyaW5nKTogQXJyYXk8UGFpcj4gPT5cbiAgICBzLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgIC5tYXAocGFyc2VMaW5lKVxuICAgICAgICAuZmlsdGVyKHggPT4geCAhPT0gbnVsbClcblxuZXhwb3J0IGludGVyZmFjZSBTaXplZFBhaXJzIHtcbiAgICBub2RlczogU2l6ZWROb2RlW10sXG4gICAgbGlua3M6IFBhaXJbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpemVkTm9kZSB7XG4gICAgbmFtZTogc3RyaW5nXG4gICAgcmFkaXVzOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWlyIHtcbiAgICBlZGdlOiBcImluY3JlYXNlc1wiIHwgXCJkZWNyZWFzZXNcIixcbiAgICBzdGFydDogc3RyaW5nXG4gICAgZW5kOiBzdHJpbmdcbn1cblxuY29uc3QgaXNMaW5raW5nQ2hhciA9ICh4OiBzdHJpbmcpID0+IHggPT09ICcrJyB8fCB4ID09PSAnLSc7XG5cbmZ1bmN0aW9uIGZpbmlzaGVkUmVhZGluZ1N0YXJ0KGluUXVvdGVkU3RyaW5nOiBib29sZWFuLCB4OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIWluUXVvdGVkU3RyaW5nICYmIGlzTGlua2luZ0NoYXIoeCk7XG59XG5cbmZ1bmN0aW9uIGlzV29yZEJvdW5kYXJ5KHg6IHN0cmluZykge1xuICAgIHJldHVybiB4ID09PSBcIlxcXCJcIjtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFBhaXIocG90ZW50aWFsOiB7IGVkZ2U6IHN0cmluZzsgc3RhcnQ6IHN0cmluZzsgZW5kOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiBwb3RlbnRpYWwuc3RhcnQgIT09IFwiXCIgJiYgcG90ZW50aWFsLmVuZCAhPT0gXCJcIiAmJiBpc0xpbmtpbmdDaGFyKHBvdGVudGlhbC5lZGdlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaW5lKHM6IHN0cmluZyk6IFBhaXIgfCBudWxsIHtcbiAgICBjb25zdCBwb3RlbnRpYWwgPSB7XG4gICAgICAgIGVkZ2U6IFwiXCIsXG4gICAgICAgIHN0YXJ0OiBcIlwiLFxuICAgICAgICBlbmQ6IFwiXCJcbiAgICB9XG5cbiAgICBsZXQgaW5RdW90ZWRTdHJpbmcgPSBmYWxzZVxuICAgIGxldCByZWFkaW5nU3RhcnQgPSB0cnVlXG5cbiAgICBzLnNwbGl0KCcnKVxuICAgICAgICAuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGlmIChpc1dvcmRCb3VuZGFyeSh4KSkge1xuICAgICAgICAgICAgICAgIGluUXVvdGVkU3RyaW5nID0gIWluUXVvdGVkU3RyaW5nXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbmlzaGVkUmVhZGluZ1N0YXJ0KGluUXVvdGVkU3RyaW5nLCB4KSkge1xuICAgICAgICAgICAgICAgIHBvdGVudGlhbC5lZGdlID0geFxuICAgICAgICAgICAgICAgIHJlYWRpbmdTdGFydCA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkaW5nU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcG90ZW50aWFsLnN0YXJ0ICs9IHhcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWwuZW5kICs9IHhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4gaXNWYWxpZFBhaXIocG90ZW50aWFsKSA/IHtcbiAgICAgICAgZWRnZTogcG90ZW50aWFsLmVkZ2UgPT09IFwiK1wiID8gXCJpbmNyZWFzZXNcIiA6IFwiZGVjcmVhc2VzXCIsXG4gICAgICAgIHN0YXJ0OiBwb3RlbnRpYWwuc3RhcnQsXG4gICAgICAgIGVuZDogcG90ZW50aWFsLmVuZFxuICAgIH0gOiBudWxsXG59Il0sInNvdXJjZVJvb3QiOiIifQ==