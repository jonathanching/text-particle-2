/**
 * ==================================================================================
 * Particle class
 *
 * ==================================================================================
 **/

import { PARTICLEATTR } from '../attributes/ParticleAttr.js';

import { TWEEN } from '../libs/Tween.js';
import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Spring from './Spring.js';

export default class Particle {

    constructor(context, x, y) {
        this.context = context;
        this.initPos = new Vector2(x, y);

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
        /* Set default values */
        this.color = PARTICLEATTR.color;

        this.goalRadius = Math2.randomInt(PARTICLEATTR.minRadius, PARTICLEATTR.maxRadius, false);
        this.initRadius = 0;
        this.currRadius = this.initRadius;

        this.goalAlpha = 1
        this.initAlpha = 1;
        this.currAlpha = this.initAlpha;

        /* Set animation values */
        this.animDuration = 0;
        this.animStartTime = null;
        this.animRemainingTime = null;
        this.isAnimating = false;

        this.hasFadeIn = false;


        this.setupPosition();

        this.fadeIn();
    }


    /**
     * Setup position
     */
    setupPosition() {
        this.goalPos = this.initPos;
        this.initPos = this.randomizePosition(this.initPos, PARTICLEATTR.randomValue);
        this.currPos = this.initPos;
    }



    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Start fade-in animation
     */
    fadeIn() {
        setTimeout(() => {
            this.restartAnimation(PARTICLEATTR.fadeInDuration);
        }, Math2.randomInt(PARTICLEATTR.fadeInDelay / 2, PARTICLEATTR.fadeInDelay));
    }

    /**
     * Start fade-out animation
     * @param {Vector2} point
     * @param {int}     angle
     * @param {int}     force
     */
    fadeOut(point, angle, force) {
        /* Get the vector and distance from the point */
        let repulseVec = new Vector2(0, 0),
            repulseForce = repulseVec.setLength(force),
            repulseAngle = repulseVec.setAngle(angle);


        this.initRadius = this.currRadius;
        this.goalRadius = 0;

        this.initAlpha = this.currAlpha;
        this.goalAlpha = 0;

        this.goalPos = this.currPos.add(repulseVec);


        this.restartAnimation(PARTICLEATTR.fadeOutDuration);
    }

    /**
     * Randomize given `Vector2` values
     * @param  {Vector2}  point
     * @param  {int}      randomness
     * @return {Vector2}
     */
    randomizePosition(point, randomness) {
        return new Vector2(
                Math2.randomInt(point.x - randomness, point.x + randomness, false),
                Math2.randomInt(point.y - randomness, point.y + randomness, false)
            );
    }

    /**
     * Get distance to point
     * @param  {Vector2} point
     * @return {Integer}
     */
    distanceTo(point) {
        let dX = point.x - this.currPos.x,
            dY = point.y - this.currPos.y,
            distance = Math.sqrt(dX * dX + dY * dY);

        return {
            x: dX,
            y: dY,
            distance: distance
        };
    }

    /**
     * Restart animation states
     * @param {int} duration
     */
    restartAnimation(duration) {
        this.animDuration = duration;
        this.animStartTime = new Date();
        this.isAnimating = true;
    }


    /**
     * Update radius value
     */
    updateRadius() {
        this.currRadius = TWEEN.easeOutQuad(this.animRemainingTime, this.initRadius, this.goalRadius - this.initRadius, this.animDuration);
    }

    /**
     * Update position vector value
     */
    updatePosition() {
        this.currPos.x = TWEEN.easeOutQuad(this.animRemainingTime, this.initPos.x, this.goalPos.x - this.initPos.x, this.animDuration);
        this.currPos.y = TWEEN.easeOutQuad(this.animRemainingTime, this.initPos.y, this.goalPos.y - this.initPos.y, this.animDuration);
    }

    /**
     * Update opacity value
     */
    updateAlpha() {
        this.currAlpha = TWEEN.easeOutQuad(this.animRemainingTime, this.initAlpha, this.goalAlpha - this.initAlpha, this.animDuration);
    }


    update() {
        if(this.isAnimating) {

            this.animRemainingTime = new Date() - this.animStartTime;


            /* Update needed values */
            if(this.currPos != this.goalPos) this.updatePosition();
            if(this.currRadius != this.goalRadius) this.updateRadius();
            if(this.currAlpha != this.goalAlpha) this.updateAlpha();


            /* Stop animation on duration end */
            if(this.animRemainingTime > this.animDuration) {
                this.isAnimating = false;


                /* As the first animation is the fade-in safe to toggle this on any animation end */
                if(!this.hasFadeIn) this.hasFadeIn = true;
            }

        } else {

        }
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Draw a ball
     */
    drawBall() {
        this.context.fillStyle = this.color;
        this.context.globalAlpha = this.currAlpha;

        this.context.beginPath();
        this.context.arc(this.currPos.x, this.currPos.y, this.currRadius, 0, Math.PI * 2);
        this.context.fill();
    }

    draw() {
        this.context.save();

        this.drawBall();

        this.context.restore();
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if enabled for collision event
     * @return {Boolean}
     */
    canCollide() {
        return this.hasFadeIn && !this.isAnimating;
    }

    /**
     * Check if already dead
     * @return {Boolean}
     */
    isDead() {
        return this.hasFadeIn &&
                this.currAlpha <= 0.01 &&
                this.currRadius <= 0.01;
    }
}