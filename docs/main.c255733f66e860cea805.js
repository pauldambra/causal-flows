!function(e){function t(t){for(var n,i,s=t[0],c=t[1],d=t[2],l=0,f=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(u&&u(t);f.length;)f.shift()();return a.push.apply(a,d||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==o[c]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={0:0},a=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var u=c;a.push(["/7QA",1]),r()}({"/7QA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("DtyJ"),o=r("ahDk"),a=r("CO/c"),i=r("6luj"),s=n.fromEvent(document.getElementById("diagram-text"),"input").pipe(o.map(e=>e.target),o.map(e=>e.value),o.debounceTime(375),o.map(a.toSizedNodeVertexPairs));new i.chart("#outlet",s)},"6luj":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.chart=void 0;const n=r("VphZ");t.chart=class{constructor(e,t){this.width=900,this.height=500,this.drag=e=>n.drag().on("start",(function(t){n.event.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y})).on("drag",(function(e){e.fx=n.event.x,e.fy=n.event.y})).on("end",(function(t){n.event.active||e.alphaTarget(0),t.fx=null,t.fy=null})),this.graphData$=t,this.init(e)}init(e){this.group=n.select(e).append("g"),this.graphData$.subscribe(e=>{this.sizedNodes=e.nodes,console.log(this.sizedNodes);const t=this.sizedNodes.map((e,t)=>({index:t,id:e})),r=e.links.map(e=>({id:e.source,source:e.source,target:e.target,direction:e.edge})),o=n.forceSimulation(t).force("link",n.forceLink(r).id(e=>this.sizedNodes[e.index].name||"unknown")).force("charge",n.forceManyBody()).force("center",n.forceCenter(this.width/2,this.height/2)).force("collision",n.forceCollide().radius(e=>this.sizedNodes[e.index].radius+50)),a=n.select("svg"),i=a.selectAll(".line").data(r).join("line").attr("stroke-opacity",1).attr("class",e=>e.direction+" line").attr("data-link",e=>{const t=e;return JSON.stringify(t)}).attr("marker-center","url(#triangle)").attr("stroke-width",2).attr("stroke",e=>"increases"===e.direction?"green":"red");n.interval(()=>{a.selectAll(".line").each((function(e){n.select(this).attr("stroke-dasharray","5 5").attr("stroke-dashoffset",5).transition().ease(n.easeCircle).duration(200).attr("stroke-dashoffset",0)}))},200);const s=a.selectAll(".node").data(t).join("g").attr("class","node").call(this.drag(o));s.append("circle").attr("stroke","black").attr("stroke-width",1.5).attr("r",e=>this.sizedNodes[e.index].radius+30).attr("fill","white"),s.append("text").attr("dx",e=>-5).text(e=>this.sizedNodes[e.index].name),s.append("title").text(e=>this.sizedNodes[e.index].name),o.on("tick",()=>{i.attr("x1",e=>e.source.x).attr("y1",e=>e.source.y).attr("x2",e=>e.target.x).attr("y2",e=>e.target.y),s.attr("transform",e=>`translate(${e.x}, ${e.y})`)})})}}},"CO/c":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toNodeVertexPairs=t.toSizedNodeVertexPairs=void 0,t.toSizedNodeVertexPairs=e=>{const r=t.toNodeVertexPairs(e),n=r.reduce((e,t)=>(e[t.source]||(e[t.source]={name:t.source,radius:0}),e[t.target]||(e[t.target]={name:t.target,radius:0}),"increases"===t.edge&&(e[t.target].radius+=5),"decreases"===t.edge&&(e[t.target].radius-=5),e),{});return{nodes:Object.values(n),links:r}},t.toNodeVertexPairs=e=>e.split("\n").map(o).filter(e=>null!==e);const n=e=>"+"===e||"-"===e;function o(e){const t={edge:"",start:"",end:""};let r=!1,o=!0;return e.split("").forEach(e=>{!function(e){return'"'===e}(e)?!function(e,t){return!e&&n(t)}(r,e)?o?t.start+=e:t.end+=e:(t.edge=e,o=!1):r=!r}),function(e){return""!==e.start&&""!==e.end&&n(e.edge)}(t)?{edge:"+"===t.edge?"increases":"decreases",source:t.start,target:t.end}:null}}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jaGFydC9jaGFydGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UtZGVzY3JpcHRpb24vcGFyc2UudHMiXSwibmFtZXMiOlsid2VicGFja0pzb25wQ2FsbGJhY2siLCJkYXRhIiwibW9kdWxlSWQiLCJjaHVua0lkIiwiY2h1bmtJZHMiLCJtb3JlTW9kdWxlcyIsImV4ZWN1dGVNb2R1bGVzIiwiaSIsInJlc29sdmVzIiwibGVuZ3RoIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaW5zdGFsbGVkQ2h1bmtzIiwicHVzaCIsIm1vZHVsZXMiLCJwYXJlbnRKc29ucEZ1bmN0aW9uIiwic2hpZnQiLCJkZWZlcnJlZE1vZHVsZXMiLCJhcHBseSIsImNoZWNrRGVmZXJyZWRNb2R1bGVzIiwicmVzdWx0IiwiZGVmZXJyZWRNb2R1bGUiLCJmdWxmaWxsZWQiLCJqIiwiZGVwSWQiLCJzcGxpY2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwicyIsImluc3RhbGxlZE1vZHVsZXMiLCIwIiwiZXhwb3J0cyIsIm1vZHVsZSIsImwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsImpzb25wQXJyYXkiLCJ3aW5kb3ciLCJvbGRKc29ucEZ1bmN0aW9uIiwic2xpY2UiLCJkaWFncmFtRGVzY3JpcHRpb24kIiwiZnJvbUV2ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBpcGUiLCJtYXAiLCJlIiwidGFyZ2V0IiwiZGVib3VuY2VUaW1lIiwidG9TaXplZE5vZGVWZXJ0ZXhQYWlycyIsImNoYXJ0IiwiY29udGFpbmVyIiwiZ3JhcGhEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJkcmFnIiwic2ltdWxhdGlvbiIsImQzIiwib24iLCJldmVudCIsImFjdGl2ZSIsImFscGhhVGFyZ2V0IiwicmVzdGFydCIsImZ4IiwieCIsImZ5IiwieSIsInRoaXMiLCJncmFwaERhdGEkIiwiaW5pdCIsImdyb3VwIiwic2VsZWN0IiwiYXBwZW5kIiwic3Vic2NyaWJlIiwic2l6ZWROb2RlcyIsIm5vZGVzIiwiY29uc29sZSIsImxvZyIsInYiLCJpbmRleCIsImlkIiwibGlua3MiLCJzb3VyY2UiLCJkaXJlY3Rpb24iLCJlZGdlIiwiZm9yY2VTaW11bGF0aW9uIiwiZm9yY2UiLCJmb3JjZUxpbmsiLCJmb3JjZU1hbnlCb2R5IiwiZm9yY2VDZW50ZXIiLCJmb3JjZUNvbGxpZGUiLCJyYWRpdXMiLCJzdmciLCJsaW5rIiwic2VsZWN0QWxsIiwiam9pbiIsImF0dHIiLCJKU09OIiwic3RyaW5naWZ5IiwiaW50ZXJ2YWwiLCJlYWNoIiwidG90YWxMZW5ndGgiLCJ0cmFuc2l0aW9uIiwiZWFzZSIsImVhc2VDaXJjbGUiLCJkdXJhdGlvbiIsIm5vZGUiLCJ0ZXh0IiwicGFpcnMiLCJ0b05vZGVWZXJ0ZXhQYWlycyIsImdhdGhlcmVkTm9kZXMiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwidmFsdWVzIiwic3BsaXQiLCJwYXJzZUxpbmUiLCJmaWx0ZXIiLCJpc0xpbmtpbmdDaGFyIiwicG90ZW50aWFsIiwic3RhcnQiLCJlbmQiLCJpblF1b3RlZFN0cmluZyIsInJlYWRpbmdTdGFydCIsImZvckVhY2giLCJpc1dvcmRCb3VuZGFyeSIsImZpbmlzaGVkUmVhZGluZ1N0YXJ0IiwiaXNWYWxpZFBhaXIiXSwibWFwcGluZ3MiOiJhQUNFLFNBQVNBLEVBQXFCQyxHQVE3QixJQVBBLElBTUlDLEVBQVVDLEVBTlZDLEVBQVdILEVBQUssR0FDaEJJLEVBQWNK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R0FDakIsTUFBMkIsS0FBcEJBLEVBQVVDLE9BQWtDLEtBQWxCRCxFQUFVRSxLQUFjSCxFQUFjQyxFQUFVbkMsTUE2QjFFMkMsQ0FBWVIsR0FBYSxDQUM1Qm5DLEtBQXlCLE1BQW5CbUMsRUFBVW5DLEtBQWUsWUFBYyxZQUM3Q0YsT0FBUXFDLEVBQVVDLE1BQ2xCekUsT0FBUXdFLEVBQVVFLEtBQ2xCIiwiZmlsZSI6Im1haW4uYzI1NTczM2Y2NmU4NjBjZWE4MDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDA6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLzdRQVwiLDFdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIG1hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge3RvU2l6ZWROb2RlVmVydGV4UGFpcnN9IGZyb20gXCIuL3BhcnNlLWRlc2NyaXB0aW9uL3BhcnNlXCI7XG5pbXBvcnQge2NoYXJ0fSBmcm9tIFwiLi9jaGFydC9jaGFydGluZ1wiO1xuXG5cblxuY29uc3QgZGlhZ3JhbURlc2NyaXB0aW9uJCA9IGZyb21FdmVudDxJbnB1dEV2ZW50Pihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhZ3JhbS10ZXh0JyksICdpbnB1dCcpXG4gICAgLnBpcGUoXG4gICAgICAgIG1hcChlID0+IChlLnRhcmdldCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KSksXG4gICAgICAgIG1hcChlID0+IGUudmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzc1KSxcbiAgICAgICAgbWFwKHRvU2l6ZWROb2RlVmVydGV4UGFpcnMpXG4gICAgKTtcblxubmV3IGNoYXJ0KCcjb3V0bGV0JywgZGlhZ3JhbURlc2NyaXB0aW9uJCkiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7UGFpciwgU2l6ZWROb2RlLCBTaXplZFBhaXJzfSBmcm9tIFwiLi4vcGFyc2UtZGVzY3JpcHRpb24vcGFyc2VcIjtcbmltcG9ydCB7U2ltdWxhdGlvbk5vZGVEYXR1bSwgU2ltdWxhdGlvbkxpbmtEYXR1bX0gZnJvbSBcImQzXCI7XG5pbXBvcnQge1NpbXVsYXRpb259IGZyb20gXCJkMy1mb3JjZVwiO1xuXG5pbnRlcmZhY2UgTm9kZSBleHRlbmRzIFNpbXVsYXRpb25Ob2RlRGF0dW0ge1xufVxuXG5pbnRlcmZhY2UgTGluayBleHRlbmRzIFNpbXVsYXRpb25MaW5rRGF0dW08Tm9kZT4ge1xuICAgIGRpcmVjdGlvbjogXCJpbmNyZWFzZXNcIiB8IFwiZGVjcmVhc2VzXCJcbn1cblxuZXhwb3J0IGNsYXNzIGNoYXJ0IHtcbiAgICBwcml2YXRlIGdyb3VwOiBkMy5TZWxlY3Rpb248YW55LCBhbnksIGFueSwgYW55PjtcbiAgICBwcml2YXRlIGdyYXBoRGF0YSQ6IE9ic2VydmFibGU8U2l6ZWRQYWlycz47XG4gICAgcHJpdmF0ZSBzaXplZE5vZGVzOiBTaXplZE5vZGVbXVxuICAgIHByaXZhdGUgd2lkdGggPSA5MDBcbiAgICBwcml2YXRlIGhlaWdodCA9IDUwMFxuXG4gICAgcHJpdmF0ZSBkcmFnID0gKHNpbXVsYXRpb246IFNpbXVsYXRpb248Tm9kZSwgTGluaz4pID0+IHtcblxuICAgICAgICBmdW5jdGlvbiBkcmFnc3RhcnRlZChkOiBOb2RlKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LmFjdGl2ZSkgc2ltdWxhdGlvbi5hbHBoYVRhcmdldCgwLjMpLnJlc3RhcnQoKTtcbiAgICAgICAgICAgIGQuZnggPSBkLng7XG4gICAgICAgICAgICBkLmZ5ID0gZC55O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZ2dlZChkOiBOb2RlKSB7XG4gICAgICAgICAgICBkLmZ4ID0gZDMuZXZlbnQueDtcbiAgICAgICAgICAgIGQuZnkgPSBkMy5ldmVudC55O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZ2VuZGVkKGQ6IE5vZGUpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuYWN0aXZlKSBzaW11bGF0aW9uLmFscGhhVGFyZ2V0KDApO1xuICAgICAgICAgICAgZC5meCA9IG51bGw7XG4gICAgICAgICAgICBkLmZ5ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkMy5kcmFnKClcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGRyYWdzdGFydGVkKVxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBkcmFnZ2VkKVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGRyYWdlbmRlZCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBzdHJpbmcsIGdyYXBoRGF0YTogT2JzZXJ2YWJsZTxTaXplZFBhaXJzPikge1xuICAgICAgICB0aGlzLmdyYXBoRGF0YSQgPSBncmFwaERhdGFcbiAgICAgICAgdGhpcy5pbml0KGNvbnRhaW5lcik7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXQoY29udGFpbmVyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5ncm91cCA9IGQzLnNlbGVjdChjb250YWluZXIpLmFwcGVuZCgnZycpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGhEYXRhJC5zdWJzY3JpYmUoZSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2l6ZWROb2RlcyA9IGUubm9kZXNcbmNvbnNvbGUubG9nKHRoaXMuc2l6ZWROb2RlcylcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBOb2RlW10gPSB0aGlzLnNpemVkTm9kZXMubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtpbmRleDogaSwgaWQ6IHZ9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCBsaW5rczogTGlua1tdID0gZS5saW5rcy5tYXAodiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtpZDogdi5zb3VyY2UsIHNvdXJjZTogdi5zb3VyY2UsIHRhcmdldDogdi50YXJnZXQsIGRpcmVjdGlvbjogdi5lZGdlfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNpbXVsYXRpb246IFNpbXVsYXRpb248Tm9kZSwgTGluaz4gPSBkMy5mb3JjZVNpbXVsYXRpb24obm9kZXMpXG4gICAgICAgICAgICAgICAgLmZvcmNlKFwibGlua1wiLCBkMy5mb3JjZUxpbmsobGlua3MpLmlkKGQgPT4gdGhpcy5zaXplZE5vZGVzW2QuaW5kZXhdLm5hbWUgfHwgXCJ1bmtub3duXCIpKVxuICAgICAgICAgICAgICAgIC5mb3JjZShcImNoYXJnZVwiLCBkMy5mb3JjZU1hbnlCb2R5KCkpXG4gICAgICAgICAgICAgICAgLmZvcmNlKFwiY2VudGVyXCIsIGQzLmZvcmNlQ2VudGVyKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpKVxuICAgICAgICAgICAgICAgIC5mb3JjZSgnY29sbGlzaW9uJywgZDMuZm9yY2VDb2xsaWRlKCkucmFkaXVzKGQgPT4gdGhpcy5zaXplZE5vZGVzW2QuaW5kZXhdLnJhZGl1cyArIDUwKSk7XG5cblxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwic3ZnXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gc3ZnXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbChcIi5saW5lXCIpXG4gICAgICAgICAgICAgICAgLmRhdGEobGlua3MpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJsaW5lXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utb3BhY2l0eVwiLCAxKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkIGFzIExpbmtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2xpbmsuZGlyZWN0aW9ufSBsaW5lYFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJkYXRhLWxpbmtcIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkIGFzIExpbmtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGxpbmspXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cihcIm1hcmtlci1jZW50ZXJcIiwgXCJ1cmwoI3RyaWFuZ2xlKVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkIGFzIExpbmtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmsuZGlyZWN0aW9uID09PSBcImluY3JlYXNlc1wiID8gXCJncmVlblwiIDogXCJyZWRcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkMy5pbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5saW5lXCIpLmVhY2goZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgICAgIC8vZWFjaCBsaW5lIGdldCB0aGUgdG90YWwgbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbExlbmd0aCA9IDUgLy8gZC5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICAvL3BlcmZvcm0gdHJhbnNpdGlvbiBmb3IgbGluZSB1c2luZyBkYXNoYXJyYXkgYW5kIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLWRhc2hhcnJheVwiLCB0b3RhbExlbmd0aCArIFwiIFwiICsgdG90YWxMZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS1kYXNob2Zmc2V0XCIsIHRvdGFsTGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUNpcmNsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAyMDApXG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBzdmdcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwiLm5vZGVcIilcbiAgICAgICAgICAgICAgICAuZGF0YShub2RlcylcbiAgICAgICAgICAgICAgICAuam9pbihcImdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibm9kZVwiKVxuICAgICAgICAgICAgICAgIC5jYWxsKHRoaXMuZHJhZyhzaW11bGF0aW9uKSk7XG5cbiAgICAgICAgICAgIG5vZGUuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEuNSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInJcIiwgZCA9PiB0aGlzLnNpemVkTm9kZXNbZC5pbmRleF0ucmFkaXVzICsgMzApXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIilcblxuICAgICAgICAgICAgLyogQ3JlYXRlIHRoZSB0ZXh0IGZvciBlYWNoIGJsb2NrICovXG4gICAgICAgICAgICBub2RlLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImR4XCIsIGQgPT4gLTUpXG4gICAgICAgICAgICAgICAgLnRleHQoKGQ6IE5vZGUpID0+IHRoaXMuc2l6ZWROb2Rlc1tkLmluZGV4XS5uYW1lKVxuXG4gICAgICAgICAgICBub2RlLmFwcGVuZChcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLnRleHQoKGQ6IE5vZGUpID0+IHRoaXMuc2l6ZWROb2Rlc1tkLmluZGV4XS5uYW1lKTtcblxuICAgICAgICAgICAgc2ltdWxhdGlvbi5vbihcInRpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ4MVwiLCAoZDogTGluaykgPT4gKGQuc291cmNlIGFzIE5vZGUpLngpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTFcIiwgKGQ6IExpbmspID0+IChkLnNvdXJjZSBhcyBOb2RlKS55KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcIngyXCIsIChkOiBMaW5rKSA9PiAoZC50YXJnZXQgYXMgTm9kZSkueClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5MlwiLCAoZDogTGluaykgPT4gKGQudGFyZ2V0IGFzIE5vZGUpLnkpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IGB0cmFuc2xhdGUoJHtkLnh9LCAke2QueX0pYCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KVxuICAgIH1cbn1cblxuIiwiZXhwb3J0IGNvbnN0IHRvU2l6ZWROb2RlVmVydGV4UGFpcnMgPSAoczogc3RyaW5nKTogU2l6ZWRQYWlycyA9PiB7XG4gICAgY29uc3QgcGFpcnMgPSB0b05vZGVWZXJ0ZXhQYWlycyhzKVxuXG4gICAgY29uc3QgZ2F0aGVyZWROb2RlcyA9IHBhaXJzLnJlZHVjZTx7W2lkOiBzdHJpbmddOiBTaXplZE5vZGV9PigoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgIGlmICghYWNjW2N1cnIuc291cmNlXSkge1xuICAgICAgICAgICAgYWNjW2N1cnIuc291cmNlXSA9IHsgbmFtZTogY3Vyci5zb3VyY2UsIHJhZGl1czogMCB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhY2NbY3Vyci50YXJnZXRdKSB7XG4gICAgICAgICAgICBhY2NbY3Vyci50YXJnZXRdID0geyBuYW1lOiBjdXJyLnRhcmdldCwgcmFkaXVzOiAwIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY3Vyci5lZGdlID09PSBcImluY3JlYXNlc1wiKSB7XG4gICAgICAgICAgICBhY2NbY3Vyci50YXJnZXRdLnJhZGl1cyArPSA1XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnIuZWRnZSA9PT0gXCJkZWNyZWFzZXNcIikge1xuICAgICAgICAgICAgYWNjW2N1cnIudGFyZ2V0XS5yYWRpdXMgLT0gNVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2NcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZXM6IE9iamVjdC52YWx1ZXMoZ2F0aGVyZWROb2RlcyksXG4gICAgICAgIGxpbmtzOiBwYWlyc1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvTm9kZVZlcnRleFBhaXJzID0gKHM6IHN0cmluZyk6IEFycmF5PFBhaXI+ID0+XG4gICAgcy5zcGxpdChcIlxcblwiKVxuICAgICAgICAubWFwKHBhcnNlTGluZSlcbiAgICAgICAgLmZpbHRlcih4ID0+IHggIT09IG51bGwpXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2l6ZWRQYWlycyB7XG4gICAgbm9kZXM6IFNpemVkTm9kZVtdLFxuICAgIGxpbmtzOiBQYWlyW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaXplZE5vZGUge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHJhZGl1czogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFpciB7XG4gICAgZWRnZTogXCJpbmNyZWFzZXNcIiB8IFwiZGVjcmVhc2VzXCIsXG4gICAgc291cmNlOiBzdHJpbmdcbiAgICB0YXJnZXQ6IHN0cmluZ1xufVxuXG5jb25zdCBpc0xpbmtpbmdDaGFyID0gKHg6IHN0cmluZykgPT4geCA9PT0gJysnIHx8IHggPT09ICctJztcblxuZnVuY3Rpb24gZmluaXNoZWRSZWFkaW5nU3RhcnQoaW5RdW90ZWRTdHJpbmc6IGJvb2xlYW4sIHg6IHN0cmluZykge1xuICAgIHJldHVybiAhaW5RdW90ZWRTdHJpbmcgJiYgaXNMaW5raW5nQ2hhcih4KTtcbn1cblxuZnVuY3Rpb24gaXNXb3JkQm91bmRhcnkoeDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHggPT09IFwiXFxcIlwiO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUGFpcihwb3RlbnRpYWw6IHsgZWRnZTogc3RyaW5nOyBzdGFydDogc3RyaW5nOyBlbmQ6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHBvdGVudGlhbC5zdGFydCAhPT0gXCJcIiAmJiBwb3RlbnRpYWwuZW5kICE9PSBcIlwiICYmIGlzTGlua2luZ0NoYXIocG90ZW50aWFsLmVkZ2UpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUxpbmUoczogc3RyaW5nKTogUGFpciB8IG51bGwge1xuICAgIGNvbnN0IHBvdGVudGlhbCA9IHtcbiAgICAgICAgZWRnZTogXCJcIixcbiAgICAgICAgc3RhcnQ6IFwiXCIsXG4gICAgICAgIGVuZDogXCJcIlxuICAgIH1cblxuICAgIGxldCBpblF1b3RlZFN0cmluZyA9IGZhbHNlXG4gICAgbGV0IHJlYWRpbmdTdGFydCA9IHRydWVcblxuICAgIHMuc3BsaXQoJycpXG4gICAgICAgIC5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgaWYgKGlzV29yZEJvdW5kYXJ5KHgpKSB7XG4gICAgICAgICAgICAgICAgaW5RdW90ZWRTdHJpbmcgPSAhaW5RdW90ZWRTdHJpbmdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmluaXNoZWRSZWFkaW5nU3RhcnQoaW5RdW90ZWRTdHJpbmcsIHgpKSB7XG4gICAgICAgICAgICAgICAgcG90ZW50aWFsLmVkZ2UgPSB4XG4gICAgICAgICAgICAgICAgcmVhZGluZ1N0YXJ0ID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWRpbmdTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWwuc3RhcnQgKz0geFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvdGVudGlhbC5lbmQgKz0geFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIHJldHVybiBpc1ZhbGlkUGFpcihwb3RlbnRpYWwpID8ge1xuICAgICAgICBlZGdlOiBwb3RlbnRpYWwuZWRnZSA9PT0gXCIrXCIgPyBcImluY3JlYXNlc1wiIDogXCJkZWNyZWFzZXNcIixcbiAgICAgICAgc291cmNlOiBwb3RlbnRpYWwuc3RhcnQsXG4gICAgICAgIHRhcmdldDogcG90ZW50aWFsLmVuZFxuICAgIH0gOiBudWxsXG59Il0sInNvdXJjZVJvb3QiOiIifQ==