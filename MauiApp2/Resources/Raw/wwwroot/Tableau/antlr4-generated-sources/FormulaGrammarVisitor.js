// Generated from FormulaGrammar.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by FormulaGrammarParser.

function FormulaGrammarVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

FormulaGrammarVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
FormulaGrammarVisitor.prototype.constructor = FormulaGrammarVisitor;

// Visit a parse tree produced by FormulaGrammarParser#stat.
FormulaGrammarVisitor.prototype.visitStat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#AndNand.
FormulaGrammarVisitor.prototype.visitAndNand = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#OrNor.
FormulaGrammarVisitor.prototype.visitOrNor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#Negation.
FormulaGrammarVisitor.prototype.visitNegation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#Parens.
FormulaGrammarVisitor.prototype.visitParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#True.
FormulaGrammarVisitor.prototype.visitTrue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#False.
FormulaGrammarVisitor.prototype.visitFalse = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#Implication.
FormulaGrammarVisitor.prototype.visitImplication = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#Atom.
FormulaGrammarVisitor.prototype.visitAtom = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaGrammarParser#EquXor.
FormulaGrammarVisitor.prototype.visitEquXor = function(ctx) {
  return this.visitChildren(ctx);
};



exports.FormulaGrammarVisitor = FormulaGrammarVisitor;