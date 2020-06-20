export interface Pair {
    edge: "increases" | "decreases",
    start: string
    end: string
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
        start: potential.start,
        end: potential.end
    } : null
}

export const toNodeVertexPairs = (s: string): Array<Pair> =>
    s.split("\n")
        .map(parseLine)
        .filter(x => x !== null)