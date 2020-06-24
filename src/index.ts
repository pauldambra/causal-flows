import {fromEvent} from 'rxjs';
import {debounceTime, map} from "rxjs/operators";
import {toSizedNodeVertexPairs} from "./parse-description/parse";
import {init} from "./chart/charting";



const diagramDescription$ = fromEvent<InputEvent>(document.getElementById('diagram-text'), 'input')
    .pipe(
        map(e => (e.target as HTMLTextAreaElement)),
        map(e => e.value),
        debounceTime(375),
        map(toSizedNodeVertexPairs)
    );

init('#outlet', diagramDescription$)