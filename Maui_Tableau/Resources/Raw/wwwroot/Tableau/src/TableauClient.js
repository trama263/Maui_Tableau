/**
 * Interface to the HTML document
 * Created by Tram Nguyen on 04.07.2018.
 */


/**
 * Call checkTautology() function of TableauView
 */
function pressTautologyButton() {
    view = new TableauView();
    view.checkTautology();
}

/**
 *  Call pressSatisfiableButton() function of TableauView
 */
function pressSatisfiableButton() {

    view = new TableauView();
    view.checkSatisfiable();
}

/**
 * Call stepByStepSolution() function of TableauView
 */
function stepByStepSolution() {
    view.createStepByStepSolution();
}

/**
 *  Call pressNextStepButton() function of TableauView
 */
function pressNextStepButton() {
    view.displayNextSolutionStep();
}

/**
 * The function draw a Tableau by Google Charts Tool
 */
function drawTableauChart() {
    TableauChartData = new google.visualization.DataTable();
    var arrOfTableauNodes = view.controller.rootTableau.getTableauForChart();

    // For each orgchart box, provide the label, and the parentNode
    TableauChartData.addColumn('string', 'Label');
    TableauChartData.addColumn('string', 'Parent');

    TableauChartData.addRows(arrOfTableauNodes);
    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('Tableau_chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(TableauChartData, {allowHtml: true});
}

/**
 * The function draw a Tableau (for step by step function) by Google Charts Tool
 */
function drawTableauChartStepByStep() {
    ArrOfTableauNodesByStepByStep.push(ArrOfAllTableauNodes.shift());

    if (ArrOfAllTableauNodes.length > 0 && ArrOfTableauNodesByStepByStep[ArrOfTableauNodesByStepByStep.length - 1][1] == ArrOfAllTableauNodes[0][1]) {
        ArrOfTableauNodesByStepByStep.push(ArrOfAllTableauNodes.shift());
    }
    //if ArrOfTableauNodesByStepByStep[ArrOfTableauNodesByStepByStep.length - 1] is a opened or closed TableauNode
    if (ArrOfAllTableauNodes.length > 1 && ArrOfTableauNodesByStepByStep[ArrOfTableauNodesByStepByStep.length - 1][1] == ArrOfAllTableauNodes[1][1]) {
        ArrOfTableauNodesByStepByStep.push(ArrOfAllTableauNodes[1]);
        ArrOfAllTableauNodes.splice(1, 1);
    }
    TableauStepByStepData = new google.visualization.DataTable();
    TableauStepByStepData.addColumn('string', 'Label');
    TableauStepByStepData.addColumn('string', 'Parent');
    TableauStepByStepData.addRows(ArrOfTableauNodesByStepByStep);

    var pChartId = "chart-step-" + chartNr;
    chartNr++;
    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById(pChartId));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(TableauStepByStepData, {allowHtml: true});
}

/**
 * The function draw a Tableau with rules by Google Charts Tool
 */
function drawTableauChartWithRule() {
    TableauChartData = new google.visualization.DataTable();
    var arrOfTableauNodes = view.controller.rootTableau.getTableauWithRuleForChart();

    // For each orgchart box, provide the label, and the parentNode
    TableauChartData.addColumn('string', 'Label');
    TableauChartData.addColumn('string', 'Parent');
    TableauChartData.addRows(arrOfTableauNodes);
    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('stepByStepDiagram'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(TableauChartData, {allowHtml: true});
    document.getElementById('stepByStepDiagram').style.display = "none";

}

/**
 * The function draw a formula  by Google Charts Tool
 */
function drawFormulaChart() {
     var FormulaChartData = new google.visualization.DataTable();
    var arrOfFormulas = view.controller.rootFormula.getFormulasForChart();

    // For each orgchart box, provide the label, and the parentNode
    FormulaChartData.addColumn('string', 'Label');
    FormulaChartData.addColumn('string', 'Parent');
    FormulaChartData.addRows(arrOfFormulas);
    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('Formula_chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(FormulaChartData, {allowHtml: true});
}
