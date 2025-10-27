/**
 * Implement a TableauView object, that interacts with the DOM tree
 * to reflect actual TableauView state to the user.
 * Created by Tram Nguyen on 01.07.2018.
 */

/**
 * Creates a TableauView object
 * @returns {TableauView}
 * @constructor
 */
function TableauView() {
    /**
     * Element with id 'result' of the DOM tree.
     * Used to display the panel-body of panel-result.
     * @type {Element}
     */
    this.result = document.getElementById("result");

    /**
     * Element with id 'input' of the DOM tree.
     * Used to to get the input.
     * @type {Element}
     */
    this.input = document.getElementById('input');

    /**
     * Element with id 'formula' of the DOM tree.
     * Used to display the panel-body of panel-formula.
     * @type {Element}
     */
    this.formula = document.getElementById("formula");

    /**
     * Element with id 'tableau' of the DOM tree.
     * Used to display the panel-body of panel-tableau.
     * @type {Element}
     */
    this.tableau = document.getElementById("tableau");

    /**
     * Element with id 'formulaInput' of the DOM tree.
     * Used to display the input formula.
     * @type {Element}
     */
    this.formulaInput = document.getElementById("formulaInput");

    /**
     * Element with id 'errorInput' of the DOM tree.
     * Used to display a warning text for incorrect entries.
     * @type {Element}
     */
    this.errorInput = document.getElementById("errorInput");

    /**
     * Element with id 'satisfiableSpan' of the DOM tree.
     * Used to display, that the formula is satisfiable.
     * @type {Element}
     */
    this.satisfiableSpan = document.getElementById("satisfiableSpan");

    /**
     * Element with id 'satisfiableSpan' of the DOM tree.
     * Used to display, that the formula is unsatisfiable.
     * @type {Element}
     */
    this.unsatisfiableSpan = document.getElementById("unsatisfiableSpan");

    /**
     * Element with id 'tautologySpan' of the DOM tree.
     * Used to display, that the formula is or is not tautology.
     * @type {Element}
     */
    this.tautologySpan = document.getElementById("tautologySpan");

    /**
     * Element with id 'nextStepButton' of the DOM tree.
     * Used to display the button next-step in the pop-up window step by step solution.
     * @type {Element}
     */
    this.nextStepButton = document.getElementById("nextStepButton");

    /**
     * Element with id 'stepByStepDiv' of the DOM tree.
     * Used to display the solution in the pop-up window step by step solution.
     * @type {Element}
     */
    this.stepByStepDiv = document.getElementById("stepByStepDiv");


    /**
     * Element with id 'tautologyDiv' of the DOM tree.
     * Used to display the test result, if the formula is or is not tautology.
     * @type {Element}
     */
    this.tautologyDiv = document.getElementById("tautologyDiv");

    /**
     * Element with id 'unsatisfiableDiv' of the DOM tree.
     * Used to display the test result, if the formula is unsatisfiable.
     * @type {Element}
     */
    this.unsatisfiableDiv = document.getElementById("unsatisfiableDiv");

    /**
     * Element with id 'satisfiableDiv' of the DOM tree.+
     * Used to display the test result, if the formula is satisfiable.
     * @type {Element}
     */
    this.satisfiableDiv = document.getElementById("satisfiableDiv");

    /**
     * Element with id 'panel-input' of the DOM tree.
     * Used to display the panel input.
     * @type {Element}
     */
    this.panelInput = document.getElementById("panel-input");

    /**
     * Element with id 'panel-result' of the DOM tree.
     * Used to display the panel containing the test result.
     * @type {Element}
     */
    this.panelResult = document.getElementById("panel-result");

    /**
     * Element with id 'panel-formula' of the DOM tree.
     * Used to display the panel containing the representation of the formula.
     * @type {Element}
     */
    this.panelFormula = document.getElementById("panel-formula");

    /**
     * Element with id 'panel-tableau' of the DOM tree.
     * Used to display the panel containing the representation of the tableau.
     * @type {Element}
     */
    this.panelTableau = document.getElementById("panel-tableau");

    /**
     * Reference to the controller that controls this view.
     * @type {TableauController}
     */
    this.controller = new TableauController(this);

    return this;
}

/**
 * Activated when the user presses tautology-button.
 * Display the result of the tautology test
 */
TableauView.prototype.checkTautology = function () {
    this.clearStepByStepDiv();
    var input = this.controller.toDisplayInput(this.input.value);
    this.panelInput.style.display = 'block';
    this.formulaInput.innerHTML = input;
    // RootFormula = this.controller.getRootOfParserTree(this.input.value);
    google.charts.load('current', {packages: ["orgchart"]});
    // this.controller.rootFormula = this.controller.getRootOfParserTree(this.input.value);
    if (!InputError) {
        this.errorInput.innerHTML = "";
        this.controller.tautology();
    } else {
        var message = "";
        for(var i = 0; i< ErrorMessage.length; i++){
            message += ErrorMessage[i] + ". "
        }
        this.errorInput.innerHTML = "Fehlerhafte Eingabe!\n" + this.translateMessage(message);
        this.resetPage()
    }
    InputError = false;

};

/**
 * Actiavated when the user presses satisfiability-button.
 * Display the result of the satisfiability test
 */
TableauView.prototype.checkSatisfiable = function () {
    this.clearStepByStepDiv();
    var input = this.controller.toDisplayInput(this.input.value);
    this.panelInput.style.display = 'block';
    this.formulaInput.innerHTML = input;
    // RootFormula = this.controller.getRootOfParserTree(this.input.value);
    google.charts.load('current', {packages: ["orgchart"]});
    // this.controller.rootFormula = this.controller.getRootOfParserTree(this.input.value);
    if (!InputError) {
        this.errorInput.innerHTML = "";
        this.controller.satisfiable();
    } else {
        var message = "";
        for(var i = 0; i< ErrorMessage.length; i++){
            message += ErrorMessage[i] + ". "
        }
        this.errorInput.innerHTML = "Fehlerhafte Eingabe!\n" + this.translateMessage(message);
        this.resetPage();
    }
    InputError = false;
};


/**
 * Is called if user presses next-step-button.
 * Displays the DIV element of the next step, if it exists.
 */
TableauView.prototype.displayNextSolutionStep = function () {
    var nextDivId = "div-step-" + nextStepNr;
    var isNextDivIdExist = document.getElementById(nextDivId);
    if (isNextDivIdExist) {
        document.getElementById(nextDivId).style.display = "block";
    }
//        var afterNextChartId = "chart-step-" + (nextStepNr + 1);
    var afterNextDivId = "div-step-" + (nextStepNr + 1);
    var isAfterNextDivIdExist = document.getElementById(afterNextDivId);
//        var isAfterNextChartIdExist = document.getElementById(afterNextChartId);
    if (!isAfterNextDivIdExist) {
        this.nextStepButton.style.display = "none";
    }
    nextStepNr++;
};

/**
 * Creates the complete step by step solution structure.
 */
TableauView.prototype.createStepByStepSolution = function () {
    if (ArrOfTableauNodesByStepByStep == 0) {
        ArrOfAllTableauNodes = this.controller.rootTableau.getTableauWithRuleForChart();
        google.charts.setOnLoadCallback(drawTableauChartWithRule);
        var allNodes = [];
        var dummy = [];
        dummy = this.controller.rootTableau.inOrder(this.controller.rootTableau, dummy);
        allNodes = this.controller.rootTableau.levelOrder(allNodes);
        while (allNodes.length != 0) {
            var text = "";
            var nodesInStep = [];
            nodesInStep.push(allNodes.shift());
            if (allNodes.length > 0 && (nodesInStep[nodesInStep.length - 1].getParent() != null) && nodesInStep[nodesInStep.length - 1].getParent().getId() == allNodes[0].getParent().getId()) {
                nodesInStep.push(allNodes.shift());
            }
            if (nodesInStep[0].getParent() != null) {
                if (nodesInStep[0].getParent().getRule() != "") {
                    text += "Verwende Regel " + "<span class='text-info'>" + nodesInStep[0].getParent().getRule() + "<\span>";
                    var formulas = nodesInStep[0].getParent().getListOfFormulas();
                    var alpha = false;
                    var beta = false;
                    for (var i = 0; i < formulas.length; i++) {
                        if (formulas[i].getFormulaType() == FormulaTypeEnum.ALPHA) alpha = true;
                        if (formulas[i].getFormulaType() == FormulaTypeEnum.BETA) beta = true;
                    }
                    if (alpha && beta) {
                        text += "<p> <span  class='text-info'><em><u>Hinweis:</u>Um möglichst wenig zu verzweigen d.h. bevorzuge α-Regeln.</em></span></p>";
                    }
                }
            }
            this.createSolutionStepDiv(text);
            for (var i = 0; i < nodesInStep.length; i++) {
                if (nodesInStep[i].getStatus() == StatusEnum.CLOSEDLEAF) {
                    this.createSolutionStepDiv("Das Blatt wird als <span  class='text-info'>&times; <em>(geschlossen)</em></span> markiert, da es komplementäres Paar von Literalen enthält.");
                }
                if (nodesInStep[i].getStatus() == StatusEnum.OPENEDLEAF) {
                    this.createSolutionStepDiv("Das Blatt wird als <span  class='text-info'>&odot; <em>(offen)</em></span> markiert, da es keine komplementäres Paar von Literalen enthält.");
                }
            }
        }
        var divCurrentStep = document.createElement("div");
        divCurrentStep.id = "div-step-" + stepNr;
        var pDivider = document.createElement("p");
        pDivider.className = "divider";
        divCurrentStep.appendChild(pDivider);
        this.createSolutionStepHeaderP(divCurrentStep);
        var text = "";
        if (isTautology == TautologyOrSatisfiableEnum.NOTTESTED) {
            if (isSatifiable == TautologyOrSatisfiableEnum.TRUE) text = "Die Formel ist <span class = \" text-info\"><em>erfüllbar</em></span>, da das Tableau mindestens ein offen markiertes Blatt hat.";
            if (isSatifiable == TautologyOrSatisfiableEnum.FALSE) text = "Die Formel ist <span class = \" text-info\"><em>unerfüllbar</em></span>, da das Tableau kein offen markiertes Blatt hat.";
        }
        if (isSatifiable == TautologyOrSatisfiableEnum.NOTTESTED) {
            if (isTautology == TautologyOrSatisfiableEnum.TRUE) text = "Die Formel ist <span class = \" text-info\"><em>eine Tautology</em></span>, da alle Blätter des Tableau (der negierten Formel) als geschlossen markiert sind.";
            if (isTautology == TautologyOrSatisfiableEnum.FALSE) text = "Die Formel ist <span class = \" text-info\"><em>keine Tautology</em></span>, da das Tableau (von der negierten Formel) mindestens ein offen markiertes Blatt hat.";
        }
        this.createSolutionStepBodyP(divCurrentStep, text);
        divCurrentStep.style.display = 'none';
        this.stepByStepDiv.appendChild(divCurrentStep);
    }
};

/**
 * Creates a P element for the header of a step solution.
 * @param parentElement:  parent element of the creating element.
 */
TableauView.prototype.createSolutionStepHeaderP = function (parentElement) {

    var p = document.createElement("p");
    p.className = "text-info";
    var b = document.createElement("b");
    var node = document.createTextNode("Schritt " + stepNr + ": ");
    b.appendChild(node);
    p.appendChild(b);
    parentElement.appendChild(p);


};

/**
 * Creates a P element for the body of a step solution.
 * @param parentElement:  parent element of the creating element.
 */
TableauView.prototype.createSolutionStepBodyP = function (parentElement, text) {
    var p = document.createElement("p");
    p.innerHTML = text;
    parentElement.appendChild(p);


};

/**
 * Creates a P element for the chart of a step solution.
 * @param parentElement:  parent element of the creating element.
 */
TableauView.prototype.createSolutionStepChartP = function (parentElement) {
    var p = document.createElement("p");
    p.id = "chart-step-" + stepNr;
    p.className = "scroll";
    parentElement.appendChild(p);
};


/**
 * Create a DIV element that contains header, body and chart of a step solution.
 */
TableauView.prototype.createSolutionStepDiv = function (text) {
    var divCurrentStep = document.createElement("div");
    divCurrentStep.id = "div-step-" + stepNr;
    if (divCurrentStep.id != "div-step-1") {
        var pDivider = document.createElement("p");
        pDivider.className = "divider";
        divCurrentStep.appendChild(pDivider);
        divCurrentStep.style.display = 'none';
    }
    this.createSolutionStepHeaderP(divCurrentStep);
    this.createSolutionStepBodyP(divCurrentStep, text);
    this.createSolutionStepChartP(divCurrentStep);
    this.stepByStepDiv.appendChild(divCurrentStep);
    google.charts.setOnLoadCallback(drawTableauChartStepByStep);
    stepNr++;
};

/**
 * Hides a element
 * @param elementId
 */
TableauView.prototype.hideHtmlElement = function (elementId) {
    var htmlElement = document.getElementById(elementId);
    htmlElement.style.display = 'none';
};

/**
 * Resets page
 */
TableauView.prototype.resetPage = function () {
    this.hideHtmlElement("panel-result");
    this.hideHtmlElement("panel-tableau");
    this.hideHtmlElement("panel-formula");
    this.clearStepByStepDiv();
    ErrorMessage = [];
};

/**
 * Clears step by step Div element
 */
TableauView.prototype.clearStepByStepDiv = function () {
    stepNr = 1;
    nextStepNr = 2;
    chartNr = 1;
    ArrOfTableauNodesByStepByStep = [];
    ArrOfAllTableauNodes = [];
    while (this.stepByStepDiv.firstChild) {
        this.stepByStepDiv.removeChild(this.stepByStepDiv.firstChild);
    }
    this.nextStepButton.style.display = "block";
};

/**
 * Translates a message to german
 * @param message: message to be translated
 * @returns {XML|string}
 */
TableauView.prototype.translateMessage = function (message) {
    return message.replace("extraneous", "zusätzliche")
        .replace("input", "Eingabe")
        .replace("expecting", "erwartet:")
        .replace("mismatched", "Nicht übereinstimmende")
        .replace("ATOM", "Atom (zB: p,q...)")
        .replace("TRUE", "TRUE (oder 1, true...)")
        .replace("FALSE", "FALSE (oder 0, false...)")
        .replace("token recognition error at", "Zeichensfehler bei")
        .replace("<EOF>", "EOF");

};
exports.TableauView = TableauView;
