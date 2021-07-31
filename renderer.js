var camera = new(class {
        constructor() {
            this.mode = 0;
            this.x = 0;
            this.y = 0;
            this.scale = 0;
            this.zoomValue = 0.1;
        }
        calcPosition() {
            var a = 0,
                b = 0,
                d = 0;
            for (var e of application.tabs) {
                if (e.play)
                    d++;

                this.setScale(e);
            }
            for (let h = 0; h < application.tabs.length; h++) {
                if (!application.tabs[h] || !application.tabs[h].play) continue;
                const j = application.tabs[h];
                a += j.viewX / d;
                b += j.viewY / d;
            }

            if (d == 0) {
                a = application.tabs[application.activeTab].viewX;
                b = application.tabs[application.activeTab].viewY;
            }

            for (var e of application.tabs) {
                e.playerX = e.viewX;
                e.playerY = e.viewY;
                if (settings.cameraDelay === 0) {
                    this.camX = (this.camX + a) / 2;
                    this.camY = (this.camY + b) / 2;
                    e.viewX = this.camX;
                    e.viewY = this.camY;
                } else {
                    if (settings.cameraDelay !== 0) {
                        var f = settings.cameraDelay,
                            g = settings.cameraDelay - 1;
                        this.camX = (g * this.camX + a) / f;
                        this.camY = (g * this.camY + b) / f;
                        e.viewX = this.camX;
                        e.viewY = this.camY;
                    } else if (!d) {
                        this.camX = (29 * this.camX + a) / 30;
                        this.camY = (29 * this.camY + b) / 30;
                    }
                }
            }
        }
        calcScale() {}
    })(),
    drawRender = {
        canvas: null,
        ctx: null,
        canvasWidth: 0,
        canvasHeight: 0,
        camX: 0,
        camY: 0,
        scale: 1,
        zoomValue: 0.1,
        mouseClientX: 0,
        mouseClientY: 0,
        fpsLastRequest: null,
        renderedFrames: 0,
        renderedObjects: 0,
        fps: 0,
        pi2: 2 * Math.PI,
        battleAreaMap: null,
        battleAreaMapCtx: null,
        pieChart: null,
        pellet: null,
        indicator: null,
        foodIsHidden: false,
        nickCache: {},
        massCache: {},
        polygonCache: null,
        cellsFrame: [],
        foodFrame: [],
        virusesFrame: [],
        setCanvas() {
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
        },
        resizeCanvas() {
            this.canvasWidth = window.innerWidth * settings.renderQuality;
            this.canvasHeight = window.innerHeight * settings.renderQuality;
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        },
        setCursorPosition(a) {
            a.cursorX = (this.mouseClientX - this.canvasWidth / 2) / this.scale + this.camX;
            a.cursorY = (this.mouseClientY - this.canvasHeight / 2) / this.scale + this.camY;
        },
        setCursorPositionKeepPos(a) {
            a.cursorX = (a._mouseClientX - this.canvasWidth / 2) / a._scale + a._camX;
            a.cursorY = (a._mouseClientY - this.canvasHeight / 2) / a._scale + a._camY;
        },
        setZoom(a) {
            this.zoomValue = this.zoomValue * (settings.zoomSpeedValue ** (a.wheelDelta / -120 || a.detail || 0));

            if (this.zoomValue > 1 / this.scale)
                this.zoomValue = 1 / this.scale;

            if (this.zoomValue < 0.00008 / this.scale)
                this.zoomValue = 0.00008 / this.scale;
        },
        setView() {
            var a = 0,
                b = 0,
                d = 0,
                e = 0;
            for (var f of application.tabs) {
                if (f.play)
                    d++;
            }
            settings.autoZoom ? application.tab.slave && application.tab.master ? application.tab.slave.playerSize > application.tab.master.playerSize ? this.calcAutoScale(application.tab.slave) : this.calcAutoScale(application.tab.master) : this.calcAutoScale(application.tab.master) : this.calcScale();
            for (let j = 0; j < application.tabs.length; j++) {
                if (!application.tabs[j].play) continue;
                const k = application.tabs[j];
                a += k.viewX / d;
                b += k.viewY / d;
            }

            if (!settings.mbCenterCamera || d === 0) {
                a = application.tabs[0].viewX;
                b = application.tabs[0].viewY;
            }

            if (application.play) {
                if (settings.cameraDelay === 0) {
                    this.camX = (this.camX + a) / 2;
                    this.camY = (this.camY + b) / 2;
                } else {
                    var g = settings.cameraDelay,
                        h = settings.cameraDelay - 1;
                    this.camX = (h * this.camX + a) / g;
                    this.camY = (h * this.camY + b) / g;
                }
            } else {
                this.camX = (29 * this.camX + a) / 30;
                this.camY = (29 * this.camY + b) / 30;
            }
            for (var f of application.tabs) {
                f.playerX = f.viewX;
                f.playerY = f.viewY;
            }
        },
        getZoom() {
            return Math.max(this.canvasWidth / 1080, this.canvasHeight / 1920) * this.zoomValue;
        },
        setScale(a) {
            let b = settings.zoomSmoothness,
                c = b - 1;
            if (!settings.autoZoom) {
                this.scale = (c * this.scale + this.getZoom()) / b;
                return;
            }
            a.play ? this.scale = (c * this.scale + Math.min(64 / a.playerSize, 1) ** 0.2 * this.getZoom()) / b : this.scale = (c * this.scale + a.scale * this.getZoom()) / b;
        },
        calcScale() {
            let a = settings.zoomSmoothness,
                b = a - 1;
            this.scale = (b * this.scale + this.getZoom()) / a;
        },
        calcAutoScale(a) {
            let b = settings.zoomSmoothness,
                c = b - 1;
            a.play ? this.scale = (c * this.scale + Math.min(64 / a.playerSize, 1) ** 0.2 * this.getZoom()) / b : this.scale = (c * this.scale + a.scale * this.getZoom()) / b;
        },
        reverseCheckView(a, b) {
            for (let c = b - 1; - 1 < c; c--) {
                if (application.tabs[c].isInViewHSLO(a)) return true;
            }
            return false;
        },
        sleep(a) {
            return new Promise(b => setTimeout(b, a));
        },
        renderFrame() {
            drawRender.countFps();
            this.renderedObjects = 0;
            const a = application.tab.master;
            for (let q = 0, r = application.tabs.length; r > q; q++) {
                application.tabs[q].time = Date.now();
                for (var b = 0, c = application.tabs[q].cells.length; b < c; b++) {
                    application.tabs[q].cells[b].moveCell();
                    if (!this.reverseCheckView(application.tabs[q].cells[b], q)) {
                        this.cellsFrame.push(application.tabs[q].cells[b]);
                        if (application.tabs[q].cells[b].isVirus) this.virusesFrame.push(application.tabs[q].cells[b]);
                    }
                }
                if (application.tabs[q].playerCells.length) application.tabs[q].calculatePlayerMassAndPosition();
            }
            this.cellsFrame.sort((s, t) => s.size === t.size ? s.id - t.id : s.size - t.size);
            this.setView();
            for (var d of application.tabs) {
                if (!d) continue;

                if (application.tabs.indexOf(d) === 0)
                    this.setCursorPosition(d);
            }
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            if (settings.showGrid)
                this.drawGrid(this.ctx, this.canvasWidth, this.canvasHeight, this.scale, this.camX, this.camY);

            this.ctx.save();
            this.ctx.translate(~~this.canvasWidth >> 1, ~~this.canvasHeight >> 1);
            this.ctx.scale(this.scale, this.scale);
            this.ctx.translate(-this.camX, -this.camY);

            if (a.mapOffsetFixed === true && Settings.customMapTextureCanvas.complet === true) {
                if (settings.showGrid === true)
                    this.ctx.globalCompositeOperation = 'destination-over';

                if (settings.showBgImg) {
                    this.ctx.globalAlpha = theme.bgOpacity;
                    this.ctx.drawImage(Settings.customMapTextureCanvas, a.mapMinX, a.mapMaxY, a.mapMaxX - a.mapMinX, a.mapMinY - a.mapMaxY);
                }

                if (settings.showGrid === true)
                    this.ctx.globalCompositeOperation = 'source-over';
            }

            if (settings.showBgSectors === true)
                this.drawSectors(this.ctx, a.mapOffsetFixed, theme.sectorsX, theme.sectorsY, a.mapMinX, a.mapMinY, a.mapMaxX, a.mapMaxY, theme.gridColor, theme.sectorsColor, theme.sectorsWidth, true);

            if (a.mapOffsetFixed === true && Settings.customMapLogoCanvas.complet === true) {
                this.ctx.globalAlpha = 0.2;
                var e = (a.mapMaxX - a.mapMinX) / 5 * 2.2,
                    f = (a.mapMinY - a.mapMaxY) / 5 * 2.2;
                this.ctx.drawImage(Settings.customMapLogoCanvas, a.mapMinX + e, a.mapMaxY + f, (a.mapMaxX - a.mapMinX) / 8.5, (a.mapMinY - a.mapMaxY) / 8.5);
                this.ctx.globalAlpha = 1;
            }

            if (a.gameMode === ':battleroyale')
                this.drawBattleArea(this.ctx);

            if (settings.showMapBorders === true) {
                const s = theme.bordersWidth >> 1;
                this.drawMapBorders(this.ctx, a.mapOffsetFixed, a.mapMinX - s, a.mapMinY - s, a.mapMaxX + s, a.mapMaxY + s, theme.bordersColor, theme.bordersWidth);
            }

            if (settings.virusesRange === true)
                this.drawVirusesRange(this.ctx, this.virusesFrame);

            for (let t = 0, u = application.tabs.length; u > t; t++) {
                if (application.tabs[t].type >= 3) continue;
                this.drawFood(application.tabs[t], t);
            }
            for (let v = 0, w = application.tabs.length; w > v; v++) {
                const x = application.tabs[v];

                if (settings.debug)
                    this.drawViewport(this.ctx, 'Bound ' + application.tabs[v].tabName, x.bound.left, x.bound.bottom, x.bound.right, x.bound.top, 'red', 20);

                if (x && x.play && v === 0) {
                    if (settings.splitRange)
                        this.drawSplitRange(this.ctx, x.biggerSTECellsCache, x.playerCells, tempsett.selectBiggestCell);

                    if (settings.oppRings)
                        this.drawOppRings(this.ctx, this.scale, x.biggerSTECellsCache, x.biggerCellsCache, x.smallerCellsCache, x.STECellsCache);

                    if (settings.cursorTracking)
                        this.drawCursorTracking(this.ctx, x.playerCells, x.cursorX, x.cursorY);
                }
            }

            if (application.ghostCells.length)
                this.drawGhostCells(application);

            for (let y = 0, z = application.tabs.length; z > y; y++) {
                for (let A = 0; application.tabs[y].removedCells.length > A; A++) {
                    this.renderedObjects++;
                    application.tabs[y].removedCells[A].draw(this.ctx, true);
                }
                this.ctx.closePath();
            }
            for (let B = 0, C = this.cellsFrame.length; C > B; B++) {
                if (this.isInDisplay(this.cellsFrame[B].targetX, this.cellsFrame[B].targetY, this.cellsFrame[B].size) === false) continue;
                this.renderedObjects++;
                this.cellsFrame[B].draw(this.ctx, undefined, application.tabs[1]);
            }
            this.cellsFrame = [];
            this.foodFrame = [];
            this.virusesFrame = [];
            if (settings.debug) {
                var g = [
                        [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, 0]
                        ]
                    ],
                    h = [
                        [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, 0]
                        ]
                    ];
                for (var b = 0; application.tabs.length > b; b++) {
                    var d = application.tabs[b];
                    if (!d) continue;
                    continue;
                    var d = application.tabs[b < 2 && Number(!application.activeTab) || b];
                    if (!d) continue;
                    var k = d.protocol_viewX - d.viewportW2s,
                        l = d.protocol_viewY - d.viewportH2s,
                        m = d.protocol_viewX + d.viewportW2s,
                        n = d.protocol_viewY + d.viewportH2s;
                    d.unavailableViewport = h;
                    var o = [
                        [
                            [k, l],
                            [k, n],
                            [m, n],
                            [m, l]
                        ]
                    ];
                    g = polygonClipping.difference(o, h);
                    h = polygonClipping.union(o, h);
                }
            }
            Texts.cleaner();
            this.ctx.restore();

            if (a.gameMode === ':teams')
                if (this.pieChart && this.pieChart.width)
                    this.ctx.drawImage(this.pieChart, this.canvasWidth - this.pieChart.width - 10, 10);

            if (settings.debug) {
                this.ctx.fillStyle = 'white';
                this.ctx.font = '15px sans-serif';
                this.ctx.textAlign = 'start';
                var p = this.canvasHeight / 2;
                this.ctx.fillText('playerID: ' + comm.playerID, 50, p += 25);
                this.ctx.fillText('isFreeSpectate: ' + a.isFreeSpectate, 50, p += 25);
                this.ctx.fillText('isSpectateEnabled: ' + a.isSpectateEnabled, 50, p += 25);
                this.ctx.fillText('realQuadrant: ' + a.realQuadrant, 50, p += 25);
                this.ctx.fillText('lastQuadrant: ' + a.lastQuadrant, 50, p += 25);
                this.ctx.fillText('quadrant: ' + a.quadrant, 50, p += 25);
                this.ctx.fillText('comm.lastMostLike: ' + comm.lastMostLike, 50, p += 25);
                this.ctx.fillText('renderedObjects: ' + this.renderedObjects, 50, p += 25);
            }
        },
        renderFrame2() {
            drawRender.countFps();
            this.renderedObjects = 0;
            const a = application.tab.master;
            for (let e = 0, f = application.tabs.length; f > e; e++) {
                application.tabs[e].time = Date.now();
                for (var b = 0, c = application.tabs[e].cells.length; b < c; b++) {
                    application.tabs[e].cells[b].moveCell();
                    this.cellsFrame.push(application.tabs[e].cells[b]);
                    if (application.tabs[e].cells[b].isVirus) this.virusesFrame.push(application.tabs[e].cells[b]);
                }
                if (application.tabs[e].playerCells.length) application.tabs[e].calculatePlayerMassAndPosition();
            }
            this.cellsFrame.sort((g, h) => g.size === h.size ? g.id - h.id : g.size - h.size);
            this.setView();
            for (var d of application.tabs) {
                if (!d) continue;

                if (application.tabs.indexOf(d) === 0)
                    this.setCursorPosition(d);
            }
            if (settings.showGrid) {}
            this.app.stage.scale = new PIXI.Point(this.scale, this.scale);
            this.app.stage.pivot.x = this.camX;
            this.app.stage.pivot.y = this.camY;
            this.app.stage.x = this.canvasWidth / 2;
            this.app.stage.y = this.canvasHeight / 2;
            for (let g = 0, h = application.tabs.length; h > g; g++) {
                for (let k = 0, l = application.tabs[g].food.length; l > k; k++) {
                    if (this.reverseCheckView(application.tabs[g].food[k], g)) continue;
                    this.renderedObjects++;
                    const m = application.tabs[g].food[k];
                    m.renderPixi();
                }
            }
            for (let n = 0, o = this.cellsFrame.length; o > n; n++) {
                if (this.isInDisplay(this.cellsFrame[n].targetX, this.cellsFrame[n].targetY, this.cellsFrame[n].size) === false) continue;
                this.cellsFrame[n].renderPixi();
            }
            this.cellsFrame = [];
            this.foodFrame = [];
            this.virusesFrame = [];
            this.app.renderer.render(this.app.stage);
            this.graphics.clear();
        },
        renderFrame___() {
            this.renderedObjects = 0;
            for (var a of application.tabs) {
                if (!a) continue;
                a.time = Date.now();
                for (var b = 0, c = a.cells.length; b < c; b++) {
                    a.cells[b].moveCell();
                    a.updateBound();
                    a.updateStaticBound(a.cells[b]);
                }
                if (a.playerCells.length) a.calculatePlayerMassAndPosition();
            }
            this.setView();
            for (var a of application.tabs) {
                if (!a) continue;

                if (application.tabs.indexOf(a) == application.activeTab)
                    this.setCursorPosition(a);

                a.sortCellsBySize();
                a.compareCells();
            }
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            if (settings.showGrid)
                this.drawGrid(this.ctx, this.canvasWidth, this.canvasHeight, this.scale, this.camX, this.camY);

            this.ctx.save();
            this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
            this.ctx.scale(this.scale, this.scale);
            this.ctx.translate(-this.camX, -this.camY);
            a = application.tabs[0];

            if (a.mapOffsetFixed && Settings.customMapTextureCanvas.complet) {
                if (settings.showGrid)
                    this.ctx.globalCompositeOperation = 'destination-over';

                this.ctx.drawImage(Settings.customMapTextureCanvas, a.mapMinX, a.mapMaxY, a.mapMaxX - a.mapMinX, a.mapMinY - a.mapMaxY);

                if (settings.showGrid)
                    this.ctx.globalCompositeOperation = 'source-over';
            }

            if (settings.showBgSectors)
                this.drawSectors(this.ctx, a.mapOffsetFixed, theme.sectorsX, theme.sectorsY, ~~a.mapMinX, ~~a.mapMinY, ~~a.mapMaxX, ~~a.mapMaxY, theme.gridColor, theme.sectorsColor, theme.sectorsWidth, true);

            if (a.mapOffsetFixed && Settings.customMapLogoCanvas.complet) {
                this.ctx.globalAlpha = 0.2;
                var d = (a.mapMaxX - a.mapMinX) / 5 * 2.2,
                    e = (a.mapMinY - a.mapMaxY) / 5 * 2.2;
                this.ctx.drawImage(Settings.customMapLogoCanvas, a.mapMinX + d, a.mapMaxY + e, (a.mapMaxX - a.mapMinX) / 8.5, (a.mapMinY - a.mapMaxY) / 8.5);
                this.ctx.globalAlpha = 1;
            }

            if (a.gameMode === ':battleroyale')
                this.drawBattleArea(this.ctx);

            if (settings.showMapBorders) {
                const o = theme.bordersWidth / 2;
                this.drawMapBorders(this.ctx, a.mapOffsetFixed, a.mapMinX - o, a.mapMinY - o, a.mapMaxX + o, a.mapMaxY + o, theme.bordersColor, theme.bordersWidth);
            }

            application.eachTabByPriority((p, q, r, s) => {
                if (settings.virusesRange)
                    this.drawVirusesRange(this.ctx, p.viruses, p, q);
            });

            application.eachTabByPriority((p, q, r) => {
                this.drawFood(p, q);
            });

            application.eachTabByPriority((p, q, r) => {
                if (p && p.play && r == 0) {
                    if (settings.splitRange)
                        this.drawSplitRange(this.ctx, p.biggerSTECellsCache, p.playerCells, p.selectBiggestCell);

                    if (settings.oppRings)
                        this.drawOppRings(this.ctx, this.scale, p.biggerSTECellsCache, p.biggerCellsCache, p.smallerCellsCache, p.STECellsCache);

                    if (settings.cursorTracking)
                        this.drawCursorTracking(this.ctx, p.playerCells, p.cursorX, p.cursorY);
                }
            });

            application.eachTabByPriority((p, q, r) => {
                if (r == 0)
                    this.drawGhostCells(p, q);
            });

            application.eachTabByPriority((p, q, r) => {
                for (var s = 0; s < p.removedCells.length; s++) {
                    if (q && q.isInViewport(p.removedCells[s].targetX, p.removedCells[s].targetY, 0)) continue;
                    p.removedCells[s].draw(this.ctx, true);
                }
            });

            application.eachTabByPriority((p, q, r, s) => {
                for (const t of p.cells) {
                    if (q) {
                        if (q.isInViewHSLO(t)) continue;
                    }
                    if (!this.isInDisplay(t.targetX, t.targetY, t.size)) continue;
                    this.renderedObjects++;
                    t.draw(this.ctx, undefined, s == application.activeTab && application.tabs[1]);
                }
            });

            if (settings.debug) {
                var f = [
                        [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, 0]
                        ]
                    ],
                    g = [
                        [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, 0]
                        ]
                    ];
                for (var b = 0; application.tabs.length > b; b++) {
                    var a = application.tabs[b];
                    if (!a) continue;
                    continue;
                    var a = application.tabs[b < 2 && Number(!application.activeTab) || b];
                    if (!a) continue;
                    var h = a.protocol_viewX - a.viewportW2s,
                        j = a.protocol_viewY - a.viewportH2s,
                        k = a.protocol_viewX + a.viewportW2s,
                        l = a.protocol_viewY + a.viewportH2s;
                    a.unavailableViewport = g;
                    var m = [
                        [
                            [h, j],
                            [h, l],
                            [k, l],
                            [k, j]
                        ]
                    ];
                    f = polygonClipping.difference(m, g);
                    g = polygonClipping.union(m, g);
                }
            }
            this.ctx.restore();

            if (application.tabs[0].gameMode === ':teams')
                if (this.pieChart && this.pieChart.width)
                    this.ctx.drawImage(this.pieChart, this.canvasWidth - this.pieChart.width - 10, 10);

            if (settings.debug) {
                this.ctx.fillStyle = 'white';
                this.ctx.font = '15px sans-serif';
                this.ctx.textAlign = 'start';
                var n = this.canvasHeight / 2;
                this.ctx.fillText('playerID: ' + comm.playerID, 50, n += 25);
                this.ctx.fillText('isFreeSpectate: ' + application.tabs[0].isFreeSpectate, 50, n += 25);
                this.ctx.fillText('isSpectateEnabled: ' + application.tabs[0].isSpectateEnabled, 50, n += 25);
                this.ctx.fillText('realQuadrant: ' + application.tabs[0].realQuadrant, 50, n += 25);
                this.ctx.fillText('lastQuadrant: ' + application.tabs[0].lastQuadrant, 50, n += 25);
                this.ctx.fillText('quadrant: ' + application.tabs[0].quadrant, 50, n += 25);
                this.ctx.fillText('comm.lastMostLike: ' + comm.lastMostLike, 50, n += 25);
                this.ctx.fillText('renderedObjects: ' + this.renderedObjects, 50, n += 25);
            }
        },
        drawViewport: function(a, b, c, d, e, f, g, h) {
            a.strokeStyle = g;
            a.lineWidth = h;
            a.fillStyle = 'white';
            a.font = '100px sans-serif';
            a.textAlign = 'end';
            a.textBaseline = 'hanging';
            a.beginPath();
            a.moveTo(c, d);
            a.lineTo(e, d);
            a.lineTo(e, f);
            a.lineTo(c, f);
            a.closePath();
            a.stroke();
            a.fillText(b, e, d);
        },
        drawPolygon(a, b, c, d, e) {
            a.lineWidth = e;
            a.strokeStyle = c;
            a.fillStyle = d;
            a.font = '100px sans-serif';
            a.textAlign = 'end';
            a.textBaseline = 'hanging';
            a.beginPath();
            for (var f = 0; b.length > f; f++) {
                var g = b[f][0];
                a.moveTo(g[0][0], g[0][1]);
                for (var k = 1; k < g.length; k++) {
                    a.lineTo(g[k][0], g[k][1]);
                }
                a.lineTo(g[0][0], g[0][1]);
            }
            a.stroke();
            a.closePath();
        },
        poinInPolygon(a, b, c) {
            var d = false;
            for (var e = 0, f = c.length - 1; e < c.length; f = e++) {
                var g = c[e][0],
                    h = c[e][1],
                    k = c[f][0],
                    l = c[f][1],
                    m = h > b != l > b && a < (k - g) * (b - h) / (l - h) + g;
                if (m) d = !d;
            }
            return d;
        },
        pointInCircle: function(a, b, c, d, e) {
            var f = (a - c) * (a - c) + (b - d) * (b - d);
            return f <= e * e;
        },
        isInDisplay: function(a, b, c) {
            const d = (this.canvasWidth >> 1) / this.scale,
                e = (this.canvasHeight >> 1) / this.scale;
            if (a + c < this.camX - d || b + c < this.camY - e || a - c > this.camX + d || b - c > this.camY + e) return false;
            return true;
        },
        setAutoHideCellInfo(a) {
            if (a <= 40 || this.scale < 0.5 && a < 550 && a < 20 / this.scale) return true;
            return false;
        },
        drawRing: function(a, b, c, d, e, f) {
            a.lineWidth = 20;
            a.globalAlpha = e;
            a.strokeStyle = f;
            a.beginPath();
            a.arc(b, c, d - 10, 0, this.pi2, false);
            a.closePath();
            a.stroke();
            a.globalAlpha = 1;
        },
        drawGrid(a, b, c, d, e, f) {
            const g = b / d,
                h = c / d;
            let i = (-e + g / 2) % 50,
                j = (-f + h / 2) % 50;
            a.strokeStyle = theme.gridColor;
            a.globalAlpha = 1 * d;
            a.beginPath();
            for (; i < g; i += 50) {
                a.moveTo(i * d - 0.5, 0);
                a.lineTo(i * d - 0.5, h * d);
            }
            for (; j < h; j += 50) {
                a.moveTo(0, j * d - 0.5);
                a.lineTo(g * d, j * d - 0.5);
            }
            a.stroke();
            a.globalAlpha = 1;
        },
        drawSectors(a, b, c, d, e, f, g, h, i, j, k, l) {
            if (!b && l) return;
            const m = ~~((g - e) / c),
                n = ~~((h - f) / d);
            let o = 0,
                p = 0;
            a.strokeStyle = i;
            a.fillStyle = j;
            a.lineWidth = k;
            if (l || !l && settings.showMiniMapGrid) {
                a.beginPath();
                for (var q = 0; q < c + 1; q++) {
                    o = e + m * q;
                    a.moveTo(q == c ? g : o, f);
                    a.lineTo(q == c ? g : o, h);
                }
                for (var q = 0; q < d + 1; q++) {
                    p = f + n * q;
                    a.moveTo(e - k / 2, q == d ? h : p);
                    a.lineTo(g + k / 2, q == d ? h : p);
                }
                a.stroke();
            } else this.drawMapBorders(a, b, e, f, g, h, i, k);
            l ? a.font = theme.sectorsFontWeight + ' ' + theme.sectorsFontSize + 'px ' + theme.sectorsFontFamily : a.font = theme.miniMapFontWeight + ' ' + ~~(0.4 * n) + 'px ' + theme.miniMapFontFamily;
            a.textAlign = 'center';
            a.textBaseline = 'middle';
            for (var q = 0; q < d; q++) {
                for (let r = 0; r < c; r++) {
                    const s = String.fromCharCode(65 + q) + (r + 1);
                    o = ~~(e + m / 2 + r * m);
                    p = ~~(f + n / 2 + q * n);
                    a.fillText(s, o, p);
                }
            }
        },
        drawMapBorders(a, b, c, d, e, f, g, h) {
            if (!b) return;
            a.save();
            a.strokeStyle = g;
            a.lineWidth = h;
            a.beginPath();
            a.moveTo(c, d);
            a.lineTo(e, d);
            a.lineTo(e, f);
            a.lineTo(c, f);
            if (settings.bordersGlow) {
                a.shadowBlur = theme.bordersGlowSize;
                a.shadowColor = theme.bordersGlowColor;
            }
            a.closePath();
            a.stroke();
            a.restore();
        },
        drawVirusesRange(a, b, c, d) {
            if (!b || !b.length) return;
            a.beginPath();
            for (let e = 0; e < b.length; e++) {
                const f = b[e].x,
                    g = b[e].y,
                    h = b[e].size + 820;
                a.moveTo(f, g);
                a.arc(f, g, h, 0, this.pi2, false);
            }
            a.fillStyle = theme.virusColor;
            a.globalAlpha = 0.1;
            a.fill();
            a.globalAlpha = 1;
        },
        drawFood(a, b) {
            if (!a || !tempsett.showFood || settings.autoHideFoodOnZoom && this.scale < 0.2) return;
            if (settings.autoHideFood && !tempsett.foodIsHidden && a.playerMass > 1000) {
                tempsett.showFood = false;
                tempsett.foodIsHidden = true;
                return;
            }
            if (!settings.rainbowFood) {
                this.drawCachedFood(this.ctx, a, b);
                return;
            }
            for (let c = 0; c < a.food.length; c++) {
                this.renderedObjects++;
                a.food[c].draw(this.ctx);
            }
        },
        drawCachedFood(a, b, c) {
            var d = b.food,
                e = settings.experimental1;

            if (!d.length) return;
            a.save();

            if (settings.optimizedFood && this.pellet)
                for (var f = 0; f < d.length; f++) {
                    this.renderedObjects++;

                    a.drawImage(this.pellet, ~~(d[f].x - 10 - theme.foodSize), ~~(d[f].y - 10 - theme.foodSize));
                } else {
                    a.beginPath();
                    if (settings.foodGlow) {
                        a.shadowBlur = 10;
                        a.shadowColor = theme.foodGlowColor;
                    }
                    a.fillStyle = theme.foodColor;
                    a.globalAlpha = 1;
                    for (var f = 0; b.food.length > f; f++) {
                        const g = b.food[f];
                        if (e && !this.isInDisplay(g.x, g.y, g.size)) continue;
                        if (this.reverseCheckView(g, c)) continue;
                        this.renderedObjects++;
                        if (this.scale < 0.16) {
                            const h = g.size + theme.foodSize;
                            a.rect(~~(g.x - h), ~~(g.y - h), h << 1, h << 1);
                            continue;
                        }
                        a.moveTo(~~g.x, ~~g.y);
                        a.arc(~~g.x, ~~g.y, ~~(g.size + theme.foodSize), 0, this.pi2, false);
                    }
                    a.fill();
                }
            a.restore();
        },
        drawCell(a, b, c) {},
        drawSplitRange(a, b, c, d, e) {
            this.drawCircles(a, b, 760, 4, 0.4, '#BE00FF');
            if (c.length) {
                const f = d ? c.length - 1 : 0;
                a.lineWidth = 6;
                a.globalAlpha = theme.darkTheme ? 0.7 : 0.35;
                a.strokeStyle = theme.splitRangeColor;
                a.beginPath();
                a.arc(c[f].x, c[f].y, c[f].size + 760, 0, this.pi2, false);
                a.closePath();
                a.stroke();
            }
            a.globalAlpha = 1;

            if (e)
                b = [];
        },
        drawOppRings(a, b, c, d, e, f, g) {
            const h = 14 + 2 / b,
                i = 12 + 1 / b;
            this.drawCircles(a, c, h, i, 0.75, '#BE00FF');
            this.drawCircles(a, d, h, i, 0.75, '#FF0A00');
            this.drawCircles(a, e, h, i, 0.75, '#00C8FF');
            this.drawCircles(a, f, h, i, 0.75, '#64FF00');

            if (g) {
                c = [];
                d = [];
                e = [];
                f = [];
            }
        },
        drawCursorTracking(a, b, c, d) {
            a.lineWidth = theme.cursorTrackingSize;
            a.globalAlpha = theme.darkTheme ? 0.75 : 0.35;
            a.strokeStyle = theme.cursorTrackingColor;
            a.beginPath();
            for (let e = 0; e < b.length; e++) {
                a.moveTo(b[e].x, b[e].y);
                a.lineTo(c, d);
            }
            a.stroke();
            a.globalAlpha = 1;
        },
        drawCircles(a, b, c, d, e, f) {
            a.lineWidth = d;
            a.globalAlpha = e;
            a.strokeStyle = f;
            for (let g = 0; g < b.length; g++) {
                a.beginPath();
                a.arc(b[g].x, b[g].y, b[g].size + c, 0, this.pi2, false);
                a.closePath();
                a.stroke();
            }
            a.globalAlpha = 1;
        },
        drawDashedCircle(a, b, c, d, e, f, g) {
            const h = this.pi2 / e;
            a.lineWidth = f;
            a.strokeStyle = g;
            for (let i = 0; i < e; i += 2) {
                a.beginPath();
                a.arc(b, c, d - f / 2, i * h, (i + 1) * h, false);
                a.stroke();
            }
        },
        drawTeammatesInd(a, b, c, d) {
            if (!this.indicator) return;
            a.drawImage(this.indicator, b - 45, c - d - 90);
        },
        drawPieChart() {
            if (!this.pieChart)
                this.pieChart = document.createElement('canvas');

            const a = this.pieChart.getContext('2d'),
                b = Math.min(200, 0.3 * this.canvasWidth) / 200;
            this.pieChart.width = 200 * b;
            this.pieChart.height = 240 * b;
            a.scale(b, b);
            const c = ['#333333', '#FF3333', '#33FF33', '#3333FF'];
            for (let d = 0, e = 0; e < Connection.pieChart.length; e++) {
                const f = d + Connection.pieChart[e] * this.pi2;
                a.fillStyle = c[e + 1];
                a.beginPath();
                a.moveTo(100, 140);
                a.arc(100, 140, 80, d, f, false);
                a.fill();
                d = f;
            }
        },
        drawBattleArea(a) {
            if (!Connection.battleRoyale.state) return;
            this.drawDangerArea(a, Connection.battleRoyale.x, Connection.battleRoyale.y, Connection.battleRoyale.radius, Connection.mapMinX, Connection.mapMinY, Connection.mapMaxX - Connection.mapMinX, Connection.mapMaxY - Connection.mapMinY, theme.dangerAreaColor, 0.25);
            this.drawSafeArea(a, Connection.battleRoyale.targetX, Connection.battleRoyale.targetY, Connection.battleRoyale.targetRadius, 40, theme.safeAreaColor);
        },
        drawBattleAreaOnMinimap(a, b, c, d, e, f) {
            if (!Connection.battleRoyale.state) return;

            if (!this.battleAreaMap) {
                this.battleAreaMap = document.createElement('canvas');
                this.battleAreaMapCtx = this.battleAreaMap.getContext('2d');
            }

            this.battleAreaMap.width != b ? (this.battleAreaMap.width = b, this.battleAreaMap.height = c) : this.battleAreaMapCtx.clearRect(0, 0, b, c);
            let g = (Connection.battleRoyale.x + e) * d,
                h = (Connection.battleRoyale.y + f) * d,
                i = Connection.battleRoyale.radius * d;
            this.drawDangerArea(this.battleAreaMapCtx, g, h, i, 0, 0, b, c, theme.dangerAreaColor, 0.25);
            g = ~~((Connection.battleRoyale.targetX + e) * d);
            h = ~~((Connection.battleRoyale.targetY + f) * d);
            i = ~~(Connection.battleRoyale.targetRadius * d);
            this.drawSafeArea(this.battleAreaMapCtx, g, h, i, 2, theme.safeAreaColor);
            a.drawImage(this.battleAreaMap, 0, 0);
        },
        drawDangerArea(a, b, c, d, e, f, g, h, i, j) {
            if (Connection.battleRoyale.radius == Connection.battleRoyale.maxRadius || d <= 0) return;
            a.save();
            a.globalAlpha = j;
            a.fillStyle = i;
            a.fillRect(e, f, g, h);
            a.globalCompositeOperation = 'destination-out';
            a.globalAlpha = 1;
            a.beginPath();
            a.arc(b, c, d, 0, this.pi2, false);
            a.fill();
            a.restore();
        },
        drawSafeArea(a, b, c, d, e, f) {
            if (Connection.battleRoyale.state > 2 || d <= 0) return;
            this.drawDashedCircle(a, b, c, d, 60, e, f);
        },
        drawGhostCells(a, b) {
            if (!settings.showGhostCells) return;
            const c = a.ghostCells;
            this.ctx.beginPath();
            for (let d = 0; d < c.length; d++) {
                if (c[d].inView) continue;
                const e = c[d].x,
                    f = c[d].y;
                if (!this.isInDisplay(e, f, c[d].size)) continue;
                if (c.inView) continue;
                this.renderedObjects++;
                this.ctx.moveTo(e, f);
                this.ctx.arc(e, f, c[d].size, 0, this.pi2, false);
            }
            this.ctx.fillStyle = theme.ghostCellsColor;
            this.ctx.globalAlpha = theme.ghostCellsAlpha;
            this.ctx.shadowColor = theme.ghostCellsColor;
            this.ctx.shadowBlur = 40;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            this.ctx.shadowBlur = 0;
        },
        preDrawPellet() {
            this.pellet = null;
            const a = 10 + theme.foodSize;
            let b = document.createElement('canvas');
            b.width = a * 2;
            b.height = a * 2;
            const c = b.getContext('2d');
            c.arc(a, a, a, 0, this.pi2, false);
            c.fillStyle = theme.foodColor;
            c.fill();
            this.pellet = new Image();
            this.pellet.src = b.toDataURL();
            b = null;
        },
        preDrawIndicator() {
            this.indicator = null;
            let a = document.createElement('canvas');
            a.width = 90;
            a.height = 50;
            const b = a.getContext('2d');
            b.lineWidth = 2;
            b.fillStyle = theme.teammatesIndColor;
            b.strokeStyle = '#000000';
            b.beginPath();
            b.moveTo(0, 0);
            b.lineTo(90, 0);
            b.lineTo(45, 50);
            b.closePath();
            b.fill();
            b.stroke();
            this.indicator = new Image();
            this.indicator.src = a.toDataURL();
            a = null;
        },
        countFps() {
            if (!settings.showStatsFPS) return;
            const a = Date.now();

            if (!this.fpsLastRequest)
                this.fpsLastRequest = a;

            if (a - this.fpsLastRequest >= 1000) {
                this.fps = this.renderedFrames;
                this.renderedFrames = 0;
                this.fpsLastRequest = a;
            }

            this.renderedFrames++;
        },
        render() {
            drawRender.renderFrame2();
            requestAnimationFrame(drawRender.render);
        },
        init() {
            if (this.pix) {
                this.app = new PIXI.Application({
                    transparent: true,
                    antialias: true,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    view: document.getElementById('webgl')
                });

                this.graphics = new PIXI.Graphics();
                this.app.stage.addChild(this.graphics);
            }

            this.setCanvas();
            this.resizeCanvas();
            this.preDrawPellet();
            this.preDrawIndicator();

            function a(b) {
                this.setZoom(b);
            }
            /firefox/i.test(navigator.userAgent) ? document.addEventListener('DOMMouseScroll', a.bind(this)) : document.body.onmousewheel = a.bind(this);

            this.canvas.onmousemove = b => {
                for (let c = 0, d = application.tabs.length; d > c; c++) {
                    this.mouseClientX = b.clientX * settings.renderQuality;
                    this.mouseClientY = b.clientY * settings.renderQuality;

                    if (c == 0)
                        this.setCursorPosition(application.tabs[c]);
                }
            };

            if (!window.pix)
                window.requestAnimationFrame(drawRender.render);

            if (window.pix) this.app.ticker.add(b => {
                drawRender.renderFrame2();
            });

            window.addEventListener('resize', () => {
                this.resizeCanvas();
            });
        }
    };