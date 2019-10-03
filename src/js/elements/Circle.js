/**
 * ==================================================================================
 * Circle element
 *
 * ==================================================================================
 **/

import { MOUSEATTR } from '../attributes/MouseAttr.js';

import Vector2 from '../libs/Vector2.js';

export default class Circle {

    constructor(context, x, y) {
        this.context = context;
    	this.x = x;
        this.y = y;

        this.init();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Initial setup
     */
    init() {
        this.radius = MOUSEATTR.radius;
        this.color = MOUSEATTR.color;
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    update() {

    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Draw a ball
     */
    drawBall() {
        this.context.fillStyle = this.color;

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fill();
    }

    draw() {
        this.drawBall();
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    //
}