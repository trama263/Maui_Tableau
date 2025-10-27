/**
 * Unit test for TableauForPropositionalLogic
 * Created by Tram Nguyen on 27.05.2018.
 */
var undefine = [null, null];
var p = new Formula("p", null, null, FormulaTypeEnum.POSITIVLITERAL);
var q = new Formula("q", null, null, FormulaTypeEnum.POSITIVLITERAL);
var r = new Formula("q", null, null, FormulaTypeEnum.POSITIVLITERAL);

var not_r = new Formula(FormulaOperatorEnum.NEG, null, r, FormulaTypeEnum.NEGATIVLITERAL);
var not_p = new Formula(FormulaOperatorEnum.NEG, null, p, FormulaTypeEnum.NEGATIVLITERAL);
var not_q = new Formula(FormulaOperatorEnum.NEG, null, q, FormulaTypeEnum.NEGATIVLITERAL);

var p_or_q = new Formula(FormulaOperatorEnum.OR, p, q, FormulaTypeEnum.BETA);
var p_and_q = new Formula(FormulaOperatorEnum.AND, p, q, FormulaTypeEnum.ALPHA);
var p_imp_q = new Formula(FormulaOperatorEnum.IMP, p, q, FormulaTypeEnum.BETA);
var q_imp_p = new Formula(FormulaOperatorEnum.IMP, q, p, FormulaTypeEnum.BETA);
var p_nand_q = new Formula(FormulaOperatorEnum.NAND, p, q, FormulaTypeEnum.BETA);
var p_nor_q = new Formula(FormulaOperatorEnum.NOR, p, q, FormulaTypeEnum.ALPHA);
var p_equ_q = new Formula(FormulaOperatorEnum.EQU, p, q, FormulaTypeEnum.ALPHA);
var p_xor_q = new Formula(FormulaOperatorEnum.XOR, p, q, FormulaTypeEnum.BETA);

var not_p_or_q = new Formula(FormulaOperatorEnum.NEG, null, p_or_q, FormulaTypeEnum.ALPHA);
var not_p_and_q = new Formula(FormulaOperatorEnum.NEG, null, p_and_q, FormulaTypeEnum.BETA);
var not_p_equ_q = new Formula(FormulaOperatorEnum.NEG, null, p_equ_q, FormulaTypeEnum.BETA);
var not_p_nor_q = new Formula(FormulaOperatorEnum.NEG, null, p_nor_q, FormulaTypeEnum.BETA);
var not_p_imp_q = new Formula(FormulaOperatorEnum.NEG, null, p_imp_q, FormulaTypeEnum.ALPHA);
var not_q_imp_p = new Formula(FormulaOperatorEnum.NEG, null, q_imp_p, FormulaTypeEnum.ALPHA);
var not_p_nand_q = new Formula(FormulaOperatorEnum.NEG, null, p_nand_q, FormulaTypeEnum.ALPHA);
var not_p_xor_q = new Formula(FormulaOperatorEnum.NEG, null, p_xor_q, FormulaTypeEnum.ALPHA);


var not_not_r = new Formula(FormulaOperatorEnum.NEG, null, not_r, FormulaTypeEnum.ALPHA);
var not_not_p_or_q = new Formula(FormulaOperatorEnum.NEG, null, not_p_or_q, FormulaTypeEnum.ALPHA);
var not_not_p_and_q = new Formula(FormulaOperatorEnum.NEG, null, not_p_and_q, FormulaTypeEnum.ALPHA);

var r_and_p_or_q = new Formula(FormulaOperatorEnum.AND, r, p_or_q, FormulaTypeEnum.ALPHA);
var not_r_and_p_or_q = new Formula(FormulaOperatorEnum.NEG, null, r_and_p_or_q, FormulaTypeEnum.BETA);
var p_or_q_and_p_and_q = new Formula(FormulaOperatorEnum.AND, p_or_q, p_and_q, FormulaTypeEnum.ALPHA);
var not_p_or_q_and_p_and_q = new Formula(FormulaOperatorEnum.NEG, null, p_or_q_and_p_and_q, FormulaTypeEnum.BETA);
var r_or_p_or_q = new Formula(FormulaOperatorEnum.OR, r, p_or_q, FormulaTypeEnum.BETA);

var not_r_or_p_or_q = new Formula(FormulaOperatorEnum.NEG, null, r_or_p_or_q, FormulaTypeEnum.ALPHA);
var p_or_q_or_p_and_q = new Formula(FormulaOperatorEnum.OR, p_or_q, p_and_q, FormulaTypeEnum.ALPHA);
var not_p_or_q_or_p_and_q = new Formula(FormulaOperatorEnum.NEG, null, p_or_q_or_p_and_q, FormulaTypeEnum.ALPHA);

var not_p_or_q2 = new Formula(FormulaOperatorEnum.OR, not_p, q, FormulaTypeEnum.BETA);
var p_and_not_p_or_q = new Formula(FormulaOperatorEnum.AND, p, not_p_or_q2, FormulaTypeEnum.ALPHA);

var tableau_p_and_q = new TableauForPropositionalLogic(p_and_q);
var tableau_p_or_q = new TableauForPropositionalLogic(p_or_q);

describe("Unit Tests for Class TableauForPropositionalLogic", function () {
    describe("Tests determineAlphaFormulas", function () {
        it("!!r has \u03B1-Formula as [null,r], !!(p|q) has \u03B1-Formula as [null,(p|q)], " +
            "!!(p&q) has \u03B1-Formula as [null,(p&q)]", function () {
            var expect1 = [null, r, RuleEnum.ALPHA_1];
            var expect2 = [null, p_or_q, RuleEnum.ALPHA_1];
            var expect3 = [null, p_and_q, RuleEnum.ALPHA_1];

            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(not_not_r));
            expect(expect2).toEqual(tableau_p_and_q.determineAlphaFormulas(not_not_p_or_q));
            expect(expect3).toEqual(tableau_p_and_q.determineAlphaFormulas(not_not_p_and_q));

        });
        it("p&q has \u03B1-Formula as [p,q], r&(p|q) has \u03B1-Formula as [r, p|q], " +
            "(p|q)&(p&q) has \u03B1-Formula as [p|q, p&q]", function () {
            var expect1 = [p, q, RuleEnum.ALPHA_2];
            var expect2 = [r, p_or_q, RuleEnum.ALPHA_2];
            var expect3 = [p_or_q, p_and_q, RuleEnum.ALPHA_2];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(p_and_q));
            expect(expect2).toEqual(tableau_p_and_q.determineAlphaFormulas(r_and_p_or_q));
            expect(expect3).toEqual(tableau_p_and_q.determineAlphaFormulas(p_or_q_and_p_and_q));
        });
        it("!(p|q) has \u03B1-Formula as [!p,!q], !(r|(p|q)) has \u03B1-Formula as [!r, !(p|q)], " +
            "!((p|q)|(p&q)) has \u03B1-Formula as [!(p|q), !(p&q)]", function () {
            var expect1 = [not_p, not_q, RuleEnum.ALPHA_3];
            var expect2 = [not_r, not_p_or_q, RuleEnum.ALPHA_3];
            var expect3 = [not_p_or_q, not_p_and_q, RuleEnum.ALPHA_3];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(not_p_or_q));
            expect(expect2).toEqual(tableau_p_and_q.determineAlphaFormulas(not_r_or_p_or_q));
            expect(expect3).toEqual(tableau_p_and_q.determineAlphaFormulas(not_p_or_q_or_p_and_q));
        });
        it("!(p=>q) has \u03B1-Formula as [p,!q]", function () {
            var expect1 = [p, not_q, RuleEnum.ALPHA_4];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(not_p_imp_q));

        });
        it("!(p!&q) has \u03B1-Formula as [p,q]", function () {
            var expect1 = [p, q, RuleEnum.ALPHA_5];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(not_p_nand_q));

        });
        it("p!|q has \u03B1-Formula as [p,q]", function () {
            var expect1 = [not_p, not_q, RuleEnum.ALPHA_6];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(p_nor_q));

        });
        it("p<=>q has \u03B1-Formula as [p=>q,q=>p]", function () {
            var expect1 = [p_imp_q, q_imp_p, RuleEnum.ALPHA_7];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(p_equ_q));

        });
        it("!(p^q) has \u03B1-Formula as [p=>q,q=>p]", function () {
            var expect1 = [p_imp_q, q_imp_p, RuleEnum.ALPHA_8];
            expect(expect1).toEqual(tableau_p_and_q.determineAlphaFormulas(not_p_xor_q));

        });
    });
    describe("Tests determineBetaFormulas", function () {
        it("!(p&q) has \u03B2-Formula as [!p,!q], !(r&(p|q)) has \u03B2-Formula as [!r, !(p|q)), " +
            "not((p|q)&(p&q)) has \u03B1-Formula as [p|q, p&q]", function () {
            var expect1 = [not_p, not_q, RuleEnum.BETA_1];
            var expect2 = [not_r, not_p_or_q, RuleEnum.BETA_1];
            var expect3 = [not_p_or_q, not_p_and_q, RuleEnum.BETA_1];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(not_p_and_q));
            expect(expect2).toEqual(tableau_p_and_q.determineBetaFormulas(not_r_and_p_or_q));
            expect(expect3).toEqual(tableau_p_and_q.determineBetaFormulas(not_p_or_q_and_p_and_q));
        });
        it("p|q has \u03B2-Formula as [p,q], (r|(p|q)) has \u03B2-Formula as [r, (p|q)], " +
            "(p|q)|(p&q) has \u03B2-Formula as [p|q, p&q]", function () {
            var expect1 = [p, q, RuleEnum.BETA_2];
            var expect2 = [r, p_or_q, RuleEnum.BETA_2];
            var expect3 = [p_or_q, p_and_q, RuleEnum.BETA_2];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(p_or_q));
            expect(expect2).toEqual(tableau_p_and_q.determineBetaFormulas(r_or_p_or_q));
            expect(expect3).toEqual(tableau_p_and_q.determineBetaFormulas(p_or_q_or_p_and_q));
        });
        it("p=>q has \u03B2-Formula as [!p,q]", function () {
            var expect1 = [not_p, q, RuleEnum.BETA_3];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(p_imp_q));
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(p_imp_q));


        });
        it("p!&q has \u03B2-Formula as [!p,!q]", function () {
            var expect1 = [not_p, not_q, RuleEnum.BETA_4];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(p_nand_q));

        });
        it("!(p!|q) has \u03B1-Formula as [p,q]", function () {
            var expect1 = [p, q, RuleEnum.BETA_5];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(not_p_nor_q));

        });
        it("!(p<=>q) has \u03B1-Formula as [!(p=>q),!(q=>p)]", function () {
            var expect1 = [not_p_imp_q, not_q_imp_p, RuleEnum.BETA_6];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(not_p_equ_q));

        });
        it("p^q has \u03B1-Formula as [!(p=>q),!(q=>p)]", function () {
            var expect1 = [not_p_imp_q, not_q_imp_p, RuleEnum.BETA_7];
            expect(expect1).toEqual(tableau_p_and_q.determineBetaFormulas(p_xor_q));

        });
    });
    describe("Tests isSatisfiable()", function () {
        it("p&q is satisfiale", function () {
            var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&q"));
            expect(true).toEqual(tableau.isSatisfiable());
        });
        it("p&0 is satisfiale", function () {
            var tableau = new TableauForPropositionalLogic(getRootOfParserTree("p&0"));
            expect(false).toEqual(tableau.isSatisfiable());
        });
        it("testTableau", function () {
            var tableau = new Tableau();
            expect(null).not.toBe(tableau);
        });
    });
});
