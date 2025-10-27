/**
 * The representation of a formula as a tree
 * Created by Tram Nguyen on 04.06.2018.
 */

var Nr = 0;

/**
 * Creates a formula
 * @param label: the expression of formula
 * @param left: the left subtree
 * @param right: the right subtree
 * @param formulaType: Typ of formula
 * @constructor
 */
function Formula(label, left, right, formulaType) {
    this.id = Nr;
    this.right = right;
    this.left = left;
    this.label = label;
    this.formulaType = formulaType;
}

/**
 * Get negated formula type
 * @returns {*} One of FormulaTypeEnum
 */
Formula.prototype.getFormulaTypeAfterNegation = function () {
    var formulaType;
    if (this.getFormulaType() == FormulaTypeEnum.TRUE) {
        formulaType = FormulaTypeEnum.FALSE;
    } else if (this.getFormulaType() == FormulaTypeEnum.FALSE) {
        formulaType = FormulaTypeEnum.TRUE;
    } else if (this.getFormulaType() == FormulaTypeEnum.POSITIVLITERAL) {
        formulaType = FormulaTypeEnum.NEGATIVLITERAL;
    } else if (this.getLabel() == FormulaOperatorEnum.NEG) {
        formulaType = FormulaTypeEnum.ALPHA;
    } else if (this.getFormulaType() == FormulaTypeEnum.ALPHA) {
        formulaType = FormulaTypeEnum.BETA;
    } else {
        formulaType = FormulaTypeEnum.ALPHA;
    }
    return formulaType;
};

/**
 * Get a negated formula
 * @returns {Formula} negatived formula
 */
Formula.prototype.getNegativeFormula = function () {
    var negationFormulaType = this.getFormulaTypeAfterNegation();
    var negationFormula = new Formula(FormulaOperatorEnum.NEG, null, this, negationFormulaType);
    return negationFormula;
};


/**
 * @returns {string} types of formula, one of FormulaTypeEnum
 */
Formula.prototype.getFormulaType = function () {
    return this.formulaType;
};

/**
 * @returns {string} label of tableau-node.
 */
Formula.prototype.getLabel = function () {
    return this.label;
};

/**
 * @returns {Formula} the left subtree
 */
Formula.prototype.getLeft = function () {
    return this.left;
};

/**
 * @returns {Formula} the right subtree
 */
Formula.prototype.getRight = function () {
    return this.right;
};


/**
 * Creates a graphic representation of this formula for Google Chart Tool
 * as a two dimensional array
 * @returns {Array}
 * Every element of array has this formula-id and parent-id.
 */
Formula.prototype.getFormulasForChart = function () {
    var ret = [];
    var list = [];
    var arr = [];
    list = this.inOrder(this, list);
    for (var i = 0; i < list.length; i++) {
        list[i].id = i;
    }
    ret.push([{v: this.id.toString(), f: this.label}, ""]);
    for (var i = 0; i < list.length; i++) {
        if (list[i].left != null) {
            arr = [{v: list[i].left.id.toString(), f: list[i].left.label}, list[i].id.toString()];
            ret.push(arr);
        }
        if (list[i].right != null) {
            arr = [{v: list[i].right.id.toString(), f: list[i].right.label}, list[i].id.toString()];
            ret.push(arr);
        }
    }
    return ret;

};

/**
 * Performs this formula as a string
 * @returns {string} string of this formula
 */
Formula.prototype.toFormulaString = function () {
    return this.inOderToString(this);

};

/**
 * Performs an in-order traversal of this tree
 * @param formula performing formula
 * @param list  array that contains formulas
 * @returns {Array} array of formulas
 */
Formula.prototype.inOrder = function (formula, list) {
    if (formula != null) {
        if (formula.left != null) this.inOrder(formula.left, list);
        list.push(formula);
        if (formula.right != null) this.inOrder(formula.right, list);
    }
    return list;
};

/**
 * Print a formula to string
 * @param formula: input formula
 * @returns {*} the string representation of the input formula
 */
Formula.prototype.inOderToString = function (formula) {
    if (formula == null) return "";
    return ((formula.left != null && formula.right != null) ? "(" : "")
        + this.inOderToString(formula.left)
        + formula.label
        + this.inOderToString(formula.right)
        + ((formula.left != null && formula.right != null) ? ")" : "");
};


exports.Formula = Formula;

