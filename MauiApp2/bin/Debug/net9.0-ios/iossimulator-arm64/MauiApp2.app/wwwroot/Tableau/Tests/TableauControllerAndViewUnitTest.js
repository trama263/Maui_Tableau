/**
 * Unit test for TableauView, TableauController, TableauClient.js
 * Created by Tram Nguyen on 02.07.2018.
 */
document.getElementById('input').value = "(p|q)&(!p&!q)";
view = new TableauView();

describe("Tests TableauView", function () {
    beforeEach(function() {
        google.charts.load('current', {packages: ["orgchart"]});
    });
    it("Tests TableauView Constructor", function () {
        document.getElementById('input').value = "(p|q)&(!p&!q)";
        var testView= new TableauView();
        expect(testView.input.value).toEqual("(p|q)&(!p&!q)");
    });


});


describe("Tests TableauController", function () {
    beforeEach(function() {
    google.charts.load('current', {packages: ["orgchart"]});
     });


    it("Tests TableauController Constructor", function () {
    expect(view.controller).toEqual(view.controller);
    });

    it("Tests TableauController.getRootOfParserTree", function () {
        var expected = new Formula("q",null,null,FormulaTypeEnum.POSITIVLITERAL);
        expect(expected).toEqual(view.controller.getRootOfParserTree("q"));
    });

});

describe('Testing DOM manipulation', function(){
    beforeEach(function() {
    google.charts.load('current', {packages: ["orgchart"]});
    });

    it("Tests TableauController.tautology()", function () {
        var view =new TableauView();
        view.input.value = "(p|q)&(!p&!q)";
        var step = stepNr;
        view.controller.tautology();
        step = step + 1 ;
        expect(step).toEqual(stepNr);
        expect(step).toEqual(stepNr);

    });
    it("Tests TableauController.satisfiable()", function () {
        var view =new TableauView();
        view.input.value = "(p|q)&(!p&!q)";
        view.controller.satisfiable();
        expect("block").toEqual(view.panelTableau.style.display);
    });
    it("Tests TableauController.toDisplayInput()", function () {
        var view =new TableauView();
        var expected = "("+ FormulaOperatorEnum.NEG + "p"+ FormulaOperatorEnum.AND + "p"+ FormulaOperatorEnum.OR+
        "p" + FormulaOperatorEnum.IMP + "p" + FormulaOperatorEnum.EQU +"p"+ FormulaOperatorEnum.XOR + "p" +
            FormulaOperatorEnum.NOR + "p" + FormulaOperatorEnum.NAND + "p)";
        var input =  view.controller.toDisplayInput("(!p&p|p=>p<=>p^p!|p!&p)");
        expect(expected).toEqual(input);
    });
    it("Tests TableauView.checkTautology()", function () {
        view.checkTautology();
        expect(false).toBe(InputError);
    });
    it("Tests TableauView.checkSatisfiable()", function () {
        var view =new TableauView();
        view.input.value = "p&q";
        view.checkSatisfiable();
        expect(false).toBe(InputError);

    });
    it("Tests TableauView.displayNextSolutionStep()", function () {
        var testView= new TableauView();
        var expectedStep = nextStepNr;
        expectedStep += 1;
        view.displayNextSolutionStep();
        expect(expectedStep).toBe(nextStepNr);
    });
    // it("Tests TableauView.createStepByStepSolution()", function () {
    //     var id= "div-step-" + stepNr;
    //     view.createStepByStepSolution();
    //     expect(null).not.toBe(document.getElementById(id));
    // });

    it("Tests TableauView.resetPage()", function () {
        var expectedErrorMessage = [];
        view.resetPage();
        expect(expectedErrorMessage).toEqual(ErrorMessage);
    });

    it("Tests TableauView.createSolutionStepChartP()", function () {
        var testView= new TableauView();
        var div = document.createElement("div");
        document.getElementsByTagName('body')[0].appendChild(div);
        var id = "chart-step-"+ stepNr;
        view.createSolutionStepChartP(div);
        expect(null).not.toBe(document.getElementById(id));
    });

    it("Tests TableauView.translateMessage()", function () {
        var testView= new TableauView();
        var expected = "Eingabe";
        expect("Eingabe").toEqual(view.translateMessage("input"));
    });


});


describe("Tests TableauClient.js", function () {
    beforeEach(function() {
        google.charts.load('current', {packages: ["orgchart"]});
    });

    it("Tests pressTautologyButton()", function () {
        document.getElementById('input').value = "(p|q)&(!p&!q)";
        pressTautologyButton();
        expect(isTautology).toEqual(TautologyOrSatisfiableEnum.FALSE);
        expect(isSatifiable).toEqual(TautologyOrSatisfiableEnum.NOTTESTED);
        document.getElementById('input').value = "p|1";
        pressTautologyButton();
        expect(isTautology).toEqual(TautologyOrSatisfiableEnum.TRUE);
        expect(isSatifiable).toEqual(TautologyOrSatisfiableEnum.NOTTESTED);
    });
    it("Tests stepByStepSolution(),  pressNextStepButton()", function () {
        pressTautologyButton();
        stepByStepSolution();
        expect(document.getElementById("div-step-2")).not.toBe(null);
        pressSatisfiableButton();
        stepByStepSolution();
        expect(document.getElementById("div-step-2")).not.toBe(null);
        expect(document.getElementById("div-step-2").style.display).toEqual("none");
        pressNextStepButton();
        expect(document.getElementById("div-step-2").style.display).toEqual("block");
    });

    it("Tests pressSatisfiableButton()", function () {
        document.getElementById('input').value = "p&0";
        pressSatisfiableButton();
        expect(isTautology).toEqual(TautologyOrSatisfiableEnum.NOTTESTED);
        expect(isSatifiable).toEqual(TautologyOrSatisfiableEnum.FALSE);
        document.getElementById('input').value = "p&1";
        pressSatisfiableButton();
        expect(isTautology).toEqual(TautologyOrSatisfiableEnum.NOTTESTED);
        expect(isSatifiable).toEqual(TautologyOrSatisfiableEnum.TRUE);
    });


    it("Tests errorinput", function () {
        document.getElementById('input').value = "p&";
        pressSatisfiableButton();
        var result = view.errorInput.innerHTML.indexOf("Fehlerhafte") !== -1;
        expect(true).toEqual(result);
        pressTautologyButton();
        result = view.errorInput.innerHTML.indexOf("Fehlerhafte") !== -1;
        expect(true).toEqual(result);

    });

});

// function pressTautologyButton() {
//
//     view = new TableauView();
//     view.checkTautology();
// }
// function pressSatisfiableButton() {
//
//     view = new TableauView();
//     view.checkSatisfiable();
// }
// function stepByStepSolution() {
//
//     view.createStepByStepSolution();
// }
// function pressNextStepButton() {
//
//     view.displayNextSolutionStep();
// }