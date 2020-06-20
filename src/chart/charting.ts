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
    direction: "increases" | "decreases"
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
            console.log(nodeDict, 'nd')
            this.nodeNames = Object.values(nodeDict)

            const nodes: Node[] = this.nodeNames.map((v, i) => {
                return {index: i, id: v}
            })

            const links: Link[] = e.map(v => {
                return {id: v.start, source: v.start, target: v.end, direction: v.edge}
            });

            console.log({nodes, links})

            const simulation: Simulation<Node, Link> = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => this.nodeNames[d.index] || "unknown"))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(this.width / 2, this.height / 2));


            const svg = d3.select("svg");

            const link = svg
                .selectAll(".line")
                .data(links)
                .join("line")
                .attr("stroke-opacity", 1)
                .attr("class", d => {
                    const link = d as Link
                    return `${link.direction} line`
                })
                .attr("stroke-width", 2)
                .attr("stroke", d => {
                    const link = d as Link
                    return link.direction === "increases" ? "green" : "red"
                });

            const node = svg
                .selectAll(".node")
                .data(nodes)
                .join("g")
                .attr("class", "node")
                .call(this.drag(simulation));

            node.append("circle")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .attr("r", 5)
                .attr("fill", "red")

            /* Create the text for each block */
            node.append("text")
                .attr("dx", d => -20)
                .text((d: Node) => this.nodeNames[d.index])

            node.append("title")
                .text((d: Node) => this.nodeNames[d.index]);

            simulation.on("tick", () => {
                link
                    .attr("x1", (d: Link) => (d.source as Node).x)
                    .attr("y1", (d: Link) => (d.source as Node).y)
                    .attr("x2", (d: Link) => (d.target as Node).x)
                    .attr("y2", (d: Link) => (d.target as Node).y);

                node
                    .attr("transform", d => `translate(${d.x}, ${d.y})`);
            });

        })
    }
}

