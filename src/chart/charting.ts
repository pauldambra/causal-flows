import * as d3 from "d3";
import {Observable} from "rxjs";
import {Pair} from "../parse-description/parse";
import {SimulationNodeDatum, SimulationLinkDatum} from "d3";
import {Simulation} from "d3-force";

interface nodeDictionary {
    [id: string]: string
}

interface Node extends SimulationNodeDatum {
}

interface Link extends SimulationLinkDatum<Node> {
}

export class chart {
    private group: d3.Selection<any, any, any, any>;
    private graphData$: Observable<Pair[]>;
    private nodeNames: string[]
    private width = 900
    private height = 500

    private drag = (simulation: Simulation<Node, Link>) => {

        function dragstarted(d: Node) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d: Node) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d: Node) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    private nodeByName = (d: unknown, ns: Node[]): Node => {
        const d1 = d as string;
        if (!d1) {
            console.log(d, 'd')
            console.log(d1, 'd1')
        }
        const index = this.nodeNames.indexOf(d1)
        return ns.find(x => x.index === index)
    };

    constructor(container: string, graphData: Observable<Pair[]>) {
        this.graphData$ = graphData
        this.init(container);
    }


    private init(container: string) {
        this.group = d3.select(container).append('g');

        this.graphData$.subscribe(e => {

            const nodeDict = e.reduce<nodeDictionary>((ns, pair) => {
                ns[pair.start] = pair.start
                ns[pair.end] = pair.end
                return ns
            }, {})
            this.nodeNames = Object.values(nodeDict)

            const nodes: Node[] = this.nodeNames.map((v, i) => {
                return {index: i, id: v}
            })

            const links: Link[] = e.map(v => {
                return {id: v.start, source: v.start, target: v.end, direction: v.edge}
            });

            const simulation: Simulation<Node, Link> = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => this.nodeNames[d.index] || "unknown"))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(this.width / 2, this.height / 2));


            const svg = d3.select("svg");

            const link = svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", 2);

            const node = svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", 5)
                .attr("fill", "red")
                .call(this.drag(simulation));

            node.append("title")
                .text((d: Node) => this.nodeNames[d.index]);

            simulation.on("tick", () => {
                link
                    .attr("x1", (d: Link) => this.asX(nodes, d.source))
                    .attr("y1", (d: Link) => this.asY(nodes, d.source))
                    .attr("x2", (d: Link) => this.asX(nodes, d.target))
                    .attr("y2", (d: Link) => this.asY(nodes, d.target));

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });

        })
    }

    private asX(nodes: Node[], nodeName: string | number | Node) {
        const node = this.nodeByName(nodeName, nodes);
        return node ? node.x : 0;
    }
    private asY(nodes: Node[], nodeName: string | number | Node) {
        const node = this.nodeByName(nodeName, nodes);
        return node ? node.y : 0;
    }
}

