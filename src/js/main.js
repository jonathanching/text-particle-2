/**
 * ==================================================================================
 * Main
 * ==================================================================================
 **/

import SceneManager from './SceneManager.js';


const sprint = function() {

    const textCanvas = document.getElementById('textCanvas');
    const canvas = document.getElementById('canvas');
    const sceneManager = new SceneManager(textCanvas, canvas);


    /**
     * Initiate app
     */
    function init() {
        bindEventListeners();

        resizeCanvas();
    }

    /**
     * Bind event listeners to the canvas element
     */
    function bindEventListeners() {
        window.onresize = resizeCanvas;
    }

    /**
     * Trigger `resize` event on canvas elements
     */
    function resizeCanvas() {
        sceneManager.onWindowResize();
    }

    init();

}();