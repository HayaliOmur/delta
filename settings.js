const eventify = a => {
    a.events = {};

    a.on = function(b, c) {
        if (typeof a.events[b] !== 'object')
            a.events[b] = [];

        a.events[b].push(c);
    };

    a.removeListener = function(b, c) {
        let d;

        if (typeof a.events[b] === 'object') {
            d = a.events[b].indexOf(c);

            if (d > -1)
                a.events[b].splice(d, 1);
        }
    };

    a.emit = function(b) {
        var c, d, e, f = [].slice.call(arguments, 1);
        if (typeof a.events[b] === 'object') {
            d = a.events[b].slice();
            e = d.length;
            for (c = 0; c < e; c++) {
                d[c].apply(a, f);
            }
        }
    };

    a.once = function(b, c) {
        a.on(b, function d() {
            a.removeListener(b, d);
            c.apply(a, arguments);
        });
    };
};
var Debugger = function(a, b, c) {
    var d = {};

    function e() {
        if (a && b.isDebug)
            for (var f in console)
                if (typeof console[f] == 'function') d[f] = console[f].bind(window.console, c || b.toString() + ': ');
                else
                    for (var f in console)
                        if (typeof console[f] == 'function') d[f] = function() {};
        Object.assign(b, d);
    }
    b._isDebug = b.isDebug;

    Object.defineProperty(b, 'isDebug', {
        set: function(f) {
            this._isDebug = f;
            e();
        },
        get: function() {
            return this._isDebug;
        }
    });

    e();
};
(function() {
    var e = {};
    this.tmpl = function f(g, h) {
        var i = !/\W/.test(g) ? e[g] = e[g] || f(document.getElementById(g).innerHTML) : new Function('obj', 'var p=[],print=function(){p.push.apply(p,arguments);};' + 'with(obj){p.push(\'' + g.replace(/[\r\t\n]/g, ' ').split('<%').join('\x09').replace(/((^|%>)[^\t]*)'/g, '$1\x0d').replace(/\t=(.*?)%>/g, '\',$1,\'').split('\x09').join('\');').split('%>').join('p.push(\'').split('\x0d').join('\\\'') + '\');}return p.join(\'\');');
        return h ? i(h) : i;
    };
}());
const ExpImp = new(class {
        constructor() {
            var a = this;
            this.$html = $('#exp-imp');
            this.$saveFile = this.$html.find('#saveFile');
            this.$resetSettings = this.$html.find('#resetSettings');
            this.$inputFile = this.$html.find('#inputFile');

            this.options = {
                ogarioCommands: 'Chat commands',
                ogarioHotkeys: 'Hotkeys',
                ogarioPlayerProfiles: 'Profiles',
                ogarioSettings: 'Settings',
                ogarioThemeSettings: 'Theme'
            };

            let b = '';
            for (let c in this.options) {
                b += '\x0a            <div class=\"input-group-row\">\x0a                <div class=\"input-box-cell\" style=\"width: 100%;\"><div>' + this.options[c] + '</div></div>\x0a                <div class=\"input-box-cell\" style=\"width: 0%; vertical-align: middle;\">\x0a                    <label class=\"switch\">\x0a                    <input id=\"opt-' + c + '\" type=\"checkbox\" checked>\x0a                    <span class=\"slider round\"></span>\x0a                    </label>     \x0a                </div>\x0a            </div>';
            }
            this.$html.append(b);
            this.$saveFile.on('click', () => this.saveJSONFile());
            this.$resetSettings.on('click', () => this.resetSettings());

            this.$inputFile.on('change', () => {
                var d = this.importJSONText,
                    e = new FileReader();

                e.onload = function() {
                    d.bind(a)(this.result);
                };

                e.readAsText(this.$inputFile[0].files[0]);
            });
        }
        saveJSONFile() {
            let a = {
                ogarioCommands: chatCommand,
                ogarioHotkeys: hotkeys,
                ogarioPlayerProfiles: profiles.profiles,
                ogarioSettings: settings,
                ogarioThemeSettings: theme
            };
            for (const f in a) {
                if (a.hasOwnProperty(f)) {
                    const g = this.$html.find('#opt-' + f).prop('checked');

                    if (!g)
                        delete a[f];
                }
            }
            a = JSON.stringify(a);
            var b = new Date(),
                c = function() {
                    var h = document.createElement('a');
                    document.body.appendChild(h);
                    h.style = 'display: none';

                    return function(i, j) {
                        var k = JSON.stringify(i),
                            l = new Blob([k], {
                                type: 'octet/stream'
                            }),
                            m = window.URL.createObjectURL(l);
                        h.href = m;
                        h.download = j;
                        h.click();
                        window.URL.revokeObjectURL(m);
                    };
                }(),
                d = a,
                e = 'delta-settings_' + b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear() + '_' + b.getHours() + '-' + b.getMinutes() + '.json';
            c(d, e);
        }
        importJSONText(a) {
            if (a) {
                a = JSON.parse(a);
                for (const b in a) {
                    if (a.hasOwnProperty(b)) {
                        const c = this.$html.find('#opt-' + b).prop('checked');
                        if (!c) continue;
                        window.localStorage.setItem(b, JSON.stringify(a[b]));
                    }
                }
                window.location.reload();
            }
        }
        resetSettings() {
            if (!confirm('Are you sure?')) return;
            let a = {
                ogarioCommands: chatCommand,
                ogarioHotkeys: hotkeys,
                ogarioPlayerProfiles: profiles.profiles,
                ogarioSettings: settings,
                ogarioThemeSettings: theme
            };
            for (const b in this.options) {
                const c = this.$html.find('#opt-' + b).prop('checked');
                if (!c) continue;
                window.localStorage.removeItem(b);
            }
            window.location.reload();
        }
    })(),
    Settings = {
        menuMainColorCSS: null,
        menuPanelColorCSS: null,
        menuTextlColorCSS: null,
        menuButtonsCSS: null,
        hudCSS: null,
        chatCSS: null,
        chatScaleCSS: null,
        cursorCSS: null,
        customMapTextureCanvas: {},
        customMapTextureLogo: {},
        loadThemeSettings() {
            let a = null;

            if (window.localStorage.getItem('ogarioThemeSettings') !== null)
                a = JSON.parse(window.localStorage.getItem('ogarioThemeSettings'));

            for (const b in theme) {
                if (theme.hasOwnProperty(b)) {
                    if (a && a.hasOwnProperty(b))
                        theme[b] = a[b];

                    if (tempsett.hasOwnProperty(b))
                        tempsett[b] = gameSetupTheme[b];
                }
            }
        },
        saveThemeSettings() {
            window.localStorage.setItem('ogarioThemeSettings', JSON.stringify(theme));
        },
        restoreThemeSettings() {
            if (window.localStorage.getItem('ogarioThemeSettings') !== null) {
                window.localStorage.removeItem('ogarioThemeSettings');
                window.location.reload();
            }
        },
        addCustomCSS(a, b) {
            if (!this[a])
                this[a] = $('<style type=\'text/css\'>').appendTo('head');

            this[a].html(b);
        },
        addPresetBox(a, b, c, d, e) {
            $(a).append('<div class=\"preset-box\"\x0a        <span class=\"title-box\">' + dict(b) + '</span>\x0a        <div class=\"input-group\"><select id=\"' + b + '\" class=\"form-control\"></select>\x0a        </div>\x0a        </div>');
            for (const g in c) {
                if (c.hasOwnProperty(g))
                    $('#' + b).append('<option value=\"' + g + '\">' + c[g].name + '</option>');
            }
            $('#' + b).val(theme[d]);
            const f = this;
            $('#' + b).on('change', function() {
                const h = this.value;
                theme[d] = h;
                f[e](h);
            });
        },
        addColorBox(a, b, c) {
            $(a).append('<div class=\"setting-box\">\x0a            <span class=\"title\">' + dict(b) + ('</span>\x0a            <div class=\"input-group ' + b + '-picker\">\x0a                <input data-cb=\"' + c + '\" id=\"' + b + '\" type=\"text\" value=\"' + theme[b] + '\" class=\"themePicker HEX input\"/>\x0a                <span class=\"input colorpicker-input-addon\"><i></i></span>\x0a            </div>\x0a        </div>'));
        },
        addRgbaColorBox(a, b, c) {
            $(a).append('<div class=\"setting-box\">\x0a                <span class=\"title\">' + dict(b) + ('</span>\x0a                <div class=\"input-group ' + b + '-picker\">\x0a                    <input data-cb=\"' + c + '\" type=\"text\" value=\"' + theme[b] + '\" id=\"' + b + '\" class=\"themePicker RGBA input\"/>\x0a                    <span class=\"input colorpicker-input-addon\"><i></i></span>\x0a                </div>\x0a            </div>'));
        },
        addSliderBoxT(a, b, c, d, e, f) {
            $(a).append('<div class=\"slider-box\">\x0a        <span class=\"title\">' + dict(b) + (':</span>\x0a        <span id=\"' + b + '-value\" class=\"value\">' + theme[b] + '</span>\x0a        <div class=\"input-group\">\x0a            <input id=\"' + b + '-slider\" type=\"range\" min=\"' + c + '\" max=\"' + d + '\" step=\"' + e + '\" value=\"' + theme[b] + '\">\x0a        </div></div>'));
            const g = this;
            $('#' + b + '-slider').on('input', function() {
                const h = parseFloat($(this).val());
                $('#' + b + '-value').text(h);
                theme[b] = h;

                if (g.hasOwnProperty(f))
                    g[f]();
            });
        },
        addInputBoxT(a, b, c, d) {
            $(a).append('<div class=\"input-box\">\x0a            <span class=\"title\">' + dict(b) + '</span>\x0a                <div class=\"input-group\">\x0a                    <input id=\"' + b + '\" class=\"\" placeholder=\"' + c + '\" value=\"' + theme[b] + '\" />\x0a                </div>\x0a        </div>');
            const e = this;
            $('#' + b).on('input', function() {
                theme[b] = this.value;
                e[d]();
            });
        },
        addCursorBox(a, b) {
            b === theme.customCursor ? $(a).append('<div class=\"cursor-box\"><div class=\"active\"><img src=\"' + b + '\"></a></div>') : $(a).append('<div class=\"cursor-box\"><div><img src=\"' + b + '\"></a></div>');
        },
        setFont(a, b) {
            theme[a] = b;
            theme[a + 'Family'] = this.setFontFamily(b);
            theme[a + 'Weight'] = this.setFontWeight(b);
            if (window.Texts) switch (a) {
                case 'namesFont':
                    Texts.setNickCtxFont();
                    break;
                case 'massFont':
                    Texts.setMassCtxFont();
                    break;
            }
        },
        addFontBox(a, b, c) {
            const d = this;
            $(a).append('<div class=\"font-box\"><span class=\"title\">' + dict(b) + '</span>\x0a        <div class=\"input-group\"><select id=\"' + b + '\" class=\"form-control\">\x0a            <option value=\"ubuntu\">Ubuntu</option><option value=\"ubuntu-bold\">Ubuntu Bold</option>\x0a            <option value=\"roboto\">Roboto</option><option value=\"roboto-bold\">Roboto Bold</option>\x0a            <option value=\"oswald\">Oswald</option><option value=\"oswald-bold\">Oswald Bold</option>\x0a            <option value=\"press\">Press Start 2P</option>\x0a            <option value=\"pacifico\">Pacifico</option>\x0a            <option value=\"vcr\">VCR OSD</option>\x0a                 \x0a        </select></div></div>');

            $('#' + b).val(theme[b]).on('change', function() {
                const e = this.value;
                d.setFont(b, e);
                if (c) d[c]();
            });
        },
        setFontFamily(a) {
            if (a.indexOf('roboto') != -1) return 'Roboto';
            else {
                if (a.indexOf('oswald') != -1) return 'Oswald';
                else {
                    if (a.indexOf('press') != -1) return '\'Press Start 2P\'';
                    else {
                        if (a.indexOf('pacifico') != -1) return '\'Pacifico\'';
                        else return a.indexOf('vcr') != -1 ? '\'VCR OSD Mono\'' : 'Ubuntu';
                    }
                }
            }
        },
        setFontWeight(a) {
            if (a.indexOf('bold') != -1) return 700;
            return 400;
        },
        loadSettings() {
            let a = null;

            if (window.localStorage.getItem('ogarioSettings') !== null)
                a = JSON.parse(window.localStorage.getItem('ogarioSettings'));

            for (const b in settings) {
                if (settings.hasOwnProperty(b))
                    if (a && a.hasOwnProperty(b))
                        settings[b] = a[b];
            }
        },
        saveSettings(a, b) {
            window.localStorage.setItem(b, JSON.stringify(a));
        },
        exportSettings() {
            let a = {
                ogarioCommands: chatCommand,
                ogarioHotkeys: hotkeys,
                ogarioPlayerProfiles: profiles,
                ogarioSettings: settings,
                ogarioThemeSettings: theme
            };
            for (const b in a) {
                if (a.hasOwnProperty(b)) {
                    const c = $('#export-' + b).prop('checked');

                    if (!c)
                        delete a[b];
                }
            }
            a = JSON.stringify(a);
            $('#export-settings').val(a);
            $('#import-settings').val('');
            a = null;
        },
        importSettings() {
            $('#import-settings').blur();
            let a = $('#import-settings').val();
            if (a) {
                a = JSON.parse(a);
                for (const b in a) {
                    if (a.hasOwnProperty(b)) {
                        const c = $('#import-' + b).prop('checked');
                        if (!c) continue;
                        window.localStorage.setItem(b, JSON.stringify(a[b]));
                    }
                }
                window.location.reload();
            }
        },
        restoreSettings() {
            if (window.localStorage.getItem('ogarioSettings') !== null) {
                window.localStorage.removeItem('ogarioSettings');
                window.location.reload();
            }
        },
        addOption(a, b) {
            const c = this;
            $('.' + a).append('\x0a\x0a                <div class=\"input-group-row\">\x0a                    <div class=\"input-box-cell\" style=\"width: 100%;\"><div>' + dict(b) + '</div></div>\x0a                    <div class=\"input-box-cell\" style=\"width: 0%; vertical-align: middle;\">\x0a                        <label class=\"switch\">\x0a                        <input id=\"' + b + '\" ' + (settings[b] ? 'checked=\"checked\"' : '') + ' type=\"checkbox\">\x0a                        <span class=\"slider round\"></span>\x0a                        </label>     \x0a                    </div>\x0a                </div>\x0a            \x0a            ');
        },
        addOptions(a, b) {
            const c = this;
            if (!a) return;
            $('#og-options').append('<div class=\"options-box ' + b + '\"><div class=\"option-title menu-main-color\">' + dict(b) + '</div></div>');
            for (const d of a) {
                if (settings.hasOwnProperty(d))
                    $('.' + b).append('\x0a\x0a                <div class=\"input-group-row\">\x0a                    <div class=\"input-box-cell\" style=\"width: 100%;\"><div>' + dict(d) + '</div></div>\x0a                    <div class=\"input-box-cell\" style=\"width: 0%; vertical-align: middle;\">\x0a                        <label class=\"switch\">\x0a                        <input id=\"' + d + '\" ' + (settings[d] ? 'checked=\"checked\"' : '') + ' type=\"checkbox\">\x0a                        <span class=\"slider round\"></span>\x0a                        </label>     \x0a                    </div>\x0a                </div>\x0a            \x0a            ');
            }
        },
        addSelectBox(a, b, c, d, e) {
            $(a).append('<div class=\"preset-box\"><span class=\"title-box\">' + dict(b) + '</span><div class=\"select-wrapper\"><select id=\"' + b + '\" class=\"form-control\"></select></div></div>');
            for (const g in c) {
                if (c.hasOwnProperty(g))
                    $('#' + b).append('<option value=\"' + g + '\">' + c[g].name + '</option>');
            }
            $('#' + b).val(settings[d]);
            const f = this;
            $('#' + b).on('change', function() {
                const h = this.value;
                settings[d] = h;
                f[e](h);
            });
        },
        addInputBox(a, b, c, d) {
            $(a).append('<div class=\"input-box\">\x0a        <span class=\"title\">' + dict(b) + '</span>\x0a            <div class=\"input-group\">\x0a                <input id=\"' + b + '\" class=\"\" placeholder=\"' + c + '\" value=\"' + settings[b] + '\" />\x0a            </div>\x0a        </div>');
            const e = this;
            $('#' + b).on('input', function() {
                settings[b] = this.value;
                e[d]();
                e.saveSettings(settings, 'ogarioSettings');
            });
        },
        addSliderBox(a, b, c, d, e, f) {
            $(a).append('\x0a        <div class=\"input-group-row\">\x0a            <div class=\"input-box-cell\" style=\"width: 70%;\"><div>' + dict(b) + '</div></div>\x0a            <div class=\"input-box-cell\" style=\"width: 0%; vertical-align: middle;\">\x0a                <span id=\"' + b + '-value\" class=\"value\">' + settings[b] + '</span>\x0a            </div>\x0a            <div class=\"input-box-cell\" style=\"width: 30%; vertical-align: middle;\">\x0a                <input class=\"\" id=\"' + b + '-slider\" type=\"range\" min=\"' + c + '\" max=\"' + d + '\" step=\"' + e + '\" value=\"' + settings[b] + '\">   \x0a            </div>\x0a        </div>  \x0a    ');
            const g = this;
            $('#' + b + '-slider').on('input', function() {
                const h = parseFloat($(this).val());
                $('#' + b + '-value').text(h);
                settings[b] = h;
                if (f) g[f]();
                g.saveSettings(settings, 'ogarioSettings');
            });
        },
        addOptionBox(a, b, c, d, e) {
            const f = this;
            var g = '';
            for (const h in c) {
                if (c.hasOwnProperty(h))
                    g += '<option ' + (settings[b] == c[h] ? 'selected' : '') + ' value=\"' + c[h] + '\">' + (dict(h) ? dict(h) : h) + '</option>';
            }
            $(a).append('\x0a            <div class=\"input-group-row\">\x0a                <div class=\"input-box-cell\" style=\"\"><div>' + dict(b) + '</div></div>\x0a                <div class=\"input-box-cell\" style=\"width: 30%;\"><select class=\"\" id=\"' + b + '\" class=\"form-control\">' + g + '</select></div>\x0a            </div>');

            $('#' + b).on('change', function() {
                const i = isNaN(this.value) ? this.value : Number(this.value);
                settings[d] = i;

                if (f[e])
                    f[e](i);

                f.saveSettings(settings, 'ogarioSettings');
            });
        },
        showBotsGUI() {
            settings.showBotsGUI = !settings.showBotsGUI;

        },

        setSettingsMenu() {
            const a = this;

            //this.addOptions([], 'botsGroup');
            //this.addOption('botsGroup', 'showBotsGUI');
            this.addOptions([], 'animationGroup');
            this.addSliderBox('.animationGroup', 'animation', 26, 200, 1);
            this.addOptions([], 'zoomGroup');
            this.addOption('zoomGroup', 'autoZoom');
            this.addSliderBox('.zoomGroup', 'zoomSpeedValue', 0.75, 0.99, 0.01);
            this.addOptions([], 'respGroup');
            this.addOption('respGroup', 'quickResp');
            this.addOption('respGroup', 'autoResp');
            this.addOptions([], 'newGroup');
            this.addOption('newGroup', 'debug');
            this.addOption('newGroup', 'mapGlobalFix');
            this.addOption('newGroup', 'experimental1');
            this.addOptions([], 'namesGroup');
            this.addOptions('namesGroup','randomNicktTrol')
            this.addOption('namesGroup', 'showNames');
            this.addOption('namesGroup', 'autoHideNames');
            this.addOption('namesGroup', 'hideMyName');
            this.addOption('namesGroup', 'hideTeammatesNames');
            this.addOptionBox('.namesGroup', 'namesStroke2', {
                ON: 1,
                OFF: 0,
                BOX: 2
            }, 'namesStroke2', 'clearNickCache');

            this.addSliderBox('.newGroup', 'leaderboardLength', 5, 30, 5);
            this.addSliderBox('.newGroup', 'renderQuality', 0.5, 1.75, 0.25);

            $('#renderQuality-slider').on('change', () => {
                drawRender.setCanvas();
                drawRender.resizeCanvas();
            });

            this.addSliderBox('.newGroup', 'cameraDelay', 0, 15, 1);
            this.addSliderBox('.newGroup', 'zoomSmoothness', 5, 30, 1);
            this.addSliderBox('.newGroup', 'macroFeeding', 10, 160, 10);
            this.addOptions([], 'massGroup');
            this.addOption('massGroup', 'showMass');
            this.addOption('massGroup', 'autoHideMass');
            this.addOption('massGroup', 'hideMyMass');
            this.addOption('massGroup', 'hideEnemiesMass');
            this.addOption('massGroup', 'shortMass');

            this.addOptionBox('.massGroup', 'virMassType', {
                SHORT: 2,
                OFF: 0,
                FULL: 1,
                SIMPLE: 3
            }, 'virMassType', 'clearMassCache');

            this.addOptionBox('.massGroup', 'massStroke2', {
                ON: 1,
                OFF: 0,
                BOX: 2
            }, 'massStroke2', 'clearMassCache');

            this.addSliderBox('.massGroup', 'massUpdateInterval', 20, 700, 20);

            $('#massUpdateInterval-slider').on('change', () => {
                Texts.setMassUpdateInterval();
            });

            this.addOptions([], 'skinsGroup');
            this.addOption('skinsGroup', 'customSkins');
            this.addOption('skinsGroup', 'vanillaSkins');
            this.addOption('skinsGroup', 'preloadSkins');
            this.addOptions([], 'foodGroup');
            this.addOption('foodGroup', 'optimizedFood');
            this.addOption('foodGroup', 'autoHideFood');
            this.addOption('foodGroup', 'autoHideFoodOnZoom');
            this.addOption('foodGroup', 'rainbowFood');
            this.addOption('foodGroup', 'foodGlow');
            this.addOptions([], 'transparencyGroup');
            this.addOption('transparencyGroup', 'myCustomColor');
            this.addOption('transparencyGroup', 'myTransparentSkin');
            this.addOption('transparencyGroup', 'transparentSkins');
            this.addOption('transparencyGroup', 'transparentCells');
            this.addOption('transparencyGroup', 'transparentViruses');
            this.addOptions([], 'gridGroup');
            this.addOption('gridGroup', 'showGrid');
            this.addOption('gridGroup', 'showBgSectors');
            this.addOption('gridGroup', 'showMapBorders');
            this.addOption('gridGroup', 'showBgImg');
            this.addOption('gridGroup', 'bordersGlow');
            this.addOption('gridGroup','rainbowBorders');
            this.addOptions([], 'chatGroup');
            this.addOption('chatGroup', 'disableChat');
            this.addOption('chatGroup', 'chatSounds');
            this.addOption('chatGroup', 'chatEmoticons');
            this.addOption('chatGroup', 'showChatImages');
            this.addOption('chatGroup', 'showChatVideos');
            this.addOption('chatGroup', 'showChatBox');
            this.addOption('chatGroup', 'enableAgartool');

            $('#enableAgartool').on('change', () => {
                setTimeout(() => comm.toggleAgartool(), 3);
            });

            this.addOptions([], 'miniMapGroup');
            this.addOption('miniMapGroup', 'showMiniMap');
            this.addOption('miniMapGroup', 'showMiniMapGrid');
            this.addOption('miniMapGroup', 'showMiniMapGuides');
            this.addOption('miniMapGroup', 'oneColoredTeammates');
            this.addOption('miniMapGroup', 'showMiniMapGhostCells');
            this.addOptions([], 'helpersGroup');
            this.addOption('helpersGroup', 'oppColors');
            this.addOption('helpersGroup', 'oppRings');
            this.addOption('helpersGroup', 'virColors');
            this.addOption('helpersGroup', 'splitRange');
            this.addOption('helpersGroup', 'virusesRange');
            this.addOption('helpersGroup', 'cursorTracking');
            this.addOption('helpersGroup', 'teammatesInd');
            this.addOption('helpersGroup', 'showGhostCells');
            this.addOptions([], 'mouseGroup');

            this.addOptionBox('.mouseGroup', 'mouseLeftFn', {
                none: 'false',
                'hk-split': 'hk-split',
                'hk-macroFeed': 'hk-macroFeed',
                'hk-split16': 'hk-split16',
                'hk-split64': 'hk-split64',
                'hk-doubleSplit': 'hk-doubleSplit',
                'hk-switchPlayer': 'hk-switchPlayer',
                chat_command: 'hk-comm10'
            }, 'mouseLeftFn');

            this.addOptionBox('.mouseGroup', 'mouseRightFn', {
                none: 'false',
                'hk-split': 'hk-split',
                'hk-macroFeed': 'hk-macroFeed',
                'hk-split16': 'hk-split16',
                'hk-split64': 'hk-split64',
                'hk-doubleSplit': 'hk-doubleSplit',
                'hk-switchPlayer': 'hk-switchPlayer',
                chat_command: 'hk-comm10'
            }, 'mouseRightFn');

            this.addOptionBox('.mouseGroup', 'mouseMiddleFn', {
                none: 'false',
                'hk-split16': 'hk-split16',
                'hk-split64': 'hk-split64',
                'hk-split': 'hk-split',
                'hk-macroFeed': 'hk-macroFeed',
                chat_command: 'hk-comm10'
            }, 'mouseMiddleFn');

            this.addOption('mouseGroup', 'mouseInvert');
            this.addOptions([], 'mbGroup');
            this.addOption('mbGroup', 'mbRings');
            this.addOption('mbGroup', 'mbCenterCamera');
            this.addOptions([], 'hudGroup');
            this.addOption('hudGroup', 'showTop5');
            this.addOption('hudGroup', 'showTop5Sectors');
            this.addOption('hudGroup', 'showTargeting');
            this.addOption('hudGroup', 'showLbData');
            this.addOption('hudGroup', 'centeredLb');
            this.addOption('hudGroup', 'normalLb');
            this.addOption('hudGroup', 'fpsAtTop');
            this.addOptions([], 'statsGroup');
            this.addOption('statsGroup', 'showStats');
            this.addOption('statsGroup', 'showStatsMass');
            this.addOption('statsGroup', 'showStatsSTE');
            this.addOption('statsGroup', 'showStatsN16');
            this.addOption('statsGroup', 'showStatsFPS');
            this.addOption('statsGroup', 'showStatsPPS');
            this.addOption('statsGroup', 'showTime');
            this.addInputBox('.sounds-panel', 'messageSound_', 'Sound URL', 'setMessageSound_');
            this.addInputBox('.sounds-panel', 'commandSound_', 'Sound URL', 'setCommandSound_');
            this.addInputBox('.sounds-panel', 'virusSoundURL', 'Sound URL', 'setVirusSound');

            $(document).on('change', '#og-options input[type=\'checkbox\']', function() {
                const b = $(this);
                a.setSettings(b.attr('id'), b.prop('checked'));
            });
        },
        setThemeMenu() {
            const a = this;
            this.addPresetBox('#theme-main', 'themePreset', themePresets, 'preset', 'changeThemePreset');
            this.addColorBox('#theme-main', 'bgColor', 'setBgColor');
            this.addColorBox('#theme-main', 'bordersColor');
            this.addColorBox('#theme-main', 'bordersGlowColor');
            this.addColorBox('#theme-main', 'gridColor');
            this.addColorBox('#theme-main', 'sectorsColor');
            this.addColorBox('#theme-main', 'namesColor', 'clearNickCache');
            this.addColorBox('#theme-main', 'namesStrokeColor', 'clearNickCache');
            this.addColorBox('#theme-main', 'massColor', 'clearMassCache');
            this.addColorBox('#theme-main', 'massStrokeColor', 'clearMassCache');
            this.addColorBox('#theme-main', 'virusColor');
            this.addColorBox('#theme-main', 'virusStrokeColor');
            this.addColorBox('#theme-main', 'mboxActiveCellStroke');
            this.addColorBox('#theme-main', 'foodColor', 'setFoodColor');
            this.addColorBox('#theme-main', 'foodGlowColor');
            this.addColorBox('#theme-main', 'teammatesIndColor', 'setIndicatorColor');
            this.addColorBox('#theme-main', 'cursorTrackingColor');
            this.addColorBox('#theme-main', 'splitRangeColor');
            this.addColorBox('#theme-main', 'safeAreaColor');
            this.addColorBox('#theme-main', 'dangerAreaColor');
            this.addColorBox('#theme-main', 'ghostCellsColor');
            this.addFontBox('#theme-main', 'namesFont');
            this.addFontBox('#theme-main', 'massFont');
            this.addFontBox('#theme-main', 'sectorsFont');
            this.addSliderBoxT('#theme-main', 'cursorTrackingSize', 4, 20, 1);
            this.addSliderBoxT('#theme-main', 'sectorsFontSize', 200, 2000, 10);
            this.addSliderBoxT('#theme-main', 'namesScale', 0.5, 2, 0.1);
            this.addSliderBoxT('#theme-main', 'massScale', 1, 5, 1);
            this.addSliderBoxT('#theme-main', 'virMassScale', 1, 5, 1);
            this.addSliderBoxT('#theme-main', 'strokeScale', 1, 4, 0.1, 'clearTextCache');
            this.addSliderBoxT('#theme-main', 'foodSize', 1, 50, 1, 'setFoodColor');
            this.addSliderBoxT('#theme-main', 'virusStrokeSize', 2, 40, 1);
            this.addSliderBoxT('#theme-main', 'bordersWidth', 2, 200, 2);
            //this.addSliderBoxT('#theme-main', 'bordersGlowSize', 2, 40, 1);
            this.addSliderBoxT('#theme-main', 'sectorsWidth', 2, 200, 2);
            this.addSliderBoxT('#theme-main', 'cellsAlpha', 0.01, 0.99, 0.01);
            this.addSliderBoxT('#theme-main', 'skinsAlpha', 0.01, 0.99, 0.01);
            this.addSliderBoxT('#theme-main', 'virusAlpha', 0, 1, 0.01);
            this.addSliderBoxT('#theme-main', 'textAlpha', 0.1, 1, 0.01);
            this.addPresetBox('#theme-menu', 'menuPreset', themePresets, 'menuPreset', 'changeMenuPreset');
            this.addSliderBoxT('#theme-menu', 'menuOpacity', 0.1, 1, 0.01, 'setMenuOpacity');
            this.addColorBox('#theme-menu', 'menuMainColor', 'setMenuMainColor');
            this.addColorBox('#theme-menu', 'menuBtnTextColor', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'menuPanelColor', 'setMenuPanelColor');
            this.addColorBox('#theme-menu', 'menuPanelColor2', 'setMenuPanelColor');
            this.addColorBox('#theme-menu', 'menuTextColor', 'setMenuTextColor');
            this.addColorBox('#theme-menu', 'menuTextColor2', 'setMenuTextColor');
            this.addColorBox('#theme-menu', 'btn1Color', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn1Color2', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn2Color', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn2Color2', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn3Color', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn3Color2', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn4Color', 'setMenuButtons');
            this.addColorBox('#theme-menu', 'btn4Color2', 'setMenuButtons');
            this.addInputBoxT('#theme-menu', 'menuBg', 'Image URL', 'setMenuBg');
            this.addColorBox('#theme-hud', 'hudMainColor', 'setHudColors');
            this.addRgbaColorBox('#theme-hud', 'hudColor', 'setHudColors');
            this.addColorBox('#theme-hud', 'hudTextColor', 'setHudColors');
            this.addColorBox('#theme-hud', 'statsHudColor', 'setHudColors');
            this.addColorBox('#theme-hud', 'timeHudColor', 'setHudColors');
            this.addColorBox('#theme-hud', 'top5MassColor', 'setHudColors');
            this.addColorBox('#theme-hud', 'lbMeColor', 'setHudColors');
            this.addColorBox('#theme-hud', 'lbTeammateColor', 'setHudColors');
            this.addFontBox('#theme-hud', 'hudFont', 'setHudFont');
            this.addSliderBoxT('#theme-hud', 'hudScale', 0.5, 2, 0.01, 'setHudScale');
            this.addRgbaColorBox('#theme-chat', 'messageColor', 'setChatColors');
            this.addColorBox('#theme-chat', 'messageTextColor', 'setChatColors');
            this.addColorBox('#theme-chat', 'messageTimeColor', 'setChatColors');
            this.addColorBox('#theme-chat', 'messageNickColor', 'setChatColors');
            this.addRgbaColorBox('#theme-chat', 'commandsColor', 'setChatColors');
            this.addColorBox('#theme-chat', 'commandsTextColor', 'setChatColors');
            this.addColorBox('#theme-chat', 'commandsTimeColor', 'setChatColors');
            this.addColorBox('#theme-chat', 'commandsNickColor', 'setChatColors');
            this.addRgbaColorBox('#theme-chat', 'chatBoxColor', 'setChatColors');
            this.addSliderBoxT('#theme-chat', 'chatScale', 1, 2, 0.01, 'setChatScale');
            this.addColorBox('#theme-minimap', 'miniMapSectorsColor', 'setMiniMapSectorsColor');
            this.addColorBox('#theme-minimap', 'miniMapSectorColor');
            this.addColorBox('#theme-minimap', 'miniMapNickColor');
            this.addColorBox('#theme-minimap', 'miniMapNickStrokeColor');
            this.addColorBox('#theme-minimap', 'miniMapMyCellColor');
            this.addColorBox('#theme-minimap', 'miniMapMyCellStrokeColor');
            this.addColorBox('#theme-minimap', 'miniMapTeammatesColor');
            this.addColorBox('#theme-minimap', 'miniMapDeathLocationColor');
            this.addColorBox('#theme-minimap', 'miniMapGuidesColor');
            this.addColorBox('#theme-minimap', 'miniMapGhostCellsColor');
            this.addFontBox('#theme-minimap', 'miniMapFont', 'setMiniMapFont');
            this.addFontBox('#theme-minimap', 'miniMapNickFont');
            this.addSliderBoxT('#theme-minimap', 'miniMapScale', 0.3, 2, 0.01, 'setMiniMapWidth');
            this.addSliderBoxT('#theme-minimap', 'miniMapSectorsOpacity', 0, 1, 0.01, 'setMiniMapSectorsOpacity');
            this.addSliderBoxT('#theme-minimap', 'miniMapNickSize', 8, 16, 1);
            this.addSliderBoxT('#theme-minimap', 'miniMapNickStrokeSize', 0, 6, 1);
            this.addSliderBoxT('#theme-minimap', 'miniMapMyCellSize', 4, 10, 0.5);
            this.addSliderBoxT('#theme-minimap', 'miniMapMyCellStrokeSize', 0, 10, 1);
            this.addSliderBoxT('#theme-minimap', 'miniMapTeammatesSize', 4, 10, 0.5);
            this.addSliderBoxT('#theme-minimap', 'miniMapGhostCellsAlpha', 0.01, 0.99, 0.01);
            this.addInputBoxT('#theme-images', 'customMapTexture', 'Image URL', 'setCustomMapTexture');
            this.addSliderBoxT('#theme-images', 'bgOpacity', 0.1, 0.99, 0.01);
            this.addInputBoxT('#theme-images', 'customMapLogo', 'Image URL', 'setCustomMapLogo');
            this.addInputBoxT('#theme-images', 'customBackground', 'Image URL', 'setCustomBackground');
            this.addInputBoxT('#theme-images', 'customCursor', 'Cursor image URL', 'setCustomCursor');
            const b = 'https://legendmod.ml/cursors/cursor_';
            for (let d = 0; d < 35; d++) {
                if (d < 9) {
                    this.addCursorBox('#theme-images', b + '0' + (d + 1) + '.cur');
                    continue;
                }
                this.addCursorBox('#theme-images', '' + b + (d + 1) + '.cur');
            }

            $(document).on('click', '#theme-images .cursor-box div', function(e) {
                e.preventDefault();
                const f = $('img', this).attr('src');
                theme.customCursor = f;
                a.setCustomCursor();
                $('#customCursor').val(f);
                $('#theme-images .cursor-box div').removeClass('active');
                $(this).addClass('active');
            });

            $('#theme-bottom').html('\x0a        <div class=\"input-group-row\">\x0a            <div class=\"input-box-cell\"><div class=\"button b\" id=\"reset-theme\"><i class=\"fas fa-trash-restore\"></i> ' + dict('restoreThemeSettings') + '</div></div>\x0a            <div class=\"input-box-cell\"><div class=\"button b\" id=\"save-theme\"><i class=\"fas fa-save\"></i> ' + dict('saveSett') + '</div></div>\x0a        </div>');

            $(document).on('click', '#save-theme', function(e) {
                e.preventDefault();
                a.saveThemeSettings();
                e.target.p = e.target.p || e.target.innerHTML;
                e.target.innerHTML = dict('saved');

                setTimeout(() => {
                    e.target.innerHTML = e.target.p;
                }, 500);
            });

            $(document).on('click', '#reset-theme', e => {
                e.preventDefault();
                a.restoreThemeSettings();
            });

            $('.themePicker.HEX').colorPicker({
                margin: '4px 0px 0',
                doRender: false,
                cssAddon: '.cp-xy-slider:active {cursor:none;}.cp-color-picker{z-index: 250;background-color: var(--color-active-hover);}',
                opacity: false,
                renderCallback: function(e) {
                    e.trigger('input');
                    c(e[0], '#' + this.color.colors.HEX);
                }
            });

            $('.themePicker.RGBA').colorPicker({
                margin: '4px 0px 0',
                doRender: false,
                cssAddon: '.cp-xy-slider:active {cursor:none;}.cp-color-picker{z-index: 250;background-color: var(--color-active-hover);}',
                opacity: true,
                renderCallback: function(e) {
                    e.trigger('input');
                    c(e[0], e[0].value);
                }
            });

            $(document.body).on('input', '.themePicker', function(f) {
                callback = this.getAttribute('data-cb');

                if (a.hasOwnProperty(callback))
                    a[callback]();

                theme[this.id] = this.value;
            });

            function c(e, f) {
                e.nextElementSibling.children[0].style.backgroundColor = f;
            }
            $('.themePicker').each((e, f) => {
                c(f, f.value);
            });
        },
        changePreset(a, b) {
            if (b[a]) var c = b[a];
            else return;
            for (const d in c) {
                if (theme.hasOwnProperty(d)) {
                    theme[d] = c[d];
                    $('.' + d + '-picker i').css('background', theme[d]);
                    $('#' + d + '-slider').val(theme[d]).change();
                    $('#' + d + '-value').text(theme[d]);
                    $('#' + d).val(theme[d]);
                }
            }
        },
        changeThemePreset(a) {
            this.changePreset(a, themePresets);
            this.setTheme();
        },
        setFonts() {
            this.setFont('namesFont', theme.namesFont);
            this.setFont('massFont', theme.namesFont);
            this.setFont('sectorsFont', theme.sectorsFont);
        },
        setBgColor() {
            $('body').css('background-color', theme.bgColor);
        },
        setFoodColor() {
            if (!settings.optimizedFood) return;

            if (drawRender)
                drawRender.preDrawPellet();
        },
        setIndicatorColor() {
            if (drawRender)
                drawRender.preDrawIndicator();
        },
        setCustomBackground() {
            theme.customBackground ? $('body').css('background-image', 'url(' + theme.customBackground + ')') : $('body').css('background-image', 'none');
        },
        setCustomMapTexture() {
            theme.customMapTexture ? (Settings.customMapTextureCanvas = new Image(), Settings.customMapTextureCanvas.crossOrigin = 'Anonymous', Settings.customMapTextureCanvas.onload = function() {
                this.complet = true;
            }, Settings.customMapTextureCanvas.src = theme.customMapTexture) : Settings.customMapTextureCanvas = {};
        },
        setCustomMapLogo() {
            theme.customMapLogo ? (Settings.customMapLogoCanvas = new Image(), Settings.customMapLogoCanvas.crossOrigin = 'Anonymous', Settings.customMapLogoCanvas.onload = function() {
                this.complet = true;
            }, Settings.customMapLogoCanvas.src = theme.customMapLogo) : Settings.customMapLogoCanvas = {};
        },
        setCustomCursor() {
            var a = '*{cursor: ' + (!theme.customCursor ? 'auto;' : 'url(' + theme.customCursor + '), auto !important;') + '}';
            this.addCustomCSS('cursorCSS', a);
        },
        setMenu() {
            this.setMenuOpacity();
            this.setMenuMainColor();
            this.setMenuPanelColor();
            this.setMenuTextColor();
            this.setMenuButtons();
            this.setMenuBg();
        },
        changeMenuPreset(a) {
            this.changePreset(a, themePresets);
            this.setMenu();
        },
        setMenuOpacity() {
            $('#helloContainer').css('opacity', theme.menuOpacity);
        },
        setMenuMainColor() {
            const a = '\x0a        ::-moz-selection {\x0a            background-color: ' + theme.menuMainColor + '!important\x0a        }\x0a        \x0a        ::selection {\x0a            background-color: ' + theme.menuMainColor + '!important\x0a        }\x0a        \x0a        .tab-button.active,\x0a        .tab-button:hover,\x0a        .option-title\x0a        {\x0a            color: ' + theme.menuMainColor + ' !important;\x0a        }\x0a        .rangeslider__fill,\x0a        .ps-scrollbar-y,\x0a        .os-theme-dark>.os-scrollbar>.os-scrollbar-track>.os-scrollbar-handle,\x0a        input:checked + .slider {\x0a            background-color: ' + theme.menuMainColor + '!important\x0a        }';
            this.addCustomCSS('menuMainColorCSS', a);
        },
        setMenuPanelColor() {
            const a = '\x0a            .BG,\x0a            .input-group select option,\x0a            .input-group-row .input-box-cell select option\x0a            {\x0a                background-color: ' + theme.menuPanelColor + ' !important\x0a            }\x0a\x0a            .tabs {\x0a                background-color: ' + theme.menuPanelColor2 + ' !important\x0a            }\x0a\x0a            \x0a        ';
            this.addCustomCSS('menuPanelColorCSS', a);
        },
        setMenuTextColor() {
            const a = '\x0a        .custom-key-in,\x0a        .command-in,\x0a        .container,\x0a        .rangeslider__handle,\x0a        .rangeslider--horizontal{\x0a            color: ' + theme.menuTextColor + ' !important\x0a        }\x0a        .options-box{\x0a            outline-color:' + theme.menuTextColor + ' !important\x0a        }\x0a        .input-group input,\x0a        .input-group select,\x0a        .input-group-row .input-box-cell,\x0a        .input-group-row .input-box-cell input,\x0a        .input-group-row .input-box-cell select {\x0a            color: ' + theme.menuTextColor + ' !important\x0a        }\x0a        \x0a        ::-webkit-input-placeholder {\x0a            color: ' + theme.menuTextColor2 + ' !important\x0a        }\x0a        ::-moz-placeholder {\x0a            color: ' + theme.menuTextColor2 + ' !important\x0a        }\x0a\x0a        \x0a        input[type=\"range\"]::-webkit-slider-thumb,\x0a        .slider:before{\x0a            background-color: ' + theme.menuTextColor + ' !important\x0a        }\x0a        ';
            this.addCustomCSS('menuTextColorCSS', a);
        },
        setMenuButtons() {
            const a = '\x0a            a,\x0a            a:hover {\x0a                --color: ' + theme.btn1Color + ('\x0a            }\x0a        }\x0a        \x0a        .button.a {\x0a            background-color: ' + theme.btn2Color + ' !important;\x0a        }\x0a        .button.a:active,\x0a        .button.a:disabled,\x0a        .button.a:focus,\x0a        .button.a:hover {\x0a            background-color: ') + theme.btn2Color2 + (' !important;\x0a        }\x0a\x0a        .button.b {\x0a            background-color: ' + theme.btn1Color + ' !important;\x0a        }\x0a        .button.b:active,\x0a        .button.b:disabled,\x0a        .button.b:focus,\x0a        .button.b:hover {\x0a            background-color: ') + theme.btn1Color2 + (' !important;\x0a        }\x0a\x0a        .button.c {\x0a            background-color: ' + theme.btn3Color + ' !important;\x0a        }\x0a        .button.c:active,\x0a        .button.c:disabled,\x0a        .button.c:focus,\x0a        .button.c:hover {\x0a            background-color: ') + theme.btn3Color2 + (' !important;\x0a        }\x0a\x0a        .button.d {\x0a            background-color: ' + theme.btn4Color + ' !important;\x0a        }\x0a        .button.d:active,\x0a        .button.d:disabled,\x0a        .button.d:focus,\x0a        .button.d:hover {\x0a            background-color: ') + theme.btn4Color2 + (' !important;\x0a        }\x0a        \x0a        .tabs,\x0a        .button.a,\x0a        .button.b,\x0a        .button.c,\x0a        .button.d{\x0a            color: ' + theme.menuBtnTextColor + ' !important;\x0a        }\x0a\x0a        \x0a\x0a        #hotkeys-cfg .custom-key-in {\x0a            background-color: ' + theme.btn4Color2 + '\x0a            border-color:' + theme.btn4Color2 + '\x0a        }\x0a        ');
            this.addCustomCSS('menuButtonsCSS', a);
        },
        setMenuBg() {
            $('#menuBg').val(theme.menuBg);
            theme.menuBg ? $('.BG').css('background-image', 'url(' + theme.menuBg + ')') : $('.BG').css('background-image', 'none');
        },
        setSettings(a, b) {
            if (settings.hasOwnProperty(a) && b !== null) {
                settings[a] = b;

                if (tempsett.hasOwnProperty(a))
                    tempsett[a] = b;

                switch (a) {
                    case 'autoResp':
                        break;
                    case 'showMiniMap':
                        this.setMiniMap();
                        break;
                    case 'showMiniMapGrid':
                        this.setMiniMapFont();
                        break;
                    case 'disableChat':
                        this.setDisableChat();
                        break;
                    case 'chatSounds':
                        this.setChatSoundsBtn();
                        break;
                    case 'showChatBox':
                        this.setShowChatBox();
                        break;
                    case 'showTop5':
                        this.setTop5();
                        break;
                    case 'showTargeting':
                        this.setTargetingHUD();
                        break;
                    case 'showTime':
                        this.displayTime();
                        $('#time-hud').show();
                        break;
                    case 'centeredLb':
                        this.setCenteredLb();
                        break;
                    case 'normalLb':
                        this.setNormalLb();
                        break;
                    case 'fpsAtTop':
                        this.setFpsAtTop();
                        break;
                    case 'showStats':
                        application.displayStats();
                        $('#stats-hud').show();
                        break;
                    case 'blockPopups':
                        this.setBlockPopups();
                        break;
                }
                this.saveSettings(settings, 'ogarioSettings');
            }
        },
        setShowTop5() {
            settings.showTop5 = !settings.showTop5;
            this.setTop5();
        },
        setTop5() {
            settings.showTop5 ? $('#top5-hud').show() : $('#top5-hud').hide();
        },
        setShowTargeting() {
            settings.showTargeting = !settings.showTargeting;
            this.setTargetingHUD();
        },
        setTargetingHUD() {
            settings.showTargeting ? $('#target-hud, #target-panel-hud').show() : $('#target-hud, #target-panel-hud').hide();
        },
        setShowTime() {
            settings.showTime = !settings.showTime;
            settings.showTime ? ($('#time-hud').show(), this.displayTime()) : $('#time-hud').hide();
        },
        setShowSplitRange() {
            settings.splitRange = !settings.splitRange;
            tempsett.splitRange = settings.splitRange;
        },
        setShowSplitInd() {
            this.showSplitInd = !this.showSplitInd;
            settings.splitRange = this.showSplitInd;
            settings.oppRings = this.showSplitInd;
            tempsett.splitRange = settings.splitRange;
            tempsett.oppRings = settings.oppRings;
        },
        setShowTeammatesInd() {
            settings.teammatesInd = !settings.teammatesInd;
        },
        setShowOppColors() {
            settings.oppColors = !settings.oppColors;
            tempsett.oppColors = settings.oppColors;
        },
        toggleSkins() {
            if (tempsett.vanillaSkins && tempsett.customSkins) tempsett.vanillaSkins = false;
            else !tempsett.vannillaSkins && tempsett.customSkins ? (tempsett.vanillaSkins = true, tempsett.customSkins = false) : (tempsett.vanillaSkins = true, tempsett.customSkins = true);
        },
        setTransparentSkins() {
            settings.transparentSkins = !settings.transparentSkins;
            tempsett.transparentSkins = settings.transparentSkins;
        },
        setShowSkins() {
            this.noSkins = !this.noSkins;
            tempsett.showAnySkins = !this.noSkins;
            this.displayChatInfo(!this.noSkins, 'showSkinsMsg');
        },
        setShowStats() {
            $('#stats-hud').toggle();
        },
        toggleCells() {
            tempsett.selectBiggestCell = !tempsett.selectBiggestCell;
        },
        setShowFood() {
            tempsett.showFood = !tempsett.showFood;
        },
        setShowGrid() {
            settings.showGrid = !settings.showGrid;
        },
        setShowMiniMapGuides() {
            settings.showMiniMapGuides = !settings.showMiniMapGuides;
        },
        hideChat() {
            settings.hideChat = !settings.hideChat;
            this.setHideChat();
            Settings.displayChatInfo(!settings.hideChat, 'hideChatMsg');
        },
        setShowHUD() {
            $('#overlays-hud').toggle();
        },
        copyLb() {
            const a = $('<input>');
            $('body').append(a);
            a.val($('#leaderboard-positions').text()).select();
            try {
                document.execCommand('copy');
            } catch (b) {
                console.log('can\'t copy..');
            }
            a.remove();
        },
        setShowLb() {
            console.log('HP');
            if (application.gameMode === ':teams') return;
            $('#leaderboard-hud').toggle();
        },
        toggleAutoZoom() {
            tempsett.autoZoom = !tempsett.autoZoom;
            this.displayChatInfo(tempsett.autoZoom, 'autoZoomMsg');
        },
        resetZoom(a) {
            a ? (tempsett.zoomResetValue = 1, tempsett.zoomValue = 1) : tempsett.zoomResetValue = 0;
        },
        setShowBgSectors() {
            settings.showBgSectors = !settings.showBgSectors;
        },
        setHideSmallBots() {
            tempsett.hideSmallBots = !tempsett.hideSmallBots;
            this.displayChatInfo(!tempsett.hideSmallBots, 'hideSmallBotsMsg');
        },
        setShowNames() {
            settings.showNames = !settings.showNames;
        },
        setHideTeammatesNames() {
            settings.hideTeammatesNames = !settings.hideTeammatesNames;
        },
        setShowMass() {
            settings.showMass = !settings.showMass;
        },
        setShowMiniMap() {
            settings.showMiniMap = !settings.showMiniMap;
            this.setMiniMap();
            settings.showMiniMap ? $('#minimap-hud').show() : $('#minimap-hud').hide();
        },
        toggleAutoResp() {
            settings.autoResp = !settings.autoResp;
            this.displayChatInfo(settings.autoResp, 'autoRespMsg');
        },
        setDisableChat() {
            settings.hideChat = settings.disableChat;
            this.setHideChat();
        },
        setHideChat() {
            if (settings.hideChat)
                $('#message-box').hide();

            this.setShowChatBox();
        },
        setShowChatBox() {
            !settings.hideChat && settings.showChatBox ? $('#chat-box').show() : $('#chat-box').hide();
        },
        displayChatInfo(a, b) {
            a ? dict(b + 'A') ? toastr.info(dict(b + 'A')) : toastr.info(b) : dict(b + 'B') ? toastr.error(dict(b + 'B')) : toastr.error(b);
        },
        showMenu(a) {
            a ? $('#overlays').fadeIn(a) : $('#overlays').show();
        },
        hideMenu(a) {
            a ? $('#overlays').fadeOut(a) : $('#overlays').hide();
        },
        setHud() {
            this.setHudColors();
            this.setHudFont();
            this.setHudScale();
        },
        setHudColors() {
            const a = '\x0a        .hud-main-color,\x0a        #top5-hud a,\x0a        #target-panel-hud a:hover,\x0a        #target-panel-hud a.active,\x0a        #message-menu a{\x0a            color:' + theme.hudMainColor + '\x0a        }\x0a\x0a        .hud,\x0a        .hud-b,\x0a        #chat-emoticons{\x0a            background-color:' + theme.hudColor + '\x0a        }\x0a        .hud,\x0a        .hud-b,\x0a        #top5-hud a:hover,\x0a        .hudTextColor,\x0a        #target-panel-hud a{\x0a            color:' + theme.hudTextColor + '\x0a        }\x0a        .stats-hud-color{\x0a            color:' + theme.statsHudColor + '\x0a        }\x0a        .time-hud-color{\x0a            color:' + theme.timeHudColor + '\x0a        }\x0a        .top5-mass-color{\x0a            color:' + theme.top5MassColor + '\x0a        }\x0a        #leaderboard-positions .me{\x0a            color:' + theme.lbMeColor + '\x0a        }\x0a        #leaderboard-positions .teammate{\x0a            color:' + theme.lbTeammateColo + ';\x0a        };';
            this.addCustomCSS('hudCSS', a);
        },
        setHudFont() {
            this.setFont('hudFont', theme.hudFont);

            $('#overlays-hud').css({
                'font-family': theme.hudFontFamily,
                'font-weight': theme.hudFontWeight
            });
        },
        setHudScale() {
            $('#leaderboard-hud, #time-hud').css('transform', 'scale(' + theme.hudScale + ')');
            $('#top5-hud').css('transform', 'scale(' + theme.hudScale + ')');
            $('#stats-hud').css('transform', 'scale(' + theme.hudScale + ')');
        },
        setCenteredLb() {
            settings.centeredLb ? $('#leaderboard-hud').addClass('hud-text-center') : $('#leaderboard-hud').removeClass('hud-text-center');
        },
        setNormalLb() {
            settings.normalLb ? $('#leaderboard-hud h4').html(dict('leaderboard')) : $('#leaderboard-hud h4').html('-- NZXT --');
        },
        setFpsAtTop() {
            const a = Math.round(200 * theme.hudScale);
            if (settings.fpsAtTop) {
                const b = Math.floor(55 * theme.hudScale);
                $('#top5-hud').removeClass('hud-top').addClass('hud-bottom');
                $('#stats-hud').removeClass('hud-bottom').addClass('hud-top');
            } else {
                const c = Math.floor(10 * theme.hudScale);
                $('#top5-hud').removeClass('hud-bottom').addClass('hud-top');
                $('#stats-hud').removeClass('hud-top').addClass('hud-bottom');
            }
        },
        setChat() {
            this.setChatColors();
            this.setChatScale();
        },
        setChatColors() {
            const a = '\x0a        #message,#messages li,.toast-success\x0a        {background-color:' + theme.messageColor + ('}\x0a\x0a        #message,\x0a        .message-text,\x0a        .toast-success .message-text\x0a            {color: ' + theme.messageTextColor + ';}\x0a        .message-nick,\x0a        .mute-user,\x0a        .mute-user:hover,\x0a        .toast-success .message-nick,\x0a        .toast .mute-user,\x0a        .toast .mute-user:hover\x0a            {color: ' + theme.messageNickColor + ';}\x0a\x0a        .message-time\x0a        {color: ' + theme.messageTimeColor + ';}\x0a\x0a        .toast-warning\x0a        {background-color: ' + theme.commandsColor + ';}\x0a\x0a        .command-text,\x0a        .toast-warning .command-text\x0a            {color: ' + theme.commandsTextColor + ';}\x0a\x0a        .command-nick,\x0a        .toast-warning .command-nick,\x0a        .toast-warning .mute-user,\x0a        .toast-warning .mute-user:hover\x0a            {color: ' + theme.commandsNickColor + ';}\x0a\x0a        .command-time\x0a            {color: ' + theme.commandsTimeColor + ';}\x0a\x0a        #chat-box\x0a            {background-color: ' + theme.chatBoxColor + ';}\x0a        ');
            this.addCustomCSS('chatCSS', a);
        },
        setChatScale() {
            const a = Math.round(14 * theme.chatScale),
                b = Math.round(280 * theme.chatScale),
                c = Math.round(350 * theme.chatScale),
                d = Math.round(300 * theme.chatScale),
                e = Math.floor(14 * theme.chatScale);
            $('#message-box, #messages, #toast-container, #chat-box').css('font-size', a + 'px');
            $('#messages, #toast-container, #chat-box').width(b);
            $('#message-box').width(c);
            $('#chat-box').height(d);
            $('.user-list').css('padding-left', e + 'px');
            const f = '#toast-container{width:' + b + 'px;font-size:' + a + 'px}';
            this.addCustomCSS('chatScaleCSS', f);
        },
        setShowChatBox() {
            !settings.hideChat && settings.showChatBox ? $('#chat-box').show() : $('#chat-box').hide();
        },
        setMiniMap() {
            settings.showMiniMap ? $('#minimap-hud').show() : $('#minimap-hud').hide();
            this.setMiniMapFont();
            this.setMiniMapWidth();
            this.setMiniMapSectorsOpacity();
        },
        setMiniMapFont() {
            this.setFont('miniMapFont', theme.miniMapFont);

            if (window.comm)
                comm.resetMiniMapSectors();
        },
        setMiniMapWidth() {
            const a = theme.miniMapWidth / 200;
            theme.miniMapTop = 0;
            $('#minimap-hud').css('transform', 'scale(' + theme.miniMapScale + ')');

            if (window.comm)
                comm.resetMiniMapSectors();
        },
        setMiniMapSectorsColor() {
            if (window.comm)
                comm.resetMiniMapSectors();
        },
        setMiniMapSectorsOpacity() {
            $('#minimap-sectors').css('opacity', theme.miniMapSectorsOpacity);
        },
        setTheme() {
            this.setFonts();
            this.setBgColor();
            this.setCustomBackground();
            this.setCustomMapTexture();
            this.setCustomMapLogo();
            this.setCustomCursor();
            this.setMenu();
            this.setHud();
            this.setChat();
            this.setMiniMap();
        },
        clearNickCache() {
            Texts.setNickCtxFont();
        },
        clearMassCache() {
            Texts.setMassCtxFont();
        },
        clearTextCache() {
            Texts.setNickCtxFont();
            Texts.setMassCtxFont();
        },


        init() {
            jQuery.event.special.touchstart = {
                setup: function(d, e, f) {
                    e.includes('noPreventDefault') ? this.addEventListener('touchstart', f, {
                        passive: false
                    }) : this.addEventListener('touchstart', f, {
                        passive: true
                    });
                }
            };

            this.loadSettings();
            this.loadThemeSettings();
            this.setTheme();
            this.setSettingsMenu();
            this.setThemeMenu();
            this.setMiniMap();
            this.setShowChatBox();
            this.setTop5();
            this.setCenteredLb();
            this.setNormalLb();
            this.setFpsAtTop();


            $(function() {
                $('ul.tabs').on('click', 'li:not(.active)', function() {
                    $(this).addClass('active').siblings().removeClass('active').closest('.content').find('> .tab-container').removeClass('active').eq($(this).index()).addClass('active');
                });

                $('.container').on('mousewheel', d => {
                    d.stopPropagation();
                });
            });

            function a(d) {
                localStorage['dt-' + d] ? (delete localStorage['dt-' + d], $(document.getElementById(d)).fadeIn(300)) : (localStorage['dt-' + d] = '1', $(document.getElementById(d)).fadeOut(300));
            }
            Array.prototype.slice.call(document.querySelectorAll('[data-toggle-id]')).forEach(d => {
                var e = d.getAttribute('data-toggle-id');
                document.getElementById(e).style.display = !localStorage['dt-' + e] ? 'block' : 'none';

                d.onclick = function() {
                    a(e);
                };
            });
            let b = null;

            function c() {
                const d = window.innerWidth,
                    e = window.innerHeight,
                    f = $('#helloContainer');
                let g = f.innerHeight();
                g > 0 ? b = g : g = b || 618;
                const h = Math.min(1, e / g),
                    i = g * h,
                    j = Math.round(e / 2 - 0.5 * i),
                    k = 'translateX(-50%) translateY(-50%) scale(' + h + ')';
                f.css('transform', k);
                f.css('-ms-transform', k);
                f.css('-webkit-transform', k);
            }

            window.onresize = () => {
                c();
            };

            c();
        }
    };

Settings.init();