/**
 * All global variables and namespaces of this project
 * Created by Tram Nguyen on 01.07.2018.
 */

// Namespaces
var antlr4 = require('antlr4/index.js');
var ErrorListener = require('antlr4/error/ErrorListener.js').ErrorListener;
var FormulaGrammarLexer = require('antlr4-generated-sources/FormulaGrammarLexer.js').FormulaGrammarLexer;
var FormulaGrammarParser = require('antlr4-generated-sources/FormulaGrammarParser.js').FormulaGrammarParser;
var FormulaGrammarListener = require("antlr4-generated-sources/FormulaGrammarListener.js").FormulaGrammarListener;
var Formula = require("src/Model/Formula.js").Formula;
var FormulaListener = require("src/Model/FormulaListener.js").FormulaListener;
var TableauNode = require("src/Model/TableauNode.js").TableauNode;
var Tableau = require("src/Model/Tableau.js").Tableau;
var StatusEnum = require("src/Enums.js").StatusEnum;
var FormulaTypeEnum = require("src/Enums.js").FormulaTypeEnum;
var RuleEnum = require("src/Enums.js").RuleEnum;
var FormulaOperatorEnum = require("src/Enums.js").FormulaOperatorEnum;
var TableauForPropositionalLogic = require("src/Model/TableauForPropositionalLogic.js").TableauForPropositionalLogic;
var TableauController = require("src/ControllerAndView/TableauController.js").TableauController;
var TableauView = require("src/ControllerAndView/TableauView.js").TableauView;
var TautologyOrSatisfiableEnum = require("src/Enums.js").TautologyOrSatisfiableEnum;


// Global variables
var view;
var InputError = false;         //True if there is an Antlr error message.
var ErrorMessage = [];          //An array to store the Antlr error messages.
var TableauChartData;           //Google Charts DataTable to visualize the tableau
var ArrOfTableauNodesByStepByStep = [];        //An array stores the tableau nodes for the tableau chart in one step of the solution
var ArrOfAllTableauNodes = [];          //An array stores the rest of the Tableau nodes that are not yet in use
var TableauStepByStepData;          //Google Charts DataTable to visualize the tableau (step by step solution)
var stepNr = 1;         //Ordinal number of the current step
var chartNr = 1;           //Ordinal number of the current organization chart
var nextStepNr = 2;         //Ordinal number of the current step
var isTautology = TautologyOrSatisfiableEnum.NOTTESTED;         //Result of the tautology test
var isSatifiable = TautologyOrSatisfiableEnum.NOTTESTED;        //Result of the satisfiability test
