/**
 * ==================================================================================
 * Holds all particle attributes
 *
 * ==================================================================================
 **/



class ParticleAttr {

    constructor() {
        this.randomValue = 500;

        this.maxRadius = 1.75;
        this.minRadius = 0.8;

        this.density = 5;
        this.color = 'black';

        this.fadeInDuration = 3000;
        this.fadeInDelay = 500;
        this.fadeOutDuration = 1500;
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

     init() {
        //
     }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //
}



export const PARTICLEATTR = new ParticleAttr();
export default PARTICLEATTR;