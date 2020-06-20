import {fromEvent} from 'rxjs';
import {debounceTime, map} from "rxjs/operators";
import {toNodeVertexPairs} from "./parse-description/parse";
import {chart} from "./chart/charting";



const diagramDescription$ = fromEvent<InputEvent>(document.getElementById('diagram-text'), 'input')
    .pipe(
        map(e => (e.target as HTMLTextAreaElement)),
        map(e => e.value),
        debounceTime(375),
        map(toNodeVertexPairs)
    );

diagramDescription$.subscribe(e => console.log(e))

new chart('#outlet', diagramDescription$)