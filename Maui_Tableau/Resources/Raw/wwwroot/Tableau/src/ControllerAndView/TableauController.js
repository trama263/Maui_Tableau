/**
 * Implement a  TableauController object, that receives the events of the view and
 * converts them into corresponding calls to model modules .
 * Created by Tram Nguyen on 01.07.2018.
 */

/**
 * Creates a TableauController object
 * @param TableauView: the view that is controlled by this controller.
 * @returns {TableauController}
 * @constructor
 */
function TableauController(TableauView) {
    this.view = TableauView;
    this.rootFormula = this.getRootOfParserTree(this.view.input.value);
    this.tableau = null;
    this.rootTableau = null;
    if (!InputError) {
        this.tableau = new TableauForPropositionalLogic(this.rootFormula);
        this.rootTableau = this.tableau.rootNode;
    }
    return this;
}

/**
 *  Checks if a formula is a tautology
 */
TableauController.prototype.tautology = function () {
    google.charts.setOnLoadCallback(drawFormulaChart);
    this.view.panelFormula.style.display = 'block';
    var formula = this.rootFormula.toFormulaString();
    this.rootFormula = this.rootFormula.getNegativeFormula();
    this.tableau = new TableauForPropositionalLogic(this.rootFormula);
    this.rootTableau = this.tableau.rootNode;
    this.view.panelResult.style.display = 'block';
    this.view.tautologyDiv.style.display = 'block';
    this.view.unsatisfiableDiv.style.display = 'none';
    this.view.satisfiableDiv.style.display = 'none';
    if (this.tableau.isSatisfiable()) {
        isTautology = TautologyOrSatisfiableEnum.FALSE;
        isSatifiable = TautologyOrSatisfiableEnum.NOTTESTED;
        this.view.tautologySpan.innerHTML = formula + " ist keine ";
    } else {
        isTautology = TautologyOrSatisfiableEnum.TRUE;
        isSatifiable = TautologyOrSatisfiableEnum.NOTTESTED;
        this.view.tautologySpan.innerHTML = formula + " ist eine ";
    }
    this.view.formula.innerHTML = "Negierte Formel: ";
    this.view.tableau.innerHTML = "Tableau der negierten Formel: ";
    this.view.panelTableau.style.display = 'block';
    google.charts.setOnLoadCallback(drawTableauChart);
    this.view.createSolutionStepHeaderP(this.view.stepByStepDiv);
    var text = "Negieren Formel:  <span  class='text-info'>" + this.rootFormula.toFormulaString() + "</span>";
    this.view.createSolutionStepBodyP(this.view.stepByStepDiv, text);
    chartNr = 2;
    stepNr++;
};

/**
 * Checks if a formula is satisfiable
 */
TableauController.prototype.satisfiable = function () {
    google.charts.setOnLoadCallback(drawFormulaChart);
    this.tableau = new TableauForPropositionalLogic(this.rootFormula);
    this.view.panelFormula.style.display = 'block';
    this.view.panelResult.style.display = 'block';
    this.view.tautologyDiv.style.display = 'none';
    if (this.tableau.isSatisfiable()) {
        isTautology = TautologyOrSatisfiableEnum.NOTTESTED;
        isSatifiable = TautologyOrSatisfiableEnum.TRUE;
        this.view.satisfiableDiv.style.display = 'block';
        this.view.satisfiableSpan.innerHTML = this.rootFormula.toFormulaString() + " ist ";
        this.view.unsatisfiableDiv.style.display = 'none';
    } else {
        isTautology = TautologyOrSatisfiableEnum.NOTTESTED;
        isSatifiable = TautologyOrSatisfiableEnum.FALSE;
        this.view.unsatisfiableDiv.style.display = 'block';
        this.view.unsatisfiableSpan.innerHTML = this.rootFormula.toFormulaString() + " ist ";
        this.view.satisfiableDiv.style.display = 'none';
    }
    this.view.formula.innerHTML = "Formula: ";
    this.view.tableau.innerHTML = "Tableau: ";
    this.view.panelTableau.style.display = 'block';
    google.charts.setOnLoadCallback(drawTableauChart);


};

/**
 * Formats the input formula
 * @param input: formula to be formatted
 * @returns {string}
 */
TableauController.prototype.toDisplayInput = function (input) {
    var sourceInForm = new antlr4.InputStream(input);
    var lex = new FormulaGrammarLexer(sourceInForm);
    var t = lex.nextToken;
    var ret = "";
    while (t.type != antlr4.Token.EOF) {
        switch (t.type) {
            case FormulaGrammarLexer.NEG:
                ret += FormulaOperatorEnum.NEG;
                break;
            case FormulaGrammarLexer.AND:
                ret += FormulaOperatorEnum.AND;
                break;
            case FormulaGrammarLexer.OR:
                ret += FormulaOperatorEnum.OR;
                break;
            case FormulaGrammarLexer.NAND:
                ret += FormulaOperatorEnum.NAND;
                break;
            case FormulaGrammarLexer.NOR:
                ret += FormulaOperatorEnum.NOR;
                break;
            case FormulaGrammarLexer.IMP:
                ret += FormulaOperatorEnum.IMP;
                break;
            case FormulaGrammarLexer.EQU:
                ret += FormulaOperatorEnum.EQU;
                break;
            case FormulaGrammarLexer.XOR:
                ret += FormulaOperatorEnum.XOR;
                break;
            default:
                ret += t.text;
        }
        t = lex.nextToken();
    }
    return ret.replace("undefined", "");
};

/**
 * Creates a tree representation of the input formula
 * @param{string} inputString: input formula
 */
TableauController.prototype.getRootOfParserTree = function (inputString) {
    var chars = new antlr4.InputStream(inputString);
    var lexer = new FormulaGrammarLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new FormulaGrammarParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.stat();
    var listener = new FormulaListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
    var root = listener.stack.slice(-1).pop();
    return root;
};

exports.TableauController = TableauController;