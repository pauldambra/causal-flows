export const toSizedNodeVertexPairs = (s: string): SizedPairs => {
    const pairs = toNodeVertexPairs(s)

    const gatheredNodes = pairs.reduce<{[id: string]: SizedNode}>((acc, curr) => {
        if (!acc[curr.source]) {
            acc[curr.source] = { name: curr.source, radius: 0 }
        }
        if (!acc[curr.target]) {
            acc[curr.target] = { name: curr.target, radius: 0 }
        }
        if (curr.edge === "increases") {
            acc[curr.target].radius += 5
        }
        if (curr.edge === "decreases") {
            acc[curr.target].radius -= 5
        }
        return acc
    }, {});
    return {
        nodes: Object.values(gatheredNodes),
        links: pairs
    }
}

export const toNodeVertexPairs = (s: string): Array<Pair> =>
    s.split("\n")
        .map(parseLine)
        .filter(x => x !== null)

export interface SizedPairs {
    nodes: SizedNode[],
    links: Pair[]
}

export interface SizedNode {
    name: string
    radius: number
}

export interface Pair {
    edge: "increases" | "decreases",
    source: string
    target: string
}

const isLinkingChar = (x: string) => x === '+' || x === '-';

function finishedReadingStart(inQuotedString: boolean, x: string) {
    return !inQuotedString && isLinkingChar(x);
}

function isWordBoundary(x: string) {
    return x === "\"";
}

function isValidPair(potential: { edge: string; start: string; end: string }) {
    return potential.start !== "" && potential.end !== "" && isLinkingChar(potential.edge);
}

function parseLine(s: string): Pair | null {
    const potential = {
        edge: "",
        start: "",
        end: ""
    }

    let inQuotedString = false
    let readingStart = true

    s.split('')
        .forEach(x => {
            if (isWordBoundary(x)) {
                inQuotedString = !inQuotedString
            } else if (finishedReadingStart(inQuotedString, x)) {
                potential.edge = x
                readingStart = false
            } else {
                if (readingStart) {
                    potential.start += x
                } else {
                    potential.end += x
                }
            }
        })

    return isValidPair(potential) ? {
        edge: potential.edge === "+" ? "increases" : "decreases",
        source: potential.start,
        target: potential.end
    } : null
}