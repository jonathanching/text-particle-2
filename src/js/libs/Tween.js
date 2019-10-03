/**
 * ==================================================================================
 * Simple tweening library using Robert Penner's easing formula
 *
 * ==================================================================================
 **/

class Tween {

    /**
     * ==================================================================================
     * @Easing Equations v1.3
     * Oct. 29, 2002
     * (c) 2002 Robert Penner
     *
     * http://robertpenner.com/scripts/easing_equations.txt
     * ==================================================================================
     * All functions have the same parameters
     * @param int  t   Current time
     * @param int  b   Beginning value
     * @param int  c   Change in value
     * @param int  d   Duration
     *
     * `t` and `d` can be in frames or seconds/milliseconds
     * ==================================================================================
     **/

    /* Simple linear tweening - no easing */
    linearTween(t, b, c, d) {
        return c*t/d + b;
    }

    /**
     * @Easing: @Quadratic (t^2)
     * ==================================================================================
     **/

    /* Quadratic easing in - accelerating from zero velocity */
    easeInQuad(t, b, c, d) {
        return c*(t/=d)*t + b;
    }

    /* Quadratic easing out - decelerating to zero velocity */
    easeOutQuad(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    }

    /* Quadratic easing in/out - acceleration until halfway, then deceleration */
    easeInOutQuad(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    }

    /**
     * @Easing: @Cubic (t^3)
     * ==================================================================================
     **/

    /* Cubic easing in - accelerating from zero velocity */
    easeInCubic(t, b, c, d) {
        return c*(t/=d)*t*t + b;
    }

    /* Cubic easing out - decelerating to zero velocity */
    easeOutCubic(t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    }

    /* Cubic easing in/out - acceleration until halfway, then deceleration */
    easeInOutCubic(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }

    /**
     * @Easing: @Quartic (t^4)
     * ==================================================================================
     **/

    /* Quartic easing in - accelerating from zero velocity */
    easeInQuart(t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    }

    /* Quartic easing out - decelerating to zero velocity */
    easeOutQuart(t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }

    /* Quartic easing in/out - acceleration until halfway, then deceleration */
    easeInOutQuart(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    }

    /**
     * @Easing: @Quintic (t^5)
     * ==================================================================================
     **/

    /* Quintic easing in - accelerating from zero velocity */
    easeInQuint(t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    }

    /* Quintic easing out - decelerating to zero velocity */
    easeOutQuint(t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    }

    /* Quintic easing in/out - acceleration until halfway, then deceleration */
    easeInOutQuint(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    }

    /**
     * @Easing: @Sinusoidal (sin(t))
     * ==================================================================================
     **/

    /* Sinusoidal easing in - accelerating from zero velocity */
    easeInSine(t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    }

    /* Sinusoidal easing out - decelerating to zero velocity */
    easeOutSine(t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    }

    /* Sinusoidal easing in/out - accelerating until halfway, then decelerating */
    easeInOutSine(t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    }

    /**
     * @Easing: @Exponential (2^t)
     * ==================================================================================
     **/

    /* Exponential easing in - accelerating from zero velocity */
    easeInExpo(t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    }

    /* Exponential easing out - decelerating to zero velocity */
    easeOutExpo(t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }

    /* Exponential easing in/out - accelerating until halfway, then decelerating */
    easeInOutExpo(t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    /**
     * @Easing: @Cirular (1-t^2)
     * ==================================================================================
     **/

    /* Circular easing in - accelerating from zero velocity */
    easeInCirc(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    }

    /* Circular easing out - decelerating to zero velocity */
    easeOutCirc(t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    }

    /* Circular easing in/out - acceleration until halfway, then deceleration */
    easeInOutCirc(t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }

    /**
     * @Easing: @Elastic
     * ==================================================================================
     **/

    /* Elastic easing in */
    easeInElastic(t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    }

    /* Elastic easing out */
    easeOutElastic(t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    }

    /* Elastic easing in/out */
    easeInOutElastic(t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    }

    /**
     * @Easing: @Back
     * ==================================================================================
     **/

    /* Back easing in */
    easeInBack(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    }

    /* Back easing out */
    easeOutBack(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }

    /* Back easing in/out */
    easeInOutBack(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }

    /**
     * @Easing: @Bounce
     * ==================================================================================
     **/

    /* Bounce easing in */
    easeInBounce(t, b, c, d) {
        return c - this.easeOutBounce(d-t, 0, c, d) + b;
    }

    /* Bounce easing out */
    easeOutBounce(t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    }

    /* Bounce easing in/out */
    easeInOutBounce(t, b, c, d) {
        if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
        return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
}

export const TWEEN = new Tween();
export default TWEEN;