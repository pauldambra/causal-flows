import {expect} from 'chai';
import {toNodeVertexPairs} from "./parse";


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
