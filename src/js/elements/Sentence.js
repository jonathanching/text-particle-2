/**
 * ==================================================================================
 * Sentence element
 *
 * ==================================================================================
 **/

import { UTILS } from '../libs/Utils.js';

import { STAGESTATE } from '../states/StageState.js';
import { PARTICLEATTR } from '../attributes/ParticleAttr.js';
import { MOUSEATTR } from '../attributes/MouseAttr.js';
import { SENTENCEATTR } from '../attributes/SentenceAttr.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Particle from './Particle.js';
import Spring from './Spring.js';

export default class Sentence {

    constructor(canvas, context, textContext) {
    	this.canvas = canvas;
    	this.context = context;
        this.textContext = textContext;

        this.particles = [];
        this.particleCount = 0;

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
        this.mouseX = 0;
        this.mouseY = 0;

        this.setupControls();
    }


    /**
     * Setup controls
     */
    setupControls() {
        /* Bind mouse `hover` events */
        this.bindMouseEvent('mousemove');
        this.bindMouseEvent('touchmove');
    }


    /**
     * Create `Particle` element
     * @param  {int} x
     * @param  {int} y
     */
    createParticle(x, y) {
        this.particles.push(
                new Particle(this.context, x, y)
            );
    }

    /**
     * Bind controls to a mouse listener
     * @param  {String} eventName
     */
    bindMouseEvent(eventName) {
        this.canvas.addEventListener(eventName, (event) => {
            this.setMouseCoords(event);
        });
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Trace the word drawn on the canvas and replaced with `Particle` elements
     */
    populateParticles() {
        /* Draw the `text` only once */
        this.drawText();

        /* Fetch the canvas image */
        let img = this.getImageData();
        /* Get the `Particle` coordinates from the image */
        this.updateCoordinates(img);


        STAGESTATE.populated();
    }


    /**
     * Handle `particle` events
     */
    handleParticle() {
        if(!STAGESTATE.isPopulated) return;


        /* Disregard particle if already dead */
        for(var i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            if(p.isDead()) {
                this.particles.splice(i, 1);
            }
        }


        /* Re-draw word if the particles remaining is less than 1% */
        if(this.particles.length <= (this.particleCount * .05)) {
            /* Fade-out the remaining ones */
            if(this.particles.length > 0) {
                for(var i = 0; i < this.particles.length; i++) {
                    this.particles[i].fadeOut();
                }

                setTimeout(() => {
                    STAGESTATE.populated(false);
                }, PARTICLEATTR.fadeOutDuration);

            } else {
                STAGESTATE.populated(false);
            }
        }
    }

    /**
     * Handle mouse radius collision to all particles
     */
    handleMouseCollision() {
        for(var i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            if(p.canCollide() && this.checkParticleCollision(p))
                p.fadeOut();
        }
    }


    /**
     * Update `Particle` coordinates
     * @param  {Image} image
     */
    updateCoordinates(image) {
        /* Clear all particles */
        this.particles = [];
        this.particleCount = 0;

        /* Loop through the image data */
        for(var y = 0; y < this.canvas.height; y += PARTICLEATTR.density) {
            for(var x = 0; x < this.canvas.width; x += PARTICLEATTR.density) {
                /* Get the alpha element (4th element) on the RGBA array */
                let opacity = image.data[((x + (y * this.canvas.width)) * 4 + 3)];
                /* Check opacity */
                if(opacity > 0) {
                    this.createParticle(x, y);
                }
            }
        }

        /* Save initial count */
        this.particleCount = this.particles.length;
    }


    /**
     * Run 'update' function on specified collection
     * @param {array} collection
     */
    updateCollection(collection) {
        for(var i = 0; i < collection.length; i++) {
            collection[i].update();
        }
    }

    update() {
        this.handleParticle();
        this.handleMouseCollision();

        this.updateCollection(this.particles);
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Draw the `text`
     */
    drawText() {
        this.textContext.save();

        this.textContext.fillStyle = "#000000";
        this.textContext.font = "Bold " + SENTENCEATTR.fontSize + "px Arial";

        /* Position the `text` at the center of the screen */
        let text = this.getText(),
            textHeight = SENTENCEATTR.fontSize + 5,
            startY = this.canvas.height / 2;

        for(var i = 0; i < text.length; i++) {
            let textWord = text[i],
                textSize = this.textContext.measureText(textWord),
                x = (this.canvas.width / 2) - (textSize.width / 2),
                y = startY + (textHeight * i);

            this.textContext.fillText(textWord, x, y);
        }


        this.textContext.restore();
    }

    /**
     * Run 'draw' function on specified collection
     * @return {array} collection
     */
    drawCollection(collection) {
        for(var i = 0; i < collection.length; i++) {
            collection[i].draw();
        }
    }

    draw() {
        this.drawCollection(this.particles);
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get `text` value
     * @param {String} text
     */
    getText(text) {
        let sentences = SENTENCEATTR.getSentences();
        return sentences[Math2.randomInt(0, sentences.length)];
    }

    /**
     * Get mouse coordinates
     * @return {Vector2}
     */
    getMouseCoords() {
        return new Vector2(this.mouseX, this.mouseY);
    }

    /**
     * Set mouse coordinates
     * @param {MouseEvent} event
     */
    setMouseCoords(event) {
        let coords = this.getEventMouseCoords(event);
        this.mouseX = coords.x - this.canvas.offsetLeft,
        this.mouseY = coords.y - this.canvas.offsetTop;
    }

    /**
     * Get the mouse coordinate
     * @param  {MouseEvent}  event
     * @return {Object}
     */
    getEventMouseCoords(event) {
        return {
            x: this.isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
            y: this.isTouchEvent(event) ? event.touches[0].clientY : event.clientY
        };
    }

    /**
     * Get canvas image data
     * @return {Image}
     */
    getImageData() {
        return this.textContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check particle collision
     * @param {Particle} c1
     */
    checkParticleCollision(c1) {
        /* Check if the distance of the circles is less than the total radius of both circles */
        let distVec = c1.distanceTo(this.getMouseCoords());
        if(distVec.distance <= c1.currRadius + MOUSEATTR.radius)
            return true;

        return false;
    }

    /**
     * Check if `touch` event
     * @param  {MouseEvent}  event
     * @return {Boolean}
     */
    isTouchEvent(event) {
        return event.type === 'touchmove' || event.type === 'touchstart';
    }
}
