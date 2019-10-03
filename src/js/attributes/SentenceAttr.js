/**
 * ==================================================================================
 * Holds all sentence attributes
 *
 * ==================================================================================
 **/



class SentenceAttr {

    constructor() {
        this.fontSize = 75;
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    //


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get available sentences
     * @return {Array}
     */
    getSentences() {
        return [
            ["The cake is a lie"],
            ["Not enough minerals"],
            ["You have died"],
            ["It’s dangerous to go", "alone, take this!"],
            ["FINISH HIM!!!"],
            ["It’s super effective!"],
            ["Snake? Snake?", "SNAAAAAAAAKE!!!"],
            ["You're a wizard Harry!"],
            ["I see dead people"]
        ];
    }
}



export const SENTENCEATTR = new SentenceAttr();
export default SENTENCEATTR;