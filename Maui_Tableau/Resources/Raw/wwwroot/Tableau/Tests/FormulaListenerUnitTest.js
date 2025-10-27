/**
 * Unit tests for  FormulaListener
 * Created by Tram Nguyen on 26.05.2018.
 */

function getRootOfParserTree(inputString) {
    var chars = new antlr4.InputStream(inputString);
    var lexer = new FormulaGrammarLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new FormulaGrammarParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.expr();
    var listener = new FormulaListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
    var root = listener.stack.slice(-1).pop();
    return root;
}

describe("Unit Tests for Class FormulaListener", function () {
    describe("Tests left and right children of formula ", function () {
        it("q has not child  ", function () {
            expect(null).toEqual(getRootOfParserTree("p").getLeft());
            expect(null).toEqual(getRootOfParserTree("p").getRight());
        });
        it("!q has only one right child q ", function () {
            expect(null).toEqual(getRootOfParserTree("!q").getLeft());
            var expected = new Formula("q", null, null, FormulaTypeEnum.POSITIVLITERAL);
            expect(expected).toEqual(getRootOfParserTree("!q").getRight());
        });
        it("!!q has only one right child !q", function () {
            expect(null).toEqual(getRootOfParserTree("!!q").getLeft());
            var expected = getRootOfParserTree("!q");
            expect(expected).toEqual(getRootOfParserTree("!!q ").getRight());
        });
        it("p&q has left child p and right child q", function () {
            var expectedLeft = new Formula("p", null, null, FormulaTypeEnum.POSITIVLITERAL);
            var expectedRight = new Formula("q", null, null, FormulaTypeEnum.POSITIVLITERAL);
            expect(expectedLeft).toEqual(getRootOfParserTree("p&q").getLeft());
            expect(expectedRight).toEqual(getRootOfParserTree("p&q").getRight());
        });
    });
    describe("Tests type of formula ", function () {
        it("1 is true  ", function () {
            expect(FormulaTypeEnum.TRUE).toEqual(getRootOfParserTree("1").getFormulaType());
        });
        it("0 is false  ", function () {
            expect(FormulaTypeEnum.FALSE).toEqual(getRootOfParserTree("0").getFormulaType());
        });
        it("!0 is true  ", function () {
            expect(FormulaTypeEnum.TRUE).toEqual(getRootOfParserTree("!0").getFormulaType());
        });
        it("!1 is false  ", function () {
            expect(FormulaTypeEnum.FALSE).toEqual(getRootOfParserTree("!1").getFormulaType());
        });
        it("q is a positive literal  ", function () {
            expect(FormulaTypeEnum.POSITIVLITERAL).toEqual(getRootOfParserTree("p").getFormulaType());
        });
        it("!q is a negative literal ", function () {
            expect(FormulaTypeEnum.NEGATIVLITERAL).toEqual(getRootOfParserTree("!q").getFormulaType());
        });
        it("!!!(p&q) is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!!!(p&q) ").getFormulaType());
        });
        it("p|q is a \u03B2-formula", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("p|q").getFormulaType());
        });
    });
    describe("Tests \u03B1-formula ", function () {
        it("!!q is a \u03B1-formula  ", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!!q").getFormulaType());
        });
        it("p&q is a \u03B1-formula ", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("p&q").getFormulaType());
        });
        it("!(p|q) is a \u03B1-formula ", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!(p|q)").getFormulaType());
        });
        it("!(p=>q) is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!(p=>q)").getFormulaType());
        });
        it("!(p!&q) is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!(p!&q)").getFormulaType());
        });
        it("p!|q is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("p!|q").getFormulaType());
        });
        it("p<=>q is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("p<=>q").getFormulaType());
        });
        it("!(p^q) is a \u03B1-formula ", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!(p^q)").getFormulaType());
        });
        it("!!(p|q) is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!!(p|q)").getFormulaType());
        });
        it("!!!(p&q) is a \u03B1-formula", function () {
            var root = getRootOfParserTree("!!!(p&q)");
            expect(FormulaTypeEnum.ALPHA).toEqual(root.getFormulaType());
            expect(FormulaTypeEnum.BETA).toEqual(root.getRight().getRight().getFormulaType());
        });
        it("!!((p|q)&(p&q)) is a \u03B1-formula", function () {
            expect(FormulaTypeEnum.ALPHA).toEqual(getRootOfParserTree("!!((p|q)&(p&q))").getFormulaType());
        });
    });
    describe("Tests \u03B2-formula ", function () {

        it("!(p&q) is a \u03B2-formula  ", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("!(p&q)").getFormulaType());
        });
        it("p|q is a \u03B2-formula ", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("p|q").getFormulaType());
        });
        it("p=>q is a \u03B2-formula", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("p=>q").getFormulaType());
        });
        it("p!&q is a \u03B2-formula", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("p!&q").getFormulaType());
        });
        it("!(p!|q) is a \u03B2-formula", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("!(p!|q)").getFormulaType());
        });
        it("!(p<=>q) is a \u03B2-formula", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("!(p<=>q)").getFormulaType());
        });
        it("p^q is a \u03B2-formula ", function () {
            expect(FormulaTypeEnum.BETA).toEqual(getRootOfParserTree("p^q").getFormulaType());
        });
    });
});
