var THREE = THREE || {
    REVISION: "49"
};
self.Int32Array || (self.Int32Array = Array, self.Float32Array = Array), function() {
    var a = 0,
        b = ["ms", "moz", "webkit", "o"];
    for (var c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
        var d = Date.now(),
            e = Math.max(0, 16 - (d - a)),
            f = window.setTimeout(function() {
                b(d + e)
            }, e);
        return a = d + e, f
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    })
}(), THREE.Clock = function(a) {
    this.autoStart = a !== undefined ? a : !0, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
}, THREE.Clock.prototype.start = function() {
    this.startTime = Date.now(), this.oldTime = this.startTime, this.running = !0
}, THREE.Clock.prototype.stop = function() {
    this.getElapsedTime(), this.running = !1
}, THREE.Clock.prototype.getElapsedTime = function() {
    return this.elapsedTime += this.getDelta(), this.elapsedTime
}, THREE.Clock.prototype.getDelta = function() {
    var a = 0;
    this.autoStart && !this.running && this.start();
    if (this.running) {
        var b = Date.now();
        a = .001 * (b - this.oldTime), this.oldTime = b, this.elapsedTime += a
    }
    return a
}, THREE.Color = function(a) {
    return a !== undefined && this.setHex(a), this
}, THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function(a) {
        return this.r = a.r, this.g = a.g, this.b = a.b, this
    },
    copyGammaToLinear: function(a) {
        return this.r = a.r * a.r, this.g = a.g * a.g, this.b = a.b * a.b, this
    },
    copyLinearToGamma: function(a) {
        return this.r = Math.sqrt(a.r), this.g = Math.sqrt(a.g), this.b = Math.sqrt(a.b), this
    },
    convertGammaToLinear: function() {
        var a = this.r,
            b = this.g,
            c = this.b;
        return this.r = a * a, this.g = b * b, this.b = c * c, this
    },
    convertLinearToGamma: function() {
        return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
    },
    setRGB: function(a, b, c) {
        return this.r = a, this.g = b, this.b = c, this
    },
    setHSV: function(a, b, c) {
        var d, e, f, g, h;
        if (c === 0) this.r = this.g = this.b = 0;
        else {
            d = Math.floor(a * 6), e = a * 6 - d, f = c * (1 - b), g = c * (1 - b * e), h = c * (1 - b * (1 - e));
            switch (d) {
            case 1:
                this.r = g, this.g = c, this.b = f;
                break;
            case 2:
                this.r = f, this.g = c, this.b = h;
                break;
            case 3:
                this.r = f, this.g = g, this.b = c;
                break;
            case 4:
                this.r = h, this.g = f, this.b = c;
                break;
            case 5:
                this.r = c, this.g = f, this.b = g;
                break;
            case 6:
            case 0:
                this.r = c, this.g = h, this.b = f
            }
        }
        return this
    },
    setHex: function(a) {
        return a = Math.floor(a), this.r = (a >> 16 & 255) / 255, this.g = (a >> 8 & 255) / 255, this.b = (a & 255) / 255, this
    },
    lerpSelf: function(a, b) {
        return this.r += (a.r - this.r) * b, this.g += (a.g - this.g) * b, this.b += (a.b - this.b) * b, this
    },
    getHex: function() {
        return Math.floor(this.r * 255) << 16 ^ Math.floor(this.g * 255) << 8 ^ Math.floor(this.b * 255)
    },
    getContextStyle: function() {
        return "rgb(" + Math.floor(this.r * 255) + "," + Math.floor(this.g * 255) + "," + Math.floor(this.b * 255) + ")"
    },
    clone: function() {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
}, THREE.Vector2 = function(a, b) {
    this.x = a || 0, this.y = b || 0
}, THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function(a, b) {
        return this.x = a, this.y = b, this
    },
    copy: function(a) {
        return this.x = a.x, this.y = a.y, this
    },
    add: function(a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this
    },
    addSelf: function(a) {
        return this.x += a.x, this.y += a.y, this
    },
    sub: function(a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this
    },
    subSelf: function(a) {
        return this.x -= a.x, this.y -= a.y, this
    },
    multiplyScalar: function(a) {
        return this.x *= a, this.y *= a, this
    },
    divideScalar: function(a) {
        return a ? (this.x /= a, this.y /= a) : this.set(0, 0), this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x,
            c = this.y - a.y;
        return b * b + c * c
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function(a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y
    },
    isZero: function() {
        return this.lengthSq() < 1e-4
    },
    clone: function() {
        return new THREE.Vector2(this.x, this.y)
    }
}, THREE.Vector3 = function(a, b, c) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0
}, THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function(a, b, c) {
        return this.x = a, this.y = b, this.z = c, this
    },
    setX: function(a) {
        return this.x = a, this
    },
    setY: function(a) {
        return this.y = a, this
    },
    setZ: function(a) {
        return this.z = a, this
    },
    copy: function(a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this
    },
    add: function(a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this
    },
    addSelf: function(a) {
        return this.x += a.x, this.y += a.y, this.z += a.z, this
    },
    addScalar: function(a) {
        return this.x += a, this.y += a, this.z += a, this
    },
    sub: function(a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this
    },
    subSelf: function(a) {
        return this.x -= a.x, this.y -= a.y, this.z -= a.z, this
    },
    multiply: function(a, b) {
        return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this
    },
    multiplySelf: function(a) {
        return this.x *= a.x, this.y *= a.y, this.z *= a.z, this
    },
    multiplyScalar: function(a) {
        return this.x *= a, this.y *= a, this.z *= a, this
    },
    divideSelf: function(a) {
        return this.x /= a.x, this.y /= a.y, this.z /= a.z, this
    },
    divideScalar: function(a) {
        return a ? (this.x /= a, this.y /= a, this.z /= a) : (this.x = 0, this.y = 0, this.z = 0), this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function(a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, this
    },
    cross: function(a, b) {
        return this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x, this
    },
    crossSelf: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z;
        return this.x = c * a.z - d * a.y, this.y = d * a.x - b * a.z, this.z = b * a.y - c * a.x, this
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        return (new THREE.Vector3).sub(this, a).lengthSq()
    },
    getPositionFromMatrix: function(a) {
        return this.x = a.elements[12], this.y = a.elements[13], this.z = a.elements[14], this
    },
    getRotationFromMatrix: function(a, b) {
        var c = b ? b.x : 1,
            d = b ? b.y : 1,
            e = b ? b.z : 1,
            f = a.elements[0] / c,
            g = a.elements[4] / d,
            h = a.elements[8] / e,
            i = a.elements[1] / c,
            j = a.elements[5] / d,
            k = a.elements[9] / e,
            l = a.elements[10] / e;
        this.y = Math.asin(h);
        var m = Math.cos(this.y);
        return Math.abs(m) > 1e-5 ? (this.x = Math.atan2(-k / m, l / m), this.z = Math.atan2(-g / m, f / m)) : (this.x = 0, this.z = Math.atan2(i, j)), this
    },
    getScaleFromMatrix: function(a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
            d = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = b, this.y = c, this.z = d
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    isZero: function() {
        return this.lengthSq() < 1e-4
    },
    clone: function() {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
}, THREE.Vector4 = function(a, b, c, d) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = d !== undefined ? d : 1
}, THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function(a, b, c, d) {
        return this.x = a, this.y = b, this.z = c, this.w = d, this
    },
    copy: function(a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w !== undefined ? a.w : 1, this
    },
    add: function(a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w, this
    },
    addSelf: function(a) {
        return this.x += a.x, this.y += a.y, this.z += a.z, this.w += a.w, this
    },
    sub: function(a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w, this
    },
    subSelf: function(a) {
        return this.x -= a.x, this.y -= a.y, this.z -= a.z, this.w -= a.w, this
    },
    multiplyScalar: function(a) {
        return this.x *= a, this.y *= a, this.z *= a, this.w *= a, this
    },
    divideScalar: function(a) {
        return a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.x = 0, this.y = 0, this.z = 0, this.w = 1), this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function() {
        return this.dot(this)
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function(a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, this.w += (a.w - this.w) * b, this
    },
    clone: function() {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
}, THREE.Frustum = function() {
    this.planes = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4]
}, THREE.Frustum.prototype.setFromMatrix = function(a) {
    var b, c, d = this.planes,
        e = a.elements,
        f = e[0],
        g = e[1],
        h = e[2],
        i = e[3],
        j = e[4],
        k = e[5],
        l = e[6],
        m = e[7],
        n = e[8],
        o = e[9],
        p = e[10],
        q = e[11],
        r = e[12],
        s = e[13],
        t = e[14],
        u = e[15];
    d[0].set(i - f, m - j, q - n, u - r), d[1].set(i + f, m + j, q + n, u + r), d[2].set(i + g, m + k, q + o, u + s), d[3].set(i - g, m - k, q - o, u - s), d[4].set(i - h, m - l, q - p, u - t), d[5].set(i + h, m + l, q + p, u + t);
    for (b = 0; b < 6; b++) c = d[b], c.divideScalar(Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z))
}, THREE.Frustum.prototype.contains = function(a) {
    var b, c = this.planes,
        d = a.matrixWorld,
        e = d.elements,
        f = -a.geometry.boundingSphere.radius * d.getMaxScaleOnAxis();
    for (var g = 0; g < 6; g++) {
        b = c[g].x * e[12] + c[g].y * e[13] + c[g].z * e[14] + c[g].w;
        if (b <= f) return !1
    }
    return !0
}, THREE.Frustum.__v1 = new THREE.Vector3, THREE.Ray = function(a, b) {
    function s(a, b, c) {
        return m.sub(c, a), p = m.dot(b), q = n.add(a, o.copy(b).multiplyScalar(p)), r = c.distanceTo(q), r
    }
    function B(a, b, c, d) {
        return m.sub(d, b), n.sub(c, b), o.sub(a, b), t = m.dot(m), u = m.dot(n), v = m.dot(o), w = n.dot(n), x = n.dot(o), y = 1 / (t * w - u * u), z = (w * v - u * x) * y, A = (t * x - u * v) * y, z >= 0 && A >= 0 && z + A < 1
    }
    this.origin = a || new THREE.Vector3, this.direction = b || new THREE.Vector3;
    var c = 1e-4;
    this.setPrecision = function(a) {
        c = a
    };
    var d = new THREE.Vector3,
        e = new THREE.Vector3,
        f = new THREE.Vector3,
        g = new THREE.Vector3,
        h = new THREE.Vector3,
        i = new THREE.Vector3,
        j = new THREE.Vector3,
        k = new THREE.Vector3,
        l = new THREE.Vector3;
    this.intersectObject = function(a) {
        var b, m = [];
        if (a instanceof THREE.Particle) {
            var n = s(this.origin, this.direction, a.matrixWorld.getPosition());
            if (n > a.scale.x) return [];
            b = {
                distance: n,
                point: a.position,
                face: null,
                object: a
            }, m.push(b)
        }
        else if (a instanceof THREE.Mesh) {
            var n = s(this.origin, this.direction, a.matrixWorld.getPosition()),
                o = THREE.Frustum.__v1.set(a.matrixWorld.getColumnX().length(), a.matrixWorld.getColumnY().length(), a.matrixWorld.getColumnZ().length());
            if (n > a.geometry.boundingSphere.radius * Math.max(o.x, Math.max(o.y, o.z))) return m;
            var p, q, r, t, u, v = a.geometry,
                w = v.vertices,
                x;
            a.matrixRotationWorld.extractRotation(a.matrixWorld);
            for (p = 0, q = v.faces.length; p < q; p++) {
                r = v.faces[p], h.copy(this.origin), i.copy(this.direction), x = a.matrixWorld, j = x.multiplyVector3(j.copy(r.centroid)).subSelf(h), k = a.matrixRotationWorld.multiplyVector3(k.copy(r.normal)), t = i.dot(k);
                if (Math.abs(t) < c) continue;
                u = k.dot(j) / t;
                if (u < 0) continue;
                if (a.doubleSided || (a.flipSided ? t > 0 : t < 0)) {
                    l.add(h, i.multiplyScalar(u));
                    if (r instanceof THREE.Face3) d = x.multiplyVector3(d.copy(w[r.a])), e = x.multiplyVector3(e.copy(w[r.b])), f = x.multiplyVector3(f.copy(w[r.c])), B(l, d, e, f) && (b = {
                        distance: h.distanceTo(l),
                        point: l.clone(),
                        face: r,
                        object: a
                    }, m.push(b));
                    else if (r instanceof THREE.Face4) {
                        d = x.multiplyVector3(d.copy(w[r.a])), e = x.multiplyVector3(e.copy(w[r.b])), f = x.multiplyVector3(f.copy(w[r.c])), g = x.multiplyVector3(g.copy(w[r.d]));
                        if (B(l, d, e, g) || B(l, e, f, g)) b = {
                            distance: h.distanceTo(l),
                            point: l.clone(),
                            face: r,
                            object: a
                        }, m.push(b)
                    }
                }
            }
        }
        return m
    }, this.intersectObjects = function(a) {
        var b = [];
        for (var c = 0, d = a.length; c < d; c++) Array.prototype.push.apply(b, this.intersectObject(a[c]));
        return b.sort(function(a, b) {
            return a.distance - b.distance
        }), b
    };
    var m = new THREE.Vector3,
        n = new THREE.Vector3,
        o = new THREE.Vector3,
        p, q, r, t, u, v, w, x, y, z, A
}, THREE.Rectangle = function() {
    function h() {
        e = c - a, f = d - b
    }
    var a, b, c, d, e, f, g = !0;
    this.getX = function() {
        return a
    }, this.getY = function() {
        return b
    }, this.getWidth = function() {
        return e
    }, this.getHeight = function() {
        return f
    }, this.getLeft = function() {
        return a
    }, this.getTop = function() {
        return b
    }, this.getRight = function() {
        return c
    }, this.getBottom = function() {
        return d
    }, this.set = function(e, f, i, j) {
        g = !1, a = e, b = f, c = i, d = j, h()
    }, this.addPoint = function(e, f) {
        g ? (g = !1, a = e, b = f, c = e, d = f, h()) : (a = a < e ? a : e, b = b < f ? b : f, c = c > e ? c : e, d = d > f ? d : f, h())
    }, this.add3Points = function(e, f, i, j, k, l) {
        g ? (g = !1, a = e < i ? e < k ? e : k : i < k ? i : k, b = f < j ? f < l ? f : l : j < l ? j : l, c = e > i ? e > k ? e : k : i > k ? i : k, d = f > j ? f > l ? f : l : j > l ? j : l, h()) : (a = e < i ? e < k ? e < a ? e : a : k < a ? k : a : i < k ? i < a ? i : a : k < a ? k : a, b = f < j ? f < l ? f < b ? f : b : l < b ? l : b : j < l ? j < b ? j : b : l < b ? l : b, c = e > i ? e > k ? e > c ? e : c : k > c ? k : c : i > k ? i > c ? i : c : k > c ? k : c, d = f > j ? f > l ? f > d ? f : d : l > d ? l : d : j > l ? j > d ? j : d : l > d ? l : d, h())
    }, this.addRectangle = function(e) {
        g ? (g = !1, a = e.getLeft(), b = e.getTop(), c = e.getRight(), d = e.getBottom(), h()) : (a = a < e.getLeft() ? a : e.getLeft(), b = b < e.getTop() ? b : e.getTop(), c = c > e.getRight() ? c : e.getRight(), d = d > e.getBottom() ? d : e.getBottom(), h())
    }, this.inflate = function(e) {
        a -= e, b -= e, c += e, d += e, h()
    }, this.minSelf = function(e) {
        a = a > e.getLeft() ? a : e.getLeft(), b = b > e.getTop() ? b : e.getTop(), c = c < e.getRight() ? c : e.getRight(), d = d < e.getBottom() ? d : e.getBottom(), h()
    }, this.intersects = function(e) {
        return c < e.getLeft() ? !1 : a > e.getRight() ? !1 : d < e.getTop() ? !1 : b > e.getBottom() ? !1 : !0
    }, this.empty = function() {
        g = !0, a = 0, b = 0, c = 0, d = 0, h()
    }, this.isEmpty = function() {
        return g
    }
}, THREE.Math = {
    clamp: function(a, b, c) {
        return a < b ? b : a > c ? c : a
    },
    clampBottom: function(a, b) {
        return a < b ? b : a
    },
    mapLinear: function(a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function(a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function(a, b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function(a) {
        return a * (.5 - Math.random())
    },
    sign: function(a) {
        return a < 0 ? -1 : a > 0 ? 1 : 0
    }
}, THREE.Matrix3 = function() {
    this.elements = new Float32Array(9)
}, THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    getInverse: function(a) {
        var b = a.elements,
            c = b[10] * b[5] - b[6] * b[9],
            d = -b[10] * b[1] + b[2] * b[9],
            e = b[6] * b[1] - b[2] * b[5],
            f = -b[10] * b[4] + b[6] * b[8],
            g = b[10] * b[0] - b[2] * b[8],
            h = -b[6] * b[0] + b[2] * b[4],
            i = b[9] * b[4] - b[5] * b[8],
            j = -b[9] * b[0] + b[1] * b[8],
            k = b[5] * b[0] - b[1] * b[4],
            l = b[0] * c + b[1] * f + b[2] * i;
        l === 0 && console.warn("Matrix3.getInverse(): determinant == 0");
        var m = 1 / l,
            n = this.elements;
        return n[0] = m * c, n[1] = m * d, n[2] = m * e, n[3] = m * f, n[4] = m * g, n[5] = m * h, n[6] = m * i, n[7] = m * j, n[8] = m * k, this
    },
    transpose: function() {
        var a, b = this.elements;
        return a = b[1], b[1] = b[3], b[3] = a, a = b[2], b[2] = b[6], b[6] = a, a = b[5], b[5] = b[7], b[7] = a, this
    },
    transposeIntoArray: function(a) {
        var b = this.m;
        return a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8], this
    }
}, THREE.Matrix4 = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    this.elements = new Float32Array(16), this.set(a !== undefined ? a : 1, b || 0, c || 0, d || 0, e || 0, f !== undefined ? f : 1, g || 0, h || 0, i || 0, j || 0, k !== undefined ? k : 1, l || 0, m || 0, n || 0, o || 0, p !== undefined ? p : 1)
}, THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        var q = this.elements;
        return q[0] = a, q[4] = b, q[8] = c, q[12] = d, q[1] = e, q[5] = f, q[9] = g, q[13] = h, q[2] = i, q[6] = j, q[10] = k, q[14] = l, q[3] = m, q[7] = n, q[11] = o, q[15] = p, this
    },
    identity: function() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    copy: function(a) {
        var b = a.elements;
        return this.set(b[0], b[4], b[8], b[12], b[1], b[5], b[9], b[13], b[2], b[6], b[10], b[14], b[3], b[7], b[11], b[15]), this
    },
    lookAt: function(a, b, c) {
        var d = this.elements,
            e = THREE.Matrix4.__v1,
            f = THREE.Matrix4.__v2,
            g = THREE.Matrix4.__v3;
        return g.sub(a, b).normalize(), g.length() === 0 && (g.z = 1), e.cross(c, g).normalize(), e.length() === 0 && (g.x += 1e-4, e.cross(c, g).normalize()), f.cross(g, e), d[0] = e.x, d[4] = f.x, d[8] = g.x, d[1] = e.y, d[5] = f.y, d[9] = g.y, d[2] = e.z, d[6] = f.z, d[10] = g.z, this
    },
    multiply: function(a, b) {
        var c = a.elements,
            d = b.elements,
            e = this.elements,
            f = c[0],
            g = c[4],
            h = c[8],
            i = c[12],
            j = c[1],
            k = c[5],
            l = c[9],
            m = c[13],
            n = c[2],
            o = c[6],
            p = c[10],
            q = c[14],
            r = c[3],
            s = c[7],
            t = c[11],
            u = c[15],
            v = d[0],
            w = d[4],
            x = d[8],
            y = d[12],
            z = d[1],
            A = d[5],
            B = d[9],
            C = d[13],
            D = d[2],
            E = d[6],
            F = d[10],
            G = d[14],
            H = d[3],
            I = d[7],
            J = d[11],
            K = d[15];
        return e[0] = f * v + g * z + h * D + i * H, e[4] = f * w + g * A + h * E + i * I, e[8] = f * x + g * B + h * F + i * J, e[12] = f * y + g * C + h * G + i * K, e[1] = j * v + k * z + l * D + m * H, e[5] = j * w + k * A + l * E + m * I, e[9] = j * x + k * B + l * F + m * J, e[13] = j * y + k * C + l * G + m * K, e[2] = n * v + o * z + p * D + q * H, e[6] = n * w + o * A + p * E + q * I, e[10] = n * x + o * B + p * F + q * J, e[14] = n * y + o * C + p * G + q * K, e[3] = r * v + s * z + t * D + u * H, e[7] = r * w + s * A + t * E + u * I, e[11] = r * x + s * B + t * F + u * J, e[15] = r * y + s * C + t * G + u * K, this
    },
    multiplySelf: function(a) {
        return this.multiply(this, a)
    },
    multiplyToArray: function(a, b, c) {
        var d = this.elements;
        return this.multiply(a, b), c[0] = d[0], c[1] = d[1], c[2] = d[2], c[3] = d[3], c[4] = d[4], c[5] = d[5], c[6] = d[6], c[7] = d[7], c[8] = d[8], c[9] = d[9], c[10] = d[10], c[11] = d[11], c[12] = d[12], c[13] = d[13], c[14] = d[14], c[15] = d[15], this
    },
    multiplyScalar: function(a) {
        var b = this.elements;
        return b[0] *= a, b[4] *= a, b[8] *= a, b[12] *= a, b[1] *= a, b[5] *= a, b[9] *= a, b[13] *= a, b[2] *= a, b[6] *= a, b[10] *= a, b[14] *= a, b[3] *= a, b[7] *= a, b[11] *= a, b[15] *= a, this
    },
    multiplyVector3: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = 1 / (b[3] * c + b[7] * d + b[11] * e + b[15]);
        return a.x = (b[0] * c + b[4] * d + b[8] * e + b[12]) * f, a.y = (b[1] * c + b[5] * d + b[9] * e + b[13]) * f, a.z = (b[2] * c + b[6] * d + b[10] * e + b[14]) * f, a
    },
    multiplyVector4: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w;
        return a.x = b[0] * c + b[4] * d + b[8] * e + b[12] * f, a.y = b[1] * c + b[5] * d + b[9] * e + b[13] * f, a.z = b[2] * c + b[6] * d + b[10] * e + b[14] * f, a.w = b[3] * c + b[7] * d + b[11] * e + b[15] * f, a
    },
    rotateAxis: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z;
        return a.x = c * b[0] + d * b[4] + e * b[8], a.y = c * b[1] + d * b[5] + e * b[9], a.z = c * b[2] + d * b[6] + e * b[10], a.normalize(), a
    },
    crossVector: function(a) {
        var b = this.elements,
            c = new THREE.Vector4;
        return c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w, c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w, c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w, c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1, c
    },
    determinant: function() {
        var a = this.elements,
            b = a[0],
            c = a[4],
            d = a[8],
            e = a[12],
            f = a[1],
            g = a[5],
            h = a[9],
            i = a[13],
            j = a[2],
            k = a[6],
            l = a[10],
            m = a[14],
            n = a[3],
            o = a[7],
            p = a[11],
            q = a[15];
        return e * h * k * n - d * i * k * n - e * g * l * n + c * i * l * n + d * g * m * n - c * h * m * n - e * h * j * o + d * i * j * o + e * f * l * o - b * i * l * o - d * f * m * o + b * h * m * o + e * g * j * p - c * i * j * p - e * f * k * p + b * i * k * p + c * f * m * p - b * g * m * p - d * g * j * q + c * h * j * q + d * f * k * q - b * h * k * q - c * f * l * q + b * g * l * q
    },
    transpose: function() {
        var a = this.elements,
            b;
        return b = a[1], a[1] = a[4], a[4] = b, b = a[2], a[2] = a[8], a[8] = b, b = a[6], a[6] = a[9], a[9] = b, b = a[3], a[3] = a[12], a[12] = b, b = a[7], a[7] = a[13], a[13] = b, b = a[11], a[11] = a[14], a[14] = b, this
    },
    flattenToArray: function(a) {
        var b = this.elements;
        return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
    },
    flattenToArrayOffset: function(a, b) {
        var c = this.elements;
        return a[b] = c[0], a[b + 1] = c[1], a[b + 2] = c[2], a[b + 3] = c[3], a[b + 4] = c[4], a[b + 5] = c[5], a[b + 6] = c[6], a[b + 7] = c[7], a[b + 8] = c[8], a[b + 9] = c[9], a[b + 10] = c[10], a[b + 11] = c[11], a[b + 12] = c[12], a[b + 13] = c[13], a[b + 14] = c[14], a[b + 15] = c[15], a
    },
    getPosition: function() {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[12], a[13], a[14])
    },
    setPosition: function(a) {
        var b = this.elements;
        return b[12] = a.x, b[13] = a.y, b[14] = a.z, this
    },
    getColumnX: function() {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[0], a[1], a[2])
    },
    getColumnY: function() {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[4], a[5], a[6])
    },
    getColumnZ: function() {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[8], a[9], a[10])
    },
    getInverse: function(a) {
        var b = this.elements,
            c = a.elements,
            d = c[0],
            e = c[4],
            f = c[8],
            g = c[12],
            h = c[1],
            i = c[5],
            j = c[9],
            k = c[13],
            l = c[2],
            m = c[6],
            n = c[10],
            o = c[14],
            p = c[3],
            q = c[7],
            r = c[11],
            s = c[15];
        return b[0] = j * o * q - k * n * q + k * m * r - i * o * r - j * m * s + i * n * s, b[4] = g * n * q - f * o * q - g * m * r + e * o * r + f * m * s - e * n * s, b[8] = f * k * q - g * j * q + g * i * r - e * k * r - f * i * s + e * j * s, b[12] = g * j * m - f * k * m - g * i * n + e * k * n + f * i * o - e * j * o, b[1] = k * n * p - j * o * p - k * l * r + h * o * r + j * l * s - h * n * s, b[5] = f * o * p - g * n * p + g * l * r - d * o * r - f * l * s + d * n * s, b[9] = g * j * p - f * k * p - g * h * r + d * k * r + f * h * s - d * j * s, b[13] = f * k * l - g * j * l + g * h * n - d * k * n - f * h * o + d * j * o, b[2] = i * o * p - k * m * p + k * l * q - h * o * q - i * l * s + h * m * s, b[6] = g * m * p - e * o * p - g * l * q + d * o * q + e * l * s - d * m * s, b[10] = e * k * p - g * i * p + g * h * q - d * k * q - e * h * s + d * i * s, b[14] = g * i * l - e * k * l - g * h * m + d * k * m + e * h * o - d * i * o, b[3] = j * m * p - i * n * p - j * l * q + h * n * q + i * l * r - h * m * r, b[7] = e * n * p - f * m * p + f * l * q - d * n * q - e * l * r + d * m * r, b[11] = f * i * p - e * j * p - f * h * q + d * j * q + e * h * r - d * i * r, b[15] = e * j * l - f * i * l + f * h * m - d * j * m - e * h * n + d * i * n, this.multiplyScalar(1 / a.determinant()), this
    },
    setRotationFromEuler: function(a, b) {
        var c = this.elements,
            d = a.x,
            e = a.y,
            f = a.z,
            g = Math.cos(d),
            h = Math.sin(d),
            i = Math.cos(e),
            j = Math.sin(e),
            k = Math.cos(f),
            l = Math.sin(f);
        switch (b) {
        case "YXZ":
            var m = i * k,
                n = i * l,
                o = j * k,
                p = j * l;
            c[0] = m + p * h, c[4] = o * h - n, c[8] = g * j, c[1] = g * l, c[5] = g * k, c[9] = -h, c[2] = n * h - o, c[6] = p + m * h, c[10] = g * i;
            break;
        case "ZXY":
            var m = i * k,
                n = i * l,
                o = j * k,
                p = j * l;
            c[0] = m - p * h, c[4] = -g * l, c[8] = o + n * h, c[1] = n + o * h, c[5] = g * k, c[9] = p - m * h, c[2] = -g * j, c[6] = h, c[10] = g * i;
            break;
        case "ZYX":
            var q = g * k,
                r = g * l,
                s = h * k,
                t = h * l;
            c[0] = i * k, c[4] = s * j - r, c[8] = q * j + t, c[1] = i * l, c[5] = t * j + q, c[9] = r * j - s, c[2] = -j, c[6] = h * i, c[10] = g * i;
            break;
        case "YZX":
            var u = g * i,
                v = g * j,
                w = h * i,
                x = h * j;
            c[0] = i * k, c[4] = x - u * l, c[8] = w * l + v, c[1] = l, c[5] = g * k, c[9] = -h * k, c[2] = -j * k, c[6] = v * l + w, c[10] = u - x * l;
            break;
        case "XZY":
            var u = g * i,
                v = g * j,
                w = h * i,
                x = h * j;
            c[0] = i * k, c[4] = -l, c[8] = j * k, c[1] = u * l + x, c[5] = g * k, c[9] = v * l - w, c[2] = w * l - v, c[6] = h * k, c[10] = x * l + u;
            break;
        default:
            var q = g * k,
                r = g * l,
                s = h * k,
                t = h * l;
            c[0] = i * k, c[4] = -i * l, c[8] = j, c[1] = r + s * j, c[5] = q - t * j, c[9] = -h * i, c[2] = t - q * j, c[6] = s + r * j, c[10] = g * i
        }
        return this
    },
    setRotationFromQuaternion: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            g = c + c,
            h = d + d,
            i = e + e,
            j = c * g,
            k = c * h,
            l = c * i,
            m = d * h,
            n = d * i,
            o = e * i,
            p = f * g,
            q = f * h,
            r = f * i;
        return b[0] = 1 - (m + o), b[4] = k - r, b[8] = l + q, b[1] = k + r, b[5] = 1 - (j + o), b[9] = n - p, b[2] = l - q, b[6] = n + p, b[10] = 1 - (j + m), this
    },
    compose: function(a, b, c) {
        var d = this.elements,
            e = THREE.Matrix4.__m1,
            f = THREE.Matrix4.__m2;
        return e.identity(), e.setRotationFromQuaternion(b), f.makeScale(c.x, c.y, c.z), this.multiply(e, f), d[12] = a.x, d[13] = a.y, d[14] = a.z, this
    },
    decompose: function(a, b, c) {
        var d = this.elements,
            e = THREE.Matrix4.__v1,
            f = THREE.Matrix4.__v2,
            g = THREE.Matrix4.__v3;
        e.set(d[0], d[1], d[2]), f.set(d[4], d[5], d[6]), g.set(d[8], d[9], d[10]), a = a instanceof THREE.Vector3 ? a : new THREE.Vector3, b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion, c = c instanceof THREE.Vector3 ? c : new THREE.Vector3, c.x = e.length(), c.y = f.length(), c.z = g.length(), a.x = d[12], a.y = d[13], a.z = d[14];
        var h = THREE.Matrix4.__m1;
        return h.copy(this), h.elements[0] /= c.x, h.elements[1] /= c.x, h.elements[2] /= c.x, h.elements[4] /= c.y, h.elements[5] /= c.y, h.elements[6] /= c.y, h.elements[8] /= c.z, h.elements[9] /= c.z, h.elements[10] /= c.z, b.setFromRotationMatrix(h), [a, b, c]
    },
    extractPosition: function(a) {
        var b = this.elements,
            c = a.elements;
        return b[12] = c[12], b[13] = c[13], b[14] = c[14], this
    },
    extractRotation: function(a) {
        var b = this.elements,
            c = a.elements,
            d = THREE.Matrix4.__v1,
            e = 1 / d.set(c[0], c[1], c[2]).length(),
            f = 1 / d.set(c[4], c[5], c[6]).length(),
            g = 1 / d.set(c[8], c[9], c[10]).length();
        return b[0] = c[0] * e, b[1] = c[1] * e, b[2] = c[2] * e, b[4] = c[4] * f, b[5] = c[5] * f, b[6] = c[6] * f, b[8] = c[8] * g, b[9] = c[9] * g, b[10] = c[10] * g, this
    },
    translate: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z;
        return b[12] = b[0] * c + b[4] * d + b[8] * e + b[12], b[13] = b[1] * c + b[5] * d + b[9] * e + b[13], b[14] = b[2] * c + b[6] * d + b[10] * e + b[14], b[15] = b[3] * c + b[7] * d + b[11] * e + b[15], this
    },
    rotateX: function(a) {
        var b = this.elements,
            c = b[4],
            d = b[5],
            e = b[6],
            f = b[7],
            g = b[8],
            h = b[9],
            i = b[10],
            j = b[11],
            k = Math.cos(a),
            l = Math.sin(a);
        return b[4] = k * c + l * g, b[5] = k * d + l * h, b[6] = k * e + l * i, b[7] = k * f + l * j, b[8] = k * g - l * c, b[9] = k * h - l * d, b[10] = k * i - l * e, b[11] = k * j - l * f, this
    },
    rotateY: function(a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            e = b[2],
            f = b[3],
            g = b[8],
            h = b[9],
            i = b[10],
            j = b[11],
            k = Math.cos(a),
            l = Math.sin(a);
        return b[0] = k * c - l * g, b[1] = k * d - l * h, b[2] = k * e - l * i, b[3] = k * f - l * j, b[8] = k * g + l * c, b[9] = k * h + l * d, b[10] = k * i + l * e, b[11] = k * j + l * f, this
    },
    rotateZ: function(a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            e = b[2],
            f = b[3],
            g = b[4],
            h = b[5],
            i = b[6],
            j = b[7],
            k = Math.cos(a),
            l = Math.sin(a);
        return b[0] = k * c + l * g, b[1] = k * d + l * h, b[2] = k * e + l * i, b[3] = k * f + l * j, b[4] = k * g - l * c, b[5] = k * h - l * d, b[6] = k * i - l * e, b[7] = k * j - l * f, this
    },
    rotateByAxis: function(a, b) {
        var c = this.elements;
        if (a.x === 1 && a.y === 0 && a.z === 0) return this.rotateX(b);
        if (a.x === 0 && a.y === 1 && a.z === 0) return this.rotateY(b);
        if (a.x === 0 && a.y === 0 && a.z === 1) return this.rotateZ(b);
        var d = a.x,
            e = a.y,
            f = a.z,
            g = Math.sqrt(d * d + e * e + f * f);
        d /= g, e /= g, f /= g;
        var h = d * d,
            i = e * e,
            j = f * f,
            k = Math.cos(b),
            l = Math.sin(b),
            m = 1 - k,
            n = d * e * m,
            o = d * f * m,
            p = e * f * m,
            q = d * l,
            r = e * l,
            s = f * l,
            t = h + (1 - h) * k,
            u = n + s,
            v = o - r,
            w = n - s,
            x = i + (1 - i) * k,
            y = p + q,
            z = o + r,
            A = p - q,
            B = j + (1 - j) * k,
            C = c[0],
            D = c[1],
            E = c[2],
            F = c[3],
            G = c[4],
            H = c[5],
            I = c[6],
            J = c[7],
            K = c[8],
            L = c[9],
            M = c[10],
            N = c[11],
            O = c[12],
            P = c[13],
            Q = c[14],
            R = c[15];
        return c[0] = t * C + u * G + v * K, c[1] = t * D + u * H + v * L, c[2] = t * E + u * I + v * M, c[3] = t * F + u * J + v * N, c[4] = w * C + x * G + y * K, c[5] = w * D + x * H + y * L, c[6] = w * E + x * I + y * M, c[7] = w * F + x * J + y * N, c[8] = z * C + A * G + B * K, c[9] = z * D + A * H + B * L, c[10] = z * E + A * I + B * M, c[11] = z * F + A * J + B * N, this
    },
    scale: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z;
        return b[0] *= c, b[4] *= d, b[8] *= e, b[1] *= c, b[5] *= d, b[9] *= e, b[2] *= c, b[6] *= d, b[10] *= e, b[3] *= c, b[7] *= d, b[11] *= e, this
    },
    getMaxScaleOnAxis: function() {
        var a = this.elements,
            b = a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
            c = a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
            d = a[8] * a[8] + a[9] * a[9] + a[10] * a[10];
        return Math.sqrt(Math.max(b, Math.max(c, d)))
    },
    makeTranslation: function(a, b, c) {
        return this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1), this
    },
    makeRotationX: function(a) {
        var b = Math.cos(a),
            c = Math.sin(a);
        return this.set(1, 0, 0, 0, 0, b, -c, 0, 0, c, b, 0, 0, 0, 0, 1), this
    },
    makeRotationY: function(a) {
        var b = Math.cos(a),
            c = Math.sin(a);
        return this.set(b, 0, c, 0, 0, 1, 0, 0, -c, 0, b, 0, 0, 0, 0, 1), this
    },
    makeRotationZ: function(a) {
        var b = Math.cos(a),
            c = Math.sin(a);
        return this.set(b, -c, 0, 0, c, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    makeRotationAxis: function(a, b) {
        var c = Math.cos(b),
            d = Math.sin(b),
            e = 1 - c,
            f = a.x,
            g = a.y,
            h = a.z,
            i = e * f,
            j = e * g;
        return this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, j * g + c, j * h - d * f, 0, i * h - d * g, j * h + d * f, e * h * h + c, 0, 0, 0, 0, 1), this
    },
    makeScale: function(a, b, c) {
        return this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1), this
    },
    makeFrustum: function(a, b, c, d, e, f) {
        var g = this.elements,
            h = 2 * e / (b - a),
            i = 2 * e / (d - c),
            j = (b + a) / (b - a),
            k = (d + c) / (d - c),
            l = -(f + e) / (f - e),
            m = -2 * f * e / (f - e);
        return g[0] = h, g[4] = 0, g[8] = j, g[12] = 0, g[1] = 0, g[5] = i, g[9] = k, g[13] = 0, g[2] = 0, g[6] = 0, g[10] = l, g[14] = m, g[3] = 0, g[7] = 0, g[11] = -1, g[15] = 0, this
    },
    makePerspective: function(a, b, c, d) {
        var e = c * Math.tan(a * Math.PI / 360),
            f = -e,
            g = f * b,
            h = e * b;
        return this.makeFrustum(g, h, f, e, c, d)
    },
    makeOrthographic: function(a, b, c, d, e, f) {
        var g = this.elements,
            h = b - a,
            i = c - d,
            j = f - e,
            k = (b + a) / h,
            l = (c + d) / i,
            m = (f + e) / j;
        return g[0] = 2 / h, g[4] = 0, g[8] = 0, g[12] = -k, g[1] = 0, g[5] = 2 / i, g[9] = 0, g[13] = -l, g[2] = 0, g[6] = 0, g[10] = -2 / j, g[14] = -m, g[3] = 0, g[7] = 0, g[11] = 0, g[15] = 1, this
    },
    clone: function() {
        var a = this.elements;
        return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
    }
}, THREE.Matrix4.__v1 = new THREE.Vector3, THREE.Matrix4.__v2 = new THREE.Vector3, THREE.Matrix4.__v3 = new THREE.Vector3, THREE.Matrix4.__m1 = new THREE.Matrix4, THREE.Matrix4.__m2 = new THREE.Matrix4, THREE.Object3D = function() {
    this.id = THREE.Object3DCount++, this.name = "", this.parent = undefined, this.children = [], this.up = new THREE.Vector3(0, 1, 0), this.position = new THREE.Vector3, this.rotation = new THREE.Vector3, this.eulerOrder = "XYZ", this.scale = new THREE.Vector3(1, 1, 1), this.doubleSided = !1, this.flipSided = !1, this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixRotationWorld = new THREE.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !0, this.quaternion = new THREE.Quaternion, this.useQuaternion = !1, this.boundRadius = 0, this.boundRadiusScale = 1, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this._vector = new THREE.Vector3
}, THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function(a) {
        this.matrix.multiply(a, this.matrix), this.scale.getScaleFromMatrix(this.matrix), this.rotation.getRotationFromMatrix(this.matrix, this.scale), this.position.getPositionFromMatrix(this.matrix)
    },
    translate: function(a, b) {
        this.matrix.rotateAxis(b), this.position.addSelf(b.multiplyScalar(a))
    },
    translateX: function(a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function(a) {
        this.translate(a, this._vector.set(0, 1, 0))
    },
    translateZ: function(a) {
        this.translate(a, this._vector.set(0, 0, 1))
    },
    lookAt: function(a) {
        this.matrix.lookAt(a, this.position, this.up), this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
    },
    add: function(a) {
        if (a === this) {
            console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
            return
        }
        if (a instanceof THREE.Object3D) {
            a.parent !== undefined && a.parent.remove(a), a.parent = this, this.children.push(a);
            var b = this;
            while (b.parent !== undefined) b = b.parent;
            b !== undefined && b instanceof THREE.Scene && b.__addObject(a)
        }
    },
    remove: function(a) {
        var b = this.children.indexOf(a);
        if (b !== -1) {
            a.parent = undefined, this.children.splice(b, 1);
            var c = this;
            while (c.parent !== undefined) c = c.parent;
            c !== undefined && c instanceof THREE.Scene && c.__removeObject(a)
        }
    },
    getChildByName: function(a, b) {
        var c, d, e;
        for (c = 0, d = this.children.length; c < d; c++) {
            e = this.children[c];
            if (e.name === a) return e;
            if (b) {
                e = e.getChildByName(a, b);
                if (e !== undefined) return e
            }
        }
        return undefined
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position), this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z));
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(a) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
    }
}, THREE.Object3DCount = 0, THREE.Projector = function() {
    function A() {
        var a = c[b] = c[b] || new THREE.RenderableObject;
        return b++, a
    }
    function B() {
        var a = f[e] = f[e] || new THREE.RenderableVertex;
        return e++, a
    }
    function C() {
        var a = i[h] = i[h] || new THREE.RenderableFace3;
        return h++, a
    }
    function D() {
        var a = k[j] = k[j] || new THREE.RenderableFace4;
        return j++, a
    }
    function E() {
        var a = n[m] = n[m] || new THREE.RenderableLine;
        return m++, a
    }
    function F() {
        var a = q[p] = q[p] || new THREE.RenderableParticle;
        return p++, a
    }
    function G(a, b) {
        return b.z - a.z
    }
    function H(a, b) {
        var c = 0,
            d = 1,
            e = a.z + a.w,
            f = b.z + b.w,
            g = -a.z + a.w,
            h = -b.z + b.w;
        return e >= 0 && f >= 0 && g >= 0 && h >= 0 ? !0 : e < 0 && f < 0 || g < 0 && h < 0 ? !1 : (e < 0 ? c = Math.max(c, e / (e - f)) : f < 0 && (d = Math.min(d, e / (e - f))), g < 0 ? c = Math.max(c, g / (g - h)) : h < 0 && (d = Math.min(d, g / (g - h))), d < c ? !1 : (a.lerpSelf(b, c), b.lerpSelf(a, 1 - d), !0))
    }
    var a, b, c = [],
        d, e, f = [],
        g, h, i = [],
        j, k = [],
        l, m, n = [],
        o, p, q = [],
        r = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        },
        s = new THREE.Vector3,
        t = new THREE.Vector4,
        u = new THREE.Matrix4,
        v = new THREE.Matrix4,
        w = new THREE.Frustum,
        x = new THREE.Vector4,
        y = new THREE.Vector4;
    this.projectVector = function(a, b) {
        return b.matrixWorldInverse.getInverse(b.matrixWorld), u.multiply(b.projectionMatrix, b.matrixWorldInverse), u.multiplyVector3(a), a
    }, this.unprojectVector = function(a, b) {
        return b.projectionMatrixInverse.getInverse(b.projectionMatrix), u.multiply(b.matrixWorld, b.projectionMatrixInverse), u.multiplyVector3(a), a
    }, this.pickingRay = function(a, b) {
        var c;
        return a.z = -1, c = new THREE.Vector3(a.x, a.y, 1), this.unprojectVector(a, b), this.unprojectVector(c, b), c.subSelf(a).normalize(), new THREE.Ray(a, c)
    }, this.projectGraph = function(c, d) {
        b = 0, r.objects.length = 0, r.sprites.length = 0, r.lights.length = 0;
        var e = function(b) {
                if (b.visible === !1) return;
                (b instanceof THREE.Mesh || b instanceof THREE.Line) && (b.frustumCulled === !1 || w.contains(b)) ? (s.copy(b.matrixWorld.getPosition()), u.multiplyVector3(s), a = A(), a.object = b, a.z = s.z, r.objects.push(a)) : b instanceof THREE.Sprite || b instanceof THREE.Particle ? (s.copy(b.matrixWorld.getPosition()), u.multiplyVector3(s), a = A(), a.object = b, a.z = s.z, r.sprites.push(a)) : b instanceof THREE.Light && r.lights.push(b);
                for (var c = 0, d = b.children.length; c < d; c++) e(b.children[c])
            };
        return e(c), d && r.objects.sort(G), r
    }, this.projectScene = function(a, b, c) {
        var i = b.near,
            k = b.far,
            n = !1,
            q, s, z, A, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, Y, Z, $, _, ab, bb, cb, db, eb, fb;
        h = 0, j = 0, m = 0, p = 0, r.elements.length = 0, b.parent === undefined && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(b)), a.updateMatrixWorld(), b.matrixWorldInverse.getInverse(b.matrixWorld), u.multiply(b.projectionMatrix, b.matrixWorldInverse), w.setFromMatrix(u), r = this.projectGraph(a, !1);
        for (q = 0, s = r.objects.length; q < s; q++) {
            Q = r.objects[q].object, R = Q.matrixWorld, e = 0;
            if (Q instanceof THREE.Mesh) {
                T = Q.geometry, U = Q.geometry.materials, V = T.vertices, Y = T.faces, ab = T.faceVertexUvs, S = Q.matrixRotationWorld.extractRotation(R);
                for (z = 0, A = V.length; z < A; z++) d = B(), d.positionWorld.copy(V[z]), R.multiplyVector3(d.positionWorld), d.positionScreen.copy(d.positionWorld), u.multiplyVector4(d.positionScreen), d.positionScreen.x /= d.positionScreen.w, d.positionScreen.y /= d.positionScreen.w, d.visible = d.positionScreen.z > i && d.positionScreen.z < k;
                for (I = 0, J = Y.length; I < J; I++) {
                    Z = Y[I];
                    if (Z instanceof THREE.Face3) {
                        cb = f[Z.a], db = f[Z.b], eb = f[Z.c];
                        if (!(cb.visible && db.visible && eb.visible)) continue;
                        n = (eb.positionScreen.x - cb.positionScreen.x) * (db.positionScreen.y - cb.positionScreen.y) - (eb.positionScreen.y - cb.positionScreen.y) * (db.positionScreen.x - cb.positionScreen.x) < 0;
                        if (!Q.doubleSided && n == Q.flipSided) continue;
                        g = C(), g.v1.copy(cb), g.v2.copy(db), g.v3.copy(eb)
                    }
                    else if (Z instanceof THREE.Face4) {
                        cb = f[Z.a], db = f[Z.b], eb = f[Z.c], fb = f[Z.d];
                        if (!(cb.visible && db.visible && eb.visible && fb.visible)) continue;
                        n = (fb.positionScreen.x - cb.positionScreen.x) * (db.positionScreen.y - cb.positionScreen.y) - (fb.positionScreen.y - cb.positionScreen.y) * (db.positionScreen.x - cb.positionScreen.x) < 0 || (db.positionScreen.x - eb.positionScreen.x) * (fb.positionScreen.y - eb.positionScreen.y) - (db.positionScreen.y - eb.positionScreen.y) * (fb.positionScreen.x - eb.positionScreen.x) < 0;
                        if (!Q.doubleSided && n == Q.flipSided) continue;
                        g = D(), g.v1.copy(cb), g.v2.copy(db), g.v3.copy(eb), g.v4.copy(fb)
                    }
                    g.normalWorld.copy(Z.normal), !n && (Q.flipSided || Q.doubleSided) && g.normalWorld.negate(), S.multiplyVector3(g.normalWorld), g.centroidWorld.copy(Z.centroid), R.multiplyVector3(g.centroidWorld), g.centroidScreen.copy(g.centroidWorld), u.multiplyVector3(g.centroidScreen), $ = Z.vertexNormals;
                    for (K = 0, L = $.length; K < L; K++) _ = g.vertexNormalsWorld[K], _.copy($[K]), !n && (Q.flipSided || Q.doubleSided) && _.negate(), S.multiplyVector3(_);
                    for (M = 0, N = ab.length; M < N; M++) {
                        bb = ab[M][I];
                        if (!bb) continue;
                        for (O = 0, P = bb.length; O < P; O++) g.uvs[M][O] = bb[O]
                    }
                    g.material = Q.material, g.faceMaterial = Z.materialIndex !== null ? U[Z.materialIndex] : null, g.z = g.centroidScreen.z, r.elements.push(g)
                }
            }
            else if (Q instanceof THREE.Line) {
                v.multiply(u, R), V = Q.geometry.vertices, cb = B(), cb.positionScreen.copy(V[0]), v.multiplyVector4(cb.positionScreen);
                var gb = Q.type === THREE.LinePieces ? 2 : 1;
                for (z = 1, A = V.length; z < A; z++) {
                    cb = B(), cb.positionScreen.copy(V[z]), v.multiplyVector4(cb.positionScreen);
                    if ((z + 1) % gb > 0) continue;
                    db = f[e - 2], x.copy(cb.positionScreen), y.copy(db.positionScreen), H(x, y) && (x.multiplyScalar(1 / x.w), y.multiplyScalar(1 / y.w), l = E(), l.v1.positionScreen.copy(x), l.v2.positionScreen.copy(y), l.z = Math.max(x.z, y.z), l.material = Q.material, r.elements.push(l))
                }
            }
        }
        for (q = 0, s = r.sprites.length; q < s; q++) Q = r.sprites[q].object, R = Q.matrixWorld, Q instanceof THREE.Particle && (t.set(R.elements[12], R.elements[13], R.elements[14], 1), u.multiplyVector4(t), t.z /= t.w, t.z > 0 && t.z < 1 && (o = F(), o.x = t.x / t.w, o.y = t.y / t.w, o.z = t.z, o.rotation = Q.rotation.z, o.scale.x = Q.scale.x * Math.abs(o.x - (t.x + b.projectionMatrix.elements[0]) / (t.w + b.projectionMatrix.elements[12])), o.scale.y = Q.scale.y * Math.abs(o.y - (t.y + b.projectionMatrix.elements[5]) / (t.w + b.projectionMatrix.elements[13])), o.material = Q.material, r.elements.push(o)));
        return c && r.elements.sort(G), r
    }
}, THREE.Quaternion = function(a, b, c, d) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = d !== undefined ? d : 1
}, THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function(a, b, c, d) {
        return this.x = a, this.y = b, this.z = c, this.w = d, this
    },
    copy: function(a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w, this
    },
    setFromEuler: function(a) {
        var b = Math.PI / 360,
            c = a.x * b,
            d = a.y * b,
            e = a.z * b,
            f = Math.cos(d),
            g = Math.sin(d),
            h = Math.cos(-e),
            i = Math.sin(-e),
            j = Math.cos(c),
            k = Math.sin(c),
            l = f * h,
            m = g * i;
        return this.w = l * j - m * k, this.x = l * k + m * j, this.y = g * h * j + f * i * k, this.z = f * i * j - g * h * k, this
    },
    setFromAxisAngle: function(a, b) {
        var c = b / 2,
            d = Math.sin(c);
        return this.x = a.x * d, this.y = a.y * d, this.z = a.z * d, this.w = Math.cos(c), this
    },
    setFromRotationMatrix: function(a) {
        function b(a, b) {
            return b < 0 ? -Math.abs(a) : Math.abs(a)
        }
        var c = Math.pow(a.determinant(), 1 / 3);
        return this.w = Math.sqrt(Math.max(0, c + a.elements[0] + a.elements[5] + a.elements[10])) / 2, this.x = Math.sqrt(Math.max(0, c + a.elements[0] - a.elements[5] - a.elements[10])) / 2, this.y = Math.sqrt(Math.max(0, c - a.elements[0] + a.elements[5] - a.elements[10])) / 2, this.z = Math.sqrt(Math.max(0, c - a.elements[0] - a.elements[5] + a.elements[10])) / 2, this.x = b(this.x, a.elements[6] - a.elements[9]), this.y = b(this.y, a.elements[8] - a.elements[2]), this.z = b(this.z, a.elements[1] - a.elements[4]), this.normalize(), this
    },
    calculateW: function() {
        return this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)), this
    },
    inverse: function() {
        return this.x *= -1, this.y *= -1, this.z *= -1, this
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return a === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (a = 1 / a, this.x = this.x * a, this.y = this.y * a, this.z = this.z * a, this.w = this.w * a), this
    },
    multiply: function(a, b) {
        return this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x, this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y, this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z, this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w, this
    },
    multiplySelf: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            e = this.w,
            f = a.x,
            g = a.y,
            h = a.z,
            i = a.w;
        return this.x = b * i + e * f + c * h - d * g, this.y = c * i + e * g + d * f - b * h, this.z = d * i + e * h + b * g - c * f, this.w = e * i - b * f - c * g - d * h, this
    },
    multiplyVector3: function(a, b) {
        b || (b = a);
        var c = a.x,
            d = a.y,
            e = a.z,
            f = this.x,
            g = this.y,
            h = this.z,
            i = this.w,
            j = i * c + g * e - h * d,
            k = i * d + h * c - f * e,
            l = i * e + f * d - g * c,
            m = -f * c - g * d - h * e;
        return b.x = j * i + m * -f + k * -h - l * -g, b.y = k * i + m * -g + l * -f - j * -h, b.z = l * i + m * -h + j * -g - k * -f, b
    },
    clone: function() {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w)
    }
}, THREE.Quaternion.slerp = function(a, b, c, d) {
    var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    e < 0 ? (c.w = -b.w, c.x = -b.x, c.y = -b.y, c.z = -b.z, e = -e) : c.copy(b);
    if (Math.abs(e) >= 1) return c.w = a.w, c.x = a.x, c.y = a.y, c.z = a.z, c;
    var f = Math.acos(e),
        g = Math.sqrt(1 - e * e);
    if (Math.abs(g) < .001) return c.w = .5 * (a.w + b.w), c.x = .5 * (a.x + b.x), c.y = .5 * (a.y + b.y), c.z = .5 * (a.z + b.z), c;
    var h = Math.sin((1 - d) * f) / g,
        i = Math.sin(d * f) / g;
    return c.w = a.w * h + c.w * i, c.x = a.x * h + c.x * i, c.y = a.y * h + c.y * i, c.z = a.z * h + c.z * i, c
}, THREE.Vertex = function() {
    console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.")
}, THREE.Face3 = function(a, b, c, d, e, f) {
    this.a = a, this.b = b, this.c = c, this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3, this.vertexNormals = d instanceof Array ? d : [], this.color = e instanceof THREE.Color ? e : new THREE.Color, this.vertexColors = e instanceof Array ? e : [], this.vertexTangents = [], this.materialIndex = f, this.centroid = new THREE.Vector3
}, THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function() {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal), a.color.copy(this.color), a.centroid.copy(this.centroid), a.materialIndex = this.materialIndex;
        var b, c;
        for (b = 0, c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
}, THREE.Face4 = function(a, b, c, d, e, f, g) {
    this.a = a, this.b = b, this.c = c, this.d = d, this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3, this.vertexNormals = e instanceof Array ? e : [], this.color = f instanceof THREE.Color ? f : new THREE.Color, this.vertexColors = f instanceof Array ? f : [], this.vertexTangents = [], this.materialIndex = g, this.centroid = new THREE.Vector3
}, THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function() {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal), a.color.copy(this.color), a.centroid.copy(this.centroid), a.materialIndex = this.materialIndex;
        var b, c;
        for (b = 0, c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
}, THREE.UV = function(a, b) {
    this.u = a || 0, this.v = b || 0
}, THREE.UV.prototype = {
    constructor: THREE.UV,
    set: function(a, b) {
        return this.u = a, this.v = b, this
    },
    copy: function(a) {
        return this.u = a.u, this.v = a.v, this
    },
    lerpSelf: function(a, b) {
        return this.u += (a.u - this.u) * b, this.v += (a.v - this.v) * b, this
    },
    clone: function() {
        return new THREE.UV(this.u, this.v)
    }
}, THREE.Geometry = function() {
    this.id = THREE.GeometryCount++, this.vertices = [], this.colors = [], this.materials = [], this.faces = [], this.faceUvs = [
        []
    ], this.faceVertexUvs = [
        []
    ], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.dynamic = !1
}, THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function(a) {
        var b = new THREE.Matrix4;
        b.extractRotation(a);
        for (var c = 0, d = this.vertices.length; c < d; c++) {
            var e = this.vertices[c];
            a.multiplyVector3(e)
        }
        for (var c = 0, d = this.faces.length; c < d; c++) {
            var f = this.faces[c];
            b.multiplyVector3(f.normal);
            for (var g = 0, h = f.vertexNormals.length; g < h; g++) b.multiplyVector3(f.vertexNormals[g]);
            a.multiplyVector3(f.centroid)
        }
    },
    computeCentroids: function() {
        var a, b, c;
        for (a = 0, b = this.faces.length; a < b; a++) c = this.faces[a], c.centroid.set(0, 0, 0), c instanceof THREE.Face3 ? (c.centroid.addSelf(this.vertices[c.a]), c.centroid.addSelf(this.vertices[c.b]), c.centroid.addSelf(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.addSelf(this.vertices[c.a]), c.centroid.addSelf(this.vertices[c.b]), c.centroid.addSelf(this.vertices[c.c]), c.centroid.addSelf(this.vertices[c.d]), c.centroid.divideScalar(4))
    },
    computeFaceNormals: function() {
        var f, g, h, i, j, k, l = new THREE.Vector3,
            m = new THREE.Vector3;
        for (f = 0, g = this.faces.length; f < g; f++) h = this.faces[f], i = this.vertices[h.a], j = this.vertices[h.b], k = this.vertices[h.c], l.sub(k, j), m.sub(i, j), l.crossSelf(m), l.isZero() || l.normalize(), h.normal.copy(l)
    },
    computeVertexNormals: function() {
        var a, b, c, d, e, f;
        if (this.__tmpVertices === undefined) {
            this.__tmpVertices = new Array(this.vertices.length), f = this.__tmpVertices;
            for (a = 0, b = this.vertices.length; a < b; a++) f[a] = new THREE.Vector3;
            for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], e instanceof THREE.Face3 ? e.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : e instanceof THREE.Face4 && (e.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
        }
        else {
            f = this.__tmpVertices;
            for (a = 0, b = this.vertices.length; a < b; a++) f[a].set(0, 0, 0)
        }
        for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], e instanceof THREE.Face3 ? (f[e.a].addSelf(e.normal), f[e.b].addSelf(e.normal), f[e.c].addSelf(e.normal)) : e instanceof THREE.Face4 && (f[e.a].addSelf(e.normal), f[e.b].addSelf(e.normal), f[e.c].addSelf(e.normal), f[e.d].addSelf(e.normal));
        for (a = 0, b = this.vertices.length; a < b; a++) f[a].normalize();
        for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], e instanceof THREE.Face3 ? (e.vertexNormals[0].copy(f[e.a]), e.vertexNormals[1].copy(f[e.b]), e.vertexNormals[2].copy(f[e.c])) : e instanceof THREE.Face4 && (e.vertexNormals[0].copy(f[e.a]), e.vertexNormals[1].copy(f[e.b]), e.vertexNormals[2].copy(f[e.c]), e.vertexNormals[3].copy(f[e.d]))
    },
    computeMorphNormals: function() {
        var a, b, c, d, e;
        for (c = 0, d = this.faces.length; c < d; c++) {
            e = this.faces[c], e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone(), e.__originalVertexNormals || (e.__originalVertexNormals = []);
            for (a = 0, b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
        }
        var f = new THREE.Geometry;
        f.faces = this.faces;
        for (a = 0, b = this.morphTargets.length; a < b; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {}, this.morphNormals[a].faceNormals = [], this.morphNormals[a].vertexNormals = [];
                var g = this.morphNormals[a].faceNormals,
                    h = this.morphNormals[a].vertexNormals,
                    i, j;
                for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], i = new THREE.Vector3, e instanceof THREE.Face3 ? j = {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3
                } : j = {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3,
                    d: new THREE.Vector3
                }, g.push(i), h.push(j)
            }
            var k = this.morphNormals[a];
            f.vertices = this.morphTargets[a].vertices, f.computeFaceNormals(), f.computeVertexNormals();
            var i, j;
            for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], i = k.faceNormals[c], j = k.vertexNormals[c], i.copy(e.normal), e instanceof THREE.Face3 ? (j.a.copy(e.vertexNormals[0]), j.b.copy(e.vertexNormals[1]), j.c.copy(e.vertexNormals[2])) : (j.a.copy(e.vertexNormals[0]), j.b.copy(e.vertexNormals[1]), j.c.copy(e.vertexNormals[2]), j.d.copy(e.vertexNormals[3]))
        }
        for (c = 0, d = this.faces.length; c < d; c++) e = this.faces[c], e.normal = e.__originalFaceNormal, e.vertexNormals = e.__originalVertexNormals
    },
    computeTangents: function() {
        function K(a, b, c, d, e, f, g) {
            j = a.vertices[b], k = a.vertices[c], l = a.vertices[d], m = i[e], n = i[f], o = i[g], p = k.x - j.x, q = l.x - j.x, r = k.y - j.y, s = l.y - j.y, t = k.z - j.z, u = l.z - j.z, v = n.u - m.u, w = o.u - m.u, x = n.v - m.v, y = o.v - m.v, z = 1 / (v * y - w * x), E.set((y * p - x * q) * z, (y * r - x * s) * z, (y * t - x * u) * z), F.set((v * q - w * p) * z, (v * s - w * r) * z, (v * u - w * t) * z), C[b].addSelf(E), C[c].addSelf(E), C[d].addSelf(E), D[b].addSelf(F), D[c].addSelf(F), D[d].addSelf(F)
        }
        var a, b, c, d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C = [],
            D = [],
            E = new THREE.Vector3,
            F = new THREE.Vector3,
            G = new THREE.Vector3,
            H = new THREE.Vector3,
            I = new THREE.Vector3,
            J;
        for (c = 0, d = this.vertices.length; c < d; c++) C[c] = new THREE.Vector3, D[c] = new THREE.Vector3;
        for (a = 0, b = this.faces.length; a < b; a++) h = this.faces[a], i = this.faceVertexUvs[0][a], h instanceof THREE.Face3 ? K(this, h.a, h.b, h.c, 0, 1, 2) : h instanceof THREE.Face4 && (K(this, h.a, h.b, h.d, 0, 1, 3), K(this, h.b, h.c, h.d, 1, 2, 3));
        var L = ["a", "b", "c", "d"];
        for (a = 0, b = this.faces.length; a < b; a++) {
            h = this.faces[a];
            for (e = 0; e < h.vertexNormals.length; e++) I.copy(h.vertexNormals[e]), g = h[L[e]], A = C[g], G.copy(A), G.subSelf(I.multiplyScalar(I.dot(A))).normalize(), H.cross(h.vertexNormals[e], A), B = H.dot(D[g]), J = B < 0 ? -1 : 1, h.vertexTangents[e] = new THREE.Vector4(G.x, G.y, G.z, J)
        }
        this.hasTangents = !0
    },
    computeBoundingBox: function() {
        this.boundingBox || (this.boundingBox = {
            min: new THREE.Vector3,
            max: new THREE.Vector3
        });
        if (this.vertices.length > 0) {
            var a, b = this.vertices[0];
            this.boundingBox.min.copy(b), this.boundingBox.max.copy(b);
            var c = this.boundingBox.min,
                d = this.boundingBox.max;
            for (var e = 1, f = this.vertices.length; e < f; e++) a = this.vertices[e], a.x < c.x ? c.x = a.x : a.x > d.x && (d.x = a.x), a.y < c.y ? c.y = a.y : a.y > d.y && (d.y = a.y), a.z < c.z ? c.z = a.z : a.z > d.z && (d.z = a.z)
        }
        else this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)
    },
    computeBoundingSphere: function() {
        this.boundingSphere || (this.boundingSphere = {
            radius: 0
        });
        var a, b = 0;
        for (var c = 0, d = this.vertices.length; c < d; c++) a = this.vertices[c].length(), a > b && (b = a);
        this.boundingSphere.radius = b
    },
    mergeVertices: function() {
        var a = {},
            b = [],
            c = [],
            d, e, f = 4,
            g = Math.pow(10, f),
            h, i, j, k = "abcd",
            l, m, n, o, p;
        for (h = 0, i = this.vertices.length; h < i; h++) d = this.vertices[h], e = [Math.round(d.x * g), Math.round(d.y * g), Math.round(d.z * g)].join("_"), a[e] === undefined ? (a[e] = h, b.push(this.vertices[h]), c[h] = b.length - 1) : c[h] = c[a[e]];
        for (h = 0, i = this.faces.length; h < i; h++) {
            j = this.faces[h];
            if (j instanceof THREE.Face3) j.a = c[j.a], j.b = c[j.b], j.c = c[j.c];
            else if (j instanceof THREE.Face4) {
                j.a = c[j.a], j.b = c[j.b], j.c = c[j.c], j.d = c[j.d], l = [j.a, j.b, j.c, j.d];
                for (m = 3; m > 0; m--) if (l.indexOf(j[k[m]]) != m) {
                    l.splice(m, 1), this.faces[h] = new THREE.Face3(l[0], l[1], l[2]);
                    for (n = 0, o = this.faceVertexUvs.length; n < o; n++) p = this.faceVertexUvs[n][h], p && p.splice(m, 1);
                    break
                }
            }
        }
        var q = this.vertices.length - b.length;
        return this.vertices = b, q
    }
}, THREE.GeometryCount = 0, THREE.Spline = function(a) {
    function m(a, b, c, d, e, f, g) {
        var h = (c - a) * .5,
            i = (d - b) * .5;
        return (2 * (b - c) + h + i) * g + (-3 * (b - c) - 2 * h - i) * f + h * e + b
    }
    this.points = a;
    var b = [],
        c = {
            x: 0,
            y: 0,
            z: 0
        },
        d, e, f, g, h, i, j, k, l;
    this.initFromArray = function(a) {
        this.points = [];
        for (var b = 0; b < a.length; b++) this.points[b] = {
            x: a[b][0],
            y: a[b][1],
            z: a[b][2]
        }
    }, this.getPoint = function(a) {
        return d = (this.points.length - 1) * a, e = Math.floor(d), f = d - e, b[0] = e === 0 ? e : e - 1, b[1] = e, b[2] = e > this.points.length - 2 ? this.points.length - 1 : e + 1, b[3] = e > this.points.length - 3 ? this.points.length - 1 : e + 2, i = this.points[b[0]], j = this.points[b[1]], k = this.points[b[2]], l = this.points[b[3]], g = f * f, h = f * g, c.x = m(i.x, j.x, k.x, l.x, f, g, h), c.y = m(i.y, j.y, k.y, l.y, f, g, h), c.z = m(i.z, j.z, k.z, l.z, f, g, h), c
    }, this.getControlPointsArray = function() {
        var a, b, c = this.points.length,
            d = [];
        for (a = 0; a < c; a++) b = this.points[a], d[a] = [b.x, b.y, b.z];
        return d
    }, this.getLength = function(a) {
        var b, c, d, e, f = 0,
            g = 0,
            h = 0,
            i = new THREE.Vector3,
            j = new THREE.Vector3,
            k = [],
            l = 0;
        k[0] = 0, a || (a = 100), d = this.points.length * a, i.copy(this.points[0]);
        for (b = 1; b < d; b++) c = b / d, e = this.getPoint(c), j.copy(e), l += j.distanceTo(i), i.copy(e), f = (this.points.length - 1) * c, g = Math.floor(f), g != h && (k[g] = l, h = g);
        return k[k.length] = l, {
            chunks: k,
            total: l
        }
    }, this.reparametrizeByArcLength = function(a) {
        var b, c, d, e, f, h, i, j, k = [],
            l = new THREE.Vector3,
            m = this.getLength();
        k.push(l.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            h = m.chunks[b] - m.chunks[b - 1], i = Math.ceil(a * h / m.total), e = (b - 1) / (this.points.length - 1), f = b / (this.points.length - 1);
            for (c = 1; c < i - 1; c++) d = e + c * (1 / i) * (f - e), j = this.getPoint(d), k.push(l.copy(j).clone());
            k.push(l.copy(this.points[b]).clone())
        }
        this.points = k
    }
}, THREE.Camera = function() {
    THREE.Object3D.call(this), this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = new THREE.Matrix4, this.projectionMatrixInverse = new THREE.Matrix4
}, THREE.Camera.prototype = new THREE.Object3D, THREE.Camera.prototype.constructor = THREE.Camera, THREE.Camera.prototype.lookAt = function(a) {
    this.matrix.lookAt(this.position, a, this.up), this.rotationAutoUpdate && this.rotation.getRotationFromMatrix(this.matrix)
}, THREE.OrthographicCamera = function(a, b, c, d, e, f) {
    THREE.Camera.call(this), this.left = a, this.right = b, this.top = c, this.bottom = d, this.near = e !== undefined ? e : .1, this.far = f !== undefined ? f : 2e3, this.updateProjectionMatrix()
}, THREE.OrthographicCamera.prototype = new THREE.Camera, THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera, THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
}, THREE.PerspectiveCamera = function(a, b, c, d) {
    THREE.Camera.call(this), this.fov = a !== undefined ? a : 50, this.aspect = b !== undefined ? b : 1, this.near = c !== undefined ? c : .1, this.far = d !== undefined ? d : 2e3, this.updateProjectionMatrix()
}, THREE.PerspectiveCamera.prototype = new THREE.Camera, THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera, THREE.PerspectiveCamera.prototype.setLens = function(a, b) {
    b = b !== undefined ? b : 24, this.fov = 2 * Math.atan(b / (a * 2)) * (180 / Math.PI), this.updateProjectionMatrix()
}, THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
    this.fullWidth = a, this.fullHeight = b, this.x = c, this.y = d, this.width = e, this.height = f, this.updateProjectionMatrix()
}, THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            b = Math.tan(this.fov * Math.PI / 360) * this.near,
            c = -b,
            d = a * c,
            e = a * b,
            f = Math.abs(e - d),
            g = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(d + this.x * f / this.fullWidth, d + (this.x + this.width) * f / this.fullWidth, b - (this.y + this.height) * g / this.fullHeight, b - this.y * g / this.fullHeight, this.near, this.far)
    }
    else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
}, THREE.Light = function(a) {
    THREE.Object3D.call(this), this.color = new THREE.Color(a)
}, THREE.Light.prototype = new THREE.Object3D, THREE.Light.prototype.constructor = THREE.Light, THREE.Light.prototype.supr = THREE.Object3D.prototype, THREE.AmbientLight = function(a) {
    THREE.Light.call(this, a)
}, THREE.AmbientLight.prototype = new THREE.Light, THREE.AmbientLight.prototype.constructor = THREE.AmbientLight, THREE.DirectionalLight = function(a, b, c) {
    THREE.Light.call(this, a), this.position = new THREE.Vector3(0, 1, 0), this.target = new THREE.Object3D, this.intensity = b !== undefined ? b : 1, this.distance = c !== undefined ? c : 0, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraRight = 500, this.shadowCameraTop = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
}, THREE.DirectionalLight.prototype = new THREE.Light, THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight, THREE.PointLight = function(a, b, c) {
    THREE.Light.call(this, a), this.position = new THREE.Vector3(0, 0, 0), this.intensity = b !== undefined ? b : 1, this.distance = c !== undefined ? c : 0
}, THREE.PointLight.prototype = new THREE.Light, THREE.PointLight.prototype.constructor = THREE.PointLight, THREE.SpotLight = function(a, b, c, d, e) {
    THREE.Light.call(this, a), this.position = new THREE.Vector3(0, 1, 0), this.target = new THREE.Object3D, this.intensity = b !== undefined ? b : 1, this.distance = c !== undefined ? c : 0, this.angle = d !== undefined ? d : Math.PI / 2, this.exponent = e !== undefined ? e : 10, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
}, THREE.SpotLight.prototype = new THREE.Light, THREE.SpotLight.prototype.constructor = THREE.SpotLight, THREE.Loader = function(a) {
    this.showStatus = a, this.statusDomElement = a ? THREE.Loader.prototype.addStatusElement() : null, this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
}, THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function() {
        var a = document.createElement("div");
        return a.style.position = "absolute", a.style.right = "0px", a.style.top = "0px", a.style.fontSize = "0.8em", a.style.textAlign = "left", a.style.background = "rgba(0,0,0,0.25)", a.style.color = "#fff", a.style.width = "120px", a.style.padding = "0.5em 0.5em 0.5em 0.5em", a.style.zIndex = 1e3, a.innerHTML = "Loading ...", a
    },
    updateProgress: function(a) {
        var b = "Loaded ";
        a.total ? b += (100 * a.loaded / a.total).toFixed(0) + "%" : b += (a.loaded / 1e3).toFixed(2) + " KB", this.statusDomElement.innerHTML = b
    },
    extractUrlBase: function(a) {
        var b = a.split("/");
        return b.pop(), (b.length < 1 ? "." : b.join("/")) + "/"
    },
    initMaterials: function(a, b, c) {
        a.materials = [];
        for (var d = 0; d < b.length; ++d) a.materials[d] = THREE.Loader.prototype.createMaterial(b[d], c)
    },
    hasNormals: function(a) {
        var b, c, d = a.materials.length;
        for (c = 0; c < d; c++) {
            b = a.materials[c];
            if (b instanceof THREE.ShaderMaterial) return !0
        }
        return !1
    },
    createMaterial: function(a, b) {
        function d(a) {
            var b = Math.log(a) / Math.LN2;
            return Math.floor(b) == b
        }
        function e(a) {
            var b = Math.log(a) / Math.LN2;
            return Math.pow(2, Math.round(b))
        }
        function f(a, b) {
            var f = new Image;
            f.onload = function() {
                if (!d(this.width) || !d(this.height)) {
                    var b = e(this.width),
                        c = e(this.height);
                    a.image.width = b, a.image.height = c, a.image.getContext("2d").drawImage(this, 0, 0, b, c)
                }
                else a.image = this;
                a.needsUpdate = !0
            }, f.crossOrigin = c.crossOrigin, f.src = b
        }
        function g(a, c, d, e, g, h) {
            var i = document.createElement("canvas");
            a[c] = new THREE.Texture(i), a[c].sourceFile = d, e && (a[c].repeat.set(e[0], e[1]), e[0] != 1 && (a[c].wrapS = THREE.RepeatWrapping), e[1] != 1 && (a[c].wrapT = THREE.RepeatWrapping)), g && a[c].offset.set(g[0], g[1]);
            if (h) {
                var j = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                j[h[0]] !== undefined && (a[c].wrapS = j[h[0]]), j[h[1]] !== undefined && (a[c].wrapT = j[h[1]])
            }
            f(a[c], b + "/" + d)
        }
        function h(a) {
            return (a[0] * 255 << 16) + (a[1] * 255 << 8) + a[2] * 255
        }
        var c = this,
            i = "MeshLambertMaterial",
            j = {
                color: 15658734,
                opacity: 1,
                map: null,
                lightMap: null,
                normalMap: null,
                wireframe: a.wireframe
            };
        if (a.shading) {
            var k = a.shading.toLowerCase();
            k === "phong" ? i = "MeshPhongMaterial" : k === "basic" && (i = "MeshBasicMaterial")
        }
        a.blending !== undefined && THREE[a.blending] !== undefined && (j.blending = THREE[a.blending]);
        if (a.transparent !== undefined || a.opacity < 1) j.transparent = a.transparent;
        a.depthTest !== undefined && (j.depthTest = a.depthTest), a.depthWrite !== undefined && (j.depthWrite = a.depthWrite), a.vertexColors !== undefined && (a.vertexColors == "face" ? j.vertexColors = THREE.FaceColors : a.vertexColors && (j.vertexColors = THREE.VertexColors)), a.colorDiffuse ? j.color = h(a.colorDiffuse) : a.DbgColor && (j.color = a.DbgColor), a.colorSpecular && (j.specular = h(a.colorSpecular)), a.colorAmbient && (j.ambient = h(a.colorAmbient)), a.transparency && (j.opacity = a.transparency), a.specularCoef && (j.shininess = a.specularCoef), a.mapDiffuse && b && g(j, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap), a.mapLight && b && g(j, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap), a.mapNormal && b && g(j, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap), a.mapSpecular && b && g(j, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap);
        if (a.mapNormal) {
            var l = THREE.ShaderUtils.lib.normal,
                m = THREE.UniformsUtils.clone(l.uniforms);
            m.tNormal.texture = j.normalMap, a.mapNormalFactor && (m.uNormalScale.value = a.mapNormalFactor), j.map && (m.tDiffuse.texture = j.map, m.enableDiffuse.value = !0), j.specularMap && (m.tSpecular.texture = j.specularMap, m.enableSpecular.value = !0), j.lightMap && (m.tAO.texture = j.lightMap, m.enableAO.value = !0), m.uDiffuseColor.value.setHex(j.color), m.uSpecularColor.value.setHex(j.specular), m.uAmbientColor.value.setHex(j.ambient), m.uShininess.value = j.shininess, j.opacity !== undefined && (m.uOpacity.value = j.opacity);
            var n = {
                fragmentShader: l.fragmentShader,
                vertexShader: l.vertexShader,
                uniforms: m,
                lights: !0,
                fog: !0
            },
                o = new THREE.ShaderMaterial(n)
        }
        else var o = new THREE[i](j);
        return a.DbgName !== undefined && (o.name = a.DbgName), o
    }
}, THREE.BinaryLoader = function(a) {
    THREE.Loader.call(this, a)
}, THREE.BinaryLoader.prototype = new THREE.Loader, THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader, THREE.BinaryLoader.prototype.load = function(a, b, c, d) {
    c = c ? c : this.extractUrlBase(a), d = d ? d : this.extractUrlBase(a);
    var e = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
    this.onLoadStart(), this.loadAjaxJSON(this, a, b, c, d, e)
}, THREE.BinaryLoader.prototype.loadAjaxJSON = function(a, b, c, d, e, f) {
    var g = new XMLHttpRequest;
    g.onreadystatechange = function() {
        if (g.readyState == 4) if (g.status == 200 || g.status == 0) {
            var h = JSON.parse(g.responseText);
            a.loadAjaxBuffers(h, c, e, d, f)
        }
        else console.error("THREE.BinaryLoader: Couldn't load [" + b + "] [" + g.status + "]")
    }, g.open("GET", b, !0), g.overrideMimeType && g.overrideMimeType("text/plain; charset=x-user-defined"), g.setRequestHeader("Content-Type", "text/plain"), g.send(null)
}, THREE.BinaryLoader.prototype.loadAjaxBuffers = function(a, b, c, d, e) {
    var f = new XMLHttpRequest,
        g = c + "/" + a.buffers,
        h = 0;
    f.onreadystatechange = function() {
        f.readyState == 4 ? f.status == 200 || f.status == 0 ? THREE.BinaryLoader.prototype.createBinModel(f.response, b, d, a.materials) : console.error("THREE.BinaryLoader: Couldn't load [" + g + "] [" + f.status + "]") : f.readyState == 3 ? e && (h == 0 && (h = f.getResponseHeader("Content-Length")), e({
            total: h,
            loaded: f.responseText.length
        })) : f.readyState == 2 && (h = f.getResponseHeader("Content-Length"))
    }, f.open("GET", g, !0), f.responseType = "arraybuffer", f.send(null)
}, THREE.BinaryLoader.prototype.createBinModel = function(a, b, c, d) {
    function f(a, b, c, d) {
        a.vertices.push(new THREE.Vector3(b, c, d))
    }
    function g(a, b, c, d, e) {
        a.faces.push(new THREE.Face3(b, c, d, null, null, e))
    }
    function h(a, b, c, d, e, f) {
        a.faces.push(new THREE.Face4(b, c, d, e, null, null, f))
    }
    function i(a, b, c, d, e, f, g, h, i) {
        var j = b[g * 3],
            k = b[g * 3 + 1],
            l = b[g * 3 + 2],
            m = b[h * 3],
            n = b[h * 3 + 1],
            o = b[h * 3 + 2],
            p = b[i * 3],
            q = b[i * 3 + 1],
            r = b[i * 3 + 2];
        a.faces.push(new THREE.Face3(c, d, e, [new THREE.Vector3(j, k, l), new THREE.Vector3(m, n, o), new THREE.Vector3(p, q, r)], null, f))
    }
    function j(a, b, c, d, e, f, g, h, i, j, k) {
        var l = b[h * 3],
            m = b[h * 3 + 1],
            n = b[h * 3 + 2],
            o = b[i * 3],
            p = b[i * 3 + 1],
            q = b[i * 3 + 2],
            r = b[j * 3],
            s = b[j * 3 + 1],
            t = b[j * 3 + 2],
            u = b[k * 3],
            v = b[k * 3 + 1],
            w = b[k * 3 + 2];
        a.faces.push(new THREE.Face4(c, d, e, f, [new THREE.Vector3(l, m, n), new THREE.Vector3(o, p, q), new THREE.Vector3(r, s, t), new THREE.Vector3(u, v, w)], null, g))
    }
    function k(a, b, c, d, e, f, g) {
        var h = [];
        h.push(new THREE.UV(b, c)), h.push(new THREE.UV(d, e)), h.push(new THREE.UV(f, g)), a.push(h)
    }
    function l(a, b, c, d, e, f, g, h, i) {
        var j = [];
        j.push(new THREE.UV(b, c)), j.push(new THREE.UV(d, e)), j.push(new THREE.UV(f, g)), j.push(new THREE.UV(h, i)), a.push(j)
    }
    var e = function(b) {
            function H(a) {
                return a % 4 ? 4 - a % 4 : 0
            }
            function I(a, b) {
                var c = {
                    signature: J(a, b, 12),
                    header_bytes: K(a, b + 12),
                    vertex_coordinate_bytes: K(a, b + 13),
                    normal_coordinate_bytes: K(a, b + 14),
                    uv_coordinate_bytes: K(a, b + 15),
                    vertex_index_bytes: K(a, b + 16),
                    normal_index_bytes: K(a, b + 17),
                    uv_index_bytes: K(a, b + 18),
                    material_index_bytes: K(a, b + 19),
                    nvertices: L(a, b + 20),
                    nnormals: L(a, b + 20 + 4),
                    nuvs: L(a, b + 20 + 8),
                    ntri_flat: L(a, b + 20 + 12),
                    ntri_smooth: L(a, b + 20 + 16),
                    ntri_flat_uv: L(a, b + 20 + 20),
                    ntri_smooth_uv: L(a, b + 20 + 24),
                    nquad_flat: L(a, b + 20 + 28),
                    nquad_smooth: L(a, b + 20 + 32),
                    nquad_flat_uv: L(a, b + 20 + 36),
                    nquad_smooth_uv: L(a, b + 20 + 40)
                };
                return c
            }
            function J(a, b, c) {
                var d = new Uint8Array(a, b, c),
                    e = "";
                for (var f = 0; f < c; f++) e += String.fromCharCode(d[b + f]);
                return e
            }
            function K(a, b) {
                var c = new Uint8Array(a, b, 1);
                return c[0]
            }
            function L(a, b) {
                var c = new Uint32Array(a, b, 1);
                return c[0]
            }
            function M(b) {
                var d = m.nvertices,
                    e = new Float32Array(a, b, d * 3),
                    g, h, i, j;
                for (g = 0; g < d; g++) h = e[g * 3], i = e[g * 3 + 1], j = e[g * 3 + 2], f(c, h, i, j);
                return d * 3 * Float32Array.BYTES_PER_ELEMENT
            }
            function N(b) {
                var c = m.nnormals;
                if (c) {
                    var d = new Int8Array(a, b, c * 3),
                        e, f, g, h;
                    for (e = 0; e < c; e++) f = d[e * 3], g = d[e * 3 + 1], h = d[e * 3 + 2], n.push(f / 127, g / 127, h / 127)
                }
                return c * 3 * Int8Array.BYTES_PER_ELEMENT
            }
            function O(b) {
                var c = m.nuvs;
                if (c) {
                    var d = new Float32Array(a, b, c * 2),
                        e, f, g;
                    for (e = 0; e < c; e++) f = d[e * 2], g = d[e * 2 + 1], o.push(f, g)
                }
                return c * 2 * Float32Array.BYTES_PER_ELEMENT
            }
            function P(b, d) {
                var e, f, g, h, i, j, l, m, n, p, q = new Uint32Array(a, d, 3 * b);
                for (e = 0; e < b; e++) f = q[e * 3], g = q[e * 3 + 1], h = q[e * 3 + 2], i = o[f * 2], m = o[f * 2 + 1], j = o[g * 2], n = o[g * 2 + 1], l = o[h * 2], p = o[h * 2 + 1], k(c.faceVertexUvs[0], i, m, j, n, l, p)
            }
            function Q(b, d) {
                var e, f, g, h, i, j, k, m, n, p, q, r, s, t = new Uint32Array(a, d, 4 * b);
                for (e = 0; e < b; e++) f = t[e * 4], g = t[e * 4 + 1], h = t[e * 4 + 2], i = t[e * 4 + 3], j = o[f * 2], p = o[f * 2 + 1], k = o[g * 2], q = o[g * 2 + 1], m = o[h * 2], r = o[h * 2 + 1], n = o[i * 2], s = o[i * 2 + 1], l(c.faceVertexUvs[0], j, p, k, q, m, r, n, s)
            }
            function R(b, d, e) {
                var f, h, i, j, k, l = new Uint32Array(a, d, 3 * b),
                    m = new Uint16Array(a, e, b);
                for (f = 0; f < b; f++) h = l[f * 3], i = l[f * 3 + 1], j = l[f * 3 + 2], k = m[f], g(c, h, i, j, k)
            }
            function S(b, d, e) {
                var f, g, i, j, k, l, m = new Uint32Array(a, d, 4 * b),
                    n = new Uint16Array(a, e, b);
                for (f = 0; f < b; f++) g = m[f * 4], i = m[f * 4 + 1], j = m[f * 4 + 2], k = m[f * 4 + 3], l = n[f], h(c, g, i, j, k, l)
            }
            function T(b, d, e, f) {
                var g, h, j, k, l, m, o, p, q = new Uint32Array(a, d, 3 * b),
                    r = new Uint32Array(a, e, 3 * b),
                    s = new Uint16Array(a, f, b);
                for (g = 0; g < b; g++) h = q[g * 3], j = q[g * 3 + 1], k = q[g * 3 + 2], m = r[g * 3], o = r[g * 3 + 1], p = r[g * 3 + 2], l = s[g], i(c, n, h, j, k, l, m, o, p)
            }
            function U(b, d, e, f) {
                var g, h, i, k, l, m, o, p, q, r, s = new Uint32Array(a, d, 4 * b),
                    t = new Uint32Array(a, e, 4 * b),
                    u = new Uint16Array(a, f, b);
                for (g = 0; g < b; g++) h = s[g * 4], i = s[g * 4 + 1], k = s[g * 4 + 2], l = s[g * 4 + 3], o = t[g * 4], p = t[g * 4 + 1], q = t[g * 4 + 2], r = t[g * 4 + 3], m = u[g], j(c, n, h, i, k, l, m, o, p, q, r)
            }
            function V(a) {
                var b = m.ntri_flat;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                    R(b, a, c)
                }
            }
            function W(a) {
                var b = m.ntri_flat_uv;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3,
                        d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                    R(b, a, d), P(b, c)
                }
            }
            function X(a) {
                var b = m.ntri_smooth;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3,
                        d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                    T(b, a, c, d)
                }
            }
            function Y(a) {
                var b = m.ntri_smooth_uv;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3,
                        d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3,
                        e = d + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                    T(b, a, c, e), P(b, d)
                }
            }
            function Z(a) {
                var b = m.nquad_flat;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                    S(b, a, c)
                }
            }
            function $(a) {
                var b = m.nquad_flat_uv;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4,
                        d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                    S(b, a, d), Q(b, c)
                }
            }
            function _(a) {
                var b = m.nquad_smooth;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4,
                        d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                    U(b, a, c, d)
                }
            }
            function ab(a) {
                var b = m.nquad_smooth_uv;
                if (b) {
                    var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4,
                        d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4,
                        e = d + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                    U(b, a, c, e), Q(b, d)
                }
            }
            var c = this,
                e = 0,
                m, n = [],
                o = [],
                p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G;
            THREE.Geometry.call(this), THREE.Loader.prototype.initMaterials(c, d, b), m = I(a, e), e += m.header_bytes, x = m.vertex_index_bytes * 3 + m.material_index_bytes, y = m.vertex_index_bytes * 4 + m.material_index_bytes, z = m.ntri_flat * x, A = m.ntri_smooth * (x + m.normal_index_bytes * 3), B = m.ntri_flat_uv * (x + m.uv_index_bytes * 3), C = m.ntri_smooth_uv * (x + m.normal_index_bytes * 3 + m.uv_index_bytes * 3), D = m.nquad_flat * y, E = m.nquad_smooth * (y + m.normal_index_bytes * 4), F = m.nquad_flat_uv * (y + m.uv_index_bytes * 4), G = m.nquad_smooth_uv * (y + m.normal_index_bytes * 4 + m.uv_index_bytes * 4), e += M(e), e += N(e), e += H(m.nnormals * 3), e += O(e), p = e, q = p + z + H(m.ntri_flat * 2), r = q + A + H(m.ntri_smooth * 2), s = r + B + H(m.ntri_flat_uv * 2), t = s + C + H(m.ntri_smooth_uv * 2), u = t + D + H(m.nquad_flat * 2), v = u + E + H(m.nquad_smooth * 2), w = v + F + H(m.nquad_flat_uv * 2), W(r), Y(s), $(v), ab(w), V(p), X(q), Z(t), _(u), this.computeCentroids(), this.computeFaceNormals(), THREE.Loader.prototype.hasNormals(this) && this.computeTangents()
        };
    e.prototype = new THREE.Geometry, e.prototype.constructor = e, b(new e(c))
}, THREE.JSONLoader = function(a) {
    THREE.Loader.call(this, a)
}, THREE.JSONLoader.prototype = new THREE.Loader, THREE.JSONLoader.prototype.constructor = THREE.JSONLoader, THREE.JSONLoader.prototype.load = function(a, b, c) {
    var e = this;
    c = c ? c : this.extractUrlBase(a), this.onLoadStart(), this.loadAjaxJSON(this, a, b, c)
}, THREE.JSONLoader.prototype.loadAjaxJSON = function(a, b, c, d, e) {
    var f = new XMLHttpRequest,
        g = 0;
    f.onreadystatechange = function() {
        if (f.readyState === f.DONE) if (f.status === 200 || f.status === 0) {
            if (f.responseText) {
                var h = JSON.parse(f.responseText);
                a.createModel(h, c, d)
            }
            else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
            a.onLoadComplete()
        }
        else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
        else f.readyState === f.LOADING ? e && (g === 0 && (g = f.getResponseHeader("Content-Length")), e({
            total: g,
            loaded: f.responseText.length
        })) : f.readyState === f.HEADERS_RECEIVED && (g = f.getResponseHeader("Content-Length"))
    }, f.open("GET", b, !0), f.overrideMimeType && f.overrideMimeType("text/plain; charset=x-user-defined"), f.setRequestHeader("Content-Type", "text/plain"), f.send(null)
}, THREE.JSONLoader.prototype.createModel = function(a, b, c) {
    function g(b) {
        function c(a, b) {
            return a & 1 << b
        }
        var d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F = a.faces,
            G = a.vertices,
            H = a.normals,
            I = a.colors,
            J = 0;
        for (d = 0; d < a.uvs.length; d++) a.uvs[d].length && J++;
        for (d = 0; d < J; d++) e.faceUvs[d] = [], e.faceVertexUvs[d] = [];
        h = 0, i = G.length;
        while (h < i) x = new THREE.Vector3, x.x = G[h++] * b, x.y = G[h++] * b, x.z = G[h++] * b, e.vertices.push(x);
        h = 0, i = F.length;
        while (h < i) {
            o = F[h++], p = c(o, 0), q = c(o, 1), r = c(o, 2), s = c(o, 3), t = c(o, 4), u = c(o, 5), v = c(o, 6), w = c(o, 7), p ? (y = new THREE.Face4, y.a = F[h++], y.b = F[h++], y.c = F[h++], y.d = F[h++], j = 4) : (y = new THREE.Face3, y.a = F[h++], y.b = F[h++], y.c = F[h++], j = 3), q && (n = F[h++], y.materialIndex = n), g = e.faces.length;
            if (r) for (d = 0; d < J; d++) B = a.uvs[d], m = F[h++], D = B[m * 2], E = B[m * 2 + 1], e.faceUvs[d][g] = new THREE.UV(D, E);
            if (s) for (d = 0; d < J; d++) {
                B = a.uvs[d], C = [];
                for (f = 0; f < j; f++) m = F[h++], D = B[m * 2], E = B[m * 2 + 1], C[f] = new THREE.UV(D, E);
                e.faceVertexUvs[d][g] = C
            }
            t && (l = F[h++] * 3, A = new THREE.Vector3, A.x = H[l++], A.y = H[l++], A.z = H[l], y.normal = A);
            if (u) for (d = 0; d < j; d++) l = F[h++] * 3, A = new THREE.Vector3, A.x = H[l++], A.y = H[l++], A.z = H[l], y.vertexNormals.push(A);
            v && (k = F[h++], z = new THREE.Color(I[k]), y.color = z);
            if (w) for (d = 0; d < j; d++) k = F[h++], z = new THREE.Color(I[k]), y.vertexColors.push(z);
            e.faces.push(y)
        }
    }
    function h() {
        var b, c, d, f, g, h, i, j, k, l;
        if (a.skinWeights) for (b = 0, c = a.skinWeights.length; b < c; b += 2) d = a.skinWeights[b], f = a.skinWeights[b + 1], g = 0, h = 0, e.skinWeights.push(new THREE.Vector4(d, f, g, h));
        if (a.skinIndices) for (b = 0, c = a.skinIndices.length; b < c; b += 2) i = a.skinIndices[b], j = a.skinIndices[b + 1], k = 0, l = 0, e.skinIndices.push(new THREE.Vector4(i, j, k, l));
        e.bones = a.bones, e.animation = a.animation
    }
    function i(b) {
        if (a.morphTargets !== undefined) {
            var c, d, f, g, h, i;
            for (c = 0, d = a.morphTargets.length; c < d; c++) {
                e.morphTargets[c] = {}, e.morphTargets[c].name = a.morphTargets[c].name, e.morphTargets[c].vertices = [], h = e.morphTargets[c].vertices, i = a.morphTargets[c].vertices;
                for (f = 0, g = i.length; f < g; f += 3) {
                    var j = new THREE.Vector3;
                    j.x = i[f] * b, j.y = i[f + 1] * b, j.z = i[f + 2] * b, h.push(j)
                }
            }
        }
        if (a.morphColors !== undefined) {
            var c, d, k, l, m, n, o;
            for (c = 0, d = a.morphColors.length; c < d; c++) {
                e.morphColors[c] = {}, e.morphColors[c].name = a.morphColors[c].name, e.morphColors[c].colors = [], m = e.morphColors[c].colors, n = a.morphColors[c].colors;
                for (k = 0, l = n.length; k < l; k += 3) o = new THREE.Color(16755200), o.setRGB(n[k], n[k + 1], n[k + 2]), m.push(o)
            }
        }
    }
    var d = this,
        e = new THREE.Geometry,
        f = a.scale !== undefined ? 1 / a.scale : 1;
    this.initMaterials(e, a.materials, c), g(f), h(), i(f), e.computeCentroids(), e.computeFaceNormals(), this.hasNormals(e) && e.computeTangents(), b(e)
}, THREE.SceneLoader = function() {
    this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}, this.callbackSync = function() {}, this.callbackProgress = function() {}
}, THREE.SceneLoader.prototype.constructor = THREE.SceneLoader, THREE.SceneLoader.prototype.load = function(a, b) {
    var c = this,
        d = new XMLHttpRequest;
    d.onreadystatechange = function() {
        if (d.readyState == 4) if (d.status == 200 || d.status == 0) {
            var e = JSON.parse(d.responseText);
            c.createScene(e, b, a)
        }
        else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]")
    }, d.open("GET", a, !0), d.overrideMimeType && d.overrideMimeType("text/plain; charset=x-user-defined"), d.setRequestHeader("Content-Type", "text/plain"), d.send(null)
}, THREE.SceneLoader.prototype.createScene = function(a, b, c) {
    function T(a, b) {
        return b == "relativeToHTML" ? a : e + "/" + a
    }
    function U() {
        var a;
        for (h in I.objects) if (!P.objects[h]) {
            n = I.objects[h];
            if (n.geometry !== undefined) {
                B = P.geometries[n.geometry];
                if (B) {
                    var b = !1;
                    C = P.materials[n.materials[0]], b = C instanceof THREE.ShaderMaterial, b && B.computeTangents(), r = n.position, s = n.rotation, t = n.quaternion, u = n.scale, o = n.matrix, t = 0, n.materials.length == 0 && (C = new THREE.MeshFaceMaterial), n.materials.length > 1 && (C = new THREE.MeshFaceMaterial), a = new THREE.Mesh(B, C), a.name = h, o ? (a.matrixAutoUpdate = !1, a.matrix.set(o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], o[8], o[9], o[10], o[11], o[12], o[13], o[14], o[15])) : (a.position.set(r[0], r[1], r[2]), t ? (a.quaternion.set(t[0], t[1], t[2], t[3]), a.useQuaternion = !0) : a.rotation.set(s[0], s[1], s[2]), a.scale.set(u[0], u[1], u[2])), a.visible = n.visible, a.doubleSided = n.doubleSided, a.castShadow = n.castShadow, a.receiveShadow = n.receiveShadow, P.scene.add(a), P.objects[h] = a
                }
            }
            else r = n.position, s = n.rotation, t = n.quaternion, u = n.scale, t = 0, a = new THREE.Object3D, a.name = h, a.position.set(r[0], r[1], r[2]), t ? (a.quaternion.set(t[0], t[1], t[2], t[3]), a.useQuaternion = !0) : a.rotation.set(s[0], s[1], s[2]), a.scale.set(u[0], u[1], u[2]), a.visible = n.visible !== undefined ? n.visible : !1, P.scene.add(a), P.objects[h] = a, P.empties[h] = a
        }
    }
    function V(a, b) {
        P.geometries[b] = a, U()
    }
    function W(a) {
        return function(b) {
            V(b, a), L -= 1, d.onLoadComplete(), Y()
        }
    }
    function X(a) {
        return function(b) {
            P.geometries[a] = b
        }
    }
    function Y() {
        var a = {
            totalModels: N,
            totalTextures: O,
            loadedModels: N - L,
            loadedTextures: O - M
        };
        d.callbackProgress(a, P), d.onLoadProgress(), L == 0 && M == 0 && b(P)
    }
    var d = this,
        e = THREE.Loader.prototype.extractUrlBase(c),
        f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, H, I, J, K, L, M, N, O, P;
    I = a, J = new THREE.BinaryLoader, K = new THREE.JSONLoader, L = 0, M = 0, P = {
        scene: new THREE.Scene,
        geometries: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        empties: {}
    };
    if (I.transform) {
        var Q = I.transform.position,
            R = I.transform.rotation,
            S = I.transform.scale;
        Q && P.scene.position.set(Q[0], Q[1], Q[2]), R && P.scene.rotation.set(R[0], R[1], R[2]), S && P.scene.scale.set(S[0], S[1], S[2]);
        if (Q || R || S) P.scene.updateMatrix(), P.scene.updateMatrixWorld()
    }
    var Z = function(a) {
            M -= 1, Y(), d.onLoadComplete()
        };
    for (j in I.cameras) v = I.cameras[j], v.type == "perspective" ? D = new THREE.PerspectiveCamera(v.fov, v.aspect, v.near, v.far) : v.type == "ortho" && (D = new THREE.OrthographicCamera(v.left, v.right, v.top, v.bottom, v.near, v.far)), r = v.position, w = v.target, A = v.up, D.position.set(r[0], r[1], r[2]), D.target = new THREE.Vector3(w[0], w[1], w[2]), A && D.up.set(A[0], A[1], A[2]), P.cameras[j] = D;
    var $, _;
    for (i in I.lights) p = I.lights[i], $ = p.color !== undefined ? p.color : 16777215, _ = p.intensity !== undefined ? p.intensity : 1, p.type == "directional" ? (r = p.direction, H = new THREE.DirectionalLight($, _), H.position.set(r[0], r[1], r[2]), H.position.normalize()) : p.type == "point" ? (r = p.position, q = p.distance, H = new THREE.PointLight($, _, q), H.position.set(r[0], r[1], r[2])) : p.type == "ambient" && (H = new THREE.AmbientLight($)), P.scene.add(H), P.lights[i] = H;
    for (k in I.fogs) x = I.fogs[k], x.type == "linear" ? E = new THREE.Fog(0, x.near, x.far) : x.type == "exp2" && (E = new THREE.FogExp2(0, x.density)), v = x.color, E.color.setRGB(v[0], v[1], v[2]), P.fogs[k] = E;
    P.cameras && I.defaults.camera && (P.currentCamera = P.cameras[I.defaults.camera]), P.fogs && I.defaults.fog && (P.scene.fog = P.fogs[I.defaults.fog]), v = I.defaults.bgcolor, P.bgColor = new THREE.Color, P.bgColor.setRGB(v[0], v[1], v[2]), P.bgColorAlpha = I.defaults.bgalpha;
    for (f in I.geometries) {
        m = I.geometries[f];
        if (m.type == "bin_mesh" || m.type == "ascii_mesh") L += 1, d.onLoadStart()
    }
    N = L;
    for (f in I.geometries) {
        m = I.geometries[f];
        if (m.type == "cube") B = new THREE.CubeGeometry(m.width, m.height, m.depth, m.segmentsWidth, m.segmentsHeight, m.segmentsDepth, null, m.flipped, m.sides), P.geometries[f] = B;
        else if (m.type == "plane") B = new THREE.PlaneGeometry(m.width, m.height, m.segmentsWidth, m.segmentsHeight), P.geometries[f] = B;
        else if (m.type == "sphere") B = new THREE.SphereGeometry(m.radius, m.segmentsWidth, m.segmentsHeight), P.geometries[f] = B;
        else if (m.type == "cylinder") B = new THREE.CylinderGeometry(m.topRad, m.botRad, m.height, m.radSegs, m.heightSegs), P.geometries[f] = B;
        else if (m.type == "torus") B = new THREE.TorusGeometry(m.radius, m.tube, m.segmentsR, m.segmentsT), P.geometries[f] = B;
        else if (m.type == "icosahedron") B = new THREE.IcosahedronGeometry(m.radius, m.subdivisions), P.geometries[f] = B;
        else if (m.type == "bin_mesh") J.load(T(m.url, I.urlBaseType), W(f));
        else if (m.type == "ascii_mesh") K.load(T(m.url, I.urlBaseType), W(f));
        else if (m.type == "embedded_mesh") {
            var ab = I.embeds[m.id],
                bb = "";
            ab.metadata = I.metadata, ab && K.createModel(ab, X(f), bb)
        }
    }
    for (l in I.textures) {
        y = I.textures[l];
        if (y.url instanceof Array) {
            M += y.url.length;
            for (var cb = 0; cb < y.url.length; cb++) d.onLoadStart()
        }
        else M += 1, d.onLoadStart()
    }
    O = M;
    for (l in I.textures) {
        y = I.textures[l], y.mapping != undefined && THREE[y.mapping] != undefined && (y.mapping = new THREE[y.mapping]);
        if (y.url instanceof Array) {
            var db = [];
            for (var eb = 0; eb < y.url.length; eb++) db[eb] = T(y.url[eb], I.urlBaseType);
            F = THREE.ImageUtils.loadTextureCube(db, y.mapping, Z)
        }
        else {
            F = THREE.ImageUtils.loadTexture(T(y.url, I.urlBaseType), y.mapping, Z), THREE[y.minFilter] != undefined && (F.minFilter = THREE[y.minFilter]), THREE[y.magFilter] != undefined && (F.magFilter = THREE[y.magFilter]), y.repeat && (F.repeat.set(y.repeat[0], y.repeat[1]), y.repeat[0] != 1 && (F.wrapS = THREE.RepeatWrapping), y.repeat[1] != 1 && (F.wrapT = THREE.RepeatWrapping)), y.offset && F.offset.set(y.offset[0], y.offset[1]);
            if (y.wrap) {
                var fb = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                fb[y.wrap[0]] !== undefined && (F.wrapS = fb[y.wrap[0]]), fb[y.wrap[1]] !== undefined && (F.wrapT = fb[y.wrap[1]])
            }
        }
        P.textures[l] = F
    }
    for (g in I.materials) {
        o = I.materials[g];
        for (z in o.parameters) z == "envMap" || z == "map" || z == "lightMap" ? o.parameters[z] = P.textures[o.parameters[z]] : z == "shading" ? o.parameters[z] = o.parameters[z] == "flat" ? THREE.FlatShading : THREE.SmoothShading : z == "blending" ? o.parameters[z] = THREE[o.parameters[z]] ? THREE[o.parameters[z]] : THREE.NormalBlending : z == "combine" ? o.parameters[z] = o.parameters[z] == "MixOperation" ? THREE.MixOperation : THREE.MultiplyOperation : z == "vertexColors" && (o.parameters[z] == "face" ? o.parameters[z] = THREE.FaceColors : o.parameters[z] && (o.parameters[z] = THREE.VertexColors));
        o.parameters.opacity !== undefined && o.parameters.opacity < 1 && (o.parameters.transparent = !0);
        if (o.parameters.normalMap) {
            var gb = THREE.ShaderUtils.lib.normal,
                hb = THREE.UniformsUtils.clone(gb.uniforms),
                ib = o.parameters.color,
                jb = o.parameters.specular,
                kb = o.parameters.ambient,
                lb = o.parameters.shininess;
            hb.tNormal.texture = P.textures[o.parameters.normalMap], o.parameters.normalMapFactor && (hb.uNormalScale.value = o.parameters.normalMapFactor), o.parameters.map && (hb.tDiffuse.texture = o.parameters.map, hb.enableDiffuse.value = !0), o.parameters.lightMap && (hb.tAO.texture = o.parameters.lightMap, hb.enableAO.value = !0), o.parameters.specularMap && (hb.tSpecular.texture = P.textures[o.parameters.specularMap], hb.enableSpecular.value = !0), hb.uDiffuseColor.value.setHex(ib), hb.uSpecularColor.value.setHex(jb), hb.uAmbientColor.value.setHex(kb), hb.uShininess.value = lb, o.parameters.opacity && (hb.uOpacity.value = o.parameters.opacity);
            var mb = {
                fragmentShader: gb.fragmentShader,
                vertexShader: gb.vertexShader,
                uniforms: hb,
                lights: !0,
                fog: !0
            };
            C = new THREE.ShaderMaterial(mb)
        }
        else C = new THREE[o.type](o.parameters);
        P.materials[g] = C
    }
    U(), d.callbackSync(P), Y()
}, THREE.Material = function(a) {
    a = a || {}, this.id = THREE.MaterialCount++, this.name = "", this.opacity = a.opacity !== undefined ? a.opacity : 1, this.transparent = a.transparent !== undefined ? a.transparent : !1, this.blending = a.blending !== undefined ? a.blending : THREE.NormalBlending, this.blendSrc = a.blendSrc !== undefined ? a.blendSrc : THREE.SrcAlphaFactor, this.blendDst = a.blendDst !== undefined ? a.blendDst : THREE.OneMinusSrcAlphaFactor, this.blendEquation = a.blendEquation !== undefined ? a.blendEquation : THREE.AddEquation, this.depthTest = a.depthTest !== undefined ? a.depthTest : !0, this.depthWrite = a.depthWrite !== undefined ? a.depthWrite : !0, this.polygonOffset = a.polygonOffset !== undefined ? a.polygonOffset : !1, this.polygonOffsetFactor = a.polygonOffsetFactor !== undefined ? a.polygonOffsetFactor : 0, this.polygonOffsetUnits = a.polygonOffsetUnits !== undefined ? a.polygonOffsetUnits : 0, this.alphaTest = a.alphaTest !== undefined ? a.alphaTest : 0, this.overdraw = a.overdraw !== undefined ? a.overdraw : !1, this.visible = !0, this.needsUpdate = !0
}, THREE.MaterialCount = 0, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NoBlending = 0, THREE.NormalBlending = 1, THREE.AdditiveBlending = 2, THREE.SubtractiveBlending = 3, THREE.MultiplyBlending = 4, THREE.AdditiveAlphaBlending = 5, THREE.CustomBlending = 6, THREE.AddEquation = 100, THREE.SubtractEquation = 101, THREE.ReverseSubtractEquation = 102, THREE.ZeroFactor = 200, THREE.OneFactor = 201, THREE.SrcColorFactor = 202, THREE.OneMinusSrcColorFactor = 203, THREE.SrcAlphaFactor = 204, THREE.OneMinusSrcAlphaFactor = 205, THREE.DstAlphaFactor = 206, THREE.OneMinusDstAlphaFactor = 207, THREE.DstColorFactor = 208, THREE.OneMinusDstColorFactor = 209, THREE.SrcAlphaSaturateFactor = 210, THREE.LineBasicMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.linewidth = a.linewidth !== undefined ? a.linewidth : 1, this.linecap = a.linecap !== undefined ? a.linecap : "round", this.linejoin = a.linejoin !== undefined ? a.linejoin : "round", this.vertexColors = a.vertexColors ? a.vertexColors : !1, this.fog = a.fog !== undefined ? a.fog : !0
}, THREE.LineBasicMaterial.prototype = new THREE.Material, THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial, THREE.MeshBasicMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = a.map !== undefined ? a.map : null, this.lightMap = a.lightMap !== undefined ? a.lightMap : null, this.envMap = a.envMap !== undefined ? a.envMap : null, this.combine = a.combine !== undefined ? a.combine : THREE.MultiplyOperation, this.reflectivity = a.reflectivity !== undefined ? a.reflectivity : 1, this.refractionRatio = a.refractionRatio !== undefined ? a.refractionRatio : .98, this.fog = a.fog !== undefined ? a.fog : !0, this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading, this.wireframe = a.wireframe !== undefined ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1, this.wireframeLinecap = a.wireframeLinecap !== undefined ? a.wireframeLinecap : "round", this.wireframeLinejoin = a.wireframeLinejoin !== undefined ? a.wireframeLinejoin : "round", this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : THREE.NoColors, this.skinning = a.skinning !== undefined ? a.skinning : !1, this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1
}, THREE.MeshBasicMaterial.prototype = new THREE.Material, THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial, THREE.MeshLambertMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.ambient = a.ambient !== undefined ? new THREE.Color(a.ambient) : new THREE.Color(16777215), this.emissive = a.emissive !== undefined ? new THREE.Color(a.emissive) : new THREE.Color(0), this.wrapAround = a.wrapAround !== undefined ? a.wrapAround : !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.map = a.map !== undefined ? a.map : null, this.lightMap = a.lightMap !== undefined ? a.lightMap : null, this.envMap = a.envMap !== undefined ? a.envMap : null, this.combine = a.combine !== undefined ? a.combine : THREE.MultiplyOperation, this.reflectivity = a.reflectivity !== undefined ? a.reflectivity : 1, this.refractionRatio = a.refractionRatio !== undefined ? a.refractionRatio : .98, this.fog = a.fog !== undefined ? a.fog : !0, this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading, this.wireframe = a.wireframe !== undefined ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1, this.wireframeLinecap = a.wireframeLinecap !== undefined ? a.wireframeLinecap : "round", this.wireframeLinejoin = a.wireframeLinejoin !== undefined ? a.wireframeLinejoin : "round", this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : THREE.NoColors, this.skinning = a.skinning !== undefined ? a.skinning : !1, this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1, this.morphNormals = a.morphNormals !== undefined ? a.morphNormals : !1
}, THREE.MeshLambertMaterial.prototype = new THREE.Material, THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial, THREE.MeshPhongMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.ambient = a.ambient !== undefined ? new THREE.Color(a.ambient) : new THREE.Color(16777215), this.emissive = a.emissive !== undefined ? new THREE.Color(a.emissive) : new THREE.Color(0), this.specular = a.specular !== undefined ? new THREE.Color(a.specular) : new THREE.Color(1118481), this.shininess = a.shininess !== undefined ? a.shininess : 30, this.metal = a.metal !== undefined ? a.metal : !1, this.perPixel = a.perPixel !== undefined ? a.perPixel : !1, this.wrapAround = a.wrapAround !== undefined ? a.wrapAround : !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.map = a.map !== undefined ? a.map : null, this.lightMap = a.lightMap !== undefined ? a.lightMap : null, this.envMap = a.envMap !== undefined ? a.envMap : null, this.combine = a.combine !== undefined ? a.combine : THREE.MultiplyOperation, this.reflectivity = a.reflectivity !== undefined ? a.reflectivity : 1, this.refractionRatio = a.refractionRatio !== undefined ? a.refractionRatio : .98, this.fog = a.fog !== undefined ? a.fog : !0, this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading, this.wireframe = a.wireframe !== undefined ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1, this.wireframeLinecap = a.wireframeLinecap !== undefined ? a.wireframeLinecap : "round", this.wireframeLinejoin = a.wireframeLinejoin !== undefined ? a.wireframeLinejoin : "round", this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : THREE.NoColors, this.skinning = a.skinning !== undefined ? a.skinning : !1, this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1, this.morphNormals = a.morphNormals !== undefined ? a.morphNormals : !1
}, THREE.MeshPhongMaterial.prototype = new THREE.Material, THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial, THREE.MeshDepthMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading, this.wireframe = a.wireframe !== undefined ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1
}, THREE.MeshDepthMaterial.prototype = new THREE.Material, THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial, THREE.MeshNormalMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.shading = a.shading ? a.shading : THREE.FlatShading, this.wireframe = a.wireframe ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
}, THREE.MeshNormalMaterial.prototype = new THREE.Material, THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial, THREE.MeshFaceMaterial = function() {}, THREE.ParticleBasicMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = a.map !== undefined ? a.map : null, this.size = a.size !== undefined ? a.size : 1, this.sizeAttenuation = a.sizeAttenuation !== undefined ? a.sizeAttenuation : !0, this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : !1, this.fog = a.fog !== undefined ? a.fog : !0
}, THREE.ParticleBasicMaterial.prototype = new THREE.Material, THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial, THREE.ParticleCanvasMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.program = a.program !== undefined ? a.program : function(a, b) {}
}, THREE.ParticleCanvasMaterial.prototype = new THREE.Material, THREE.ParticleCanvasMaterial.prototype.constructor = THREE.ParticleCanvasMaterial, THREE.ParticleDOMMaterial = function(a) {
    THREE.Material.call(this), this.domElement = a
}, THREE.ShaderMaterial = function(a) {
    THREE.Material.call(this, a), a = a || {}, this.fragmentShader = a.fragmentShader !== undefined ? a.fragmentShader : "void main() {}", this.vertexShader = a.vertexShader !== undefined ? a.vertexShader : "void main() {}", this.uniforms = a.uniforms !== undefined ? a.uniforms : {}, this.attributes = a.attributes, this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading, this.wireframe = a.wireframe !== undefined ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1, this.fog = a.fog !== undefined ? a.fog : !1, this.lights = a.lights !== undefined ? a.lights : !1, this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : THREE.NoColors, this.skinning = a.skinning !== undefined ? a.skinning : !1, this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1, this.morphNormals = a.morphNormals !== undefined ? a.morphNormals : !1
}, THREE.ShaderMaterial.prototype = new THREE.Material, THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial, THREE.Texture = function(a, b, c, d, e, f, g, h) {
    this.id = THREE.TextureCount++, this.image = a, this.mapping = b !== undefined ? b : new THREE.UVMapping, this.wrapS = c !== undefined ? c : THREE.ClampToEdgeWrapping, this.wrapT = d !== undefined ? d : THREE.ClampToEdgeWrapping, this.magFilter = e !== undefined ? e : THREE.LinearFilter, this.minFilter = f !== undefined ? f : THREE.LinearMipMapLinearFilter, this.format = g !== undefined ? g : THREE.RGBAFormat, this.type = h !== undefined ? h : THREE.UnsignedByteType, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.needsUpdate = !1, this.onUpdate = null
}, THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function() {
        var a = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter, this.format, this.type);
        return a.offset.copy(this.offset), a.repeat.copy(this.repeat), a
    }
}, THREE.TextureCount = 0, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.UVMapping = function() {}, THREE.CubeReflectionMapping = function() {}, THREE.CubeRefractionMapping = function() {}, THREE.SphericalReflectionMapping = function() {}, THREE.SphericalRefractionMapping = function() {}, THREE.RepeatWrapping = 0, THREE.ClampToEdgeWrapping = 1, THREE.MirroredRepeatWrapping = 2, THREE.NearestFilter = 3, THREE.NearestMipMapNearestFilter = 4, THREE.NearestMipMapLinearFilter = 5, THREE.LinearFilter = 6, THREE.LinearMipMapNearestFilter = 7, THREE.LinearMipMapLinearFilter = 8, THREE.ByteType = 9, THREE.UnsignedByteType = 10, THREE.ShortType = 11, THREE.UnsignedShortType = 12, THREE.IntType = 13, THREE.UnsignedIntType = 14, THREE.FloatType = 15, THREE.AlphaFormat = 16, THREE.RGBFormat = 17, THREE.RGBAFormat = 18, THREE.LuminanceFormat = 19, THREE.LuminanceAlphaFormat = 20, THREE.DataTexture = function(a, b, c, d, e, f, g, h, i, j) {
    THREE.Texture.call(this, null, f, g, h, i, j, d, e), this.image = {
        data: a,
        width: b,
        height: c
    }
}, THREE.DataTexture.prototype = new THREE.Texture, THREE.DataTexture.prototype.constructor = THREE.DataTexture, THREE.DataTexture.prototype.clone = function() {
    var a = new THREE.DataTexture(this.image.data, this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
    return a.offset.copy(this.offset), a.repeat.copy(this.repeat), a
}, THREE.Particle = function(a) {
    THREE.Object3D.call(this), this.material = a
}, THREE.Particle.prototype = new THREE.Object3D, THREE.Particle.prototype.constructor = THREE.Particle, THREE.ParticleSystem = function(a, b) {
    THREE.Object3D.call(this), this.geometry = a, this.material = b !== undefined ? b : new THREE.ParticleBasicMaterial({
        color: Math.random() * 16777215
    }), this.sortParticles = !1, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius), this.frustumCulled = !1
}, THREE.ParticleSystem.prototype = new THREE.Object3D, THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem, THREE.Line = function(a, b, c) {
    THREE.Object3D.call(this), this.geometry = a, this.material = b !== undefined ? b : new THREE.LineBasicMaterial({
        color: Math.random() * 16777215
    }), this.type = c !== undefined ? c : THREE.LineStrip, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
}, THREE.LineStrip = 0, THREE.LinePieces = 1, THREE.Line.prototype = new THREE.Object3D, THREE.Line.prototype.constructor = THREE.Line, THREE.Mesh = function(a, b) {
    THREE.Object3D.call(this), this.geometry = a, this.material = b !== undefined ? b : new THREE.MeshBasicMaterial({
        color: Math.random() * 16777215,
        wireframe: !0
    });
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
            for (var c = 0; c < this.geometry.morphTargets.length; c++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
        }
    }
}, THREE.Mesh.prototype = new THREE.Object3D, THREE.Mesh.prototype.constructor = THREE.Mesh, THREE.Mesh.prototype.supr = THREE.Object3D.prototype, THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
    return this.morphTargetDictionary[a] !== undefined ? this.morphTargetDictionary[a] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0."), 0)
}, THREE.Bone = function(a) {
    THREE.Object3D.call(this), this.skin = a, this.skinMatrix = new THREE.Matrix4
}, THREE.Bone.prototype = new THREE.Object3D, THREE.Bone.prototype.constructor = THREE.Bone, THREE.Bone.prototype.supr = THREE.Object3D.prototype, THREE.Bone.prototype.update = function(a, b) {
    this.matrixAutoUpdate && (b |= this.updateMatrix());
    if (b || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiply(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, b = !0;
    var d, e = this.children.length;
    for (d = 0; d < e; d++) this.children[d].update(this.skinMatrix, b)
}, THREE.SkinnedMesh = function(a, b) {
    THREE.Mesh.call(this, a, b), this.identityMatrix = new THREE.Matrix4, this.bones = [], this.boneMatrices = [];
    var c, d, e, f, g, h;
    if (this.geometry.bones !== undefined) {
        for (c = 0; c < this.geometry.bones.length; c++) e = this.geometry.bones[c], f = e.pos, g = e.rotq, h = e.scl, d = this.addBone(), d.name = e.name, d.position.set(f[0], f[1], f[2]), d.quaternion.set(g[0], g[1], g[2], g[3]), d.useQuaternion = !0, h !== undefined ? d.scale.set(h[0], h[1], h[2]) : d.scale.set(1, 1, 1);
        for (c = 0; c < this.bones.length; c++) e = this.geometry.bones[c], d = this.bones[c], e.parent === -1 ? this.add(d) : this.bones[e.parent].add(d);
        this.boneMatrices = new Float32Array(16 * this.bones.length), this.pose()
    }
}, THREE.SkinnedMesh.prototype = new THREE.Mesh, THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh, THREE.SkinnedMesh.prototype.addBone = function(a) {
    return a === undefined && (a = new THREE.Bone(this)), this.bones.push(a), a
}, THREE.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
    for (var b = 0, c = this.children.length; b < c; b++) {
        var d = this.children[b];
        d instanceof THREE.Bone ? d.update(this.identityMatrix, !1) : d.updateMatrixWorld(!0)
    }
    var e, f = this.bones.length,
        g = this.bones,
        h = this.boneMatrices;
    for (e = 0; e < f; e++) g[e].skinMatrix.flattenToArrayOffset(h, e * 16)
}, THREE.SkinnedMesh.prototype.pose = function() {
    this.updateMatrixWorld(!0);
    var b, c = [];
    for (var d = 0; d < this.bones.length; d++) {
        b = this.bones[d];
        var e = new THREE.Matrix4;
        e.getInverse(b.skinMatrix), c.push(e), b.skinMatrix.flattenToArrayOffset(this.boneMatrices, d * 16)
    }
    if (this.geometry.skinVerticesA === undefined) {
        this.geometry.skinVerticesA = [], this.geometry.skinVerticesB = [];
        var f, g;
        for (var h = 0; h < this.geometry.skinIndices.length; h++) {
            f = this.geometry.vertices[h];
            var i = this.geometry.skinIndices[h].x,
                j = this.geometry.skinIndices[h].y;
            g = new THREE.Vector3(f.x, f.y, f.z), this.geometry.skinVerticesA.push(c[i].multiplyVector3(g)), g = new THREE.Vector3(f.x, f.y, f.z), this.geometry.skinVerticesB.push(c[j].multiplyVector3(g));
            if (this.geometry.skinWeights[h].x + this.geometry.skinWeights[h].y !== 1) {
                var k = (1 - (this.geometry.skinWeights[h].x + this.geometry.skinWeights[h].y)) * .5;
                this.geometry.skinWeights[h].x += k, this.geometry.skinWeights[h].y += k
            }
        }
    }
}, THREE.MorphAnimMesh = function(a, b) {
    THREE.Mesh.call(this, a, b), this.duration = 1e3, this.mirroredLoop = !1, this.time = 0, this.lastKeyframe = 0, this.currentKeyframe = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
}, THREE.MorphAnimMesh.prototype = new THREE.Mesh, THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh, THREE.MorphAnimMesh.prototype.setFrameRange = function(a, b) {
    this.startKeyframe = a, this.endKeyframe = b, this.length = this.endKeyframe - this.startKeyframe + 1
}, THREE.MorphAnimMesh.prototype.setDirectionForward = function() {
    this.direction = 1, this.directionBackwards = !1
}, THREE.MorphAnimMesh.prototype.setDirectionBackward = function() {
    this.direction = -1, this.directionBackwards = !0
}, THREE.MorphAnimMesh.prototype.parseAnimations = function() {
    var a = this.geometry;
    a.animations || (a.animations = {});
    var b, c = a.animations,
        d = /([a-z]+)(\d+)/;
    for (var e = 0, f = a.morphTargets.length; e < f; e++) {
        var g = a.morphTargets[e],
            h = g.name.match(d);
        if (h && h.length > 1) {
            var i = h[1],
                j = h[2];
            c[i] || (c[i] = {
                start: Infinity,
                end: -Infinity
            });
            var k = c[i];
            e < k.start && (k.start = e), e > k.end && (k.end = e), b || (b = i)
        }
    }
    a.firstAnimation = b
}, THREE.MorphAnimMesh.prototype.setAnimationLabel = function(a, b, c) {
    this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[a] = {
        start: b,
        end: c
    }
}, THREE.MorphAnimMesh.prototype.playAnimation = function(a, b) {
    var c = this.geometry.animations[a];
    c ? (this.setFrameRange(c.start, c.end), this.duration = 1e3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
}, THREE.MorphAnimMesh.prototype.updateAnimation = function(a) {
    var b = this.duration / this.length;
    this.time += this.direction * a;
    if (this.mirroredLoop) {
        if (this.time > this.duration || this.time < 0) this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), this.time < 0 && (this.time = 0, this.directionBackwards = !1)
    }
    else this.time = this.time % this.duration, this.time < 0 && (this.time += this.duration);
    var c = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
    c !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[c] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = c);
    var d = this.time % b / b;
    this.directionBackwards && (d = 1 - d), this.morphTargetInfluences[this.currentKeyframe] = d, this.morphTargetInfluences[this.lastKeyframe] = 1 - d
}, THREE.Ribbon = function(a, b) {
    THREE.Object3D.call(this), this.geometry = a, this.material = b
}, THREE.Ribbon.prototype = new THREE.Object3D, THREE.Ribbon.prototype.constructor = THREE.Ribbon, THREE.LOD = function() {
    THREE.Object3D.call(this), this.LODs = []
}, THREE.LOD.prototype = new THREE.Object3D, THREE.LOD.prototype.constructor = THREE.LOD, THREE.LOD.prototype.supr = THREE.Object3D.prototype, THREE.LOD.prototype.addLevel = function(a, b) {
    b === undefined && (b = 0), b = Math.abs(b);
    for (var c = 0; c < this.LODs.length; c++) if (b < this.LODs[c].visibleAtDistance) break;
    this.LODs.splice(c, 0, {
        visibleAtDistance: b,
        object3D: a
    }), this.add(a)
}, THREE.LOD.prototype.update = function(a) {
    if (this.LODs.length > 1) {
        a.matrixWorldInverse.getInverse(a.matrixWorld);
        var b = a.matrixWorldInverse,
            c = -(b.elements[2] * this.matrixWorld.elements[12] + b.elements[6] * this.matrixWorld.elements[13] + b.elements[10] * this.matrixWorld.elements[14] + b.elements[14]);
        this.LODs[0].object3D.visible = !0;
        for (var d = 1; d < this.LODs.length; d++) {
            if (!(c >= this.LODs[d].visibleAtDistance)) break;
            this.LODs[d - 1].object3D.visible = !1, this.LODs[d].object3D.visible = !0
        }
        for (; d < this.LODs.length; d++) this.LODs[d].object3D.visible = !1
    }
}, THREE.Sprite = function(a) {
    THREE.Object3D.call(this), this.color = a.color !== undefined ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = a.map !== undefined ? a.map : new THREE.Texture, this.blending = a.blending !== undefined ? a.blending : THREE.NormalBlending, this.blendSrc = a.blendSrc !== undefined ? a.blendSrc : THREE.SrcAlphaFactor, this.blendDst = a.blendDst !== undefined ? a.blendDst : THREE.OneMinusSrcAlphaFactor, this.blendEquation = a.blendEquation !== undefined ? a.blendEquation : THREE.AddEquation, this.useScreenCoordinates = a.useScreenCoordinates !== undefined ? a.useScreenCoordinates : !0, this.mergeWith3D = a.mergeWith3D !== undefined ? a.mergeWith3D : !this.useScreenCoordinates, this.affectedByDistance = a.affectedByDistance !== undefined ? a.affectedByDistance : !this.useScreenCoordinates, this.scaleByViewport = a.scaleByViewport !== undefined ? a.scaleByViewport : !this.affectedByDistance, this.alignment = a.alignment instanceof THREE.Vector2 ? a.alignment : THREE.SpriteAlignment.center, this.rotation3d = this.rotation, this.rotation = 0, this.opacity = 1, this.uvOffset = new THREE.Vector2(0, 0), this.uvScale = new THREE.Vector2(1, 1)
}, THREE.Sprite.prototype = new THREE.Object3D, THREE.Sprite.prototype.constructor = THREE.Sprite, THREE.Sprite.prototype.updateMatrix = function() {
    this.matrix.setPosition(this.position), this.rotation3d.set(0, 0, this.rotation), this.matrix.setRotationFromEuler(this.rotation3d);
    if (this.scale.x !== 1 || this.scale.y !== 1) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, this.scale.y);
    this.matrixWorldNeedsUpdate = !0
}, THREE.SpriteAlignment = {}, THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1), THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1), THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1), THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0), THREE.SpriteAlignment.center = new THREE.Vector2(0, 0), THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0), THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1), THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1), THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1), THREE.Scene = function() {
    THREE.Object3D.call(this), this.fog = null, this.overrideMaterial = null, this.matrixAutoUpdate = !1, this.__objects = [], this.__lights = [], this.__objectsAdded = [], this.__objectsRemoved = []
}, THREE.Scene.prototype = new THREE.Object3D, THREE.Scene.prototype.constructor = THREE.Scene, THREE.Scene.prototype.__addObject = function(a) {
    if (a instanceof THREE.Light) this.__lights.indexOf(a) === -1 && this.__lights.push(a);
    else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && this.__objects.indexOf(a) === -1) {
        this.__objects.push(a), this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a);
        b !== -1 && this.__objectsRemoved.splice(b, 1)
    }
    for (var c = 0; c < a.children.length; c++) this.__addObject(a.children[c])
}, THREE.Scene.prototype.__removeObject = function(a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a);
        b !== -1 && this.__lights.splice(b, 1)
    }
    else if (!(a instanceof THREE.Camera)) {
        var b = this.__objects.indexOf(a);
        if (b !== -1) {
            this.__objects.splice(b, 1), this.__objectsRemoved.push(a);
            var c = this.__objectsAdded.indexOf(a);
            c !== -1 && this.__objectsAdded.splice(c, 1)
        }
    }
    for (var d = 0; d < a.children.length; d++) this.__removeObject(a.children[d])
}, THREE.Fog = function(a, b, c) {
    this.color = new THREE.Color(a), this.near = b !== undefined ? b : 1, this.far = c !== undefined ? c : 1e3
}, THREE.FogExp2 = function(a, b) {
    this.color = new THREE.Color(a), this.density = b !== undefined ? b : 25e-5
}, THREE.DOMRenderer = function() {
    console.log("THREE.DOMRenderer", THREE.REVISION);
    var a, b, c, d, e, f, g, h = new THREE.Projector,
        i = function(a) {
            var b = document.documentElement;
            for (var c = 0; c < a.length; c++) if (typeof b.style[a[c]] == "string") return a[c];
            return null
        };
    g = i(["transform", "MozTransform", "WebkitTransform", "msTransform", "OTransform"]), this.domElement = document.createElement("div"), this.setSize = function(a, b) {
        c = a, d = b, e = c / 2, f = d / 2
    }, this.render = function(c, d) {
        var i, j, m, o, p, q;
        a = h.projectScene(c, d), b = a.elements;
        for (i = 0, j = b.length; i < j; i++) {
            m = b[i];
            if (m instanceof THREE.RenderableParticle && m.material instanceof THREE.ParticleDOMMaterial) {
                o = m.material.domElement, p = m.x * e + e - (o.offsetWidth >> 1), q = m.y * f + f - (o.offsetHeight >> 1), o.style.left = p + "px", o.style.top = q + "px", o.style.zIndex = Math.abs(Math.floor((1 - m.z) * d.far / d.near));
                if (g) {
                    var r = m.scale.x * e,
                        s = m.scale.y * f,
                        t = "scale(" + r + "," + s + ")";
                    o.style[g] = t
                }
            }
        }
    }
}, THREE.CanvasRenderer = function(a) {
    function sb(a) {
        o != a && (l.globalAlpha = o = a)
    }
    function tb(a) {
        if (p != a) {
            switch (a) {
            case THREE.NormalBlending:
                l.globalCompositeOperation = "source-over";
                break;
            case THREE.AdditiveBlending:
                l.globalCompositeOperation = "lighter"
            }
            p = a
        }
    }
    function ub(a) {
        s != a && (l.lineWidth = s = a)
    }
    function vb(a) {
        t != a && (l.lineCap = t = a)
    }
    function wb(a) {
        u != a && (l.lineJoin = u = a)
    }
    function xb(a) {
        q != a && (l.strokeStyle = q = a)
    }
    function yb(a) {
        r != a && (l.fillStyle = r = a)
    }
    console.log("THREE.CanvasRenderer", THREE.REVISION), a = a || {};
    var b = this,
        c, d, e, f = new THREE.Projector,
        g = a.canvas !== undefined ? a.canvas : document.createElement("canvas"),
        h, i, j, k, l = g.getContext("2d"),
        m = new THREE.Color(0),
        n = 0,
        o = 1,
        p = 0,
        q = null,
        r = null,
        s = null,
        t = null,
        u = null,
        v, w, x, y, z = new THREE.RenderableVertex,
        A = new THREE.RenderableVertex,
        B, C, D, E, F, G, H, I, J, K, L, M, N = new THREE.Color,
        O = new THREE.Color,
        P = new THREE.Color,
        Q = new THREE.Color,
        R = new THREE.Color,
        S = [],
        T = [],
        U, V, W, X, Y, Z, $, _, ab, bb, cb = new THREE.Rectangle,
        db = new THREE.Rectangle,
        eb = new THREE.Rectangle,
        fb = !1,
        gb = new THREE.Color,
        hb = new THREE.Color,
        ib = new THREE.Color,
        jb = Math.PI * 2,
        kb = new THREE.Vector3,
        lb, mb, nb, ob, pb, qb, rb = 16;
    lb = document.createElement("canvas"), lb.width = lb.height = 2, mb = lb.getContext("2d"), mb.fillStyle = "rgba(0,0,0,1)", mb.fillRect(0, 0, 2, 2), nb = mb.getImageData(0, 0, 2, 2), ob = nb.data, pb = document.createElement("canvas"), pb.width = pb.height = rb, qb = pb.getContext("2d"), qb.translate(-rb / 2, -rb / 2), qb.scale(rb, rb), rb--, this.domElement = g, this.autoClear = !0, this.sortObjects = !0, this.sortElements = !0, this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    }, this.setSize = function(a, b) {
        h = a, i = b, j = Math.floor(h / 2), k = Math.floor(i / 2), g.width = h, g.height = i, cb.set(-j, -k, j, k), db.set(-j, -k, j, k), o = 1, p = 0, q = null, r = null, s = null, t = null, u = null
    }, this.setClearColor = function(a, b) {
        m.copy(a), n = b !== undefined ? b : 1, db.set(-j, -k, j, k)
    }, this.setClearColorHex = function(a, b) {
        m.setHex(a), n = b !== undefined ? b : 1, db.set(-j, -k, j, k)
    }, this.clear = function() {
        l.setTransform(1, 0, 0, -1, j, k), db.isEmpty() || (db.minSelf(cb), db.inflate(2), n < 1 && l.clearRect(Math.floor(db.getX()), Math.floor(db.getY()), Math.floor(db.getWidth()), Math.floor(db.getHeight())), n > 0 && (tb(THREE.NormalBlending), sb(1), yb("rgba(" + Math.floor(m.r * 255) + "," + Math.floor(m.g * 255) + "," + Math.floor(m.b * 255) + "," + n + ")"), l.fillRect(Math.floor(db.getX()), Math.floor(db.getY()), Math.floor(db.getWidth()), Math.floor(db.getHeight()))), db.empty())
    }, this.render = function(a, g) {
        function o(a) {
            var b, c, d, e;
            gb.setRGB(0, 0, 0), hb.setRGB(0, 0, 0), ib.setRGB(0, 0, 0);
            for (b = 0, c = a.length; b < c; b++) d = a[b], e = d.color, d instanceof THREE.AmbientLight ? (gb.r += e.r, gb.g += e.g, gb.b += e.b) : d instanceof THREE.DirectionalLight ? (hb.r += e.r, hb.g += e.g, hb.b += e.b) : d instanceof THREE.PointLight && (ib.r += e.r, ib.g += e.g, ib.b += e.b)
        }
        function p(a, b, c, d) {
            var e, f, g, h, i, j;
            for (e = 0, f = a.length; e < f; e++) {
                g = a[e], h = g.color;
                if (g instanceof THREE.DirectionalLight) {
                    i = g.matrixWorld.getPosition(), j = c.dot(i);
                    if (j <= 0) continue;
                    j *= g.intensity, d.r += h.r * j, d.g += h.g * j, d.b += h.b * j
                }
                else if (g instanceof THREE.PointLight) {
                    i = g.matrixWorld.getPosition(), j = c.dot(kb.sub(i, b).normalize());
                    if (j <= 0) continue;
                    j *= g.distance == 0 ? 1 : 1 - Math.min(b.distanceTo(i) / g.distance, 1);
                    if (j == 0) continue;
                    j *= g.intensity, d.r += h.r * j, d.g += h.g * j, d.b += h.b * j
                }
            }
        }
        function q(a, b, c, d) {
            sb(c.opacity), tb(c.blending);
            var e, f, g, h, i, m, n;
            if (c instanceof THREE.ParticleBasicMaterial) {
                if (c.map) {
                    i = c.map.image, m = i.width >> 1, n = i.height >> 1, g = b.scale.x * j, h = b.scale.y * k, e = g * m, f = h * n, eb.set(a.x - e, a.y - f, a.x + e, a.y + f);
                    if (!cb.intersects(eb)) return;
                    l.save(), l.translate(a.x, a.y), l.rotate(-b.rotation), l.scale(g, -h), l.translate(-m, -n), l.drawImage(i, 0, 0), l.restore()
                }
            }
            else if (c instanceof THREE.ParticleCanvasMaterial) {
                e = b.scale.x * j, f = b.scale.y * k, eb.set(a.x - e, a.y - f, a.x + e, a.y + f);
                if (!cb.intersects(eb)) return;
                xb(c.color.getContextStyle()), yb(c.color.getContextStyle()), l.save(), l.translate(a.x, a.y), l.rotate(-b.rotation), l.scale(e, f), c.program(l), l.restore()
            }
        }
        function r(a, b, c, d, e) {
            sb(d.opacity), tb(d.blending), l.beginPath(), l.moveTo(a.positionScreen.x, a.positionScreen.y), l.lineTo(b.positionScreen.x, b.positionScreen.y), l.closePath(), d instanceof THREE.LineBasicMaterial && (ub(d.linewidth), vb(d.linecap), wb(d.linejoin), xb(d.color.getContextStyle()), l.stroke(), eb.inflate(d.linewidth * 2))
        }
        function s(a, c, d, f, h, i, j, k, l) {
            b.info.render.vertices += 3, b.info.render.faces++, sb(k.opacity), tb(k.blending), B = a.positionScreen.x, C = a.positionScreen.y, D = c.positionScreen.x, E = c.positionScreen.y, F = d.positionScreen.x, G = d.positionScreen.y, u(B, C, D, E, F, G);
            if (k instanceof THREE.MeshBasicMaterial) if (k.map) k.map.mapping instanceof THREE.UVMapping && (X = j.uvs[0], Ab(B, C, D, E, F, G, X[f].u, X[f].v, X[h].u, X[h].v, X[i].u, X[i].v, k.map));
            else if (k.envMap) {
                if (k.envMap.mapping instanceof THREE.SphericalReflectionMapping) {
                    var m = g.matrixWorldInverse;
                    kb.copy(j.vertexNormalsWorld[f]), Y = (kb.x * m.elements[0] + kb.y * m.elements[4] + kb.z * m.elements[8]) * .5 + .5, Z = -(kb.x * m.elements[1] + kb.y * m.elements[5] + kb.z * m.elements[9]) * .5 + .5, kb.copy(j.vertexNormalsWorld[h]), $ = (kb.x * m.elements[0] + kb.y * m.elements[4] + kb.z * m.elements[8]) * .5 + .5, _ = -(kb.x * m.elements[1] + kb.y * m.elements[5] + kb.z * m.elements[9]) * .5 + .5, kb.copy(j.vertexNormalsWorld[i]), ab = (kb.x * m.elements[0] + kb.y * m.elements[4] + kb.z * m.elements[8]) * .5 + .5, bb = -(kb.x * m.elements[1] + kb.y * m.elements[5] + kb.z * m.elements[9]) * .5 + .5, Ab(B, C, D, E, F, G, Y, Z, $, _, ab, bb, k.envMap)
                }
            }
            else k.wireframe ? rb(k.color, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(k.color);
            else k instanceof THREE.MeshLambertMaterial ? fb ? !k.wireframe && k.shading == THREE.SmoothShading && j.vertexNormalsWorld.length == 3 ? (O.r = P.r = Q.r = gb.r, O.g = P.g = Q.g = gb.g, O.b = P.b = Q.b = gb.b, p(e, j.v1.positionWorld, j.vertexNormalsWorld[0], O), p(e, j.v2.positionWorld, j.vertexNormalsWorld[1], P), p(e, j.v3.positionWorld, j.vertexNormalsWorld[2], Q), O.r = Math.max(0, Math.min(k.color.r * O.r, 1)), O.g = Math.max(0, Math.min(k.color.g * O.g, 1)), O.b = Math.max(0, Math.min(k.color.b * O.b, 1)), P.r = Math.max(0, Math.min(k.color.r * P.r, 1)), P.g = Math.max(0, Math.min(k.color.g * P.g, 1)), P.b = Math.max(0, Math.min(k.color.b * P.b, 1)), Q.r = Math.max(0, Math.min(k.color.r * Q.r, 1)), Q.g = Math.max(0, Math.min(k.color.g * Q.g, 1)), Q.b = Math.max(0, Math.min(k.color.b * Q.b, 1)), R.r = (P.r + Q.r) * .5, R.g = (P.g + Q.g) * .5, R.b = (P.b + Q.b) * .5, W = Cb(O, P, Q, R), Bb(B, C, D, E, F, G, 0, 0, 1, 0, 0, 1, W)) : (N.r = gb.r, N.g = gb.g, N.b = gb.b, p(e, j.centroidWorld, j.normalWorld, N), N.r = Math.max(0, Math.min(k.color.r * N.r, 1)), N.g = Math.max(0, Math.min(k.color.g * N.g, 1)), N.b = Math.max(0, Math.min(k.color.b * N.b, 1)), k.wireframe ? rb(N, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(N)) : k.wireframe ? rb(k.color, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(k.color) : k instanceof THREE.MeshDepthMaterial ? (U = g.near, V = g.far, O.r = O.g = O.b = 1 - Db(a.positionScreen.z, U, V), P.r = P.g = P.b = 1 - Db(c.positionScreen.z, U, V), Q.r = Q.g = Q.b = 1 - Db(d.positionScreen.z, U, V), R.r = (P.r + Q.r) * .5, R.g = (P.g + Q.g) * .5, R.b = (P.b + Q.b) * .5, W = Cb(O, P, Q, R), Bb(B, C, D, E, F, G, 0, 0, 1, 0, 0, 1, W)) : k instanceof THREE.MeshNormalMaterial && (N.r = Eb(j.normalWorld.x), N.g = Eb(j.normalWorld.y), N.b = Eb(j.normalWorld.z), k.wireframe ? rb(N, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(N))
        }
        function t(a, c, d, f, h, i, j, k, l) {
            b.info.render.vertices += 4, b.info.render.faces++, sb(k.opacity), tb(k.blending);
            if (k.map || k.envMap) {
                s(a, c, f, 0, 1, 3, j, k, l), s(h, d, i, 1, 2, 3, j, k, l);
                return
            }
            B = a.positionScreen.x, C = a.positionScreen.y, D = c.positionScreen.x, E = c.positionScreen.y, F = d.positionScreen.x, G = d.positionScreen.y, H = f.positionScreen.x, I = f.positionScreen.y, J = h.positionScreen.x, K = h.positionScreen.y, L = i.positionScreen.x, M = i.positionScreen.y, k instanceof THREE.MeshBasicMaterial ? (jb(B, C, D, E, F, G, H, I), k.wireframe ? rb(k.color, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(k.color)) : k instanceof THREE.MeshLambertMaterial ? fb ? !k.wireframe && k.shading == THREE.SmoothShading && j.vertexNormalsWorld.length == 4 ? (O.r = P.r = Q.r = R.r = gb.r, O.g = P.g = Q.g = R.g = gb.g, O.b = P.b = Q.b = R.b = gb.b, p(e, j.v1.positionWorld, j.vertexNormalsWorld[0], O), p(e, j.v2.positionWorld, j.vertexNormalsWorld[1], P), p(e, j.v4.positionWorld, j.vertexNormalsWorld[3], Q), p(e, j.v3.positionWorld, j.vertexNormalsWorld[2], R), O.r = Math.max(0, Math.min(k.color.r * O.r, 1)), O.g = Math.max(0, Math.min(k.color.g * O.g, 1)), O.b = Math.max(0, Math.min(k.color.b * O.b, 1)), P.r = Math.max(0, Math.min(k.color.r * P.r, 1)), P.g = Math.max(0, Math.min(k.color.g * P.g, 1)), P.b = Math.max(0, Math.min(k.color.b * P.b, 1)), Q.r = Math.max(0, Math.min(k.color.r * Q.r, 1)), Q.g = Math.max(0, Math.min(k.color.g * Q.g, 1)), Q.b = Math.max(0, Math.min(k.color.b * Q.b, 1)), R.r = Math.max(0, Math.min(k.color.r * R.r, 1)), R.g = Math.max(0, Math.min(k.color.g * R.g, 1)), R.b = Math.max(0, Math.min(k.color.b * R.b, 1)), W = Cb(O, P, Q, R), u(B, C, D, E, H, I), Bb(B, C, D, E, H, I, 0, 0, 1, 0, 0, 1, W), u(J, K, F, G, L, M), Bb(J, K, F, G, L, M, 1, 0, 1, 1, 0, 1, W)) : (N.r = gb.r, N.g = gb.g, N.b = gb.b, p(e, j.centroidWorld, j.normalWorld, N), N.r = Math.max(0, Math.min(k.color.r * N.r, 1)), N.g = Math.max(0, Math.min(k.color.g * N.g, 1)), N.b = Math.max(0, Math.min(k.color.b * N.b, 1)), jb(B, C, D, E, F, G, H, I), k.wireframe ? rb(N, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(N)) : (jb(B, C, D, E, F, G, H, I), k.wireframe ? rb(k.color, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(k.color)) : k instanceof THREE.MeshNormalMaterial ? (N.r = Eb(j.normalWorld.x), N.g = Eb(j.normalWorld.y), N.b = Eb(j.normalWorld.z), jb(B, C, D, E, F, G, H, I), k.wireframe ? rb(N, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : zb(N)) : k instanceof THREE.MeshDepthMaterial && (U = g.near, V = g.far, O.r = O.g = O.b = 1 - Db(a.positionScreen.z, U, V), P.r = P.g = P.b = 1 - Db(c.positionScreen.z, U, V), Q.r = Q.g = Q.b = 1 - Db(f.positionScreen.z, U, V), R.r = R.g = R.b = 1 - Db(d.positionScreen.z, U, V), W = Cb(O, P, Q, R), u(B, C, D, E, H, I), Bb(B, C, D, E, H, I, 0, 0, 1, 0, 0, 1, W), u(J, K, F, G, L, M), Bb(J, K, F, G, L, M, 1, 0, 1, 1, 0, 1, W))
        }
        function u(a, b, c, d, e, f) {
            l.beginPath(), l.moveTo(a, b), l.lineTo(c, d), l.lineTo(e, f), l.lineTo(a, b), l.closePath()
        }
        function jb(a, b, c, d, e, f, g, h) {
            l.beginPath(), l.moveTo(a, b), l.lineTo(c, d), l.lineTo(e, f), l.lineTo(g, h), l.lineTo(a, b), l.closePath()
        }
        function rb(a, b, c, d) {
            ub(b), vb(c), wb(d), xb(a.getContextStyle()), l.stroke(), eb.inflate(b * 2)
        }
        function zb(a) {
            yb(a.getContextStyle()), l.fill()
        }
        function Ab(a, b, c, d, e, f, g, h, i, j, k, m, n) {
            if (n.image.width == 0) return;
            if (n.needsUpdate == 1 || S[n.id] == undefined) {
                var o = n.wrapS == THREE.RepeatWrapping,
                    p = n.wrapT == THREE.RepeatWrapping;
                S[n.id] = l.createPattern(n.image, o && p ? "repeat" : o && !p ? "repeat-x" : !o && p ? "repeat-y" : "no-repeat"), n.needsUpdate = !1
            }
            yb(S[n.id]);
            var q, r, s, t, u, v, w, x, y = n.offset.x / n.repeat.x,
                z = n.offset.y / n.repeat.y,
                A = n.image.width * n.repeat.x,
                B = n.image.height * n.repeat.y;
            g = (g + y) * A, h = (h + z) * B, i = (i + y) * A, j = (j + z) * B, k = (k + y) * A, m = (m + z) * B, c -= a, d -= b, e -= a, f -= b, i -= g, j -= h, k -= g, m -= h, w = i * m - k * j;
            if (w == 0) {
                if (T[n.id] === undefined) {
                    var C = document.createElement("canvas");
                    C.width = n.image.width, C.height = n.image.height;
                    var D = C.getContext("2d");
                    D.drawImage(n.image, 0, 0), T[n.id] = D.getImageData(0, 0, n.image.width, n.image.height).data
                }
                var E = T[n.id],
                    F = (Math.floor(g) + Math.floor(h) * n.image.width) * 4;
                N.setRGB(E[F] / 255, E[F + 1] / 255, E[F + 2] / 255), zb(N);
                return
            }
            x = 1 / w, q = (m * c - j * e) * x, r = (m * d - j * f) * x, s = (i * e - k * c) * x, t = (i * f - k * d) * x, u = a - q * g - s * h, v = b - r * g - t * h, l.save(), l.transform(q, r, s, t, u, v), l.fill(), l.restore()
        }
        function Bb(a, b, c, d, e, f, g, h, i, j, k, m, n) {
            var o, p, q, r, s, t, u, v, w = n.width - 1,
                x = n.height - 1;
            g *= w, h *= x, i *= w, j *= x, k *= w, m *= x, c -= a, d -= b, e -= a, f -= b, i -= g, j -= h, k -= g, m -= h, u = i * m - k * j, v = 1 / u, o = (m * c - j * e) * v, p = (m * d - j * f) * v, q = (i * e - k * c) * v, r = (i * f - k * d) * v, s = a - o * g - q * h, t = b - p * g - r * h, l.save(), l.transform(o, p, q, r, s, t), l.clip(), l.drawImage(n, 0, 0), l.restore()
        }
        function Cb(a, b, c, d) {
            var e = ~~ (a.r * 255),
                f = ~~ (a.g * 255),
                g = ~~ (a.b * 255),
                h = ~~ (b.r * 255),
                i = ~~ (b.g * 255),
                j = ~~ (b.b * 255),
                k = ~~ (c.r * 255),
                l = ~~ (c.g * 255),
                m = ~~ (c.b * 255),
                n = ~~ (d.r * 255),
                o = ~~ (d.g * 255),
                p = ~~ (d.b * 255);
            return ob[0] = e < 0 ? 0 : e > 255 ? 255 : e, ob[1] = f < 0 ? 0 : f > 255 ? 255 : f, ob[2] = g < 0 ? 0 : g > 255 ? 255 : g, ob[4] = h < 0 ? 0 : h > 255 ? 255 : h, ob[5] = i < 0 ? 0 : i > 255 ? 255 : i, ob[6] = j < 0 ? 0 : j > 255 ? 255 : j, ob[8] = k < 0 ? 0 : k > 255 ? 255 : k, ob[9] = l < 0 ? 0 : l > 255 ? 255 : l, ob[10] = m < 0 ? 0 : m > 255 ? 255 : m, ob[12] = n < 0 ? 0 : n > 255 ? 255 : n, ob[13] = o < 0 ? 0 : o > 255 ? 255 : o, ob[14] = p < 0 ? 0 : p > 255 ? 255 : p, mb.putImageData(nb, 0, 0), qb.drawImage(lb, 0, 0), pb
        }
        function Db(a, b, c) {
            var d = (a - b) / (c - b);
            return d * d * (3 - 2 * d)
        }
        function Eb(a) {
            var b = (a + 1) * .5;
            return b < 0 ? 0 : b > 1 ? 1 : b
        }
        function Fb(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y,
                e = c * c + d * d,
                f;
            if (e == 0) return;
            f = 1 / Math.sqrt(e), c *= f, d *= f, b.x += c, b.y += d, a.x -= c, a.y -= d
        }
        var h, i, m, n;
        this.autoClear ? this.clear() : l.setTransform(1, 0, 0, -1, j, k), b.info.render.vertices = 0, b.info.render.faces = 0, c = f.projectScene(a, g, this.sortElements), d = c.elements, e = c.lights, fb = e.length > 0, fb && o(e);
        for (h = 0, i = d.length; h < i; h++) {
            m = d[h], n = m.material, n = n instanceof THREE.MeshFaceMaterial ? m.faceMaterial : n;
            if (n === undefined || n.visible === !1) continue;
            eb.empty(), m instanceof THREE.RenderableParticle ? (v = m, v.x *= j, v.y *= k, q(v, m, n, a)) : m instanceof THREE.RenderableLine ? (v = m.v1, w = m.v2, v.positionScreen.x *= j, v.positionScreen.y *= k, w.positionScreen.x *= j, w.positionScreen.y *= k, eb.addPoint(v.positionScreen.x, v.positionScreen.y), eb.addPoint(w.positionScreen.x, w.positionScreen.y), cb.intersects(eb) && r(v, w, m, n, a)) : m instanceof THREE.RenderableFace3 ? (v = m.v1, w = m.v2, x = m.v3, v.positionScreen.x *= j, v.positionScreen.y *= k, w.positionScreen.x *= j, w.positionScreen.y *= k, x.positionScreen.x *= j, x.positionScreen.y *= k, n.overdraw && (Fb(v.positionScreen, w.positionScreen), Fb(w.positionScreen, x.positionScreen), Fb(x.positionScreen, v.positionScreen)), eb.add3Points(v.positionScreen.x, v.positionScreen.y, w.positionScreen.x, w.positionScreen.y, x.positionScreen.x, x.positionScreen.y), cb.intersects(eb) && s(v, w, x, 0, 1, 2, m, n, a)) : m instanceof THREE.RenderableFace4 && (v = m.v1, w = m.v2, x = m.v3, y = m.v4, v.positionScreen.x *= j, v.positionScreen.y *= k, w.positionScreen.x *= j, w.positionScreen.y *= k, x.positionScreen.x *= j, x.positionScreen.y *= k, y.positionScreen.x *= j, y.positionScreen.y *= k, z.positionScreen.copy(w.positionScreen), A.positionScreen.copy(y.positionScreen), n.overdraw && (Fb(v.positionScreen, w.positionScreen), Fb(w.positionScreen, y.positionScreen), Fb(y.positionScreen, v.positionScreen), Fb(x.positionScreen, z.positionScreen), Fb(x.positionScreen, A.positionScreen)), eb.addPoint(v.positionScreen.x, v.positionScreen.y), eb.addPoint(w.positionScreen.x, w.positionScreen.y), eb.addPoint(x.positionScreen.x, x.positionScreen.y), eb.addPoint(y.positionScreen.x, y.positionScreen.y), cb.intersects(eb) && t(v, w, x, y, z, A, m, n, a)), db.addRectangle(eb)
        }
        l.setTransform(1, 0, 0, 1, 0, 0)
    }
}, THREE.SVGRenderer = function() {
    function F(a) {
        var b, c, d, e;
        s.setRGB(0, 0, 0), t.setRGB(0, 0, 0), u.setRGB(0, 0, 0);
        for (b = 0, c = a.length; b < c; b++) d = a[b], e = d.color, d instanceof THREE.AmbientLight ? (s.r += e.r, s.g += e.g, s.b += e.b) : d instanceof THREE.DirectionalLight ? (t.r += e.r, t.g += e.g, t.b += e.b) : d instanceof THREE.PointLight && (u.r += e.r, u.g += e.g, u.b += e.b)
    }
    function G(a, b, c, d) {
        var e, f, g, h, i, j;
        for (e = 0, f = a.length; e < f; e++) {
            g = a[e], h = g.color;
            if (g instanceof THREE.DirectionalLight) {
                i = g.matrixWorld.getPosition(), j = c.dot(i);
                if (j <= 0) continue;
                j *= g.intensity, d.r += h.r * j, d.g += h.g * j, d.b += h.b * j
            }
            else if (g instanceof THREE.PointLight) {
                i = g.matrixWorld.getPosition(), j = c.dot(w.sub(i, b).normalize());
                if (j <= 0) continue;
                j *= g.distance == 0 ? 1 : 1 - Math.min(b.distanceTo(i) / g.distance, 1);
                if (j == 0) continue;
                j *= g.intensity, d.r += h.r * j, d.g += h.g * j, d.b += h.b * j
            }
        }
    }
    function H(a, b, c, d) {}
    function I(a, b, c, d, e) {
        A = L(D++), A.setAttribute("x1", a.positionScreen.x), A.setAttribute("y1", a.positionScreen.y), A.setAttribute("x2", b.positionScreen.x), A.setAttribute("y2", b.positionScreen.y), d instanceof THREE.LineBasicMaterial && (A.setAttribute("style", "fill: none; stroke: " + d.color.getContextStyle() + "; stroke-width: " + d.linewidth + "; stroke-opacity: " + d.opacity + "; stroke-linecap: " + d.linecap + "; stroke-linejoin: " + d.linejoin), f.appendChild(A))
    }
    function J(b, c, e, g, h, i) {
        a.info.render.vertices += 3, a.info.render.faces++, A = M(B++), A.setAttribute("d", "M " + b.positionScreen.x + " " + b.positionScreen.y + " L " + c.positionScreen.x + " " + c.positionScreen.y + " L " + e.positionScreen.x + "," + e.positionScreen.y + "z"), h instanceof THREE.MeshBasicMaterial ? r.copy(h.color) : h instanceof THREE.MeshLambertMaterial ? q ? (r.r = s.r, r.g = s.g, r.b = s.b, G(d, g.centroidWorld, g.normalWorld, r), r.r = Math.max(0, Math.min(h.color.r * r.r, 1)), r.g = Math.max(0, Math.min(h.color.g * r.g, 1)), r.b = Math.max(0, Math.min(h.color.b * r.b, 1))) : r.copy(h.color) : h instanceof THREE.MeshDepthMaterial ? (v = 1 - h.__2near / (h.__farPlusNear - g.z * h.__farMinusNear), r.setRGB(v, v, v)) : h instanceof THREE.MeshNormalMaterial && r.setRGB(O(g.normalWorld.x), O(g.normalWorld.y), O(g.normalWorld.z)), h.wireframe ? A.setAttribute("style", "fill: none; stroke: " + r.getContextStyle() + "; stroke-width: " + h.wireframeLinewidth + "; stroke-opacity: " + h.opacity + "; stroke-linecap: " + h.wireframeLinecap + "; stroke-linejoin: " + h.wireframeLinejoin) : A.setAttribute("style", "fill: " + r.getContextStyle() + "; fill-opacity: " + h.opacity), f.appendChild(A)
    }
    function K(b, c, e, g, h, i, j) {
        a.info.render.vertices += 4, a.info.render.faces++, A = M(B++), A.setAttribute("d", "M " + b.positionScreen.x + " " + b.positionScreen.y + " L " + c.positionScreen.x + " " + c.positionScreen.y + " L " + e.positionScreen.x + "," + e.positionScreen.y + " L " + g.positionScreen.x + "," + g.positionScreen.y + "z"), i instanceof THREE.MeshBasicMaterial ? r.copy(i.color) : i instanceof THREE.MeshLambertMaterial ? q ? (r.r = s.r, r.g = s.g, r.b = s.b, G(d, h.centroidWorld, h.normalWorld, r), r.r = Math.max(0, Math.min(i.color.r * r.r, 1)), r.g = Math.max(0, Math.min(i.color.g * r.g, 1)), r.b = Math.max(0, Math.min(i.color.b * r.b, 1))) : r.copy(i.color) : i instanceof THREE.MeshDepthMaterial ? (v = 1 - i.__2near / (i.__farPlusNear - h.z * i.__farMinusNear), r.setRGB(v, v, v)) : i instanceof THREE.MeshNormalMaterial && r.setRGB(O(h.normalWorld.x), O(h.normalWorld.y), O(h.normalWorld.z)), i.wireframe ? A.setAttribute("style", "fill: none; stroke: " + r.getContextStyle() + "; stroke-width: " + i.wireframeLinewidth + "; stroke-opacity: " + i.opacity + "; stroke-linecap: " + i.wireframeLinecap + "; stroke-linejoin: " + i.wireframeLinejoin) : A.setAttribute("style", "fill: " + r.getContextStyle() + "; fill-opacity: " + i.opacity), f.appendChild(A)
    }
    function L(a) {
        return z[a] == null ? (z[a] = document.createElementNS("http://www.w3.org/2000/svg", "line"), E == 0 && z[a].setAttribute("shape-rendering", "crispEdges"), z[a]) : z[a]
    }
    function M(a) {
        return x[a] == null ? (x[a] = document.createElementNS("http://www.w3.org/2000/svg", "path"), E == 0 && x[a].setAttribute("shape-rendering", "crispEdges"), x[a]) : x[a]
    }
    function N(a) {
        return y[a] == null ? (y[a] = document.createElementNS("http://www.w3.org/2000/svg", "circle"), E == 0 && y[a].setAttribute("shape-rendering", "crispEdges"), y[a]) : y[a]
    }
    function O(a) {
        var b = (a + 1) * .5;
        return b < 0 ? 0 : b > 1 ? 1 : b
    }
    function P(a) {
        while (a.length < 6) a = "0" + a;
        return a
    }
    console.log("THREE.SVGRenderer", THREE.REVISION);
    var a = this,
        b, c, d, e = new THREE.Projector,
        f = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        g, h, i, j, k, l, m, n, o = new THREE.Rectangle,
        p = new THREE.Rectangle,
        q = !1,
        r = new THREE.Color,
        s = new THREE.Color,
        t = new THREE.Color,
        u = new THREE.Color,
        v, w = new THREE.Vector3,
        x = [],
        y = [],
        z = [],
        A, B, C, D, E = 1;
    this.domElement = f, this.autoClear = !0, this.sortObjects = !0, this.sortElements = !0, this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    }, this.setQuality = function(a) {
        switch (a) {
        case "high":
            E = 1;
            break;
        case "low":
            E = 0
        }
    }, this.setSize = function(a, b) {
        g = a, h = b, i = g / 2, j = h / 2, f.setAttribute("viewBox", -i + " " + -j + " " + g + " " + h), f.setAttribute("width", g), f.setAttribute("height", h), o.set(-i, -j, i, j)
    }, this.clear = function() {
        while (f.childNodes.length > 0) f.removeChild(f.childNodes[0])
    }, this.render = function(f, g) {
        var h, r, s, t;
        this.autoClear && this.clear(), a.info.render.vertices = 0, a.info.render.faces = 0, b = e.projectScene(f, g, this.sortElements), c = b.elements, d = b.lights, B = 0, C = 0, D = 0, q = d.length > 0, q && F(d);
        for (h = 0, r = c.length; h < r; h++) {
            s = c[h], t = s.material, t = t instanceof THREE.MeshFaceMaterial ? s.faceMaterial : t;
            if (t === undefined || t.visible === !1) continue;
            p.empty();
            if (s instanceof THREE.RenderableParticle) k = s, k.x *= i, k.y *= -j, H(k, s, t, f);
            else if (s instanceof THREE.RenderableLine) {
                k = s.v1, l = s.v2, k.positionScreen.x *= i, k.positionScreen.y *= -j, l.positionScreen.x *= i, l.positionScreen.y *= -j, p.addPoint(k.positionScreen.x, k.positionScreen.y), p.addPoint(l.positionScreen.x, l.positionScreen.y);
                if (!o.intersects(p)) continue;
                I(k, l, s, t, f)
            }
            else if (s instanceof THREE.RenderableFace3) {
                k = s.v1, l = s.v2, m = s.v3, k.positionScreen.x *= i, k.positionScreen.y *= -j, l.positionScreen.x *= i, l.positionScreen.y *= -j, m.positionScreen.x *= i, m.positionScreen.y *= -j, p.addPoint(k.positionScreen.x, k.positionScreen.y), p.addPoint(l.positionScreen.x, l.positionScreen.y), p.addPoint(m.positionScreen.x, m.positionScreen.y);
                if (!o.intersects(p)) continue;
                J(k, l, m, s, t, f)
            }
            else if (s instanceof THREE.RenderableFace4) {
                k = s.v1, l = s.v2, m = s.v3, n = s.v4, k.positionScreen.x *= i, k.positionScreen.y *= -j, l.positionScreen.x *= i, l.positionScreen.y *= -j, m.positionScreen.x *= i, m.positionScreen.y *= -j, n.positionScreen.x *= i, n.positionScreen.y *= -j, p.addPoint(k.positionScreen.x, k.positionScreen.y), p.addPoint(l.positionScreen.x, l.positionScreen.y), p.addPoint(m.positionScreen.x, m.positionScreen.y), p.addPoint(n.positionScreen.x, n.positionScreen.y);
                if (!o.intersects(p)) continue;
                K(k, l, m, n, s, t, f)
            }
        }
    }
}, THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvWorldPosition = mPosition.xyz;\n#endif",
    lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\nvec3 transformedNormal = normalMatrix * morphedNormal;\n#else\nvec3 transformedNormal = normalMatrix * normal;\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n#ifdef USE_MORPHTARGETS\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );\n#else\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n#endif\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
}, THREE.UniformsUtils = {
    merge: function(a) {
        var b, c, d, e = {};
        for (b = 0; b < a.length; b++) {
            d = this.clone(a[b]);
            for (c in d) e[c] = d[c]
        }
        return e
    },
    clone: function(a) {
        var b, c, e, f = {};
        for (b in a) {
            f[b] = {};
            for (c in a[b]) e = a[b][c], e instanceof THREE.Color || e instanceof THREE.Vector2 || e instanceof THREE.Vector3 || e instanceof THREE.Vector4 || e instanceof THREE.Matrix4 || e instanceof THREE.Texture ? f[b][c] = e.clone() : e instanceof Array ? f[b][c] = e.slice() : f[b][c] = e
        }
        return f
    }
}, THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: .98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightColor: {
            type: "fv",
            value: []
        },
        spotLightPosition: {
            type: "fv",
            value: []
        },
        spotLightDirection: {
            type: "fv",
            value: []
        },
        spotLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightAngle: {
            type: "fv1",
            value: []
        },
        spotLightExponent: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: 6,
            texture: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
}, THREE.ShaderLib = {
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2e3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
        {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "varying vec3 vLightBack;", "#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, "#ifndef USE_ENVMAP", "vec4 mPosition = objectMatrix * vec4( position, 1.0 );", "#endif", THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "varying vec3 vLightBack;", "#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, "#ifdef DOUBLE_SIDED", "if ( gl_FrontFacing )", "gl_FragColor.xyz *= vLightFront;", "else", "gl_FragColor.xyz *= vLightBack;", "#else", "gl_FragColor.xyz *= vLightFront;", "#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
        {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["varying vec3 vViewPosition;", "varying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP", "vec4 mPosition = objectMatrix * vec4( position, 1.0 );", "#endif", "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.morphnormal_vertex, "vNormal = transformedNormal;", THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;", "uniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "#ifdef USE_SIZEATTENUATION", "gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "#else", "gl_PointSize = size;", "#endif", "gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
}, THREE.WebGLRenderer = function(a) {
    function W(a) {
        a.__webglVertexBuffer = m.createBuffer(), a.__webglColorBuffer = m.createBuffer(), l.info.geometries++
    }
    function X(a) {
        a.__webglVertexBuffer = m.createBuffer(), a.__webglColorBuffer = m.createBuffer(), l.info.memory.geometries++
    }
    function Y(a) {
        a.__webglVertexBuffer = m.createBuffer(), a.__webglColorBuffer = m.createBuffer(), l.info.memory.geometries++
    }
    function Z(a) {
        a.__webglVertexBuffer = m.createBuffer(), a.__webglNormalBuffer = m.createBuffer(), a.__webglTangentBuffer = m.createBuffer(), a.__webglColorBuffer = m.createBuffer(), a.__webglUVBuffer = m.createBuffer(), a.__webglUV2Buffer = m.createBuffer(), a.__webglSkinVertexABuffer = m.createBuffer(), a.__webglSkinVertexBBuffer = m.createBuffer(), a.__webglSkinIndicesBuffer = m.createBuffer(), a.__webglSkinWeightsBuffer = m.createBuffer(), a.__webglFaceBuffer = m.createBuffer(), a.__webglLineBuffer = m.createBuffer();
        var b, c;
        if (a.numMorphTargets) {
            a.__webglMorphTargetsBuffers = [];
            for (b = 0, c = a.numMorphTargets; b < c; b++) a.__webglMorphTargetsBuffers.push(m.createBuffer())
        }
        if (a.numMorphNormals) {
            a.__webglMorphNormalsBuffers = [];
            for (b = 0, c = a.numMorphNormals; b < c; b++) a.__webglMorphNormalsBuffers.push(m.createBuffer())
        }
        l.info.memory.geometries++
    }
    function $(a) {
        m.deleteBuffer(a.__webglVertexBuffer), m.deleteBuffer(a.__webglColorBuffer), l.info.memory.geometries--
    }
    function _(a) {
        m.deleteBuffer(a.__webglVertexBuffer), m.deleteBuffer(a.__webglColorBuffer), l.info.memory.geometries--
    }
    function ab(a) {
        m.deleteBuffer(a.__webglVertexBuffer), m.deleteBuffer(a.__webglColorBuffer), l.info.memory.geometries--
    }
    function bb(a) {
        m.deleteBuffer(a.__webglVertexBuffer), m.deleteBuffer(a.__webglNormalBuffer), m.deleteBuffer(a.__webglTangentBuffer), m.deleteBuffer(a.__webglColorBuffer), m.deleteBuffer(a.__webglUVBuffer), m.deleteBuffer(a.__webglUV2Buffer), m.deleteBuffer(a.__webglSkinVertexABuffer), m.deleteBuffer(a.__webglSkinVertexBBuffer), m.deleteBuffer(a.__webglSkinIndicesBuffer), m.deleteBuffer(a.__webglSkinWeightsBuffer), m.deleteBuffer(a.__webglFaceBuffer), m.deleteBuffer(a.__webglLineBuffer);
        var b, c;
        if (a.numMorphTargets) for (b = 0, c = a.numMorphTargets; b < c; b++) m.deleteBuffer(a.__webglMorphTargetsBuffers[b]);
        if (a.numMorphNormals) for (b = 0, c = a.numMorphNormals; b < c; b++) m.deleteBuffer(a.__webglMorphNormalsBuffers[b]);
        if (a.__webglCustomAttributesList) for (var d in a.__webglCustomAttributesList) m.deleteBuffer(a.__webglCustomAttributesList[d].buffer);
        l.info.memory.geometries--
    }
    function cb(a, b) {
        var c = a.vertices.length,
            d = b.material;
        if (d.attributes) {
            a.__webglCustomAttributesList === undefined && (a.__webglCustomAttributesList = []);
            for (var e in d.attributes) {
                var f = d.attributes[e];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = !0;
                    var g = 1;
                    f.type === "v2" ? g = 2 : f.type === "v3" ? g = 3 : f.type === "v4" ? g = 4 : f.type === "c" && (g = 3), f.size = g, f.array = new Float32Array(c * g), f.buffer = m.createBuffer(), f.buffer.belongsToAttribute = e, f.needsUpdate = !0
                }
                a.__webglCustomAttributesList.push(f)
            }
        }
    }
    function db(a, b) {
        var c = a.vertices.length;
        a.__vertexArray = new Float32Array(c * 3), a.__colorArray = new Float32Array(c * 3), a.__sortArray = [], a.__webglParticleCount = c, cb(a, b)
    }
    function eb(a, b) {
        var c = a.vertices.length;
        a.__vertexArray = new Float32Array(c * 3), a.__colorArray = new Float32Array(c * 3), a.__webglLineCount = c, cb(a, b)
    }
    function fb(a) {
        var b = a.vertices.length;
        a.__vertexArray = new Float32Array(b * 3), a.__colorArray = new Float32Array(b * 3), a.__webglVertexCount = b
    }
    function gb(a, b) {
        var c = b.geometry,
            d = a.faces3,
            e = a.faces4,
            f = d.length * 3 + e.length * 4,
            g = d.length * 1 + e.length * 2,
            h = d.length * 3 + e.length * 4,
            i = hb(b, a),
            j = lb(i),
            k = jb(i),
            l = kb(i);
        a.__vertexArray = new Float32Array(f * 3), k && (a.__normalArray = new Float32Array(f * 3)), c.hasTangents && (a.__tangentArray = new Float32Array(f * 4)), l && (a.__colorArray = new Float32Array(f * 3));
        if (j) {
            if (c.faceUvs.length > 0 || c.faceVertexUvs.length > 0) a.__uvArray = new Float32Array(f * 2);
            if (c.faceUvs.length > 1 || c.faceVertexUvs.length > 1) a.__uv2Array = new Float32Array(f * 2)
        }
        b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinVertexAArray = new Float32Array(f * 4), a.__skinVertexBArray = new Float32Array(f * 4), a.__skinIndexArray = new Float32Array(f * 4), a.__skinWeightArray = new Float32Array(f * 4)), a.__faceArray = new Uint16Array(g * 3), a.__lineArray = new Uint16Array(h * 2);
        var n, o;
        if (a.numMorphTargets) {
            a.__morphTargetsArrays = [];
            for (n = 0, o = a.numMorphTargets; n < o; n++) a.__morphTargetsArrays.push(new Float32Array(f * 3))
        }
        if (a.numMorphNormals) {
            a.__morphNormalsArrays = [];
            for (n = 0, o = a.numMorphNormals; n < o; n++) a.__morphNormalsArrays.push(new Float32Array(f * 3))
        }
        a.__webglFaceCount = g * 3, a.__webglLineCount = h * 2;
        if (i.attributes) {
            a.__webglCustomAttributesList === undefined && (a.__webglCustomAttributesList = []);
            for (var p in i.attributes) {
                var q = i.attributes[p],
                    r = {};
                for (var s in q) r[s] = q[s];
                if (!r.__webglInitialized || r.createUniqueBuffers) {
                    r.__webglInitialized = !0;
                    var t = 1;
                    r.type === "v2" ? t = 2 : r.type === "v3" ? t = 3 : r.type === "v4" ? t = 4 : r.type === "c" && (t = 3), r.size = t, r.array = new Float32Array(f * t), r.buffer = m.createBuffer(), r.buffer.belongsToAttribute = p, q.needsUpdate = !0, r.__original = q
                }
                a.__webglCustomAttributesList.push(r)
            }
        }
        a.__inittedArrays = !0
    }
    function hb(a, b) {
        if (!(!a.material || a.material instanceof THREE.MeshFaceMaterial)) return a.material;
        if (b.materialIndex >= 0) return a.geometry.materials[b.materialIndex]
    }
    function ib(a) {
        return a && a.shading !== undefined && a.shading === THREE.SmoothShading
    }
    function jb(a) {
        return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : ib(a) ? THREE.SmoothShading : THREE.FlatShading
    }
    function kb(a) {
        return a.vertexColors ? a.vertexColors : !1
    }
    function lb(a) {
        return a.map || a.lightMap || a instanceof THREE.ShaderMaterial ? !0 : !1
    }
    function mb(a, b, c) {
        var d, e, f, g, h, i, j = a.vertices,
            k = j.length,
            l = a.colors,
            n = l.length,
            o = a.__vertexArray,
            p = a.__colorArray,
            q = a.__sortArray,
            r = a.verticesNeedUpdate,
            s = a.elementsNeedUpdate,
            t = a.colorsNeedUpdate,
            u = a.__webglCustomAttributesList,
            v, w, y, z, A, B;
        if (c.sortParticles) {
            O.copy(N), O.multiplySelf(c.matrixWorld);
            for (d = 0; d < k; d++) f = j[d], P.copy(f), O.multiplyVector3(P), q[d] = [P.z, d];
            q.sort(function(a, b) {
                return b[0] - a[0]
            });
            for (d = 0; d < k; d++) f = j[q[d][1]], g = d * 3, o[g] = f.x, o[g + 1] = f.y, o[g + 2] = f.z;
            for (e = 0; e < n; e++) g = e * 3, i = l[q[e][1]], p[g] = i.r, p[g + 1] = i.g, p[g + 2] = i.b;
            if (u) for (v = 0, w = u.length; v < w; v++) {
                B = u[v];
                if (B.boundTo !== undefined && B.boundTo !== "vertices") continue;
                g = 0, z = B.value.length;
                if (B.size === 1) for (y = 0; y < z; y++) h = q[y][1], B.array[y] = B.value[h];
                else if (B.size === 2) for (y = 0; y < z; y++) h = q[y][1], A = B.value[h], B.array[g] = A.x, B.array[g + 1] = A.y, g += 2;
                else if (B.size === 3) if (B.type === "c") for (y = 0; y < z; y++) h = q[y][1], A = B.value[h], B.array[g] = A.r, B.array[g + 1] = A.g, B.array[g + 2] = A.b, g += 3;
                else for (y = 0; y < z; y++) h = q[y][1], A = B.value[h], B.array[g] = A.x, B.array[g + 1] = A.y, B.array[g + 2] = A.z, g += 3;
                else if (B.size === 4) for (y = 0; y < z; y++) h = q[y][1], A = B.value[h], B.array[g] = A.x, B.array[g + 1] = A.y, B.array[g + 2] = A.z, B.array[g + 3] = A.w, g += 4
            }
        }
        else {
            if (r) for (d = 0; d < k; d++) f = j[d], g = d * 3, o[g] = f.x, o[g + 1] = f.y, o[g + 2] = f.z;
            if (t) for (e = 0; e < n; e++) i = l[e], g = e * 3, p[g] = i.r, p[g + 1] = i.g, p[g + 2] = i.b;
            if (u) for (v = 0, w = u.length; v < w; v++) {
                B = u[v];
                if (B.needsUpdate && (B.boundTo === undefined || B.boundTo === "vertices")) {
                    z = B.value.length, g = 0;
                    if (B.size === 1) for (y = 0; y < z; y++) B.array[y] = B.value[y];
                    else if (B.size === 2) for (y = 0; y < z; y++) A = B.value[y], B.array[g] = A.x, B.array[g + 1] = A.y, g += 2;
                    else if (B.size === 3) if (B.type === "c") for (y = 0; y < z; y++) A = B.value[y], B.array[g] = A.r, B.array[g + 1] = A.g, B.array[g + 2] = A.b, g += 3;
                    else for (y = 0; y < z; y++) A = B.value[y], B.array[g] = A.x, B.array[g + 1] = A.y, B.array[g + 2] = A.z, g += 3;
                    else if (B.size === 4) for (y = 0; y < z; y++) A = B.value[y], B.array[g] = A.x, B.array[g + 1] = A.y, B.array[g + 2] = A.z, B.array[g + 3] = A.w, g += 4
                }
            }
        }
        if (r || c.sortParticles) m.bindBuffer(m.ARRAY_BUFFER, a.__webglVertexBuffer), m.bufferData(m.ARRAY_BUFFER, o, b);
        if (t || c.sortParticles) m.bindBuffer(m.ARRAY_BUFFER, a.__webglColorBuffer), m.bufferData(m.ARRAY_BUFFER, p, b);
        if (u) for (v = 0, w = u.length; v < w; v++) {
            B = u[v];
            if (B.needsUpdate || c.sortParticles) m.bindBuffer(m.ARRAY_BUFFER, B.buffer), m.bufferData(m.ARRAY_BUFFER, B.array, b)
        }
    }
    function nb(a, b) {
        var c, d, e, f, g, h = a.vertices,
            i = a.colors,
            j = h.length,
            k = i.length,
            l = a.__vertexArray,
            n = a.__colorArray,
            o = a.verticesNeedUpdate,
            p = a.colorsNeedUpdate,
            q = a.__webglCustomAttributesList,
            r, s, u, v, w, x;
        if (o) {
            for (c = 0; c < j; c++) e = h[c], f = c * 3, l[f] = e.x, l[f + 1] = e.y, l[f + 2] = e.z;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglVertexBuffer), m.bufferData(m.ARRAY_BUFFER, l, b)
        }
        if (p) {
            for (d = 0; d < k; d++) g = i[d], f = d * 3, n[f] = g.r, n[f + 1] = g.g, n[f + 2] = g.b;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglColorBuffer), m.bufferData(m.ARRAY_BUFFER, n, b)
        }
        if (q) for (r = 0, s = q.length; r < s; r++) {
            x = q[r];
            if (x.needsUpdate && (x.boundTo === undefined || x.boundTo === "vertices")) {
                f = 0, v = x.value.length;
                if (x.size === 1) for (u = 0; u < v; u++) x.array[u] = x.value[u];
                else if (x.size === 2) for (u = 0; u < v; u++) w = x.value[u], x.array[f] = w.x, x.array[f + 1] = w.y, f += 2;
                else if (x.size === 3) if (x.type === "c") for (u = 0; u < v; u++) w = x.value[u], x.array[f] = w.r, x.array[f + 1] = w.g, x.array[f + 2] = w.b, f += 3;
                else for (u = 0; u < v; u++) w = x.value[u], x.array[f] = w.x, x.array[f + 1] = w.y, x.array[f + 2] = w.z, f += 3;
                else if (x.size === 4) for (u = 0; u < v; u++) w = x.value[u], x.array[f] = w.x, x.array[f + 1] = w.y, x.array[f + 2] = w.z, x.array[f + 3] = w.w, f += 4;
                m.bindBuffer(m.ARRAY_BUFFER, x.buffer), m.bufferData(m.ARRAY_BUFFER, x.array, b)
            }
        }
    }
    function ob(a, b) {
        var c, d, e, f, g, h = a.vertices,
            i = a.colors,
            j = h.length,
            k = i.length,
            l = a.__vertexArray,
            n = a.__colorArray,
            o = a.verticesNeedUpdate,
            p = a.colorsNeedUpdate;
        if (o) {
            for (c = 0; c < j; c++) e = h[c], f = c * 3, l[f] = e.x, l[f + 1] = e.y, l[f + 2] = e.z;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglVertexBuffer), m.bufferData(m.ARRAY_BUFFER, l, b)
        }
        if (p) {
            for (d = 0; d < k; d++) g = i[d], f = d * 3, n[f] = g.r, n[f + 1] = g.g, n[f + 2] = g.b;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglColorBuffer), m.bufferData(m.ARRAY_BUFFER, n, b)
        }
    }
    function pb(a, b, c, d, e) {
        if (!a.__inittedArrays) return;
        var f = jb(e),
            g = kb(e),
            h = lb(e),
            i = f === THREE.SmoothShading,
            j, k, l, n, o, p, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, cb, db, eb, fb, gb, hb, ib, mb, nb, ob, pb, rb = 0,
            sb = 0,
            tb = 0,
            ub = 0,
            vb = 0,
            wb = 0,
            xb = 0,
            yb = 0,
            zb = 0,
            Ab = 0,
            Bb = 0,
            Cb = 0,
            Db = 0,
            Eb, Fb = a.__vertexArray,
            Gb = a.__uvArray,
            Hb = a.__uv2Array,
            Ib = a.__normalArray,
            Jb = a.__tangentArray,
            Kb = a.__colorArray,
            Lb = a.__skinVertexAArray,
            Mb = a.__skinVertexBArray,
            Nb = a.__skinIndexArray,
            Ob = a.__skinWeightArray,
            Pb = a.__morphTargetsArrays,
            Qb = a.__morphNormalsArrays,
            Rb = a.__webglCustomAttributesList,
            Sb, Tb = a.__faceArray,
            Ub = a.__lineArray,
            Vb = b.geometry,
            Wb = Vb.verticesNeedUpdate,
            Xb = Vb.elementsNeedUpdate,
            Yb = Vb.uvsNeedUpdate,
            Zb = Vb.normalsNeedUpdate,
            $b = Vb.tangetsNeedUpdate,
            _b = Vb.colorsNeedUpdate,
            ac = Vb.morphTargetsNeedUpdate,
            bc = Vb.vertices,
            cc = a.faces3,
            dc = a.faces4,
            ec = Vb.faces,
            fc = Vb.faceVertexUvs[0],
            gc = Vb.faceVertexUvs[1],
            hc = Vb.colors,
            ic = Vb.skinVerticesA,
            jc = Vb.skinVerticesB,
            kc = Vb.skinIndices,
            lc = Vb.skinWeights,
            mc = Vb.morphTargets,
            nc = Vb.morphNormals;
        if (Wb) {
            for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], w = bc[n.a], x = bc[n.b], y = bc[n.c], Fb[sb] = w.x, Fb[sb + 1] = w.y, Fb[sb + 2] = w.z, Fb[sb + 3] = x.x, Fb[sb + 4] = x.y, Fb[sb + 5] = x.z, Fb[sb + 6] = y.x, Fb[sb + 7] = y.y, Fb[sb + 8] = y.z, sb += 9;
            for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], w = bc[n.a], x = bc[n.b], y = bc[n.c], z = bc[n.d], Fb[sb] = w.x, Fb[sb + 1] = w.y, Fb[sb + 2] = w.z, Fb[sb + 3] = x.x, Fb[sb + 4] = x.y, Fb[sb + 5] = x.z, Fb[sb + 6] = y.x, Fb[sb + 7] = y.y, Fb[sb + 8] = y.z, Fb[sb + 9] = z.x, Fb[sb + 10] = z.y, Fb[sb + 11] = z.z, sb += 12;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglVertexBuffer), m.bufferData(m.ARRAY_BUFFER, Fb, c)
        }
        if (ac) for (hb = 0, ib = mc.length; hb < ib; hb++) {
            Bb = 0;
            for (j = 0, k = cc.length; j < k; j++) ob = cc[j], n = ec[ob], w = mc[hb].vertices[n.a], x = mc[hb].vertices[n.b], y = mc[hb].vertices[n.c], mb = Pb[hb], mb[Bb] = w.x, mb[Bb + 1] = w.y, mb[Bb + 2] = w.z, mb[Bb + 3] = x.x, mb[Bb + 4] = x.y, mb[Bb + 5] = x.z, mb[Bb + 6] = y.x, mb[Bb + 7] = y.y, mb[Bb + 8] = y.z, e.morphNormals && (i ? (pb = nc[hb].vertexNormals[ob], E = pb.a, F = pb.b, G = pb.c) : (E = nc[hb].faceNormals[ob], F = E, G = E), nb = Qb[hb], nb[Bb] = E.x, nb[Bb + 1] = E.y, nb[Bb + 2] = E.z, nb[Bb + 3] = F.x, nb[Bb + 4] = F.y, nb[Bb + 5] = F.z, nb[Bb + 6] = G.x, nb[Bb + 7] = G.y, nb[Bb + 8] = G.z), Bb += 9;
            for (j = 0, k = dc.length; j < k; j++) ob = dc[j], n = ec[ob], w = mc[hb].vertices[n.a], x = mc[hb].vertices[n.b], y = mc[hb].vertices[n.c], z = mc[hb].vertices[n.d], mb = Pb[hb], mb[Bb] = w.x, mb[Bb + 1] = w.y, mb[Bb + 2] = w.z, mb[Bb + 3] = x.x, mb[Bb + 4] = x.y, mb[Bb + 5] = x.z, mb[Bb + 6] = y.x, mb[Bb + 7] = y.y, mb[Bb + 8] = y.z, mb[Bb + 9] = z.x, mb[Bb + 10] = z.y, mb[Bb + 11] = z.z, e.morphNormals && (i ? (pb = nc[hb].vertexNormals[ob], E = pb.a, F = pb.b, G = pb.c, H = pb.d) : (E = nc[hb].faceNormals[ob], F = E, G = E, H = E), nb = Qb[hb], nb[Bb] = E.x, nb[Bb + 1] = E.y, nb[Bb + 2] = E.z, nb[Bb + 3] = F.x, nb[Bb + 4] = F.y, nb[Bb + 5] = F.z, nb[Bb + 6] = G.x, nb[Bb + 7] = G.y, nb[Bb + 8] = G.z, nb[Bb + 9] = H.x, nb[Bb + 10] = H.y, nb[Bb + 11] = H.z), Bb += 12;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglMorphTargetsBuffers[hb]), m.bufferData(m.ARRAY_BUFFER, Pb[hb], c), e.morphNormals && (m.bindBuffer(m.ARRAY_BUFFER, a.__webglMorphNormalsBuffers[hb]), m.bufferData(m.ARRAY_BUFFER, Qb[hb], c))
        }
        if (lc.length) {
            for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], M = lc[n.a], N = lc[n.b], O = lc[n.c], Ob[Ab] = M.x, Ob[Ab + 1] = M.y, Ob[Ab + 2] = M.z, Ob[Ab + 3] = M.w, Ob[Ab + 4] = N.x, Ob[Ab + 5] = N.y, Ob[Ab + 6] = N.z, Ob[Ab + 7] = N.w, Ob[Ab + 8] = O.x, Ob[Ab + 9] = O.y, Ob[Ab + 10] = O.z, Ob[Ab + 11] = O.w, Q = kc[n.a], R = kc[n.b], S = kc[n.c], Nb[Ab] = Q.x, Nb[Ab + 1] = Q.y, Nb[Ab + 2] = Q.z, Nb[Ab + 3] = Q.w, Nb[Ab + 4] = R.x, Nb[Ab + 5] = R.y, Nb[Ab + 6] = R.z, Nb[Ab + 7] = R.w, Nb[Ab + 8] = S.x, Nb[Ab + 9] = S.y, Nb[Ab + 10] = S.z, Nb[Ab + 11] = S.w, U = ic[n.a], V = ic[n.b], W = ic[n.c], Lb[Ab] = U.x, Lb[Ab + 1] = U.y, Lb[Ab + 2] = U.z, Lb[Ab + 3] = 1, Lb[Ab + 4] = V.x, Lb[Ab + 5] = V.y, Lb[Ab + 6] = V.z, Lb[Ab + 7] = 1, Lb[Ab + 8] = W.x, Lb[Ab + 9] = W.y, Lb[Ab + 10] = W.z, Lb[Ab + 11] = 1, Y = jc[n.a], Z = jc[n.b], $ = jc[n.c], Mb[Ab] = Y.x, Mb[Ab + 1] = Y.y, Mb[Ab + 2] = Y.z, Mb[Ab + 3] = 1, Mb[Ab + 4] = Z.x, Mb[Ab + 5] = Z.y, Mb[Ab + 6] = Z.z, Mb[Ab + 7] = 1, Mb[Ab + 8] = $.x, Mb[Ab + 9] = $.y, Mb[Ab + 10] = $.z, Mb[Ab + 11] = 1, Ab += 12;
            for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], M = lc[n.a], N = lc[n.b], O = lc[n.c], P = lc[n.d], Ob[Ab] = M.x, Ob[Ab + 1] = M.y, Ob[Ab + 2] = M.z, Ob[Ab + 3] = M.w, Ob[Ab + 4] = N.x, Ob[Ab + 5] = N.y, Ob[Ab + 6] = N.z, Ob[Ab + 7] = N.w, Ob[Ab + 8] = O.x, Ob[Ab + 9] = O.y, Ob[Ab + 10] = O.z, Ob[Ab + 11] = O.w, Ob[Ab + 12] = P.x, Ob[Ab + 13] = P.y, Ob[Ab + 14] = P.z, Ob[Ab + 15] = P.w, Q = kc[n.a], R = kc[n.b], S = kc[n.c], T = kc[n.d], Nb[Ab] = Q.x, Nb[Ab + 1] = Q.y, Nb[Ab + 2] = Q.z, Nb[Ab + 3] = Q.w, Nb[Ab + 4] = R.x, Nb[Ab + 5] = R.y, Nb[Ab + 6] = R.z, Nb[Ab + 7] = R.w, Nb[Ab + 8] = S.x, Nb[Ab + 9] = S.y, Nb[Ab + 10] = S.z, Nb[Ab + 11] = S.w, Nb[Ab + 12] = T.x, Nb[Ab + 13] = T.y, Nb[Ab + 14] = T.z, Nb[Ab + 15] = T.w, U = ic[n.a], V = ic[n.b], W = ic[n.c], X = ic[n.d], Lb[Ab] = U.x, Lb[Ab + 1] = U.y, Lb[Ab + 2] = U.z, Lb[Ab + 3] = 1, Lb[Ab + 4] = V.x, Lb[Ab + 5] = V.y, Lb[Ab + 6] = V.z, Lb[Ab + 7] = 1, Lb[Ab + 8] = W.x, Lb[Ab + 9] = W.y, Lb[Ab + 10] = W.z, Lb[Ab + 11] = 1, Lb[Ab + 12] = X.x, Lb[Ab + 13] = X.y, Lb[Ab + 14] = X.z, Lb[Ab + 15] = 1, Y = jc[n.a], Z = jc[n.b], $ = jc[n.c], _ = jc[n.d], Mb[Ab] = Y.x, Mb[Ab + 1] = Y.y, Mb[Ab + 2] = Y.z, Mb[Ab + 3] = 1, Mb[Ab + 4] = Z.x, Mb[Ab + 5] = Z.y, Mb[Ab + 6] = Z.z, Mb[Ab + 7] = 1, Mb[Ab + 8] = $.x, Mb[Ab + 9] = $.y, Mb[Ab + 10] = $.z, Mb[Ab + 11] = 1, Mb[Ab + 12] = _.x, Mb[Ab + 13] = _.y, Mb[Ab + 14] = _.z, Mb[Ab + 15] = 1, Ab += 16;
            Ab > 0 && (m.bindBuffer(m.ARRAY_BUFFER, a.__webglSkinVertexABuffer), m.bufferData(m.ARRAY_BUFFER, Lb, c), m.bindBuffer(m.ARRAY_BUFFER, a.__webglSkinVertexBBuffer), m.bufferData(m.ARRAY_BUFFER, Mb, c), m.bindBuffer(m.ARRAY_BUFFER, a.__webglSkinIndicesBuffer), m.bufferData(m.ARRAY_BUFFER, Nb, c), m.bindBuffer(m.ARRAY_BUFFER, a.__webglSkinWeightsBuffer), m.bufferData(m.ARRAY_BUFFER, Ob, c))
        }
        if (_b && g) {
            for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], r = n.vertexColors, s = n.color, r.length === 3 && g === THREE.VertexColors ? (I = r[0], J = r[1], K = r[2]) : (I = s, J = s, K = s), Kb[zb] = I.r, Kb[zb + 1] = I.g, Kb[zb + 2] = I.b, Kb[zb + 3] = J.r, Kb[zb + 4] = J.g, Kb[zb + 5] = J.b, Kb[zb + 6] = K.r, Kb[zb + 7] = K.g, Kb[zb + 8] = K.b, zb += 9;
            for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], r = n.vertexColors, s = n.color, r.length === 4 && g === THREE.VertexColors ? (I = r[0], J = r[1], K = r[2], L = r[3]) : (I = s, J = s, K = s, L = s), Kb[zb] = I.r, Kb[zb + 1] = I.g, Kb[zb + 2] = I.b, Kb[zb + 3] = J.r, Kb[zb + 4] = J.g, Kb[zb + 5] = J.b, Kb[zb + 6] = K.r, Kb[zb + 7] = K.g, Kb[zb + 8] = K.b, Kb[zb + 9] = L.r, Kb[zb + 10] = L.g, Kb[zb + 11] = L.b, zb += 12;
            zb > 0 && (m.bindBuffer(m.ARRAY_BUFFER, a.__webglColorBuffer), m.bufferData(m.ARRAY_BUFFER, Kb, c))
        }
        if ($b && Vb.hasTangents) {
            for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], t = n.vertexTangents, A = t[0], B = t[1], C = t[2], Jb[xb] = A.x, Jb[xb + 1] = A.y, Jb[xb + 2] = A.z, Jb[xb + 3] = A.w, Jb[xb + 4] = B.x, Jb[xb + 5] = B.y, Jb[xb + 6] = B.z, Jb[xb + 7] = B.w, Jb[xb + 8] = C.x, Jb[xb + 9] = C.y, Jb[xb + 10] = C.z, Jb[xb + 11] = C.w, xb += 12;
            for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], t = n.vertexTangents, A = t[0], B = t[1], C = t[2], D = t[3], Jb[xb] = A.x, Jb[xb + 1] = A.y, Jb[xb + 2] = A.z, Jb[xb + 3] = A.w, Jb[xb + 4] = B.x, Jb[xb + 5] = B.y, Jb[xb + 6] = B.z, Jb[xb + 7] = B.w, Jb[xb + 8] = C.x, Jb[xb + 9] = C.y, Jb[xb + 10] = C.z, Jb[xb + 11] = C.w, Jb[xb + 12] = D.x, Jb[xb + 13] = D.y, Jb[xb + 14] = D.z, Jb[xb + 15] = D.w, xb += 16;
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglTangentBuffer), m.bufferData(m.ARRAY_BUFFER, Jb, c)
        }
        if (Zb && f) {
            for (j = 0, k = cc.length; j < k; j++) {
                n = ec[cc[j]], o = n.vertexNormals, p = n.normal;
                if (o.length === 3 && i) for (cb = 0; cb < 3; cb++) eb = o[cb], Ib[wb] = eb.x, Ib[wb + 1] = eb.y, Ib[wb + 2] = eb.z, wb += 3;
                else for (cb = 0; cb < 3; cb++) Ib[wb] = p.x, Ib[wb + 1] = p.y, Ib[wb + 2] = p.z, wb += 3
            }
            for (j = 0, k = dc.length; j < k; j++) {
                n = ec[dc[j]], o = n.vertexNormals, p = n.normal;
                if (o.length === 4 && i) for (cb = 0; cb < 4; cb++) eb = o[cb], Ib[wb] = eb.x, Ib[wb + 1] = eb.y, Ib[wb + 2] = eb.z, wb += 3;
                else for (cb = 0; cb < 4; cb++) Ib[wb] = p.x, Ib[wb + 1] = p.y, Ib[wb + 2] = p.z, wb += 3
            }
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglNormalBuffer), m.bufferData(m.ARRAY_BUFFER, Ib, c)
        }
        if (Yb && fc && h) {
            for (j = 0, k = cc.length; j < k; j++) {
                l = cc[j], n = ec[l], u = fc[l];
                if (u === undefined) continue;
                for (cb = 0; cb < 3; cb++) fb = u[cb], Gb[tb] = fb.u, Gb[tb + 1] = fb.v, tb += 2
            }
            for (j = 0, k = dc.length; j < k; j++) {
                l = dc[j], n = ec[l], u = fc[l];
                if (u === undefined) continue;
                for (cb = 0; cb < 4; cb++) fb = u[cb], Gb[tb] = fb.u, Gb[tb + 1] = fb.v, tb += 2
            }
            tb > 0 && (m.bindBuffer(m.ARRAY_BUFFER, a.__webglUVBuffer), m.bufferData(m.ARRAY_BUFFER, Gb, c))
        }
        if (Yb && gc && h) {
            for (j = 0, k = cc.length; j < k; j++) {
                l = cc[j], n = ec[l], v = gc[l];
                if (v === undefined) continue;
                for (cb = 0; cb < 3; cb++) gb = v[cb], Hb[ub] = gb.u, Hb[ub + 1] = gb.v, ub += 2
            }
            for (j = 0, k = dc.length; j < k; j++) {
                l = dc[j], n = ec[l], v = gc[l];
                if (v === undefined) continue;
                for (cb = 0; cb < 4; cb++) gb = v[cb], Hb[ub] = gb.u, Hb[ub + 1] = gb.v, ub += 2
            }
            ub > 0 && (m.bindBuffer(m.ARRAY_BUFFER, a.__webglUV2Buffer), m.bufferData(m.ARRAY_BUFFER, Hb, c))
        }
        if (Xb) {
            for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], Tb[vb] = rb, Tb[vb + 1] = rb + 1, Tb[vb + 2] = rb + 2, vb += 3, Ub[yb] = rb, Ub[yb + 1] = rb + 1, Ub[yb + 2] = rb, Ub[yb + 3] = rb + 2, Ub[yb + 4] = rb + 1, Ub[yb + 5] = rb + 2, yb += 6, rb += 3;
            for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], Tb[vb] = rb, Tb[vb + 1] = rb + 1, Tb[vb + 2] = rb + 3, Tb[vb + 3] = rb + 1, Tb[vb + 4] = rb + 2, Tb[vb + 5] = rb + 3, vb += 6, Ub[yb] = rb, Ub[yb + 1] = rb + 1, Ub[yb + 2] = rb, Ub[yb + 3] = rb + 3, Ub[yb + 4] = rb + 1, Ub[yb + 5] = rb + 2, Ub[yb + 6] = rb + 2, Ub[yb + 7] = rb + 3, yb += 8, rb += 4;
            m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, a.__webglFaceBuffer), m.bufferData(m.ELEMENT_ARRAY_BUFFER, Tb, c), m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, a.__webglLineBuffer), m.bufferData(m.ELEMENT_ARRAY_BUFFER, Ub, c)
        }
        if (Rb) for (cb = 0, db = Rb.length; cb < db; cb++) {
            Sb = Rb[cb];
            if (!Sb.__original.needsUpdate) continue;
            Cb = 0, Db = 0;
            if (Sb.size === 1) {
                if (Sb.boundTo === undefined || Sb.boundTo === "vertices") {
                    for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], Sb.array[Cb] = Sb.value[n.a], Sb.array[Cb + 1] = Sb.value[n.b], Sb.array[Cb + 2] = Sb.value[n.c], Cb += 3;
                    for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], Sb.array[Cb] = Sb.value[n.a], Sb.array[Cb + 1] = Sb.value[n.b], Sb.array[Cb + 2] = Sb.value[n.c], Sb.array[Cb + 3] = Sb.value[n.d], Cb += 4
                }
                else if (Sb.boundTo === "faces") {
                    for (j = 0, k = cc.length; j < k; j++) Eb = Sb.value[cc[j]], Sb.array[Cb] = Eb, Sb.array[Cb + 1] = Eb, Sb.array[Cb + 2] = Eb, Cb += 3;
                    for (j = 0, k = dc.length; j < k; j++) Eb = Sb.value[dc[j]], Sb.array[Cb] = Eb, Sb.array[Cb + 1] = Eb, Sb.array[Cb + 2] = Eb, Sb.array[Cb + 3] = Eb, Cb += 4
                }
            }
            else if (Sb.size === 2) {
                if (Sb.boundTo === undefined || Sb.boundTo === "vertices") {
                    for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], w = Sb.value[n.a], x = Sb.value[n.b], y = Sb.value[n.c], Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = x.x, Sb.array[Cb + 3] = x.y, Sb.array[Cb + 4] = y.x, Sb.array[Cb + 5] = y.y, Cb += 6;
                    for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], w = Sb.value[n.a], x = Sb.value[n.b], y = Sb.value[n.c], z = Sb.value[n.d], Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = x.x, Sb.array[Cb + 3] = x.y, Sb.array[Cb + 4] = y.x, Sb.array[Cb + 5] = y.y, Sb.array[Cb + 6] = z.x, Sb.array[Cb + 7] = z.y, Cb += 8
                }
                else if (Sb.boundTo === "faces") {
                    for (j = 0, k = cc.length; j < k; j++) Eb = Sb.value[cc[j]], w = Eb, x = Eb, y = Eb, Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = x.x, Sb.array[Cb + 3] = x.y, Sb.array[Cb + 4] = y.x, Sb.array[Cb + 5] = y.y, Cb += 6;
                    for (j = 0, k = dc.length; j < k; j++) Eb = Sb.value[dc[j]], w = Eb, x = Eb, y = Eb, z = Eb, Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = x.x, Sb.array[Cb + 3] = x.y, Sb.array[Cb + 4] = y.x, Sb.array[Cb + 5] = y.y, Sb.array[Cb + 6] = z.x, Sb.array[Cb + 7] = z.y, Cb += 8
                }
            }
            else if (Sb.size === 3) {
                var oc;
                Sb.type === "c" ? oc = ["r", "g", "b"] : oc = ["x", "y", "z"];
                if (Sb.boundTo === undefined || Sb.boundTo === "vertices") {
                    for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], w = Sb.value[n.a], x = Sb.value[n.b], y = Sb.value[n.c], Sb.array[Cb] = w[oc[0]], Sb.array[Cb + 1] = w[oc[1]], Sb.array[Cb + 2] = w[oc[2]], Sb.array[Cb + 3] = x[oc[0]], Sb.array[Cb + 4] = x[oc[1]], Sb.array[Cb + 5] = x[oc[2]], Sb.array[Cb + 6] = y[oc[0]], Sb.array[Cb + 7] = y[oc[1]], Sb.array[Cb + 8] = y[oc[2]], Cb += 9;
                    for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], w = Sb.value[n.a], x = Sb.value[n.b], y = Sb.value[n.c], z = Sb.value[n.d], Sb.array[Cb] = w[oc[0]], Sb.array[Cb + 1] = w[oc[1]], Sb.array[Cb + 2] = w[oc[2]], Sb.array[Cb + 3] = x[oc[0]], Sb.array[Cb + 4] = x[oc[1]], Sb.array[Cb + 5] = x[oc[2]], Sb.array[Cb + 6] = y[oc[0]], Sb.array[Cb + 7] = y[oc[1]], Sb.array[Cb + 8] = y[oc[2]], Sb.array[Cb + 9] = z[oc[0]], Sb.array[Cb + 10] = z[oc[1]], Sb.array[Cb + 11] = z[oc[2]], Cb += 12
                }
                else if (Sb.boundTo === "faces") {
                    for (j = 0, k = cc.length; j < k; j++) Eb = Sb.value[cc[j]], w = Eb, x = Eb, y = Eb, Sb.array[Cb] = w[oc[0]], Sb.array[Cb + 1] = w[oc[1]], Sb.array[Cb + 2] = w[oc[2]], Sb.array[Cb + 3] = x[oc[0]], Sb.array[Cb + 4] = x[oc[1]], Sb.array[Cb + 5] = x[oc[2]], Sb.array[Cb + 6] = y[oc[0]], Sb.array[Cb + 7] = y[oc[1]], Sb.array[Cb + 8] = y[oc[2]], Cb += 9;
                    for (j = 0, k = dc.length; j < k; j++) Eb = Sb.value[dc[j]], w = Eb, x = Eb, y = Eb, z = Eb, Sb.array[Cb] = w[oc[0]], Sb.array[Cb + 1] = w[oc[1]], Sb.array[Cb + 2] = w[oc[2]], Sb.array[Cb + 3] = x[oc[0]], Sb.array[Cb + 4] = x[oc[1]], Sb.array[Cb + 5] = x[oc[2]], Sb.array[Cb + 6] = y[oc[0]], Sb.array[Cb + 7] = y[oc[1]], Sb.array[Cb + 8] = y[oc[2]], Sb.array[Cb + 9] = z[oc[0]], Sb.array[Cb + 10] = z[oc[1]], Sb.array[Cb + 11] = z[oc[2]], Cb += 12
                }
            }
            else if (Sb.size === 4) if (Sb.boundTo === undefined || Sb.boundTo === "vertices") {
                for (j = 0, k = cc.length; j < k; j++) n = ec[cc[j]], w = Sb.value[n.a], x = Sb.value[n.b], y = Sb.value[n.c], Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = w.z, Sb.array[Cb + 3] = w.w, Sb.array[Cb + 4] = x.x, Sb.array[Cb + 5] = x.y, Sb.array[Cb + 6] = x.z, Sb.array[Cb + 7] = x.w, Sb.array[Cb + 8] = y.x, Sb.array[Cb + 9] = y.y, Sb.array[Cb + 10] = y.z, Sb.array[Cb + 11] = y.w, Cb += 12;
                for (j = 0, k = dc.length; j < k; j++) n = ec[dc[j]], w = Sb.value[n.a], x = Sb.value[n.b], y = Sb.value[n.c], z = Sb.value[n.d], Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = w.z, Sb.array[Cb + 3] = w.w, Sb.array[Cb + 4] = x.x, Sb.array[Cb + 5] = x.y, Sb.array[Cb + 6] = x.z, Sb.array[Cb + 7] = x.w, Sb.array[Cb + 8] = y.x, Sb.array[Cb + 9] = y.y, Sb.array[Cb + 10] = y.z, Sb.array[Cb + 11] = y.w, Sb.array[Cb + 12] = z.x, Sb.array[Cb + 13] = z.y, Sb.array[Cb + 14] = z.z, Sb.array[Cb + 15] = z.w, Cb += 16
            }
            else if (Sb.boundTo === "faces") {
                for (j = 0, k = cc.length; j < k; j++) Eb = Sb.value[cc[j]], w = Eb, x = Eb, y = Eb, Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = w.z, Sb.array[Cb + 3] = w.w, Sb.array[Cb + 4] = x.x, Sb.array[Cb + 5] = x.y, Sb.array[Cb + 6] = x.z, Sb.array[Cb + 7] = x.w, Sb.array[Cb + 8] = y.x, Sb.array[Cb + 9] = y.y, Sb.array[Cb + 10] = y.z, Sb.array[Cb + 11] = y.w, Cb += 12;
                for (j = 0, k = dc.length; j < k; j++) Eb = Sb.value[dc[j]], w = Eb, x = Eb, y = Eb, z = Eb, Sb.array[Cb] = w.x, Sb.array[Cb + 1] = w.y, Sb.array[Cb + 2] = w.z, Sb.array[Cb + 3] = w.w, Sb.array[Cb + 4] = x.x, Sb.array[Cb + 5] = x.y, Sb.array[Cb + 6] = x.z, Sb.array[Cb + 7] = x.w, Sb.array[Cb + 8] = y.x, Sb.array[Cb + 9] = y.y, Sb.array[Cb + 10] = y.z, Sb.array[Cb + 11] = y.w, Sb.array[Cb + 12] = z.x, Sb.array[Cb + 13] = z.y, Sb.array[Cb + 14] = z.z, Sb.array[Cb + 15] = z.w, Cb += 16
            }
            m.bindBuffer(m.ARRAY_BUFFER, Sb.buffer), m.bufferData(m.ARRAY_BUFFER, Sb.array, c)
        }
        d && (delete a.__inittedArrays, delete a.__colorArray, delete a.__normalArray, delete a.__tangentArray, delete a.__uvArray, delete a.__uv2Array, delete a.__faceArray, delete a.__vertexArray, delete a.__lineArray, delete a.__skinVertexAArray, delete a.__skinVertexBArray, delete a.__skinIndexArray, delete a.__skinWeightArray)
    }
    function qb(a, b, c) {
        var d = a.program.attributes;
        c.morphTargetBase !== -1 ? (m.bindBuffer(m.ARRAY_BUFFER, b.__webglMorphTargetsBuffers[c.morphTargetBase]), m.vertexAttribPointer(d.position, 3, m.FLOAT, !1, 0, 0)) : d.position >= 0 && (m.bindBuffer(m.ARRAY_BUFFER, b.__webglVertexBuffer), m.vertexAttribPointer(d.position, 3, m.FLOAT, !1, 0, 0));
        if (c.morphTargetForcedOrder.length) {
            var e = 0,
                f = c.morphTargetForcedOrder,
                g = c.morphTargetInfluences;
            while (e < a.numSupportedMorphTargets && e < f.length) m.bindBuffer(m.ARRAY_BUFFER, b.__webglMorphTargetsBuffers[f[e]]), m.vertexAttribPointer(d["morphTarget" + e], 3, m.FLOAT, !1, 0, 0), a.morphNormals && (m.bindBuffer(m.ARRAY_BUFFER, b.__webglMorphNormalsBuffers[f[e]]), m.vertexAttribPointer(d["morphNormal" + e], 3, m.FLOAT, !1, 0, 0)), c.__webglMorphTargetInfluences[e] = g[f[e]], e++
        }
        else {
            var h = [],
                i = -1,
                j = 0,
                g = c.morphTargetInfluences,
                k, l = g.length,
                e = 0;
            c.morphTargetBase !== -1 && (h[c.morphTargetBase] = !0);
            while (e < a.numSupportedMorphTargets) {
                for (k = 0; k < l; k++)!h[k] && g[k] > i && (j = k, i = g[j]);
                m.bindBuffer(m.ARRAY_BUFFER, b.__webglMorphTargetsBuffers[j]), m.vertexAttribPointer(d["morphTarget" + e], 3, m.FLOAT, !1, 0, 0), a.morphNormals && (m.bindBuffer(m.ARRAY_BUFFER, b.__webglMorphNormalsBuffers[j]), m.vertexAttribPointer(d["morphNormal" + e], 3, m.FLOAT, !1, 0, 0)), c.__webglMorphTargetInfluences[e] = i, h[j] = 1, i = -1, e++
            }
        }
        a.program.uniforms.morphTargetInfluences !== null && m.uniform1fv(a.program.uniforms.morphTargetInfluences, c.__webglMorphTargetInfluences)
    }
    function rb(a, b) {
        return b.z - a.z
    }
    function sb(a, b, c) {
        if (!a.length) return;
        for (var d = 0, e = a.length; d < e; d++) o = null, s = null, w = -1, A = -1, B = -1, u = -1, v = -1, r = -1, q = -1, R = !0, a[d].render(b, c, K, L), o = null, s = null, w = -1, A = -1, B = -1, u = -1, v = -1, r = -1, q = -1, R = !0
    }
    function tb(a, b, c, d, e, f, g, h) {
        var i, j, k, m, n, o, p;
        b ? (n = a.length - 1, o = -1, p = -1) : (n = 0, o = a.length, p = 1);
        for (var q = n; q !== o; q += p) {
            i = a[q];
            if (i.render) {
                j = i.object, k = i.buffer;
                if (h) m = h;
                else {
                    m = i[c];
                    if (!m) continue;
                    g && l.setBlending(m.blending, m.blendEquation, m.blendSrc, m.blendDst), l.setDepthTest(m.depthTest), l.setDepthWrite(m.depthWrite), Wb(m.polygonOffset, m.polygonOffsetFactor, m.polygonOffsetUnits)
                }
                l.setObjectFaces(j), k instanceof THREE.BufferGeometry ? l.renderBufferDirect(d, e, f, m, k, j) : l.renderBuffer(d, e, f, m, k, j)
            }
        }
    }
    function ub(a, b, c, d, e, f, g) {
        var h, i, j;
        for (var m = 0, n = a.length; m < n; m++) {
            h = a[m], i = h.object;
            if (i.visible) {
                if (g) j = g;
                else {
                    j = h[b];
                    if (!j) continue;
                    f && l.setBlending(j.blending, j.blendEquation, j.blendSrc, j.blendDst), l.setDepthTest(j.depthTest), l.setDepthWrite(j.depthWrite), Wb(j.polygonOffset, j.polygonOffsetFactor, j.polygonOffsetUnits)
                }
                l.renderImmediateObject(c, d, e, j, i)
            }
        }
    }
    function vb(a) {
        var b = a.object,
            c = b.material;
        c.transparent ? (a.transparent = c, a.opaque = null) : (a.opaque = c, a.transparent = null)
    }
    function wb(a) {
        var b = a.object,
            c = a.buffer,
            d, e, f;
        f = b.material, f instanceof THREE.MeshFaceMaterial ? (e = c.materialIndex, e >= 0 && (d = b.geometry.materials[e], d.transparent ? (a.transparent = d, a.opaque = null) : (a.opaque = d, a.transparent = null))) : (d = f, d && (d.transparent ? (a.transparent = d, a.opaque = null) : (a.opaque = d, a.transparent = null)))
    }
    function xb(a) {
        var b, c, d, e, f, g, h, i = {},
            j = a.morphTargets.length,
            k = a.morphNormals.length;
        a.geometryGroups = {};
        for (b = 0, c = a.faces.length; b < c; b++) d = a.faces[b], e = d.materialIndex, g = e !== undefined ? e : -1, i[g] === undefined && (i[g] = {
            hash: g,
            counter: 0
        }), h = i[g].hash + "_" + i[g].counter, a.geometryGroups[h] === undefined && (a.geometryGroups[h] = {
            faces3: [],
            faces4: [],
            materialIndex: e,
            vertices: 0,
            numMorphTargets: j,
            numMorphNormals: k
        }), f = d instanceof THREE.Face3 ? 3 : 4, a.geometryGroups[h].vertices + f > 65535 && (i[g].counter += 1, h = i[g].hash + "_" + i[g].counter, a.geometryGroups[h] === undefined && (a.geometryGroups[h] = {
            faces3: [],
            faces4: [],
            materialIndex: e,
            vertices: 0,
            numMorphTargets: j,
            numMorphNormals: k
        })), d instanceof THREE.Face3 ? a.geometryGroups[h].faces3.push(b) : a.geometryGroups[h].faces4.push(b), a.geometryGroups[h].vertices += f;
        a.geometryGroupsList = [];
        for (var l in a.geometryGroups) a.geometryGroups[l].id = t++, a.geometryGroupsList.push(a.geometryGroups[l])
    }
    function yb(a, b) {
        var c, d, e;
        if (!a.__webglInit) {
            a.__webglInit = !0, a._modelViewMatrix = new THREE.Matrix4, a._normalMatrix = new THREE.Matrix3;
            if (a instanceof THREE.Mesh) {
                d = a.geometry;
                if (d instanceof THREE.Geometry) {
                    d.geometryGroups === undefined && xb(d);
                    for (c in d.geometryGroups) e = d.geometryGroups[c], e.__webglVertexBuffer || (Z(e), gb(e, a), d.verticesNeedUpdate = !0, d.morphTargetsNeedUpdate = !0, d.elementsNeedUpdate = !0, d.uvsNeedUpdate = !0, d.normalsNeedUpdate = !0, d.tangetsNeedUpdate = !0, d.colorsNeedUpdate = !0)
                }
            }
            else a instanceof THREE.Ribbon ? (d = a.geometry, d.__webglVertexBuffer || (Y(d), fb(d), d.verticesNeedUpdate = !0, d.colorsNeedUpdate = !0)) : a instanceof THREE.Line ? (d = a.geometry, d.__webglVertexBuffer || (X(d), eb(d, a), d.verticesNeedUpdate = !0, d.colorsNeedUpdate = !0)) : a instanceof THREE.ParticleSystem && (d = a.geometry, d.__webglVertexBuffer || (W(d), db(d, a), d.verticesNeedUpdate = !0, d.colorsNeedUpdate = !0))
        }
        if (!a.__webglActive) {
            if (a instanceof THREE.Mesh) {
                d = a.geometry;
                if (d instanceof THREE.BufferGeometry) zb(b.__webglObjects, d, a);
                else for (c in d.geometryGroups) e = d.geometryGroups[c], zb(b.__webglObjects, e, a)
            }
            else a instanceof THREE.Ribbon || a instanceof THREE.Line || a instanceof THREE.ParticleSystem ? (d = a.geometry, zb(b.__webglObjects, d, a)) : a instanceof THREE.ImmediateRenderObject || a.immediateRenderCallback ? Ab(b.__webglObjectsImmediate, a) : a instanceof THREE.Sprite ? b.__webglSprites.push(a) : a instanceof THREE.LensFlare && b.__webglFlares.push(a);
            a.__webglActive = !0
        }
    }
    function zb(a, b, c) {
        a.push({
            buffer: b,
            object: c,
            opaque: null,
            transparent: null
        })
    }
    function Ab(a, b) {
        a.push({
            object: b,
            opaque: null,
            transparent: null
        })
    }
    function Bb(a) {
        var b = a.geometry,
            c, d, e;
        if (a instanceof THREE.Mesh) if (b instanceof THREE.BufferGeometry) b.verticesNeedUpdate = !1, b.elementsNeedUpdate = !1, b.uvsNeedUpdate = !1, b.normalsNeedUpdate = !1, b.colorsNeedUpdate = !1;
        else {
            for (var f = 0, g = b.geometryGroupsList.length; f < g; f++) c = b.geometryGroupsList[f], e = hb(a, c), d = e.attributes && Cb(e), (b.verticesNeedUpdate || b.morphTargetsNeedUpdate || b.elementsNeedUpdate || b.uvsNeedUpdate || b.normalsNeedUpdate || b.colorsNeedUpdate || b.tangetsNeedUpdate || d) && pb(c, a, m.DYNAMIC_DRAW, !b.dynamic, e);
            b.verticesNeedUpdate = !1, b.morphTargetsNeedUpdate = !1, b.elementsNeedUpdate = !1, b.uvsNeedUpdate = !1, b.normalsNeedUpdate = !1, b.colorsNeedUpdate = !1, b.tangetsNeedUpdate = !1, e.attributes && Db(e)
        }
        else a instanceof THREE.Ribbon ? ((b.verticesNeedUpdate || b.colorsNeedUpdate) && ob(b, m.DYNAMIC_DRAW), b.verticesNeedUpdate = !1, b.colorsNeedUpdate = !1) : a instanceof THREE.Line ? (e = hb(a, c), d = e.attributes && Cb(e), (b.verticesNeedUpdate || b.colorsNeedUpdate || d) && nb(b, m.DYNAMIC_DRAW), b.verticesNeedUpdate = !1, b.colorsNeedUpdate = !1, e.attributes && Db(e)) : a instanceof THREE.ParticleSystem && (e = hb(a, c), d = e.attributes && Cb(e), (b.verticesNeedUpdate || b.colorsNeedUpdate || a.sortParticles || d) && mb(b, m.DYNAMIC_DRAW, a), b.verticesNeedUpdate = !1, b.colorsNeedUpdate = !1, e.attributes && Db(e))
    }
    function Cb(a) {
        for (var b in a.attributes) if (a.attributes[b].needsUpdate) return !0;
        return !1
    }
    function Db(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = !1
    }
    function Eb(a, b) {
        a instanceof THREE.Mesh || a instanceof THREE.ParticleSystem || a instanceof THREE.Ribbon || a instanceof THREE.Line ? Fb(b.__webglObjects, a) : a instanceof THREE.Sprite ? Gb(b.__webglSprites, a) : a instanceof THREE.LensFlare ? Gb(b.__webglFlares, a) : (a instanceof THREE.ImmediateRenderObject || a.immediateRenderCallback) && Fb(b.__webglObjectsImmediate, a), a.__webglActive = !1
    }
    function Fb(a, b) {
        for (var c = a.length - 1; c >= 0; c--) a[c].object === b && a.splice(c, 1)
    }
    function Gb(a, b) {
        for (var c = a.length - 1; c >= 0; c--) a[c] === b && a.splice(c, 1)
    }
    function Hb(a, b) {
        a.uniforms = THREE.UniformsUtils.clone(b.uniforms), a.vertexShader = b.vertexShader, a.fragmentShader = b.fragmentShader
    }
    function Ib(a, b, c, d, e) {
        if (!d.program || d.needsUpdate) l.initMaterial(d, b, c, e), d.needsUpdate = !1;
        if (d.morphTargets && !e.__webglMorphTargetInfluences) {
            e.__webglMorphTargetInfluences = new Float32Array(l.maxMorphTargets);
            for (var f = 0, g = l.maxMorphTargets; f < g; f++) e.__webglMorphTargetInfluences[f] = 0
        }
        var h = !1,
            i = d.program,
            j = i.uniforms,
            k = d.uniforms;
        i !== o && (m.useProgram(i), o = i, h = !0), d.id !== q && (q = d.id, h = !0);
        if (h || a !== s) m.uniformMatrix4fv(j.projectionMatrix, !1, a._projectionMatrixArray), a !== s && (s = a);
        if (h) {
            c && d.fog && Mb(k, c);
            if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) R && (Ub(i, b), R = !1), Pb(k, S);
            (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial) && Jb(k, d), d instanceof THREE.LineBasicMaterial ? Kb(k, d) : d instanceof THREE.ParticleBasicMaterial ? Lb(k, d) : d instanceof THREE.MeshPhongMaterial ? Nb(k, d) : d instanceof THREE.MeshLambertMaterial ? Ob(k, d) : d instanceof THREE.MeshDepthMaterial ? (k.mNear.value = a.near, k.mFar.value = a.far, k.opacity.value = d.opacity) : d instanceof THREE.MeshNormalMaterial && (k.opacity.value = d.opacity), e.receiveShadow && !d._shadowPass && Qb(k, b), Sb(i, d.uniformsList);
            if (d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) if (j.cameraPosition !== null) {
                var n = a.matrixWorld.getPosition();
                m.uniform3f(j.cameraPosition, n.x, n.y, n.z)
            }(d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && j.viewMatrix !== null && m.uniformMatrix4fv(j.viewMatrix, !1, a._viewMatrixArray), d.skinning && m.uniformMatrix4fv(j.boneGlobalMatrices, !1, e.boneMatrices)
        }
        return Rb(j, e), j.objectMatrix !== null && m.uniformMatrix4fv(j.objectMatrix, !1, e.matrixWorld.elements), i
    }
    function Jb(a, b) {
        a.opacity.value = b.opacity, l.gammaInput ? a.diffuse.value.copyGammaToLinear(b.color) : a.diffuse.value = b.color, a.map.texture = b.map, b.map && a.offsetRepeat.value.set(b.map.offset.x, b.map.offset.y, b.map.repeat.x, b.map.repeat.y), a.lightMap.texture = b.lightMap, a.envMap.texture = b.envMap, a.flipEnvMap.value = b.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, l.gammaInput ? a.reflectivity.value = b.reflectivity : a.reflectivity.value = b.reflectivity, a.refractionRatio.value = b.refractionRatio, a.combine.value = b.combine, a.useRefract.value = b.envMap && b.envMap.mapping instanceof THREE.CubeRefractionMapping
    }
    function Kb(a, b) {
        a.diffuse.value = b.color, a.opacity.value = b.opacity
    }
    function Lb(a, c) {
        a.psColor.value = c.color, a.opacity.value = c.opacity, a.size.value = c.size, a.scale.value = b.height / 2, a.map.texture = c.map
    }
    function Mb(a, b) {
        a.fogColor.value = b.color, b instanceof THREE.Fog ? (a.fogNear.value = b.near, a.fogFar.value = b.far) : b instanceof THREE.FogExp2 && (a.fogDensity.value = b.density)
    }
    function Nb(a, b) {
        a.shininess.value = b.shininess, l.gammaInput ? (a.ambient.value.copyGammaToLinear(b.ambient), a.emissive.value.copyGammaToLinear(b.emissive), a.specular.value.copyGammaToLinear(b.specular)) : (a.ambient.value = b.ambient, a.emissive.value = b.emissive, a.specular.value = b.specular), b.wrapAround && a.wrapRGB.value.copy(b.wrapRGB)
    }
    function Ob(a, b) {
        l.gammaInput ? (a.ambient.value.copyGammaToLinear(b.ambient), a.emissive.value.copyGammaToLinear(b.emissive)) : (a.ambient.value = b.ambient, a.emissive.value = b.emissive), b.wrapAround && a.wrapRGB.value.copy(b.wrapRGB)
    }
    function Pb(a, b) {
        a.ambientLightColor.value = b.ambient, a.directionalLightColor.value = b.directional.colors, a.directionalLightDirection.value = b.directional.positions, a.pointLightColor.value = b.point.colors, a.pointLightPosition.value = b.point.positions, a.pointLightDistance.value = b.point.distances, a.spotLightColor.value = b.spot.colors, a.spotLightPosition.value = b.spot.positions, a.spotLightDistance.value = b.spot.distances, a.spotLightDirection.value = b.spot.directions, a.spotLightAngle.value = b.spot.angles, a.spotLightExponent.value = b.spot.exponents
    }
    function Qb(a, b) {
        if (a.shadowMatrix) {
            var c = 0;
            for (var d = 0, e = b.length; d < e; d++) {
                var f = b[d];
                if (!f.castShadow) continue;
                if (f instanceof THREE.SpotLight || f instanceof THREE.DirectionalLight && !f.shadowCascade) a.shadowMap.texture[c] = f.shadowMap, a.shadowMapSize.value[c] = f.shadowMapSize, a.shadowMatrix.value[c] = f.shadowMatrix, a.shadowDarkness.value[c] = f.shadowDarkness, a.shadowBias.value[c] = f.shadowBias, c++
            }
        }
    }
    function Rb(a, b) {
        m.uniformMatrix4fv(a.modelViewMatrix, !1, b._modelViewMatrix.elements), a.normalMatrix && m.uniformMatrix3fv(a.normalMatrix, !1, b._normalMatrix.elements)
    }
    function Sb(a, b) {
        var c, d, e, f, g, h, i, j, k, n;
        for (j = 0, k = b.length; j < k; j++) {
            f = a.uniforms[b[j][1]];
            if (!f) continue;
            c = b[j][0], e = c.type, d = c.value;
            switch (e) {
            case "i":
                m.uniform1i(f, d);
                break;
            case "f":
                m.uniform1f(f, d);
                break;
            case "v2":
                m.uniform2f(f, d.x, d.y);
                break;
            case "v3":
                m.uniform3f(f, d.x, d.y, d.z);
                break;
            case "v4":
                m.uniform4f(f, d.x, d.y, d.z, d.w);
                break;
            case "c":
                m.uniform3f(f, d.r, d.g, d.b);
                break;
            case "fv1":
                m.uniform1fv(f, d);
                break;
            case "fv":
                m.uniform3fv(f, d);
                break;
            case "v2v":
                c._array || (c._array = new Float32Array(2 * d.length));
                for (h = 0, i = d.length; h < i; h++) n = h * 2, c._array[n] = d[h].x, c._array[n + 1] = d[h].y;
                m.uniform2fv(f, c._array);
                break;
            case "v3v":
                c._array || (c._array = new Float32Array(3 * d.length));
                for (h = 0, i = d.length; h < i; h++) n = h * 3, c._array[n] = d[h].x, c._array[n + 1] = d[h].y, c._array[n + 2] = d[h].z;
                m.uniform3fv(f, c._array);
                break;
            case "v4v":
                c._array || (c._array = new Float32Array(4 * d.length));
                for (h = 0, i = d.length; h < i; h++) n = h * 4, c._array[n] = d[h].x, c._array[n + 1] = d[h].y, c._array[n + 2] = d[h].z, c._array[n + 3] = d[h].w;
                m.uniform4fv(f, c._array);
                break;
            case "m4":
                c._array || (c._array = new Float32Array(16)), d.flattenToArray(c._array), m.uniformMatrix4fv(f, !1, c._array);
                break;
            case "m4v":
                c._array || (c._array = new Float32Array(16 * d.length));
                for (h = 0, i = d.length; h < i; h++) d[h].flattenToArrayOffset(c._array, h * 16);
                m.uniformMatrix4fv(f, !1, c._array);
                break;
            case "t":
                m.uniform1i(f, d), g = c.texture;
                if (!g) continue;
                g.image instanceof Array && g.image.length === 6 ? cc(g, d) : g instanceof THREE.WebGLRenderTargetCube ? dc(g, d) : l.setTexture(g, d);
                break;
            case "tv":
                if (!c._array) {
                    c._array = [];
                    for (h = 0, i = c.texture.length; h < i; h++) c._array[h] = d + h
                }
                m.uniform1iv(f, c._array);
                for (h = 0, i = c.texture.length; h < i; h++) {
                    g = c.texture[h];
                    if (!g) continue;
                    l.setTexture(g, c._array[h])
                }
            }
        }
    }
    function Tb(a, b) {
        a._modelViewMatrix.multiply(b.matrixWorldInverse, a.matrixWorld), a._normalMatrix.getInverse(a._modelViewMatrix), a._normalMatrix.transpose()
    }
    function Ub(a, b) {
        var c, d, e, g = 0,
            h = 0,
            i = 0,
            j, k, m, n, o = S,
            p = o.directional.colors,
            q = o.directional.positions,
            r = o.point.colors,
            s = o.point.positions,
            t = o.point.distances,
            u = o.spot.colors,
            v = o.spot.positions,
            w = o.spot.distances,
            x = o.spot.directions,
            y = o.spot.angles,
            z = o.spot.exponents,
            A = 0,
            B = 0,
            C = 0,
            D = 0,
            E = 0,
            F = 0;
        for (c = 0, d = b.length; c < d; c++) {
            e = b[c];
            if (e.onlyShadow) continue;
            j = e.color, m = e.intensity, n = e.distance, e instanceof THREE.AmbientLight ? l.gammaInput ? (g += j.r * j.r, h += j.g * j.g, i += j.b * j.b) : (g += j.r, h += j.g, i += j.b) : e instanceof THREE.DirectionalLight ? (D = A * 3, l.gammaInput ? (p[D] = j.r * j.r * m * m, p[D + 1] = j.g * j.g * m * m, p[D + 2] = j.b * j.b * m * m) : (p[D] = j.r * m, p[D + 1] = j.g * m, p[D + 2] = j.b * m), Q.copy(e.matrixWorld.getPosition()), Q.subSelf(e.target.matrixWorld.getPosition()), Q.normalize(), q[D] = Q.x, q[D + 1] = Q.y, q[D + 2] = Q.z, A += 1) : e instanceof THREE.PointLight ? (E = B * 3, l.gammaInput ? (r[E] = j.r * j.r * m * m, r[E + 1] = j.g * j.g * m * m, r[E + 2] = j.b * j.b * m * m) : (r[E] = j.r * m, r[E + 1] = j.g * m, r[E + 2] = j.b * m), k = e.matrixWorld.getPosition(), s[E] = k.x, s[E + 1] = k.y, s[E + 2] = k.z, t[B] = n, B += 1) : e instanceof THREE.SpotLight && (F = C * 3, l.gammaInput ? (u[F] = j.r * j.r * m * m, u[F + 1] = j.g * j.g * m * m, u[F + 2] = j.b * j.b * m * m) : (u[F] = j.r * m, u[F + 1] = j.g * m, u[F + 2] = j.b * m), k = e.matrixWorld.getPosition(), v[F] = k.x, v[F + 1] = k.y, v[F + 2] = k.z, w[C] = n, Q.copy(k), Q.subSelf(e.target.matrixWorld.getPosition()), Q.normalize(), x[F] = Q.x, x[F + 1] = Q.y, x[F + 2] = Q.z, y[C] = Math.cos(e.angle), z[C] = e.exponent, C += 1)
        }
        for (c = A * 3, d = p.length; c < d; c++) p[c] = 0;
        for (c = B * 3, d = r.length; c < d; c++) r[c] = 0;
        for (c = C * 3, d = u.length; c < d; c++) u[c] = 0;
        o.directional.length = A, o.point.length = B, o.spot.length = C, o.ambient[0] = g, o.ambient[1] = h, o.ambient[2] = i
    }
    function Vb(a) {
        a !== F && (m.lineWidth(a), F = a)
    }
    function Wb(a, b, c) {
        C !== a && (a ? m.enable(m.POLYGON_OFFSET_FILL) : m.disable(m.POLYGON_OFFSET_FILL), C = a), a && (D !== b || E !== c) && (m.polygonOffset(b, c), D = b, E = c)
    }
    function Xb(a, b, d, e, f, g) {
        var h, i, j, k, o = [];
        a ? o.push(a) : (o.push(b), o.push(d));
        for (h in g) o.push(h), o.push(g[h]);
        k = o.join();
        for (h = 0, i = n.length; h < i; h++) if (n[h].code === k) return n[h].program;
        j = m.createProgram();
        var p = ["precision " + c + " float;", T > 0 ? "#define VERTEX_TEXTURES" : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", l.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + g.maxDirLights, "#define MAX_POINT_LIGHTS " + g.maxPointLights, "#define MAX_SPOT_LIGHTS " + g.maxSpotLights, "#define MAX_SHADOWS " + g.maxShadows, "#define MAX_BONES " + g.maxBones, g.map ? "#define USE_MAP" : "", g.envMap ? "#define USE_ENVMAP" : "", g.lightMap ? "#define USE_LIGHTMAP" : "", g.vertexColors ? "#define USE_COLOR" : "", g.skinning ? "#define USE_SKINNING" : "", g.morphTargets ? "#define USE_MORPHTARGETS" : "", g.morphNormals ? "#define USE_MORPHNORMALS" : "", g.perPixel ? "#define PHONG_PER_PIXEL" : "", g.wrapAround ? "#define WRAP_AROUND" : "", g.doubleSided ? "#define DOUBLE_SIDED" : "", g.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", g.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", g.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", g.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", g.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "attribute vec3 morphTarget0;", "attribute vec3 morphTarget1;", "attribute vec3 morphTarget2;", "attribute vec3 morphTarget3;", "#ifdef USE_MORPHNORMALS", "attribute vec3 morphNormal0;", "attribute vec3 morphNormal1;", "attribute vec3 morphNormal2;", "attribute vec3 morphNormal3;", "#else", "attribute vec3 morphTarget4;", "attribute vec3 morphTarget5;", "attribute vec3 morphTarget6;", "attribute vec3 morphTarget7;", "#endif", "#endif", "#ifdef USE_SKINNING", "attribute vec4 skinVertexA;", "attribute vec4 skinVertexB;", "attribute vec4 skinIndex;", "attribute vec4 skinWeight;", "#endif", ""].join("\n"),
            q = ["precision " + c + " float;", "#define MAX_DIR_LIGHTS " + g.maxDirLights, "#define MAX_POINT_LIGHTS " + g.maxPointLights, "#define MAX_SPOT_LIGHTS " + g.maxSpotLights, "#define MAX_SHADOWS " + g.maxShadows, g.alphaTest ? "#define ALPHATEST " + g.alphaTest : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", l.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", g.useFog && g.fog ? "#define USE_FOG" : "", g.useFog && g.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", g.map ? "#define USE_MAP" : "", g.envMap ? "#define USE_ENVMAP" : "", g.lightMap ? "#define USE_LIGHTMAP" : "", g.vertexColors ? "#define USE_COLOR" : "", g.metal ? "#define METAL" : "", g.perPixel ? "#define PHONG_PER_PIXEL" : "", g.wrapAround ? "#define WRAP_AROUND" : "", g.doubleSided ? "#define DOUBLE_SIDED" : "", g.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", g.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", g.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", g.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n");
        m.attachShader(j, $b("fragment", q + b)), m.attachShader(j, $b("vertex", p + d)), m.linkProgram(j), m.getProgramParameter(j, m.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + m.getProgramParameter(j, m.VALIDATE_STATUS) + ", gl error [" + m.getError() + "]"), j.uniforms = {}, j.attributes = {};
        var r, s, t, u;
        r = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "boneGlobalMatrices", "morphTargetInfluences"];
        for (s in e) r.push(s);
        Yb(j, r), r = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
        for (u = 0; u < g.maxMorphTargets; u++) r.push("morphTarget" + u);
        for (u = 0; u < g.maxMorphNormals; u++) r.push("morphNormal" + u);
        for (t in f) r.push(t);
        return Zb(j, r), j.id = n.length, n.push({
            program: j,
            code: k
        }), l.info.memory.programs = n.length, j
    }
    function Yb(a, b) {
        var c, d, e;
        for (c = 0, d = b.length; c < d; c++) e = b[c], a.uniforms[e] = m.getUniformLocation(a, e)
    }
    function Zb(a, b) {
        var c, d, e;
        for (c = 0, d = b.length; c < d; c++) e = b[c], a.attributes[e] = m.getAttribLocation(a, e)
    }
    function $b(a, b) {
        var c;
        return a === "fragment" ? c = m.createShader(m.FRAGMENT_SHADER) : a === "vertex" && (c = m.createShader(m.VERTEX_SHADER)), m.shaderSource(c, b), m.compileShader(c), m.getShaderParameter(c, m.COMPILE_STATUS) ? c : (console.error(m.getShaderInfoLog(c)), console.error(b), null)
    }
    function _b(a) {
        return (a & a - 1) === 0
    }
    function ac(a, b, c) {
        c ? (m.texParameteri(a, m.TEXTURE_WRAP_S, ic(b.wrapS)), m.texParameteri(a, m.TEXTURE_WRAP_T, ic(b.wrapT)), m.texParameteri(a, m.TEXTURE_MAG_FILTER, ic(b.magFilter)), m.texParameteri(a, m.TEXTURE_MIN_FILTER, ic(b.minFilter))) : (m.texParameteri(a, m.TEXTURE_WRAP_S, m.CLAMP_TO_EDGE), m.texParameteri(a, m.TEXTURE_WRAP_T, m.CLAMP_TO_EDGE), m.texParameteri(a, m.TEXTURE_MAG_FILTER, hc(b.magFilter)), m.texParameteri(a, m.TEXTURE_MIN_FILTER, hc(b.minFilter)))
    }
    function bc(a, b) {
        if (a.width <= b && a.height <= b) return a;
        var c = Math.max(a.width, a.height),
            d = Math.floor(a.width * b / c),
            e = Math.floor(a.height * b / c),
            f = document.createElement("canvas");
        f.width = d, f.height = e;
        var g = f.getContext("2d");
        return g.drawImage(a, 0, 0, a.width, a.height, 0, 0, d, e), f
    }
    function cc(a, b) {
        if (a.image.length === 6) if (a.needsUpdate) {
            a.image.__webglTextureCube || (a.image.__webglTextureCube = m.createTexture()), m.activeTexture(m.TEXTURE0 + b), m.bindTexture(m.TEXTURE_CUBE_MAP, a.image.__webglTextureCube);
            var c = [];
            for (var d = 0; d < 6; d++) l.autoScaleCubemaps ? c[d] = bc(a.image[d], V) : c[d] = a.image[d];
            var e = c[0],
                f = _b(e.width) && _b(e.height),
                g = ic(a.format),
                h = ic(a.type);
            ac(m.TEXTURE_CUBE_MAP, a, f);
            for (var d = 0; d < 6; d++) m.texImage2D(m.TEXTURE_CUBE_MAP_POSITIVE_X + d, 0, g, g, h, c[d]);
            a.generateMipmaps && f && m.generateMipmap(m.TEXTURE_CUBE_MAP), a.needsUpdate = !1, a.onUpdate && a.onUpdate()
        }
        else m.activeTexture(m.TEXTURE0 + b), m.bindTexture(m.TEXTURE_CUBE_MAP, a.image.__webglTextureCube)
    }
    function dc(a, b) {
        m.activeTexture(m.TEXTURE0 + b), m.bindTexture(m.TEXTURE_CUBE_MAP, a.__webglTexture)
    }
    function ec(a, b, c) {
        m.bindFramebuffer(m.FRAMEBUFFER, a), m.framebufferTexture2D(m.FRAMEBUFFER, m.COLOR_ATTACHMENT0, c, b.__webglTexture, 0)
    }
    function fc(a, b) {
        m.bindRenderbuffer(m.RENDERBUFFER, a), b.depthBuffer && !b.stencilBuffer ? (m.renderbufferStorage(m.RENDERBUFFER, m.DEPTH_COMPONENT16, b.width, b.height), m.framebufferRenderbuffer(m.FRAMEBUFFER, m.DEPTH_ATTACHMENT, m.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (m.renderbufferStorage(m.RENDERBUFFER, m.DEPTH_STENCIL, b.width, b.height), m.framebufferRenderbuffer(m.FRAMEBUFFER, m.DEPTH_STENCIL_ATTACHMENT, m.RENDERBUFFER, a)) : m.renderbufferStorage(m.RENDERBUFFER, m.RGBA4, b.width, b.height)
    }
    function gc(a) {
        a instanceof THREE.WebGLRenderTargetCube ? (m.bindTexture(m.TEXTURE_CUBE_MAP, a.__webglTexture), m.generateMipmap(m.TEXTURE_CUBE_MAP), m.bindTexture(m.TEXTURE_CUBE_MAP, null)) : (m.bindTexture(m.TEXTURE_2D, a.__webglTexture), m.generateMipmap(m.TEXTURE_2D), m.bindTexture(m.TEXTURE_2D, null))
    }
    function hc(a) {
        switch (a) {
        case THREE.NearestFilter:
        case THREE.NearestMipMapNearestFilter:
        case THREE.NearestMipMapLinearFilter:
            return m.NEAREST;
        case THREE.LinearFilter:
        case THREE.LinearMipMapNearestFilter:
        case THREE.LinearMipMapLinearFilter:
        default:
            return m.LINEAR
        }
    }
    function ic(a) {
        switch (a) {
        case THREE.RepeatWrapping:
            return m.REPEAT;
        case THREE.ClampToEdgeWrapping:
            return m.CLAMP_TO_EDGE;
        case THREE.MirroredRepeatWrapping:
            return m.MIRRORED_REPEAT;
        case THREE.NearestFilter:
            return m.NEAREST;
        case THREE.NearestMipMapNearestFilter:
            return m.NEAREST_MIPMAP_NEAREST;
        case THREE.NearestMipMapLinearFilter:
            return m.NEAREST_MIPMAP_LINEAR;
        case THREE.LinearFilter:
            return m.LINEAR;
        case THREE.LinearMipMapNearestFilter:
            return m.LINEAR_MIPMAP_NEAREST;
        case THREE.LinearMipMapLinearFilter:
            return m.LINEAR_MIPMAP_LINEAR;
        case THREE.ByteType:
            return m.BYTE;
        case THREE.UnsignedByteType:
            return m.UNSIGNED_BYTE;
        case THREE.ShortType:
            return m.SHORT;
        case THREE.UnsignedShortType:
            return m.UNSIGNED_SHORT;
        case THREE.IntType:
            return m.INT;
        case THREE.UnsignedIntType:
            return m.UNSIGNED_INT;
        case THREE.FloatType:
            return m.FLOAT;
        case THREE.AlphaFormat:
            return m.ALPHA;
        case THREE.RGBFormat:
            return m.RGB;
        case THREE.RGBAFormat:
            return m.RGBA;
        case THREE.LuminanceFormat:
            return m.LUMINANCE;
        case THREE.LuminanceAlphaFormat:
            return m.LUMINANCE_ALPHA;
        case THREE.AddEquation:
            return m.FUNC_ADD;
        case THREE.SubtractEquation:
            return m.FUNC_SUBTRACT;
        case THREE.ReverseSubtractEquation:
            return m.FUNC_REVERSE_SUBTRACT;
        case THREE.ZeroFactor:
            return m.ZERO;
        case THREE.OneFactor:
            return m.ONE;
        case THREE.SrcColorFactor:
            return m.SRC_COLOR;
        case THREE.OneMinusSrcColorFactor:
            return m.ONE_MINUS_SRC_COLOR;
        case THREE.SrcAlphaFactor:
            return m.SRC_ALPHA;
        case THREE.OneMinusSrcAlphaFactor:
            return m.ONE_MINUS_SRC_ALPHA;
        case THREE.DstAlphaFactor:
            return m.DST_ALPHA;
        case THREE.OneMinusDstAlphaFactor:
            return m.ONE_MINUS_DST_ALPHA;
        case THREE.DstColorFactor:
            return m.DST_COLOR;
        case THREE.OneMinusDstColorFactor:
            return m.ONE_MINUS_DST_COLOR;
        case THREE.SrcAlphaSaturateFactor:
            return m.SRC_ALPHA_SATURATE
        }
        return 0
    }
    function jc(a) {
        var b = 50;
        return a !== undefined && a instanceof THREE.SkinnedMesh && (b = a.bones.length), b
    }
    function kc(a) {
        var b, c, d, e, f, g, h, i, j;
        e = f = g = h = i = j = 0;
        for (b = 0, c = a.length; b < c; b++) {
            d = a[b];
            if (d.onlyShadow) continue;
            d instanceof THREE.DirectionalLight && e++, d instanceof THREE.PointLight && f++, d instanceof THREE.SpotLight && g++
        }
        return f + g + e <= k ? (h = e, i = f, j = g) : (h = Math.ceil(k * e / (f + e)), i = k - h, j = i), {
            directional: h,
            point: i,
            spot: j
        }
    }
    function lc(a) {
        var b, c, d, e = 0;
        for (b = 0, c = a.length; b < c; b++) {
            d = a[b];
            if (!d.castShadow) continue;
            d instanceof THREE.SpotLight && e++, d instanceof THREE.DirectionalLight && !d.shadowCascade && e++
        }
        return e
    }
    function mc() {
        var a;
        try {
            if (!(a = b.getContext("experimental-webgl", {
                alpha: d,
                premultipliedAlpha: e,
                antialias: f,
                stencil: g,
                preserveDrawingBuffer: h
            }))) throw "Error creating WebGL context."
        }
        catch (c) {
            console.error(c)
        }
        return a.getExtension("OES_texture_float") || console.log("THREE.WebGLRenderer: Float textures not supported."), a
    }
    function nc() {
        m.clearColor(0, 0, 0, 1), m.clearDepth(1), m.clearStencil(0), m.enable(m.DEPTH_TEST), m.depthFunc(m.LEQUAL), m.frontFace(m.CCW), m.cullFace(m.BACK), m.enable(m.CULL_FACE), m.enable(m.BLEND), m.blendEquation(m.FUNC_ADD), m.blendFunc(m.SRC_ALPHA, m.ONE_MINUS_SRC_ALPHA), m.clearColor(i.r, i.g, i.b, j)
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION), a = a || {};
    var b = a.canvas !== undefined ? a.canvas : document.createElement("canvas"),
        c = a.precision !== undefined ? a.precision : "highp",
        d = a.alpha !== undefined ? a.alpha : !0,
        e = a.premultipliedAlpha !== undefined ? a.premultipliedAlpha : !0,
        f = a.antialias !== undefined ? a.antialias : !1,
        g = a.stencil !== undefined ? a.stencil : !0,
        h = a.preserveDrawingBuffer !== undefined ? a.preserveDrawingBuffer : !1,
        i = a.clearColor !== undefined ? new THREE.Color(a.clearColor) : new THREE.Color(0),
        j = a.clearAlpha !== undefined ? a.clearAlpha : 0,
        k = a.maxLights !== undefined ? a.maxLights : 4;
    this.domElement = b, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.autoUpdateObjects = !0, this.autoUpdateScene = !0, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyBasedShading = !1, this.shadowMapEnabled = !1, this.shadowMapAutoUpdate = !0, this.shadowMapSoft = !0, this.shadowMapCullFrontFaces = !0, this.shadowMapDebug = !1, this.shadowMapCascade = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.renderPluginsPre = [], this.renderPluginsPost = [], this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        }
    };
    var l = this,
        m, n = [],
        o = null,
        p = null,
        q = -1,
        r = null,
        s = null,
        t = 0,
        u = -1,
        v = -1,
        w = -1,
        x = -1,
        y = -1,
        z = -1,
        A = -1,
        B = -1,
        C = null,
        D = null,
        E = null,
        F = null,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = new THREE.Frustum,
        N = new THREE.Matrix4,
        O = new THREE.Matrix4,
        P = new THREE.Vector4,
        Q = new THREE.Vector3,
        R = !0,
        S = {
            ambient: [0, 0, 0],
            directional: {
                length: 0,
                colors: new Array,
                positions: new Array
            },
            point: {
                length: 0,
                colors: new Array,
                positions: new Array,
                distances: new Array
            },
            spot: {
                length: 0,
                colors: new Array,
                positions: new Array,
                distances: new Array,
                directions: new Array,
                angles: new Array,
                exponents: new Array
            }
        };
    m = mc(), nc(), this.context = m;
    var T = m.getParameter(m.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
        U = m.getParameter(m.MAX_TEXTURE_SIZE),
        V = m.getParameter(m.MAX_CUBE_MAP_TEXTURE_SIZE);
    this.getContext = function() {
        return m
    }, this.supportsVertexTextures = function() {
        return T > 0
    }, this.setSize = function(a, c) {
        b.width = a, b.height = c, this.setViewport(0, 0, b.width, b.height)
    }, this.setViewport = function(a, b, c, d) {
        G = a, H = b, I = c, J = d, m.viewport(G, H, I, J)
    }, this.setScissor = function(a, b, c, d) {
        m.scissor(a, b, c, d)
    }, this.enableScissorTest = function(a) {
        a ? m.enable(m.SCISSOR_TEST) : m.disable(m.SCISSOR_TEST)
    }, this.setClearColorHex = function(a, b) {
        i.setHex(a), j = b, m.clearColor(i.r, i.g, i.b, j)
    }, this.setClearColor = function(a, b) {
        i.copy(a), j = b, m.clearColor(i.r, i.g, i.b, j)
    }, this.getClearColor = function() {
        return i
    }, this.getClearAlpha = function() {
        return j
    }, this.clear = function(a, b, c) {
        var d = 0;
        if (a === undefined || a) d |= m.COLOR_BUFFER_BIT;
        if (b === undefined || b) d |= m.DEPTH_BUFFER_BIT;
        if (c === undefined || c) d |= m.STENCIL_BUFFER_BIT;
        m.clear(d)
    }, this.clearTarget = function(a, b, c, d) {
        this.setRenderTarget(a), this.clear(b, c, d)
    }, this.addPostPlugin = function(a) {
        a.init(this), this.renderPluginsPost.push(a)
    }, this.addPrePlugin = function(a) {
        a.init(this), this.renderPluginsPre.push(a)
    }, this.deallocateObject = function(a) {
        if (!a.__webglInit) return;
        a.__webglInit = !1, delete a._modelViewMatrix, delete a._normalMatrix, delete a._normalMatrixArray, delete a._modelViewMatrixArray, delete a._objectMatrixArray;
        if (a instanceof THREE.Mesh) for (var b in a.geometry.geometryGroups) bb(a.geometry.geometryGroups[b]);
        else a instanceof THREE.Ribbon ? ab(a.geometry) : a instanceof THREE.Line ? _(a.geometry) : a instanceof THREE.ParticleSystem && $(a.geometry)
    }, this.deallocateTexture = function(a) {
        if (!a.__webglInit) return;
        a.__webglInit = !1, m.deleteTexture(a.__webglTexture), l.info.memory.textures--
    }, this.deallocateRenderTarget = function(a) {
        if (!a || !a.__webglTexture) return;
        m.deleteTexture(a.__webglTexture);
        if (a instanceof THREE.WebGLRenderTargetCube) for (var b = 0; b < 6; b++) m.deleteFramebuffer(a.__webglFramebuffer[b]), m.deleteRenderbuffer(a.__webglRenderbuffer[b]);
        else m.deleteFramebuffer(a.__webglFramebuffer), m.deleteRenderbuffer(a.__webglRenderbuffer)
    }, this.updateShadowMap = function(a, b) {
        o = null, w = -1, A = -1, B = -1, r = -1, q = -1, R = !0, u = -1, v = -1, this.shadowMapPlugin.update(a, b)
    }, this.renderBufferImmediate = function(a, b, c) {
        a.__webglVertexBuffer || (a.__webglVertexBuffer = m.createBuffer()), a.__webglNormalBuffer || (a.__webglNormalBuffer = m.createBuffer()), a.hasPos && (m.bindBuffer(m.ARRAY_BUFFER, a.__webglVertexBuffer), m.bufferData(m.ARRAY_BUFFER, a.positionArray, m.DYNAMIC_DRAW), m.enableVertexAttribArray(b.attributes.position), m.vertexAttribPointer(b.attributes.position, 3, m.FLOAT, !1, 0, 0));
        if (a.hasNormal) {
            m.bindBuffer(m.ARRAY_BUFFER, a.__webglNormalBuffer);
            if (c === THREE.FlatShading) {
                var d, e, f, g, h, i, j, k, l, n, o, p, q, r, s = a.count * 3;
                for (r = 0; r < s; r += 9) q = a.normalArray, g = q[r], j = q[r + 1], n = q[r + 2], h = q[r + 3], k = q[r + 4], o = q[r + 5], i = q[r + 6], l = q[r + 7], p = q[r + 8], d = (g + h + i) / 3, e = (j + k + l) / 3, f = (n + o + p) / 3, q[r] = d, q[r + 1] = e, q[r + 2] = f, q[r + 3] = d, q[r + 4] = e, q[r + 5] = f, q[r + 6] = d, q[r + 7] = e, q[r + 8] = f
            }
            m.bufferData(m.ARRAY_BUFFER, a.normalArray, m.DYNAMIC_DRAW), m.enableVertexAttribArray(b.attributes.normal), m.vertexAttribPointer(b.attributes.normal, 3, m.FLOAT, !1, 0, 0)
        }
        m.drawArrays(m.TRIANGLES, 0, a.count), a.count = 0
    }, this.renderBufferDirect = function(a, b, c, d, e, f) {
        if (d.visible === !1) return;
        var g, h;
        g = Ib(a, b, c, d, f), h = g.attributes;
        var o = !1,
            p = d.wireframe ? 1 : 0,
            q = e.id * 16777215 + g.id * 2 + p;
        q !== r && (r = q, o = !0);
        if (f instanceof THREE.Mesh) {
            var s = e.offsets;
            for (var t = 0, u = s.length; t < u; ++t) o && (m.bindBuffer(m.ARRAY_BUFFER, e.vertexPositionBuffer), m.vertexAttribPointer(h.position, e.vertexPositionBuffer.itemSize, m.FLOAT, !1, 0, s[t].index * 4 * 3), h.normal >= 0 && e.vertexNormalBuffer && (m.bindBuffer(m.ARRAY_BUFFER, e.vertexNormalBuffer), m.vertexAttribPointer(h.normal, e.vertexNormalBuffer.itemSize, m.FLOAT, !1, 0, s[t].index * 4 * 3)), h.uv >= 0 && e.vertexUvBuffer && (e.vertexUvBuffer ? (m.bindBuffer(m.ARRAY_BUFFER, e.vertexUvBuffer), m.vertexAttribPointer(h.uv, e.vertexUvBuffer.itemSize, m.FLOAT, !1, 0, s[t].index * 4 * 2), m.enableVertexAttribArray(h.uv)) : m.disableVertexAttribArray(h.uv)), h.color >= 0 && e.vertexColorBuffer && (m.bindBuffer(m.ARRAY_BUFFER, e.vertexColorBuffer), m.vertexAttribPointer(h.color, e.vertexColorBuffer.itemSize, m.FLOAT, !1, 0, s[t].index * 4 * 4)), m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, e.vertexIndexBuffer)), m.drawElements(m.TRIANGLES, s[t].count, m.UNSIGNED_SHORT, s[t].start * 2), l.info.render.calls++, l.info.render.vertices += s[t].count, l.info.render.faces += s[t].count / 3
        }
    }, this.renderBuffer = function(a, b, c, d, e, f) {
        if (d.visible === !1) return;
        var g, h, j, n, o, p;
        g = Ib(a, b, c, d, f), h = g.attributes;
        var q = !1,
            s = d.wireframe ? 1 : 0,
            t = e.id * 16777215 + g.id * 2 + s;
        t !== r && (r = t, q = !0), !d.morphTargets && h.position >= 0 ? q && (m.bindBuffer(m.ARRAY_BUFFER, e.__webglVertexBuffer), m.vertexAttribPointer(h.position, 3, m.FLOAT, !1, 0, 0)) : f.morphTargetBase && qb(d, e, f);
        if (q) {
            if (e.__webglCustomAttributesList) for (o = 0, p = e.__webglCustomAttributesList.length; o < p; o++) n = e.__webglCustomAttributesList[o], h[n.buffer.belongsToAttribute] >= 0 && (m.bindBuffer(m.ARRAY_BUFFER, n.buffer), m.vertexAttribPointer(h[n.buffer.belongsToAttribute], n.size, m.FLOAT, !1, 0, 0));
            h.color >= 0 && (m.bindBuffer(m.ARRAY_BUFFER, e.__webglColorBuffer), m.vertexAttribPointer(h.color, 3, m.FLOAT, !1, 0, 0)), h.normal >= 0 && (m.bindBuffer(m.ARRAY_BUFFER, e.__webglNormalBuffer), m.vertexAttribPointer(h.normal, 3, m.FLOAT, !1, 0, 0)), h.tangent >= 0 && (m.bindBuffer(m.ARRAY_BUFFER, e.__webglTangentBuffer), m.vertexAttribPointer(h.tangent, 4, m.FLOAT, !1, 0, 0)), h.uv >= 0 && (e.__webglUVBuffer ? (m.bindBuffer(m.ARRAY_BUFFER, e.__webglUVBuffer), m.vertexAttribPointer(h.uv, 2, m.FLOAT, !1, 0, 0), m.enableVertexAttribArray(h.uv)) : m.disableVertexAttribArray(h.uv)), h.uv2 >= 0 && (e.__webglUV2Buffer ? (m.bindBuffer(m.ARRAY_BUFFER, e.__webglUV2Buffer), m.vertexAttribPointer(h.uv2, 2, m.FLOAT, !1, 0, 0), m.enableVertexAttribArray(h.uv2)) : m.disableVertexAttribArray(h.uv2)), d.skinning && h.skinVertexA >= 0 && h.skinVertexB >= 0 && h.skinIndex >= 0 && h.skinWeight >= 0 && (m.bindBuffer(m.ARRAY_BUFFER, e.__webglSkinVertexABuffer), m.vertexAttribPointer(h.skinVertexA, 4, m.FLOAT, !1, 0, 0), m.bindBuffer(m.ARRAY_BUFFER, e.__webglSkinVertexBBuffer), m.vertexAttribPointer(h.skinVertexB, 4, m.FLOAT, !1, 0, 0), m.bindBuffer(m.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), m.vertexAttribPointer(h.skinIndex, 4, m.FLOAT, !1, 0, 0), m.bindBuffer(m.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), m.vertexAttribPointer(h.skinWeight, 4, m.FLOAT, !1, 0, 0))
        }
        f instanceof THREE.Mesh ? (d.wireframe ? (Vb(d.wireframeLinewidth), q && m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), m.drawElements(m.LINES, e.__webglLineCount, m.UNSIGNED_SHORT, 0)) : (q && m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), m.drawElements(m.TRIANGLES, e.__webglFaceCount, m.UNSIGNED_SHORT, 0)), l.info.render.calls++, l.info.render.vertices += e.__webglFaceCount, l.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (j = f.type === THREE.LineStrip ? m.LINE_STRIP : m.LINES, Vb(d.linewidth), m.drawArrays(j, 0, e.__webglLineCount), l.info.render.calls++) : f instanceof THREE.ParticleSystem ? (m.drawArrays(m.POINTS, 0, e.__webglParticleCount), l.info.render.calls++, l.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (m.drawArrays(m.TRIANGLE_STRIP, 0, e.__webglVertexCount), l.info.render.calls++)
    }, this.render = function(a, b, c, d) {
        var e, f, g, h, i, j = a.__lights,
            k = a.fog;
        q = -1, R = !0, b.parent === undefined && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(b)), this.autoUpdateScene && a.updateMatrixWorld(), b._viewMatrixArray || (b._viewMatrixArray = new Float32Array(16)), b._projectionMatrixArray || (b._projectionMatrixArray = new Float32Array(16)), b.matrixWorldInverse.getInverse(b.matrixWorld), b.matrixWorldInverse.flattenToArray(b._viewMatrixArray), b.projectionMatrix.flattenToArray(b._projectionMatrixArray), N.multiply(b.projectionMatrix, b.matrixWorldInverse), M.setFromMatrix(N), this.autoUpdateObjects && this.initWebGLObjects(a), sb(this.renderPluginsPre, a, b), l.info.render.calls = 0, l.info.render.vertices = 0, l.info.render.faces = 0, l.info.render.points = 0, this.setRenderTarget(c), (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), i = a.__webglObjects;
        for (e = 0, f = i.length; e < f; e++) g = i[e], h = g.object, g.render = !1, h.visible && (!(h instanceof THREE.Mesh || h instanceof THREE.ParticleSystem) || !h.frustumCulled || M.contains(h)) && (Tb(h, b), wb(g), g.render = !0, this.sortObjects && (h.renderDepth ? g.z = h.renderDepth : (P.copy(h.matrixWorld.getPosition()), N.multiplyVector3(P), g.z = P.z)));
        this.sortObjects && i.sort(rb), i = a.__webglObjectsImmediate;
        for (e = 0, f = i.length; e < f; e++) g = i[e], h = g.object, h.visible && (Tb(h, b), vb(g));
        if (a.overrideMaterial) {
            var m = a.overrideMaterial;
            this.setBlending(m.blending, m.blendEquation, m.blendSrc, m.blendDst), this.setDepthTest(m.depthTest), this.setDepthWrite(m.depthWrite), Wb(m.polygonOffset, m.polygonOffsetFactor, m.polygonOffsetUnits), tb(a.__webglObjects, !1, "", b, j, k, !0, m), ub(a.__webglObjectsImmediate, "", b, j, k, !1, m)
        }
        else this.setBlending(THREE.NormalBlending), tb(a.__webglObjects, !0, "opaque", b, j, k, !1), ub(a.__webglObjectsImmediate, "opaque", b, j, k, !1), tb(a.__webglObjects, !1, "transparent", b, j, k, !0), ub(a.__webglObjectsImmediate, "transparent", b, j, k, !0);
        sb(this.renderPluginsPost, a, b), c && c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter && gc(c), this.setDepthTest(!0), this.setDepthWrite(!0)
    }, this.renderImmediateObject = function(a, b, c, d, e) {
        var f = Ib(a, b, c, d, e);
        r = -1, l.setObjectFaces(e), e.immediateRenderCallback ? e.immediateRenderCallback(f, m, M) : e.render(function(a) {
            l.renderBufferImmediate(a, f, d.shading)
        })
    }, this.initWebGLObjects = function(a) {
        a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = []);
        while (a.__objectsAdded.length) yb(a.__objectsAdded[0], a), a.__objectsAdded.splice(0, 1);
        while (a.__objectsRemoved.length) Eb(a.__objectsRemoved[0], a), a.__objectsRemoved.splice(0, 1);
        for (var b = 0, c = a.__webglObjects.length; b < c; b++) Bb(a.__webglObjects[b].object)
    }, this.initMaterial = function(a, b, c, d) {
        var e, f, h, i, j, k, l, n;
        a instanceof THREE.MeshDepthMaterial ? n = "depth" : a instanceof THREE.MeshNormalMaterial ? n = "normal" : a instanceof THREE.MeshBasicMaterial ? n = "basic" : a instanceof THREE.MeshLambertMaterial ? n = "lambert" : a instanceof THREE.MeshPhongMaterial ? n = "phong" : a instanceof THREE.LineBasicMaterial ? n = "basic" : a instanceof THREE.ParticleBasicMaterial && (n = "particle_basic"), n && Hb(a, THREE.ShaderLib[n]), j = kc(b), l = lc(b), k = jc(d), i = {
            map: !! a.map,
            envMap: !! a.envMap,
            lightMap: !! a.lightMap,
            vertexColors: a.vertexColors,
            fog: c,
            useFog: a.fog,
            sizeAttenuation: a.sizeAttenuation,
            skinning: a.skinning,
            maxBones: k,
            morphTargets: a.morphTargets,
            morphNormals: a.morphNormals,
            maxMorphTargets: this.maxMorphTargets,
            maxMorphNormals: this.maxMorphNormals,
            maxDirLights: j.directional,
            maxPointLights: j.point,
            maxSpotLights: j.spot,
            maxShadows: l,
            shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
            shadowMapSoft: this.shadowMapSoft,
            shadowMapDebug: this.shadowMapDebug,
            shadowMapCascade: this.shadowMapCascade,
            alphaTest: a.alphaTest,
            metal: a.metal,
            perPixel: a.perPixel,
            wrapAround: a.wrapAround,
            doubleSided: d && d.doubleSided
        }, a.program = Xb(n, a.fragmentShader, a.vertexShader, a.uniforms, a.attributes, i);
        var o = a.program.attributes;
        o.position >= 0 && m.enableVertexAttribArray(o.position), o.color >= 0 && m.enableVertexAttribArray(o.color), o.normal >= 0 && m.enableVertexAttribArray(o.normal), o.tangent >= 0 && m.enableVertexAttribArray(o.tangent), a.skinning && o.skinVertexA >= 0 && o.skinVertexB >= 0 && o.skinIndex >= 0 && o.skinWeight >= 0 && (m.enableVertexAttribArray(o.skinVertexA), m.enableVertexAttribArray(o.skinVertexB), m.enableVertexAttribArray(o.skinIndex), m.enableVertexAttribArray(o.skinWeight));
        if (a.attributes) for (f in a.attributes) o[f] !== undefined && o[f] >= 0 && m.enableVertexAttribArray(o[f]);
        if (a.morphTargets) {
            a.numSupportedMorphTargets = 0;
            var p, q = "morphTarget";
            for (h = 0; h < this.maxMorphTargets; h++) p = q + h, o[p] >= 0 && (m.enableVertexAttribArray(o[p]), a.numSupportedMorphTargets++)
        }
        if (a.morphNormals) {
            a.numSupportedMorphNormals = 0;
            var p, q = "morphNormal";
            for (h = 0; h < this.maxMorphNormals; h++) p = q + h, o[p] >= 0 && (m.enableVertexAttribArray(o[p]), a.numSupportedMorphNormals++)
        }
        a.uniformsList = [];
        for (e in a.uniforms) a.uniformsList.push([a.uniforms[e], e])
    }, this.setFaceCulling = function(a, b) {
        a ? (!b || b === "ccw" ? m.frontFace(m.CCW) : m.frontFace(m.CW), a === "back" ? m.cullFace(m.BACK) : a === "front" ? m.cullFace(m.FRONT) : m.cullFace(m.FRONT_AND_BACK), m.enable(m.CULL_FACE)) : m.disable(m.CULL_FACE)
    }, this.setObjectFaces = function(a) {
        u !== a.doubleSided && (a.doubleSided ? m.disable(m.CULL_FACE) : m.enable(m.CULL_FACE), u = a.doubleSided), v !== a.flipSided && (a.flipSided ? m.frontFace(m.CW) : m.frontFace(m.CCW), v = a.flipSided)
    }, this.setDepthTest = function(a) {
        A !== a && (a ? m.enable(m.DEPTH_TEST) : m.disable(m.DEPTH_TEST), A = a)
    }, this.setDepthWrite = function(a) {
        B !== a && (m.depthMask(a), B = a)
    }, this.setBlending = function(a, b, c, d) {
        if (a !== w) {
            switch (a) {
            case THREE.NoBlending:
                m.disable(m.BLEND);
                break;
            case THREE.AdditiveBlending:
                m.enable(m.BLEND), m.blendEquation(m.FUNC_ADD), m.blendFunc(m.SRC_ALPHA, m.ONE);
                break;
            case THREE.SubtractiveBlending:
                m.enable(m.BLEND), m.blendEquation(m.FUNC_ADD), m.blendFunc(m.ZERO, m.ONE_MINUS_SRC_COLOR);
                break;
            case THREE.MultiplyBlending:
                m.enable(m.BLEND), m.blendEquation(m.FUNC_ADD), m.blendFunc(m.ZERO, m.SRC_COLOR);
                break;
            case THREE.CustomBlending:
                m.enable(m.BLEND);
                break;
            default:
                m.enable(m.BLEND), m.blendEquationSeparate(m.FUNC_ADD, m.FUNC_ADD), m.blendFuncSeparate(m.SRC_ALPHA, m.ONE_MINUS_SRC_ALPHA, m.ONE, m.ONE_MINUS_SRC_ALPHA)
            }
            w = a
        }
        if (a === THREE.CustomBlending) {
            b !== x && (m.blendEquation(ic(b)), x = b);
            if (c !== y || d !== z) m.blendFunc(ic(c), ic(d)), y = c, z = d
        }
        else x = null, y = null, z = null
    }, this.setTexture = function(a, b) {
        if (a.needsUpdate) {
            a.__webglInit || (a.__webglInit = !0, a.__webglTexture = m.createTexture(), l.info.memory.textures++), m.activeTexture(m.TEXTURE0 + b), m.bindTexture(m.TEXTURE_2D, a.__webglTexture), m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
            var c = a.image,
                d = _b(c.width) && _b(c.height),
                e = ic(a.format),
                f = ic(a.type);
            ac(m.TEXTURE_2D, a, d), a instanceof THREE.DataTexture ? m.texImage2D(m.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data) : m.texImage2D(m.TEXTURE_2D, 0, e, e, f, a.image), a.generateMipmaps && d && m.generateMipmap(m.TEXTURE_2D), a.needsUpdate = !1, a.onUpdate && a.onUpdate()
        }
        else m.activeTexture(m.TEXTURE0 + b), m.bindTexture(m.TEXTURE_2D, a.__webglTexture)
    }, this.setRenderTarget = function(a) {
        var b = a instanceof THREE.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            a.depthBuffer === undefined && (a.depthBuffer = !0), a.stencilBuffer === undefined && (a.stencilBuffer = !0), a.__webglTexture = m.createTexture();
            var c = _b(a.width) && _b(a.height),
                d = ic(a.format),
                e = ic(a.type);
            if (b) {
                a.__webglFramebuffer = [], a.__webglRenderbuffer = [], m.bindTexture(m.TEXTURE_CUBE_MAP, a.__webglTexture), ac(m.TEXTURE_CUBE_MAP, a, c);
                for (var f = 0; f < 6; f++) a.__webglFramebuffer[f] = m.createFramebuffer(), a.__webglRenderbuffer[f] = m.createRenderbuffer(), m.texImage2D(m.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null), ec(a.__webglFramebuffer[f], a, m.TEXTURE_CUBE_MAP_POSITIVE_X + f), fc(a.__webglRenderbuffer[f], a);
                c && m.generateMipmap(m.TEXTURE_CUBE_MAP)
            }
            else a.__webglFramebuffer = m.createFramebuffer(), a.__webglRenderbuffer = m.createRenderbuffer(), m.bindTexture(m.TEXTURE_2D, a.__webglTexture), ac(m.TEXTURE_2D, a, c), m.texImage2D(m.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null), ec(a.__webglFramebuffer, a, m.TEXTURE_2D), fc(a.__webglRenderbuffer, a), c && m.generateMipmap(m.TEXTURE_2D);
            b ? m.bindTexture(m.TEXTURE_CUBE_MAP, null) : m.bindTexture(m.TEXTURE_2D, null), m.bindRenderbuffer(m.RENDERBUFFER, null), m.bindFramebuffer(m.FRAMEBUFFER, null)
        }
        var g, h, i, j, k;
        a ? (b ? g = a.__webglFramebuffer[a.activeCubeFace] : g = a.__webglFramebuffer, h = a.width, i = a.height, j = 0, k = 0) : (g = null, h = I, i = J, j = G, k = H), g !== p && (m.bindFramebuffer(m.FRAMEBUFFER, g), m.viewport(j, k, h, i), p = g), K = h, L = i
    }, this.shadowMapPlugin = new THREE.ShadowMapPlugin, this.addPrePlugin(this.shadowMapPlugin), this.addPostPlugin(new THREE.SpritePlugin), this.addPostPlugin(new THREE.LensFlarePlugin)
}, THREE.WebGLRenderTarget = function(a, b, c) {
    this.width = a, this.height = b, c = c || {}, this.wrapS = c.wrapS !== undefined ? c.wrapS : THREE.ClampToEdgeWrapping, this.wrapT = c.wrapT !== undefined ? c.wrapT : THREE.ClampToEdgeWrapping, this.magFilter = c.magFilter !== undefined ? c.magFilter : THREE.LinearFilter, this.minFilter = c.minFilter !== undefined ? c.minFilter : THREE.LinearMipMapLinearFilter, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.format = c.format !== undefined ? c.format : THREE.RGBAFormat, this.type = c.type !== undefined ? c.type : THREE.UnsignedByteType, this.depthBuffer = c.depthBuffer !== undefined ? c.depthBuffer : !0, this.stencilBuffer = c.stencilBuffer !== undefined ? c.stencilBuffer : !0, this.generateMipmaps = !0
}, THREE.WebGLRenderTarget.prototype.clone = function() {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    return a.wrapS = this.wrapS, a.wrapT = this.wrapT, a.magFilter = this.magFilter, a.minFilter = this.minFilter, a.offset.copy(this.offset), a.repeat.copy(this.repeat), a.format = this.format, a.type = this.type, a.depthBuffer = this.depthBuffer, a.stencilBuffer = this.stencilBuffer, a
}, THREE.WebGLRenderTargetCube = function(a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c), this.activeCubeFace = 0
}, THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget, THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube, THREE.RenderableVertex = function() {
    this.positionWorld = new THREE.Vector3, this.positionScreen = new THREE.Vector4, this.visible = !0
}, THREE.RenderableVertex.prototype.copy = function(a) {
    this.positionWorld.copy(a.positionWorld), this.positionScreen.copy(a.positionScreen)
}, THREE.RenderableFace3 = function() {
    this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.centroidWorld = new THREE.Vector3, this.centroidScreen = new THREE.Vector3, this.normalWorld = new THREE.Vector3, this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.material = null, this.faceMaterial = null, this.uvs = [
        []
    ], this.z = null
}, THREE.RenderableFace4 = function() {
    this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.v4 = new THREE.RenderableVertex, this.centroidWorld = new THREE.Vector3, this.centroidScreen = new THREE.Vector3, this.normalWorld = new THREE.Vector3, this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.material = null, this.faceMaterial = null, this.uvs = [
        []
    ], this.z = null
}, THREE.RenderableObject = function() {
    this.object = null, this.z = null
}, THREE.RenderableParticle = function() {
    this.x = null, this.y = null, this.z = null, this.rotation = null, this.scale = new THREE.Vector2, this.material = null
}, THREE.RenderableLine = function() {
    this.z = null, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.material = null
}, THREE.ColorUtils = {
    adjustHSV: function(a, b, c, d) {
        var e = THREE.ColorUtils.__hsv;
        THREE.ColorUtils.rgbToHsv(a, e), e.h = THREE.Math.clamp(e.h + b, 0, 1), e.s = THREE.Math.clamp(e.s + c, 0, 1), e.v = THREE.Math.clamp(e.v + d, 0, 1), a.setHSV(e.h, e.s, e.v)
    },
    rgbToHsv: function(a, b) {
        var c = a.r,
            d = a.g,
            e = a.b,
            f = Math.max(Math.max(c, d), e),
            g = Math.min(Math.min(c, d), e),
            h, i, j = f;
        if (g === f) h = 0, i = 0;
        else {
            var k = f - g;
            i = k / f, c === f ? h = (d - e) / k : d === f ? h = 2 + (e - c) / k : h = 4 + (c - d) / k, h /= 6, h < 0 && (h += 1), h > 1 && (h -= 1)
        }
        return b === undefined && (b = {
            h: 0,
            s: 0,
            v: 0
        }), b.h = h, b.s = i, b.v = j, b
    }
}, THREE.ColorUtils.__hsv = {
    h: 0,
    s: 0,
    v: 0
}, THREE.GeometryUtils = {
    merge: function(a, b) {
        var c, d, e = a.vertices.length,
            f = a.faceVertexUvs[0].length,
            g = b instanceof THREE.Mesh ? b.geometry : b,
            h = a.vertices,
            i = g.vertices,
            j = a.faces,
            k = g.faces,
            l = a.faceVertexUvs[0],
            m = g.faceVertexUvs[0],
            n = {};
        for (var o = 0; o < a.materials.length; o++) {
            var p = a.materials[o].id;
            n[p] = o
        }
        b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, d = new THREE.Matrix4, d.extractRotation(c, b.scale));
        for (var o = 0, q = i.length; o < q; o++) {
            var r = i[o],
                s = r.clone();
            c && c.multiplyVector3(s), h.push(s)
        }
        for (o = 0, q = k.length; o < q; o++) {
            var t = k[o],
                u, v, w, x = t.vertexNormals,
                y = t.vertexColors;
            t instanceof THREE.Face3 ? u = new THREE.Face3(t.a + e, t.b + e, t.c + e) : t instanceof THREE.Face4 && (u = new THREE.Face4(t.a + e, t.b + e, t.c + e, t.d + e)), u.normal.copy(t.normal), d && d.multiplyVector3(u.normal);
            for (var z = 0, A = x.length; z < A; z++) v = x[z].clone(), d && d.multiplyVector3(v), u.vertexNormals.push(v);
            u.color.copy(t.color);
            for (var z = 0, A = y.length; z < A; z++) w = y[z], u.vertexColors.push(w.clone());
            if (t.materialIndex !== undefined) {
                var B = g.materials[t.materialIndex],
                    C = B.id,
                    D = n[C];
                D === undefined && (D = a.materials.length, n[C] = D, a.materials.push(B)), u.materialIndex = D
            }
            u.centroid.copy(t.centroid), c && c.multiplyVector3(u.centroid), j.push(u)
        }
        for (o = 0, q = m.length; o < q; o++) {
            var E = m[o],
                F = [];
            for (var z = 0, A = E.length; z < A; z++) F.push(new THREE.UV(E[z].u, E[z].v));
            l.push(F)
        }
    },
    clone: function(a) {
        var b = new THREE.Geometry,
            c, d, e = a.vertices,
            f = a.faces,
            g = a.faceVertexUvs[0];
        a.materials && (b.materials = a.materials.slice());
        for (c = 0, d = e.length; c < d; c++) {
            var h = e[c];
            b.vertices.push(h.clone())
        }
        for (c = 0, d = f.length; c < d; c++) {
            var i = f[c];
            b.faces.push(i.clone())
        }
        for (c = 0, d = g.length; c < d; c++) {
            var j = g[c],
                k = [];
            for (var l = 0, m = j.length; l < m; l++) k.push(new THREE.UV(j[l].u, j[l].v));
            b.faceVertexUvs[0].push(k)
        }
        return b
    },
    randomPointInTriangle: function(a, b, c) {
        var d, e, f, g = new THREE.Vector3,
            h = THREE.GeometryUtils.__v1;
        return d = THREE.GeometryUtils.random(), e = THREE.GeometryUtils.random(), d + e > 1 && (d = 1 - d, e = 1 - e), f = 1 - d - e, g.copy(a), g.multiplyScalar(d), h.copy(b), h.multiplyScalar(e), g.addSelf(h), h.copy(c), h.multiplyScalar(f), g.addSelf(h), g
    },
    randomPointInFace: function(a, b, c) {
        var d, e, f, g;
        if (a instanceof THREE.Face3) return d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], THREE.GeometryUtils.randomPointInTriangle(d, e, f);
        if (a instanceof THREE.Face4) {
            d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], g = b.vertices[a.d];
            var h, i;
            c ? a._area1 && a._area2 ? (h = a._area1, i = a._area2) : (h = THREE.GeometryUtils.triangleArea(d, e, g), i = THREE.GeometryUtils.triangleArea(e, f, g), a._area1 = h, a._area2 = i) : (h = THREE.GeometryUtils.triangleArea(d, e, g), i = THREE.GeometryUtils.triangleArea(e, f, g));
            var j = THREE.GeometryUtils.random() * (h + i);
            return j < h ? THREE.GeometryUtils.randomPointInTriangle(d, e, g) : THREE.GeometryUtils.randomPointInTriangle(e, f, g)
        }
    },
    randomPointsInGeometry: function(a, b) {
        function n(a) {
            function b(c, d) {
                if (d < c) return c;
                var e = c + Math.floor((d - c) / 2);
                return i[e] > a ? b(c, e - 1) : i[e] < a ? b(e + 1, d) : e
            }
            var c = b(0, i.length - 1);
            return c
        }
        var c, d, e = a.faces,
            f = a.vertices,
            g = e.length,
            h = 0,
            i = [],
            j, k, l, m;
        for (d = 0; d < g; d++) c = e[d], c instanceof THREE.Face3 ? (j = f[c.a], k = f[c.b], l = f[c.c], c._area = THREE.GeometryUtils.triangleArea(j, k, l)) : c instanceof THREE.Face4 && (j = f[c.a], k = f[c.b], l = f[c.c], m = f[c.d], c._area1 = THREE.GeometryUtils.triangleArea(j, k, m), c._area2 = THREE.GeometryUtils.triangleArea(k, l, m), c._area = c._area1 + c._area2), h += c._area, i[d] = h;
        var o, p, q = [],
            r = {};
        for (d = 0; d < b; d++) o = THREE.GeometryUtils.random() * h, p = n(o), q[d] = THREE.GeometryUtils.randomPointInFace(e[p], a, !0), r[p] ? r[p] += 1 : r[p] = 1;
        return q
    },
    triangleArea: function(a, b, c) {
        var d, e, f, g, h = THREE.GeometryUtils.__v1;
        return h.sub(a, b), e = h.length(), h.sub(a, c), f = h.length(), h.sub(b, c), g = h.length(), d = .5 * (e + f + g), Math.sqrt(d * (d - e) * (d - f) * (d - g))
    },
    center: function(a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
            c = new THREE.Vector3;
        return c.add(b.min, b.max), c.multiplyScalar(-0.5), a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z)), a.computeBoundingBox(), c
    },
    normalizeUVs: function(a) {
        var b = a.faceVertexUvs[0];
        for (var c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            for (var f = 0, g = e.length; f < g; f++) e[f].u !== 1 && (e[f].u = e[f].u - Math.floor(e[f].u)), e[f].v !== 1 && (e[f].v = e[f].v - Math.floor(e[f].v))
        }
    },
    triangulateQuads: function(a) {
        var b, c, d, e, f = [],
            g = [],
            h = [];
        for (b = 0, c = a.faceUvs.length; b < c; b++) g[b] = [];
        for (b = 0, c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
        for (b = 0, c = a.faces.length; b < c; b++) {
            var i = a.faces[b];
            if (i instanceof THREE.Face4) {
                var j = i.a,
                    k = i.b,
                    l = i.c,
                    m = i.d,
                    n = new THREE.Face3,
                    o = new THREE.Face3;
                n.color.copy(i.color), o.color.copy(i.color), n.materialIndex = i.materialIndex, o.materialIndex = i.materialIndex, n.a = j, n.b = k, n.c = m, o.a = k, o.b = l, o.c = m, i.vertexColors.length === 4 && (n.vertexColors[0] = i.vertexColors[0].clone(), n.vertexColors[1] = i.vertexColors[1].clone(), n.vertexColors[2] = i.vertexColors[3].clone(), o.vertexColors[0] = i.vertexColors[1].clone(), o.vertexColors[1] = i.vertexColors[2].clone(), o.vertexColors[2] = i.vertexColors[3].clone()), f.push(n, o);
                for (d = 0, e = a.faceVertexUvs.length; d < e; d++) if (a.faceVertexUvs[d].length) {
                    var p = a.faceVertexUvs[d][b],
                        q = p[0],
                        r = p[1],
                        s = p[2],
                        t = p[3],
                        u = [q.clone(), r.clone(), t.clone()],
                        v = [r.clone(), s.clone(), t.clone()];
                    h[d].push(u, v)
                }
                for (d = 0, e = a.faceUvs.length; d < e; d++) if (a.faceUvs[d].length) {
                    var w = a.faceUvs[d][b];
                    g[d].push(w, w)
                }
            }
            else {
                f.push(i);
                for (d = 0, e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d]);
                for (d = 0, e = a.faceVertexUvs.length; d < e; d++) h[d].push(a.faceVertexUvs[d])
            }
        }
        a.faces = f, a.faceUvs = g, a.faceVertexUvs = h, a.computeCentroids(), a.computeFaceNormals(), a.computeVertexNormals(), a.hasTangents && a.computeTangents()
    },
    explode: function(a) {
        var b = [];
        for (var c = 0, d = a.faces.length; c < d; c++) {
            var e = b.length,
                f = a.faces[c];
            if (f instanceof THREE.Face4) {
                var g = f.a,
                    h = f.b,
                    i = f.c,
                    j = f.d,
                    k = a.vertices[g],
                    l = a.vertices[h],
                    m = a.vertices[i],
                    n = a.vertices[j];
                b.push(k.clone()), b.push(l.clone()), b.push(m.clone()), b.push(n.clone()), f.a = e, f.b = e + 1, f.c = e + 2, f.d = e + 3
            }
            else {
                var g = f.a,
                    h = f.b,
                    i = f.c,
                    k = a.vertices[g],
                    l = a.vertices[h],
                    m = a.vertices[i];
                b.push(k.clone()), b.push(l.clone()), b.push(m.clone()), f.a = e, f.b = e + 1, f.c = e + 2
            }
        }
        a.vertices = b, delete a.__tmpVertices
    },
    tessellate: function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J = [],
            K = [];
        for (c = 0, d = a.faceVertexUvs.length; c < d; c++) K[c] = [];
        for (c = 0, d = a.faces.length; c < d; c++) {
            e = a.faces[c];
            if (e instanceof THREE.Face3) {
                f = e.a, g = e.b, h = e.c, j = a.vertices[f], k = a.vertices[g], l = a.vertices[h], n = j.distanceTo(k), o = k.distanceTo(l), p = j.distanceTo(l);
                if (n > b || o > b || p > b) {
                    s = a.vertices.length, E = e.clone(), F = e.clone(), n >= o && n >= p ? (v = j.clone(), v.lerpSelf(k, .5), E.a = f, E.b = s, E.c = h, F.a = s, F.b = g, F.c = h, e.vertexNormals.length === 3 && (y = e.vertexNormals[0].clone(), y.lerpSelf(e.vertexNormals[1], .5), E.vertexNormals[1].copy(y), F.vertexNormals[0].copy(y)), e.vertexColors.length === 3 && (B = e.vertexColors[0].clone(), B.lerpSelf(e.vertexColors[1], .5), E.vertexColors[1].copy(B), F.vertexColors[0].copy(B)), I = 0) : o >= n && o >= p ? (v = k.clone(), v.lerpSelf(l, .5), E.a = f, E.b = g, E.c = s, F.a = s, F.b = h, F.c = f, e.vertexNormals.length === 3 && (y = e.vertexNormals[1].clone(), y.lerpSelf(e.vertexNormals[2], .5), E.vertexNormals[2].copy(y), F.vertexNormals[0].copy(y), F.vertexNormals[1].copy(e.vertexNormals[2]), F.vertexNormals[2].copy(e.vertexNormals[0])), e.vertexColors.length === 3 && (B = e.vertexColors[1].clone(), B.lerpSelf(e.vertexColors[2], .5), E.vertexColors[2].copy(B), F.vertexColors[0].copy(B), F.vertexColors[1].copy(e.vertexColors[2]), F.vertexColors[2].copy(e.vertexColors[0])), I = 1) : (v = j.clone(), v.lerpSelf(l, .5), E.a = f, E.b = g, E.c = s, F.a = s, F.b = g, F.c = h, e.vertexNormals.length === 3 && (y = e.vertexNormals[0].clone(), y.lerpSelf(e.vertexNormals[2], .5), E.vertexNormals[2].copy(y), F.vertexNormals[0].copy(y)), e.vertexColors.length === 3 && (B = e.vertexColors[0].clone(), B.lerpSelf(e.vertexColors[2], .5), E.vertexColors[2].copy(B), F.vertexColors[0].copy(B)), I = 2), J.push(E, F), a.vertices.push(v);
                    var L, M, N, O, P, Q, R, S, T;
                    for (L = 0, M = a.faceVertexUvs.length; L < M; L++) a.faceVertexUvs[L].length && (N = a.faceVertexUvs[L][c], O = N[0], P = N[1], Q = N[2], I === 0 ? (R = O.clone(), R.lerpSelf(P, .5), S = [O.clone(), R.clone(), Q.clone()], T = [R.clone(), P.clone(), Q.clone()]) : I === 1 ? (R = P.clone(), R.lerpSelf(Q, .5), S = [O.clone(), P.clone(), R.clone()], T = [R.clone(), Q.clone(), O.clone()]) : (R = O.clone(), R.lerpSelf(Q, .5), S = [O.clone(), P.clone(), R.clone()], T = [R.clone(), P.clone(), Q.clone()]), K[L].push(S, T))
                }
                else {
                    J.push(e);
                    for (L = 0, M = a.faceVertexUvs.length; L < M; L++) K[L].push(a.faceVertexUvs[L][c])
                }
            }
            else {
                f = e.a, g = e.b, h = e.c, i = e.d, j = a.vertices[f], k = a.vertices[g], l = a.vertices[h], m = a.vertices[i], n = j.distanceTo(k), o = k.distanceTo(l), q = l.distanceTo(m), r = j.distanceTo(m);
                if (n > b || o > b || q > b || r > b) {
                    t = a.vertices.length, u = a.vertices.length + 1, G = e.clone(), H = e.clone(), n >= o && n >= q && n >= r || q >= o && q >= n && q >= r ? (w = j.clone(), w.lerpSelf(k, .5), x = l.clone(), x.lerpSelf(m, .5), G.a = f, G.b = t, G.c = u, G.d = i, H.a = t, H.b = g, H.c = h, H.d = u, e.vertexNormals.length === 4 && (z = e.vertexNormals[0].clone(), z.lerpSelf(e.vertexNormals[1], .5), A = e.vertexNormals[2].clone(), A.lerpSelf(e.vertexNormals[3], .5), G.vertexNormals[1].copy(z), G.vertexNormals[2].copy(A), H.vertexNormals[0].copy(z), H.vertexNormals[3].copy(A)), e.vertexColors.length === 4 && (C = e.vertexColors[0].clone(), C.lerpSelf(e.vertexColors[1], .5), D = e.vertexColors[2].clone(), D.lerpSelf(e.vertexColors[3], .5), G.vertexColors[1].copy(C), G.vertexColors[2].copy(D), H.vertexColors[0].copy(C), H.vertexColors[3].copy(D)), I = 0) : (w = k.clone(), w.lerpSelf(l, .5), x = m.clone(), x.lerpSelf(j, .5), G.a = f, G.b = g, G.c = t, G.d = u, H.a = u, H.b = t, H.c = h, H.d = i, e.vertexNormals.length === 4 && (z = e.vertexNormals[1].clone(), z.lerpSelf(e.vertexNormals[2], .5), A = e.vertexNormals[3].clone(), A.lerpSelf(e.vertexNormals[0], .5), G.vertexNormals[2].copy(z), G.vertexNormals[3].copy(A), H.vertexNormals[0].copy(A), H.vertexNormals[1].copy(z)), e.vertexColors.length === 4 && (C = e.vertexColors[1].clone(), C.lerpSelf(e.vertexColors[2], .5), D = e.vertexColors[3].clone(), D.lerpSelf(e.vertexColors[0], .5), G.vertexColors[2].copy(C), G.vertexColors[3].copy(D), H.vertexColors[0].copy(D), H.vertexColors[1].copy(C)), I = 1), J.push(G, H), a.vertices.push(w, x);
                    var L, M, N, O, P, Q, U, V, W, X, Y;
                    for (L = 0, M = a.faceVertexUvs.length; L < M; L++) a.faceVertexUvs[L].length && (N = a.faceVertexUvs[L][c], O = N[0], P = N[1], Q = N[2], U = N[3], I === 0 ? (V = O.clone(), V.lerpSelf(P, .5), W = Q.clone(), W.lerpSelf(U, .5), X = [O.clone(), V.clone(), W.clone(), U.clone()], Y = [V.clone(), P.clone(), Q.clone(), W.clone()]) : (V = P.clone(), V.lerpSelf(Q, .5), W = U.clone(), W.lerpSelf(O, .5), X = [O.clone(), P.clone(), V.clone(), W.clone()], Y = [W.clone(), V.clone(), Q.clone(), U.clone()]), K[L].push(X, Y))
                }
                else {
                    J.push(e);
                    for (L = 0, M = a.faceVertexUvs.length; L < M; L++) K[L].push(a.faceVertexUvs[L][c])
                }
            }
        }
        a.faces = J, a.faceVertexUvs = K
    }
}, THREE.GeometryUtils.random = THREE.Math.random16, THREE.GeometryUtils.__v1 = new THREE.Vector3, THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function(a, b, c) {
        var d = new Image,
            e = new THREE.Texture(d, b);
        return d.onload = function() {
            e.needsUpdate = !0, c && c(this)
        }, d.crossOrigin = this.crossOrigin, d.src = a, e
    },
    loadTextureCube: function(a, b, c) {
        var d, e, f = [],
            g = new THREE.Texture(f, b);
        f.loadCount = 0;
        for (d = 0, e = a.length; d < e; ++d) f[d] = new Image, f[d].onload = function() {
            f.loadCount += 1, f.loadCount === 6 && (g.needsUpdate = !0), c && c(this)
        }, f[d].crossOrigin = this.crossOrigin, f[d].src = a[d];
        return g
    },
    getNormalMap: function(a, b) {
        var c = function(a, b) {
                return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
            },
            d = function(a, b) {
                return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
            },
            e = function(a) {
                var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
                return [a[0] / b, a[1] / b, a[2] / b]
            };
        b |= 1;
        var f = a.width,
            g = a.height,
            h = document.createElement("canvas");
        h.width = f, h.height = g;
        var i = h.getContext("2d");
        i.drawImage(a, 0, 0);
        var j = i.getImageData(0, 0, f, g).data,
            k = i.createImageData(f, g),
            l = k.data;
        for (var m = 0; m < f; m++) for (var n = 0; n < g; n++) {
            var o = n - 1 < 0 ? 0 : n - 1,
                p = n + 1 > g - 1 ? g - 1 : n + 1,
                q = m - 1 < 0 ? 0 : m - 1,
                r = m + 1 > f - 1 ? f - 1 : m + 1,
                s = [],
                t = [0, 0, j[(n * f + m) * 4] / 255 * b];
            s.push([-1, 0, j[(n * f + q) * 4] / 255 * b]), s.push([-1, -1, j[(o * f + q) * 4] / 255 * b]), s.push([0, -1, j[(o * f + m) * 4] / 255 * b]), s.push([1, -1, j[(o * f + r) * 4] / 255 * b]), s.push([1, 0, j[(n * f + r) * 4] / 255 * b]), s.push([1, 1, j[(p * f + r) * 4] / 255 * b]), s.push([0, 1, j[(p * f + m) * 4] / 255 * b]), s.push([-1, 1, j[(p * f + q) * 4] / 255 * b]);
            var u = [],
                v = s.length;
            for (var w = 0; w < v; w++) {
                var x = s[w],
                    y = s[(w + 1) % v];
                x = d(x, t), y = d(y, t), u.push(e(c(x, y)))
            }
            var z = [0, 0, 0];
            for (var w = 0; w < u.length; w++) z[0] += u[w][0], z[1] += u[w][1], z[2] += u[w][2];
            z[0] /= u.length, z[1] /= u.length, z[2] /= u.length;
            var A = (n * f + m) * 4;
            l[A] = (z[0] + 1) / 2 * 255 | 0, l[A + 1] = (z[1] + .5) * 255 | 0, l[A + 2] = z[2] * 255 | 0, l[A + 3] = 255
        }
        return i.putImageData(k, 0, 0), h
    },
    generateDataTexture: function(a, b, c) {
        var d = a * b,
            e = new Uint8Array(3 * d),
            f = Math.floor(c.r * 255),
            g = Math.floor(c.g * 255),
            h = Math.floor(c.b * 255);
        for (var i = 0; i < d; i++) e[i * 3] = f, e[i * 3 + 1] = g, e[i * 3 + 2] = h;
        var j = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
        return j.needsUpdate = !0, j
    }
}, THREE.SceneUtils = {
    showHierarchy: function(a, b) {
        THREE.SceneUtils.traverseHierarchy(a, function(a) {
            a.visible = b
        })
    },
    traverseHierarchy: function(a, b) {
        var c, d, e = a.children.length;
        for (d = 0; d < e; d++) c = a.children[d], b(c), THREE.SceneUtils.traverseHierarchy(c, b)
    },
    createMultiMaterialObject: function(a, b) {
        var c, d = b.length,
            e = new THREE.Object3D;
        for (c = 0; c < d; c++) {
            var f = new THREE.Mesh(a, b[c]);
            e.add(f)
        }
        return e
    },
    cloneObject: function(a) {
        var b;
        a instanceof THREE.MorphAnimMesh ? (b = new THREE.MorphAnimMesh(a.geometry, a.material), b.duration = a.duration, b.mirroredLoop = a.mirroredLoop, b.time = a.time, b.lastKeyframe = a.lastKeyframe, b.currentKeyframe = a.currentKeyframe, b.direction = a.direction, b.directionBackwards = a.directionBackwards) : a instanceof THREE.SkinnedMesh ? b = new THREE.SkinnedMesh(a.geometry, a.material) : a instanceof THREE.Mesh ? b = new THREE.Mesh(a.geometry, a.material) : a instanceof THREE.Line ? b = new THREE.Line(a.geometry, a.material, a.type) : a instanceof THREE.Ribbon ? b = new THREE.Ribbon(a.geometry, a.material) : a instanceof THREE.ParticleSystem ? (b = new THREE.ParticleSystem(a.geometry, a.material), b.sortParticles = a.sortParticles) : a instanceof THREE.Particle ? b = new THREE.Particle(a.material) : a instanceof THREE.Sprite ? (b = new THREE.Sprite({}), b.color.copy(a.color), b.map = a.map, b.blending = a.blending, b.useScreenCoordinates = a.useScreenCoordinates, b.mergeWith3D = a.mergeWith3D, b.affectedByDistance = a.affectedByDistance, b.scaleByViewport = a.scaleByViewport, b.alignment = a.alignment, b.rotation3d.copy(a.rotation3d), b.rotation = a.rotation, b.opacity = a.opacity, b.uvOffset.copy(a.uvOffset), b.uvScale.copy(a.uvScale)) : a instanceof THREE.LOD ? b = new THREE.LOD : a instanceof THREE.MarchingCubes ? (b = new THREE.MarchingCubes(a.resolution, a.material), b.field.set(a.field), b.isolation = a.isolation) : a instanceof THREE.Object3D && (b = new THREE.Object3D), b.name = a.name, b.parent = a.parent, b.up.copy(a.up), b.position.copy(a.position), b.rotation instanceof THREE.Vector3 && b.rotation.copy(a.rotation), b.eulerOrder = a.eulerOrder, b.scale.copy(a.scale), b.dynamic = a.dynamic, b.doubleSided = a.doubleSided, b.flipSided = a.flipSided, b.renderDepth = a.renderDepth, b.rotationAutoUpdate = a.rotationAutoUpdate, b.matrix.copy(a.matrix), b.matrixWorld.copy(a.matrixWorld), b.matrixRotationWorld.copy(a.matrixRotationWorld), b.matrixAutoUpdate = a.matrixAutoUpdate, b.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate, b.quaternion.copy(a.quaternion), b.useQuaternion = a.useQuaternion, b.boundRadius = a.boundRadius, b.boundRadiusScale = a.boundRadiusScale, b.visible = a.visible, b.castShadow = a.castShadow, b.receiveShadow = a.receiveShadow, b.frustumCulled = a.frustumCulled;
        for (var c = 0; c < a.children.length; c++) {
            var d = THREE.SceneUtils.cloneObject(a.children[c]);
            b.children[c] = d, d.parent = b
        }
        if (a instanceof THREE.LOD) for (var c = 0; c < a.LODs.length; c++) {
            var e = a.LODs[c];
            b.LODs[c] = {
                visibleAtDistance: e.visibleAtDistance,
                object3D: b.children[c]
            }
        }
        return b
    },
    detach: function(a, b, c) {
        a.applyMatrix(b.matrixWorld), b.remove(a), c.add(a)
    },
    attach: function(a, b, c) {
        var d = new THREE.Matrix4;
        d.getInverse(c.matrixWorld), a.applyMatrix(d), b.remove(a), c.add(a)
    }
}, THREE.WebGLRenderer && (THREE.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: .1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
            {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                enableSpecular: {
                    type: "i",
                    value: 0
                },
                enableReflection: {
                    type: "i",
                    value: 0
                },
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tSpecular: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                tDisplacement: {
                    type: "t",
                    value: 5,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                uDisplacementBias: {
                    type: "f",
                    value: 0
                },
                uDisplacementScale: {
                    type: "f",
                    value: 1
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE.Color(16777215)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE.Color(16777215)
                },
                uShininess: {
                    type: "f",
                    value: 30
                },
                uOpacity: {
                    type: "f",
                    value: 1
                },
                uReflectivity: {
                    type: "f",
                    value: .5
                },
                uOffset: {
                    type: "v2",
                    value: new THREE.Vector2(0, 0)
                },
                uRepeat: {
                    type: "v2",
                    value: new THREE.Vector2(1, 1)
                },
                wrapRGB: {
                    type: "v3",
                    value: new THREE.Vector3(1, 1, 1)
                }
            }]),
            fragmentShader: ["uniform vec3 uAmbientColor;", "uniform vec3 uDiffuseColor;", "uniform vec3 uSpecularColor;", "uniform float uShininess;", "uniform float uOpacity;", "uniform bool enableDiffuse;", "uniform bool enableSpecular;", "uniform bool enableAO;", "uniform bool enableReflection;", "uniform sampler2D tDiffuse;", "uniform sampler2D tNormal;", "uniform sampler2D tSpecular;", "uniform sampler2D tAO;", "uniform samplerCube tCube;", "uniform float uNormalScale;", "uniform float uReflectivity;", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif", "varying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3( 1.0 ), uOpacity );", "vec3 specularTex = vec3( 1.0 );", "vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;", "normalTex.xy *= uNormalScale;", "normalTex = normalize( normalTex );", "if( enableDiffuse ) {", "#ifdef GAMMA_INPUT", "vec4 texelColor = texture2D( tDiffuse, vUv );", "texelColor.xyz *= texelColor.xyz;", "gl_FragColor = gl_FragColor * texelColor;", "#else", "gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );", "#endif", "}", "if( enableAO ) {", "#ifdef GAMMA_INPUT", "vec4 aoColor = texture2D( tAO, vUv );", "aoColor.xyz *= aoColor.xyz;", "gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;", "#endif", "}", "if( enableSpecular )", "specularTex = texture2D( tSpecular, vUv ).xyz;", "mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );", "vec3 finalNormal = tsb * normalTex;", "vec3 normal = normalize( finalNormal );", "vec3 viewPosition = normalize( vViewPosition );", "#if MAX_POINT_LIGHTS > 0", "vec3 pointDiffuse = vec3( 0.0 );", "vec3 pointSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec3 pointVector = normalize( vPointLight[ i ].xyz );", "float pointDistance = vPointLight[ i ].w;", "#ifdef WRAP_AROUND", "float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );", "float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );", "vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "#else", "float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );", "#endif", "pointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;", "vec3 pointHalfVector = normalize( pointVector + viewPosition );", "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );", "pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;", "#else", "pointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_DIR_LIGHTS > 0", "vec3 dirDiffuse = vec3( 0.0 );", "vec3 dirSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "#ifdef WRAP_AROUND", "float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );", "float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );", "vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );", "#else", "float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );", "#endif", "dirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;", "vec3 dirHalfVector = normalize( dirVector + viewPosition );", "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );", "dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "#else", "dirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;", "#endif", "}", "#endif", "vec3 totalDiffuse = vec3( 0.0 );", "vec3 totalSpecular = vec3( 0.0 );", "#if MAX_DIR_LIGHTS > 0", "totalDiffuse += dirDiffuse;", "totalSpecular += dirSpecular;", "#endif", "#if MAX_POINT_LIGHTS > 0", "totalDiffuse += pointDiffuse;", "totalSpecular += pointSpecular;", "#endif", "gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;", "if ( enableReflection ) {", "vec3 wPos = cameraPosition - vViewPosition;", "vec3 vReflect = reflect( normalize( wPos ), normal );", "vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );", "#ifdef GAMMA_INPUT", "cubeColor.xyz *= cubeColor.xyz;", "#endif", "gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );", "}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
            vertexShader: ["attribute vec4 tangent;", "uniform vec2 uOffset;", "uniform vec2 uRepeat;", "#ifdef VERTEX_TEXTURES", "uniform sampler2D tDisplacement;", "uniform float uDisplacementScale;", "uniform float uDisplacementBias;", "#endif", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];", "#endif", "varying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vViewPosition = -mvPosition.xyz;", "vNormal = normalMatrix * normal;", "vTangent = normalMatrix * tangent.xyz;", "vBinormal = cross( vNormal, vTangent ) * tangent.w;", "vUv = uv * uRepeat + uOffset;", "#if MAX_POINT_LIGHTS > 0", "for( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "vPointLight[ i ] = vec4( lVector, lDistance );", "}", "#endif", "#ifdef VERTEX_TEXTURES", "vec3 dv = texture2D( tDisplacement, uv ).xyz;", "float df = uDisplacementScale * dv.x + uDisplacementBias;", "vec4 displacedPosition = vec4( normalize( vNormal.xyz ) * df, 0.0 ) + mvPosition;", "gl_Position = projectionMatrix * displacedPosition;", "#else", "gl_Position = projectionMatrix * mvPosition;", "#endif", THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n")
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tFlip: {
                    type: "f",
                    value: -1
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
        }
    }
}), THREE.BufferGeometry = function() {
    this.id = THREE.GeometryCount++, this.vertexIndexBuffer = null, this.vertexPositionBuffer = null, this.vertexNormalBuffer = null, this.vertexUvBuffer = null, this.vertexColorBuffer = null, this.vertexIndexArray = null, this.vertexPositionArray = null, this.vertexNormalArray = null, this.vertexUvArray = null, this.vertexColorArray = null, this.dynamic = !1, this.boundingBox = null, this.boundingSphere = null, this.morphTargets = []
}, THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    computeBoundingBox: function() {},
    computeBoundingSphere: function() {}
}, THREE.Curve = function() {}, THREE.Curve.prototype.getPoint = function(a) {
    return console.log("Warning, getPoint() not implemented!"), null
}, THREE.Curve.prototype.getPointAt = function(a) {
    var b = this.getUtoTmapping(a);
    return this.getPoint(b)
}, THREE.Curve.prototype.getPoints = function(a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
    return c
}, THREE.Curve.prototype.getSpacedPoints = function(a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
    return c
}, THREE.Curve.prototype.getLength = function() {
    var a = this.getLengths();
    return a[a.length - 1]
}, THREE.Curve.prototype.getLengths = function(a) {
    a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
    if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    var b = [],
        c, d = this.getPoint(0),
        e, f = 0;
    b.push(0);
    for (e = 1; e <= a; e++) c = this.getPoint(e / a), f += c.distanceTo(d), b.push(f), d = c;
    return this.cacheArcLengths = b, b
}, THREE.Curve.prototype.updateArcLengths = function() {
    this.needsUpdate = !0, this.getLengths()
}, THREE.Curve.prototype.getUtoTmapping = function(a, b) {
    var c = this.getLengths(),
        d = 0,
        e = c.length,
        f;
    b ? f = b : f = a * c[e - 1];
    var g = 0,
        h = e - 1,
        i;
    while (g <= h) {
        d = Math.floor(g + (h - g) / 2), i = c[d] - f;
        if (i < 0) {
            g = d + 1;
            continue
        }
        if (i > 0) {
            h = d - 1;
            continue
        }
        h = d;
        break
    }
    d = h;
    if (c[d] == f) {
        var j = d / (e - 1);
        return j
    }
    var k = c[d],
        l = c[d + 1],
        m = l - k,
        n = (f - k) / m,
        j = (d + n) / (e - 1);
    return j
}, THREE.Curve.prototype.getNormalVector = function(a) {
    var b = this.getTangent(a);
    return new THREE.Vector2(-b.y, b.x)
}, THREE.Curve.prototype.getTangent = function(a) {
    var b = 1e-4,
        c = a - b,
        d = a + b;
    c < 0 && (c = 0), d > 1 && (d = 1);
    var e = this.getPoint(c),
        f = this.getPoint(d),
        g = f.clone().subSelf(e);
    return g.normalize()
}, THREE.Curve.prototype.getTangentAt = function(a) {
    var b = this.getUtoTmapping(a);
    return this.getTangent(b)
}, THREE.LineCurve = function(a, b) {
    this.v1 = a, this.v2 = b
}, THREE.LineCurve.prototype = new THREE.Curve, THREE.LineCurve.prototype.constructor = THREE.LineCurve, THREE.LineCurve.prototype.getPoint = function(a) {
    var b = this.v2.clone().subSelf(this.v1);
    return b.multiplyScalar(a).addSelf(this.v1), b
}, THREE.LineCurve.prototype.getPointAt = function(a) {
    return this.getPoint(a)
}, THREE.LineCurve.prototype.getTangent = function(a) {
    var b = this.v2.clone().subSelf(this.v1);
    return b.normalize()
}, THREE.QuadraticBezierCurve = function(a, b, c) {
    this.v0 = a, this.v1 = b, this.v2 = c
}, THREE.QuadraticBezierCurve.prototype = new THREE.Curve, THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve, THREE.QuadraticBezierCurve.prototype.getPoint = function(a) {
    var b, c;
    return b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), new THREE.Vector2(b, c)
}, THREE.QuadraticBezierCurve.prototype.getTangent = function(a) {
    var b, c;
    b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x), c = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
    var d = new THREE.Vector2(b, c);
    return d.normalize(), d
}, THREE.CubicBezierCurve = function(a, b, c, d) {
    this.v0 = a, this.v1 = b, this.v2 = c, this.v3 = d
}, THREE.CubicBezierCurve.prototype = new THREE.Curve, THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve, THREE.CubicBezierCurve.prototype.getPoint = function(a) {
    var b, c;
    return b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new THREE.Vector2(b, c)
}, THREE.CubicBezierCurve.prototype.getTangent = function(a) {
    var b, c;
    b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), c = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    var d = new THREE.Vector2(b, c);
    return d.normalize(), d
}, THREE.SplineCurve = function(a) {
    this.points = a == undefined ? [] : a
}, THREE.SplineCurve.prototype = new THREE.Curve, THREE.SplineCurve.prototype.constructor = THREE.SplineCurve, THREE.SplineCurve.prototype.getPoint = function(a) {
    var b = new THREE.Vector2,
        c = [],
        d = this.points,
        e, f, g;
    return e = (d.length - 1) * a, f = Math.floor(e), g = e - f, c[0] = f == 0 ? f : f - 1, c[1] = f, c[2] = f > d.length - 2 ? d.length - 1 : f + 1, c[3] = f > d.length - 3 ? d.length - 1 : f + 2, b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, g), b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, g), b
}, THREE.ArcCurve = function(a, b, c, d, e, f) {
    this.aX = a, this.aY = b, this.aRadius = c, this.aStartAngle = d, this.aEndAngle = e, this.aClockwise = f
}, THREE.ArcCurve.prototype = new THREE.Curve, THREE.ArcCurve.prototype.constructor = THREE.ArcCurve, THREE.ArcCurve.prototype.getPoint = function(a) {
    var b = this.aEndAngle - this.aStartAngle;
    this.aClockwise || (a = 1 - a);
    var c = this.aStartAngle + a * b,
        d = this.aX + this.aRadius * Math.cos(c),
        e = this.aY + this.aRadius * Math.sin(c);
    return new THREE.Vector2(d, e)
}, THREE.Curve.Utils = {
    tangentQuadraticBezier: function(a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
    },
    tangentCubicBezier: function(a, b, c, d, e) {
        return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
    },
    tangentSpline: function(a, b, c, d, e) {
        var f = 6 * a * a - 6 * a,
            g = 3 * a * a - 4 * a + 1,
            h = -6 * a * a + 6 * a,
            i = 3 * a * a - 2 * a;
        return f + g + h + i
    },
    interpolate: function(a, b, c, d, e) {
        var f = (c - a) * .5,
            g = (d - b) * .5,
            h = e * e,
            i = e * h;
        return (2 * b - 2 * c + f + g) * i + (-3 * b + 3 * c - 2 * f - g) * h + f * e + b
    }
}, THREE.Curve.create = function(a, b) {
    var c = a;
    return c.prototype = new THREE.Curve, c.prototype.constructor = a, c.prototype.getPoint = b, c
}, THREE.LineCurve3 = THREE.Curve.create(function(a, b) {
    this.v1 = a, this.v2 = b
}, function(a) {
    var b = new THREE.Vector3;
    return b.sub(this.v2, this.v1), b.multiplyScalar(a), b.addSelf(this.v1), b
}), THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, b, c) {
    this.v0 = a, this.v1 = b, this.v2 = c
}, function(a) {
    var b, c, d;
    return b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), d = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z), new THREE.Vector3(b, c, d)
}), THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, b, c, d) {
    this.v0 = a, this.v1 = b, this.v2 = c, this.v3 = d
}, function(a) {
    var b, c, d;
    return b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), d = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z), new THREE.Vector3(b, c, d)
}), THREE.SplineCurve3 = THREE.Curve.create(function(a) {
    this.points = a == undefined ? [] : a
}, function(a) {
    var b = new THREE.Vector3,
        c = [],
        d = this.points,
        e, f, g;
    e = (d.length - 1) * a, f = Math.floor(e), g = e - f, c[0] = f == 0 ? f : f - 1, c[1] = f, c[2] = f > d.length - 2 ? d.length - 1 : f + 1, c[3] = f > d.length - 3 ? d.length - 1 : f + 2;
    var h = d[c[0]],
        i = d[c[1]],
        j = d[c[2]],
        k = d[c[3]];
    return b.x = THREE.Curve.Utils.interpolate(h.x, i.x, j.x, k.x, g), b.y = THREE.Curve.Utils.interpolate(h.y, i.y, j.y, k.y, g), b.z = THREE.Curve.Utils.interpolate(h.z, i.z, j.z, k.z, g), b
}), THREE.ClosedSplineCurve3 = THREE.Curve.create(function(a) {
    this.points = a == undefined ? [] : a
}, function(a) {
    var b = new THREE.Vector3,
        c = [],
        d = this.points,
        e, f, g;
    return e = (d.length - 0) * a, f = Math.floor(e), g = e - f, f += f > 0 ? 0 : (Math.floor(Math.abs(f) / d.length) + 1) * d.length, c[0] = (f - 1) % d.length, c[1] = f % d.length, c[2] = (f + 1) % d.length, c[3] = (f + 2) % d.length, b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, g), b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, g), b.z = THREE.Curve.Utils.interpolate(d[c[0]].z, d[c[1]].z, d[c[2]].z, d[c[3]].z, g), b
}), THREE.CurvePath = function() {
    this.curves = [], this.bends = [], this.autoClose = !1
}, THREE.CurvePath.prototype = new THREE.Curve, THREE.CurvePath.prototype.constructor = THREE.CurvePath, THREE.CurvePath.prototype.add = function(a) {
    this.curves.push(a)
}, THREE.CurvePath.prototype.checkConnection = function() {}, THREE.CurvePath.prototype.closePath = function() {
    var a = this.curves[0].getPoint(0),
        b = this.curves[this.curves.length - 1].getPoint(1);
    a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
}, THREE.CurvePath.prototype.getPoint = function(a) {
    var b = a * this.getLength(),
        c = this.getCurveLengths(),
        d = 0,
        e, f;
    while (d < c.length) {
        if (c[d] >= b) {
            e = c[d] - b, f = this.curves[d];
            var g = 1 - e / f.getLength();
            return f.getPointAt(g)
        }
        d++
    }
    return null
}, THREE.CurvePath.prototype.getLength = function() {
    var a = this.getCurveLengths();
    return a[a.length - 1]
}, THREE.CurvePath.prototype.getCurveLengths = function() {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
    var a = [],
        b = 0,
        c, d = this.curves.length;
    for (c = 0; c < d; c++) b += this.curves[c].getLength(), a.push(b);
    return this.cacheLengths = a, a
}, THREE.CurvePath.prototype.getBoundingBox = function() {
    var a = this.getPoints(),
        b, c, d, e;
    b = c = Number.NEGATIVE_INFINITY, d = e = Number.POSITIVE_INFINITY;
    var f, g, h, i;
    i = new THREE.Vector2;
    for (g = 0, h = a.length; g < h; g++) f = a[g], f.x > b ? b = f.x : f.x < d && (d = f.x), f.y > c ? c = f.y : f.y < c && (e = f.y), i.addSelf(f.x, f.y);
    return {
        minX: d,
        minY: e,
        maxX: b,
        maxY: c,
        centroid: i.divideScalar(h)
    }
}, THREE.CurvePath.prototype.createPointsGeometry = function(a) {
    var b = this.getPoints(a, !0);
    return this.createGeometry(b)
}, THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
    var b = this.getSpacedPoints(a, !0);
    return this.createGeometry(b)
}, THREE.CurvePath.prototype.createGeometry = function(a) {
    var b = new THREE.Geometry;
    for (var c = 0; c < a.length; c++) b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, 0));
    return b
}, THREE.CurvePath.prototype.addWrapPath = function(a) {
    this.bends.push(a)
}, THREE.CurvePath.prototype.getTransformedPoints = function(a, b) {
    var c = this.getPoints(a),
        d, e;
    b || (b = this.bends);
    for (d = 0, e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
    return c
}, THREE.CurvePath.prototype.getTransformedSpacedPoints = function(a, b) {
    var c = this.getSpacedPoints(a),
        d, e;
    b || (b = this.bends);
    for (d = 0, e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
    return c
}, THREE.CurvePath.prototype.getWrapPoints = function(a, b) {
    var c = this.getBoundingBox(),
        d, e, f, g, h, i;
    for (d = 0, e = a.length; d < e; d++) {
        f = a[d], g = f.x, h = f.y, i = g / c.maxX, i = b.getUtoTmapping(i, g);
        var j = b.getPoint(i),
            k = b.getNormalVector(i).multiplyScalar(h);
        f.x = j.x + k.x, f.y = j.y + k.y
    }
    return a
}, THREE.EventTarget = function() {
    var a = {};
    this.addEventListener = function(b, c) {
        a[b] == undefined && (a[b] = []), a[b].indexOf(c) === -1 && a[b].push(c)
    }, this.dispatchEvent = function(b) {
        for (var c in a[b.type]) a[b.type][c](b)
    }, this.removeEventListener = function(b, c) {
        var d = a[b].indexOf(c);
        d !== -1 && a[b].splice(d, 1)
    }
}, THREE.Gyroscope = function() {
    THREE.Object3D.call(this)
}, THREE.Gyroscope.prototype = new THREE.Object3D, THREE.Gyroscope.prototype.constructor = THREE.Gyroscope, THREE.Gyroscope.prototype.updateMatrixWorld = function(a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? (this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
    for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
}, THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3, THREE.Gyroscope.prototype.translationObject = new THREE.Vector3, THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion, THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion, THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3, THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3, THREE.Path = function(a) {
    THREE.CurvePath.call(this), this.actions = [], a && this.fromPoints(a)
}, THREE.Path.prototype = new THREE.CurvePath, THREE.Path.prototype.constructor = THREE.Path, THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc"
}, THREE.Path.prototype.fromPoints = function(a) {
    this.moveTo(a[0].x, a[0].y);
    for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
}, THREE.Path.prototype.moveTo = function(a, b) {
    var c = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE.PathActions.MOVE_TO,
        args: c
    })
}, THREE.Path.prototype.lineTo = function(a, b) {
    var c = Array.prototype.slice.call(arguments),
        d = this.actions[this.actions.length - 1].args,
        e = d[d.length - 2],
        f = d[d.length - 1],
        g = new THREE.LineCurve(new THREE.Vector2(e, f), new THREE.Vector2(a, b));
    this.curves.push(g), this.actions.push({
        action: THREE.PathActions.LINE_TO,
        args: c
    })
}, THREE.Path.prototype.quadraticCurveTo = function(a, b, c, d) {
    var e = Array.prototype.slice.call(arguments),
        f = this.actions[this.actions.length - 1].args,
        g = f[f.length - 2],
        h = f[f.length - 1],
        i = new THREE.QuadraticBezierCurve(new THREE.Vector2(g, h), new THREE.Vector2(a, b), new THREE.Vector2(c, d));
    this.curves.push(i), this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: e
    })
}, THREE.Path.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args,
        i = h[h.length - 2],
        j = h[h.length - 1],
        k = new THREE.CubicBezierCurve(new THREE.Vector2(i, j), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f));
    this.curves.push(k), this.actions.push({
        action: THREE.PathActions.BEZIER_CURVE_TO,
        args: g
    })
}, THREE.Path.prototype.splineThru = function(a) {
    var b = Array.prototype.slice.call(arguments),
        c = this.actions[this.actions.length - 1].args,
        d = c[c.length - 2],
        e = c[c.length - 1],
        f = [new THREE.Vector2(d, e)];
    Array.prototype.push.apply(f, a);
    var g = new THREE.SplineCurve(f);
    this.curves.push(g), this.actions.push({
        action: THREE.PathActions.CSPLINE_THRU,
        args: b
    })
}, THREE.Path.prototype.arc = function(a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1],
        i = new THREE.ArcCurve(h.x + a, h.y + b, c, d, e, f);
    this.curves.push(i);
    var j = i.getPoint(f ? 1 : 0);
    g.push(j.x), g.push(j.y), this.actions.push({
        action: THREE.PathActions.ARC,
        args: g
    })
}, THREE.Path.prototype.absarc = function(a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = new THREE.ArcCurve(a, b, c, d, e, f);
    this.curves.push(h);
    var i = h.getPoint(f ? 1 : 0);
    g.push(i.x), g.push(i.y), this.actions.push({
        action: THREE.PathActions.ARC,
        args: g
    })
}, THREE.Path.prototype.getSpacedPoints = function(a, b) {
    a || (a = 40);
    var c = [];
    for (var d = 0; d < a; d++) c.push(this.getPoint(d / a));
    return c
}, THREE.Path.prototype.getPoints = function(a, b) {
    if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(a, b);
    a = a || 12;
    var c = [],
        d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
    for (d = 0, e = this.actions.length; d < e; d++) {
        f = this.actions[d], g = f.action, h = f.args;
        switch (g) {
        case THREE.PathActions.MOVE_TO:
            c.push(new THREE.Vector2(h[0], h[1]));
            break;
        case THREE.PathActions.LINE_TO:
            c.push(new THREE.Vector2(h[0], h[1]));
            break;
        case THREE.PathActions.QUADRATIC_CURVE_TO:
            i = h[2], j = h[3], m = h[0], n = h[1], c.length > 0 ? (q = c[c.length - 1], o = q.x, p = q.y) : (q = this.actions[d - 1].args, o = q[q.length - 2], p = q[q.length - 1]);
            for (r = 1; r <= a; r++) s = r / a, t = THREE.Shape.Utils.b2(s, o, m, i), u = THREE.Shape.Utils.b2(s, p, n, j), c.push(new THREE.Vector2(t, u));
            break;
        case THREE.PathActions.BEZIER_CURVE_TO:
            i = h[4], j = h[5], m = h[0], n = h[1], k = h[2], l = h[3], c.length > 0 ? (q = c[c.length - 1], o = q.x, p = q.y) : (q = this.actions[d - 1].args, o = q[q.length - 2], p = q[q.length - 1]);
            for (r = 1; r <= a; r++) s = r / a, t = THREE.Shape.Utils.b3(s, o, m, k, i), u = THREE.Shape.Utils.b3(s, p, n, l, j), c.push(new THREE.Vector2(t, u));
            break;
        case THREE.PathActions.CSPLINE_THRU:
            q = this.actions[d - 1].args;
            var v = new THREE.Vector2(q[q.length - 2], q[q.length - 1]),
                w = [v],
                x = a * h[0].length;
            w = w.concat(h[0]);
            var y = new THREE.SplineCurve(w);
            for (r = 1; r <= x; r++) c.push(y.getPointAt(r / x));
            break;
        case THREE.PathActions.ARC:
            q = this.actions[d - 1].args;
            var z = h[0],
                A = h[1],
                B = h[2],
                C = h[3],
                D = h[4],
                E = !! h[5],
                F = D - C,
                G, H = a * 2;
            for (r = 1; r <= H; r++) s = r / H, E || (s = 1 - s), G = C + s * F, t = z + B * Math.cos(G), u = A + B * Math.sin(G), c.push(new THREE.Vector2(t, u))
        }
    }
    var I = c[c.length - 1],
        J = 1e-10;
    return Math.abs(I.x - c[0].x) < J && Math.abs(I.y - c[0].y) < J && c.splice(c.length - 1, 1), b && c.push(c[0]), c
}, THREE.Path.prototype.transform = function(a, b) {
    var c = this.getBoundingBox(),
        d = this.getPoints(b);
    return this.getWrapPoints(d, a)
}, THREE.Path.prototype.nltransform = function(a, b, c, d, e, f) {
    var g = this.getPoints(),
        h, i, j, k, l;
    for (h = 0, i = g.length; h < i; h++) j = g[h], k = j.x, l = j.y, j.x = a * k + b * l + c, j.y = d * l + e * k + f;
    return g
}, THREE.Path.prototype.debug = function(a) {
    var b = this.getBoundingBox();
    a || (a = document.createElement("canvas"), a.setAttribute("width", b.maxX + 100), a.setAttribute("height", b.maxY + 100), document.body.appendChild(a));
    var c = a.getContext("2d");
    c.fillStyle = "white", c.fillRect(0, 0, a.width, a.height), c.strokeStyle = "black", c.beginPath();
    var d, e, f, g, h;
    for (d = 0, e = this.actions.length; d < e; d++) f = this.actions[d], h = f.args, g = f.action, g != THREE.PathActions.CSPLINE_THRU && c[g].apply(c, h);
    c.stroke(), c.closePath(), c.strokeStyle = "red";
    var i, j = this.getPoints();
    for (d = 0, e = j.length; d < e; d++) i = j[d], c.beginPath(), c.arc(i.x, i.y, 1.5, 0, Math.PI * 2, !1), c.stroke(), c.closePath()
}, THREE.Path.prototype.toShapes = function() {
    var a, b, c, d, e, f = [],
        g = new THREE.Path;
    for (a = 0, b = this.actions.length; a < b; a++) c = this.actions[a], e = c.args, d = c.action, d == THREE.PathActions.MOVE_TO && g.actions.length != 0 && (f.push(g), g = new THREE.Path), g[d].apply(g, e);
    g.actions.length != 0 && f.push(g);
    if (f.length == 0) return [];
    var h, i, j = [],
        k = !THREE.Shape.Utils.isClockWise(f[0].getPoints());
    if (f.length == 1) return h = f[0], i = new THREE.Shape, i.actions = h.actions, i.curves = h.curves, j.push(i), j;
    if (k) {
        i = new THREE.Shape;
        for (a = 0, b = f.length; a < b; a++) h = f[a], THREE.Shape.Utils.isClockWise(h.getPoints()) ? (i.actions = h.actions, i.curves = h.curves, j.push(i), i = new THREE.Shape) : i.holes.push(h)
    }
    else {
        for (a = 0, b = f.length; a < b; a++) h = f[a], THREE.Shape.Utils.isClockWise(h.getPoints()) ? (i && j.push(i), i = new THREE.Shape, i.actions = h.actions, i.curves = h.curves) : i.holes.push(h);
        j.push(i)
    }
    return j
}, THREE.Shape = function() {
    THREE.Path.apply(this, arguments), this.holes = []
}, THREE.Shape.prototype = new THREE.Path, THREE.Shape.prototype.constructor = THREE.Path, THREE.Shape.prototype.extrude = function(a) {
    var b = new THREE.ExtrudeGeometry(this, a);
    return b
}, THREE.Shape.prototype.getPointsHoles = function(a) {
    var b, c = this.holes.length,
        d = [];
    for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
    return d
}, THREE.Shape.prototype.getSpacedPointsHoles = function(a) {
    var b, c = this.holes.length,
        d = [];
    for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
    return d
}, THREE.Shape.prototype.extractAllPoints = function(a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    }
}, THREE.Shape.prototype.extractPoints = function(a) {
    return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
}, THREE.Shape.prototype.extractAllSpacedPoints = function(a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    }
}, THREE.Shape.Utils = {
    removeHoles: function(a, b) {
        var c = a.concat(),
            d = c.concat(),
            e, g, i, j, m, n, o, p, q, r, s, t, u, v, w, x, y = [];
        for (m = 0; m < b.length; m++) {
            o = b[m], Array.prototype.push.apply(d, o), p = Number.POSITIVE_INFINITY;
            for (n = 0; n < o.length; n++) {
                s = o[n];
                var z = [];
                for (r = 0; r < c.length; r++) t = c[r], q = s.distanceToSquared(t), z.push(q), q < p && (p = q, i = n, j = r)
            }
            e = j - 1 >= 0 ? j - 1 : c.length - 1, g = i - 1 >= 0 ? i - 1 : o.length - 1;
            var A = [o[i], c[j], c[e]],
                B = THREE.FontUtils.Triangulate.area(A),
                C = [o[i], o[g], c[j]],
                D = THREE.FontUtils.Triangulate.area(C),
                E = 1,
                F = -1,
                G = j,
                H = i;
            j += E, i += F, j < 0 && (j += c.length), j %= c.length, i < 0 && (i += o.length), i %= o.length, e = j - 1 >= 0 ? j - 1 : c.length - 1, g = i - 1 >= 0 ? i - 1 : o.length - 1, A = [o[i], c[j], c[e]];
            var I = THREE.FontUtils.Triangulate.area(A);
            C = [o[i], o[g], c[j]];
            var J = THREE.FontUtils.Triangulate.area(C);
            B + D > I + J && (j = G, i = H, j < 0 && (j += c.length), j %= c.length, i < 0 && (i += o.length), i %= o.length, e = j - 1 >= 0 ? j - 1 : c.length - 1, g = i - 1 >= 0 ? i - 1 : o.length - 1), u = c.slice(0, j), v = c.slice(j), w = o.slice(i), x = o.slice(0, i);
            var K = [o[i], c[j], c[e]],
                L = [o[i], o[g], c[j]];
            y.push(K), y.push(L), c = u.concat(w).concat(x).concat(v)
        }
        return {
            shape: c,
            isolatedPts: y,
            allpoints: d
        }
    },
    triangulateShape: function(a, b) {
        var c = THREE.Shape.Utils.removeHoles(a, b),
            d = c.shape,
            e = c.allpoints,
            f = c.isolatedPts,
            g = THREE.FontUtils.Triangulate(d, !1),
            h, i, j, k, l, m, n = {},
            o = {};
        for (h = 0, i = e.length; h < i; h++) l = e[h].x + ":" + e[h].y, n[l] !== undefined && console.log("Duplicate point", l), n[l] = h;
        for (h = 0, i = g.length; h < i; h++) {
            k = g[h];
            for (j = 0; j < 3; j++) l = k[j].x + ":" + k[j].y, m = n[l], m !== undefined && (k[j] = m)
        }
        for (h = 0, i = f.length; h < i; h++) {
            k = f[h];
            for (j = 0; j < 3; j++) l = k[j].x + ":" + k[j].y, m = n[l], m !== undefined && (k[j] = m)
        }
        return g.concat(f)
    },
    isClockWise: function(a) {
        return THREE.FontUtils.Triangulate.area(a) < 0
    },
    b2p0: function(a, b) {
        var c = 1 - a;
        return c * c * b
    },
    b2p1: function(a, b) {
        return 2 * (1 - a) * a * b
    },
    b2p2: function(a, b) {
        return a * a * b
    },
    b2: function(a, b, c, d) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
    },
    b3p0: function(a, b) {
        var c = 1 - a;
        return c * c * c * b
    },
    b3p1: function(a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b
    },
    b3p2: function(a, b) {
        var c = 1 - a;
        return 3 * c * a * a * b
    },
    b3p3: function(a, b) {
        return a * a * a * b
    },
    b3: function(a, b, c, d, e) {
        return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
    }
}, THREE.TextPath = function(a, b) {
    THREE.Path.call(this), this.parameters = b || {}, this.set(a)
}, THREE.TextPath.prototype.set = function(a, b) {
    b = b || this.parameters, this.text = a;
    var c = b.size !== undefined ? b.size : 100,
        d = b.curveSegments !== undefined ? b.curveSegments : 4,
        e = b.font !== undefined ? b.font : "helvetiker",
        f = b.weight !== undefined ? b.weight : "normal",
        g = b.style !== undefined ? b.style : "normal";
    THREE.FontUtils.size = c, THREE.FontUtils.divisions = d, THREE.FontUtils.face = e, THREE.FontUtils.weight = f, THREE.FontUtils.style = g
}, THREE.TextPath.prototype.toShapes = function() {
    var a = THREE.FontUtils.drawText(this.text),
        b = a.paths,
        c = [];
    for (var d = 0, e = b.length; d < e; d++) Array.prototype.push.apply(c, b[d].toShapes());
    return c
}, THREE.AnimationHandler = function() {
    var a = [],
        b = {},
        c = {};
    c.update = function(b) {
        for (var c = 0; c < a.length; c++) a[c].update(b)
    }, c.addToUpdate = function(b) {
        a.indexOf(b) === -1 && a.push(b)
    }, c.removeFromUpdate = function(b) {
        var c = a.indexOf(b);
        c !== -1 && a.splice(c, 1)
    }, c.add = function(a) {
        b[a.name] !== undefined && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting."), b[a.name] = a, e(a)
    }, c.get = function(a) {
        if (typeof a == "string") return b[a] ? b[a] : (console.log("THREE.AnimationHandler.get: Couldn't find animation " + a), null)
    }, c.parse = function(a) {
        var b = [];
        if (a instanceof THREE.SkinnedMesh) for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
        else d(a, b);
        return b
    };
    var d = function(a, b) {
            b.push(a);
            for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
        },
        e = function(a) {
            if (a.initialized === !0) return;
            for (var b = 0; b < a.hierarchy.length; b++) {
                for (var c = 0; c < a.hierarchy[b].keys.length; c++) {
                    a.hierarchy[b].keys[c].time < 0 && (a.hierarchy[b].keys[c].time = 0);
                    if (a.hierarchy[b].keys[c].rot !== undefined && !(a.hierarchy[b].keys[c].rot instanceof THREE.Quaternion)) {
                        var d = a.hierarchy[b].keys[c].rot;
                        a.hierarchy[b].keys[c].rot = new THREE.Quaternion(d[0], d[1], d[2], d[3])
                    }
                }
                if (a.hierarchy[b].keys.length && a.hierarchy[b].keys[0].morphTargets !== undefined) {
                    var e = {};
                    for (var c = 0; c < a.hierarchy[b].keys.length; c++) for (var f = 0; f < a.hierarchy[b].keys[c].morphTargets.length; f++) {
                        var g = a.hierarchy[b].keys[c].morphTargets[f];
                        e[g] = -1
                    }
                    a.hierarchy[b].usedMorphTargets = e;
                    for (var c = 0; c < a.hierarchy[b].keys.length; c++) {
                        var h = {};
                        for (var g in e) {
                            for (var f = 0; f < a.hierarchy[b].keys[c].morphTargets.length; f++) if (a.hierarchy[b].keys[c].morphTargets[f] === g) {
                                h[g] = a.hierarchy[b].keys[c].morphTargetsInfluences[f];
                                break
                            }
                            f === a.hierarchy[b].keys[c].morphTargets.length && (h[g] = 0)
                        }
                        a.hierarchy[b].keys[c].morphTargetsInfluences = h
                    }
                }
                for (var c = 1; c < a.hierarchy[b].keys.length; c++) a.hierarchy[b].keys[c].time === a.hierarchy[b].keys[c - 1].time && (a.hierarchy[b].keys.splice(c, 1), c--);
                for (var c = 0; c < a.hierarchy[b].keys.length; c++) a.hierarchy[b].keys[c].index = c
            }
            var i = parseInt(a.length * a.fps, 10);
            a.JIT = {}, a.JIT.hierarchy = [];
            for (var b = 0; b < a.hierarchy.length; b++) a.JIT.hierarchy.push(new Array(i));
            a.initialized = !0
        };
    return c.LINEAR = 0, c.CATMULLROM = 1, c.CATMULLROM_FORWARD = 2, c
}(), THREE.Animation = function(a, b, c, d) {
    this.root = a, this.data = THREE.AnimationHandler.get(b), this.hierarchy = THREE.AnimationHandler.parse(a), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.isPaused = !0, this.loop = !0, this.interpolationType = c !== undefined ? c : THREE.AnimationHandler.LINEAR, this.JITCompile = d !== undefined ? d : !0, this.points = [], this.target = new THREE.Vector3
}, THREE.Animation.prototype.play = function(a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0, this.loop = a !== undefined ? a : !0, this.currentTime = b !== undefined ? b : 0;
        var c, d = this.hierarchy.length,
            e;
        for (c = 0; c < d; c++) {
            e = this.hierarchy[c], this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (e.useQuaternion = !0), e.matrixAutoUpdate = !0, e.animationCache === undefined && (e.animationCache = {}, e.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, e.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, e.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix);
            var f = e.animationCache.prevKey,
                g = e.animationCache.nextKey;
            f.pos = this.data.hierarchy[c].keys[0], f.rot = this.data.hierarchy[c].keys[0], f.scl = this.data.hierarchy[c].keys[0], g.pos = this.getNextKeyWith("pos", c, 1), g.rot = this.getNextKeyWith("rot", c, 1), g.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
}, THREE.Animation.prototype.pause = function() {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
}, THREE.Animation.prototype.stop = function() {
    this.isPlaying = !1, this.isPaused = !1, THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.hierarchy.length; a++) this.hierarchy[a].animationCache !== undefined && (this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix = this.hierarchy[a].animationCache.originalMatrix : this.hierarchy[a].matrix = this.hierarchy[a].animationCache.originalMatrix, delete this.hierarchy[a].animationCache)
}, THREE.Animation.prototype.update = function(a) {
    if (!this.isPlaying) return;
    var b = ["pos", "rot", "scl"],
        c, d, e, f, g, h, i, j, k, l, m = this.data.JIT.hierarchy,
        n, o, p, q, r;
    this.currentTime += a * this.timeScale, o = this.currentTime, n = this.currentTime = this.currentTime % this.data.length, l = parseInt(Math.min(n * this.data.fps, this.data.length * this.data.fps), 10);
    for (var s = 0, t = this.hierarchy.length; s < t; s++) {
        j = this.hierarchy[s], k = j.animationCache;
        if (this.JITCompile && m[s][l] !== undefined) j instanceof THREE.Bone ? (j.skinMatrix = m[s][l], j.matrixAutoUpdate = !1, j.matrixWorldNeedsUpdate = !1) : (j.matrix = m[s][l], j.matrixAutoUpdate = !1, j.matrixWorldNeedsUpdate = !0);
        else {
            this.JITCompile && (j instanceof THREE.Bone ? j.skinMatrix = j.animationCache.originalMatrix : j.matrix = j.animationCache.originalMatrix);
            for (var u = 0; u < 3; u++) {
                c = b[u], h = k.prevKey[c], i = k.nextKey[c];
                if (i.time <= o) {
                    if (n < o) {
                        if (!this.loop) {
                            this.stop();
                            return
                        }
                        h = this.data.hierarchy[s].keys[0], i = this.getNextKeyWith(c, s, 1);
                        while (i.time < n) h = i, i = this.getNextKeyWith(c, s, i.index + 1)
                    }
                    else do h = i, i = this.getNextKeyWith(c, s, i.index + 1);
                    while (i.time < n);
                    k.prevKey[c] = h, k.nextKey[c] = i
                }
                j.matrixAutoUpdate = !0, j.matrixWorldNeedsUpdate = !0, d = (n - h.time) / (i.time - h.time), f = h[c], g = i[c];
                if (d < 0 || d > 1) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + s), d = d < 0 ? 0 : 1;
                if (c === "pos") {
                    e = j.position;
                    if (this.interpolationType === THREE.AnimationHandler.LINEAR) e.x = f[0] + (g[0] - f[0]) * d, e.y = f[1] + (g[1] - f[1]) * d, e.z = f[2] + (g[2] - f[2]) * d;
                    else if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) this.points[0] = this.getPrevKeyWith("pos", s, h.index - 1).pos, this.points[1] = f, this.points[2] = g, this.points[3] = this.getNextKeyWith("pos", s, i.index + 1).pos, d = d * .33 + .33, p = this.interpolateCatmullRom(this.points, d), e.x = p[0], e.y = p[1], e.z = p[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (q = this.interpolateCatmullRom(this.points, d * 1.01), this.target.set(q[0], q[1], q[2]), this.target.subSelf(e), this.target.y = 0, this.target.normalize(), r = Math.atan2(this.target.x, this.target.z), j.rotation.set(0, r, 0))
                }
                else c === "rot" ? THREE.Quaternion.slerp(f, g, j.quaternion, d) : c === "scl" && (e = j.scale, e.x = f[0] + (g[0] - f[0]) * d, e.y = f[1] + (g[1] - f[1]) * d, e.z = f[2] + (g[2] - f[2]) * d)
            }
        }
    }
    if (this.JITCompile && m[0][l] === undefined) {
        this.hierarchy[0].updateMatrixWorld(!0);
        for (var s = 0; s < this.hierarchy.length; s++) this.hierarchy[s] instanceof THREE.Bone ? m[s][l] = this.hierarchy[s].skinMatrix.clone() : m[s][l] = this.hierarchy[s].matrix.clone()
    }
}, THREE.Animation.prototype.interpolateCatmullRom = function(a, b) {
    var c = [],
        d = [],
        e, f, g, h, i, j, k, l, m;
    return e = (a.length - 1) * b, f = Math.floor(e), g = e - f, c[0] = f === 0 ? f : f - 1, c[1] = f, c[2] = f > a.length - 2 ? f : f + 1, c[3] = f > a.length - 3 ? f : f + 2, j = a[c[0]], k = a[c[1]], l = a[c[2]], m = a[c[3]], h = g * g, i = g * h, d[0] = this.interpolate(j[0], k[0], l[0], m[0], g, h, i), d[1] = this.interpolate(j[1], k[1], l[1], m[1], g, h, i), d[2] = this.interpolate(j[2], k[2], l[2], m[2], g, h, i), d
}, THREE.Animation.prototype.interpolate = function(a, b, c, d, e, f, g) {
    var h = (c - a) * .5,
        i = (d - b) * .5;
    return (2 * (b - c) + h + i) * g + (-3 * (b - c) - 2 * h - i) * f + h * e + b
}, THREE.Animation.prototype.getNextKeyWith = function(a, b, c) {
    var d = this.data.hierarchy[b].keys;
    this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c = c < d.length - 1 ? c : d.length - 1 : c %= d.length;
    for (; c < d.length; c++) if (d[c][a] !== undefined) return d[c];
    return this.data.hierarchy[b].keys[0]
}, THREE.Animation.prototype.getPrevKeyWith = function(a, b, c) {
    var d = this.data.hierarchy[b].keys;
    this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c = c > 0 ? c : 0 : c = c >= 0 ? c : c + d.length;
    for (; c >= 0; c--) if (d[c][a] !== undefined) return d[c];
    return this.data.hierarchy[b].keys[d.length - 1]
}, THREE.KeyFrameAnimation = function(a, b, c) {
    this.root = a, this.data = THREE.AnimationHandler.get(b), this.hierarchy = THREE.AnimationHandler.parse(a), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.isPaused = !0, this.loop = !0, this.JITCompile = c !== undefined ? c : !0;
    for (var d = 0, e = this.hierarchy.length; d < e; d++) {
        var f = this.data.hierarchy[d].keys,
            g = this.data.hierarchy[d].sids,
            h = this.hierarchy[d];
        if (f.length && g) {
            for (var i = 0; i < g.length; i++) {
                var j = g[i],
                    k = this.getNextKeyWith(j, d, 0);
                k && k.apply(j)
            }
            h.matrixAutoUpdate = !1, this.data.hierarchy[d].node.updateMatrix(), h.matrixWorldNeedsUpdate = !0
        }
    }
}, THREE.KeyFrameAnimation.prototype.play = function(a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0, this.loop = a !== undefined ? a : !0, this.currentTime = b !== undefined ? b : 0, this.startTimeMs = b, this.startTime = 1e7, this.endTime = -this.startTime;
        var c, d = this.hierarchy.length,
            e, f;
        for (c = 0; c < d; c++) {
            e = this.hierarchy[c], f = this.data.hierarchy[c], e.useQuaternion = !0, f.animationCache === undefined && (f.animationCache = {}, f.animationCache.prevKey = null, f.animationCache.nextKey = null, f.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix);
            var g = this.data.hierarchy[c].keys;
            g.length && (f.animationCache.prevKey = g[0], f.animationCache.nextKey = g[1], this.startTime = Math.min(g[0].time, this.startTime), this.endTime = Math.max(g[g.length - 1].time, this.endTime))
        }
        this.update(0)
    }
    this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
}, THREE.KeyFrameAnimation.prototype.pause = function() {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
}, THREE.KeyFrameAnimation.prototype.stop = function() {
    this.isPlaying = !1, this.isPaused = !1, THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.data.hierarchy.length; a++) {
        var b = this.hierarchy[a],
            c = this.data.hierarchy[a];
        if (c.animationCache !== undefined) {
            var d = c.animationCache.originalMatrix;
            b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d), delete c.animationCache
        }
    }
}, THREE.KeyFrameAnimation.prototype.update = function(a) {
    if (!this.isPlaying) return;
    var b, c, d, e, f, g = this.data.JIT.hierarchy,
        h, i, j;
    this.currentTime += a * this.timeScale, i = this.currentTime, h = this.currentTime = this.currentTime % this.data.length, h < this.startTimeMs && (h = this.currentTime = this.startTimeMs + h), f = parseInt(Math.min(h * this.data.fps, this.data.length * this.data.fps), 10), j = h < i;
    if (j && !this.loop) {
        for (var k = 0, l = this.hierarchy.length; k < l; k++) {
            var m = this.data.hierarchy[k].keys,
                n = this.data.hierarchy[k].sids,
                o = m.length - 1,
                p = this.hierarchy[k];
            if (m.length) {
                for (var q = 0; q < n.length; q++) {
                    var r = n[q],
                        s = this.getPrevKeyWith(r, k, o);
                    s && s.apply(r)
                }
                this.data.hierarchy[k].node.updateMatrix(), p.matrixWorldNeedsUpdate = !0
            }
        }
        this.stop();
        return
    }
    if (h < this.startTime) return;
    for (var k = 0, l = this.hierarchy.length; k < l; k++) {
        d = this.hierarchy[k], e = this.data.hierarchy[k];
        var m = e.keys,
            t = e.animationCache;
        if (this.JITCompile && g[k][f] !== undefined) d instanceof THREE.Bone ? (d.skinMatrix = g[k][f], d.matrixWorldNeedsUpdate = !1) : (d.matrix = g[k][f], d.matrixWorldNeedsUpdate = !0);
        else if (m.length) {
            this.JITCompile && t && (d instanceof THREE.Bone ? d.skinMatrix = t.originalMatrix : d.matrix = t.originalMatrix), b = t.prevKey, c = t.nextKey;
            if (b && c) {
                if (c.time <= i) {
                    if (j && this.loop) {
                        b = m[0], c = m[1];
                        while (c.time < h) b = c, c = m[b.index + 1]
                    }
                    else if (!j) {
                        var u = m.length - 1;
                        while (c.time < h && c.index !== u) b = c, c = m[b.index + 1]
                    }
                    t.prevKey = b, t.nextKey = c
                }
                c.time >= h ? b.interpolate(c, h) : b.interpolate(c, c.time)
            }
            this.data.hierarchy[k].node.updateMatrix(), d.matrixWorldNeedsUpdate = !0
        }
    }
    if (this.JITCompile && g[0][f] === undefined) {
        this.hierarchy[0].updateMatrixWorld(!0);
        for (var k = 0; k < this.hierarchy.length; k++) this.hierarchy[k] instanceof THREE.Bone ? g[k][f] = this.hierarchy[k].skinMatrix.clone() : g[k][f] = this.hierarchy[k].matrix.clone()
    }
}, THREE.KeyFrameAnimation.prototype.getNextKeyWith = function(a, b, c) {
    var d = this.data.hierarchy[b].keys;
    c %= d.length;
    for (; c < d.length; c++) if (d[c].hasTarget(a)) return d[c];
    return d[0]
}, THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function(a, b, c) {
    var d = this.data.hierarchy[b].keys;
    c = c >= 0 ? c : c + d.length;
    for (; c >= 0; c--) if (d[c].hasTarget(a)) return d[c];
    return d[d.length - 1]
}, THREE.CubeCamera = function(a, b, c) {
    THREE.Object3D.call(this);
    var d = 90,
        e = 1,
        f = new THREE.PerspectiveCamera(d, e, a, b);
    f.up.set(0, -1, 0), f.lookAt(new THREE.Vector3(1, 0, 0)), this.add(f);
    var g = new THREE.PerspectiveCamera(d, e, a, b);
    g.up.set(0, -1, 0), g.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(g);
    var h = new THREE.PerspectiveCamera(d, e, a, b);
    h.up.set(0, 0, 1), h.lookAt(new THREE.Vector3(0, 1, 0)), this.add(h);
    var i = new THREE.PerspectiveCamera(d, e, a, b);
    i.up.set(0, 0, -1), i.lookAt(new THREE.Vector3(0, -1, 0)), this.add(i);
    var j = new THREE.PerspectiveCamera(d, e, a, b);
    j.up.set(0, -1, 0), j.lookAt(new THREE.Vector3(0, 0, 1)), this.add(j);
    var k = new THREE.PerspectiveCamera(d, e, a, b);
    k.up.set(0, -1, 0), k.lookAt(new THREE.Vector3(0, 0, -1)), this.add(k), this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    }), this.updateCubeMap = function(a, b) {
        var c = this.renderTarget,
            d = c.generateMipmaps;
        c.generateMipmaps = !1, c.activeCubeFace = 0, a.render(b, f, c), c.activeCubeFace = 1, a.render(b, g, c), c.activeCubeFace = 2, a.render(b, h, c), c.activeCubeFace = 3, a.render(b, i, c), c.activeCubeFace = 4, a.render(b, j, c), c.generateMipmaps = d, c.activeCubeFace = 5, a.render(b, k, c)
    }
}, THREE.CubeCamera.prototype = new THREE.Object3D, THREE.CubeCamera.prototype.constructor = THREE.CubeCamera, THREE.CombinedCamera = function(a, b, c, d, e, f, g) {
    THREE.Camera.call(this), this.fov = c, this.left = -a / 2, this.right = a / 2, this.top = b / 2, this.bottom = -b / 2, this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g), this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e), this.zoom = 1, this.toPerspective();
    var h = a / b
}, THREE.CombinedCamera.prototype = new THREE.Camera, THREE.CombinedCamera.prototype.constructor = THREE.CombinedCamera, THREE.CombinedCamera.prototype.toPerspective = function() {
    this.near = this.cameraP.near, this.far = this.cameraP.far, this.cameraP.fov = this.fov / this.zoom, this.cameraP.updateProjectionMatrix(), this.projectionMatrix = this.cameraP.projectionMatrix, this.inPersepectiveMode = !0, this.inOrthographicMode = !1
}, THREE.CombinedCamera.prototype.toOrthographic = function() {
    var a = this.fov,
        b = this.cameraP.aspect,
        c = this.cameraP.near,
        d = this.cameraP.far,
        e = (c + d) / 2,
        f = Math.tan(a / 2) * e,
        g = 2 * f,
        h = g * b,
        i = h / 2;
    f /= this.zoom, i /= this.zoom, this.cameraO.left = -i, this.cameraO.right = i, this.cameraO.top = f, this.cameraO.bottom = -f, this.cameraO.updateProjectionMatrix(), this.near = this.cameraO.near, this.far = this.cameraO.far, this.projectionMatrix = this.cameraO.projectionMatrix, this.inPersepectiveMode = !1, this.inOrthographicMode = !0
}, THREE.CombinedCamera.prototype.setSize = function(a, b) {
    this.cameraP.aspect = a / b, this.left = -a / 2, this.right = a / 2, this.top = b / 2, this.bottom = -b / 2
}, THREE.CombinedCamera.prototype.setFov = function(a) {
    this.fov = a, this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
}, THREE.CombinedCamera.prototype.updateProjectionMatrix = function() {
    this.inPersepectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
}, THREE.CombinedCamera.prototype.setLens = function(a, b) {
    b = b !== undefined ? b : 24;
    var c = 2 * Math.atan(b / (a * 2)) * (180 / Math.PI);
    return this.setFov(c), c
}, THREE.CombinedCamera.prototype.setZoom = function(a) {
    this.zoom = a, this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
}, THREE.CombinedCamera.prototype.toFrontView = function() {
    this.rotation.x = 0, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toBackView = function() {
    this.rotation.x = 0, this.rotation.y = Math.PI, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toLeftView = function() {
    this.rotation.x = 0, this.rotation.y = -Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toRightView = function() {
    this.rotation.x = 0, this.rotation.y = Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toTopView = function() {
    this.rotation.x = -Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toBottomView = function() {
    this.rotation.x = Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.FirstPersonControls = function(a, b) {
    function c(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    }
    this.object = a, this.target = new THREE.Vector3(0, 0, 0), this.domElement = b !== undefined ? b : document, this.movementSpeed = 1, this.lookSpeed = .005, this.noFly = !1, this.lookVertical = !0, this.autoForward = !1, this.activeLook = !0, this.heightSpeed = !1, this.heightCoef = 1, this.heightMin = 0, this.constrainVertical = !1, this.verticalMin = 0, this.verticalMax = Math.PI, this.autoSpeedFactor = 0, this.mouseX = 0, this.mouseY = 0, this.lat = 0, this.lon = 0, this.phi = 0, this.theta = 0, this.moveForward = !1, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.freeze = !1, this.mouseDragOn = !1, this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX = this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1)), this.onMouseDown = function(a) {
        this.domElement !== document && this.domElement.focus(), a.preventDefault(), a.stopPropagation();
        if (this.activeLook) switch (a.button) {
        case 0:
            this.moveForward = !0;
            break;
        case 2:
            this.moveBackward = !0
        }
        this.mouseDragOn = !0
    }, this.onMouseUp = function(a) {
        a.preventDefault(), a.stopPropagation();
        if (this.activeLook) switch (a.button) {
        case 0:
            this.moveForward = !1;
            break;
        case 2:
            this.moveBackward = !1
        }
        this.mouseDragOn = !1
    }, this.onMouseMove = function(a) {
        this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
    }, this.onKeyDown = function(a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            this.moveForward = !0;
            break;
        case 37:
        case 65:
            this.moveLeft = !0;
            break;
        case 40:
        case 83:
            this.moveBackward = !0;
            break;
        case 39:
        case 68:
            this.moveRight = !0;
            break;
        case 82:
            this.moveUp = !0;
            break;
        case 70:
            this.moveDown = !0;
            break;
        case 81:
            this.freeze = !this.freeze
        }
    }, this.onKeyUp = function(a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            this.moveForward = !1;
            break;
        case 37:
        case 65:
            this.moveLeft = !1;
            break;
        case 40:
        case 83:
            this.moveBackward = !1;
            break;
        case 39:
        case 68:
            this.moveRight = !1;
            break;
        case 82:
            this.moveUp = !1;
            break;
        case 70:
            this.moveDown = !1
        }
    }, this.update = function(a) {
        var b = 0;
        if (this.freeze) return;
        if (this.heightSpeed) {
            var c = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax),
                d = c - this.heightMin;
            this.autoSpeedFactor = a * d * this.heightCoef
        }
        else this.autoSpeedFactor = 0;
        b = a * this.movementSpeed, (this.moveForward || this.autoForward && !this.moveBackward) && this.object.translateZ(-(b + this.autoSpeedFactor)), this.moveBackward && this.object.translateZ(b), this.moveLeft && this.object.translateX(-b), this.moveRight && this.object.translateX(b), this.moveUp && this.object.translateY(b), this.moveDown && this.object.translateY(-b);
        var e = a * this.lookSpeed;
        this.activeLook || (e = 0), this.lon += this.mouseX * e, this.lookVertical && (this.lat -= this.mouseY * e), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = (90 - this.lat) * Math.PI / 180, this.theta = this.lon * Math.PI / 180;
        var f = this.target,
            g = this.object.position;
        f.x = g.x + 100 * Math.sin(this.phi) * Math.cos(this.theta), f.y = g.y + 100 * Math.cos(this.phi), f.z = g.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        var h = 1;
        this.constrainVertical && (h = Math.PI / (this.verticalMax - this.verticalMin)), this.lon += this.mouseX * e, this.lookVertical && (this.lat -= this.mouseY * e * h), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = (90 - this.lat) * Math.PI / 180, this.theta = this.lon * Math.PI / 180, this.constrainVertical && (this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax));
        var f = this.target,
            g = this.object.position;
        f.x = g.x + 100 * Math.sin(this.phi) * Math.cos(this.theta), f.y = g.y + 100 * Math.cos(this.phi), f.z = g.z + 100 * Math.sin(this.phi) * Math.sin(this.theta), this.object.lookAt(f)
    }, this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1), this.domElement.addEventListener("mousemove", c(this, this.onMouseMove), !1), this.domElement.addEventListener("mousedown", c(this, this.onMouseDown), !1), this.domElement.addEventListener("mouseup", c(this, this.onMouseUp), !1), this.domElement.addEventListener("keydown", c(this, this.onKeyDown), !1), this.domElement.addEventListener("keyup", c(this, this.onKeyUp), !1)
}, THREE.PathControls = function(a, b) {
    function e(a) {
        var b = a % c;
        return b >= 0 ? b : b + c
    }
    function f(a, b) {
        var c = a[0] - b[0],
            d = a[1] - b[1],
            e = a[2] - b[2];
        return Math.sqrt(c * c + d * d + e * e)
    }
    function g(a) {
        return (a *= 2) < 1 ? .5 * a * a : -0.5 * (--a * (a - 2) - 1)
    }
    function h(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    }
    function i(a, b, c, d) {
        var e = {
            name: c,
            fps: .6,
            length: d,
            hierarchy: []
        },
            f, g, i = b.getControlPointsArray(),
            j = b.getLength(),
            k = i.length,
            l = 0,
            m = 0,
            n = k - 1;
        g = {
            parent: -1,
            keys: []
        }, g.keys[m] = {
            time: 0,
            pos: i[m],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        }, g.keys[n] = {
            time: d,
            pos: i[n],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        for (f = 1; f < k - 1; f++) l = d * j.chunks[f] / j.total, g.keys[f] = {
            time: l,
            pos: i[f]
        };
        return e.hierarchy[0] = g, THREE.AnimationHandler.add(e), new THREE.Animation(a, c, THREE.AnimationHandler.CATMULLROM_FORWARD, !1)
    }
    function j(a, b) {
        var c, d, e, f = new THREE.Geometry;
        for (c = 0; c < a.points.length * b; c++) d = c / (a.points.length * b), e = a.getPoint(d), f.vertices[c] = new THREE.Vector3(e.x, e.y, e.z);
        return f
    }
    function k(a, b) {
        var c = j(b, 10),
            d = j(b, 10),
            e = new THREE.LineBasicMaterial({
                color: 16711680,
                linewidth: 3
            }),
            f = new THREE.Line(c, e),
            g = new THREE.ParticleSystem(d, new THREE.ParticleBasicMaterial({
                color: 16755200,
                size: 3
            }));
        f.scale.set(1, 1, 1), a.add(f), g.scale.set(1, 1, 1), a.add(g);
        var h, i = new THREE.SphereGeometry(1, 16, 8),
            k = new THREE.MeshBasicMaterial({
                color: 65280
            });
        for (var l = 0; l < b.points.length; l++) h = new THREE.Mesh(i, k), h.position.copy(b.points[l]), a.add(h)
    }
    this.object = a, this.domElement = b !== undefined ? b : document, this.id = "PathControls" + THREE.PathControlsIdCounter++, this.duration = 1e4, this.waypoints = [], this.useConstantSpeed = !0, this.resamplingCoef = 50, this.debugPath = new THREE.Object3D, this.debugDummy = new THREE.Object3D, this.animationParent = new THREE.Object3D, this.lookSpeed = .005, this.lookVertical = !0, this.lookHorizontal = !0, this.verticalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    }, this.horizontalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    }, this.target = new THREE.Object3D, this.mouseX = 0, this.mouseY = 0, this.lat = 0, this.lon = 0, this.phi = 0, this.theta = 0, this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX = this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    var c = Math.PI * 2,
        d = Math.PI / 180;
    this.update = function(a) {
        var b, c;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed * a), this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed * a), this.lon = Math.max(0, Math.min(360, this.lon)), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = (90 - this.lat) * d, this.theta = this.lon * d, this.phi = e(this.phi), b = this.verticalAngleMap.srcRange, c = this.verticalAngleMap.dstRange;
        var f = THREE.Math.mapLinear(this.phi, b[0], b[1], c[0], c[1]),
            h = c[1] - c[0],
            i = (f - c[0]) / h;
        this.phi = g(i) * h + c[0], b = this.horizontalAngleMap.srcRange, c = this.horizontalAngleMap.dstRange;
        var j = THREE.Math.mapLinear(this.theta, b[0], b[1], c[0], c[1]),
            k = c[1] - c[0],
            l = (j - c[0]) / k;
        this.theta = g(l) * k + c[0];
        var m = this.target.position,
            n = this.object.position;
        m.x = 100 * Math.sin(this.phi) * Math.cos(this.theta), m.y = 100 * Math.cos(this.phi), m.z = 100 * Math.sin(this.phi) * Math.sin(this.theta), this.object.lookAt(this.target.position)
    }, this.onMouseMove = function(a) {
        this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
    }, this.init = function() {
        this.spline = new THREE.Spline, this.spline.initFromArray(this.waypoints), this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
        if (this.createDebugDummy) {
            var a = new THREE.MeshLambertMaterial({
                color: 30719
            }),
                b = new THREE.MeshLambertMaterial({
                    color: 65280
                }),
                c = new THREE.CubeGeometry(10, 10, 20),
                d = new THREE.CubeGeometry(2, 2, 10);
            this.animationParent = new THREE.Mesh(c, a);
            var e = new THREE.Mesh(d, b);
            e.position.set(0, 10, 0), this.animation = i(this.animationParent, this.spline, this.id, this.duration), this.animationParent.add(this.object), this.animationParent.add(this.target), this.animationParent.add(e)
        }
        else this.animation = i(this.animationParent, this.spline, this.id, this.duration), this.animationParent.add(this.target), this.animationParent.add(this.object);
        this.createDebugPath && k(this.debugPath, this.spline), this.domElement.addEventListener("mousemove", h(this, this.onMouseMove), !1)
    }
}, THREE.PathControlsIdCounter = 0, THREE.FlyControls = function(a, b) {
    function c(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    }
    this.object = a, this.domElement = b !== undefined ? b : document, b && this.domElement.setAttribute("tabindex", -1), this.movementSpeed = 1, this.rollSpeed = .005, this.dragToLook = !1, this.autoForward = !1, this.object.useQuaternion = !0, this.tmpQuaternion = new THREE.Quaternion, this.mouseStatus = 0, this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    }, this.moveVector = new THREE.Vector3(0, 0, 0), this.rotationVector = new THREE.Vector3(0, 0, 0), this.handleEvent = function(a) {
        typeof this[a.type] == "function" && this[a.type](a)
    }, this.keydown = function(a) {
        if (a.altKey) return;
        switch (a.keyCode) {
        case 16:
            this.movementSpeedMultiplier = .1;
            break;
        case 87:
            this.moveState.forward = 1;
            break;
        case 83:
            this.moveState.back = 1;
            break;
        case 65:
            this.moveState.left = 1;
            break;
        case 68:
            this.moveState.right = 1;
            break;
        case 82:
            this.moveState.up = 1;
            break;
        case 70:
            this.moveState.down = 1;
            break;
        case 38:
            this.moveState.pitchUp = 1;
            break;
        case 40:
            this.moveState.pitchDown = 1;
            break;
        case 37:
            this.moveState.yawLeft = 1;
            break;
        case 39:
            this.moveState.yawRight = 1;
            break;
        case 81:
            this.moveState.rollLeft = 1;
            break;
        case 69:
            this.moveState.rollRight = 1
        }
        this.updateMovementVector(), this.updateRotationVector()
    }, this.keyup = function(a) {
        switch (a.keyCode) {
        case 16:
            this.movementSpeedMultiplier = 1;
            break;
        case 87:
            this.moveState.forward = 0;
            break;
        case 83:
            this.moveState.back = 0;
            break;
        case 65:
            this.moveState.left = 0;
            break;
        case 68:
            this.moveState.right = 0;
            break;
        case 82:
            this.moveState.up = 0;
            break;
        case 70:
            this.moveState.down = 0;
            break;
        case 38:
            this.moveState.pitchUp = 0;
            break;
        case 40:
            this.moveState.pitchDown = 0;
            break;
        case 37:
            this.moveState.yawLeft = 0;
            break;
        case 39:
            this.moveState.yawRight = 0;
            break;
        case 81:
            this.moveState.rollLeft = 0;
            break;
        case 69:
            this.moveState.rollRight = 0
        }
        this.updateMovementVector(), this.updateRotationVector()
    }, this.mousedown = function(a) {
        this.domElement !== document && this.domElement.focus(), a.preventDefault(), a.stopPropagation();
        if (this.dragToLook) this.mouseStatus++;
        else switch (a.button) {
        case 0:
            this.object.moveForward = !0;
            break;
        case 2:
            this.object.moveBackward = !0
        }
    }, this.mousemove = function(a) {
        if (!this.dragToLook || this.mouseStatus > 0) {
            var b = this.getContainerDimensions(),
                c = b.size[0] / 2,
                d = b.size[1] / 2;
            this.moveState.yawLeft = -(a.pageX - b.offset[0] - c) / c, this.moveState.pitchDown = (a.pageY - b.offset[1] - d) / d, this.updateRotationVector()
        }
    }, this.mouseup = function(a) {
        a.preventDefault(), a.stopPropagation();
        if (this.dragToLook) this.mouseStatus--, this.moveState.yawLeft = this.moveState.pitchDown = 0;
        else switch (a.button) {
        case 0:
            this.moveForward = !1;
            break;
        case 2:
            this.moveBackward = !1
        }
        this.updateRotationVector()
    }, this.update = function(a) {
        var b = a * this.movementSpeed,
            c = a * this.rollSpeed;
        this.object.translateX(this.moveVector.x * b), this.object.translateY(this.moveVector.y * b), this.object.translateZ(this.moveVector.z * b), this.tmpQuaternion.set(this.rotationVector.x * c, this.rotationVector.y * c, this.rotationVector.z * c, 1).normalize(), this.object.quaternion.multiplySelf(this.tmpQuaternion), this.object.matrix.setPosition(this.object.position), this.object.matrix.setRotationFromQuaternion(this.object.quaternion), this.object.matrixWorldNeedsUpdate = !0
    }, this.updateMovementVector = function() {
        var a = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right, this.moveVector.y = -this.moveState.down + this.moveState.up, this.moveVector.z = -a + this.moveState.back
    }, this.updateRotationVector = function() {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp, this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft, this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
    }, this.getContainerDimensions = function() {
        return this.domElement != document ? {
            size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
            offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
        } : {
            size: [window.innerWidth, window.innerHeight],
            offset: [0, 0]
        }
    }, this.domElement.addEventListener("mousemove", c(this, this.mousemove), !1), this.domElement.addEventListener("mousedown", c(this, this.mousedown), !1), this.domElement.addEventListener("mouseup", c(this, this.mouseup), !1), this.domElement.addEventListener("keydown", c(this, this.keydown), !1), this.domElement.addEventListener("keyup", c(this, this.keyup), !1), this.updateMovementVector(), this.updateRotationVector()
}, THREE.RollControls = function(a, b) {
    function p(a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            i = 1;
            break;
        case 37:
        case 65:
            j = -1;
            break;
        case 40:
        case 83:
            i = -1;
            break;
        case 39:
        case 68:
            j = 1;
            break;
        case 81:
            g = !0, h = 1;
            break;
        case 69:
            g = !0, h = -1;
            break;
        case 82:
            k = 1;
            break;
        case 70:
            k = -1
        }
    }
    function q(a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            i = 0;
            break;
        case 37:
        case 65:
            j = 0;
            break;
        case 40:
        case 83:
            i = 0;
            break;
        case 39:
        case 68:
            j = 0;
            break;
        case 81:
            g = !1;
            break;
        case 69:
            g = !1;
            break;
        case 82:
            k = 0;
            break;
        case 70:
            k = 0
        }
    }
    function r(a) {
        l = (a.clientX - n) / window.innerWidth, m = (a.clientY - o) / window.innerHeight
    }
    function s(a) {
        a.preventDefault(), a.stopPropagation();
        switch (a.button) {
        case 0:
            i = 1;
            break;
        case 2:
            i = -1
        }
    }
    function t(a) {
        a.preventDefault(), a.stopPropagation();
        switch (a.button) {
        case 0:
            i = 0;
            break;
        case 2:
            i = 0
        }
    }
    this.object = a, this.domElement = b !== undefined ? b : document, this.mouseLook = !0, this.autoForward = !1, this.lookSpeed = 1, this.movementSpeed = 1, this.rollSpeed = 1, this.constrainVertical = [-0.9, .9], this.object.matrixAutoUpdate = !1, this.forward = new THREE.Vector3(0, 0, 1), this.roll = 0;
    var c = new THREE.Vector3,
        d = new THREE.Vector3,
        e = new THREE.Vector3,
        f = new THREE.Matrix4,
        g = !1,
        h = 1,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = window.innerWidth / 2,
        o = window.innerHeight / 2;
    this.update = function(a) {
        if (this.mouseLook) {
            var b = a * this.lookSpeed;
            this.rotateHorizontally(b * l), this.rotateVertically(b * m)
        }
        var n = a * this.movementSpeed,
            o = i > 0 || this.autoForward && !(i < 0) ? 1 : i;
        this.object.translateZ(-n * o), this.object.translateX(n * j), this.object.translateY(n * k), g && (this.roll += this.rollSpeed * a * h), this.forward.y > this.constrainVertical[1] ? (this.forward.y = this.constrainVertical[1], this.forward.normalize()) : this.forward.y < this.constrainVertical[0] && (this.forward.y = this.constrainVertical[0], this.forward.normalize()), e.copy(this.forward), d.set(0, 1, 0), c.cross(d, e).normalize(), d.cross(e, c).normalize(), this.object.matrix.elements[0] = c.x, this.object.matrix.elements[4] = d.x, this.object.matrix.elements[8] = e.x, this.object.matrix.elements[1] = c.y, this.object.matrix.elements[5] = d.y, this.object.matrix.elements[9] = e.y, this.object.matrix.elements[2] = c.z, this.object.matrix.elements[6] = d.z, this.object.matrix.elements[10] = e.z, f.identity(), f.elements[0] = Math.cos(this.roll), f.elements[4] = -Math.sin(this.roll), f.elements[1] = Math.sin(this.roll), f.elements[5] = Math.cos(this.roll), this.object.matrix.multiplySelf(f), this.object.matrixWorldNeedsUpdate = !0, this.object.matrix.elements[12] = this.object.position.x, this.object.matrix.elements[13] = this.object.position.y, this.object.matrix.elements[14] = this.object.position.z
    }, this.translateX = function(a) {
        this.object.position.x += this.object.matrix.elements[0] * a, this.object.position.y += this.object.matrix.elements[1] * a, this.object.position.z += this.object.matrix.elements[2] * a
    }, this.translateY = function(a) {
        this.object.position.x += this.object.matrix.elements[4] * a, this.object.position.y += this.object.matrix.elements[5] * a, this.object.position.z += this.object.matrix.elements[6] * a
    }, this.translateZ = function(a) {
        this.object.position.x -= this.object.matrix.elements[8] * a, this.object.position.y -= this.object.matrix.elements[9] * a, this.object.position.z -= this.object.matrix.elements[10] * a
    }, this.rotateHorizontally = function(a) {
        c.set(this.object.matrix.elements[0], this.object.matrix.elements[1], this.object.matrix.elements[2]), c.multiplyScalar(a), this.forward.subSelf(c), this.forward.normalize()
    }, this.rotateVertically = function(a) {
        d.set(this.object.matrix.elements[4], this.object.matrix.elements[5], this.object.matrix.elements[6]), d.multiplyScalar(a), this.forward.addSelf(d), this.forward.normalize()
    }, this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1), this.domElement.addEventListener("mousemove", r, !1), this.domElement.addEventListener("mousedown", s, !1), this.domElement.addEventListener("mouseup", t, !1), this.domElement.addEventListener("keydown", p, !1), this.domElement.addEventListener("keyup", q, !1)
}, THREE.TrackballControls = function(a, b) {
    function p(a) {
        if (!c.enabled) return;
        if (g !== d.NONE) return;
        a.keyCode === c.keys[d.ROTATE] && !c.noRotate ? g = d.ROTATE : a.keyCode === c.keys[d.ZOOM] && !c.noZoom ? g = d.ZOOM : a.keyCode === c.keys[d.PAN] && !c.noPan && (g = d.PAN), g !== d.NONE && (f = !0)
    }
    function q(a) {
        if (!c.enabled) return;
        g !== d.NONE && (g = d.NONE)
    }
    function r(a) {
        if (!c.enabled) return;
        a.preventDefault(), a.stopPropagation(), g === d.NONE && (g = a.button, g === d.ROTATE && !c.noRotate ? i = j = c.getMouseProjectionOnBall(a.clientX, a.clientY) : g === d.ZOOM && !c.noZoom ? k = l = c.getMouseOnScreen(a.clientX, a.clientY) : this.noPan || (m = n = c.getMouseOnScreen(a.clientX, a.clientY)))
    }
    function s(a) {
        if (!c.enabled) return;
        f && (i = j = c.getMouseProjectionOnBall(a.clientX, a.clientY), k = l = c.getMouseOnScreen(a.clientX, a.clientY), m = n = c.getMouseOnScreen(a.clientX, a.clientY), f = !1);
        if (g === d.NONE) return;
        g === d.ROTATE && !c.noRotate ? j = c.getMouseProjectionOnBall(a.clientX, a.clientY) : g === d.ZOOM && !c.noZoom ? l = c.getMouseOnScreen(a.clientX, a.clientY) : g === d.PAN && !c.noPan && (n = c.getMouseOnScreen(a.clientX, a.clientY))
    }
    function t(a) {
        if (!c.enabled) return;
        a.preventDefault(), a.stopPropagation(), g = d.NONE
    }
    THREE.EventTarget.call(this);
    var c = this,
        d = {
            NONE: -1,
            ROTATE: 0,
            ZOOM: 1,
            PAN: 2
        };
    this.object = a, this.domElement = b !== undefined ? b : document, this.enabled = !0, this.screen = {
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: 0,
        offsetTop: 0
    }, this.radius = (this.screen.width + this.screen.height) / 4, this.rotateSpeed = 1, this.zoomSpeed = 1.2, this.panSpeed = .3, this.noRotate = !1, this.noZoom = !1, this.noPan = !1, this.staticMoving = !1, this.dynamicDampingFactor = .2, this.minDistance = 0, this.maxDistance = Infinity, this.keys = [65, 83, 68], this.target = new THREE.Vector3;
    var e = new THREE.Vector3,
        f = !1,
        g = d.NONE,
        h = new THREE.Vector3,
        i = new THREE.Vector3,
        j = new THREE.Vector3,
        k = new THREE.Vector2,
        l = new THREE.Vector2,
        m = new THREE.Vector2,
        n = new THREE.Vector2,
        o = {
            type: "change"
        };
    this.handleEvent = function(a) {
        typeof this[a.type] == "function" && this[a.type](a)
    }, this.getMouseOnScreen = function(a, b) {
        return new THREE.Vector2((a - c.screen.offsetLeft) / c.radius * .5, (b - c.screen.offsetTop) / c.radius * .5)
    }, this.getMouseProjectionOnBall = function(a, b) {
        var d = new THREE.Vector3((a - c.screen.width * .5 - c.screen.offsetLeft) / c.radius, (c.screen.height * .5 + c.screen.offsetTop - b) / c.radius, 0),
            e = d.length();
        e > 1 ? d.normalize() : d.z = Math.sqrt(1 - e * e), h.copy(c.object.position).subSelf(c.target);
        var f = c.object.up.clone().setLength(d.y);
        return f.addSelf(c.object.up.clone().crossSelf(h).setLength(d.x)), f.addSelf(h.setLength(d.z)), f
    }, this.rotateCamera = function() {
        var a = Math.acos(i.dot(j) / i.length() / j.length());
        if (a) {
            var b = (new THREE.Vector3).cross(i, j).normalize(),
                d = new THREE.Quaternion;
            a *= c.rotateSpeed, d.setFromAxisAngle(b, -a), d.multiplyVector3(h), d.multiplyVector3(c.object.up), d.multiplyVector3(j), c.staticMoving ? i = j : (d.setFromAxisAngle(b, a * (c.dynamicDampingFactor - 1)), d.multiplyVector3(i))
        }
    }, this.zoomCamera = function() {
        var a = 1 + (l.y - k.y) * c.zoomSpeed;
        a !== 1 && a > 0 && (h.multiplyScalar(a), c.staticMoving ? k = l : k.y += (l.y - k.y) * this.dynamicDampingFactor)
    }, this.panCamera = function() {
        var a = n.clone().subSelf(m);
        if (a.lengthSq()) {
            a.multiplyScalar(h.length() * c.panSpeed);
            var b = h.clone().crossSelf(c.object.up).setLength(a.x);
            b.addSelf(c.object.up.clone().setLength(a.y)), c.object.position.addSelf(b), c.target.addSelf(b), c.staticMoving ? m = n : m.addSelf(a.sub(n, m).multiplyScalar(c.dynamicDampingFactor))
        }
    }, this.checkDistances = function() {
        if (!c.noZoom || !c.noPan) c.object.position.lengthSq() > c.maxDistance * c.maxDistance && c.object.position.setLength(c.maxDistance), h.lengthSq() < c.minDistance * c.minDistance && c.object.position.add(c.target, h.setLength(c.minDistance))
    }, this.update = function() {
        h.copy(c.object.position).subSelf(c.target), c.noRotate || c.rotateCamera(), c.noZoom || c.zoomCamera(), c.noPan || c.panCamera(), c.object.position.add(c.target, h), c.checkDistances(), c.object.lookAt(c.target), e.distanceTo(c.object.position) > 0 && (c.dispatchEvent(o), e.copy(c.object.position))
    }, this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1), this.domElement.addEventListener("mousemove", s, !1), this.domElement.addEventListener("mousedown", r, !1), this.domElement.addEventListener("mouseup", t, !1), window.addEventListener("keydown", p, !1), window.addEventListener("keyup", q, !1)
}, THREE.CubeGeometry = function(a, b, c, d, e, f, g, h) {
    function u(a, b, c, g, h, j, k, l) {
        var m, n, o, p = d || 1,
            q = e || 1,
            r = h / 2,
            s = j / 2,
            t = i.vertices.length;
        if (a === "x" && b === "y" || a === "y" && b === "x") m = "z";
        else if (a === "x" && b === "z" || a === "z" && b === "x") m = "y", q = f || 1;
        else if (a === "z" && b === "y" || a === "y" && b === "z") m = "x", p = f || 1;
        var u = p + 1,
            v = q + 1,
            w = h / p,
            x = j / q,
            y = new THREE.Vector3;
        y[m] = k > 0 ? 1 : -1;
        for (o = 0; o < v; o++) for (n = 0; n < u; n++) {
            var z = new THREE.Vector3;
            z[a] = (n * w - r) * c, z[b] = (o * x - s) * g, z[m] = k, i.vertices.push(z)
        }
        for (o = 0; o < q; o++) for (n = 0; n < p; n++) {
            var A = n + u * o,
                B = n + u * (o + 1),
                C = n + 1 + u * (o + 1),
                D = n + 1 + u * o,
                E = new THREE.Face4(A + t, B + t, C + t, D + t);
            E.normal.copy(y), E.vertexNormals.push(y.clone(), y.clone(), y.clone(), y.clone()), E.materialIndex = l, i.faces.push(E), i.faceVertexUvs[0].push([new THREE.UV(n / p, o / q), new THREE.UV(n / p, (o + 1) / q), new THREE.UV((n + 1) / p, (o + 1) / q), new THREE.UV((n + 1) / p, o / q)])
        }
    }
    THREE.Geometry.call(this);
    var i = this,
        j = a / 2,
        k = b / 2,
        l = c / 2,
        m, n, o, p, q, r;
    if (g !== undefined) {
        if (g instanceof Array) this.materials = g;
        else {
            this.materials = [];
            for (var s = 0; s < 6; s++) this.materials.push(g)
        }
        m = 0, p = 1, n = 2, q = 3, o = 4, r = 5
    }
    else this.materials = [];
    this.sides = {
        px: !0,
        nx: !0,
        py: !0,
        ny: !0,
        pz: !0,
        nz: !0
    };
    if (h != undefined) for (var t in h) this.sides[t] !== undefined && (this.sides[t] = h[t]);
    this.sides.px && u("z", "y", -1, -1, c, b, j, m), this.sides.nx && u("z", "y", 1, -1, c, b, -j, p), this.sides.py && u("x", "z", 1, 1, a, c, k, n), this.sides.ny && u("x", "z", 1, -1, a, c, -k, q), this.sides.pz && u("x", "y", 1, -1, a, b, l, o), this.sides.nz && u("x", "y", -1, -1, a, b, -l, r), this.computeCentroids(), this.mergeVertices()
}, THREE.CubeGeometry.prototype = new THREE.Geometry, THREE.CubeGeometry.prototype.constructor = THREE.CubeGeometry, THREE.CylinderGeometry = function(a, b, c, d, e, f) {
    THREE.Geometry.call(this), a = a !== undefined ? a : 20, b = b !== undefined ? b : 20, c = c !== undefined ? c : 100;
    var g = c / 2,
        h = d || 8,
        i = e || 1,
        j, k, l = [],
        m = [];
    for (k = 0; k <= i; k++) {
        var n = [],
            o = [],
            p = k / i,
            q = p * (b - a) + a;
        for (j = 0; j <= h; j++) {
            var r = j / h,
                s = new THREE.Vector3;
            s.x = q * Math.sin(r * Math.PI * 2), s.y = -p * c + g, s.z = q * Math.cos(r * Math.PI * 2), this.vertices.push(s), n.push(this.vertices.length - 1), o.push(new THREE.UV(r, p))
        }
        l.push(n), m.push(o)
    }
    var t = (b - a) / c,
        u, v;
    for (j = 0; j < h; j++) {
        a !== 0 ? (u = this.vertices[l[0][j]].clone(), v = this.vertices[l[0][j + 1]].clone()) : (u = this.vertices[l[1][j]].clone(), v = this.vertices[l[1][j + 1]].clone()), u.setY(Math.sqrt(u.x * u.x + u.z * u.z) * t).normalize(), v.setY(Math.sqrt(v.x * v.x + v.z * v.z) * t).normalize();
        for (k = 0; k < i; k++) {
            var w = l[k][j],
                x = l[k + 1][j],
                y = l[k + 1][j + 1],
                z = l[k][j + 1],
                A = u.clone(),
                B = u.clone(),
                C = v.clone(),
                D = v.clone(),
                E = m[k][j].clone(),
                F = m[k + 1][j].clone(),
                G = m[k + 1][j + 1].clone(),
                H = m[k][j + 1].clone();
            this.faces.push(new THREE.Face4(w, x, y, z, [A, B, C, D])), this.faceVertexUvs[0].push([E, F, G, H])
        }
    }
    if (!f && a > 0) {
        this.vertices.push(new THREE.Vector3(0, g, 0));
        for (j = 0; j < h; j++) {
            var w = l[0][j],
                x = l[0][j + 1],
                y = this.vertices.length - 1,
                A = new THREE.Vector3(0, 1, 0),
                B = new THREE.Vector3(0, 1, 0),
                C = new THREE.Vector3(0, 1, 0),
                E = m[0][j].clone(),
                F = m[0][j + 1].clone(),
                G = new THREE.UV(F.u, 0);
            this.faces.push(new THREE.Face3(w, x, y, [A, B, C])), this.faceVertexUvs[0].push([E, F, G])
        }
    }
    if (!f && b > 0) {
        this.vertices.push(new THREE.Vector3(0, -g, 0));
        for (j = 0; j < h; j++) {
            var w = l[k][j + 1],
                x = l[k][j],
                y = this.vertices.length - 1,
                A = new THREE.Vector3(0, -1, 0),
                B = new THREE.Vector3(0, -1, 0),
                C = new THREE.Vector3(0, -1, 0),
                E = m[k][j + 1].clone(),
                F = m[k][j].clone(),
                G = new THREE.UV(F.u, 1);
            this.faces.push(new THREE.Face3(w, x, y, [A, B, C])), this.faceVertexUvs[0].push([E, F, G])
        }
    }
    this.computeCentroids(), this.computeFaceNormals()
}, THREE.CylinderGeometry.prototype = new THREE.Geometry, THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry, THREE.ExtrudeGeometry = function(a, b) {
    if (typeof a == "undefined") {
        a = [];
        return
    }
    THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals()
}, THREE.ExtrudeGeometry.prototype = new THREE.Geometry, THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry, THREE.ExtrudeGeometry.prototype.addShapeList = function(a, b) {
    var c = a.length;
    for (var d = 0; d < c; d++) {
        var e = a[d];
        this.addShape(e, b)
    }
}, THREE.ExtrudeGeometry.prototype.addShape = function(a, b) {
    function G(a, b, c) {
        return b || console.log("die"), b.clone().multiplyScalar(c).addSelf(a)
    }
    function S(a, b, c) {
        return U(a, b, c)
    }
    function T(a, b, c) {
        var d = Math.atan2(b.y - a.y, b.x - a.x),
            e = Math.atan2(c.y - a.y, c.x - a.x);
        d > e && (e += Math.PI * 2);
        var f = (d + e) / 2,
            g = -Math.cos(f),
            h = -Math.sin(f),
            i = new THREE.Vector2(g, h);
        return i
    }
    function U(a, b, c) {
        var d = THREE.ExtrudeGeometry.__v1,
            e = THREE.ExtrudeGeometry.__v2,
            f = THREE.ExtrudeGeometry.__v3,
            g = THREE.ExtrudeGeometry.__v4,
            h = THREE.ExtrudeGeometry.__v5,
            i = THREE.ExtrudeGeometry.__v6,
            j, k, l, m, n, o;
        return d.set(a.x - b.x, a.y - b.y), e.set(a.x - c.x, a.y - c.y), j = d.normalize(), k = e.normalize(), f.set(-j.y, j.x), g.set(k.y, -k.x), h.copy(a).addSelf(f), i.copy(a).addSelf(g), h.equals(i) ? g.clone() : (h.copy(b).addSelf(f), i.copy(c).addSelf(g), l = j.dot(g), m = i.subSelf(h).dot(g), l === 0 && (console.log("Either infinite or no solutions!"), m === 0 ? console.log("Its finite solutions.") : console.log("Too bad, no solutions.")), n = m / l, n < 0 ? T(a, b, c) : (o = j.multiplyScalar(n).addSelf(h), o.subSelf(a).clone()))
    }
    function gb() {
        if (g) {
            var a = 0,
                b = M * a;
            for (W = 0; W < O; W++) N = E[W], kb(N[2] + b, N[1] + b, N[0] + b, !0);
            a = i + f * 2, b = M * a;
            for (W = 0; W < O; W++) N = E[W], kb(N[0] + b, N[1] + b, N[2] + b, !1)
        }
        else {
            for (W = 0; W < O; W++) N = E[W], kb(N[2], N[1], N[0], !0);
            for (W = 0; W < O; W++) N = E[W], kb(N[0] + M * i, N[1] + M * i, N[2] + M * i, !1)
        }
    }
    function hb() {
        var a = 0;
        ib(F, a), a += F.length;
        for (v = 0, w = C.length; v < w; v++) u = C[v], ib(u, a), a += u.length
    }
    function ib(a, b) {
        var c, d;
        W = a.length;
        while (--W >= 0) {
            c = W, d = W - 1, d < 0 && (d = a.length - 1);
            var e = 0,
                g = i + f * 2;
            for (e = 0; e < g; e++) {
                var h = M * e,
                    j = M * (e + 1),
                    k = b + c + h,
                    l = b + d + h,
                    m = b + d + j,
                    n = b + c + j;
                lb(k, l, m, n, a, e, g)
            }
        }
    }
    function jb(a, b, c) {
        x.vertices.push(new THREE.Vector3(a, b, c))
    }
    function kb(c, d, e, f) {
        c += z, d += z, e += z, x.faces.push(new THREE.Face3(c, d, e, null, null, n));
        var g = f ? fb.generateBottomUV(x, a, b, c, d, e) : fb.generateTopUV(x, a, b, c, d, e);
        x.faceVertexUvs[0].push(g)
    }
    function lb(c, d, e, f, g, h, i) {
        c += z, d += z, e += z, f += z, x.faces.push(new THREE.Face4(c, d, e, f, null, null, o));
        var j = fb.generateSideWallUV(x, a, g, b, c, d, e, f, h, i);
        x.faceVertexUvs[0].push(j)
    }
    var c = b.amount !== undefined ? b.amount : 100,
        d = b.bevelThickness !== undefined ? b.bevelThickness : 6,
        e = b.bevelSize !== undefined ? b.bevelSize : d - 2,
        f = b.bevelSegments !== undefined ? b.bevelSegments : 3,
        g = b.bevelEnabled !== undefined ? b.bevelEnabled : !0,
        h = b.curveSegments !== undefined ? b.curveSegments : 12,
        i = b.steps !== undefined ? b.steps : 1,
        j = b.bendPath,
        k = b.extrudePath,
        l, m = !1,
        n = b.material,
        o = b.extrudeMaterial,
        p = this.shapebb,
        q, r, s, t;
    k && (l = k.getSpacedPoints(i), m = !0, g = !1, q = new THREE.TubeGeometry.FrenetFrames(k, i, !1), r = new THREE.Vector3, s = new THREE.Vector3, t = new THREE.Vector3), g || (f = 0, d = 0, e = 0);
    var u, v, w, x = this,
        y = [],
        z = this.vertices.length;
    j && a.addWrapPath(j);
    var A = a.extractPoints(),
        B = A.shape,
        C = A.holes,
        D = !THREE.Shape.Utils.isClockWise(B);
    if (D) {
        B = B.reverse();
        for (v = 0, w = C.length; v < w; v++) u = C[v], THREE.Shape.Utils.isClockWise(u) && (C[v] = u.reverse());
        D = !1
    }
    var E = THREE.Shape.Utils.triangulateShape(B, C),
        F = B;
    for (v = 0, w = C.length; v < w; v++) u = C[v], B = B.concat(u);
    var H, I, J, K, L, M = B.length,
        N, O = E.length,
        Q = F.length,
        R = 180 / Math.PI,
        V = [];
    for (var W = 0, X = F.length, Y = X - 1, Z = W + 1; W < X; W++, Y++, Z++) {
        Y === X && (Y = 0), Z === X && (Z = 0);
        var $ = F[W],
            _ = F[Y],
            ab = F[Z];
        V[W] = S(F[W], F[Y], F[Z])
    }
    var bb = [],
        cb, db = V.concat();
    for (v = 0, w = C.length; v < w; v++) {
        u = C[v], cb = [];
        for (W = 0, X = u.length, Y = X - 1, Z = W + 1; W < X; W++, Y++, Z++) Y === X && (Y = 0), Z === X && (Z = 0), cb[W] = S(u[W], u[Y], u[Z]);
        bb.push(cb), db = db.concat(cb)
    }
    for (H = 0; H < f; H++) {
        J = H / f, K = d * (1 - J), I = e * Math.sin(J * Math.PI / 2);
        for (W = 0, X = F.length; W < X; W++) L = G(F[W], V[W], I), jb(L.x, L.y, -K);
        for (v = 0, w = C.length; v < w; v++) {
            u = C[v], cb = bb[v];
            for (W = 0, X = u.length; W < X; W++) L = G(u[W], cb[W], I), jb(L.x, L.y, -K)
        }
    }
    I = e;
    for (W = 0; W < M; W++) L = g ? G(B[W], db[W], I) : B[W], m ? (s.copy(q.normals[0]).multiplyScalar(L.x), r.copy(q.binormals[0]).multiplyScalar(L.y), t.copy(l[0]).addSelf(s).addSelf(r), jb(t.x, t.y, t.z)) : jb(L.x, L.y, 0);
    var eb;
    for (eb = 1; eb <= i; eb++) for (W = 0; W < M; W++) L = g ? G(B[W], db[W], I) : B[W], m ? (s.copy(q.normals[eb]).multiplyScalar(L.x), r.copy(q.binormals[eb]).multiplyScalar(L.y), t.copy(l[eb]).addSelf(s).addSelf(r), jb(t.x, t.y, t.z)) : jb(L.x, L.y, c / i * eb);
    for (H = f - 1; H >= 0; H--) {
        J = H / f, K = d * (1 - J), I = e * Math.sin(J * Math.PI / 2);
        for (W = 0, X = F.length; W < X; W++) L = G(F[W], V[W], I), jb(L.x, L.y, c + K);
        for (v = 0, w = C.length; v < w; v++) {
            u = C[v], cb = bb[v];
            for (W = 0, X = u.length; W < X; W++) L = G(u[W], cb[W], I), m ? jb(L.x, L.y + l[i - 1].y, l[i - 1].x + K) : jb(L.x, L.y, c + K)
        }
    }
    var fb = THREE.ExtrudeGeometry.WorldUVGenerator;
    gb(), hb()
}, THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function(a, b, c, d, e, f) {
        var g = a.vertices[d].x,
            h = a.vertices[d].y,
            i = a.vertices[e].x,
            j = a.vertices[e].y,
            k = a.vertices[f].x,
            l = a.vertices[f].y;
        return [new THREE.UV(g, 1 - h), new THREE.UV(i, 1 - j), new THREE.UV(k, 1 - l)]
    },
    generateBottomUV: function(a, b, c, d, e, f) {
        return this.generateTopUV(a, b, c, d, e, f)
    },
    generateSideWallUV: function(a, b, c, d, e, f, g, h, i, j) {
        var k = a.vertices[e].x,
            l = a.vertices[e].y,
            m = a.vertices[e].z,
            n = a.vertices[f].x,
            o = a.vertices[f].y,
            p = a.vertices[f].z,
            q = a.vertices[g].x,
            r = a.vertices[g].y,
            s = a.vertices[g].z,
            t = a.vertices[h].x,
            u = a.vertices[h].y,
            v = a.vertices[h].z;
        return Math.abs(l - o) < .01 ? [new THREE.UV(k, m), new THREE.UV(n, p), new THREE.UV(q, s), new THREE.UV(t, v)] : [new THREE.UV(l, m), new THREE.UV(o, p), new THREE.UV(r, s), new THREE.UV(u, v)]
    }
}, THREE.ExtrudeGeometry.__v1 = new THREE.Vector2, THREE.ExtrudeGeometry.__v2 = new THREE.Vector2, THREE.ExtrudeGeometry.__v3 = new THREE.Vector2, THREE.ExtrudeGeometry.__v4 = new THREE.Vector2, THREE.ExtrudeGeometry.__v5 = new THREE.Vector2, THREE.ExtrudeGeometry.__v6 = new THREE.Vector2, THREE.LatheGeometry = function(a, b, c) {
    THREE.Geometry.call(this);
    var d = b || 12,
        e = c || 2 * Math.PI,
        f = [],
        g = (new THREE.Matrix4).makeRotationZ(e / d);
    for (var h = 0; h < a.length; h++) f[h] = a[h].clone(), this.vertices.push(f[h]);
    var i, j = d + 1;
    for (i = 0; i < j; i++) for (var h = 0; h < f.length; h++) f[h] = g.multiplyVector3(f[h].clone()), this.vertices.push(f[h]);
    for (i = 0; i < d; i++) for (var k = 0, l = a.length; k < l - 1; k++) {
        var m = i * l + k,
            n = (i + 1) % j * l + k,
            o = (i + 1) % j * l + (k + 1) % l,
            p = i * l + (k + 1) % l;
        this.faces.push(new THREE.Face4(m, n, o, p)), this.faceVertexUvs[0].push([new THREE.UV(1 - i / d, k / l), new THREE.UV(1 - (i + 1) / d, k / l), new THREE.UV(1 - (i + 1) / d, (k + 1) / l), new THREE.UV(1 - i / d, (k + 1) / l)])
    }
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.LatheGeometry.prototype = new THREE.Geometry, THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry, THREE.PlaneGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    var e, f, g = a / 2,
        h = b / 2,
        i = c || 1,
        j = d || 1,
        k = i + 1,
        l = j + 1,
        m = a / i,
        n = b / j,
        o = new THREE.Vector3(0, 1, 0);
    for (f = 0; f < l; f++) for (e = 0; e < k; e++) {
        var p = e * m - g,
            q = f * n - h;
        this.vertices.push(new THREE.Vector3(p, 0, q))
    }
    for (f = 0; f < j; f++) for (e = 0; e < i; e++) {
        var r = e + k * f,
            s = e + k * (f + 1),
            t = e + 1 + k * (f + 1),
            u = e + 1 + k * f,
            v = new THREE.Face4(r, s, t, u);
        v.normal.copy(o), v.vertexNormals.push(o.clone(), o.clone(), o.clone(), o.clone()), this.faces.push(v), this.faceVertexUvs[0].push([new THREE.UV(e / i, f / j), new THREE.UV(e / i, (f + 1) / j), new THREE.UV((e + 1) / i, (f + 1) / j), new THREE.UV((e + 1) / i, f / j)])
    }
    this.computeCentroids()
}, THREE.PlaneGeometry.prototype = new THREE.Geometry, THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry, THREE.SphereGeometry = function(a, b, c, d, e, f, g) {
    THREE.Geometry.call(this), a = a || 50, d = d !== undefined ? d : 0, e = e !== undefined ? e : Math.PI * 2, f = f !== undefined ? f : 0, g = g !== undefined ? g : Math.PI;
    var h = Math.max(3, Math.floor(b) || 8),
        i = Math.max(2, Math.floor(c) || 6),
        j, k, l = [],
        m = [];
    for (k = 0; k <= i; k++) {
        var n = [],
            o = [];
        for (j = 0; j <= h; j++) {
            var p = j / h,
                q = k / i,
                r = new THREE.Vector3;
            r.x = -a * Math.cos(d + p * e) * Math.sin(f + q * g), r.y = a * Math.cos(f + q * g), r.z = a * Math.sin(d + p * e) * Math.sin(f + q * g), this.vertices.push(r), n.push(this.vertices.length - 1), o.push(new THREE.UV(p, q))
        }
        l.push(n), m.push(o)
    }
    for (k = 0; k < i; k++) for (j = 0; j < h; j++) {
        var s = l[k][j + 1],
            t = l[k][j],
            u = l[k + 1][j],
            v = l[k + 1][j + 1],
            w = this.vertices[s].clone().normalize(),
            x = this.vertices[t].clone().normalize(),
            y = this.vertices[u].clone().normalize(),
            z = this.vertices[v].clone().normalize(),
            A = m[k][j + 1].clone(),
            B = m[k][j].clone(),
            C = m[k + 1][j].clone(),
            D = m[k + 1][j + 1].clone();
        Math.abs(this.vertices[s].y) == a ? (this.faces.push(new THREE.Face3(s, u, v, [w, y, z])), this.faceVertexUvs[0].push([A, C, D])) : Math.abs(this.vertices[u].y) == a ? (this.faces.push(new THREE.Face3(s, t, u, [w, x, y])), this.faceVertexUvs[0].push([A, B, C])) : (this.faces.push(new THREE.Face4(s, t, u, v, [w, x, y, z])), this.faceVertexUvs[0].push([A, B, C, D]))
    }
    this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = {
        radius: a
    }
}, THREE.SphereGeometry.prototype = new THREE.Geometry, THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry, THREE.TextGeometry = function(a, b) {
    var c = new THREE.TextPath(a, b),
        d = c.toShapes();
    b.amount = b.height !== undefined ? b.height : 50, b.bevelThickness === undefined && (b.bevelThickness = 10), b.bevelSize === undefined && (b.bevelSize = 8), b.bevelEnabled === undefined && (b.bevelEnabled = !1);
    if (b.bend) {
        var e = d[d.length - 1].getBoundingBox(),
            f = e.maxX;
        b.bendPath = new THREE.QuadraticBezierCurve(new THREE.Vector2(0, 0), new THREE.Vector2(f / 2, 120), new THREE.Vector2(f, 0))
    }
    THREE.ExtrudeGeometry.call(this, d, b)
}, THREE.TextGeometry.prototype = new THREE.ExtrudeGeometry, THREE.TextGeometry.prototype.constructor = THREE.TextGeometry, THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function() {
        return this.faces[this.face][this.weight][this.style]
    },
    loadFace: function(a) {
        var b = a.familyName.toLowerCase(),
            c = this;
        c.faces[b] = c.faces[b] || {}, c.faces[b][a.cssFontWeight] = c.faces[b][a.cssFontWeight] || {}, c.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        var d = c.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        return a
    },
    drawText: function(a) {
        var b = [],
            c = [],
            d, f = this.getFace(),
            g = this.size / f.resolution,
            h = 0,
            i = String(a).split(""),
            j = i.length,
            k = [];
        for (d = 0; d < j; d++) {
            var l = new THREE.Path,
                m = this.extractGlyphPoints(i[d], f, g, h, l);
            h += m.offset, k.push(m.path)
        }
        var n = h / 2;
        return {
            paths: k,
            offset: n
        }
    },
    extractGlyphPoints: function(a, b, c, d, e) {
        var f = [],
            g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z = b.glyphs[a] || b.glyphs["?"];
        if (!z) return;
        if (z.o) {
            j = z._cachedOutline || (z._cachedOutline = z.o.split(" ")), l = j.length, m = c, n = c;
            for (g = 0; g < l;) {
                k = j[g++];
                switch (k) {
                case "m":
                    o = j[g++] * m + d, p = j[g++] * n, f.push(new THREE.Vector2(o, p)), e.moveTo(o, p);
                    break;
                case "l":
                    o = j[g++] * m + d, p = j[g++] * n, f.push(new THREE.Vector2(o, p)), e.lineTo(o, p);
                    break;
                case "q":
                    q = j[g++] * m + d, r = j[g++] * n, u = j[g++] * m + d, v = j[g++] * n, e.quadraticCurveTo(u, v, q, r), y = f[f.length - 1];
                    if (y) {
                        s = y.x, t = y.y;
                        for (h = 1, i = this.divisions; h <= i; h++) {
                            var A = h / i,
                                B = THREE.Shape.Utils.b2(A, s, u, q),
                                C = THREE.Shape.Utils.b2(A, t, v, r);
                            f.push(new THREE.Vector2(B, C))
                        }
                    }
                    break;
                case "b":
                    q = j[g++] * m + d, r = j[g++] * n, u = j[g++] * m + d, v = j[g++] * -n, w = j[g++] * m + d, x = j[g++] * -n, e.bezierCurveTo(q, r, u, v, w, x), y = f[f.length - 1];
                    if (y) {
                        s = y.x, t = y.y;
                        for (h = 1, i = this.divisions; h <= i; h++) {
                            var A = h / i,
                                B = THREE.Shape.Utils.b3(A, s, u, w, q),
                                C = THREE.Shape.Utils.b3(A, t, v, x, r);
                            f.push(new THREE.Vector2(B, C))
                        }
                    }
                }
            }
        }
        return {
            offset: z.ha * c,
            points: f,
            path: e
        }
    }
}, function(a) {
    var b = 1e-10,
        c = function(a, b) {
            var c = a.length;
            if (c < 3) return null;
            var e = [],
                g = [],
                h = [],
                i, j, k;
            if (d(a) > 0) for (j = 0; j < c; j++) g[j] = j;
            else for (j = 0; j < c; j++) g[j] = c - 1 - j;
            var l = c,
                m = 2 * l;
            for (j = l - 1; l > 2;) {
                if (m-- <= 0) return console.log("Warning, unable to triangulate polygon!"), b ? h : e;
                i = j, l <= i && (i = 0), j = i + 1, l <= j && (j = 0), k = j + 1, l <= k && (k = 0);
                if (f(a, i, j, k, l, g)) {
                    var n, o, p, q, r;
                    n = g[i], o = g[j], p = g[k], e.push([a[n], a[o], a[p]]), h.push([g[i], g[j], g[k]]);
                    for (q = j, r = j + 1; r < l; q++, r++) g[q] = g[r];
                    l--, m = 2 * l
                }
            }
            return b ? h : e
        },
        d = function(a) {
            var b = a.length,
                c = 0;
            for (var d = b - 1, e = 0; e < b; d = e++) c += a[d].x * a[e].y - a[e].x * a[d].y;
            return c * .5
        },
        e = function(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
            return i = e - c, j = f - d, k = a - e, l = b - f, m = c - a, n = d - b, o = g - a, p = h - b, q = g - c, r = h - d, s = g - e, t = h - f, w = i * r - j * q, u = m * p - n * o, v = k * t - l * s, w >= 0 && v >= 0 && u >= 0
        },
        f = function(a, c, d, f, g, h) {
            var i, j, k, l, m, n, o, p, q;
            j = a[h[c]].x, k = a[h[c]].y, l = a[h[d]].x, m = a[h[d]].y, n = a[h[f]].x, o = a[h[f]].y;
            if (b > (l - j) * (o - k) - (m - k) * (n - j)) return !1;
            for (i = 0; i < g; i++) {
                if (i == c || i == d || i == f) continue;
                p = a[h[i]].x, q = a[h[i]].y;
                if (e(j, k, l, m, n, o, p, q)) return !1
            }
            return !0
        };
    return a.Triangulate = c, a.Triangulate.area = d, a
}(THREE.FontUtils), self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
}, THREE.TorusGeometry = function(a, b, c, d, e) {
    THREE.Geometry.call(this);
    var f = this;
    this.radius = a || 100, this.tube = b || 40, this.segmentsR = c || 8, this.segmentsT = d || 6, this.arc = e || Math.PI * 2;
    var g = new THREE.Vector3,
        h = [],
        i = [];
    for (var j = 0; j <= this.segmentsR; j++) for (var k = 0; k <= this.segmentsT; k++) {
        var l = k / this.segmentsT * this.arc,
            m = j / this.segmentsR * Math.PI * 2;
        g.x = this.radius * Math.cos(l), g.y = this.radius * Math.sin(l);
        var n = new THREE.Vector3;
        n.x = (this.radius + this.tube * Math.cos(m)) * Math.cos(l), n.y = (this.radius + this.tube * Math.cos(m)) * Math.sin(l), n.z = this.tube * Math.sin(m), this.vertices.push(n), h.push(new THREE.UV(k / this.segmentsT, 1 - j / this.segmentsR)), i.push(n.clone().subSelf(g).normalize())
    }
    for (var j = 1; j <= this.segmentsR; j++) for (var k = 1; k <= this.segmentsT; k++) {
        var o = (this.segmentsT + 1) * j + k - 1,
            p = (this.segmentsT + 1) * (j - 1) + k - 1,
            q = (this.segmentsT + 1) * (j - 1) + k,
            r = (this.segmentsT + 1) * j + k,
            s = new THREE.Face4(o, p, q, r, [i[o], i[p], i[q], i[r]]);
        s.normal.addSelf(i[o]), s.normal.addSelf(i[p]), s.normal.addSelf(i[q]), s.normal.addSelf(i[r]), s.normal.normalize(), this.faces.push(s), this.faceVertexUvs[0].push([h[o].clone(), h[p].clone(), h[q].clone(), h[r].clone()])
    }
    this.computeCentroids()
}, THREE.TorusGeometry.prototype = new THREE.Geometry, THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry, THREE.TorusKnotGeometry = function(a, b, c, d, e, f, g) {
    function D(a, b, c) {
        return h.vertices.push(new THREE.Vector3(a, b, c)) - 1
    }
    function E(a, b, c, d, e, f) {
        var g = Math.cos(a),
            h = Math.cos(b),
            i = Math.sin(a),
            j = c / d * a,
            k = Math.cos(j),
            l = e * (2 + k) * .5 * g,
            m = e * (2 + k) * i * .5,
            n = f * e * Math.sin(j) * .5;
        return new THREE.Vector3(l, m, n)
    }
    THREE.Geometry.call(this);
    var h = this;
    this.radius = a || 200, this.tube = b || 40, this.segmentsR = c || 64, this.segmentsT = d || 8, this.p = e || 2, this.q = f || 3, this.heightScale = g || 1, this.grid = new Array(this.segmentsR);
    var i = new THREE.Vector3,
        j = new THREE.Vector3,
        k = new THREE.Vector3;
    for (var l = 0; l < this.segmentsR; ++l) {
        this.grid[l] = new Array(this.segmentsT);
        for (var m = 0; m < this.segmentsT; ++m) {
            var n = l / this.segmentsR * 2 * this.p * Math.PI,
                o = m / this.segmentsT * 2 * Math.PI,
                p = E(n, o, this.q, this.p, this.radius, this.heightScale),
                q = E(n + .01, o, this.q, this.p, this.radius, this.heightScale),
                r, s;
            i.sub(q, p), j.add(q, p), k.cross(i, j), j.cross(k, i), k.normalize(), j.normalize(), r = -this.tube * Math.cos(o), s = this.tube * Math.sin(o), p.x += r * j.x + s * k.x, p.y += r * j.y + s * k.y, p.z += r * j.z + s * k.z, this.grid[l][m] = D(p.x, p.y, p.z)
        }
    }
    for (var l = 0; l < this.segmentsR; ++l) for (var m = 0; m < this.segmentsT; ++m) {
        var t = (l + 1) % this.segmentsR,
            u = (m + 1) % this.segmentsT,
            v = this.grid[l][m],
            w = this.grid[t][m],
            x = this.grid[t][u],
            y = this.grid[l][u],
            z = new THREE.UV(l / this.segmentsR, m / this.segmentsT),
            A = new THREE.UV((l + 1) / this.segmentsR, m / this.segmentsT),
            B = new THREE.UV((l + 1) / this.segmentsR, (m + 1) / this.segmentsT),
            C = new THREE.UV(l / this.segmentsR, (m + 1) / this.segmentsT);
        this.faces.push(new THREE.Face4(v, w, x, y)), this.faceVertexUvs[0].push([z, A, B, C])
    }
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.TorusKnotGeometry.prototype = new THREE.Geometry, THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry, THREE.TubeGeometry = function(a, b, c, d, e, f) {
    function N(a, b, c) {
        return g.vertices.push(new THREE.Vector3(a, b, c)) - 1
    }
    THREE.Geometry.call(this), this.path = a, this.segments = b || 64, this.radius = c || 1, this.segmentsRadius = d || 8, this.closed = e || !1, f && (this.debug = new THREE.Object3D), this.grid = [];
    var g = this,
        h, i, j, k = this.segments + 1,
        r, s, t, u, v, w = new THREE.Vector3,
        x, y, z, A, B, C, D, E, F, G, H, I, J = new THREE.TubeGeometry.FrenetFrames(a, b, e),
        K = J.tangents,
        L = J.normals,
        M = J.binormals;
    this.tangents = K, this.normals = L, this.binormals = M;
    for (x = 0; x < k; x++) {
        this.grid[x] = [], r = x / (k - 1), v = a.getPointAt(r), h = K[x], i = L[x], j = M[x], this.debug && (this.debug.add(new THREE.ArrowHelper(h, v, c, 255)), this.debug.add(new THREE.ArrowHelper(i, v, c, 16711680)), this.debug.add(new THREE.ArrowHelper(j, v, c, 65280)));
        for (y = 0; y < this.segmentsRadius; y++) s = y / this.segmentsRadius * 2 * Math.PI, t = -this.radius * Math.cos(s), u = this.radius * Math.sin(s), w.copy(v), w.x += t * i.x + u * j.x, w.y += t * i.y + u * j.y, w.z += t * i.z + u * j.z, this.grid[x][y] = N(w.x, w.y, w.z)
    }
    for (x = 0; x < this.segments; x++) for (y = 0; y < this.segmentsRadius; y++) z = e ? (x + 1) % this.segments : x + 1, A = (y + 1) % this.segmentsRadius, B = this.grid[x][y], C = this.grid[z][y], D = this.grid[z][A], E = this.grid[x][A], F = new THREE.UV(x / this.segments, y / this.segmentsRadius), G = new THREE.UV((x + 1) / this.segments, y / this.segmentsRadius), H = new THREE.UV((x + 1) / this.segments, (y + 1) / this.segmentsRadius), I = new THREE.UV(x / this.segments, (y + 1) / this.segmentsRadius), this.faces.push(new THREE.Face4(B, C, D, E)), this.faceVertexUvs[0].push([F, G, H, I]);
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.TubeGeometry.prototype = new THREE.Geometry, THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry, THREE.TubeGeometry.FrenetFrames = function(a, b, c) {
    function v(a) {
        h[0] = new THREE.Vector3, i[0] = new THREE.Vector3, a === undefined && (a = new THREE.Vector3(0, 0, 1)), h[0].cross(a, g[0]).normalize(), i[0].cross(g[0], h[0]).normalize()
    }
    function w() {
        var b = a.getTangentAt(n);
        h[0] = (new THREE.Vector3).sub(b, g[0]).normalize(), i[0] = (new THREE.Vector3).cross(g[0], h[0]), h[0].cross(i[0], g[0]).normalize(), i[0].cross(g[0], h[0]).normalize()
    }
    function x() {
        h[0] = new THREE.Vector3, i[0] = new THREE.Vector3, o = Number.MAX_VALUE, p = Math.abs(g[0].x), q = Math.abs(g[0].y), r = Math.abs(g[0].z), p <= o && (o = p, e.set(1, 0, 0)), q <= o && (o = q, e.set(0, 1, 0)), r <= o && e.set(0, 0, 1), j.cross(g[0], e).normalize(), h[0].cross(g[0], j), i[0].cross(g[0], h[0])
    }
    var d = new THREE.Vector3,
        e = new THREE.Vector3,
        f = new THREE.Vector3,
        g = [],
        h = [],
        i = [],
        j = new THREE.Vector3,
        k = new THREE.Matrix4,
        l = b + 1,
        m, n = 1e-4,
        o, p, q, r, s, t;
    this.tangents = g, this.normals = h, this.binormals = i;
    for (s = 0; s < l; s++) t = s / (l - 1), g[s] = a.getTangentAt(t), g[s].normalize();
    x();
    for (s = 1; s < l; s++) h[s] = h[s - 1].clone(), i[s] = i[s - 1].clone(), j.cross(g[s - 1], g[s]), j.length() > n && (j.normalize(), m = Math.acos(g[s - 1].dot(g[s])), k.makeRotationAxis(j, m).multiplyVector3(h[s])), i[s].cross(g[s], h[s]);
    if (c) {
        m = Math.acos(h[0].dot(h[l - 1])), m /= l - 1, g[0].dot(j.cross(h[0], h[l - 1])) > 0 && (m = -m);
        for (s = 1; s < l; s++) k.makeRotationAxis(g[s], m * s).multiplyVector3(h[s]), i[s].cross(g[s], h[s])
    }
}, THREE.PolyhedronGeometry = function(a, b, c, d) {
    function j(a) {
        var b = a.normalize().clone();
        b.index = e.vertices.push(b) - 1;
        var c = m(a) / 2 / Math.PI + .5,
            d = n(a) / Math.PI + .5;
        return b.uv = new THREE.UV(c, d), b
    }
    function k(a, b, c, d) {
        if (d < 1) {
            var f = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]);
            f.centroid.addSelf(a).addSelf(b).addSelf(c).divideScalar(3), f.normal = f.centroid.clone().normalize(), e.faces.push(f);
            var g = m(f.centroid);
            e.faceVertexUvs[0].push([o(a.uv, a, g), o(b.uv, b, g), o(c.uv, c, g)])
        }
        else d -= 1, k(a, l(a, b), l(a, c), d), k(l(a, b), b, l(b, c), d), k(l(a, c), l(b, c), c, d), k(l(a, b), l(b, c), l(a, c), d)
    }
    function l(a, b) {
        h[a.index] || (h[a.index] = []), h[b.index] || (h[b.index] = []);
        var c = h[a.index][b.index];
        return c === undefined && (h[a.index][b.index] = h[b.index][a.index] = c = j((new THREE.Vector3).add(a, b).divideScalar(2))), c
    }
    function m(a) {
        return Math.atan2(a.z, -a.x)
    }
    function n(a) {
        return Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z))
    }
    function o(a, b, c) {
        return c < 0 && a.u === 1 && (a = new THREE.UV(a.u - 1, a.v)), b.x === 0 && b.z === 0 && (a = new THREE.UV(c / 2 / Math.PI + .5, a.v)), a
    }
    THREE.Geometry.call(this), c = c || 1, d = d || 0;
    var e = this;
    for (var f = 0, g = a.length; f < g; f++) j(new THREE.Vector3(a[f][0], a[f][1], a[f][2]));
    var h = [],
        i = this.vertices;
    for (var f = 0, g = b.length; f < g; f++) k(i[b[f][0]], i[b[f][1]], i[b[f][2]], d);
    this.mergeVertices();
    for (var f = 0, g = this.vertices.length; f < g; f++) this.vertices[f].multiplyScalar(c);
    this.computeCentroids(), this.boundingSphere = {
        radius: c
    }
}, THREE.PolyhedronGeometry.prototype = new THREE.Geometry, THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry, THREE.IcosahedronGeometry = function(a, b) {
    var c = (1 + Math.sqrt(5)) / 2,
        d = [
            [-1, c, 0],
            [1, c, 0],
            [-1, -c, 0],
            [1, -c, 0],
            [0, -1, c],
            [0, 1, c],
            [0, -1, -c],
            [0, 1, -c],
            [c, 0, -1],
            [c, 0, 1],
            [-c, 0, -1],
            [-c, 0, 1]
        ],
        e = [
            [0, 11, 5],
            [0, 5, 1],
            [0, 1, 7],
            [0, 7, 10],
            [0, 10, 11],
            [1, 5, 9],
            [5, 11, 4],
            [11, 10, 2],
            [10, 7, 6],
            [7, 1, 8],
            [3, 9, 4],
            [3, 4, 2],
            [3, 2, 6],
            [3, 6, 8],
            [3, 8, 9],
            [4, 9, 5],
            [2, 4, 11],
            [6, 2, 10],
            [8, 6, 7],
            [9, 8, 1]
        ];
    THREE.PolyhedronGeometry.call(this, d, e, a, b)
}, THREE.IcosahedronGeometry.prototype = new THREE.Geometry, THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry, THREE.OctahedronGeometry = function(a, b) {
    var c = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1]
    ],
        d = [
            [0, 2, 4],
            [0, 4, 3],
            [0, 3, 5],
            [0, 5, 2],
            [1, 2, 5],
            [1, 5, 3],
            [1, 3, 4],
            [1, 4, 2]
        ];
    THREE.PolyhedronGeometry.call(this, c, d, a, b)
}, THREE.OctahedronGeometry.prototype = new THREE.Geometry, THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry, THREE.TetrahedronGeometry = function(a, b) {
    var c = [
        [1, 1, 1],
        [-1, -1, 1],
        [-1, 1, -1],
        [1, -1, -1]
    ],
        d = [
            [2, 1, 0],
            [0, 3, 2],
            [1, 3, 0],
            [2, 3, 1]
        ];
    THREE.PolyhedronGeometry.call(this, c, d, a, b)
}, THREE.TetrahedronGeometry.prototype = new THREE.Geometry, THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry, THREE.ParametricGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    var e = this.vertices,
        f = this.faces,
        g = this.faceVertexUvs[0];
    d = d === undefined ? !1 : d;
    var h, j, k, l, m, n = c + 1,
        o = b + 1;
    for (h = 0; h <= c; h++) {
        m = h / c;
        for (j = 0; j <= b; j++) l = j / b, k = a(l, m), e.push(k)
    }
    var p, q, r, s, t, u, v, w;
    for (h = 0; h < c; h++) for (j = 0; j < b; j++) p = h * o + j, q = h * o + j + 1, r = (h + 1) * o + j, s = (h + 1) * o + j + 1, t = new THREE.UV(h / b, j / c), u = new THREE.UV(h / b, (j + 1) / c), v = new THREE.UV((h + 1) / b, j / c), w = new THREE.UV((h + 1) / b, (j + 1) / c), d ? (f.push(new THREE.Face3(p, q, r)), f.push(new THREE.Face3(q, s, r)), g.push([t, u, v]), g.push([u, w, v])) : (f.push(new THREE.Face4(p, q, s, r)), g.push([t, u, v, w]));
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.ParametricGeometry.prototype = new THREE.Geometry, THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry, THREE.AxisHelper = function() {
    THREE.Object3D.call(this);
    var a = new THREE.Geometry;
    a.vertices.push(new THREE.Vector3), a.vertices.push(new THREE.Vector3(0, 100, 0));
    var b = new THREE.CylinderGeometry(0, 5, 25, 5, 1),
        c, d;
    c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 16711680
    })), c.rotation.z = -Math.PI / 2, this.add(c), d = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 16711680
    })), d.position.x = 100, d.rotation.z = -Math.PI / 2, this.add(d), c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 65280
    })), this.add(c), d = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 65280
    })), d.position.y = 100, this.add(d), c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 255
    })), c.rotation.x = Math.PI / 2, this.add(c), d = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 255
    })), d.position.z = 100, d.rotation.x = Math.PI / 2, this.add(d)
}, THREE.AxisHelper.prototype = new THREE.Object3D, THREE.AxisHelper.prototype.constructor = THREE.AxisHelper, THREE.ArrowHelper = function(a, b, c, d) {
    THREE.Object3D.call(this), d === undefined && (d = 16776960), c === undefined && (c = 20);
    var e = new THREE.Geometry;
    e.vertices.push(new THREE.Vector3(0, 0, 0)), e.vertices.push(new THREE.Vector3(0, 1, 0)), this.line = new THREE.Line(e, new THREE.LineBasicMaterial({
        color: d
    })), this.add(this.line);
    var f = new THREE.CylinderGeometry(0, .05, .25, 5, 1);
    this.cone = new THREE.Mesh(f, new THREE.MeshBasicMaterial({
        color: d
    })), this.cone.position.set(0, 1, 0), this.add(this.cone), b instanceof THREE.Vector3 && (this.position = b), this.setDirection(a), this.setLength(c)
}, THREE.ArrowHelper.prototype = new THREE.Object3D, THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper, THREE.ArrowHelper.prototype.setDirection = function(a) {
    var b = (new THREE.Vector3(0, 1, 0)).crossSelf(a),
        c = Math.acos((new THREE.Vector3(0, 1, 0)).dot(a.clone().normalize()));
    this.matrix = (new THREE.Matrix4).makeRotationAxis(b.normalize(), c), this.rotation.getRotationFromMatrix(this.matrix, this.scale)
}, THREE.ArrowHelper.prototype.setLength = function(a) {
    this.scale.set(a, a, a)
}, THREE.ArrowHelper.prototype.setColor = function(a) {
    this.line.material.color.setHex(a), this.cone.material.color.setHex(a)
}, THREE.CameraHelper = function(a) {
    function h(a, b, c) {
        i(a, c), i(b, c)
    }
    function i(a, c) {
        b.lineGeometry.vertices.push(new THREE.Vector3), b.lineGeometry.colors.push(new THREE.Color(c)), b.pointMap[a] === undefined && (b.pointMap[a] = []), b.pointMap[a].push(b.lineGeometry.vertices.length - 1)
    }
    THREE.Object3D.call(this);
    var b = this;
    this.lineGeometry = new THREE.Geometry, this.lineMaterial = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    }), this.pointMap = {};
    var c = 16755200,
        d = 16711680,
        e = 43775,
        f = 16777215,
        g = 3355443;
    h("n1", "n2", c), h("n2", "n4", c), h("n4", "n3", c), h("n3", "n1", c), h("f1", "f2", c), h("f2", "f4", c), h("f4", "f3", c), h("f3", "f1", c), h("n1", "f1", c), h("n2", "f2", c), h("n3", "f3", c), h("n4", "f4", c), h("p", "n1", d), h("p", "n2", d), h("p", "n3", d), h("p", "n4", d), h("u1", "u2", e), h("u2", "u3", e), h("u3", "u1", e), h("c", "t", f), h("p", "c", g), h("cn1", "cn2", g), h("cn3", "cn4", g), h("cf1", "cf2", g), h("cf3", "cf4", g), this.camera = a, this.update(a), this.lines = new THREE.Line(this.lineGeometry, this.lineMaterial, THREE.LinePieces), this.add(this.lines)
}, THREE.CameraHelper.prototype = new THREE.Object3D, THREE.CameraHelper.prototype.constructor = THREE.CameraHelper, THREE.CameraHelper.prototype.update = function() {
    function e(a, b, c, e) {
        THREE.CameraHelper.__v.set(b, c, e), THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v, THREE.CameraHelper.__c);
        var f = d.pointMap[a];
        if (f !== undefined) for (var g = 0, h = f.length; g < h; g++) {
            var i = f[g];
            d.lineGeometry.vertices[i].copy(THREE.CameraHelper.__v)
        }
    }
    var a = this.camera,
        b = 1,
        c = 1,
        d = this;
    THREE.CameraHelper.__c.projectionMatrix.copy(a.projectionMatrix), e("c", 0, 0, -1), e("t", 0, 0, 1), e("n1", -b, -c, -1), e("n2", b, -c, -1), e("n3", -b, c, -1), e("n4", b, c, -1), e("f1", -b, -c, 1), e("f2", b, -c, 1), e("f3", -b, c, 1), e("f4", b, c, 1), e("u1", b * .7, c * 1.1, -1), e("u2", -b * .7, c * 1.1, -1), e("u3", 0, c * 2, -1), e("cf1", -b, 0, 1), e("cf2", b, 0, 1), e("cf3", 0, -c, 1), e("cf4", 0, c, 1), e("cn1", -b, 0, -1), e("cn2", b, 0, -1), e("cn3", 0, -c, -1), e("cn4", 0, c, -1), this.lineGeometry.verticesNeedUpdate = !0
}, THREE.CameraHelper.__projector = new THREE.Projector, THREE.CameraHelper.__v = new THREE.Vector3, THREE.CameraHelper.__c = new THREE.Camera, THREE.SubdivisionModifier = function(a) {
    this.subdivisions = a === undefined ? 1 : a, this.useOldVertexColors = !1, this.supportUVs = !0, this.debug = !1
}, THREE.SubdivisionModifier.prototype.constructor = THREE.SubdivisionModifier, THREE.SubdivisionModifier.prototype.modify = function(a) {
    var b = this.subdivisions;
    while (b-- > 0) this.smooth(a)
}, THREE.SubdivisionModifier.prototype.smooth = function(a) {
    function e(a, c, d) {
        b.push(new THREE.Vector3(a, c, d))
    }
    function g() {
        f.debug && console.log.apply(console, arguments)
    }
    function h() {
        console && console.log.apply(console, arguments)
    }
    function i(a, b, e, h, i, j, k) {
        var l = new THREE.Face4(a, b, e, h, null, i.color, i.material);
        if (f.useOldVertexColors) {
            l.vertexColors = [];
            var m, n, o;
            for (var p = 0; p < 4; p++) {
                o = j[p], m = new THREE.Color, m.setRGB(0, 0, 0);
                for (var q = 0, r = 0; q < o.length; q++) n = i.vertexColors[o[q] - 1], m.r += n.r, m.g += n.g, m.b += n.b;
                m.r /= o.length, m.g /= o.length, m.b /= o.length, l.vertexColors[p] = m
            }
        }
        c.push(l);
        if (f.supportUVs) {
            var s = [v(a, ""), v(b, k), v(e, k), v(h, k)];
            s[0] ? s[1] ? s[2] ? s[3] ? d.push(s) : g("d :( ", h + ":" + k) : g("c :( ", e + ":" + k) : g("b :( ", b + ":" + k) : g("a :( ", a + ":" + k)
        }
    }
    function j(a, b) {
        return Math.min(a, b) + "_" + Math.max(a, b)
    }
    function k(a) {
        function o(a, b) {
            n[a] === undefined && (n[a] = []), n[a].push(b)
        }
        var b, c, h, m, n = {};
        for (b = 0, c = a.faces.length; b < c; b++) h = a.faces[b], h instanceof THREE.Face3 ? (m = j(h.a, h.b), o(m, b), m = j(h.b, h.c), o(m, b), m = j(h.c, h.a), o(m, b)) : h instanceof THREE.Face4 && (m = j(h.a, h.b), o(m, b), m = j(h.b, h.c), o(m, b), m = j(h.c, h.d), o(m, b), m = j(h.d, h.a), o(m, b));
        return n
    }
    function v(a, b) {
        var e = a + ":" + b,
            f = t[e];
        return f ? f : (a >= u && a < u + m.length ? g("face pt") : g("edge pt"), h("warning, UV not found for", e), null)
    }
    function w(a, b, c) {
        var d = a + ":" + b;
        d in t ? h("dup vertexNo", a, "oldFaceNo", b, "value", c, "key", d, t[d]) : t[d] = c
    }
    function T(a, b) {
        R[a] === undefined && (R[a] = []), R[a].push(b)
    }
    function U(a, b, c) {
        S[a] === undefined && (S[a] = {}), S[a][b] = c
    }
    var b = [],
        c = [],
        d = [],
        f = this,
        l = a.vertices,
        m = a.faces,
        n = l.concat(),
        o = [],
        p = {},
        q = {},
        r = [],
        s = [],
        t = {},
        u = l.length,
        x, y, z, A, B, C = a.faceVertexUvs[0],
        D = "abcd",
        E;
    g("originalFaces, uvs, originalVerticesLength", m.length, C.length, u);
    if (f.supportUVs) for (x = 0, y = C.length; x < y; x++) for (z = 0, A = C[x].length; z < A; z++) E = m[x][D.charAt(z)], w(E, x, C[x][z]);
    C.length == 0 && (f.supportUVs = !1);
    var F = 0;
    for (var G in t) F++;
    F || (f.supportUVs = !1, g("no uvs")), g("-- Original Faces + Vertices UVs completed", t, "vs", C.length);
    var H;
    for (x = 0, y = m.length; x < y; x++) {
        B = m[x], o.push(B.centroid), n.push(B.centroid);
        if (!f.supportUVs) continue;
        H = new THREE.UV, B instanceof THREE.Face3 ? (H.u = v(B.a, x).u + v(B.b, x).u + v(B.c, x).u, H.v = v(B.a, x).v + v(B.b, x).v + v(B.c, x).v, H.u /= 3, H.v /= 3) : B instanceof THREE.Face4 && (H.u = v(B.a, x).u + v(B.b, x).u + v(B.c, x).u + v(B.d, x).u, H.v = v(B.a, x).v + v(B.b, x).v + v(B.c, x).v + v(B.d, x).v, H.u /= 4, H.v /= 4), w(u + x, "", H)
    }
    g("-- added UVs for new Faces", t);
    var I = k(a),
        J, K, L, M, N = 0,
        O, P, Q, R = {},
        S = {};
    for (x in I) {
        J = I[x], O = x.split("_"), P = O[0], Q = O[1], T(P, [P, Q]), T(Q, [P, Q]);
        for (z = 0, A = J.length; z < A; z++) B = J[z], U(P, B, x), U(Q, B, x);
        J.length < 2 && (q[x] = !0, r[P] = !0, r[Q] = !0)
    }
    g("vertexEdgeMap", R, "vertexFaceMap", S);
    for (x in I) {
        J = I[x], K = J[0], L = J[1], O = x.split("_"), P = O[0], Q = O[1], M = new THREE.Vector3, q[x] ? (M.addSelf(l[P]), M.addSelf(l[Q]), M.multiplyScalar(.5), r[n.length] = !0) : (M.addSelf(o[K]), M.addSelf(o[L]), M.addSelf(l[P]), M.addSelf(l[Q]), M.multiplyScalar(.25)), p[x] = u + m.length + N, n.push(M), N++;
        if (!f.supportUVs) continue;
        H = new THREE.UV, H.u = v(P, K).u + v(Q, K).u, H.v = v(P, K).v + v(Q, K).v, H.u /= 2, H.v /= 2, w(p[x], K, H), q[x] || (H = new THREE.UV, H.u = v(P, L).u + v(Q, L).u, H.v = v(P, L).v + v(Q, L).v, H.u /= 2, H.v /= 2, w(p[x], L, H))
    }
    g("-- Step 2 done");
    var V, W, X, Y, Z, $, _, ab = ["123", "12", "2", "23"],
        bb = ["123", "23", "3", "31"],
        cb = ["123", "31", "1", "12"],
        db = ["1234", "12", "2", "23"],
        eb = ["1234", "23", "3", "34"],
        fb = ["1234", "34", "4", "41"],
        gb = ["1234", "41", "1", "12"];
    for (x = 0, y = o.length; x < y; x++) V = o[x], B = m[x], W = u + x, B instanceof THREE.Face3 ? (X = j(B.a, B.b), Y = j(B.b, B.c), _ = j(B.c, B.a), i(W, p[X], B.b, p[Y], B, ab, x), i(W, p[Y], B.c, p[_], B, bb, x), i(W, p[_], B.a, p[X], B, cb, x)) : B instanceof THREE.Face4 ? (X = j(B.a, B.b), Y = j(B.b, B.c), Z = j(B.c, B.d), $ = j(B.d, B.a), i(W, p[X], B.b, p[Y], B, db, x), i(W, p[Y], B.c, p[Z], B, eb, x), i(W, p[Z], B.d, p[$], B, fb, x), i(W, p[$], B.a, p[X], B, gb, x)) : g("face should be a face!", B);
    b = n;
    var hb = new THREE.Vector3,
        ib = new THREE.Vector3,
        jb;
    for (x = 0, y = l.length; x < y; x++) {
        if (R[x] === undefined) continue;
        hb.set(0, 0, 0), ib.set(0, 0, 0);
        var kb = new THREE.Vector3(0, 0, 0),
            lb = 0;
        for (z in S[x]) hb.addSelf(o[z]), lb++;
        var mb = 0;
        jb = R[x].length;
        for (z = 0; z < jb; z++) q[j(R[x][z][0], R[x][z][1])] && mb++;
        if (mb == 2) continue;
        hb.divideScalar(lb);
        for (z = 0; z < jb; z++) {
            J = R[x][z];
            var nb = l[J[0]].clone().addSelf(l[J[1]]).divideScalar(2);
            ib.addSelf(nb)
        }
        ib.divideScalar(jb), kb.addSelf(l[x]), kb.multiplyScalar(jb - 3), kb.addSelf(hb), kb.addSelf(ib.multiplyScalar(2)), kb.divideScalar(jb), b[x] = kb
    }
    var ob = a;
    ob.vertices = b, ob.faces = c, ob.faceVertexUvs[0] = d, delete ob.__tmpVertices, ob.computeCentroids(), ob.computeFaceNormals(), ob.computeVertexNormals()
}, THREE.ImmediateRenderObject = function() {
    THREE.Object3D.call(this), this.render = function(a) {}
}, THREE.ImmediateRenderObject.prototype = new THREE.Object3D, THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject, THREE.LensFlare = function(a, b, c, d, e) {
    THREE.Object3D.call(this), this.lensFlares = [], this.positionScreen = new THREE.Vector3, this.customUpdateCallback = undefined, a !== undefined && this.add(a, b, c, d, e)
}, THREE.LensFlare.prototype = new THREE.Object3D, THREE.LensFlare.prototype.constructor = THREE.LensFlare, THREE.LensFlare.prototype.supr = THREE.Object3D.prototype, THREE.LensFlare.prototype.add = function(a, b, c, d, e, f) {
    b === undefined && (b = -1), c === undefined && (c = 0), f === undefined && (f = 1), e === undefined && (e = new THREE.Color(16777215)), d === undefined && (d = THREE.NormalBlending), c = Math.min(c, Math.max(0, c)), this.lensFlares.push({
        texture: a,
        size: b,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: f,
        color: e,
        blending: d
    })
}, THREE.LensFlare.prototype.updateLensFlares = function() {
    var a, b = this.lensFlares.length,
        c, d = -this.positionScreen.x * 2,
        e = -this.positionScreen.y * 2;
    for (a = 0; a < b; a++) c = this.lensFlares[a], c.x = this.positionScreen.x + d * c.distance, c.y = this.positionScreen.y + e * c.distance, c.wantedRotation = c.x * Math.PI * .25, c.rotation += (c.wantedRotation - c.rotation) * .25
}, THREE.MorphBlendMesh = function(a, b) {
    THREE.Mesh.call(this, a, b), this.animationsMap = {}, this.animationsList = [];
    var c = this.geometry.morphTargets.length,
        d = "__default",
        e = 0,
        f = c - 1,
        g = c / 1;
    this.createAnimation(d, e, f, g), this.setAnimationWeight(d, 1)
}, THREE.MorphBlendMesh.prototype = new THREE.Mesh, THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh, THREE.MorphBlendMesh.prototype.createAnimation = function(a, b, c, d) {
    var e = {
        startFrame: b,
        endFrame: c,
        length: c - b + 1,
        fps: d,
        duration: (c - b) / d,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    };
    this.animationsMap[a] = e, this.animationsList.push(e)
}, THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(a) {
    var b = /([a-z]+)(\d+)/,
        c, d = {},
        e = this.geometry;
    for (var f = 0, g = e.morphTargets.length; f < g; f++) {
        var h = e.morphTargets[f],
            i = h.name.match(b);
        if (i && i.length > 1) {
            var j = i[1],
                k = i[2];
            d[j] || (d[j] = {
                start: Infinity,
                end: -Infinity
            });
            var l = d[j];
            f < l.start && (l.start = f), f > l.end && (l.end = f), c || (c = j)
        }
    }
    for (var j in d) {
        var l = d[j];
        this.createAnimation(j, l.start, l.end, a)
    }
    this.firstAnimation = c
}, THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a) {
    var b = this.animationsMap[a];
    b && (b.direction = 1, b.directionBackwards = !1)
}, THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a) {
    var b = this.animationsMap[a];
    b && (b.direction = -1, b.directionBackwards = !0)
}, THREE.MorphBlendMesh.prototype.setAnimationFPS = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.fps = b, c.duration = (c.end - c.start) / c.fps)
}, THREE.MorphBlendMesh.prototype.setAnimationDuration = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.duration = b, c.fps = (c.end - c.start) / c.duration)
}, THREE.MorphBlendMesh.prototype.setAnimationWeight = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.weight = b)
}, THREE.MorphBlendMesh.prototype.setAnimationTime = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.time = b)
}, THREE.MorphBlendMesh.prototype.getAnimationTime = function(a) {
    var b = 0,
        c = this.animationsMap[a];
    return c && (b = c.time), b
}, THREE.MorphBlendMesh.prototype.getAnimationDuration = function(a) {
    var b = -1,
        c = this.animationsMap[a];
    return c && (b = c.duration), b
}, THREE.MorphBlendMesh.prototype.playAnimation = function(a) {
    var b = this.animationsMap[a];
    b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
}, THREE.MorphBlendMesh.prototype.stopAnimation = function(a) {
    var b = this.animationsMap[a];
    b && (b.active = !1)
}, THREE.MorphBlendMesh.prototype.update = function(a) {
    for (var b = 0, c = this.animationsList.length; b < c; b++) {
        var d = this.animationsList[b];
        if (!d.active) continue;
        var e = d.duration / d.length;
        d.time += d.direction * a;
        if (d.mirroredLoop) {
            if (d.time > d.duration || d.time < 0) d.direction *= -1, d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0), d.time < 0 && (d.time = 0, d.directionBackwards = !1)
        }
        else d.time = d.time % d.duration, d.time < 0 && (d.time += d.duration);
        var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
            g = d.weight;
        f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f);
        var h = d.time % e / e;
        d.directionBackwards && (h = 1 - h), this.morphTargetInfluences[d.currentFrame] = h * g, this.morphTargetInfluences[d.lastFrame] = (1 - h) * g
    }
}, THREE.LensFlarePlugin = function() {
    function d(b) {
        var c = a.createProgram(),
            d = a.createShader(a.FRAGMENT_SHADER),
            e = a.createShader(a.VERTEX_SHADER);
        return a.shaderSource(d, b.fragmentShader), a.shaderSource(e, b.vertexShader), a.compileShader(d), a.compileShader(e), a.attachShader(c, d), a.attachShader(c, e), a.linkProgram(c), c
    }
    var a, b, c = {};
    this.init = function(e) {
        a = e.context, b = e, c.vertices = new Float32Array(16), c.faces = new Uint16Array(6);
        var f = 0;
        c.vertices[f++] = -1, c.vertices[f++] = -1, c.vertices[f++] = 0, c.vertices[f++] = 0, c.vertices[f++] = 1, c.vertices[f++] = -1, c.vertices[f++] = 1, c.vertices[f++] = 0, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = -1, c.vertices[f++] = 1, c.vertices[f++] = 0, c.vertices[f++] = 1, f = 0, c.faces[f++] = 0, c.faces[f++] = 1, c.faces[f++] = 2, c.faces[f++] = 0, c.faces[f++] = 2, c.faces[f++] = 3, c.vertexBuffer = a.createBuffer(), c.elementBuffer = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, c.vertexBuffer), a.bufferData(a.ARRAY_BUFFER, c.vertices, a.STATIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c.elementBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, c.faces, a.STATIC_DRAW), c.tempTexture = a.createTexture(), c.occlusionTexture = a.createTexture(), a.bindTexture(a.TEXTURE_2D, c.tempTexture), a.texImage2D(a.TEXTURE_2D, 0, a.RGB, 16, 16, 0, a.RGB, a.UNSIGNED_BYTE, null), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST), a.bindTexture(a.TEXTURE_2D, c.occlusionTexture), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, 16, 16, 0, a.RGBA, a.UNSIGNED_BYTE, null), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST), a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0 ? (c.hasVertexTexture = !1, c.program = d(THREE.ShaderFlares.lensFlare)) : (c.hasVertexTexture = !0, c.program = d(THREE.ShaderFlares.lensFlareVertexTexture)), c.attributes = {}, c.uniforms = {}, c.attributes.vertex = a.getAttribLocation(c.program, "position"), c.attributes.uv = a.getAttribLocation(c.program, "uv"), c.uniforms.renderType = a.getUniformLocation(c.program, "renderType"), c.uniforms.map = a.getUniformLocation(c.program, "map"), c.uniforms.occlusionMap = a.getUniformLocation(c.program, "occlusionMap"), c.uniforms.opacity = a.getUniformLocation(c.program, "opacity"), c.uniforms.color = a.getUniformLocation(c.program, "color"), c.uniforms.scale = a.getUniformLocation(c.program, "scale"), c.uniforms.rotation = a.getUniformLocation(c.program, "rotation"), c.uniforms.screenPosition = a.getUniformLocation(c.program, "screenPosition"), c.attributesEnabled = !1
    }, this.render = function(d, e, f, g) {
        var h = d.__webglFlares,
            i = h.length;
        if (!i) return;
        var j = new THREE.Vector3,
            k = g / f,
            l = f * .5,
            m = g * .5,
            n = 16 / g,
            o = new THREE.Vector2(n * k, n),
            p = new THREE.Vector3(1, 1, 0),
            q = new THREE.Vector2(1, 1),
            r = c.uniforms,
            s = c.attributes;
        a.useProgram(c.program), c.attributesEnabled || (a.enableVertexAttribArray(c.attributes.vertex), a.enableVertexAttribArray(c.attributes.uv), c.attributesEnabled = !0), a.uniform1i(r.occlusionMap, 0), a.uniform1i(r.map, 1), a.bindBuffer(a.ARRAY_BUFFER, c.vertexBuffer), a.vertexAttribPointer(s.vertex, 2, a.FLOAT, !1, 16, 0), a.vertexAttribPointer(s.uv, 2, a.FLOAT, !1, 16, 8), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c.elementBuffer), a.disable(a.CULL_FACE), a.depthMask(!1);
        var t, u, v, w, x;
        for (t = 0; t < i; t++) {
            n = 16 / g, o.set(n * k, n), w = h[t], j.set(w.matrixWorld.elements[12], w.matrixWorld.elements[13], w.matrixWorld.elements[14]), e.matrixWorldInverse.multiplyVector3(j), e.projectionMatrix.multiplyVector3(j), p.copy(j), q.x = p.x * l + l, q.y = p.y * m + m;
            if (c.hasVertexTexture || q.x > 0 && q.x < f && q.y > 0 && q.y < g) {
                a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, c.tempTexture), a.copyTexImage2D(a.TEXTURE_2D, 0, a.RGB, q.x - 8, q.y - 8, 16, 16, 0), a.uniform1i(r.renderType, 0), a.uniform2f(r.scale, o.x, o.y), a.uniform3f(r.screenPosition, p.x, p.y, p.z), a.disable(a.BLEND), a.enable(a.DEPTH_TEST), a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, c.occlusionTexture), a.copyTexImage2D(a.TEXTURE_2D, 0, a.RGBA, q.x - 8, q.y - 8, 16, 16, 0), a.uniform1i(r.renderType, 1), a.disable(a.DEPTH_TEST), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, c.tempTexture), a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0), w.positionScreen.copy(p), w.customUpdateCallback ? w.customUpdateCallback(w) : w.updateLensFlares(), a.uniform1i(r.renderType, 2), a.enable(a.BLEND);
                for (u = 0, v = w.lensFlares.length; u < v; u++) x = w.lensFlares[u], x.opacity > .001 && x.scale > .001 && (p.x = x.x, p.y = x.y, p.z = x.z, n = x.size * x.scale / g, o.x = n * k, o.y = n, a.uniform3f(r.screenPosition, p.x, p.y, p.z), a.uniform2f(r.scale, o.x, o.y), a.uniform1f(r.rotation, x.rotation), a.uniform1f(r.opacity, x.opacity), a.uniform3f(r.color, x.color.r, x.color.g, x.color.b), b.setBlending(x.blending, x.blendEquation, x.blendSrc, x.blendDst), b.setTexture(x.texture, 1), a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0))
            }
        }
        a.enable(a.CULL_FACE), a.enable(a.DEPTH_TEST), a.depthMask(!0)
    }
}, THREE.ShadowMapPlugin = function() {
    function i(a, b) {
        var c = new THREE.DirectionalLight;
        c.isVirtual = !0, c.onlyShadow = !0, c.castShadow = !0, c.shadowCameraNear = a.shadowCameraNear, c.shadowCameraFar = a.shadowCameraFar, c.shadowCameraLeft = a.shadowCameraLeft, c.shadowCameraRight = a.shadowCameraRight, c.shadowCameraBottom = a.shadowCameraBottom, c.shadowCameraTop = a.shadowCameraTop, c.shadowCameraVisible = a.shadowCameraVisible, c.shadowDarkness = a.shadowDarkness, c.shadowBias = a.shadowCascadeBias[b], c.shadowMapWidth = a.shadowCascadeWidth[b], c.shadowMapHeight = a.shadowCascadeHeight[b], c.pointsWorld = [], c.pointsFrustum = [];
        var d = c.pointsWorld,
            e = c.pointsFrustum;
        for (var f = 0; f < 8; f++) d[f] = new THREE.Vector3, e[f] = new THREE.Vector3;
        var g = a.shadowCascadeNearZ[b],
            h = a.shadowCascadeFarZ[b];
        return e[0].set(-1, -1, g), e[1].set(1, -1, g), e[2].set(-1, 1, g), e[3].set(1, 1, g), e[4].set(-1, -1, h), e[5].set(1, -1, h), e[6].set(-1, 1, h), e[7].set(1, 1, h), c
    }
    function j(a, b) {
        var c = a.shadowCascadeArray[b];
        c.position.copy(a.position), c.target.position.copy(a.target.position), c.lookAt(c.target), c.shadowCameraVisible = a.shadowCameraVisible, c.shadowDarkness = a.shadowDarkness, c.shadowBias = a.shadowCascadeBias[b];
        var d = a.shadowCascadeNearZ[b],
            e = a.shadowCascadeFarZ[b],
            f = c.pointsFrustum;
        f[0].z = d, f[1].z = d, f[2].z = d, f[3].z = d, f[4].z = e, f[5].z = e, f[6].z = e, f[7].z = e
    }
    function k(a, b) {
        var c = b.shadowCamera,
            d = b.pointsFrustum,
            e = b.pointsWorld;
        g.set(Infinity, Infinity, Infinity), h.set(-Infinity, -Infinity, -Infinity);
        for (var f = 0; f < 8; f++) {
            var i = e[f];
            i.copy(d[f]), THREE.ShadowMapPlugin.__projector.unprojectVector(i, a), c.matrixWorldInverse.multiplyVector3(i), i.x < g.x && (g.x = i.x), i.x > h.x && (h.x = i.x), i.y < g.y && (g.y = i.y), i.y > h.y && (h.y = i.y), i.z < g.z && (g.z = i.z), i.z > h.z && (h.z = i.z)
        }
        c.left = g.x, c.right = h.x, c.top = h.y, c.bottom = g.y, c.updateProjectionMatrix()
    }
    var a, b, c, d, e = new THREE.Frustum,
        f = new THREE.Matrix4,
        g = new THREE.Vector3,
        h = new THREE.Vector3;
    this.init = function(e) {
        a = e.context, b = e;
        var f = THREE.ShaderLib.depthRGBA,
            g = THREE.UniformsUtils.clone(f.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: f.fragmentShader,
            vertexShader: f.vertexShader,
            uniforms: g
        }), d = new THREE.ShaderMaterial({
            fragmentShader: f.fragmentShader,
            vertexShader: f.vertexShader,
            uniforms: g,
            morphTargets: !0
        }), c._shadowPass = !0, d._shadowPass = !0
    }, this.render = function(a, c) {
        if (!b.shadowMapEnabled || !b.shadowMapAutoUpdate) return;
        this.update(a, c)
    }, this.update = function(g, h) {
        var l, m, n, o, p, q, r, s, u, v, w, x, y, z, A = [],
            B = 0,
            C = null;
        a.clearColor(1, 1, 1, 1), a.disable(a.BLEND), a.enable(a.CULL_FACE), b.shadowMapCullFrontFaces ? a.cullFace(a.FRONT) : a.cullFace(a.BACK), b.setDepthTest(!0);
        for (l = 0, m = g.__lights.length; l < m; l++) {
            y = g.__lights[l];
            if (!y.castShadow) continue;
            if (y instanceof THREE.DirectionalLight && y.shadowCascade) for (p = 0; p < y.shadowCascadeCount; p++) {
                var D;
                if (!y.shadowCascadeArray[p]) {
                    D = i(y, p), D.originalCamera = h;
                    var E = new THREE.Gyroscope;
                    E.position = y.shadowCascadeOffset, E.add(D), E.add(D.target), h.add(E), y.shadowCascadeArray[p] = D, console.log("Created virtualLight", D)
                }
                else D = y.shadowCascadeArray[p];
                j(y, p), A[B] = D, B++
            }
            else A[B] = y, B++
        }
        for (l = 0, m = A.length; l < m; l++) {
            y = A[l];
            if (!y.shadowMap) {
                var F = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat
                };
                y.shadowMap = new THREE.WebGLRenderTarget(y.shadowMapWidth, y.shadowMapHeight, F), y.shadowMapSize = new THREE.Vector2(y.shadowMapWidth, y.shadowMapHeight), y.shadowMatrix = new THREE.Matrix4
            }
            if (!y.shadowCamera) {
                if (y instanceof THREE.SpotLight) y.shadowCamera = new THREE.PerspectiveCamera(y.shadowCameraFov, y.shadowMapWidth / y.shadowMapHeight, y.shadowCameraNear, y.shadowCameraFar);
                else {
                    if (!(y instanceof THREE.DirectionalLight)) {
                        console.error("Unsupported light type for shadow");
                        continue
                    }
                    y.shadowCamera = new THREE.OrthographicCamera(y.shadowCameraLeft, y.shadowCameraRight, y.shadowCameraTop, y.shadowCameraBottom, y.shadowCameraNear, y.shadowCameraFar)
                }
                g.add(y.shadowCamera), b.autoUpdateScene && g.updateMatrixWorld()
            }
            y.shadowCameraVisible && !y.cameraHelper && (y.cameraHelper = new THREE.CameraHelper(y.shadowCamera), y.shadowCamera.add(y.cameraHelper)), y.isVirtual && D.originalCamera == h && k(h, y), q = y.shadowMap, r = y.shadowMatrix, s = y.shadowCamera, s.position.copy(y.matrixWorld.getPosition()), s.lookAt(y.target.matrixWorld.getPosition()), s.updateMatrixWorld(), s.matrixWorldInverse.getInverse(s.matrixWorld), y.cameraHelper && (y.cameraHelper.lines.visible = y.shadowCameraVisible), y.shadowCameraVisible && y.cameraHelper.update(), r.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), r.multiplySelf(s.projectionMatrix), r.multiplySelf(s.matrixWorldInverse), s._viewMatrixArray || (s._viewMatrixArray = new Float32Array(16)), s._projectionMatrixArray || (s._projectionMatrixArray = new Float32Array(16)), s.matrixWorldInverse.flattenToArray(s._viewMatrixArray), s.projectionMatrix.flattenToArray(s._projectionMatrixArray), f.multiply(s.projectionMatrix, s.matrixWorldInverse), e.setFromMatrix(f), b.setRenderTarget(q), b.clear(), z = g.__webglObjects;
            for (n = 0, o = z.length; n < o; n++) w = z[n], x = w.object, w.render = !1, x.visible && x.castShadow && (!(x instanceof THREE.Mesh) || !x.frustumCulled || e.contains(x)) && (x._modelViewMatrix.multiply(s.matrixWorldInverse, x.matrixWorld), w.render = !0);
            for (n = 0, o = z.length; n < o; n++) w = z[n], w.render && (x = w.object, u = w.buffer, x.customDepthMaterial ? v = x.customDepthMaterial : x.geometry.morphTargets.length ? v = d : v = c, u instanceof THREE.BufferGeometry ? b.renderBufferDirect(s, g.__lights, C, v, u, x) : b.renderBuffer(s, g.__lights, C, v, u, x));
            z = g.__webglObjectsImmediate;
            for (n = 0, o = z.length; n < o; n++) w = z[n], x = w.object, x.visible && x.castShadow && (x._modelViewMatrix.multiply(s.matrixWorldInverse, x.matrixWorld), b.renderImmediateObject(s, g.__lights, C, c, x))
        }
        var G = b.getClearColor(),
            H = b.getClearAlpha();
        a.clearColor(G.r, G.g, G.b, H), a.enable(a.BLEND), b.shadowMapCullFrontFaces && a.cullFace(a.BACK)
    }
}, THREE.ShadowMapPlugin.__projector = new THREE.Projector, THREE.SpritePlugin = function() {
    function d(b) {
        var c = a.createProgram(),
            d = a.createShader(a.FRAGMENT_SHADER),
            e = a.createShader(a.VERTEX_SHADER);
        return a.shaderSource(d, b.fragmentShader), a.shaderSource(e, b.vertexShader), a.compileShader(d), a.compileShader(e), a.attachShader(c, d), a.attachShader(c, e), a.linkProgram(c), c
    }
    function e(a, b) {
        return b.z - a.z
    }
    var a, b, c = {};
    this.init = function(e) {
        a = e.context, b = e, c.vertices = new Float32Array(16), c.faces = new Uint16Array(6);
        var f = 0;
        c.vertices[f++] = -1, c.vertices[f++] = -1, c.vertices[f++] = 0, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = -1, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = 1, c.vertices[f++] = 0, c.vertices[f++] = -1, c.vertices[f++] = 1, c.vertices[f++] = 0, c.vertices[f++] = 0, f = 0, c.faces[f++] = 0, c.faces[f++] = 1, c.faces[f++] = 2, c.faces[f++] = 0, c.faces[f++] = 2, c.faces[f++] = 3, c.vertexBuffer = a.createBuffer(), c.elementBuffer = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, c.vertexBuffer), a.bufferData(a.ARRAY_BUFFER, c.vertices, a.STATIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c.elementBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, c.faces, a.STATIC_DRAW), c.program = d(THREE.ShaderSprite.sprite), c.attributes = {}, c.uniforms = {}, c.attributes.position = a.getAttribLocation(c.program, "position"), c.attributes.uv = a.getAttribLocation(c.program, "uv"), c.uniforms.uvOffset = a.getUniformLocation(c.program, "uvOffset"), c.uniforms.uvScale = a.getUniformLocation(c.program, "uvScale"), c.uniforms.rotation = a.getUniformLocation(c.program, "rotation"), c.uniforms.scale = a.getUniformLocation(c.program, "scale"), c.uniforms.alignment = a.getUniformLocation(c.program, "alignment"), c.uniforms.color = a.getUniformLocation(c.program, "color"), c.uniforms.map = a.getUniformLocation(c.program, "map"), c.uniforms.opacity = a.getUniformLocation(c.program, "opacity"), c.uniforms.useScreenCoordinates = a.getUniformLocation(c.program, "useScreenCoordinates"), c.uniforms.affectedByDistance = a.getUniformLocation(c.program, "affectedByDistance"), c.uniforms.screenPosition = a.getUniformLocation(c.program, "screenPosition"), c.uniforms.modelViewMatrix = a.getUniformLocation(c.program, "modelViewMatrix"), c.uniforms.projectionMatrix = a.getUniformLocation(c.program, "projectionMatrix"), c.attributesEnabled = !1
    }, this.render = function(d, f, g, h) {
        var i = d.__webglSprites,
            j = i.length;
        if (!j) return;
        var k = c.attributes,
            l = c.uniforms,
            m = h / g,
            n = g * .5,
            o = h * .5,
            p = !0;
        a.useProgram(c.program), c.attributesEnabled || (a.enableVertexAttribArray(k.position), a.enableVertexAttribArray(k.uv), c.attributesEnabled = !0), a.disable(a.CULL_FACE), a.enable(a.BLEND), a.depthMask(!0), a.bindBuffer(a.ARRAY_BUFFER, c.vertexBuffer), a.vertexAttribPointer(k.position, 2, a.FLOAT, !1, 16, 0), a.vertexAttribPointer(k.uv, 2, a.FLOAT, !1, 16, 8), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c.elementBuffer), a.uniformMatrix4fv(l.projectionMatrix, !1, f._projectionMatrixArray), a.activeTexture(a.TEXTURE0), a.uniform1i(l.map, 0);
        var q, r, t, u = [];
        for (q = 0; q < j; q++) {
            r = i[q];
            if (!r.visible || r.opacity === 0) continue;
            r.useScreenCoordinates ? r.z = -r.position.z : (r._modelViewMatrix.multiply(f.matrixWorldInverse, r.matrixWorld), r.z = -r._modelViewMatrix.elements[14])
        }
        i.sort(e);
        for (q = 0; q < j; q++) {
            r = i[q];
            if (!r.visible || r.opacity === 0) continue;
            r.map && r.map.image && r.map.image.width && (r.useScreenCoordinates ? (a.uniform1i(l.useScreenCoordinates, 1), a.uniform3f(l.screenPosition, (r.position.x - n) / n, (o - r.position.y) / o, Math.max(0, Math.min(1, r.position.z)))) : (a.uniform1i(l.useScreenCoordinates, 0), a.uniform1i(l.affectedByDistance, r.affectedByDistance ? 1 : 0), a.uniformMatrix4fv(l.modelViewMatrix, !1, r._modelViewMatrix.elements)), t = r.map.image.width / (r.scaleByViewport ? h : 1), u[0] = t * m * r.scale.x, u[1] = t * r.scale.y, a.uniform2f(l.uvScale, r.uvScale.x, r.uvScale.y), a.uniform2f(l.uvOffset, r.uvOffset.x, r.uvOffset.y), a.uniform2f(l.alignment, r.alignment.x, r.alignment.y), a.uniform1f(l.opacity, r.opacity), a.uniform3f(l.color, r.color.r, r.color.g, r.color.b), a.uniform1f(l.rotation, r.rotation), a.uniform2fv(l.scale, u), r.mergeWith3D && !p ? (a.enable(a.DEPTH_TEST), p = !0) : !r.mergeWith3D && p && (a.disable(a.DEPTH_TEST), p = !1), b.setBlending(r.blending, r.blendEquation, r.blendSrc, r.blendDst), b.setTexture(r.map, 0), a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0))
        }
        a.enable(a.CULL_FACE), a.enable(a.DEPTH_TEST), a.depthMask(!0)
    }
}, THREE.DepthPassPlugin = function() {
    this.enabled = !1, this.renderTarget = null;
    var a, b, c, d, e = new THREE.Frustum,
        f = new THREE.Matrix4;
    this.init = function(e) {
        a = e.context, b = e;
        var f = THREE.ShaderLib.depthRGBA,
            g = THREE.UniformsUtils.clone(f.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: f.fragmentShader,
            vertexShader: f.vertexShader,
            uniforms: g
        }), d = new THREE.ShaderMaterial({
            fragmentShader: f.fragmentShader,
            vertexShader: f.vertexShader,
            uniforms: g,
            morphTargets: !0
        }), c._shadowPass = !0, d._shadowPass = !0
    }, this.render = function(a, b) {
        if (!this.enabled) return;
        this.update(a, b)
    }, this.update = function(g, h) {
        var k, l, o, p, q, r, t, u = null;
        a.clearColor(1, 1, 1, 1), a.disable(a.BLEND), b.setDepthTest(!0), b.autoUpdateScene && g.updateMatrixWorld(), h._viewMatrixArray || (h._viewMatrixArray = new Float32Array(16)), h._projectionMatrixArray || (h._projectionMatrixArray = new Float32Array(16)), h.matrixWorldInverse.getInverse(h.matrixWorld), h.matrixWorldInverse.flattenToArray(h._viewMatrixArray), h.projectionMatrix.flattenToArray(h._projectionMatrixArray), f.multiply(h.projectionMatrix, h.matrixWorldInverse), e.setFromMatrix(f), b.setRenderTarget(this.renderTarget), b.clear(), t = g.__webglObjects;
        for (k = 0, l = t.length; k < l; k++) q = t[k], r = q.object, q.render = !1, r.visible && (!(r instanceof THREE.Mesh) || !r.frustumCulled || e.contains(r)) && (r._modelViewMatrix.multiply(h.matrixWorldInverse, r.matrixWorld), q.render = !0);
        for (k = 0, l = t.length; k < l; k++) q = t[k], q.render && (r = q.object, o = q.buffer, b.setObjectFaces(r), r.customDepthMaterial ? p = r.customDepthMaterial : r.geometry.morphTargets.length ? p = d : p = c, o instanceof THREE.BufferGeometry ? b.renderBufferDirect(h, g.__lights, u, p, o, r) : b.renderBuffer(h, g.__lights, u, p, o, r));
        t = g.__webglObjectsImmediate;
        for (k = 0, l = t.length; k < l; k++) q = t[k], r = q.object, r.visible && r.castShadow && (r._modelViewMatrix.multiply(h.matrixWorldInverse, r.matrixWorld), b.renderImmediateObject(h, g.__lights, u, c, r));
        var v = b.getClearColor(),
            w = b.getClearAlpha();
        a.clearColor(v.r, v.g, v.b, w), a.enable(a.BLEND)
    }
}, THREE.ShaderFlares = {
    lensFlareVertexTexture: {
        vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    },
    lensFlare: {
        vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    }
}, THREE.ShaderSprite = {
    sprite: {
        vertexShader: "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
    }
}