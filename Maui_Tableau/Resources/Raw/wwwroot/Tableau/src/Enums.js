/**
 * All Enums of this project
 * Created by Tram Nguyen on 04.07.2018.
 */


/**
 * The result of a satisfiability / tautology Test
 * @type {Object}
 */
const TautologyOrSatisfiableEnum = Object.freeze({
    TRUE: "TRUE",
    FALSE: "FALSE",
    NOTTESTED: "NOTTESTED"
});
exports.TautologyOrSatisfiableEnum = TautologyOrSatisfiableEnum;

/**
 * The formula types
 * @type {Object}
 */
const FormulaTypeEnum = Object.freeze({
    ALPHA: "ALPHA",
    BETA: "BETA",
    NEGATIVLITERAL: "NEGATIVLITERAL",
    POSITIVLITERAL: "POSITIVLITERAL",
    TRUE: "TRUE",
    FALSE: "FALSE"
});
exports.FormulaTypeEnum = FormulaTypeEnum;

/**
 * The tableau-node status
 * @type {Object}
 */
const StatusEnum = Object.freeze({
    OPENEDLEAF: "OPENEDLEAF",
    CLOSEDLEAF: "CLOSEDLEAF",
    UNMARKEDLEAF: "UNMARKEDLEAF",
    ROOT: "ROOT"
});
exports.StatusEnum = StatusEnum;

/**
 * The classification of α- and β-formulas
 * @type {Object}
 */
const RuleEnum = Object.freeze({
    ALPHA_1: "a1",
    ALPHA_2: "a2",
    ALPHA_3: "a3",
    ALPHA_4: "a4",
    ALPHA_5: "a5",
    ALPHA_6: "a6",
    ALPHA_7: "a7",
    ALPHA_8: "a8",
    BETA_1: "b1",
    BETA_2: "b2",
    BETA_3: "b3",
    BETA_4: "b4",
    BETA_5: "b5",
    BETA_6: "b6",
    BETA_7: "b7"
});
exports.RuleEnum = RuleEnum;


/**
 * The boolean operators
 * @type {Object}
 */
const FormulaOperatorEnum = Object.freeze({
    NEG: "\u00AC",
    AND: "\u2227",
    OR:   "\u2228",
    NAND: "\u2191",
    NOR: "\u2193",
    IMP: "\u2192",
    EQU: "\u2194",
    XOR: "\u2295"
});
exports.FormulaOperatorEnum = FormulaOperatorEnum;
