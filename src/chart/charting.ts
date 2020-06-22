import * as d3 from "d3";
import {Observable} from "rxjs";
import {Pair, SizedNode, SizedPairs} from "../parse-description/parse";
import {SimulationNodeDatum, SimulationLinkDatum} from "d3";
import {Simulation} from "d3-force";

interface Node extends SimulationNodeDatum {
}

interface Link extends SimulationLinkDatum<Node> {
    direction: "increases" | "decreases"
}

export class chart {
    private group: d3.Selection<any, any, any, any>;
    private graphData$: Observable<SizedPairs>;
    private sizedNodes: SizedNode[]
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

    constructor(container: string, graphData: Observable<SizedPairs>) {
        this.graphData$ = graphData
        this.init(container);
    }


    private init(container: string) {
        this.group = d3.select(container).append('g');

        this.graphData$.subscribe(e => {

            this.sizedNodes = e.nodes
console.log(this.sizedNodes)
            const nodes: Node[] = this.sizedNodes.map((v, i) => {
                return {index: i, id: v}
            })

            const links: Link[] = e.links.map(v => {
                return {id: v.source, source: v.source, target: v.target, direction: v.edge}
            });

            const simulation: Simulation<Node, Link> = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => this.sizedNodes[d.index].name || "unknown"))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(this.width / 2, this.height / 2))
                .force('collision', d3.forceCollide().radius(d => this.sizedNodes[d.index].radius + 50));


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
                .attr("data-link", d => {
                    const link = d as Link
                    return JSON.stringify(link)
                })
                .attr("marker-center", "url(#triangle)")
                .attr("stroke-width", 2)
                .attr("stroke", d => {
                    const link = d as Link
                    return link.direction === "increases" ? "green" : "red"
                });

            d3.interval(() => {
                svg.selectAll(".line").each(function(d){
                    //each line get the total length
                    var totalLength = 5 // d.getTotalLength();
                    //perform transition for line using dasharray and offset
                    d3.select(this)
                        .attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .ease(d3.easeCircle)
                        .duration(200)
                        .attr("stroke-dashoffset", 0);
                })
            }, 200)

            const node = svg
                .selectAll(".node")
                .data(nodes)
                .join("g")
                .attr("class", "node")
                .call(this.drag(simulation));

            node.append("circle")
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
                .attr("r", d => this.sizedNodes[d.index].radius + 30)
                .attr("fill", "white")

            /* Create the text for each block */
            node.append("text")
                .attr("dx", d => -5)
                .text((d: Node) => this.sizedNodes[d.index].name)

            node.append("title")
                .text((d: Node) => this.sizedNodes[d.index].name);

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

