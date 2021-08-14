import {fromEvent} from 'rxjs';
import {debounceTime, map, startWith} from "rxjs/operators";
import {toSizedNodeVertexPairs} from "./parse-description/parse";
import {init} from "./chart/charting";

const textOnLoad = localStorage.getItem('causal-flow-text')

const diagramTextArea = document.getElementById('diagram-text');
(diagramTextArea as HTMLTextAreaElement).value = textOnLoad

const textChanges$ = fromEvent<InputEvent>(diagramTextArea, 'input')
.pipe(
    map(e => (e.target as HTMLTextAreaElement)),
    map(e => e.value),
    debounceTime(375)
)

const diagramDescription$ = textChanges$.pipe(
    startWith(textOnLoad),
    map(toSizedNodeVertexPairs)
)
textChanges$.subscribe(text => {
    localStorage.setItem('causal-flow-text', text)
})

init('#outlet', diagramDescription$)