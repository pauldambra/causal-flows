import * as chai from 'chai'

const {expect} = chai;

import {toNodeVertexPairs, toSizedNodeVertexPairs} from "./parse";

describe('can parse descriptions', () => {
    describe('from only valid examples', () => {
        [
            {a: "A+B", e: [{edge: "increases", source: "A", target: "B"}]},
            {a: "B+A", e: [{edge: "increases", source: "B", target: "A"}]},
            {a: "Tomato+B", e: [{edge: "increases", source: "Tomato", target: "B"}]},
            {a: "Tomato sauce+B", e: [{edge: "increases", source: "Tomato sauce", target: "B"}]},
            {a: '"tomato sauce"+"brown sauce"', e: [{edge: "increases", source: "tomato sauce", target: "brown sauce"}]},
            {
                a: '"tomato + sauce"+"brown - sauce"',
                e: [{edge: "increases", source: "tomato + sauce", target: "brown - sauce"}]
            },
            {a: "A-B", e: [{edge: "decreases", source: "A", target: "B"}]},
            {a: "A-B\nB+A", e: [{edge: "decreases", source: "A", target: "B"}, {edge: "increases", source: "B", target: "A"}]}
        ].forEach(({a, e}) => {
            it(`can parse ${a}`, function () {
                expect(toNodeVertexPairs(a)).to.deep.equal(e)
            })
        })
    })
    describe('from only valid examples to sized nodes', () => {
        [
            {
                a: "not a valid input", e: {nodes: [], links: []}
            },
            {
                a: "A+B", e: {
                    nodes: [{name: "A", radius: 0}, {name: "B", radius: 5}],
                    links: [{edge: "increases", source: "A", target: "B"}]
                }
            },
            {
                a: "B+A", e: {
                    nodes: [{name: "A", radius: 5}, {name: "B", radius: 0}],
                    links: [{edge: "increases", source: "B", target: "A"}]
                }
            },
            {
                a: "Tomato+B", e: {
                    nodes: [{
                        "name": "Tomato",
                        "radius": 0
                    },
                        {
                            "name": "B",
                            "radius": 5
                        }
                    ],
                    links: [{edge: "increases", source: "Tomato", target: "B"}]
                }
            },
            {
                a: "Tomato sauce+B", e: {
                    nodes: [{
                        "name": "Tomato sauce",
                        "radius": 0
                    },
                        {
                            "name": "B",
                            "radius": 5
                        }
                    ], links: [{edge: "increases", source: "Tomato sauce", target: "B"}]
                }
            },
            {
                a: '"tomato sauce"+"brown sauce"', e: {
                    nodes: [{
                        "name": "tomato sauce",
                        "radius": 0
                    },
                        {
                            "name": "brown sauce",
                            "radius": 5
                        }
                    ], links: [{edge: "increases", source: "tomato sauce", target: "brown sauce"}]
                }
            },
            {
                a: '"tomato + sauce"+"brown - sauce"',
                e: {
                    nodes: [{
                        "name": "tomato + sauce",
                        "radius": 0
                    },
                        {
                            "name": "brown - sauce",
                            "radius": 5
                        }
                    ], links: [{edge: "increases", source: "tomato + sauce", target: "brown - sauce"}]
                }
            },
            {
                a: "A-B", e: {
                    nodes: [{
                        "name": "A",
                        "radius": 0
                    },
                        {
                            "name": "B",
                            "radius": -5
                        }
                    ], links: [{edge: "decreases", source: "A", target: "B"}]
                }
            },
            {
                a: "A-B\nB+A", e: {
                    nodes: [{
                        "name": "A",
                        "radius": 5
                    },
                        {
                            "name": "B",
                            "radius": -5
                        }
                    ], links: [{edge: "decreases", source: "A", target: "B"}, {edge: "increases", source: "B", target: "A"}]
                }
            },
            {
                a: "A-B\nB+A\nB+C\nD+C\nE+C", e: {
                    nodes: [{
                        "name": "A",
                        "radius": 5
                    },
                        {
                            "name": "B",
                            "radius": -5
                        },
                        {
                            "name": "C",
                            "radius": 15
                        }, {
                            "name": "D",
                            "radius": 0
                        }, {
                            "name": "E",
                            "radius": 0
                        }
                    ],
                    links: [{edge: "decreases", source: "A", target: "B"}, {
                        edge: "increases",
                        source: "B",
                        target: "A"
                    }, {edge: "increases", source: "B", target: "C"},
                        {edge: "increases", source: "D", target: "C"}, {edge: "increases", source: "E", target: "C"}]
                }
            }
        ].forEach(({a, e}) => {
            it(`can parse ${a}`, function () {
                const actual = toSizedNodeVertexPairs(a);
                expect(actual.nodes).to.have.deep.members(e.nodes)
                expect(actual.links).to.deep.equal(e.links)
            })
        })
    })
    describe('from only invalid examples', () => {
        [
            {a: "A", e: []},
            {a: "just some text", e: []},
            {a: "+B", e: []},
            {a: "", e: []},
            {a: "A-B\nB+", e: [{edge: "decreases", source: "A", target: "B"}]}
        ].forEach(({a, e}) => {
            it(`can parse ${a}`, function () {
                expect(toNodeVertexPairs(a)).to.deep.equal(e)
            })
        })
    })
})
