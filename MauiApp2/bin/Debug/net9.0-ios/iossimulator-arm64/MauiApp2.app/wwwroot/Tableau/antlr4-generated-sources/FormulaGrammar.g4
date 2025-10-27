grammar FormulaGrammar;
stat : expr EOF;
expr : 	NEG expr 								# Negation
		| expr op=('&'|'!&') expr 				# AndNand
		| expr op=('|'|'!|') expr				# OrNor		
		| expr '=>' expr						# Implication
		| expr op=('<=>'|'^') expr				# EquXor								
		| ATOM                                  # Atom
		| TRUE                                  # True
		| FALSE                                 # False
		| '(' expr ')' 							# Parens
		;
NEG : '!';
IMP : '=>' ;	
EQU: '<=>';
XOR: '^';
AND : '&' ; 
NAND : '!&' ;
OR : '|' ;
NOR : '!|' ;
ATOM: [a-zA-Z];
TRUE: (T R U E| '1');
FALSE: (F A L S E| '0');
WS : [ \r\t]+ -> skip ;
fragment A : [aA]; // match either an 'a' or 'A'
fragment B : [bB];
fragment C : [cC];
fragment D : [dD];
fragment E : [eE];
fragment F : [fF];
fragment G : [gG];
fragment H : [hH];
fragment I : [iI];
fragment J : [jJ];
fragment K : [kK];
fragment L : [lL];
fragment M : [mM];
fragment N : [nN];
fragment O : [oO];
fragment P : [pP];
fragment Q : [qQ];
fragment R : [rR];
fragment S : [sS];
fragment T : [tT];
fragment U : [uU];
fragment V : [vV];
fragment W : [wW];
fragment X : [xX];
fragment Y : [yY];
fragment Z : [zZ];
