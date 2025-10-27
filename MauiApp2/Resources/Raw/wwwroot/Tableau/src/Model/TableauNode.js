/**
 * Presentation a Tableau as a tree
 * Created by Tram Nguyen on 04.06.2018.
 */

var NodeNr = 0;

/**
 * Create a Tableau as a tree
 * @param{Array} formulas: array of formulas
 * @param{TableauNode} leftNode: the left subtree (left child)
 * @param{TableauNode} rightNode: the right subtree (right child)
 * @constructor
 */
function TableauNode(formulas, leftNode, rightNode) {
    // Atribute
    this.id = NodeNr;
    this.status = StatusEnum.UNMARKEDLEAF;
    this.listOfFormulas = formulas;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
    this.parentNode;
    this.rule = "";
}
/**
 * Set rule of formula
 * @param{RuleEnum} rule
 */
TableauNode.prototype.setRule = function (rule) {
    this.rule = rule;
};

/**
 * @returns {string|*} the rule of formula
 */
TableauNode.prototype.getRule = function () {
    return this.rule;
};

/**
 * Set parent node
 * @param parent
 */
TableauNode.prototype.setParent = function (parent) {
    this.parentNode = parent;
};

/**
 * @returns {TableauNode} parentNode
 */
TableauNode.prototype.getParent = function () {
    return this.parentNode;
};

/**
 * @param id
 */
TableauNode.prototype.setId = function (id) {
    this.id = id;
};

/**
 * @returns {number|*} id
 */
TableauNode.prototype.getId = function () {
    return this.id;
};

/**
 * Set left subtree
 * @param {TableauNode} tableauNode
 */
TableauNode.prototype.setLeftNode = function (tableauNode) {
    this.leftNode = tableauNode;
};


/**
 * @returns {TableauNode} the left subtree
 */
TableauNode.prototype.getLeftNode = function () {
    return this.leftNode;
};

/**
 * Set right subtree
 * @param{TableauNode} tableauNode
 */
TableauNode.prototype.setRightNode = function (tableauNode) {
    this.rightNode = tableauNode;
};

/**
 * @returns {TableauNode} the right subtree
 */
TableauNode.prototype.getRightNode = function () {
    return this.rightNode;
};

/**
 * Set value of the root node
 * @param value: status of TableauNode (OPENEDLEAF, CLOSEDLEAF, UNMARKEDLEAF, ROOT)
 */
TableauNode.prototype.setStatus = function (value) {
    this.status = value;
};

/**
 * Get value of the root node
 * @returns {string} OPENEDLEAF, CLOSEDLEAF, UNMARKEDLEAF, ROOT
 */
TableauNode.prototype.getStatus = function () {
    return this.status;
};

/**
 * The function returns the formulas as an array
 * @returns {Array} a array that contains the formulas of this tableau-node
 */
TableauNode.prototype.getListOfFormulas = function () {
    return this.listOfFormulas;
};

/**
 * Checks if this TableauNode contains only literals.
 * @returns {boolean}
 * true: if this TableauNode contains only literals.
 * false: if this TableauNode contains at least a alpha- or beta-formula.
 */
TableauNode.prototype.containsOnlyLiterals = function () {
    for (var i = 0; i < this.listOfFormulas.length; i++) {
        if (this.listOfFormulas[i].getFormulaType() == FormulaTypeEnum.ALPHA || this.listOfFormulas[i].getFormulaType() == FormulaTypeEnum.BETA) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if this tableau-node contains at least a alpha-formula.
 * @returns {boolean}
 * true: if this TableauNode contains at least a alpha-formula.
 * false: if this TableauNode don't contain any alpha-formula.
 */
TableauNode.prototype.containsAlphaFormula = function () {
    for (var i = 0; i < this.listOfFormulas.length; i++) {
        if (this.listOfFormulas[i].getFormulaType() == FormulaTypeEnum.ALPHA) {
            return true;
        }
    }
    return false;
};

/**
 * Checks if this tableau-node contains at least a False constant.
 * @returns {boolean}
 * true: if this TableauNode contains at least a False constant.
 * false: if this TableauNode don't contain any a False constant.
 */
TableauNode.prototype.containsConstantFalse = function () {
    for (var i = 0; i < this.listOfFormulas.length; i++) {
        if (this.listOfFormulas[i].getFormulaType() == FormulaTypeEnum.FALSE) {
            return true;
        }
    }
    return false;
};

/**
 *  Checks if this TableauNode contains at least a pair of complementary  literals.
 *  TableauNode can contain literals , alpha or beta formula.
 * @returns {boolean}
 * true: if this TableauNode contains at least a pair of complementary literals.
 * false: if this TableauNode don´t contain any pair of complementary literals.
 */
TableauNode.prototype.containsAComplementaryPairOfLiterals = function () {
    var positiveLiterals = [];
    var negativeLiterals = [];
    for (var i = 0; i < this.listOfFormulas.length; i++) {
        if (this.listOfFormulas[i].getFormulaType() == FormulaTypeEnum.POSITIVLITERAL) {
            if (negativeLiterals.length == 0) {
                positiveLiterals.push(this.listOfFormulas[i]);
            }
            for (var j = 0; j < negativeLiterals.length; j++) {
                if (negativeLiterals[j].label == this.listOfFormulas[i].getLabel()) {
                    return true;
                } else {
                    positiveLiterals.push(this.listOfFormulas[i]);
                }
            }
        } else if (this.listOfFormulas[i].getFormulaType() == FormulaTypeEnum.NEGATIVLITERAL) {
            if (positiveLiterals.length == 0) {
                negativeLiterals.push(this.listOfFormulas[i].getRight());
            }
            for (var h = 0; h < positiveLiterals.length; h++) {
                if (positiveLiterals[h].label == this.listOfFormulas[i].getRight().getLabel()) {
                    return true;
                } else {
                    negativeLiterals.push(this.listOfFormulas[i].getRight());
                }
            }
        }

    }
    return false;
};

/**
 * Creates a graphic representation of this node with rules for Google Chart Tool
 * as a two dimensional array
 * @returns {Array}
 * Every element of array has node-id and parent-id.
 */
TableauNode.prototype.getTableauWithRuleForChart = function () {
    var ret = [];
    var list = [];
    var arr = [];
    list = this.levelOrder(list);
    // for (var i = 0; i < list.length; i++){
    //     list[i].id = i;
    // }
    var regel = "";
    if(this.getRule() !=""){
        regel = "Regel: ";
    }else{
        regel = "";
    }
    ret.push([{v: this.id.toString(), f: this.listOfFormulasToString()+"<div style=\"color:red; font-style:italic\">"+ regel+ this.getRule()+"</div>" }, ""]);
    var nr = 0;
    if(list.length == 1){
        if (list[0].getStatus() == StatusEnum.OPENEDLEAF) {
            nr--;
            arr = [{v: nr.toString(), f: "\u2A00"}, list[0].id.toString()];
            ret.push(arr);
        } else if (list[0].getStatus() == StatusEnum.CLOSEDLEAF) {
            nr--;
            arr = [{v: nr.toString(), f: "\u2A2F"}, list[0].id.toString()];
            ret.push(arr);
        }
    }else {
        for (var i = 0; i < list.length; i++) {

            if (list[i].leftNode != null) {
                if(list[i].leftNode.getRule() !=""){
                    regel = "Regel: ";
                }else{
                    regel = "";
                }
                arr = [{
                    v: list[i].leftNode.id.toString(),
                    f: list[i].leftNode.listOfFormulasToString()+"<div style=\"color:red; font-style:italic\"> "+ regel + list[i].leftNode.getRule()+"</div>" },
                    list[i].id.toString()
                ];
                ret.push(arr);
                if (list[i].leftNode.getStatus() == StatusEnum.OPENEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A00"}, list[i].leftNode.id.toString()];
                    ret.push(arr);
                } else if (list[i].leftNode.getStatus() == StatusEnum.CLOSEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A2F"}, list[i].leftNode.id.toString()];
                    ret.push(arr);
                }
            }
            if (list[i].rightNode != null) {
                if(list[i].rightNode.getRule() !=""){
                    regel = "Regel: ";
                }else{
                    regel = "";
                }
                arr = [{
                    v: list[i].rightNode.id.toString(),
                    f: list[i].rightNode.listOfFormulasToString()+"<div style=\"color:red; font-style:italic\"> "+ regel + list[i].rightNode.getRule()+"</div>" }, list[i].id.toString()];
                ret.push(arr);
                if (list[i].rightNode.getStatus() == StatusEnum.OPENEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A00"}, list[i].rightNode.id.toString()];
                    ret.push(arr);
                } else if (list[i].rightNode.getStatus() == StatusEnum.CLOSEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A2F"}, list[i].rightNode.id.toString()];
                    ret.push(arr);
                }
            }

        }
    }
    return ret;
};

/**
 * Creates a graphic representation of this node for Google Chart Tool
 * as a two dimensional array
 * @returns {Array}
 * Every element of array has node-id and parent-id.
 */
TableauNode.prototype.getTableauForChart = function () {
    var ret = [];
    var list = [];
    var arr = [];
    list = this.inOrder(this, list);
    // for (var i = 0; i < list.length; i++){
    //     list[i].id = i;
    // }

    ret.push([{v: this.id.toString(), f: this.listOfFormulasToString()}, ""]);
    var nr = 0;
    if(list.length == 1){
        if (list[0].getStatus() == StatusEnum.OPENEDLEAF) {
            nr--;
            arr = [{v: nr.toString(), f: "\u2A00"}, list[0].id.toString()];
            ret.push(arr);
        } else if (list[0].getStatus() == StatusEnum.CLOSEDLEAF) {
            nr--;
            arr = [{v: nr.toString(), f: "\u2A2F"}, list[0].id.toString()];
            ret.push(arr);
        }
    }else {
        for (var i = 0; i < list.length; i++) {
            if (list[i].leftNode != null) {
                arr = [{
                    v: list[i].leftNode.id.toString(),
                    f: list[i].leftNode.listOfFormulasToString()
                }, list[i].id.toString()];
                ret.push(arr);
                if (list[i].leftNode.getStatus() == StatusEnum.OPENEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A00"}, list[i].leftNode.id.toString()];
                    ret.push(arr);
                } else if (list[i].leftNode.getStatus() == StatusEnum.CLOSEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A2F"}, list[i].leftNode.id.toString()];
                    ret.push(arr);
                }
            }
            if (list[i].rightNode != null) {
                arr = [{
                    v: list[i].rightNode.id.toString(),
                    f: list[i].rightNode.listOfFormulasToString()
                }, list[i].id.toString()];
                ret.push(arr);
                if (list[i].rightNode.getStatus() == StatusEnum.OPENEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A00"}, list[i].rightNode.id.toString()];
                    ret.push(arr);
                } else if (list[i].rightNode.getStatus() == StatusEnum.CLOSEDLEAF) {
                    nr--;
                    arr = [{v: nr.toString(), f: "\u2A2F"}, list[i].rightNode.id.toString()];
                    ret.push(arr);
                }
            }

        }
    }
    return ret;

};
/**
 * Performs in-order traversal of this tableau-node and returns
 * its result as a string.
 * @returns {String}
 */
TableauNode.prototype.toString = function () {
    var ret = "";
    var list = [];
    list = this.inOrder(this, list);
    for (var i = 0; i < list.length; i++) {
        ret += "["+list[i].listOfFormulasToString()+ "]; ";
    }
    return ret.substring(0, ret.length - 2);
};

/**
 * Performs in-order traversal of a tableau-node and returns
 * its result as an array.
 * @param tableauNode: the performed tableau-node
 * @param list: the array, that saves tableau-nodes
 * @returns {Array}
 */
TableauNode.prototype.inOrder = function (tableauNode, list) {

    if (tableauNode != null) {
        if (tableauNode.leftNode != null) this.inOrder(tableauNode.leftNode, list);
        list.push(tableauNode);
        if (tableauNode.rightNode != null) this.inOrder(tableauNode.rightNode, list);
    }
    return list;
};


/**
 * Performs level-order traversal of this TableauNode and returns
 * its result as an array.
 * @param list:  the array, that saves tableau-nodes
 * @returns {Array} list
 */
TableauNode.prototype.levelOrder = function (list) {
    var q = [];
    q.push(this);
    while(q.length != 0){
        var k = q.shift();
        list.push(k);
        if (k.leftNode != null)q.push(k.leftNode);
        if (k.rightNode != null)q.push(k.rightNode);
    }
    return list;
};


/**
 * @returns {string} the formulas of this tableau-node as string
 */
TableauNode.prototype.listOfFormulasToString = function () {
    var ret = "";
    for (var i = 0; i < this.listOfFormulas.length; i++) {
        ret += this.listOfFormulas[i].toFormulaString() + ", ";
    }
    return ret.substring(0, ret.length - 2);
};
exports.TableauNode = TableauNode;