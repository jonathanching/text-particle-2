/**
 * ==================================================================================
 * Manages all scene objects/elements
 *
 * ==================================================================================
 **/

import { GLOBAL } from './Global.js';

import { STAGESTATE } from './states/StageState.js';

import Sentence from './elements/Sentence.js';


export default class SceneManager {

    constructor(textCanvas, canvas) {
        this.textCanvas = textCanvas;
        this.textContext = this.getCanvasContext(this.textCanvas);

        this.canvas = canvas;
        this.context = this.getCanvasContext(this.canvas);


        this.init();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Initiate class
     */
    init() {
        this.setupStates();
        this.setupStage();

        this.buildElements();

        this.render();
    }

    /**
     * Initialize states
     */
    setupStates() {
        //
    }

    /**
     * Initialze `stage` variables
     */
    setupStage() {
        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.lastTime = (new Date()).getTime();
        this.currentTime = 0;
        this.delta = 0;

        this.countdown = 3000;


        //
    }


    /**
     * Create all elements
     */
    buildElements() {
        this.sentence = new Sentence(this.canvas, this.context, this.textContext);
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    /**
     * Callback on window size changes
     */
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.textCanvas.width = window.innerWidth;
        this.textCanvas.height = window.innerHeight;
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Reset `text` drawing
     */
    resetDrawing() {
        STAGESTATE.populated(false);
    }


    /**
     * Handles all needed variable update per tick. Called on the `render` function
     */
    update() {
        this.sentence.update();
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get canvas context object
     * @param  {Canvas}    canvas
     * @return {Context}
     */
    getCanvasContext(canvas) {
        if(canvas)
            return canvas.getContext('2d');

        return null;
    }


    /**
     * ==================================================================================
     * @Renderers
     * ==================================================================================
     **/

    /**
     * Clear all canvas context
     * @param {2DContext} context
     */
    clearCanvas(context = null) {
        let ctx = !context ? this.context : context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Canvas callback per tick
     */
    render() {
        /* Update timers */
        this.currentTime = (new Date()).getTime();
        this.delta = this.currentTime - this.lastTime;

        if(this.delta > this.interval) {

            this.clearCanvas();


            /**
             * Draw the text if there are no particles yet otherwise
             * proceed w/ the usual context drawing
             */

            if(!STAGESTATE.isPopulated) {

                this.clearCanvas(this.textContext);
                this.sentence.populateParticles();
                this.clearCanvas(this.textContext);

            } else {
                this.sentence.draw();
            }


            this.lastTime = this.currentTime - (this.delta % this.interval);
        }


        requestAnimationFrame(() => {
            this.update();
            this.render();
        });
    }





    /**
     * ==================================================================================
     * @DEVELOPMENT
     * ==================================================================================
     **/

    //
}