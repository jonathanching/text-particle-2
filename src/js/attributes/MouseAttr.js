/**
 * ==================================================================================
 * Holds all mouse attributes
 *
 * ==================================================================================
 **/

import Math2 from '../libs/Math2.js';

class MouseAttr {

    constructor() {
        this.radius = 75;
        this.color = 'black';
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get random angle
     * @return {Integer}
     */
    getCollisionAngle() {
        return Math2.randomInt(0, Math.PI * 2, false);
    }

    /**
     * Get random force
     * @return {Integer}
     */
    getCollisionForce() {
        return Math2.randomInt(2, 5);
    }
}



export const MOUSEATTR = new MouseAttr();
export default MOUSEATTR;