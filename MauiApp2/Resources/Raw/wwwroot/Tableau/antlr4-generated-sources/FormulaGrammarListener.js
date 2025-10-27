// Generated from FormulaGrammar.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by FormulaGrammarParser.
function FormulaGrammarListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

FormulaGrammarListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
FormulaGrammarListener.prototype.constructor = FormulaGrammarListener;

// Enter a parse tree produced by FormulaGrammarParser#stat.
FormulaGrammarListener.prototype.enterStat = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#stat.
FormulaGrammarListener.prototype.exitStat = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#AndNand.
FormulaGrammarListener.prototype.enterAndNand = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#AndNand.
FormulaGrammarListener.prototype.exitAndNand = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#OrNor.
FormulaGrammarListener.prototype.enterOrNor = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#OrNor.
FormulaGrammarListener.prototype.exitOrNor = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#Negation.
FormulaGrammarListener.prototype.enterNegation = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#Negation.
FormulaGrammarListener.prototype.exitNegation = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#Parens.
FormulaGrammarListener.prototype.enterParens = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#Parens.
FormulaGrammarListener.prototype.exitParens = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#True.
FormulaGrammarListener.prototype.enterTrue = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#True.
FormulaGrammarListener.prototype.exitTrue = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#False.
FormulaGrammarListener.prototype.enterFalse = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#False.
FormulaGrammarListener.prototype.exitFalse = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#Implication.
FormulaGrammarListener.prototype.enterImplication = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#Implication.
FormulaGrammarListener.prototype.exitImplication = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#Atom.
FormulaGrammarListener.prototype.enterAtom = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#Atom.
FormulaGrammarListener.prototype.exitAtom = function(ctx) {
};


// Enter a parse tree produced by FormulaGrammarParser#EquXor.
FormulaGrammarListener.prototype.enterEquXor = function(ctx) {
};

// Exit a parse tree produced by FormulaGrammarParser#EquXor.
FormulaGrammarListener.prototype.exitEquXor = function(ctx) {
};



exports.FormulaGrammarListener = FormulaGrammarListener;