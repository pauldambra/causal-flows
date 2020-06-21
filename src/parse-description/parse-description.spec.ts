import * as chai from 'chai'

const {expect} = chai;

import {toNodeVertexPairs, toSizedNodeVertexPairs} from "./parse";

describe('can parse descriptions', () => {
    describe('from only valid examples', () => {
        [
            {a: "A+B", e: [{edge: "increases", start: "A", end: "B"}]},
            {a: "B+A", e: [{edge: "increases", start: "B", end: "A"}]},
            {a: "Tomato+B", e: [{edge: "increases", start: "Tomato", end: "B"}]},
            {a: "Tomato sauce+B", e: [{edge: "increases", start: "Tomato sauce", end: "B"}]},
            {a: '"tomato sauce"+"brown sauce"', e: [{edge: "increases", start: "tomato sauce", end: "brown sauce"}]},
            {
                a: '"tomato + sauce"+"brown - sauce"',
                e: [{edge: "increases", start: "tomato + sauce", end: "brown - sauce"}]
            },
            {a: "A-B", e: [{edge: "decreases", start: "A", end: "B"}]},
            {a: "A-B\nB+A", e: [{edge: "decreases", start: "A", end: "B"}, {edge: "increases", start: "B", end: "A"}]}
        ].forEach(({a, e}) => {
            it(`can parse ${a}`, function () {
                expect(toNodeVertexPairs(a)).to.deep.equal(e)
            })
        })
    })
    describe('from only valid examples to sized nodes', () => {
        [
            {
                a: "A+B", e: {
                    nodes: [{name: "A", radius: 0}, {name: "B", radius: 5}],
                    links: [{edge: "increases", start: "A", end: "B"}]
                }
            },
            {
                a: "B+A", e: {
                    nodes: [{name: "A", radius: 5}, {name: "B", radius: 0}],
                    links: [{edge: "increases", start: "B", end: "A"}]
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
                    links: [{edge: "increases", start: "Tomato", end: "B"}]
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
                    ], links: [{edge: "increases", start: "Tomato sauce", end: "B"}]
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
                    ], links: [{edge: "increases", start: "tomato sauce", end: "brown sauce"}]
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
                    ], links: [{edge: "increases", start: "tomato + sauce", end: "brown - sauce"}]
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
                    ], links: [{edge: "decreases", start: "A", end: "B"}]
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
                    ], links: [{edge: "decreases", start: "A", end: "B"}, {edge: "increases", start: "B", end: "A"}]
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
                    links: [{edge: "decreases", start: "A", end: "B"}, {
                        edge: "increases",
                        start: "B",
                        end: "A"
                    }, {edge: "increases", start: "B", end: "C"},
                        {edge: "increases", start: "D", end: "C"}, {edge: "increases", start: "E", end: "C"}]
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
            {a: "A-B\nB+", e: [{edge: "decreases", start: "A", end: "B"}]}
        ].forEach(({a, e}) => {
            it(`can parse ${a}`, function () {
                expect(toNodeVertexPairs(a)).to.deep.equal(e)
            })
        })
    })
})
