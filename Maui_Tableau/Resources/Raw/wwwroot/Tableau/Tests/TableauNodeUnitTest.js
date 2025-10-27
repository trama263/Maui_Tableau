/**
 * Unit Tests for TableauNode
 * Created by Tram Nguyen on 23.05.2018.
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

describe("Unit Tests for Class TableauNode:", function() {
    var constantFalse = new Formula("0", null, null, FormulaTypeEnum.FALSE);
    var constantTrue = new Formula ("1", null, p1,FormulaTypeEnum.NEGATIVLITERAL.TRUE);
    var p1 = new Formula("p", null, null, FormulaTypeEnum.POSITIVLITERAL);
    var not_p1 = new Formula ("\u2511", null, p1,FormulaTypeEnum.NEGATIVLITERAL );
    var q = new Formula ("q", null, null,FormulaTypeEnum.POSITIVLITERAL);
    var q_or_not_p1 = new Formula ("\u2228", q, not_p1,FormulaTypeEnum.BETA);
    var p2 = new Formula("p",null,null,FormulaTypeEnum.POSITIVLITERAL);
    var p2_and_q_or_not_p1 = new Formula ("\u2227",p2,q_or_not_p1,FormulaTypeEnum.ALPHA);
    var arr = [q];
    var tabNode0 = new TableauNode(arr,null,null);
    var arr = [p2,q];
    var tabNode1 = new TableauNode(arr,null,null);
    arr = [p2,not_p1];
    var tabNode2 = new TableauNode(arr,null,null);
    arr = [p1,q_or_not_p1];
    var tabNode3 = new TableauNode(arr,tabNode1,tabNode2);
    arr = [p2_and_q_or_not_p1];
    var tabNode4 = new TableauNode(arr,null,tabNode3);
    var not_not_p1 =  new Formula ("\u2511", null, not_p1,FormulaTypeEnum.ALPHA);
    arr = [p1,not_not_p1];
    var tabNode5 = new TableauNode(arr,null,null);
    arr = [p1,not_p1,not_not_p1];
    var tabNode6 = new TableauNode(arr,null,null);
    arr = [p1,constantTrue];
    var tabNode7 = new TableauNode(arr,null,null);
    arr = [not_p1,p1];
    var tabNode8 = new TableauNode(arr,null,null);
    arr = [not_p1,q];
    var tabNode9 = new TableauNode(arr,null,null);
    arr = [q,not_p1];
    var tabNode10 = new TableauNode(arr,null,null);
    arr = [q,constantFalse];
    var tabNode11 = new TableauNode(arr,null,null);

    it("tabNode11 contains constant false, tabNode 10 don'i contain constant false", function() {
        expect(true).toBe(tabNode11.containsConstantFalse());
        expect(false).toBe(tabNode10.containsConstantFalse());
    });

    it("tabNode1 and tabNode2 contain only literals. tabNode3, tabNode4, tabNode5 and tabNode6 don't contain only literals", function() {
        expect(true).toBe(tabNode0.containsOnlyLiterals());
        expect(true).toBe(tabNode1.containsOnlyLiterals());
        expect(true).toBe(tabNode2.containsOnlyLiterals());
        expect(false).toBe(tabNode3.containsOnlyLiterals());
        expect(false).toBe(tabNode4.containsOnlyLiterals());
        expect(false).toBe(tabNode5.containsOnlyLiterals());
        expect(false).toBe(tabNode6.containsOnlyLiterals());
        expect(true).toBe(tabNode7.containsOnlyLiterals());

    });

    it("tabNode1,tabNode2, tabNode3, tabNode5, tabNode9 und tabNode10 don't contain  pair of comlementary literals. tabNode4, tabNode6 and tabNode8 contain pair of complementary literals", function() {
        expect(false).toBe(tabNode0.containsAComplementaryPairOfLiterals());
        expect(false).toBe(tabNode1.containsAComplementaryPairOfLiterals());
        expect(true).toBe(tabNode2.containsAComplementaryPairOfLiterals());
        expect(false).toBe(tabNode3.containsAComplementaryPairOfLiterals());
        expect(false).toBe(tabNode4.containsAComplementaryPairOfLiterals());
        expect(false).toBe(tabNode5.containsAComplementaryPairOfLiterals());
        expect(true).toBe(tabNode6.containsAComplementaryPairOfLiterals());
        expect(true).toBe(tabNode8.containsAComplementaryPairOfLiterals());
        expect(false).toBe(tabNode9.containsAComplementaryPairOfLiterals());
        expect(false).toBe(tabNode10.containsAComplementaryPairOfLiterals());

    });

    it("tabNode1,tabNode2 and tabNode3 don't contain alpha formula. tabNode4, tabNode5 and tabNode6 include alpha formula", function() {
        expect(false).toBe(tabNode1.containsAlphaFormula());
        expect(false).toBe(tabNode1.containsAlphaFormula());
        expect(false).toBe(tabNode2.containsAlphaFormula());
        expect(false).toBe(tabNode3.containsAlphaFormula());
        expect(true).toBe(tabNode4.containsAlphaFormula());
        expect(true).toBe(tabNode5.containsAlphaFormula());
        expect(true).toBe(tabNode6.containsAlphaFormula());
    });

    it("tabNode1 is unmarked, tabNode2 is closed, tabNode3 is opened", function() {
        tabNode2.setStatus(StatusEnum.CLOSEDLEAF);
        tabNode3.setStatus(StatusEnum.OPENEDLEAF);
        expect(StatusEnum.UNMARKEDLEAF).toEqual(tabNode1.getStatus());
        expect(StatusEnum.CLOSEDLEAF).toEqual(tabNode2.getStatus());
        expect(StatusEnum.OPENEDLEAF).toEqual(tabNode3.getStatus());
    });
    it("tabNode1 hat id as 0 and string as '[p, q]'", function() {

        expect(0).toEqual(tabNode1.getId());
        expect("[p, q]").toEqual(tabNode1.toString());
    });

    it("tabNode3 hat tabNode1 as leftNode and tabNode2 as rightNode", function() {
        var tabNode3 = new TableauNode(arr,tabNode1,tabNode2);
        expect(tabNode1).toEqual(tabNode3.getLeftNode());
        expect(tabNode2).toEqual(tabNode3.getRightNode());
    });


    it("test getParent()", function() {
        tabNode1.setParent(tabNode2);
        expect(tabNode2).toEqual(tabNode1.getParent());

    });

    it("test levelOrder()", function() {
        var list= [];
        var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q"));
        var tableauNode = tableau.rootNode;
        var expected =[tableauNode,tableauNode.getRightNode() ];
        expect(expected).toEqual(tableauNode.levelOrder(list));
    });

    it("test getRule()", function() {
        var list= [];
        var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q"));
        var tableauNode = tableau.rootNode;
        var expectedRule ="a2";
        expect(expectedRule).toEqual(tableauNode.getRule());
    });

    it("test getTableauForChart()", function() {
        var tableau = new TableauForPropositionalLogic(getRootOfParserTree("0"));
        var list = tableau.rootNode.getTableauForChart();
        expect(2).toEqual(list.length);
        var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q"));
        var list = tableau.rootNode.getTableauForChart();
        expect(3).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("q&!q"));
        list = tableau.rootNode.getTableauForChart();
        expect(3).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("q"));
        list = tableau.rootNode.getTableauForChart();
        expect(2).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q|p"));
        list = tableau.rootNode.getTableauForChart();
        expect(6).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("(p&!p)|p"));
        list = tableau.rootNode.getTableauForChart();
        expect(6).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("p|(p&!p)"));
        list = tableau.rootNode.getTableauForChart();
        expect(6).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&(!p|q)"));
        list = tableau.rootNode.getTableauForChart();
        expect(6).toEqual(list.length);

    });

    it("test getTableauWithRuleForChart()", function() {
        var tableau = new TableauForPropositionalLogic(getRootOfParserTree("0"));
        var list = tableau.rootNode.getTableauWithRuleForChart();
        expect(2).toEqual(list.length);
        var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q"));
        var list = tableau.rootNode.getTableauWithRuleForChart();
        expect(3).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("q&!q"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(3).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("q"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(2).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q|p"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(6).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("(p&!p)|p"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(6).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("p|(p&!p)"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(6).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("((p&!p)&p)|q"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(7).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("((p&!p)|p)|q"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(9).toEqual(list.length);
        tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&(!p|q)"));
        list = tableau.rootNode.getTableauWithRuleForChart();
        expect(6).toEqual(list.length);


    });

    // it("test getTableauWithRuleForChart()", function() {
    //     var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q"));
    //     var list = tableau.rootNode.getTableauWithRuleForChart();
    //     expect(3).toEqual(list.length);
    //     tableau = new TableauForPropositionalLogic(getRootOfParserTree("q&!q"));
    //     list = tableau.rootNode.getTableauWithRuleForChart();
    //     expect(3).toEqual(list.length);
    //     tableau = new TableauForPropositionalLogic(getRootOfParserTree("q"));
    //     list = tableau.rootNode.getTableauWithRuleForChart();
    //     expect(2).toEqual(list.length);
    //     tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q|p"));
    //     list = tableau.rootNode.getTableauWithRuleForChart();
    //     expect(6).toEqual(list.length);
    // });



});

