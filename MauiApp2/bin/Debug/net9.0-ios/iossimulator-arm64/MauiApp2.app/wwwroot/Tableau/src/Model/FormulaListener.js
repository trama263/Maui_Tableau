/**
 * The custom listener to visit the parse tree
 * Created by Tram Nguyen on 10.06.2018.
 */

/**
 * creates a FormulaListener object
 * @constructor
 */
var FormulaListener = function () {
    FormulaGrammarListener.call(this);
};

FormulaListener.prototype = Object.create(FormulaGrammarListener.prototype);

/**
 * Stack to save the visiting formulas
 * @type {Array}
 */
FormulaListener.prototype.stack = [];

/**
 * Adds a new proposition variable in stack when the Walker exits a Atom-rule.
 * @param ctx: Atom context.
 */
FormulaListener.prototype.exitAtom = function (ctx) {
    var label = ctx.ATOM().getText();
    var formula = new Formula(label, null, null, FormulaTypeEnum.POSITIVLITERAL);
    this.stack.push(formula);
};

/**
 * Adds a new constant true in stack when the Walker exits a True-rule.
 * @param ctx: True context.
 */
FormulaListener.prototype.exitTrue = function (ctx) {
    var label = ctx.TRUE().getText().toLowerCase();
    var formula = new Formula(label, null, null, FormulaTypeEnum.TRUE);
    this.stack.push(formula);
};

/**
 * Adds a new constant false in stack when the Walker exits a False-rule.
 * @param ctx: False context.
 */
FormulaListener.prototype.exitFalse = function (ctx) {
    var label = ctx.FALSE().getText().toLowerCase();
    var formula = new Formula(label, null, null, FormulaTypeEnum.FALSE);
    this.stack.push(formula);
};

/**
 * Adds a new cnegated formula in stack when the Walker exits a Negation-rule.
 * @param ctx: Negation context.
 */
FormulaListener.prototype.exitNegation = function (ctx) {
    var label = FormulaOperatorEnum.NEG;
    var formula;
    var right = this.stack.pop();
    if (right.getFormulaType() == FormulaTypeEnum.TRUE) {
        formula = new Formula(label, null, right, FormulaTypeEnum.FALSE);
    } else if (right.getFormulaType() == FormulaTypeEnum.FALSE) {
        formula = new Formula(label, null, right, FormulaTypeEnum.TRUE);
    } else if (right.getFormulaType() == FormulaTypeEnum.POSITIVLITERAL) {
        formula = new Formula(label, null, right, FormulaTypeEnum.NEGATIVLITERAL);
    } else if (right.getLabel() == FormulaOperatorEnum.NEG) {
        formula = new Formula(label, null, right, FormulaTypeEnum.ALPHA);
    } else if (right.getFormulaType() == FormulaTypeEnum.ALPHA) {
        formula = new Formula(label, null, right, FormulaTypeEnum.BETA);
    } else {
        formula = new Formula(label, null, right, FormulaTypeEnum.ALPHA);
    }
    this.stack.push(formula);
};

/**
 * Adds  a new formula in stack when the Walker exits a AndNand-rule.
 * @param ctx: AndNand context.
 */
FormulaListener.prototype.exitAndNand = function (ctx) {
    var formula;
    var right = this.stack.pop();
    var left = this.stack.pop();
    if (ctx.op.type == FormulaGrammarParser.AND) {
        ;
        formula = new Formula(FormulaOperatorEnum.AND, left, right, FormulaTypeEnum.ALPHA);
    } else {
        formula = new Formula(FormulaOperatorEnum.NAND, left, right, FormulaTypeEnum.BETA);
    }
    this.stack.push(formula);
};

/**
 * Adds a new formula in stack when the Walker exits a OrNor-rule.
 * @param ctx: OrNor context.
 */
FormulaListener.prototype.exitOrNor = function (ctx) {
    var formula;
    var right = this.stack.pop();
    var left = this.stack.pop();
    if (ctx.op.type == FormulaGrammarParser.OR) {
        formula = new Formula(FormulaOperatorEnum.OR, left, right, FormulaTypeEnum.BETA);
    } else {
        formula = new Formula(FormulaOperatorEnum.NOR, left, right, FormulaTypeEnum.ALPHA);
    }
    this.stack.push(formula);
};

/**
 * Adds  a new formula in stack when the Walker exits a EquXor-rule.
 * @param ctx: EquXor context.
 */
FormulaListener.prototype.exitEquXor = function (ctx) {
    var formula;
    var right = this.stack.pop();
    var left = this.stack.pop();
    if (ctx.op.type == FormulaGrammarParser.EQU) {
        formula = new Formula(FormulaOperatorEnum.EQU, left, right, FormulaTypeEnum.ALPHA);
    } else {
        formula = new Formula(FormulaOperatorEnum.XOR, left, right, FormulaTypeEnum.BETA);
    }
    this.stack.push(formula);
};

/**
 * Adds  a new formula in stack when the Walker exits a Implication-rule.
 * @param ctx: Implication context.
 */
FormulaListener.prototype.exitImplication = function (ctx) {
    var right = this.stack.pop();
    var left = this.stack.pop();
    var formula = new Formula(FormulaOperatorEnum.IMP, left, right, FormulaTypeEnum.BETA);
    this.stack.push(formula);
};

exports.FormulaListener = FormulaListener;

