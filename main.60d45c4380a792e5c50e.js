!function(e){function t(t){for(var n,s,i=t[0],l=t[1],c=t[2],u=0,f=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(d&&d(t);f.length;)f.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var l=r[i];0!==a[l]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={0:0},o=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var d=l;o.push(["/7QA",1]),r()}({"/7QA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("DtyJ"),a=r("ahDk"),o=r("CO/c"),s=r("6luj"),i=n.fromEvent(document.getElementById("diagram-text"),"input").pipe(a.map(e=>e.target),a.map(e=>e.value),a.debounceTime(375),a.map(o.toSizedNodeVertexPairs));s.init("#outlet",i)},"6luj":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;const n=r("VphZ"),a=r("ahDk");t.init=(e,t)=>{const r=n.select(e),o=r.append("g").attr("class","lines");let s;t.pipe(a.map(e=>{const t=e.nodes,r=t.map((e,t)=>({index:t,id:e}));return{sizedNodes:t,nodes:r,links:e.links.map(e=>({id:e.source,source:e.source,target:e.target,direction:e.edge}))}})).subscribe(e=>{const t=n.forceSimulation(e.nodes).force("link",n.forceLink(e.links).id(t=>e.sizedNodes[t.index].name||"unknown")).force("charge",n.forceManyBody()).force("center",n.forceCenter(450,250)).force("collision",n.forceCollide().radius(t=>e.sizedNodes[t.index].radius+50)),a=o.selectAll(".line").data(e.links).join("line").attr("stroke-opacity",1).attr("class",e=>e.direction+" line").attr("data-link",e=>{const t=e;return JSON.stringify(t)}).attr("marker-center","url(#triangle)").attr("stroke-width",2).attr("stroke-dasharray","5 5").attr("stroke-dashoffset",5).attr("stroke",e=>"increases"===e.direction?"green":"red").call(()=>{s||(s=n.interval(()=>{console.log("in interval"),r.selectAll(".line").each((function(e){n.select(this).attr("stroke-dasharray","5 5").attr("stroke-dashoffset",5).transition().ease(n.easeCircle).attr("stroke-dashoffset",0)}))},300))}),i=r.selectAll(".node").data(e.nodes).join("g").attr("class","node").call(()=>(e=>n.drag().on("start",t=>{n.event.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y}).on("drag",e=>{e.fx=n.event.x,e.fy=n.event.y}).on("end",t=>{n.event.active||e.alphaTarget(0),t.fx=null,t.fy=null}))(t));i.selectAll("circle").remove(),i.selectAll("text").remove(),i.append("circle").attr("stroke","black").attr("stroke-width",1.5).attr("r",t=>(e=>e.radius+60)(e.sizedNodes[t.index])).attr("fill","white"),i.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").text(t=>e.sizedNodes[t.index].name),t.on("tick",()=>{a.attr("x1",e=>e.source.x).attr("y1",e=>e.source.y).attr("x2",e=>e.target.x).attr("y2",e=>e.target.y),i.attr("transform",e=>`translate(${e.x}, ${e.y})`)})})}},"CO/c":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toNodeVertexPairs=t.toSizedNodeVertexPairs=void 0;const n=e=>"+"===e||"-"===e,a=e=>{const t={edge:"",start:"",end:""};let r=!1,a=!0;return e.split("").forEach(e=>{(e=>'"'===e)(e)?r=!r:((e,t)=>!e&&n(t))(r,e)?(t.edge=e,a=!1):a?t.start+=e:t.end+=e}),(e=>""!==e.start&&""!==e.end&&n(e.edge))(t)?{edge:"+"===t.edge?"increases":"decreases",source:t.start.trim(),target:t.end.trim()}:null};t.toSizedNodeVertexPairs=e=>{const r=t.toNodeVertexPairs(e),n=r.reduce((e,t)=>(e[t.source]||(e[t.source]={name:t.source,radius:0}),e[t.target]||(e[t.target]={name:t.target,radius:0}),"increases"===t.edge&&(e[t.target].radius+=5),"decreases"===t.edge&&(e[t.target].radius-=5),e),{});return{nodes:Object.values(n),links:r}},t.toNodeVertexPairs=e=>e.split("\n").map(a).filter(e=>null!==e)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jaGFydC9jaGFydGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UtZGVzY3JpcHRpb24vcGFyc2UudHMiXSwibmFtZXMiOlsid2VicGFja0pzb25wQ2FsbGJhY2siLCJkYXRhIiwibW9kdWxlSWQiLCJjaHVua0lkIiwiY2h1bmtJZHMiLCJtb3JlTW9kdWxlcyIsImV4ZWN1dGVNb2R1bGVzIiwiaSIsInJlc29sdmVzIiwibGVuZ3RoIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaW5zdGFsbGVkQ2h1bmtzIiwicHVzaCIsIm1vZHVsZXMiLCJwYXJlbnRKc29ucEZ1bmN0aW9uIiwic2hpZnQiLCJkZWZlcnJlZE1vZHVsZXMiLCJhcHBseSIsImNoZWNrRGVmZXJyZWRNb2R1bGVzIiwicmVzdWx0IiwiZGVmZXJyZWRNb2R1bGUiLCJmdWxmaWxsZWQiLCJqIiwiZGVwSWQiLCJzcGxpY2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwicyIsImluc3RhbGxlZE1vZHVsZXMiLCIwIiwiZXhwb3J0cyIsIm1vZHVsZSIsImwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsImpzb25wQXJyYXkiLCJ3aW5kb3ciLCJvbGRKc29ucEZ1bmN0aW9uIiwic2xpY2UiLCJkaWFncmFtRGVzY3JpcHRpb24kIiwiZnJvbUV2ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBpcGUiLCJtYXAiLCJlIiwidGFyZ2V0IiwiZGVib3VuY2VUaW1lIiwidG9TaXplZE5vZGVWZXJ0ZXhQYWlycyIsImluaXQiLCJjb250YWluZXIiLCJncmFwaERhdGEkIiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJsaW5lc0dyb3VwIiwiYXBwZW5kIiwiYXR0ciIsImxpbmVBbmltYXRpb24iLCJ4Iiwic2l6ZWROb2RlcyIsIm5vZGVzIiwidiIsImluZGV4IiwiaWQiLCJsaW5rcyIsInNvdXJjZSIsImRpcmVjdGlvbiIsImVkZ2UiLCJzdWJzY3JpYmUiLCJzaW11bGF0aW9uIiwiZm9yY2VTaW11bGF0aW9uIiwiZm9yY2UiLCJmb3JjZUxpbmsiLCJmb3JjZU1hbnlCb2R5IiwiZm9yY2VDZW50ZXIiLCJmb3JjZUNvbGxpZGUiLCJyYWRpdXMiLCJsaW5rIiwic2VsZWN0QWxsIiwiam9pbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbnRlcnZhbCIsImNvbnNvbGUiLCJsb2ciLCJlYWNoIiwidGhpcyIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUNpcmNsZSIsIm5vZGUiLCJkcmFnIiwib24iLCJldmVudCIsImFjdGl2ZSIsImFscGhhVGFyZ2V0IiwicmVzdGFydCIsImZ4IiwiZnkiLCJ5IiwicmVtb3ZlIiwic2l6ZWROb2RlIiwiY2FsY3VsYXRlUmFkaXVzIiwidGV4dCIsImlzTGlua2luZ0NoYXIiLCJwYXJzZUxpbmUiLCJwb3RlbnRpYWwiLCJzdGFydCIsImVuZCIsImluUXVvdGVkU3RyaW5nIiwicmVhZGluZ1N0YXJ0Iiwic3BsaXQiLCJmb3JFYWNoIiwiaXNXb3JkQm91bmRhcnkiLCJmaW5pc2hlZFJlYWRpbmdTdGFydCIsImlzVmFsaWRQYWlyIiwidHJpbSIsInBhaXJzIiwidG9Ob2RlVmVydGV4UGFpcnMiLCJnYXRoZXJlZE5vZGVzIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsInZhbHVlcyIsImZpbHRlciJdLCJtYXBwaW5ncyI6ImFBQ0UsU0FBU0EsRUFBcUJDLEdBUTdCLElBUEEsSUFNSUMsRUFBVUMsRUFOVkMsRUFBV0gsRUFBSyxHQUNoQkks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QyxFQUFLdkQsT0FDTHNELEVBQUlDLEVBQUs3RSxRQUFRK0IsUUFBVSxHQUV4QjZDLEdBQ1IsSUFDSCxNQUFPLENBQ0g3RCxNQUFPM0UsT0FBTzBJLE9BQU9KLEdBQ3JCdkQsTUFBT3FELElBSUYsRUFBQUMsa0JBQXFCbEgsR0FDOUJBLEVBQUUyRyxNQUFNLE1BQ0hwRSxJQUFJOEQsR0FDSm1CLE9BQU9sRSxHQUFXLE9BQU5BIiwiZmlsZSI6Im1haW4uNjBkNDVjNDM4MGE3OTJlNWM1MGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDA6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLzdRQVwiLDFdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIG1hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge3RvU2l6ZWROb2RlVmVydGV4UGFpcnN9IGZyb20gXCIuL3BhcnNlLWRlc2NyaXB0aW9uL3BhcnNlXCI7XG5pbXBvcnQge2luaXR9IGZyb20gXCIuL2NoYXJ0L2NoYXJ0aW5nXCI7XG5cblxuXG5jb25zdCBkaWFncmFtRGVzY3JpcHRpb24kID0gZnJvbUV2ZW50PElucHV0RXZlbnQ+KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFncmFtLXRleHQnKSwgJ2lucHV0JylcbiAgICAucGlwZShcbiAgICAgICAgbWFwKGUgPT4gKGUudGFyZ2V0IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpKSxcbiAgICAgICAgbWFwKGUgPT4gZS52YWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgzNzUpLFxuICAgICAgICBtYXAodG9TaXplZE5vZGVWZXJ0ZXhQYWlycylcbiAgICApO1xuXG5pbml0KCcjb3V0bGV0JywgZGlhZ3JhbURlc2NyaXB0aW9uJCkiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcbmltcG9ydCB7RHJhZ0JlaGF2aW9yLCBEcmFnZ2VkRWxlbWVudEJhc2VUeXBlLCBTaW11bGF0aW9uTGlua0RhdHVtLCBTaW11bGF0aW9uTm9kZURhdHVtfSBmcm9tIFwiZDNcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7U2l6ZWROb2RlLCBTaXplZFBhaXJzfSBmcm9tIFwiLi4vcGFyc2UtZGVzY3JpcHRpb24vcGFyc2VcIjtcbmltcG9ydCB7U2ltdWxhdGlvbn0gZnJvbSBcImQzLWZvcmNlXCI7XG5pbXBvcnQge21hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbmludGVyZmFjZSBLZXllZCB7XG4gICAgaWQ6IFNpemVkTm9kZVxufVxuXG5pbnRlcmZhY2UgTm9kZSBleHRlbmRzIFNpbXVsYXRpb25Ob2RlRGF0dW0ge1xufVxuXG5pbnRlcmZhY2UgTGluayBleHRlbmRzIFNpbXVsYXRpb25MaW5rRGF0dW08Tm9kZT4ge1xuICAgIGRpcmVjdGlvbjogXCJpbmNyZWFzZXNcIiB8IFwiZGVjcmVhc2VzXCJcbn1cblxuY29uc3QgY2FsY3VsYXRlUmFkaXVzID0gKHNpemVkTm9kZTogU2l6ZWROb2RlKTogbnVtYmVyID0+IHNpemVkTm9kZS5yYWRpdXMgKyA2MDtcblxuY29uc3QgZHJhZyA9IChzaW11bGF0aW9uOiBTaW11bGF0aW9uPE5vZGUsIExpbms+KTogRHJhZ0JlaGF2aW9yPERyYWdnZWRFbGVtZW50QmFzZVR5cGUsIHVua25vd24sIHVua25vd24+ID0+IHtcblxuICAgIGNvbnN0IG9uRHJhZ1N0YXJ0ID0gKGQ6IE5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMC4zKS5yZXN0YXJ0KCk7XG4gICAgICAgIGQuZnggPSBkLng7XG4gICAgICAgIGQuZnkgPSBkLnk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRHJhZyA9IChkOiBOb2RlKSA9PiB7XG4gICAgICAgIGQuZnggPSBkMy5ldmVudC54O1xuICAgICAgICBkLmZ5ID0gZDMuZXZlbnQueTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25EcmFnRW5kID0gKGQ6IE5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMCk7XG4gICAgICAgIGQuZnggPSBudWxsO1xuICAgICAgICBkLmZ5ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgY29uc3QgZHJhZyA9IGQzLmRyYWcoKSBhcyBEcmFnQmVoYXZpb3I8RHJhZ2dlZEVsZW1lbnRCYXNlVHlwZSwgdW5rbm93biwgdW5rbm93bj47XG4gICAgcmV0dXJuIGRyYWdcbiAgICAgICAgLm9uKFwic3RhcnRcIiwgb25EcmFnU3RhcnQpXG4gICAgICAgIC5vbihcImRyYWdcIiwgb25EcmFnKVxuICAgICAgICAub24oXCJlbmRcIiwgb25EcmFnRW5kKTtcbn1cblxuZXhwb3J0IGNvbnN0IGluaXQgPSAoY29udGFpbmVyOiBzdHJpbmcsIGdyYXBoRGF0YSQ6IE9ic2VydmFibGU8U2l6ZWRQYWlycz4pID0+IHtcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoY29udGFpbmVyKTtcblxuICAgIGNvbnN0IGxpbmVzR3JvdXAgPSBzdmcuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnbGluZXMnKVxuXG4gICAgbGV0IGxpbmVBbmltYXRpb246IGQzLlRpbWVyO1xuXG4gICAgZ3JhcGhEYXRhJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplZE5vZGVzID0geC5ub2Rlc1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IChLZXllZCAmIE5vZGUpW10gPSBzaXplZE5vZGVzLm1hcCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2luZGV4OiBpLCBpZDogdn1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua3M6IExpbmtbXSA9IHgubGlua3MubWFwKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2lkOiB2LnNvdXJjZSwgc291cmNlOiB2LnNvdXJjZSwgdGFyZ2V0OiB2LnRhcmdldCwgZGlyZWN0aW9uOiB2LmVkZ2V9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZWROb2RlcyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMsXG4gICAgICAgICAgICAgICAgICAgIGxpbmtzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBzaW11bGF0aW9uOiBTaW11bGF0aW9uPE5vZGUsIExpbms+ID0gZDMuZm9yY2VTaW11bGF0aW9uKGUubm9kZXMpXG4gICAgICAgICAgICAgICAgLmZvcmNlKFwibGlua1wiLCBkMy5mb3JjZUxpbmsoZS5saW5rcykuaWQoZCA9PiBlLnNpemVkTm9kZXNbZC5pbmRleF0ubmFtZSB8fCBcInVua25vd25cIikpXG4gICAgICAgICAgICAgICAgLmZvcmNlKFwiY2hhcmdlXCIsIGQzLmZvcmNlTWFueUJvZHkoKSlcbiAgICAgICAgICAgICAgICAuZm9yY2UoXCJjZW50ZXJcIiwgZDMuZm9yY2VDZW50ZXIoOTAwIC8gMiwgNTAwIC8gMikpXG4gICAgICAgICAgICAgICAgLmZvcmNlKCdjb2xsaXNpb24nLCBkMy5mb3JjZUNvbGxpZGUoKS5yYWRpdXMoZCA9PiBlLnNpemVkTm9kZXNbZC5pbmRleF0ucmFkaXVzICsgNTApKTtcblxuICAgICAgICAgICAgY29uc3QgbGluayA9IGxpbmVzR3JvdXBcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwiLmxpbmVcIilcbiAgICAgICAgICAgICAgICAuZGF0YShlLmxpbmtzKVxuICAgICAgICAgICAgICAgIC5qb2luKFwibGluZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLW9wYWNpdHlcIiwgMSlcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZCBhcyBMaW5rXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtsaW5rLmRpcmVjdGlvbn0gbGluZWBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZGF0YS1saW5rXCIsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZCBhcyBMaW5rXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShsaW5rKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXItY2VudGVyXCIsIFwidXJsKCN0cmlhbmdsZSlcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBcIjUgNVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgNSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGQgYXMgTGlua1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluay5kaXJlY3Rpb24gPT09IFwiaW5jcmVhc2VzXCIgPyBcImdyZWVuXCIgOiBcInJlZFwiXG4gICAgICAgICAgICAgICAgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFsaW5lQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lQW5pbWF0aW9uID0gZDMuaW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBpbnRlcnZhbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5saW5lXCIpLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS1kYXNoYXJyYXlcIiwgXCI1IDVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgNSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VDaXJjbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHN2Z1xuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoXCIubm9kZVwiKVxuICAgICAgICAgICAgICAgIC5kYXRhKGUubm9kZXMpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJnXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVcIilcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmFnKHNpbXVsYXRpb24pXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5vZGUuc2VsZWN0QWxsKFwiY2lyY2xlXCIpLnJlbW92ZSgpXG4gICAgICAgICAgICBub2RlLnNlbGVjdEFsbChcInRleHRcIikucmVtb3ZlKClcblxuICAgICAgICAgICAgbm9kZS5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImJsYWNrXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMS41KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiclwiLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2l6ZWROb2RlID0gZS5zaXplZE5vZGVzW2QuaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsY3VsYXRlUmFkaXVzKHNpemVkTm9kZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuXG4gICAgICAgICAgICAvKiBDcmVhdGUgdGhlIHRleHQgZm9yIGVhY2ggYmxvY2sgKi9cbiAgICAgICAgICAgIG5vZGUuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImFsaWdubWVudC1iYXNlbGluZVwiLCBcImNlbnRyYWxcIilcbiAgICAgICAgICAgICAgICAudGV4dCgoZDogTm9kZSkgPT4gZS5zaXplZE5vZGVzW2QuaW5kZXhdLm5hbWUpXG5cbiAgICAgICAgICAgIHNpbXVsYXRpb24ub24oXCJ0aWNrXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ4MVwiLCAoZDogTGluaykgPT4gKGQuc291cmNlIGFzIE5vZGUpLngpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTFcIiwgKGQ6IExpbmspID0+IChkLnNvdXJjZSBhcyBOb2RlKS55KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcIngyXCIsIChkOiBMaW5rKSA9PiAoZC50YXJnZXQgYXMgTm9kZSkueClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5MlwiLCAoZDogTGluaykgPT4gKGQudGFyZ2V0IGFzIE5vZGUpLnkpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IGB0cmFuc2xhdGUoJHtkLnh9LCAke2QueX0pYClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG59XG5cbiIsIlxuY29uc3QgaXNMaW5raW5nQ2hhciA9ICh4OiBzdHJpbmcpID0+IHggPT09ICcrJyB8fCB4ID09PSAnLSc7XG5cbmNvbnN0IGZpbmlzaGVkUmVhZGluZ1N0YXJ0ID0gKGluUXVvdGVkU3RyaW5nOiBib29sZWFuLCB4OiBzdHJpbmcpID0+ICFpblF1b3RlZFN0cmluZyAmJiBpc0xpbmtpbmdDaGFyKHgpO1xuXG5jb25zdCBpc1dvcmRCb3VuZGFyeSA9ICh4OiBzdHJpbmcpID0+IHggPT09IFwiXFxcIlwiO1xuXG5jb25zdCBpc1ZhbGlkUGFpciA9IChwb3RlbnRpYWw6IHsgZWRnZTogc3RyaW5nOyBzdGFydDogc3RyaW5nOyBlbmQ6IHN0cmluZyB9KSA9PlxuICAgIHBvdGVudGlhbC5zdGFydCAhPT0gXCJcIiAmJiBwb3RlbnRpYWwuZW5kICE9PSBcIlwiICYmIGlzTGlua2luZ0NoYXIocG90ZW50aWFsLmVkZ2UpO1xuXG5jb25zdCBwYXJzZUxpbmUgPSAoczogc3RyaW5nKTogUGFpciB8IG51bGwgPT4ge1xuICAgIGNvbnN0IHBvdGVudGlhbCA9IHtcbiAgICAgICAgZWRnZTogXCJcIixcbiAgICAgICAgc3RhcnQ6IFwiXCIsXG4gICAgICAgIGVuZDogXCJcIlxuICAgIH1cblxuICAgIGxldCBpblF1b3RlZFN0cmluZyA9IGZhbHNlXG4gICAgbGV0IHJlYWRpbmdTdGFydCA9IHRydWVcblxuICAgIHMuc3BsaXQoJycpXG4gICAgICAgIC5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgaWYgKGlzV29yZEJvdW5kYXJ5KHgpKSB7XG4gICAgICAgICAgICAgICAgaW5RdW90ZWRTdHJpbmcgPSAhaW5RdW90ZWRTdHJpbmdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmluaXNoZWRSZWFkaW5nU3RhcnQoaW5RdW90ZWRTdHJpbmcsIHgpKSB7XG4gICAgICAgICAgICAgICAgcG90ZW50aWFsLmVkZ2UgPSB4XG4gICAgICAgICAgICAgICAgcmVhZGluZ1N0YXJ0ID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWRpbmdTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWwuc3RhcnQgKz0geFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvdGVudGlhbC5lbmQgKz0geFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIHJldHVybiBpc1ZhbGlkUGFpcihwb3RlbnRpYWwpID8ge1xuICAgICAgICBlZGdlOiBwb3RlbnRpYWwuZWRnZSA9PT0gXCIrXCIgPyBcImluY3JlYXNlc1wiIDogXCJkZWNyZWFzZXNcIixcbiAgICAgICAgc291cmNlOiBwb3RlbnRpYWwuc3RhcnQudHJpbSgpLFxuICAgICAgICB0YXJnZXQ6IHBvdGVudGlhbC5lbmQudHJpbSgpXG4gICAgfSA6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCB0b1NpemVkTm9kZVZlcnRleFBhaXJzID0gKHM6IHN0cmluZyk6IFNpemVkUGFpcnMgPT4ge1xuICAgIGNvbnN0IHBhaXJzID0gdG9Ob2RlVmVydGV4UGFpcnMocylcblxuICAgIGNvbnN0IGdhdGhlcmVkTm9kZXMgPSBwYWlycy5yZWR1Y2U8e1tpZDogc3RyaW5nXTogU2l6ZWROb2RlfT4oKGFjYywgY3VycikgPT4ge1xuICAgICAgICBpZiAoIWFjY1tjdXJyLnNvdXJjZV0pIHtcbiAgICAgICAgICAgIGFjY1tjdXJyLnNvdXJjZV0gPSB7IG5hbWU6IGN1cnIuc291cmNlLCByYWRpdXM6IDAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYWNjW2N1cnIudGFyZ2V0XSkge1xuICAgICAgICAgICAgYWNjW2N1cnIudGFyZ2V0XSA9IHsgbmFtZTogY3Vyci50YXJnZXQsIHJhZGl1czogMCB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnIuZWRnZSA9PT0gXCJpbmNyZWFzZXNcIikge1xuICAgICAgICAgICAgYWNjW2N1cnIudGFyZ2V0XS5yYWRpdXMgKz0gNVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyLmVkZ2UgPT09IFwiZGVjcmVhc2VzXCIpIHtcbiAgICAgICAgICAgIGFjY1tjdXJyLnRhcmdldF0ucmFkaXVzIC09IDVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjXG4gICAgfSwge30pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5vZGVzOiBPYmplY3QudmFsdWVzKGdhdGhlcmVkTm9kZXMpLFxuICAgICAgICBsaW5rczogcGFpcnNcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b05vZGVWZXJ0ZXhQYWlycyA9IChzOiBzdHJpbmcpOiBBcnJheTxQYWlyPiA9PlxuICAgIHMuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgLm1hcChwYXJzZUxpbmUpXG4gICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSBudWxsKVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpemVkUGFpcnMge1xuICAgIG5vZGVzOiBTaXplZE5vZGVbXSxcbiAgICBsaW5rczogUGFpcltdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2l6ZWROb2RlIHtcbiAgICBuYW1lOiBzdHJpbmdcbiAgICByYWRpdXM6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhaXIge1xuICAgIGVkZ2U6IFwiaW5jcmVhc2VzXCIgfCBcImRlY3JlYXNlc1wiLFxuICAgIHNvdXJjZTogc3RyaW5nXG4gICAgdGFyZ2V0OiBzdHJpbmdcbn0iXSwic291cmNlUm9vdCI6IiJ9