// Generated from FormulaGrammar.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');
var FormulaGrammarListener = require('./FormulaGrammarListener').FormulaGrammarListener;
var FormulaGrammarVisitor = require('./FormulaGrammarVisitor').FormulaGrammarVisitor;

var grammarFileName = "FormulaGrammar.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0010\'\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003\u0014\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0007\u0003\"\n\u0003\f\u0003\u000e\u0003%",
    "\u000b\u0003\u0003\u0003\u0002\u0003\u0004\u0004\u0002\u0004\u0002\u0005",
    "\u0003\u0002\t\n\u0003\u0002\u000b\f\u0003\u0002\u0007\b\u0002,\u0002",
    "\u0006\u0003\u0002\u0002\u0002\u0004\u0013\u0003\u0002\u0002\u0002\u0006",
    "\u0007\u0005\u0004\u0003\u0002\u0007\b\u0007\u0002\u0002\u0003\b\u0003",
    "\u0003\u0002\u0002\u0002\t\n\b\u0003\u0001\u0002\n\u000b\u0007\u0005",
    "\u0002\u0002\u000b\u0014\u0005\u0004\u0003\u000b\f\u0014\u0007\r\u0002",
    "\u0002\r\u0014\u0007\u000e\u0002\u0002\u000e\u0014\u0007\u000f\u0002",
    "\u0002\u000f\u0010\u0007\u0003\u0002\u0002\u0010\u0011\u0005\u0004\u0003",
    "\u0002\u0011\u0012\u0007\u0004\u0002\u0002\u0012\u0014\u0003\u0002\u0002",
    "\u0002\u0013\t\u0003\u0002\u0002\u0002\u0013\f\u0003\u0002\u0002\u0002",
    "\u0013\r\u0003\u0002\u0002\u0002\u0013\u000e\u0003\u0002\u0002\u0002",
    "\u0013\u000f\u0003\u0002\u0002\u0002\u0014#\u0003\u0002\u0002\u0002",
    "\u0015\u0016\f\n\u0002\u0002\u0016\u0017\t\u0002\u0002\u0002\u0017\"",
    "\u0005\u0004\u0003\u000b\u0018\u0019\f\t\u0002\u0002\u0019\u001a\t\u0003",
    "\u0002\u0002\u001a\"\u0005\u0004\u0003\n\u001b\u001c\f\b\u0002\u0002",
    "\u001c\u001d\u0007\u0006\u0002\u0002\u001d\"\u0005\u0004\u0003\t\u001e",
    "\u001f\f\u0007\u0002\u0002\u001f \t\u0004\u0002\u0002 \"\u0005\u0004",
    "\u0003\b!\u0015\u0003\u0002\u0002\u0002!\u0018\u0003\u0002\u0002\u0002",
    "!\u001b\u0003\u0002\u0002\u0002!\u001e\u0003\u0002\u0002\u0002\"%\u0003",
    "\u0002\u0002\u0002#!\u0003\u0002\u0002\u0002#$\u0003\u0002\u0002\u0002",
    "$\u0005\u0003\u0002\u0002\u0002%#\u0003\u0002\u0002\u0002\u0005\u0013",
    "!#"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'('", "')'", "'!'", "'=>'", "'<=>'", "'^'", 
                     "'&'", "'!&'", "'|'", "'!|'" ];

var symbolicNames = [ null, null, null, "NEG", "IMP", "EQU", "XOR", "AND", 
                      "NAND", "OR", "NOR", "ATOM", "TRUE", "FALSE", "WS" ];

var ruleNames =  [ "stat", "expr" ];

function FormulaGrammarParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

FormulaGrammarParser.prototype = Object.create(antlr4.Parser.prototype);
FormulaGrammarParser.prototype.constructor = FormulaGrammarParser;

Object.defineProperty(FormulaGrammarParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

FormulaGrammarParser.EOF = antlr4.Token.EOF;
FormulaGrammarParser.T__0 = 1;
FormulaGrammarParser.T__1 = 2;
FormulaGrammarParser.NEG = 3;
FormulaGrammarParser.IMP = 4;
FormulaGrammarParser.EQU = 5;
FormulaGrammarParser.XOR = 6;
FormulaGrammarParser.AND = 7;
FormulaGrammarParser.NAND = 8;
FormulaGrammarParser.OR = 9;
FormulaGrammarParser.NOR = 10;
FormulaGrammarParser.ATOM = 11;
FormulaGrammarParser.TRUE = 12;
FormulaGrammarParser.FALSE = 13;
FormulaGrammarParser.WS = 14;

FormulaGrammarParser.RULE_stat = 0;
FormulaGrammarParser.RULE_expr = 1;

function StatContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FormulaGrammarParser.RULE_stat;
    return this;
}

StatContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatContext.prototype.constructor = StatContext;

StatContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

StatContext.prototype.EOF = function() {
    return this.getToken(FormulaGrammarParser.EOF, 0);
};

StatContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterStat(this);
	}
};

StatContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitStat(this);
	}
};

StatContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitStat(this);
    } else {
        return visitor.visitChildren(this);
    }
};




FormulaGrammarParser.StatContext = StatContext;

FormulaGrammarParser.prototype.stat = function() {

    var localctx = new StatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, FormulaGrammarParser.RULE_stat);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 4;
        this.expr(0);
        this.state = 5;
        this.match(FormulaGrammarParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FormulaGrammarParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;


 
ExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function AndNandContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AndNandContext.prototype = Object.create(ExprContext.prototype);
AndNandContext.prototype.constructor = AndNandContext;

FormulaGrammarParser.AndNandContext = AndNandContext;

AndNandContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
AndNandContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterAndNand(this);
	}
};

AndNandContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitAndNand(this);
	}
};

AndNandContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitAndNand(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function OrNorContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

OrNorContext.prototype = Object.create(ExprContext.prototype);
OrNorContext.prototype.constructor = OrNorContext;

FormulaGrammarParser.OrNorContext = OrNorContext;

OrNorContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
OrNorContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterOrNor(this);
	}
};

OrNorContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitOrNor(this);
	}
};

OrNorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitOrNor(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function NegationContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NegationContext.prototype = Object.create(ExprContext.prototype);
NegationContext.prototype.constructor = NegationContext;

FormulaGrammarParser.NegationContext = NegationContext;

NegationContext.prototype.NEG = function() {
    return this.getToken(FormulaGrammarParser.NEG, 0);
};

NegationContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
NegationContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterNegation(this);
	}
};

NegationContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitNegation(this);
	}
};

NegationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitNegation(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ParensContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParensContext.prototype = Object.create(ExprContext.prototype);
ParensContext.prototype.constructor = ParensContext;

FormulaGrammarParser.ParensContext = ParensContext;

ParensContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ParensContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterParens(this);
	}
};

ParensContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitParens(this);
	}
};

ParensContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitParens(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function TrueContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

TrueContext.prototype = Object.create(ExprContext.prototype);
TrueContext.prototype.constructor = TrueContext;

FormulaGrammarParser.TrueContext = TrueContext;

TrueContext.prototype.TRUE = function() {
    return this.getToken(FormulaGrammarParser.TRUE, 0);
};
TrueContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterTrue(this);
	}
};

TrueContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitTrue(this);
	}
};

TrueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitTrue(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FalseContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FalseContext.prototype = Object.create(ExprContext.prototype);
FalseContext.prototype.constructor = FalseContext;

FormulaGrammarParser.FalseContext = FalseContext;

FalseContext.prototype.FALSE = function() {
    return this.getToken(FormulaGrammarParser.FALSE, 0);
};
FalseContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterFalse(this);
	}
};

FalseContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitFalse(this);
	}
};

FalseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitFalse(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ImplicationContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ImplicationContext.prototype = Object.create(ExprContext.prototype);
ImplicationContext.prototype.constructor = ImplicationContext;

FormulaGrammarParser.ImplicationContext = ImplicationContext;

ImplicationContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ImplicationContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterImplication(this);
	}
};

ImplicationContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitImplication(this);
	}
};

ImplicationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitImplication(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AtomContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AtomContext.prototype = Object.create(ExprContext.prototype);
AtomContext.prototype.constructor = AtomContext;

FormulaGrammarParser.AtomContext = AtomContext;

AtomContext.prototype.ATOM = function() {
    return this.getToken(FormulaGrammarParser.ATOM, 0);
};
AtomContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterAtom(this);
	}
};

AtomContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitAtom(this);
	}
};

AtomContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitAtom(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function EquXorContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

EquXorContext.prototype = Object.create(ExprContext.prototype);
EquXorContext.prototype.constructor = EquXorContext;

FormulaGrammarParser.EquXorContext = EquXorContext;

EquXorContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
EquXorContext.prototype.enterRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.enterEquXor(this);
	}
};

EquXorContext.prototype.exitRule = function(listener) {
    if(listener instanceof FormulaGrammarListener ) {
        listener.exitEquXor(this);
	}
};

EquXorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaGrammarVisitor ) {
        return visitor.visitEquXor(this);
    } else {
        return visitor.visitChildren(this);
    }
};



FormulaGrammarParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, FormulaGrammarParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 17;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case FormulaGrammarParser.NEG:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 8;
            this.match(FormulaGrammarParser.NEG);
            this.state = 9;
            this.expr(9);
            break;
        case FormulaGrammarParser.ATOM:
            localctx = new AtomContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 10;
            this.match(FormulaGrammarParser.ATOM);
            break;
        case FormulaGrammarParser.TRUE:
            localctx = new TrueContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 11;
            this.match(FormulaGrammarParser.TRUE);
            break;
        case FormulaGrammarParser.FALSE:
            localctx = new FalseContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 12;
            this.match(FormulaGrammarParser.FALSE);
            break;
        case FormulaGrammarParser.T__0:
            localctx = new ParensContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 13;
            this.match(FormulaGrammarParser.T__0);
            this.state = 14;
            this.expr(0);
            this.state = 15;
            this.match(FormulaGrammarParser.T__1);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 33;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 31;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new AndNandContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaGrammarParser.RULE_expr);
                    this.state = 19;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 20;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===FormulaGrammarParser.AND || _la===FormulaGrammarParser.NAND)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 21;
                    this.expr(9);
                    break;

                case 2:
                    localctx = new OrNorContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaGrammarParser.RULE_expr);
                    this.state = 22;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 23;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===FormulaGrammarParser.OR || _la===FormulaGrammarParser.NOR)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 24;
                    this.expr(8);
                    break;

                case 3:
                    localctx = new ImplicationContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaGrammarParser.RULE_expr);
                    this.state = 25;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 26;
                    this.match(FormulaGrammarParser.IMP);
                    this.state = 27;
                    this.expr(7);
                    break;

                case 4:
                    localctx = new EquXorContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaGrammarParser.RULE_expr);
                    this.state = 28;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 29;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===FormulaGrammarParser.EQU || _la===FormulaGrammarParser.XOR)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 30;
                    this.expr(6);
                    break;

                } 
            }
            this.state = 35;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


FormulaGrammarParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

FormulaGrammarParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 6);
		case 3:
			return this.precpred(this._ctx, 5);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.FormulaGrammarParser = FormulaGrammarParser;
