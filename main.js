void (/\/*/); // Credit to Ski (@kaid_1037904081391187080498507); Gets rid of BabyHint

// var __env__ = (function() {
//     var that = draw;
//     draw = function() {
//         draw = that;
//         return this;
//     };
//     return draw();
// })();
; (function() {
    var window = this;
    if (!window.__disableLoopProtection__) {
        window.__disableLoopProtection__ = true;
        window.ASTTransforms.rewriteNewExpressions = function() {
            return {};
        };
        window.LoopProtector.prototype.leave = function() { };
        window.PJSCodeInjector.prototype.exec = function(code, context, mutatingCalls) {
            if (!code) {
                return;
            }
            try {
                code = '(function() {' + code + '})();';
                var transformedCode = this.transformCode(code, context, mutatingCalls);
                transformedCode = transformedCode.slice(14, -5);
                var funcBody = 'var ' + this.envName + ' = context;\n' + transformedCode;
                var func = new window.Function("context", funcBody);
                func(context);
            } catch (e) {
                return e;
            }
        };
        var env = window.Processing.instances[0];
        env.Program.restart();
        throw new window.Error("Restarting program");
    }
})();

angleMode = "radians";

Object.constructor.prototype.new = (function() {
    var obj = Object.create(this.prototype);
    this.apply(obj, arguments);
    return obj;
});

function isThing(something) {
    return something !== undefined && something !== null;
}

Math.TAU = Math.PI * 2;
Math.dist = function(x1, y1, x2, y2, dst) {
    return dst ?
        (((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= dst * dst) :
        Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
Math.distSq = function(x1, y1, x2, y2) {
    return ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
function hasProp(obj, prop) {
    return obj.hasOwnProperty(prop);
}
Object.constructor.prototype.hasProp = hasProp;

function getKeys(obj) {
    return Object.keys(obj);
}

function getValues(obj) {
    return Object.values(obj);
}

function getEntries(obj) {
    return Object.entries(obj);
}



var mouse = (function() {
    var mouse = {
        clicked: false, // mouseClicked
        clickActive: false, // If a click has been used
        initialPressed: false, // 
        initialPressedPos: [undefined, undefined],
        down: false,
        up: true,
        pressed: false, // mousePressed
        released: false, // mouseReleased
        dragged: false, // mouseDragged
        out: true, // mouseOut
        availableClick: true, // 
        focused: focused, // Is the mouse focused on the canvas

        doubleClicked: false, // isDoubleClicked
        startDoubleClickTimer: false, // If to start the timer
        doubleClickTimer: 0, // The timer
        resetDoubleClick: function() {
            mouse.startDoubleClickTimer = false;
            mouse.doubleClickTimer = 0;
        }, // To reset the properties
    };
    mouseClicked = function() {
        mouse.clicked = !false;
        (function /*isDoubleClicked*/() {
            if (mouse.doubleClickTimer >= 0 && mouse.startDoubleClickTimer) {
                mouse.doubleClicked = true;
                mouse.resetDoubleClick();
            }
            if (!mouse.startDoubleClickTimer) {
                mouse.startDoubleClickTimer = true;
                mouse.doubleClickTimer = 20;
            }
        })();
    };
    mousePressed = function() {
        mouse.initialPressed = true;
        mouse.initialPressedPos = [mouseX, mouseY];
        mouse.pressed = true;
    };
    mouseReleased = function() {
        mouse.pressed = false;
        mouse.released = true;
    };
    mouseDragged = function() {
        mouse.dragged = true;
    };
    mouseOver = function() {
        mouse.over = true;
    };
    mouseOut = function() {
        mouse.over = false;
    };
    return mouse;
})();

var keys = (function() {
    /** Properties of keys
     * 
     *   pressed        -  If a key has been pressed down.
     *                     Lasts for only a single frame.
     *                     Different from keys.down.
     * 
     *   released       -  If a key has been released.
     *                     Lasts for only a single frame.
     *                     Different from keys.up.
     * 
     *   down           -  If a key is being held down.
     *                     Lasts until the key is released.
     * 
     *   up             -  If all keys are released.
     *                     Lasts until a key is pressed.
     * 
     *   pressedCode    -  The keycode of the pressed key.
     *                     Lasts for only a single frame.
     * 
     *   pressedKey     -  The character of the pressed key.
     *                     Lasts for only a single frame.
     * 
     *   releasedCode   -  The keycode of the released key.
     *                     Lasts for only a single frame.
     * 
     *   releasedKey    -  The character of the pressed key.
     *                     Lasts for only a single frame.
     */
    var keys = {};
    keyPressed = function() {
        keys['_' + key.toString().toLowerCase()] = true;
        keys[keyCode] = true;
        keys.pressed = true;
        keys.down = true;
        keys.up = false;
        keys.pressedCode = keyCode;
        keys.pressedKey = key.toString().toLowerCase();
    };
    keyReleased = function() {
        keys['_' + key.toString().toLowerCase()] = false;
        keys[keyCode] = false;
        keys.released = true;
        keys.down = false;
        keys.up = true;
        keys.releasedCode = keyCode;
        keys.releasedKey = key.toString().toLowerCase();
    };
    return keys;
})();


var Vec = (function() {
    function Vec(x, y, isPolar) {
        if (isPolar) {
            this.dir = x;
            this.mag = y;
            this.x = Math.cos(x) * y;
            this.y = Math.sin(x) * y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
            this.dir = Math.atan2(y, x);
            this.mag = Math.sqrt((x * x) + (y * y));
        }
    }

    Vec.properties = {
        set: (function(x, y, isPolar) {
            if (arguments.length === 1) {
                this.x = x.x;
                this.y = x.y;
                this.dir = x.dir;
                this.mag = x.mag;
            }
            else if (isPolar) {
                this.dir = x;
                this.mag = y;
                this.x = Math.cos(x) * y;
                this.y = Math.sin(x) * y;
            } else {
                this.x = x || 0;
                this.y = y || 0;
                this.dir = Math.atan2(y, x);
                this.mag = Math.sqrt((x * x) + (y * y));
            }
        }),
        setCart: (function(x, y) {
            this.x = x || 0;
            this.y = y || 0;
            this.dir = Math.atan2(y, x);
            this.mag = Math.sqrt((x * x) + (y * y));
        }),
        setPolar: (function(dir, mag) {
            this.dir = dir;
            this.mag = mag;
            this.x = Math.cos(dir) * mag;
            this.y = Math.sin(dir) * mag;
        }),

        getDir: (function() {
            return this.dir;
        }),
        setDir: (function(ang) {
            this.dir = ang;
            this.x = Math.cos(ang);
            this.y = Math.sin(ang);
        }),
        addDir: (function(ang) {
            this.dir += ang;
            this.x = Math.cos(this.dir) * this.mag;
            this.y = Math.sin(this.dir) * this.mag;
        }),
        subDir: (function(ang) {
            this.dir -= ang;
            this.x = Math.cos(this.dir) * this.mag;
            this.y = Math.sin(this.dir) * this.mag;
        }),

        getMag: (function() {
            return this.mag;
        }),
        getMagSq: (function() {
            return (
                this.x * this.x +
                this.y * this.y
            );
        }),
        addMag: (function(mag) {
            this.mag += mag;
            this.x = Math.cos(this.dir) * this.mag;
            this.y = Math.sin(this.dir) * this.mag;
        }),
        subMag: (function(mag) {
            this.mag -= mag;
            this.x = Math.cos(this.dir) * this.mag;
            this.y = Math.sin(this.dir) * this.mag;
        }),
        setMag: (function(mag) {
            var m = 1 / Math.sqrt(
                this.x * this.x +
                this.y * this.y
            ) * mag;
            this.x = this.x * m;
            this.y = this.y * m;
        }),

        toStr: (function(separator) {
            var sep = separator || ", ";

            return this.x.toFixed(2) + sep + this.y.toFixed(2);
        }),
        add: (function(v2) {
            if (typeof v2 === 'object') {
                this.x += v2.x;
                this.y += v2.y;
            } else {
                this.x += v2;
                this.y += v2;
            }
        }),
        sub: (function(v2) {
            if (typeof v2 === 'object') {
                this.x -= v2.x;
                this.y -= v2.y;
            } else {
                this.x -= v2;
                this.y -= v2;
            }
        }),
        mult: (function(v2) {
            if (typeof v2 === 'object') {
                this.x *= v2.x;
                this.y *= v2.y;
            } else {
                this.x *= v2;
                this.y *= v2;
            }
        }),
        div: (function(v2) {
            if (typeof v2 === 'object') {
                this.x /= v2.x;
                this.y /= v2.y;
            } else {
                this.x /= v2;
                this.y /= v2;
            }
        }),
        setRand: (function() {
            var rand = Math.random() * Math.TAU;
            this.x = Math.cos(rand);
            this.y = Math.sin(rand);
        }),
    };

    Object.assign(Vec.prototype, Vec.properties);

    return Vec;
})();


var coll = (function() {
    return {
        isColl: function(x1, y1, w1, h1, buffer1, x2, y2, w2, h2, buffer2) {
            var a = {
                x: x1 - (w1 / 2),
                y: y1 - (h1 / 2),
                w: w1 + (buffer1 * 2),
                h: h1 + (buffer1 * 2),
            };
            var b = {
                x: x2 - (w2 / 2),
                y: y2 - (h2 / 2),
                w: w2 + (buffer2 * 2),
                h: h2 + (buffer2 * 2),
            };
            //return this.x < r.x + r.width && this.x + this.width > r.x && this.y < r.y + r.height && this.y + this.height > r.y;
            return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && a.y + a.h > b.y;
        },
        line: {
            circle: function(x1, y1, x2, y2, xc, yc, rc) {
                function dot(v1, v2) {
                    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
                }
                var ac = [xc - x1, yc - y1];
                var ab = [x2 - x1, y2 - y1];
                var ab2 = dot(ab, ab);
                var acab = dot(ac, ab);
                var t = acab / ab2;
                t = (t < 0) ? 0 : t;
                t = (t > 1) ? 1 : t;
                var h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc];
                var h2 = dot(h, h);
                return h2 <= rc * rc;
            },
        },
        rect: {
            rect: function(a, b) {
                return !(b.x > a.w + a.x || a.x > b.w + b.x || b.y > a.h + a.x || a.y > b.h + b.y);
            },
        },
        poly: {
            poly: function(poly1, poly2) {
                var polygons = [poly1, poly2];
                var minA, maxA, projected, minB, maxB, j;
                var i = polygons.length - 1;
                for (; i >= 0; i--) {
                    var polygon = polygons[i];
                    var i1 = polygon.length - 1;
                    for (; i1 >= 0; i1 -= 2) {
                        var i2 = (i1 + 2) % polygon.length;
                        var normal = {
                            x: polygon[i2 + 1] - polygon[i1 + 1],
                            y: polygon[i1] - polygon[i2]
                        };
                        minA = maxA = null;

                        var j = poly1.length - 1;
                        for (; j >= 0; j -= 2) {
                            projected = normal.x * poly1[j] + normal.y * poly1[j + 1];
                            if (minA === null || projected < minA) {
                                minA = projected;
                            }
                            if (maxA === null || projected > maxA) {
                                maxA = projected;
                            }
                        }
                        minB = maxB = null;
                        var j = poly2.length - 1;
                        for (; j >= 0; j -= 2) {
                            projected = normal.x * poly2[j] + normal.y * poly2[j + 1];
                            if (minB === null || projected < minB) {
                                minB = projected;
                            }
                            if (maxB === null || projected > maxB) {
                                maxB = projected;
                            }
                        }
                        if (maxA < minB || maxB < minA) {
                            return false;
                        }
                    }
                }
                return true;
            },
            circle: function(points, xc, yc, rc, tolerance) {
                tolerance = tolerance || 1;

                if (this.poly.point(points, xc, yc, tolerance)) {
                    return true;
                }
                var count = points.length;
                var i = 0,
                    countToLoop = count - 2;
                for (; i < countToLoop; i += 2) {
                    if (this.line.circle(points[i], points[i + 1], points[i + 2], points[i + 3], xc, yc, rc)) {
                        return true;
                    }
                }
                return this.line.circle(points[0], points[1], points[count - 2], points[count - 1], xc, yc, rc);
            }
        },
        print: function() {
            var i = 0,
                o = Object.keys(this),
                o_ = o.length - 1;
            for (; i < o_; i++) {
                switch (typeof this[o[i]]) {
                    case "function":
                        println("" + o[i] + " = " + this[o[i]].toString().replace(/ {8}/g, "    ").replace(/\n {4}/g, "\n") + "\n");
                        println("\n--------\n\n");
                        break;

                    case "object":
                        var i2 = 0,
                            o2 = Object.keys(this[o[i]]),
                            o_2 = o2.length;
                        for (; i2 < o_2; i2++) {
                            println(
                                "" + o[i] + "." + o2[i2] + " = " +
                                this[o[i]][o2[i2]].toString()
                                    .replace(/ {8}/g, "    ")
                                    .replace(/\n {4}/g, "\n")
                                    .replace(/;\n\n {4}\}/g, "}") +
                                "\n"
                            );
                            println("\n--------\n\n");
                        }
                        break;
                }
            }
        }
    };
})();

var coll = (function() {
    // Pre-defs: {
    /*
     * Convert pairs of X-Y coordinate parameters to
     * an array of Points with x and y properties.
     */
    var coords2Points = function(x1, y1) {
        /* Pass any number of X - Y coordinate pairs. */
        var i, j, points = [];
        for (i = j = 0; i < arguments.length; j++) {
            points[j] = { x: arguments[i++], y: arguments[i++] };
        }
        return points;
    };

    var rotatePoint = function(x, y, theta, sine) {
        /*
        ** Rotate the point (x, y) by angle theta around the
        ** origin.  NOTE that if a fourth parameter is
        ** defined, then the last two parameters ARE theta's
        ** cosine and sine.
        */
        var cosine = theta;
        if (sine === undefined) {
            cosine = cos(theta);
            sine = sin(theta);
        }
        return {
            x: cosine * x + sine * y,
            y: -sine * x + cosine * y
        };
    };

    var rectangleMode = function(mode) {
        /*
        ** Sets and returns the rectangle mode used in
        ** rect conversions, rotations and rendering.
        */
        if (mode !== undefined) {
            rectangleMode.mode = mode;
        }
        return rectangleMode.mode;
    };

    var rect2Points = function(x, y, w, h, theta) {
        /* 
        ** Compute absolute vertices of the rotated rectangle.
        ** The first four parameters describe the rectangle.
        ** The rectangle.mode affects rects's origin.
        */
        var p;
        if (rectangleMode.mode === CORNERS) {
            w -= x;
            h -= y;
        }
        if (theta) {
            var cosine = cos(-theta);  /* Compute once... */
            var sine = sin(-theta);  /* ... use often. */
            if (rectangleMode.mode === CENTER) {
                /* Rotate four corners around the center, (x, y) */
                w /= 2;
                h /= 2;
                p = [rotatePoint(-w, -h, cosine, sine),
                rotatePoint(+w, -h, cosine, sine),
                rotatePoint(+w, +h, cosine, sine),
                rotatePoint(-w, +h, cosine, sine)];
            } else {
                /* Default CORNER mode. Rotate around corner (x, y) */
                p = [{ x: 0, y: 0 },
                rotatePoint(w, 0, cosine, sine),
                rotatePoint(w, h, cosine, sine),
                rotatePoint(0, h, cosine, sine)];
            }
            /* Renormalize rotated points */
            for (var i = 0; i < p.length; i++) {
                p[i].x += x;
                p[i].y += y;
            }
        } else if (rectangleMode.mode === CENTER) {
            /* No rotation. (x, y) is the center of the rect. */
            w /= 2;
            h /= 2;
            p = coords2Points(x - w, y - h, x + w, y - h, x + w, y + h, x - w, y + h);
        } else {
            /* No rotation. Default CORNER mode. */
            p = coords2Points(x, y, x + w, y, x + w, y + h, x, y + h);
        }
        return p;
    };

    var isBetween = function(c, a, b) {
        /*
        ** Return true iff c is between a and b.  Normalize
        ** all parameters wrt c, then ask if a and b are on
        ** opposite sides of zero.
        */
        return (a - c) * (b - c) <= 0;
    };

    var overlap = function(a, b, c, d) {
        /* Return true iff range [a, b] overlaps [c, d]. */
        return isBetween((c < d) ? c : d, a, b) ||
            isBetween((a < b) ? a : b, c, d);
    };

    /*
     * Return true iff the point (x, y) is in the line
     * segment (x1, y1) to (x2, y2).
     */
    var isInLine = function(x, y, x1, y1, x2, y2) {
        return (y2 - y1) / (x2 - x1) === (y - y1) / (x - x1) &&
            isBetween(x, x1, x2);
    };

    /* 
     * Return true iff the point (x, y) is in the polygon
     * described by the array "poly" whose elements are 
     * vertex objects with "x" and "y" properties. Derived
     * from Pamela's function in
     * https://www.khanacademy.org/cs/p/5211412870725632
     * which implements the even-odd rule of ray tracing.
     */
    var isInPolygon = function(x, y, poly) {
        var isIn = false;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            var xi = poly[i].x, yi = poly[i].y;
            var xj = poly[j].x, yj = poly[j].y;
            var intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) {
                isIn = !isIn;
            }
        }
        return isIn;
    };

    /*
     * Return true iff point (x, y) in the triangle
     * described by the last six parameters.
     */
    var isInTriangle = function(x, y, x1, y1, x2, y2, x3, y3) {
        var tri = coords2Points(x1, y1, x2, y2, x3, y3);
        return isInPolygon(x, y, tri);
    };

    /*
     * Return true iff point (x, y) in the triangle
     * described by rx, ry, w and h in conjunction
     * with rectangleMode.mode.  OPTIONAL parameter
     * theta describes the angle of rotation of the
     * rectangle around its origin.
     */
    var isInRect = function(x, y, rx, ry, w, h, theta) {
        if (theta) {
            /* rotate the point wrt (rx, ry) */
            var p = rotatePoint(x - rx, y - ry, theta);
            x = p.x + rx;
            y = p.y + ry;
        }
        if (rectangleMode.mode === CORNERS) {
            w -= rx;
            h -= ry;
        } else if (rectangleMode.mode === CENTER) {
            rx -= w / 2;
            ry -= h / 2;
        }
        return isBetween(x, rx, rx + w) && isBetween(y, ry, ry + h);
    };

    /*
     * Return true iff point (x, y) in the quadrilateral
     * described by the last eigth parameters.
     */
    var isInQuad = function(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
        var quad = coords2Points(x1, y1, x2, y2, x3, y3, x4, y4);
        return isInPolygon(x, y, quad);
    };

    /*
     * Return true iff point (x, y) is in the circle 
     * centered at (cx, cy) with diameter diam.
     */
    var isInCircle = function(x, y, cx, cy, diam) {
        var dx = x - cx;
        var dy = y - cy;
        return dx * dx + dy * dy <= diam * diam / 4;
    };

    /*
     * Return true iff point (x, y) is in the ellipse 
     * centered at (ex, ey) with axes lengths w and h.
     * Optional parameter theta is the angle of rotation
     * of the ellipse, OR with optional parameter sine 
     * it is the cosine of the angle.
     */
    var isInEllipse = function(x, y, ex, ey, w, h, theta, sine) {
        /* Normalize wrt the ellipse center */
        x -= ex;
        y -= ey;
        if (theta | sine) {
            var rp = rotatePoint(x, y, theta, sine);
            x = rp.x;
            y = rp.y;
        }
        var termX = 2 * x / w;  /* sqrt of first term */
        var termY = 2 * y / h;  /* sqrt of second term */
        return ((termX * termX) + (termY * termY)) <= 1;
    };

    /*
     * Return a "correction" angle that converts a
     * subtended angle to a parametric angle for an
     * ellipse with radii a and b.  See
     * http://mathworld.wolfram.com/Ellipse-LineIntersection.html
     */
    var subtended2parametric = function(a, b, subtended) {
        if (a === b) {
            return 0;  /* circle needs no correction */
        }
        var rx = cos(subtended);  /* ray from the origin */
        var ry = sin(subtended);
        var e = (a * b) / sqrt(a * a * ry * ry + b * b * rx * rx);
        var ex = e * rx;  /* where ray intersects ellipse */
        var ey = e * ry;
        var parametric = atan2(a * ey, b * ex);
        subtended = atan2(ry, rx);  /* Normailzed! */
        return parametric - subtended;
    };

    /* 
     * Return true iff angle c is between angles
     * a and b, inclusive. b always follows a in
     * the positive rotational direction. Operations
     * against an entire circle cannot be defined.
     */
    var tau = (cos(PI) < 0) ? TWO_PI : 360;  /* KA silliness */
    var isAngleBetween = function(c, a, b) {
        /* Make sure that a is in the range [0 .. tau). */
        for (a %= tau; a < 0; a += tau) { }
        /* Make sure that both b and c are not less than a. */
        for (b %= tau; b < a; b += tau) { }
        for (c %= tau; c < a; c += tau) { }
        return c <= b;
    };

    /*
     * Return true iff the point (x, y) is in the 
     * pizza  slice defined by "arc" using the
     * last six parameters.
     */
    var isInArc = function(x, y, ex, ey, w, h, start, stop) {
        var heading = atan2(y - ey, x - ex);
        heading += subtended2parametric(w / 2, h / 2, heading);
        return isAngleBetween(heading, start, stop) &&
            isInEllipse(x, y, ex, ey, w, h);
    };
    // }

    // Defs: {
    /*
     * Return true iff two line segments overlap.  Uses parametric
     * equaltions of segment aka First Degree Beziers. See 
     * wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
     */
    var lineLineCollide = function(x1, y1, x2, y2, x3, y3, x4, y4) {
        var t, u;
        var dx = x1 - x2;
        var dy = y1 - y2;
        var d = dx * (y3 - y4) - dy * (x3 - x4);
        if (d === 0) {
            /*
             * Parallel or coincident line segments!  See collinear check at 
             * https://www.youtube.com/watch?v=ZlaRewp4Z-A
             */
            if (abs(x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - y2 * x3) > 1e-10) {
                /* Not collinear */
                return false;
            }
            if (abs(dy / dx) < 1) {
                /* Flat slope - use X coordinates. */
                t = (x3 - x2) / dx; // derived from x3 = x2 + t*(x1 - x2)
                u = (x4 - x2) / dx; // derived from x4 = x2 + u*(x1 - x2)
            } else {
                /* Steep slope - use Y coordinates. */
                t = (y3 - y2) / dy; // same derivation, but for Y coordinate
                u = (y4 - y2) / dy;
            }
            return (t >= 0 || u >= 0) && (u <= 1 || t <= 1);
        }
        t = ((x1 - x3) * dy - (y1 - y3) * dx) / d;
        if (t < 0 || t >= 1) {
            return false;
        }
        u = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
        return u >= 0 && u <= 1;
    };

    /*
     * Return true iff the line segment described by the first
     * four parameters intersects the polygon described by
     * "poly", an array of vertex objects with x and y properties.
     */
    var linePolygonCollide = function(x1, y1, x2, y2, poly) {
        var collide = isInPolygon(x1, y1, poly);
        for (var j = poly.length - 1, i = 0; (!collide) && (i < poly.length); j = i, i++) {
            collide = lineLineCollide(x1, y1, x2, y2, poly[j].x, poly[j].y, poly[i].x, poly[i].y);
        }
        return collide;
    };

    /*
     * Return true iff the line segment described by the first
     * four parameters intersects the triangle described by
     * the last six parameters.
     */
    var lineTriangleCollide = function(x1, y1, x2, y2, tx1, ty1, tx2, ty2, tx3, ty3) {
        var tri = coords2Points(tx1, ty1, tx2, ty2, tx3, ty3);
        return linePolygonCollide(x1, y1, x2, y2, tri);
    };

    /*
     * Return true iff the line segment described by the first
     * four parameters intersects the rectangle described by
     * the next four parameters, rotated by OPTIONAL parameter,
     * theta.
     */
    var lineRectCollide = function(x1, y1, x2, y2, x, y, w, h, theta) {
        var rect = rect2Points(x, y, w, h, theta);
        return linePolygonCollide(x1, y1, x2, y2, rect);
    };

    /*
     * Return true iff the line segment described by the first
     * four parameters intersects the quadrilateral described
     * by the last eight parameters.
     */
    var lineQuadCollide = function(x1, y1, x2, y2, qx1, qy1, qx2, qy2, qx3, qy3, qx4, qy4) {
        var quad = coords2Points(qx1, qy1, qx2, qy2, qx3, qy3, qx4, qy4);
        return linePolygonCollide(x1, y1, x2, y2, quad);
    };

    /*
     * Return true iff the line segment described by
     * the first four parameters intersects the circle
     * described by the last three parameters.
     * (Simplified code from lineEllipseCollide.)
     */
    var lineCircleCollide = function(x1, y1, x2, y2, cx, cy, diam) {
        var m = (y2 - y1) / (x2 - x1);  /* slope */
        if (abs(m) > 1024) {
            /* Convert vertical to horizontal and try again. */
            return lineCircleCollide(y1, x1, y2, x2, cy, cx, diam);
        }
        if (isInCircle(x2, y2, cx, cy, diam)) {
            /* The segment may be entirely inside the circle */
            return true;
        }
        x1 -= cx;
        x2 -= cx;
        y1 -= cy;
        y2 -= cy;
        var r = diam * diam / 4;  /* radius squared */
        var k = y1 - (m * x1);  /* So, y = m*x + k */
        var a = (1 + m * m) / r;
        var b = 2 * m * k / r;
        var c = k * k / r - 1;
        var discrim = b * b - 4 * a * c;
        if (discrim < 0) {
            return false;  /* No intersection */
        }
        discrim = sqrt(discrim);
        a *= 2;
        return (isBetween((-b - discrim) / a, x1, x2)) ||
            isBetween((-b + discrim) / a, x1, x2);
    };

    /*
     * Return true iff the line segment described by Processing.js
     * line(x1, y1, x2, y2) intersects the ellipse(ex, ey, w, h)
     * rotated by angle theta.
     */
    var lineEllipseCollide = function(x1, y1, x2, y2, ex, ey, w, h, theta) {
        var cosine = 1, sine = 0;
        if (theta) {
            cosine = cos(theta);  /* compute once... */
            sine = sin(theta);  /* ...use often */
        }
        /*
         * Normalize s.t. the ellipse is centered at
         * the origin and is not rotated.
         */
        var r1 = rotatePoint(x1 - ex, y1 - ey, cosine, sine);
        var r2 = rotatePoint(x2 - ex, y2 - ey, cosine, sine);
        var m = (r2.y - r1.y) / (r2.x - r1.x);  /* slope */
        if (abs(m) > 1024) {
            /* Vertical line, so swap X & Y, and try again. */
            return lineEllipseCollide(r1.y, r1.x, r2.y, r2.x, 0, 0, h, w);
        }
        if (isInEllipse(r2.x, r2.y, 0, 0, w, h)) {
            /* The segment may be entirely inside the ellipse */
            return true;
        }
        /* Intersect:
         * x²/s + y²/t = 1 with y = mx + k
         * x²/s + (mx + k)²/t = 1
         * x²/s + (m²x² + 2mkx + k²)/t - 1 = 0
         * (1/s + m²/t)x² + (2mk/t)x + (k²/t - 1) = 0
         * is the standard form of a quadratic that
         * can be solved by the quadratic formula:
         * x = (-b +|- sqrt(b² - 4ac)) / 2a where
         * a = 1/s + m²/t, b = 2mk/t and c = k²/t - 1
         */
        var s = w * w / 4;
        var t = h * h / 4;  /* So, x²/s + y²/t = 1 */
        var k = r1.y - (m * r1.x);  /* So, y = m*x + k */
        var a = 1 / s + m * m / t;
        var b = 2 * m * k / t;
        var c = k * k / t - 1;
        var discrim = b * b - 4 * a * c;
        if (discrim < 0) {
            return false;  /* No intersection */
        }
        discrim = sqrt(discrim);
        a *= 2;
        return (isBetween((-b - discrim) / a, r1.x, r2.x)) ||
            isBetween((-b + discrim) / a, r1.x, r2.x);
    };

    /*
     * Return true iff the circle described by the first
     * three parameters collides with the circle described
     * by the last three parameters.
     */
    var circleCircleCollide = function(x1, y1, diam1, x2, y2, diam2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        var dist2 = dx * dx + dy * dy;
        var sum = (diam1 + diam2) / 2;  /* radius1 + radius2 */
        return dist2 <= sum * sum;
    };

    /*
     * Return true iff poly and the ellipse centered at (ex, ey) 
     * with width w and height h, rotated by theta collide.  "poly"
     * is an array of vertex objects with x and y properties.
     * Algorithm is described by ShreevatsaR at
     * http://stackoverflow.com/questions/401847/
     */
    var polygonEllipseCollide = function(poly, ex, ey, w, h, theta) {
        var collide = isInPolygon(ex, ey, poly);
        for (var i = 0, j = poly.length - 1; (!collide) && (i < poly.length); j = i, i++) {
            collide = lineEllipseCollide(poly[j].x, poly[j].y, poly[i].x, poly[i].y, ex, ey, w, h, theta);
        }
        return collide;
    };

    /*
     * Return true iff the rectangle described by the first four parameters
     * rotated by rTheta collides with the rotated ellipse described by the
     * last five parameters.
     */
    var rectEllipseCollide = function(rx, ry, rw, rh, rTheta, ex, ey, ew, eh, eTheta) {
        var rect = rect2Points(rx, ry, rw, rh, rTheta);
        return polygonEllipseCollide(rect, ex, ey, ew, eh, eTheta);
    };

    /*
     * Return true iff the polygon described by poly
     * intersects the circle described by the last
     * three parameters. "poly" is an array of vertex
     * objects with x and y properties.
     */
    var polygonCircleCollide = function(poly, cx, cy, diam) {
        var collide = isInPolygon(cx, cy, poly);
        for (var i = 0, j = poly.length - 1; (!collide) && (i < poly.length); j = i, i++) {
            collide = lineCircleCollide(poly[j].x, poly[j].y, poly[i].x, poly[i].y, cx, cy, diam);
        }
        return collide;
    };

    /*
     * Return true iff the rectangle described by the first
     * four parameters rotated by theta collides with the circle
     * described by the last three parameters.
     */
    var rectCircleCollide = function(rx, ry, w, h, theta, cx, cy, diam) {
        if (theta) {
            /* rotate the circle center wrt rect point (rx, ry). */
            var r = rotatePoint(cx - rx, cy - ry, theta);
            cx = r.x + rx;
            cy = r.y + ry;
        }
        if (rectangleMode.mode === CORNERS) {
            w -= rx;
            h -= ry;
        } else if (rectangleMode.mode === CENTER) {
            rx -= w / 2;
            ry -= h / 2;
        }
        /* See Cygon at http://stackoverflow.com/questions/401847/ */
        var closestX = constrain(cx, rx, rx + w);
        var closestY = constrain(cy, ry, ry + h);
        return isInCircle(closestX, closestY, cx, cy, diam);
    };

    /*
     * Return true iff CONVEX polygons 1 and 2 collide.
     * Use the Separation Axis Theorem as explained by
     * http://www.dyn4j.org/2010/01/sat/
     */
    var polygonPolygonCollide = function(poly1, poly2) {
        var polys = [poly1, poly2];

        /*
         * Project poly onto axis.  Simply
         * compute dot products between the
         * poly's vertices and the axis, and
         * keep track of the min and max values.
         */
        var project = function(poly, axis) {
            var mn = Infinity;
            var mx = -Infinity;
            for (var i = 0; i < poly.length; i++) {
                var dot = poly[i].x * axis.x + poly[i].y * axis.y;
                mx = max(mx, dot);
                mn = min(mn, dot);
            }
            return { min: mn, max: mx };
        };

        /* Compute all projections axes of poly. */
        var getAxes = function(poly) {
            var axes = [];
            for (var i = 0; i < poly.length; i++) {
                var n = (i + 1) % poly.length;
                /*
                 * The edge is simply the delta between i and n.
                 * The axis is the edge's normal. And a normal 
                 * of (x, y) is either of (y, -x) or (-y, x).
                 */
                axes[i] = {
                    y: poly[i].x - poly[n].x,
                    x: -(poly[i].y - poly[n].y)
                };
            }
            return axes;
        };

        for (var p = 0; p < polys.length; p++) {
            var axes = getAxes(polys[p]);
            for (var i = 0; i < axes.length; i++) {
                var axis = axes[i];
                /* Project both polygons onto this axis */
                var p1 = project(poly1, axis);
                var p2 = project(poly2, axis);
                if (!overlap(p1.min, p1.max, p2.min, p2.max)) {
                    /* The two polygons cannot overlap */
                    return false;
                }
            }
        }
        return true;  /* they do overlap */
    };

    /*
     * Return true iff two rectangles collide. Each is described by
     * traditional Processing.js arguments, rotated by angle theta.
     */
    var rectRectCollide = function(x1, y1, w1, h1, theta1, x2, y2, w2, h2, theta2) {
        if (theta1 === 0 && theta2 === 0) {
            if (rectangleMode.mode === CORNERS) {
                w1 -= x1;
                h1 -= y1;
                w2 -= x2;
                h2 -= y2;
            } else if (rectangleMode.mode === CENTER) {
                x1 -= w1 / 2;
                y1 -= h1 / 2;
                x2 -= w2 / 2;
                y2 -= h2 / 2;
            }
            return overlap(x1, x1 + w1, x2, x2 + w2) && overlap(y1, y1 + h1, y2, y2 + h2);
        } else {
            return polygonPolygonCollide(
                rect2Points(x1, y1, w1, h1, theta1),
                rect2Points(x2, y2, w2, h2, theta2));
        }
    };

    /*
     * Return true iff two triangles collide. Each is described by
     * traditional Processing.js arguments.
     */
    var triangleTriangleCollide = function(ax1, ay1, ax2, ay2, ax3, ay3,
        bx1, by1, bx2, by2, bx3, by3) {
        var triA = coords2Points(ax1, ay1, ax2, ay2, ax3, ay3);
        var triB = coords2Points(bx1, by1, bx2, by2, bx3, by3);
        return polygonPolygonCollide(triA, triB);
    };

    /*
     * Return true iff two quadrilateral collide. Each is described
     * by traditional Processing.js arguments.
     */
    var quadQuadCollide = function(ax1, ay1, ax2, ay2, ax3, ay3, ax4, ay4,
        bx1, by1, bx2, by2, bx3, by3, bx4, by4) {
        var quadA = coords2Points(ax1, ay1, ax2, ay2, ax3, ay3, ax4, ay4);
        var quadB = coords2Points(bx1, by1, bx2, by2, bx3, by3, bx4, by4);
        return polygonPolygonCollide(quadA, quadB);
    };

    /*
     * Do two ellipses collide?  The first ellipse is described
     * in its "traditional" manner by the first four parameters,
     * along with a rotation parameter, theta1.  Similarly, the last
     * five parameters describe the second ellipse.
     */
    var ellipseEllipseCollide = function(x1, y1, w1, h1, theta1, x2, y2, w2, h2, theta2) {

        /*
         * Does the quartic function described by
         * y = z4*x⁴ + z3*x³ + z2*x² + z1*x + z0 have *any*
         * real solutions?  See
         * http://en.wikipedia.org/wiki/Quartic_function
         * Thanks to Dr. David Goldberg for the convertion to
         * a depressed quartic!
         */
        var realRoot = function(z4, z3, z2, z1, z0) {
            /* First trivial checks for z0 or z4 being zero */
            if (z0 === 0) {
                return true;  /* zero is a root! */
            }
            if (z4 === 0) {
                if (z3 !== 0) {
                    return true;  /* cubics always have roots */
                }
                if (z2 !== 0) {
                    return (z1 * z1 - 4 * z2 * z0) >= 0; /* quadratic */
                }
                return z1 !== 0;  /* sloped lines have one root */
            }
            var a = z3 / z4, b = z2 / z4, c = z1 / z4, d = z0 / z4;
            var p = (8 * b - 3 * a * a) / 8;
            var q = (a * a * a - 4 * a * b + 8 * c) / 8;
            var r = (-3 * a * a * a * a + 256 * d - 64 * c * a + 16 * a * a * b) / 256;
            /*
             *   x⁴ +        p*x² + q*x + r
             * a*x⁴ + b*x³ + c*x² + d*x + e
             * so a=1  b=0  c=p  d=q  e=r
             * That is, we have a depessed quartic.
             */
            var discrim = 256 * r * r * r - 128 * p * p * r * r + 144 * p * q * q * r -
                27 * q * q * q * q + 16 * p * p * p * p * r - 4 * p * p * p * q * q;
            var P = 8 * p;
            var D = 64 * r - 16 * p * p;

            return discrim < 0 || (discrim > 0 && P < 0 && D < 0) ||
                (discrim === 0 && (D !== 0 || P <= 0));
        };

        /*
         * Is the Y coordinate(s) of the intersection of two conic
         * sections real? They are in their bivariate form,
         * ax²  + bxy  + cx²  + dx  + ey  + f = 0
         * For now, a and a1 cannot be zero.
         */
        var yIntersect = function(a, b, c, d, e, f, a1, b1, c1, d1, e1, f1) {
            /*
             * Normalize the conics by their first coefficient, a.
             * Then get the differnce of the two equations.
             */
            var deltaB = (b1 /= a1) - (b /= a);
            var deltaC = (c1 /= a1) - (c /= a);
            var deltaD = (d1 /= a1) - (d /= a);
            var deltaE = (e1 /= a1) - (e /= a);
            var deltaF = (f1 /= a1) - (f /= a);

            /* Special case for b's and d's being equal */
            if (deltaB === 0 && deltaD === 0) {
                return realRoot(0, 0, deltaC, deltaE, deltaF);
            }

            var a3 = b * c1 - b1 * c;
            var a2 = b * e1 + d * c1 - b1 * e - d1 * c;
            var a1 = b * f1 + d * e1 - b1 * f - d1 * e;
            var a0 = d * f1 - d1 * f;

            var A = deltaC * deltaC - a3 * deltaB;
            var B = 2 * deltaC * deltaE - deltaB * a2 - deltaD * a3;
            var C = deltaE * deltaE +
                2 * deltaC * deltaF - deltaB * a1 - deltaD * a2;
            var D = 2 * deltaE * deltaF - deltaD * a1 - deltaB * a0;
            var E = deltaF * deltaF - deltaD * a0;
            return realRoot(A, B, C, D, E);
        };

        /*
         * Do two conics sections el and el1 intersect? Each are in
         * bivariate form, ax²  + bxy  + cx²  + dx  + ey  + f = 0
         * Solve by constructing a quartic that must have a real
         * solution if they intersect.  This checks for real Y
         * intersects, then flips the parameters around to check
         * for real X intersects.
         */
        var conicsIntersect = function(el, el1) {
            /* check for real y intersects, then real x intersects */
            return yIntersect(el.a, el.b, el.c, el.d, el.e, el.f,
                el1.a, el1.b, el1.c, el1.d, el1.e, el1.f) &&
                yIntersect(el.c, el.b, el.a, el.e, el.d, el.f,
                    el1.c, el1.b, el1.a, el1.e, el1.d, el1.f);
        };

        /*
         * Express the traditional KA ellipse, rotated by an angle
         * whose cosine and sine are A and B, in terms of a "bivariate"
         * polynomial that sums to zero.  See
         * http://elliotnoma.wordpress.com/2013/04/10/a-closed-form-solution-for-the-intersections-of-two-ellipses
         */
        var bivariateForm = function(x, y, width, height, A, B) {
            /*
             * Start by rotating the ellipse center by the OPPOSITE
             * of the desired angle.  That way when the bivariate
             * computation transforms it back, it WILL be at the
             * correct (and original) coordinates.
             */
            var r = rotatePoint(x, y, A, B),
                a = r.x,
                c = r.y;

            /*
             * Now let the bivariate computation
             * rotate in the opposite direction.
             */
            B = -B;  /* A = cos(-rot); B = sin(-rot); */
            var b = width * width / 4,
                d = height * height / 4;
            return {
                a: (A * A / b) + (B * B / d),  /* x² coefficient */
                b: (-2 * A * B / b) + (2 * A * B / d),  /* xy coeff */
                c: (B * B / b) + (A * A / d),  /* y² coeff */
                d: (-2 * a * A / b) - (2 * c * B / d),  /* x coeff */
                e: (2 * a * B / b) - (2 * c * A / d),  /* y coeff */
                f: (a * a / b) + (c * c / d) - 1  /* constant */
                /* So, ax² + bxy + cy² + dx + ey + f = 0 */
            };
        };

        if (!circleCircleCollide(x1, y1, (w1 > h1) ? w1 : h1, x2, y2, (w2 > h2) ? w2 : h2)) {
            /* If they were circles, they're too far apart! */
            return false;
        }

        var cosine1 = cos(theta1), sine1 = sin(theta1),
            cosine2 = cos(theta2), sine2 = sin(theta2);
        /* Is the center of one inside the other? */
        if (isInEllipse(x2, y2, x1, y1, w1, h1, cosine1, sine1) ||
            isInEllipse(x1, y1, x2, y2, w2, h2, cosine2, sine2)) {
            return true;
        }

        /* Ok, do the hard work */
        var elps1 = bivariateForm(x1, y1, w1, h1, cosine1, sine1);
        var elps2 = bivariateForm(x2, y2, w2, h2, cosine2, sine2);
        /*
         * Now, ask your good friend with a PhD in Mathematics how he
         * would do it; then translate his R code.  See
         * https://docs.google.com/file/d/0B7wsEy6bpVePSEt2Ql9hY0hFdjA/
         */
        return conicsIntersect(elps1, elps2);
    };
    // }

    var coll = {};

    // line, poly, tri, rect, quad, circle, ellipse

    coll.lineLine = lineLineCollide;
    coll.linePoly = coll.linePolygon = linePolygonCollide;
    coll.lineTri = coll.lineTriangle = lineTriangleCollide;
    coll.lineRect = lineRectCollide;
    coll.lineQuad = lineQuadCollide;
    coll.lineCircle = lineCircleCollide;
    coll.lineEllipse = lineEllipseCollide;

    coll.circleCircle = circleCircleCollide;

    coll.polyEllipse = coll.polygonEllipse = polygonEllipseCollide;
    coll.polyCircle = coll.polygonCircle = polygonCircleCollide;
    coll.polyPoly = coll.polygonPolygon = polygonPolygonCollide;

    coll.rectEllipse = rectEllipseCollide;
    coll.rectCircle = rectCircleCollide;
    coll.rectRect = rectRectCollide;

    coll.triTri = coll.triangleTriangle = triangleTriangleCollide;

    coll.quadQuad = quadQuadCollide;

    coll.ellipseEllipse = ellipseEllipseCollide;

    coll.pointPoly = isInPolygon;

    coll.coords2Points = coll.coordsToPoints = coords2Points;

    coll.print = function() {
        var i = 0,
            o = Object.keys(this),
            o_ = o.length - 1;
        for (; i < o_; i++) {
            switch (typeof this[o[i]]) {
                case "function":
                    println("coll." + o[i] + " = " + "" + this[o[i]].toString().replace(/ {8}/g, "    ").replace(/\n {4}/g, "\n").replace(/ {4}\}$/g, "};") + "\n");
                    println("\n----------------\n\n");
                    break;

                case "object":
                    var i2 = 0,
                        o2 = Object.keys(this[o[i]]),
                        o_2 = o2.length;
                    for (; i2 < o_2; i2++) {
                        println(
                            "coll." + o[i] + "." + o2[i2] + " = " +
                            this[o[i]][o2[i2]].toString()
                                .replace(/ {8}/g, "    ")
                                .replace(/\n {4}/g, "\n")
                                .replace(/;\n\n {4}\}/g, "}")
                                .replace(/ {4}\}$/g, "};") +
                            "\n"
                        );
                        println("\n--------\n\n");
                    }
                    break;
                default:
                    println(typeof this[o[i]]);
                    break;
            }
        }
    };

    return coll;
})();

draw = function() {
    (function /*splash*/() {
        background(0, 0);

        textAlign(CENTER, CENTER);
        textFont(createFont("times new roman"), 50 * (width / 400));
        fill(0);
        text("[Resource]\nAll In One", width / 2, height / 2);
    })();

    (function /*resetVariables*/() {
        mouse.initialPressed = mouse.doubleClicked = mouse.pressed = mouse.released = mouse.clicked = mouse.dragged = false;
        keys.pressed = keys.released = keys.pressedCode = keys.pressedKey = keys.releasedCode = keys.releasedKey = false;
        mouse.focused = focused;

        if (mouse.startDoubleClickTimer) {
            mouse.doubleClickTimer--;

            if (mouse.doubleClickTimer < 0) {
                mouse.resetDoubleClick();
            }
        }
    })();
};

void (1 || random());



/**
 * Test area ahead; use at your own risk
*/
Math.random.inclusive = function(low, hi) {
    return Math.floor(Math.random() * (hi - low + 1)) + low;
};
Math.random.randInt = function(low, hi) {
    low = Math.ceil(low);
    hi = Math.floor(hi);
    return Math.floor(Math.random() * (hi - low) + low); //The maximum is exclusive and the minimum is inclusive
};
