! function (c) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = c();
  else {
    if ('function' == typeof define && define.amd) define([], c);
    else('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this).buffer = c();
  }
}(function () {
  return function () {
    return function a(b, c, d) {
      function g(k, l) {
        if (!c[k]) {
          if (!b[k]) {
            var m = 'function' == typeof require && require;
            if (!l && m) return m(k, true);
            if (h) return h(k, true);
            var p = new Error('Cannot find module \'' + k + '\'');
            throw (p.code = 'MODULE_NOT_FOUND', p);
          }
          var q = c[k] = {
            exports: {}
          };
          b[k][0].call(q.exports, function (v) {
            return g(b[k][1][v] || v);
          }, q, q.exports, a, b, c, d);
        }
        return c[k].exports;
      }
      for (var h = 'function' == typeof require && require, j = 0; j < d.length; j++) g(d[j]);
      return g;
    };
  }()({
    1: [function (a, b, c) {
      ((function (q) {
        'use strict';
        var F = a('base64-js'),
          G = a('ieee754');
        c.Buffer = q;

        c.SlowBuffer = function (ar) {
          if (+ar != ar)
            ar = 0;

          return q.alloc(+ar);
        };

        c.INSPECT_MAX_BYTES = 50;
        var H = 2147483647;

        function J(ar) {
          if (ar > H) throw new RangeError('The value \"' + ar + '\" is invalid for option \"size\"');
          var as = new Uint8Array(ar);
          as.__proto__ = q.prototype;
          return as;
        }

        function q(ar, as, at) {
          if ('number' == typeof ar) {
            if ('string' == typeof as) throw new TypeError('The \"string\" argument must be of type string. Received type number');
            return V(ar);
          }
          return K(ar, as, at);
        }

        function K(ar, as, at) {
          if ('string' == typeof ar) return function (aw, ax) {
            'string' == typeof ax && ax !== '' || (ax = 'utf8');
            if (!q.isEncoding(ax)) throw new TypeError('Unknown encoding: ' + ax);
            var ay = 0 | Y(aw, ax),
              az = J(ay),
              aA = az.write(aw, ax);

            if (aA !== ay)
              az = az.slice(0, aA);

            return az;
          }(ar, as);
          if (ArrayBuffer.isView(ar)) return W(ar);
          if (null == ar) throw TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof ar);
          if (ap(ar, ArrayBuffer) || ar && ap(ar.buffer, ArrayBuffer)) return function (aw, ax, ay) {
            if (ax < 0 || aw.byteLength < ax) throw new RangeError('\"offset\" is outside of buffer bounds');
            if (aw.byteLength < ax + (ay || 0)) throw new RangeError('\"length\" is outside of buffer bounds');
            var az;
            az = undefined === ax && undefined === ay ? new Uint8Array(aw) : undefined === ay ? new Uint8Array(aw, ax) : new Uint8Array(aw, ax, ay);
            az.__proto__ = q.prototype;
            return az;
          }(ar, as, at);
          if ('number' == typeof ar) throw new TypeError('The \"value\" argument must not be of type number. Received type number');
          var au = ar.valueOf && ar.valueOf();
          if (null != au && au !== ar) return q.from(au, as, at);
          var av = function (aw) {
            if (q.isBuffer(aw)) {
              var ax = 0 | X(aw.length),
                ay = J(ax);
              return ay.length === 0 ? ay : (aw.copy(ay, 0, 0, ax), ay);
            }
            if (undefined !== aw.length) return 'number' != typeof aw.length || aq(aw.length) ? J(0) : W(aw);
            if (aw.type === 'Buffer' && Array.isArray(aw.data)) return W(aw.data);
          }(ar);
          if (av) return av;
          if ('undefined' != typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof ar[Symbol.toPrimitive]) return q.from(ar[Symbol.toPrimitive]('string'), as, at);
          throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof ar);
        }

        function Q(ar) {
          if ('number' != typeof ar) throw new TypeError('\"size\" argument must be of type number');
          if (ar < 0) throw new RangeError('The value \"' + ar + '\" is invalid for option \"size\"');
        }

        function V(ar) {
          Q(ar);
          return J(ar < 0 ? 0 : 0 | X(ar));
        }

        function W(ar) {
          for (var as = ar.length < 0 ? 0 : 0 | X(ar.length), at = J(as), au = 0; au < as; au += 1) at[au] = 255 & ar[au];
          return at;
        }

        function X(ar) {
          if (ar >= H) throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + H.toString(16) + ' bytes');
          return 0 | ar;
        }

        function Y(ar, as) {
          if (q.isBuffer(ar)) return ar.length;
          if (ArrayBuffer.isView(ar) || ap(ar, ArrayBuffer)) return ar.byteLength;
          if ('string' != typeof ar) throw new TypeError('The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof ar);
          var at = ar.length,
            au = arguments.length > 2 && true === arguments[2];
          if (!au && at === 0) return 0;
          for (var av = false;;) switch (as) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return at;
          case 'utf8':
          case 'utf-8':
            return am(ar).length;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 2 * at;
          case 'hex':
            return at >>> 1;
          case 'base64':
            return an(ar).length;
          default:
            if (av) return au ? -1 : am(ar).length;
            as = ('' + as).toLowerCase();
            av = true;
          }
        }

        function Z(ar, as, at) {
          var au = ar[as];
          ar[as] = ar[at];
          ar[at] = au;
        }

        function a0(ar, as, at, au, av) {
          if (ar.length === 0) return -1;
          if ('string' == typeof at ? (au = at, at = 0) : at > 2147483647 ? at = 2147483647 : at < -2147483648 && (at = -2147483648), aq(at = +at) && (at = av ? 0 : ar.length - 1), at < 0 && (at = ar.length + at), at >= ar.length) {
            if (av) return -1;
            at = ar.length - 1;
          } else {
            if (at < 0) {
              if (!av) return -1;
              at = 0;
            }
          }
          if ('string' == typeof as && (as = q.from(as, au)), q.isBuffer(as)) return as.length === 0 ? -1 : a1(ar, as, at, au, av);
          if ('number' == typeof as) {
            as &= 255;
            return 'function' == typeof Uint8Array.prototype.indexOf ? av ? Uint8Array.prototype.indexOf.call(ar, as, at) : Uint8Array.prototype.lastIndexOf.call(ar, as, at) : a1(ar, [as], at, au, av);
          }
          throw new TypeError('val must be string, number or Buffer');
        }

        function a1(ar, as, at, au, av) {
          var aw, ax = 1,
            ay = ar.length,
            az = as.length;
          if (undefined !== au && ((au = String(au).toLowerCase()) === ('ucs2') || au === 'ucs-2' || au === 'utf16le' || au === 'utf-16le')) {
            if (ar.length < 2 || as.length < 2) return -1;
            ax = 2;
            ay /= 2;
            az /= 2;
            at /= 2;
          }

          function aA(aE, aF) {
            return ax === 1 ? aE[aF] : aE.readUInt16BE(aF * ax);
          }
          if (av) {
            var aB = -1;
            for (aw = at; aw < ay; aw++)
              if (aA(ar, aw) === aA(as, -1 === aB ? 0 : aw - aB)) {
                if (-1 === aB && (aB = aw), aw - aB + 1 === az) return aB * ax;
              } else {
                if (-1 !== aB)
                  aw -= aw - aB;

                aB = -1;
              }
          } else
            for (at + az > ay && (at = ay - az), aw = at; aw >= 0; aw--) {
              for (var aC = true, aD = 0; aD < az; aD++)
                if (aA(ar, aw + aD) !== aA(as, aD)) {
                  aC = false;
                  break;
                } if (aC) return aw;
            }
          return -1;
        }

        function a2(ar, as, at, au) {
          at = Number(at) || 0;
          var av = ar.length - at;
          au ? (au = Number(au)) > av && (au = av) : au = av;
          var aw = as.length;

          if (au > aw / 2)
            au = aw / 2;

          for (var ax = 0; ax < au; ++ax) {
            var ay = parseInt(as.substr(2 * ax, 2), 16);
            if (aq(ay)) return ax;
            ar[at + ax] = ay;
          }
          return ax;
        }

        function a3(ar, as, at, au) {
          return ao(am(as, ar.length - at), ar, at, au);
        }

        function a4(ar, as, at, au) {
          return ao(function (av) {
            for (var aw = [], ax = 0; ax < av.length; ++ax) aw.push(255 & av.charCodeAt(ax));
            return aw;
          }(as), ar, at, au);
        }

        function a5(ar, as, at, au) {
          return a4(ar, as, at, au);
        }

        function a6(ar, as, at, au) {
          return ao(an(as), ar, at, au);
        }

        function a7(ar, as, at, au) {
          return ao(function (av, aw) {
            for (var ax, ay, az, aA = [], aB = 0; aB < av.length && !((aw -= 2) < 0); ++aB) {
              ax = av.charCodeAt(aB);
              ay = ax >> 8;
              az = ax % 256;
              aA.push(az);
              aA.push(ay);
            }
            return aA;
          }(as, ar.length - at), ar, at, au);
        }

        function a8(ar, as, at) {
          return as === 0 && at === ar.length ? F.fromByteArray(ar) : F.fromByteArray(ar.slice(as, at));
        }

        function a9(ar, as, at) {
          at = Math.min(ar.length, at);
          for (var au = [], av = as; av < at;) {
            var aw, ax, ay, az, aA = ar[av],
              aB = null,
              aC = aA > 239 ? 4 : aA > 223 ? 3 : aA > 191 ? 2 : 1;
            if (av + aC <= at) switch (aC) {
            case 1:
              if (aA < 128)
                aB = aA;

              break;
            case 2:
              if (128 == (192 & (aw = ar[av + 1])) && (az = (31 & aA) << 6 | 63 & aw) > 127)
                aB = az;

              break;
            case 3:
              aw = ar[av + 1];
              ax = ar[av + 2];

              if (128 == (192 & aw) && 128 == (192 & ax) && (az = (15 & aA) << 12 | (63 & aw) << 6 | 63 & ax) > 2047 && (az < 55296 || az > 57343))
                aB = az;

              break;
            case 4:
              aw = ar[av + 1];
              ax = ar[av + 2];
              ay = ar[av + 3];

              if (128 == (192 & aw) && 128 == (192 & ax) && 128 == (192 & ay) && (az = (15 & aA) << 18 | (63 & aw) << 12 | (63 & ax) << 6 | 63 & ay) > 65535 && az < 1114112)
                aB = az;
            }
            aB === null ? (aB = 65533, aC = 1) : aB > 65535 && (aB -= 65536, au.push(aB >>> 10 & 1023 | 55296), aB = 56320 | 1023 & aB);
            au.push(aB);
            av += aC;
          }
          return function (aD) {
            var aE = aD.length;
            if (aE <= aa) return String.fromCharCode.apply(String, aD);
            var aF = '',
              aG = 0;
            for (; aG < aE;) aF += String.fromCharCode.apply(String, aD.slice(aG, aG += aa));
            return aF;
          }(au);
        }
        c.kMaxLength = H;

        q.TYPED_ARRAY_SUPPORT = function () {
          try {
            var ar = new Uint8Array(1);

            ar.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function () {
                return 42;
              }
            };

            return ar.foo() === 42;
          } catch (as) {
            return false;
          }
        }();

        q.TYPED_ARRAY_SUPPORT || 'undefined' == typeof console || 'function' != typeof console.error || console.error('This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.');

        Object.defineProperty(q.prototype, 'parent', {
          enumerable: true,
          get: function () {
            if (q.isBuffer(this)) return this.buffer;
          }
        });

        Object.defineProperty(q.prototype, 'offset', {
          enumerable: true,
          get: function () {
            if (q.isBuffer(this)) return this.byteOffset;
          }
        });

        if ('undefined' != typeof Symbol && null != Symbol.species && q[Symbol.species] === q) Object.defineProperty(q, Symbol.species, {
          value: null,
          configurable: true,
          enumerable: false,
          writable: false
        });

        q.poolSize = 8192;

        q.from = function (ar, as, at) {
          return K(ar, as, at);
        };

        q.prototype.__proto__ = Uint8Array.prototype;
        q.__proto__ = Uint8Array;

        q.alloc = function (ar, as, at) {
          return function (au, av, aw) {
            Q(au);
            return au <= 0 ? J(au) : undefined !== av ? 'string' == typeof aw ? J(au).fill(av, aw) : J(au).fill(av) : J(au);
          }(ar, as, at);
        };

        q.allocUnsafe = function (ar) {
          return V(ar);
        };

        q.allocUnsafeSlow = function (ar) {
          return V(ar);
        };

        q.isBuffer = function (ar) {
          return null != ar && true === ar._isBuffer && ar !== q.prototype;
        };

        q.compare = function (ar, as) {
          if (ap(ar, Uint8Array) && (ar = q.from(ar, ar.offset, ar.byteLength)), ap(as, Uint8Array) && (as = q.from(as, as.offset, as.byteLength)), !q.isBuffer(ar) || !q.isBuffer(as)) throw new TypeError('The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array');
          if (ar === as) return 0;
          for (var at = ar.length, au = as.length, av = 0, aw = Math.min(at, au); av < aw; ++av)
            if (ar[av] !== as[av]) {
              at = ar[av];
              au = as[av];
              break;
            } return at < au ? -1 : au < at ? 1 : 0;
        };

        q.isEncoding = function (ar) {
          switch (String(ar).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
          }
        };

        q.concat = function (ar, as) {
          if (!Array.isArray(ar)) throw new TypeError('\"list\" argument must be an Array of Buffers');
          if (ar.length === 0) return q.alloc(0);
          var at;
          if (undefined === as)
            for (as = 0, at = 0; at < ar.length; ++at) as += ar[at].length;
          var au = q.allocUnsafe(as),
            av = 0;
          for (at = 0; at < ar.length; ++at) {
            var aw = ar[at];
            if (ap(aw, Uint8Array) && (aw = q.from(aw)), !q.isBuffer(aw)) throw new TypeError('\"list\" argument must be an Array of Buffers');
            aw.copy(au, av);
            av += aw.length;
          }
          return au;
        };

        q.byteLength = Y;
        q.prototype._isBuffer = true;

        q.prototype.swap16 = function () {
          var ar = this.length;
          if (ar % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var as = 0; as < ar; as += 2) Z(this, as, as + 1);
          return this;
        };

        q.prototype.swap32 = function () {
          var ar = this.length;
          if (ar % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var as = 0; as < ar; as += 4) {
            Z(this, as, as + 3);
            Z(this, as + 1, as + 2);
          }
          return this;
        };

        q.prototype.swap64 = function () {
          var ar = this.length;
          if (ar % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var as = 0; as < ar; as += 8) {
            Z(this, as, as + 7);
            Z(this, as + 1, as + 6);
            Z(this, as + 2, as + 5);
            Z(this, as + 3, as + 4);
          }
          return this;
        };

        q.prototype.toString = function () {
          var ar = this.length;
          return ar === 0 ? '' : arguments.length === 0 ? a9(this, 0, ar) : function (as, at, au) {
            var av = false;
            if ((undefined === at || at < 0) && (at = 0), at > this.length) return '';
            if ((undefined === au || au > this.length) && (au = this.length), au <= 0) return '';
            if ((au >>>= 0) <= (at >>>= 0)) return '';
            for (as || (as = 'utf8');;) switch (as) {
            case 'hex':
              return ad(this, at, au);
            case 'utf8':
            case 'utf-8':
              return a9(this, at, au);
            case 'ascii':
              return ab(this, at, au);
            case 'latin1':
            case 'binary':
              return ac(this, at, au);
            case 'base64':
              return a8(this, at, au);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return ae(this, at, au);
            default:
              if (av) throw new TypeError('Unknown encoding: ' + as);
              as = (as + '').toLowerCase();
              av = true;
            }
          }.apply(this, arguments);
        };

        q.prototype.toLocaleString = q.prototype.toString;

        q.prototype.equals = function (ar) {
          if (!q.isBuffer(ar)) throw new TypeError('Argument must be a Buffer');
          return this === ar || q.compare(this, ar) === 0;
        };

        q.prototype.inspect = function () {
          var ar = '',
            as = c.INSPECT_MAX_BYTES;
          ar = this.toString('hex', 0, as).replace(/(.{2})/g, '$1 ').trim();

          if (this.length > as)
            ar += ' ... ';

          return '<Buffer ' + ar + '>';
        };

        q.prototype.compare = function (ar, as, at, au, av) {
          if (ap(ar, Uint8Array) && (ar = q.from(ar, ar.offset, ar.byteLength)), !q.isBuffer(ar)) throw new TypeError('The \"target\" argument must be one of type Buffer or Uint8Array. Received type ' + typeof ar);
          if (undefined === as && (as = 0), undefined === at && (at = ar ? ar.length : 0), undefined === au && (au = 0), undefined === av && (av = this.length), as < 0 || at > ar.length || au < 0 || av > this.length) throw new RangeError('out of range index');
          if (au >= av && as >= at) return 0;
          if (au >= av) return -1;
          if (as >= at) return 1;
          if (this === ar) return 0;
          for (var aw = (av >>>= 0) - (au >>>= 0), ax = (at >>>= 0) - (as >>>= 0), ay = Math.min(aw, ax), az = this.slice(au, av), aA = ar.slice(as, at), aB = 0; aB < ay; ++aB)
            if (az[aB] !== aA[aB]) {
              aw = az[aB];
              ax = aA[aB];
              break;
            } return aw < ax ? -1 : ax < aw ? 1 : 0;
        };

        q.prototype.includes = function (ar, as, at) {
          return -1 !== this.indexOf(ar, as, at);
        };

        q.prototype.indexOf = function (ar, as, at) {
          return a0(this, ar, as, at, true);
        };

        q.prototype.lastIndexOf = function (ar, as, at) {
          return a0(this, ar, as, at, false);
        };

        q.prototype.write = function (ar, as, at, au) {
          if (undefined === as) {
            au = 'utf8';
            at = this.length;
            as = 0;
          } else {
            if (undefined === at && 'string' == typeof as) {
              au = as;
              at = this.length;
              as = 0;
            } else {
              if (!isFinite(as)) throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
              as >>>= 0;
              isFinite(at) ? (at >>>= 0, undefined === au && (au = 'utf8')) : (au = at, at = undefined);
            }
          }
          var av = this.length - as;
          if ((undefined === at || at > av) && (at = av), ar.length > 0 && (at < 0 || as < 0) || as > this.length) throw new RangeError('Attempt to write outside buffer bounds');
          au || (au = 'utf8');
          for (var aw = false;;) switch (au) {
          case 'hex':
            return a2(this, ar, as, at);
          case 'utf8':
          case 'utf-8':
            return a3(this, ar, as, at);
          case 'ascii':
            return a4(this, ar, as, at);
          case 'latin1':
          case 'binary':
            return a5(this, ar, as, at);
          case 'base64':
            return a6(this, ar, as, at);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return a7(this, ar, as, at);
          default:
            if (aw) throw new TypeError('Unknown encoding: ' + au);
            au = ('' + au).toLowerCase();
            aw = true;
          }
        };

        q.prototype.toJSON = function () {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };

        var aa = 4096;

        function ab(ar, as, at) {
          var au = '';
          at = Math.min(ar.length, at);
          for (var av = as; av < at; ++av) au += String.fromCharCode(127 & ar[av]);
          return au;
        }

        function ac(ar, as, at) {
          var au = '';
          at = Math.min(ar.length, at);
          for (var av = as; av < at; ++av) au += String.fromCharCode(ar[av]);
          return au;
        }

        function ad(ar, as, at) {
          var au = ar.length;

          if (!as || as < 0)
            as = 0;

          if (!at || at < 0 || at > au)
            at = au;

          for (var av = '', aw = as; aw < at; ++aw) av += al(ar[aw]);
          return av;
        }

        function ae(ar, as, at) {
          for (var au = ar.slice(as, at), av = '', aw = 0; aw < au.length; aw += 2) av += String.fromCharCode(au[aw] + 256 * au[aw + 1]);
          return av;
        }

        function af(ar, as, at) {
          if (ar % 1 != 0 || ar < 0) throw new RangeError('offset is not uint');
          if (ar + as > at) throw new RangeError('Trying to access beyond buffer length');
        }

        function ag(ar, as, at, au, av, aw) {
          if (!q.isBuffer(ar)) throw new TypeError('\"buffer\" argument must be a Buffer instance');
          if (as > av || as < aw) throw new RangeError('\"value\" argument is out of bounds');
          if (at + au > ar.length) throw new RangeError('Index out of range');
        }

        function ah(ar, as, at, au, av, aw) {
          if (at + au > ar.length) throw new RangeError('Index out of range');
          if (at < 0) throw new RangeError('Index out of range');
        }

        function ai(ar, as, at, au, av) {
          as = +as;
          at >>>= 0;
          av || ah(ar, 0, at, 4);
          G.write(ar, as, at, au, 23, 4);
          return at + 4;
        }

        function aj(ar, as, at, au, av) {
          as = +as;
          at >>>= 0;
          av || ah(ar, 0, at, 8);
          G.write(ar, as, at, au, 52, 8);
          return at + 8;
        }

        q.prototype.slice = function (ar, as) {
          var at = this.length;
          (ar = ~~ar) < 0 ? (ar += at) < 0 && (ar = 0) : ar > at && (ar = at);
          (as = undefined === as ? at : ~~as) < 0 ? (as += at) < 0 && (as = 0) : as > at && (as = at);

          if (as < ar)
            as = ar;

          var au = this.subarray(ar, as);
          au.__proto__ = q.prototype;
          return au;
        };

        q.prototype.readUIntLE = function (ar, as, at) {
          ar >>>= 0;
          as >>>= 0;
          at || af(ar, as, this.length);
          for (var au = this[ar], av = 1, aw = 0; ++aw < as && (av *= 256);) au += this[ar + aw] * av;
          return au;
        };

        q.prototype.readUIntBE = function (ar, as, at) {
          ar >>>= 0;
          as >>>= 0;
          at || af(ar, as, this.length);
          for (var au = this[ar + --as], av = 1; as > 0 && (av *= 256);) au += this[ar + --as] * av;
          return au;
        };

        q.prototype.readUInt8 = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 1, this.length);
          return this[ar];
        };

        q.prototype.readUInt16LE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 2, this.length);
          return this[ar] | this[ar + 1] << 8;
        };

        q.prototype.readUInt16BE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 2, this.length);
          return this[ar] << 8 | this[ar + 1];
        };

        q.prototype.readUInt32LE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 4, this.length);
          return (this[ar] | this[ar + 1] << 8 | this[ar + 2] << 16) + 16777216 * this[ar + 3];
        };

        q.prototype.readUInt32BE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 4, this.length);
          return 16777216 * this[ar] + (this[ar + 1] << 16 | this[ar + 2] << 8 | this[ar + 3]);
        };

        q.prototype.readIntLE = function (ar, as, at) {
          ar >>>= 0;
          as >>>= 0;
          at || af(ar, as, this.length);
          for (var au = this[ar], av = 1, aw = 0; ++aw < as && (av *= 256);) au += this[ar + aw] * av;

          if (au >= (av *= 128))
            au -= Math.pow(2, 8 * as);

          return au;
        };

        q.prototype.readIntBE = function (ar, as, at) {
          ar >>>= 0;
          as >>>= 0;
          at || af(ar, as, this.length);
          for (var au = as, av = 1, aw = this[ar + --au]; au > 0 && (av *= 256);) aw += this[ar + --au] * av;

          if (aw >= (av *= 128))
            aw -= Math.pow(2, 8 * as);

          return aw;
        };

        q.prototype.readInt8 = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 1, this.length);
          return 128 & this[ar] ? -1 * (255 - this[ar] + 1) : this[ar];
        };

        q.prototype.readInt16LE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 2, this.length);
          var at = this[ar] | this[ar + 1] << 8;
          return 32768 & at ? 4294901760 | at : at;
        };

        q.prototype.readInt16BE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 2, this.length);
          var at = this[ar + 1] | this[ar] << 8;
          return 32768 & at ? 4294901760 | at : at;
        };

        q.prototype.readInt32LE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 4, this.length);
          return this[ar] | this[ar + 1] << 8 | this[ar + 2] << 16 | this[ar + 3] << 24;
        };

        q.prototype.readInt32BE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 4, this.length);
          return this[ar] << 24 | this[ar + 1] << 16 | this[ar + 2] << 8 | this[ar + 3];
        };

        q.prototype.readFloatLE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 4, this.length);
          return G.read(this, ar, true, 23, 4);
        };

        q.prototype.readFloatBE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 4, this.length);
          return G.read(this, ar, false, 23, 4);
        };

        q.prototype.readDoubleLE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 8, this.length);
          return G.read(this, ar, true, 52, 8);
        };

        q.prototype.readDoubleBE = function (ar, as) {
          ar >>>= 0;
          as || af(ar, 8, this.length);
          return G.read(this, ar, false, 52, 8);
        };

        q.prototype.writeUIntLE = function (ar, as, at, au) {
          (ar = +ar, as >>>= 0, at >>>= 0, au) || ag(this, ar, as, at, Math.pow(2, 8 * at) - 1, 0);
          var av = 1,
            aw = 0;
          for (this[as] = 255 & ar; ++aw < at && (av *= 256);) this[as + aw] = ar / av & 255;
          return as + at;
        };

        q.prototype.writeUIntBE = function (ar, as, at, au) {
          (ar = +ar, as >>>= 0, at >>>= 0, au) || ag(this, ar, as, at, Math.pow(2, 8 * at) - 1, 0);
          var av = at - 1,
            aw = 1;
          for (this[as + av] = 255 & ar; --av >= 0 && (aw *= 256);) this[as + av] = ar / aw & 255;
          return as + at;
        };

        q.prototype.writeUInt8 = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 1, 255, 0);
          this[as] = 255 & ar;
          return as + 1;
        };

        q.prototype.writeUInt16LE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 2, 65535, 0);
          this[as] = 255 & ar;
          this[as + 1] = ar >>> 8;
          return as + 2;
        };

        q.prototype.writeUInt16BE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 2, 65535, 0);
          this[as] = ar >>> 8;
          this[as + 1] = 255 & ar;
          return as + 2;
        };

        q.prototype.writeUInt32LE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 4, 4294967295, 0);
          this[as + 3] = ar >>> 24;
          this[as + 2] = ar >>> 16;
          this[as + 1] = ar >>> 8;
          this[as] = 255 & ar;
          return as + 4;
        };

        q.prototype.writeUInt32BE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 4, 4294967295, 0);
          this[as] = ar >>> 24;
          this[as + 1] = ar >>> 16;
          this[as + 2] = ar >>> 8;
          this[as + 3] = 255 & ar;
          return as + 4;
        };

        q.prototype.writeIntLE = function (ar, as, at, au) {
          if (ar = +ar, as >>>= 0, !au) {
            var av = Math.pow(2, 8 * at - 1);
            ag(this, ar, as, at, av - 1, -av);
          }
          var aw = 0,
            ax = 1,
            ay = 0;
          for (this[as] = 255 & ar; ++aw < at && (ax *= 256);) {
            if (ar < 0 && ay === 0 && this[as + aw - 1] !== 0)
              ay = 1;

            this[as + aw] = (ar / ax >> 0) - ay & 255;
          }
          return as + at;
        };

        q.prototype.writeIntBE = function (ar, as, at, au) {
          if (ar = +ar, as >>>= 0, !au) {
            var av = Math.pow(2, 8 * at - 1);
            ag(this, ar, as, at, av - 1, -av);
          }
          var aw = at - 1,
            ax = 1,
            ay = 0;
          for (this[as + aw] = 255 & ar; --aw >= 0 && (ax *= 256);) {
            if (ar < 0 && ay === 0 && this[as + aw + 1] !== 0)
              ay = 1;

            this[as + aw] = (ar / ax >> 0) - ay & 255;
          }
          return as + at;
        };

        q.prototype.writeInt8 = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 1, 127, -128);

          if (ar < 0)
            ar = 255 + ar + 1;

          this[as] = 255 & ar;
          return as + 1;
        };

        q.prototype.writeInt16LE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 2, 32767, -32768);
          this[as] = 255 & ar;
          this[as + 1] = ar >>> 8;
          return as + 2;
        };

        q.prototype.writeInt16BE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 2, 32767, -32768);
          this[as] = ar >>> 8;
          this[as + 1] = 255 & ar;
          return as + 2;
        };

        q.prototype.writeInt32LE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 4, 2147483647, -2147483648);
          this[as] = 255 & ar;
          this[as + 1] = ar >>> 8;
          this[as + 2] = ar >>> 16;
          this[as + 3] = ar >>> 24;
          return as + 4;
        };

        q.prototype.writeInt32BE = function (ar, as, at) {
          ar = +ar;
          as >>>= 0;
          at || ag(this, ar, as, 4, 2147483647, -2147483648);

          if (ar < 0)
            ar = 4294967295 + ar + 1;

          this[as] = ar >>> 24;
          this[as + 1] = ar >>> 16;
          this[as + 2] = ar >>> 8;
          this[as + 3] = 255 & ar;
          return as + 4;
        };

        q.prototype.writeFloatLE = function (ar, as, at) {
          return ai(this, ar, as, true, at);
        };

        q.prototype.writeFloatBE = function (ar, as, at) {
          return ai(this, ar, as, false, at);
        };

        q.prototype.writeDoubleLE = function (ar, as, at) {
          return aj(this, ar, as, true, at);
        };

        q.prototype.writeDoubleBE = function (ar, as, at) {
          return aj(this, ar, as, false, at);
        };

        q.prototype.copy = function (ar, as, at, au) {
          if (!q.isBuffer(ar)) throw new TypeError('argument should be a Buffer');
          if (at || (at = 0), au || au === 0 || (au = this.length), as >= ar.length && (as = ar.length), as || (as = 0), au > 0 && au < at && (au = at), au === at) return 0;
          if (ar.length === 0 || this.length === 0) return 0;
          if (as < 0) throw new RangeError('targetStart out of bounds');
          if (at < 0 || at >= this.length) throw new RangeError('Index out of range');
          if (au < 0) throw new RangeError('sourceEnd out of bounds');

          if (au > this.length)
            au = this.length;

          if (ar.length - as < au - at)
            au = ar.length - as + at;

          var av = au - at;
          if (this === ar && 'function' == typeof Uint8Array.prototype.copyWithin) this.copyWithin(as, at, au);
          else {
            if (this === ar && at < as && as < au)
              for (var aw = av - 1; aw >= 0; --aw) ar[aw + as] = this[aw + at];
            else Uint8Array.prototype.set.call(ar, this.subarray(at, au), as);
          }
          return av;
        };

        q.prototype.fill = function (ar, as, at, au) {
          if ('string' == typeof ar) {
            if ('string' == typeof as ? (au = as, as = 0, at = this.length) : 'string' == typeof at && (au = at, at = this.length), undefined !== au && 'string' != typeof au) throw new TypeError('encoding must be a string');
            if ('string' == typeof au && !q.isEncoding(au)) throw new TypeError('Unknown encoding: ' + au);
            if (ar.length === 1) {
              var av = ar.charCodeAt(0);

              if (au === 'utf8' && av < 128 || au === 'latin1')
                ar = av;
            }
          } else if ('number' == typeof ar)
            ar &= 255;
          if (as < 0 || this.length < as || this.length < at) throw new RangeError('Out of range index');
          if (at <= as) return this;
          var aw;
          if (as >>>= 0, at = undefined === at ? this.length : at >>> 0, ar || (ar = 0), 'number' == typeof ar)
            for (aw = as; aw < at; ++aw) this[aw] = ar;
          else {
            var ax = q.isBuffer(ar) ? ar : q.from(ar, au),
              ay = ax.length;
            if (ay === 0) throw new TypeError('The value \"' + ar + '\" is invalid for argument \"value\"');
            for (aw = 0; aw < at - as; ++aw) this[aw + as] = ax[aw % ay];
          }
          return this;
        };

        var ak = /[^+\/0-9A-Za-z-_]/g;

        function al(ar) {
          return ar < 16 ? '0' + ar.toString(16) : ar.toString(16);
        }

        function am(ar, as) {
          var at;
          as = as || 1 / 0;
          for (var au = ar.length, av = null, aw = [], ax = 0; ax < au; ++ax) {
            if ((at = ar.charCodeAt(ax)) > 55295 && at < 57344) {
              if (!av) {
                if (at > 56319) {
                  if ((as -= 3) > -1)
                    aw.push(239, 191, 189);

                  continue;
                }
                if (ax + 1 === au) {
                  if ((as -= 3) > -1)
                    aw.push(239, 191, 189);

                  continue;
                }
                av = at;
                continue;
              }
              if (at < 56320) {
                if ((as -= 3) > -1)
                  aw.push(239, 191, 189);

                av = at;
                continue;
              }
              at = 65536 + (av - 55296 << 10 | at - 56320);
            } else if (av && (as -= 3) > -1)
              aw.push(239, 191, 189);
            if (av = null, at < 128) {
              if ((as -= 1) < 0) break;
              aw.push(at);
            } else {
              if (at < 2048) {
                if ((as -= 2) < 0) break;
                aw.push(at >> 6 | 192, 63 & at | 128);
              } else {
                if (at < 65536) {
                  if ((as -= 3) < 0) break;
                  aw.push(at >> 12 | 224, at >> 6 & 63 | 128, 63 & at | 128);
                } else {
                  if (!(at < 1114112)) throw new Error('Invalid code point');
                  if ((as -= 4) < 0) break;
                  aw.push(at >> 18 | 240, at >> 12 & 63 | 128, at >> 6 & 63 | 128, 63 & at | 128);
                }
              }
            }
          }
          return aw;
        }

        function an(ar) {
          return F.toByteArray(function (as) {
            if ((as = (as = as.split('=')[0]).trim().replace(ak, '')).length < 2) return '';
            for (; as.length % 4 != 0;) as += '=';
            return as;
          }(ar));
        }

        function ao(ar, as, at, au) {
          for (var av = 0; av < au && !(av + at >= as.length || av >= ar.length); ++av) as[av + at] = ar[av];
          return av;
        }

        function ap(ar, as) {
          return ar instanceof as || null != ar && null != ar.constructor && null != ar.constructor.name && ar.constructor.name === as.name;
        }

        function aq(ar) {
          return ar != ar;
        }
      }).call(this, a('buffer').Buffer));
    }, {
      'base64-js': 2,
      buffer: 5,
      ieee754: 3
    }],
    2: [function (b, c, d) {
      'use strict';

      d.byteLength = function (w) {
        var x = q(w),
          y = x[0],
          z = x[1];
        return 3 * (y + z) / 4 - z;
      };

      d.toByteArray = function (w) {
        var x, y, z = q(w),
          A = z[0],
          B = z[1],
          C = new k(function (F, G, H) {
            return 3 * (G + H) / 4 - H;
          }(0, A, B)),
          D = 0,
          E = B > 0 ? A - 4 : A;
        for (y = 0; y < E; y += 4) {
          x = j[w.charCodeAt(y)] << 18 | j[w.charCodeAt(y + 1)] << 12 | j[w.charCodeAt(y + 2)] << 6 | j[w.charCodeAt(y + 3)];
          C[D++] = x >> 16 & 255;
          C[D++] = x >> 8 & 255;
          C[D++] = 255 & x;
        }

        if (B === 2) {
          x = j[w.charCodeAt(y)] << 2 | j[w.charCodeAt(y + 1)] >> 4;
          C[D++] = 255 & x;
        }

        if (B === 1) {
          x = j[w.charCodeAt(y)] << 10 | j[w.charCodeAt(y + 1)] << 4 | j[w.charCodeAt(y + 2)] >> 2;
          C[D++] = x >> 8 & 255;
          C[D++] = 255 & x;
        }

        return C;
      };

      d.fromByteArray = function (w) {
        for (var x, y = w.length, z = y % 3, A = [], B = 0, C = y - z; B < C; B += 16383) A.push(v(w, B, B + 16383 > C ? C : B + 16383));
        z === 1 ? (x = w[y - 1], A.push(g[x >> 2] + g[x << 4 & 63] + '==')) : z === 2 && (x = (w[y - 2] << 8) + w[y - 1], A.push(g[x >> 10] + g[x >> 4 & 63] + g[x << 2 & 63] + '='));
        return A.join('');
      };

      for (var g = [], j = [], k = 'undefined' != typeof Uint8Array ? Uint8Array : Array, l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', m = 0, p = l.length; m < p; ++m) {
        g[m] = l[m];
        j[l.charCodeAt(m)] = m;
      }

      function q(w) {
        var x = w.length;
        if (x % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
        var y = w.indexOf('=');

        if (-1 === y)
          y = x;

        return [y, y === x ? 0 : 4 - y % 4];
      }

      function v(w, x, y) {
        for (var z, A, B = [], C = x; C < y; C += 3) {
          z = (w[C] << 16 & 16711680) + (w[C + 1] << 8 & 65280) + (255 & w[C + 2]);
          B.push(g[(A = z) >> 18 & 63] + g[A >> 12 & 63] + g[A >> 6 & 63] + g[63 & A]);
        }
        return B.join('');
      }
      j['-'.charCodeAt(0)] = 62;
      j['_'.charCodeAt(0)] = 63;
    }, {}],
    3: [function (a, b, c) {
      c.read = function (d, g, j, k, m) {
        var q, v, w = 8 * m - k - 1,
          x = (1 << w) - 1,
          y = x >> 1,
          z = -7,
          A = j ? m - 1 : 0,
          B = j ? -1 : 1,
          C = d[g + A];
        for (A += B, q = C & (1 << -z) - 1, C >>= -z, z += w; z > 0; q = 256 * q + d[g + A], A += B, z -= 8);
        for (v = q & (1 << -z) - 1, q >>= -z, z += k; z > 0; v = 256 * v + d[g + A], A += B, z -= 8);
        if (q === 0) q = 1 - y;
        else {
          if (q === x) return v ? NaN : 1 / 0 * (C ? -1 : 1);
          v += Math.pow(2, k);
          q -= y;
        }
        return (C ? -1 : 1) * v * Math.pow(2, q - k);
      };

      c.write = function (d, j, k, m, q, v) {
        var w, x, z, A = 8 * v - q - 1,
          B = (1 << A) - 1,
          C = B >> 1,
          D = q === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          E = m ? 0 : v - 1,
          F = m ? 1 : -1,
          G = j < 0 || j === 0 && 1 / j < 0 ? 1 : 0;
        for (j = Math.abs(j), isNaN(j) || j === 1 / 0 ? (x = isNaN(j) ? 1 : 0, w = B) : (w = Math.floor(Math.log(j) / Math.LN2), j * (z = Math.pow(2, -w)) < 1 && (w--, z *= 2), (j += w + C >= 1 ? D / z : D * Math.pow(2, 1 - C)) * z >= 2 && (w++, z /= 2), w + C >= B ? (x = 0, w = B) : w + C >= 1 ? (x = (j * z - 1) * Math.pow(2, q), w += C) : (x = j * Math.pow(2, C - 1) * Math.pow(2, q), w = 0)); q >= 8; d[k + E] = 255 & x, E += F, x /= 256, q -= 8);
        for (w = w << q | x, A += q; A > 0; d[k + E] = 255 & w, E += F, w /= 256, A -= 8);
        d[k + E - F] |= 128 * G;
      };
    }, {}],
    4: [function (a, b, c) {
      arguments[4][2][0].apply(c, arguments);
    }, {
      dup: 2
    }],
    5: [function (a, b, c) {
      arguments[4][1][0].apply(c, arguments);
    }, {
      'base64-js': 4,
      buffer: 5,
      dup: 1,
      ieee754: 6
    }],
    6: [function (a, b, c) {
      arguments[4][3][0].apply(c, arguments);
    }, {
      dup: 3
    }]
  }, {}, [1])(1);
});