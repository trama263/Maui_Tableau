/**
 * Abstract class for the implementation of tableau-algorithm
 * Created by Tram Nguyen on 30.06.2018.
 */

/**
 * @constructor
 */
function Tableau (){
}

/**
 * Checks if a formula is satisfiable with tableau construction
 * @returns {boolean}
 */
Tableau.prototype.isSatisfiable = function(){
    for(var i = 0; i < this.markedLeaves.length; i ++){
        if(this.markedLeaves[i].getStatus() == StatusEnum.OPENEDLEAF){
            return true;
        }
    }
    return false;
};


exports.Tableau = Tableau;