/**
 * The implementation of tableau-algorithm
 * Created by Tram Nguyen on 06.06.2018.
 */


const LEFTCHILDINDEX = 0;
const RIGHTCHILDINDEX = 1;
const RULEINDEX = 2;
var idNr = -1;

/**
 * Creates a TableauForPropositionalLogic object
 * @param formula: input formula
 * @constructor
 */
function TableauForPropositionalLogic(formula) {
    this.innerNodes = [];
    this.unmarkedLeaves = [];
    this.markedLeaves = [];
    var formulasArr = [formula];
    var rootNode = new TableauNode(formulasArr, null, null);
    idNr++;
    rootNode.setId(idNr);
    this.unmarkedLeaves.push(rootNode);
    while (this.unmarkedLeaves.length > 0) {
        var currentLeaf = this.unmarkedLeaves.pop();
        if (currentLeaf.containsOnlyLiterals()) {
            if (currentLeaf.containsAComplementaryPairOfLiterals()|| currentLeaf.containsConstantFalse()) {
                currentLeaf.setStatus(StatusEnum.CLOSEDLEAF);
            } else {
                currentLeaf.setStatus(StatusEnum.OPENEDLEAF);
            }
            this.markedLeaves.push(currentLeaf);
        } else if (currentLeaf.containsAlphaFormula()) {
            this.createChildIfContainsAlphaFormula(currentLeaf);

        } else {
            this.createChildrenIfContainsBetaFormula(currentLeaf);
        }
    }
    if(this.innerNodes.length == 0){
        this.rootNode = this.markedLeaves[0]; //if formula is ex: p,q....
    }else{
        this.rootNode = this.innerNodes[0];
    }

}

TableauForPropositionalLogic.prototype = Object.create(Tableau.prototype);

/**
 * Creates child tableau-node if parent node contains a alpha formula
 * @param currentLeaf:
 */
TableauForPropositionalLogic.prototype.createChildIfContainsAlphaFormula = function (currentLeaf) {
    var currentLeaf = currentLeaf;
    var selectedAlphaFormula;
    var formulasOfRightChild = currentLeaf.getListOfFormulas().slice(0); // clone Array
    for (var i = 0; i < currentLeaf.getListOfFormulas().length; i++) {
        if (currentLeaf.getListOfFormulas()[i].getFormulaType() == FormulaTypeEnum.ALPHA) {
            selectedAlphaFormula = currentLeaf.getListOfFormulas()[i];
            formulasOfRightChild.splice(i, 1);
            break;
        }
    }
    var returnArrayOfDetermineAlphaFormulas = this.determineAlphaFormulas(selectedAlphaFormula);

    var alpha1Formula = returnArrayOfDetermineAlphaFormulas[LEFTCHILDINDEX];
    var alpha2Formula = returnArrayOfDetermineAlphaFormulas[RIGHTCHILDINDEX];

    if (alpha1Formula != null) {
        formulasOfRightChild.push(alpha1Formula);
    }
    formulasOfRightChild.push(alpha2Formula);

    var newRightLeaf = new TableauNode(formulasOfRightChild, null, null);
    newRightLeaf.setParent(currentLeaf);
    idNr++;
    newRightLeaf.setId(idNr);
    currentLeaf.setRightNode(newRightLeaf);
    currentLeaf.setStatus(StatusEnum.ROOT);
    currentLeaf.setRule(returnArrayOfDetermineAlphaFormulas[RULEINDEX]);
    this.innerNodes.push(currentLeaf);
    this.unmarkedLeaves.push(newRightLeaf);
};

/**
 * Creates children tableau-nodes if parent node contains a beta formula
 * @param currentLeaf
 */
TableauForPropositionalLogic.prototype.createChildrenIfContainsBetaFormula = function (currentLeaf) {
    var selectedBetaFormula;
    var formulasOfLeftChild = currentLeaf.getListOfFormulas().slice(0);
    var formulasOfRightChild = currentLeaf.getListOfFormulas().slice(0);

    for (var i = 0; i < currentLeaf.getListOfFormulas().length; i++) {
        if (currentLeaf.getListOfFormulas()[i].getFormulaType() == FormulaTypeEnum.BETA) {
            selectedBetaFormula = currentLeaf.getListOfFormulas()[i];
            formulasOfLeftChild.splice(i, 1);
            formulasOfRightChild.splice(i, 1);
            break;
        }
    }
    var returnArrayOfDetermineBetaFormulas = this.determineBetaFormulas(selectedBetaFormula);
    var beta1Formula = returnArrayOfDetermineBetaFormulas[LEFTCHILDINDEX];
    var beta2Formula = returnArrayOfDetermineBetaFormulas[RIGHTCHILDINDEX];
    formulasOfLeftChild.push(beta1Formula);
    formulasOfRightChild.push(beta2Formula);
    var newLeftLeaf = new TableauNode(formulasOfLeftChild, null, null);
    newLeftLeaf.setParent(currentLeaf);
    idNr++;
    newLeftLeaf.setId(idNr);
    var newRightLeaf = new TableauNode(formulasOfRightChild, null, null);
    newRightLeaf.setParent(currentLeaf);
    idNr++;
    newRightLeaf.setId(idNr);
    currentLeaf.setLeftNode(newLeftLeaf);
    currentLeaf.setRightNode(newRightLeaf);
    currentLeaf.setStatus(StatusEnum.ROOT);
    currentLeaf.setRule(returnArrayOfDetermineBetaFormulas[RULEINDEX]);
    this.innerNodes.push(currentLeaf);
    this.unmarkedLeaves.push(newLeftLeaf);
    this.unmarkedLeaves.push(newRightLeaf);
};

/**
 * Determines alpha_1 and alpha_2 formulas of a alpha formula
 * @param alphaFormula: the determining formula
 * @returns {[Formula,Formula,RuleEnum]} An Array contains alpha_1, alpha_2 formulas and used rule
 */
TableauForPropositionalLogic.prototype.determineAlphaFormulas = function (alphaFormula) {
    var alpha1Formula;
    var alpha2Formula;
    var alphaRule;
    if (alphaFormula.getLabel() == FormulaOperatorEnum.NEG) {
        switch (alphaFormula.getRight().getLabel()) {
            case FormulaOperatorEnum.NEG: { //neg
                alpha1Formula = null;
                alpha2Formula = alphaFormula.getRight().getRight();
                alphaRule = RuleEnum.ALPHA_1;
                break;
            }
            case FormulaOperatorEnum.OR: { //or
                var formulaTypeLeft = alphaFormula.getRight().getLeft().getFormulaTypeAfterNegation();
                alpha1Formula = new Formula(FormulaOperatorEnum.NEG, null, alphaFormula.getRight().getLeft(), formulaTypeLeft);
                var formulaTypeRight = alphaFormula.getRight().getRight().getFormulaTypeAfterNegation();
                alpha2Formula = new Formula(FormulaOperatorEnum.NEG, null, alphaFormula.getRight().getRight(), formulaTypeRight);
                alphaRule = RuleEnum.ALPHA_3;
                break;
            }
            case FormulaOperatorEnum.NAND: { //nand
                alpha1Formula = alphaFormula.getRight().getLeft();
                alpha2Formula = alphaFormula.getRight().getRight();
                alphaRule = RuleEnum.ALPHA_5;
                break;
            }
            case FormulaOperatorEnum.IMP: { //imp
                var formulaTypeRight = alphaFormula.getRight().getRight().getFormulaTypeAfterNegation();
                alpha1Formula = alphaFormula.getRight().getLeft();
                alpha2Formula = new Formula(FormulaOperatorEnum.NEG, null, alphaFormula.getRight().getRight(), formulaTypeRight);
                alphaRule = RuleEnum.ALPHA_4;
                break;
            }
            case FormulaOperatorEnum.XOR: { //xor
                alpha1Formula = new Formula(FormulaOperatorEnum.IMP, alphaFormula.getRight().getLeft(), alphaFormula.getRight().getRight(), FormulaTypeEnum.BETA);
                alpha2Formula = new Formula(FormulaOperatorEnum.IMP, alphaFormula.getRight().getRight(), alphaFormula.getRight().getLeft(), FormulaTypeEnum.BETA);
                alphaRule = RuleEnum.ALPHA_8;
                break;
            }
        }

    } else {
        switch (alphaFormula.getLabel()) {
            case FormulaOperatorEnum.AND: { //and
                alpha1Formula = alphaFormula.getLeft();
                alpha2Formula = alphaFormula.getRight();
                alphaRule = RuleEnum.ALPHA_2;
                break;
            }
            case FormulaOperatorEnum.NOR: { //nor
                var formulaTypeLeft = alphaFormula.getLeft().getFormulaTypeAfterNegation();
                var formulaTypeRight = alphaFormula.getRight().getFormulaTypeAfterNegation();
                alpha1Formula = new Formula(FormulaOperatorEnum.NEG, null, alphaFormula.getLeft(), formulaTypeLeft);
                alpha2Formula = new Formula(FormulaOperatorEnum.NEG, null, alphaFormula.getRight(), formulaTypeRight);
                alphaRule = RuleEnum.ALPHA_6;
                break;
            }
            case FormulaOperatorEnum.EQU: { //equ
                alpha1Formula = new Formula(FormulaOperatorEnum.IMP, alphaFormula.getLeft(), alphaFormula.getRight(), FormulaTypeEnum.BETA);
                alpha2Formula = new Formula(FormulaOperatorEnum.IMP, alphaFormula.getRight(), alphaFormula.getLeft(), FormulaTypeEnum.BETA);
                alphaRule = RuleEnum.ALPHA_7;
                break;
            }
        }
    }
    var retArr = [alpha1Formula, alpha2Formula, alphaRule];
    return retArr;
};

/**
 * Determines beta_1 and beta_2 formulas of a beta formula
 * @param betaFormula: the determining formula
 * @returns {[Formula,Formula,RuleEnum]}An Array contains beta_1, beta_2 formulas and used rule
 */
TableauForPropositionalLogic.prototype.determineBetaFormulas = function (betaFormula) {
    var beta1Formula;
    var beta2Formula;
    var betaRule;
    if (betaFormula.getLabel() == FormulaOperatorEnum.NEG) {//neg
        switch (betaFormula.getRight().getLabel()) {

            case FormulaOperatorEnum.AND: { //and
                var formulaTypeLeft = betaFormula.getRight().getLeft().getFormulaTypeAfterNegation();
                var formulaTypeRight = betaFormula.getRight().getRight().getFormulaTypeAfterNegation();
                beta1Formula = new Formula(FormulaOperatorEnum.NEG, null, betaFormula.getRight().getLeft(), formulaTypeLeft);
                beta2Formula = new Formula(FormulaOperatorEnum.NEG, null, betaFormula.getRight().getRight(), formulaTypeRight);
                betaRule = RuleEnum.BETA_1;
                break;
            }
            case FormulaOperatorEnum.NOR: { //nor
                beta1Formula = betaFormula.getRight().getLeft();
                beta2Formula = betaFormula.getRight().getRight();
                betaRule = RuleEnum.BETA_5;
                break;
            }
            case FormulaOperatorEnum.EQU: { //equ
                var impFormulaLeft = new Formula(FormulaOperatorEnum.IMP, betaFormula.getRight().getLeft(), betaFormula.getRight().getRight(), FormulaTypeEnum.BETA);
                var impFormulaRight = new Formula(FormulaOperatorEnum.IMP, betaFormula.getRight().getRight(), betaFormula.getRight().getLeft(), FormulaTypeEnum.BETA);
                beta1Formula = new Formula(FormulaOperatorEnum.NEG, null, impFormulaLeft, FormulaTypeEnum.ALPHA);
                beta2Formula = new Formula(FormulaOperatorEnum.NEG, null, impFormulaRight, FormulaTypeEnum.ALPHA);
                betaRule = RuleEnum.BETA_6;
                break;
            }
        }

    } else {
        switch (betaFormula.getLabel()) {
            case FormulaOperatorEnum.OR: { //or
                beta1Formula = betaFormula.getLeft();
                beta2Formula = betaFormula.getRight();
                betaRule = RuleEnum.BETA_2;
                break;
            }
            case FormulaOperatorEnum.IMP: { //imp
                var formulaTypeLeft = betaFormula.getLeft().getFormulaTypeAfterNegation();
                beta1Formula = new Formula(FormulaOperatorEnum.NEG, null, betaFormula.getLeft(), formulaTypeLeft);
                beta2Formula = betaFormula.getRight();
                betaRule = RuleEnum.BETA_3;
                break;
            }
            case FormulaOperatorEnum.NAND: { //nand
                var formulaTypeLeft = betaFormula.getLeft().getFormulaTypeAfterNegation();
                var formulaTypeRight = betaFormula.getRight().getFormulaTypeAfterNegation();
                beta1Formula = new Formula(FormulaOperatorEnum.NEG, null, betaFormula.getLeft(), formulaTypeLeft);
                beta2Formula = new Formula(FormulaOperatorEnum.NEG, null, betaFormula.getRight(), formulaTypeRight);
                betaRule = RuleEnum.BETA_4;
                break;
            }
            case FormulaOperatorEnum.XOR: { //xor
                var impFormulaLeft = new Formula(FormulaOperatorEnum.IMP, betaFormula.getLeft(), betaFormula.getRight(), FormulaTypeEnum.BETA);
                var impFormulaRight = new Formula(FormulaOperatorEnum.IMP, betaFormula.getRight(), betaFormula.getLeft(), FormulaTypeEnum.BETA);
                beta1Formula = new Formula(FormulaOperatorEnum.NEG, null, impFormulaLeft, FormulaTypeEnum.ALPHA);
                beta2Formula = new Formula(FormulaOperatorEnum.NEG, null, impFormulaRight, FormulaTypeEnum.ALPHA);
                betaRule = RuleEnum.BETA_7;
                break;
            }
        }
    }
    var retArr = [beta1Formula, beta2Formula, betaRule];
    return retArr;
};

exports.TableauForPropositionalLogic = TableauForPropositionalLogic;