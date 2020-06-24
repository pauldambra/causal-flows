import * as d3 from "d3";
import {DragBehavior, DraggedElementBaseType, SimulationLinkDatum, SimulationNodeDatum} from "d3";
import {Observable} from "rxjs";
import {SizedNode, SizedPairs} from "../parse-description/parse";
import {Simulation} from "d3-force";
import {map} from "rxjs/operators";

interface Keyed {
    id: SizedNode
}

interface Node extends SimulationNodeDatum {
}

interface Link extends SimulationLinkDatum<Node> {
    direction: "increases" | "decreases"
}

const calculateRadius = (sizedNode: SizedNode): number => sizedNode.radius + 30;

const drag = (simulation: Simulation<Node, Link>): DragBehavior<DraggedElementBaseType, unknown, unknown> => {

    const onDragStart = (d: Node) => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    const onDrag = (d: Node) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    };

    const onDragEnd = (d: Node) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };

    const drag = d3.drag() as DragBehavior<DraggedElementBaseType, unknown, unknown>;
    return drag
        .on("start", onDragStart)
        .on("drag", onDrag)
        .on("end", onDragEnd);
}

export const init = (container: string, graphData$: Observable<SizedPairs>) => {
    const svg = d3.select(container);

    const linesGroup = svg.append('g').attr('class', 'lines')

    let lineAnimation: d3.Timer;

    graphData$
        .pipe(
            map(x => {
                const sizedNodes = x.nodes

                const nodes: (Keyed & Node)[] = sizedNodes.map((v, i) => {
                    return {index: i, id: v}
                })

                const links: Link[] = x.links.map(v => {
                    return {id: v.source, source: v.source, target: v.target, direction: v.edge}
                });
                return {
                    sizedNodes,
                    nodes,
                    links
                }
            })
        )
        .subscribe(e => {

            const simulation: Simulation<Node, Link> = d3.forceSimulation(e.nodes)
                .force("link", d3.forceLink(e.links).id(d => e.sizedNodes[d.index].name || "unknown"))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(900 / 2, 500 / 2))
                .force('collision', d3.forceCollide().radius(d => e.sizedNodes[d.index].radius + 50));

            const link = linesGroup
                .selectAll(".line")
                .data(e.links)
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
                .attr("stroke-dasharray", "5 5")
                .attr("stroke-dashoffset", 5)
                .attr("stroke", d => {
                    const link = d as Link
                    return link.direction === "increases" ? "green" : "red"
                }).call(() => {
                    if(!lineAnimation) {
                        lineAnimation = d3.interval(() => {
                            console.log('in interval')
                            svg.selectAll(".line").each(function (d) {
                                d3.select(this)
                                    .attr("stroke-dasharray", "5 5")
                                    .attr("stroke-dashoffset", 5)
                                    .transition()
                                    .ease(d3.easeCircle)
                                    .attr("stroke-dashoffset", 0);
                            })
                        }, 300)
                    }
                });

            const node = svg
                .selectAll(".node")
                .data(e.nodes)
                .join("g")
                .attr("class", "node")
                .call(() => {
                    return drag(simulation)
                });

            node.selectAll("circle").remove()
            node.selectAll("text").remove()

            node.append("circle")
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
                .attr("r", d => {
                    const sizedNode = e.sizedNodes[d.index];
                    return calculateRadius(sizedNode);
                })
                .attr("fill", "white")

            /* Create the text for each block */
            node.append("text")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .text((d: Node) => e.sizedNodes[d.index].name)

            simulation.on("tick", () => {

                link
                    .attr("x1", (d: Link) => (d.source as Node).x)
                    .attr("y1", (d: Link) => (d.source as Node).y)
                    .attr("x2", (d: Link) => (d.target as Node).x)
                    .attr("y2", (d: Link) => (d.target as Node).y);

                node
                    .attr("transform", d => `translate(${d.x}, ${d.y})`)
            });

        })
}

