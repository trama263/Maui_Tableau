/**
 * Unit Tests for Formula
 * Created by Tram Nguyen on 23.05.2018.
 */


describe("Unit Tests for Class Formula", function() {
    var constantTrue = new Formula("1", null, null,FormulaTypeEnum.TRUE);
    var constantFalse = new Formula("0", null, null,FormulaTypeEnum.FALSE);
    var left = new Formula("p", null, null,FormulaTypeEnum.POSITIVLITERAL);
    var right = new Formula("p", null ,null,FormulaTypeEnum.POSITIVLITERAL);
    var root = new Formula(FormulaOperatorEnum.AND,left,right, FormulaTypeEnum.ALPHA);
    var negation =  new Formula(FormulaOperatorEnum.NEG,null,root, FormulaTypeEnum.BETA);
    it("p&p has type as ALPHA, p and p have types as POSITIVLITERAL", function() {
        expect(left.getFormulaType()).toEqual(FormulaTypeEnum.POSITIVLITERAL);
        expect(right.getFormulaType()).toEqual(FormulaTypeEnum.POSITIVLITERAL);
        expect(root.getFormulaType()).toEqual(FormulaTypeEnum.ALPHA);

    });
    it("p&p has left child as p and right child as p", function() {
        expect(root.getLeft()).toEqual(left);
        expect(root.getRight()).toEqual(right);
    });
    it("0 has negative formula as !1", function() {
        expect(constantTrue.getNegativeFormula()).toEqual(new Formula(FormulaOperatorEnum.NEG,null,constantTrue,FormulaTypeEnum.FALSE));
    });
    it("1 has negative formula as !0", function() {
        expect(constantFalse.getNegativeFormula()).toEqual(new Formula(FormulaOperatorEnum.NEG,null,constantFalse,FormulaTypeEnum.TRUE));
    });
    it("p has negative formula as !p", function() {
        expect(left.getNegativeFormula()).toEqual(new Formula(FormulaOperatorEnum.NEG,null,p,FormulaTypeEnum.NEGATIVLITERAL));
    });
    it("!p has negative formula as p", function() {
        expect(left.getNegativeFormula().getNegativeFormula()).toEqual(new Formula(FormulaOperatorEnum.NEG,null,p.getNegativeFormula(),FormulaTypeEnum.ALPHA));
    });
    it("p&q has negative formula as !(p&q), !(p&q) has negative formula as !!(p&q) ", function() {
        expect(root.getNegativeFormula()).toEqual(negation);
        expect(negation.getNegativeFormula()).toEqual(new Formula(FormulaOperatorEnum.NEG,null,negation, FormulaTypeEnum.ALPHA));
    });
    it("root has label as \" \u2227  \" and the label of left is the same the label of right", function() {
        expect(root.getLabel()).toEqual(FormulaOperatorEnum.AND);
        expect(left.getLabel()).toEqual(right.getLabel());
    });
    it("root has string as  \"p \u2227 p\"", function() {
        expect(root.toFormulaString()).toEqual("(p"+FormulaOperatorEnum.AND +"p)");
    });
    it("in.order traversal of p&p hat 3 elements", function() {
        var list=[];
        expect(root.inOrder(root,list).length).toEqual(3);
    });
    it("in.order traversal of p is [p]", function() {
        var arr = [[ Object({ v: '0', f: 'p' }), '' ]];
        expect(left.getFormulasForChart()).toEqual(arr);
    });
    it("test getFormulasForChart()", function() {
        expect(3).toEqual(root.getFormulasForChart().length);
    });
});

