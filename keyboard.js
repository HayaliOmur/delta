const keyBlind = {};
var hotkeys = {};
const hotkeysCommand = {
    'hk-feed': {
        label: dict('hk-feed'),
        defaultKey: 'E',
        keyDown() {
            if (application)
                application.feed();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-macroFeed': {
        label: dict('hk-macroFeed'),
        defaultKey: 'W',
        keyDown() {
            if (application)
                application.macroFeed(true);
        },
        keyUp() {
            if (application)
                application.macroFeed(false);
        },
        type: 'normal'
    },
    'hk-split': {
        label: dict('hk-split'),
        defaultKey: 'SPACE',
        keyDown() {
            if (application)
                application.split();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-doubleSplit': {
        label: dict('hk-doubleSplit'),
        defaultKey: 'Q',
        keyDown() {
            if (application)
                application.doubleSplit();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-popSplit': {
        label: 'Popsplit',
        defaultKey: 'ALT+Q',
        keyDown() {
            if (application)
                application.popSplit();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-tripleSplit': {
        label: 'Triplesplit',
        defaultKey: '',
        keyDown() {
            if (application)
                application.tripleSplit();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-split16': {
        label: dict('hk-split16'),
        defaultKey: 'SHIFT',
        keyDown() {
            if (application)
                application.split16();
        },
        keyUp: null,
        type: 'normal'
    },
  'hk-split64': {
        label: dict('hk-split64'),
        defaultKey: '',
        keyDown() {
            if (application)
                application.split64();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-pause': {
        label: dict('hk-pause'),
        defaultKey: 'R',
        keyDown() {
            if (application)
                application.setPause();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-switchPlayer': {
        label: dict('hk-switchPlayer'),
        defaultKey: 'TAB',
        keyDown() {
            if (application)
                application.switchTab();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showTop5': {
        label: dict('hk-showTop5'),
        defaultKey: 'V',
        keyDown() {
            if (Settings)
                Settings.setShowTop5();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showTime': {
        label: dict('hk-showTime'),
        defaultKey: 'ALT+T',
        keyDown() {
            if (Settings)
                Settings.setShowTime();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showSplitRange': {
        label: dict('hk-showSplitRange'),
        defaultKey: 'U',
        keyDown() {
            if (Settings)
                Settings.setShowSplitRange();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showSplitInd': {
        label: dict('hk-showSplitInd'),
        defaultKey: 'I',
        keyDown() {
            if (Settings)
                Settings.setShowSplitInd();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showTeammatesInd': {
        label: dict('hk-showTeammatesInd'),
        defaultKey: 'ALT+I',
        keyDown() {
            if (Settings)
                Settings.setShowTeammatesInd();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showOppColors': {
        label: dict('hk-showOppColors'),
        defaultKey: 'O',
        keyDown() {
            if (Settings)
                Settings.setShowOppColors();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-toggleSkins': {
        label: dict('hk-toggleSkins'),
        defaultKey: 'K',
        keyDown() {
            if (Settings)
                Settings.toggleSkins();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-transparentSkins': {
        label: dict('hk-transparentSkins'),
        defaultKey: '',
        keyDown() {
            if (Settings)
                Settings.setTransparentSkins();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showSkins': {
        label: dict('hk-showSkins'),
        defaultKey: 'S',
        keyDown() {
            if (Settings)
                Settings.setShowSkins();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showStats': {
        label: dict('hk-showStats'),
        defaultKey: 'ALT+S',
        keyDown() {
            if (Settings)
                Settings.setShowStats();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-toggleCells': {
        label: dict('hk-toggleCells'),
        defaultKey: 'D',
        keyDown() {
            if (Settings)
                Settings.toggleCells();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showFood': {
        label: dict('hk-showFood'),
        defaultKey: 'X',
        keyDown() {
            if (Settings)
                Settings.setShowFood();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showGrid': {
        label: dict('hk-showGrid'),
        defaultKey: 'G',
        keyDown() {
            if (Settings)
                Settings.setShowGrid();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showMiniMapGuides': {
        label: dict('hk-showMiniMapGuides'),
        defaultKey: 'ALT+G',
        keyDown() {
            if (Settings)
                Settings.setShowMiniMapGuides();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-hideChat': {
        label: dict('hk-hideChat'),
        defaultKey: 'H',
        keyDown() {
            if (Settings)
                Settings.hideChat();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showHUD': {
        label: dict('hk-showHUD'),
        defaultKey: 'ALT+H',
        keyDown() {
            if (Settings)
                Settings.setShowHUD();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-copyLb': {
        label: dict('hk-copyLb'),
        defaultKey: 'L',
        keyDown() {
            if (Settings)
                Settings.copyLb();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showLb': {
        label: dict('hk-showLb'),
        defaultKey: 'ALT+L',
        keyDown() {
            if (Settings)
                Settings.setShowLb();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-toggleAutoZoom': {
        label: dict('hk-toggleAutoZoom'),
        defaultKey: '',
        keyDown() {
            if (Settings)
                Settings.toggleAutoZoom();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-resetZoom': {
        label: dict('hk-resetZoom'),
        defaultKey: 'ALT+Z',
        keyDown() {
            if (Settings)
                Settings.resetZoom(true);
        },
        keyUp() {
            if (Settings)
                Settings.resetZoom(false);
        },
        type: 'normal'
    },
    'hk-showBgSectors': {
        label: dict('hk-showBgSectors'),
        defaultKey: 'B',
        keyDown() {
            if (Settings)
                Settings.setShowBgSectors();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showNames': {
        label: dict('hk-showNames'),
        defaultKey: 'N',
        keyDown() {
            if (Settings)
                Settings.setShowNames();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-hideTeammatesNames': {
        label: dict('hk-hideTeammatesNames'),
        defaultKey: '',
        keyDown() {
            if (Settings)
                Settings.setHideTeammatesNames();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showMass': {
        label: dict('hk-showMass'),
        defaultKey: 'M',
        keyDown() {
            if (Settings)
                Settings.setShowMass();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showMiniMap': {
        label: dict('hk-showMiniMap'),
        defaultKey: 'ALT+M',
        keyDown() {
            if (Settings)
                Settings.setShowMiniMap();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-showQuest': {
        label: dict('hk-showQuest'),
        defaultKey: '',
        keyDown() {
            if (Settings)
                Settings.setShowQuest();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-quickResp': {
        label: dict('hk-quickResp'),
        defaultKey: 'TILDE',
        keyDown() {
            if (application)
                application.quickResp();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-autoResp': {
        label: dict('hk-autoResp'),
        defaultKey: '',
        keyDown() {
            if (Settings)
                Settings.toggleAutoResp();
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-zoom1': {
        label: dict('hk-zoomLevel') + ' 1',
        defaultKey: 'ALT+1',
        keyDown() {
            drawRender.zoomValue = 0.5;
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-zoom2': {
        label: dict('hk-zoomLevel') + ' 2',
        defaultKey: 'ALT+2',
        keyDown() {
            drawRender.zoomValue = 0.25;
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-zoom3': {
        label: dict('hk-zoomLevel') + ' 3',
        defaultKey: 'ALT+3',
        keyDown() {
            drawRender.zoomValue = 0.125;
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-zoom4': {
        label: dict('hk-zoomLevel') + ' 4',
        defaultKey: 'ALT+4',
        keyDown() {
            drawRender.zoomValue = 0.075;
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-zoom5': {
        label: dict('hk-zoomLevel') + ' 5',
        defaultKey: 'ALT+5',
        keyDown() {
            drawRender.zoomValue = 0.05;
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-clearChat': {
        label: dict('hk-clearChat'),
        defaultKey: 'C',
        keyDown() {
            if (comm)
                comm.displayChatHistory(true);
        },
        keyUp() {
            if (comm)
                comm.displayChatHistory(false);
        },
        type: 'normal'
    },
    'hk-chatMessage': {
        label: dict('hk-chatMessage'),
        defaultKey: 'ENTER',
        keyDown() {
            if (comm)
                comm.enterChatMessage();
        },
        keyUp: null,
        type: 'special'
    },
    'hk-comm1': {
        label: chatCommand.comm1,
        defaultKey: '1',
        keyDown() {
            if (comm)
                comm.sendCommand(1);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm2': {
        label: chatCommand.comm2,
        defaultKey: '2',
        keyDown() {
            if (comm)
                comm.sendCommand(2);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm3': {
        label: chatCommand.comm3,
        defaultKey: '3',
        keyDown() {
            if (comm)
                comm.sendCommand(3);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm4': {
        label: chatCommand.comm4,
        defaultKey: '4',
        keyDown() {
            if (comm)
                comm.sendCommand(4);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm5': {
        label: chatCommand.comm5,
        defaultKey: '5',
        keyDown() {
            if (comm)
                comm.sendCommand(5);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm6': {
        label: chatCommand.comm6,
        defaultKey: '6',
        keyDown() {
            if (comm)
                comm.sendCommand(6);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm7': {
        label: chatCommand.comm7,
        defaultKey: '7',
        keyDown() {
            if (comm)
                comm.sendCommand(7);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm8': {
        label: chatCommand.comm8,
        defaultKey: '8',
        keyDown() {
            if (comm)
                comm.sendCommand(8);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm9': {
        label: chatCommand.comm9,
        defaultKey: '9',
        keyDown() {
            if (comm)
                comm.sendCommand(9);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm0': {
        label: chatCommand.comm0,
        defaultKey: '0',
        keyDown() {
            if (comm)
                comm.sendCommand(0);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm10': {
        label: chatCommand.comm10,
        defaultKey: 'MOUSE WHEEL',
        keyDown() {
            if (comm)
                comm.sendCommand(10);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm11': {
        label: chatCommand.comm11,
        defaultKey: 'LEFT',
        keyDown() {
            if (comm)
                comm.sendCommand(11);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm12': {
        label: chatCommand.comm12,
        defaultKey: 'UP',
        keyDown() {
            if (comm)
                comm.sendCommand(12);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm13': {
        label: chatCommand.comm13,
        defaultKey: 'RIGHT',
        keyDown() {
            if (comm)
                comm.sendCommand(13);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-comm14': {
        label: chatCommand.comm14,
        defaultKey: 'DOWN',
        keyDown() {
            if (comm)
                comm.sendCommand(14);
        },
        keyUp: null,
        type: 'command'
    },
    'hk-bots-split': {
        label: 'Bot Split',
        defaultKey: 'T',
        keyDown() {
          if (window.connection) {
            window.connection.send(window.buffers.sendSplit());
            //console.log('Sending bot split');
          }
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-bots-feed': {
        label: 'Bot Feed',
        defaultKey: 'A',
        keyDown() {
          if (window.connection) {
            setInterval(window.connection.send(window.buffers.sendFeed()),40);
            //console.log('Sending bot feed');
          }
        },
        keyUp: null,
        type: 'normal'
    },
    'hk-bots-ai': {
        label: 'Bot Ai',
        defaultKey: 'F',
        keyDown() {
            if (window.user.startedBots /*&& window.user.isAlive*/ ) {
                if (!window.bots.ai) {
                    document.getElementById('botsAI').style.color = '#00C02E'
                    document.getElementById('botsAI').innerText = 'Enabled'
                    document.getElementById('botsAI2').style.color = '#00C02E'
                    document.getElementById('botsAI2').innerText = 'Enabled'
                    window.bots.ai = true
                    window.connection.send(new Uint8Array([4, Number(window.bots.ai)]).buffer)
                } else {
                    document.getElementById('botsAI').style.color = '#DA0A00'
                    document.getElementById('botsAI').innerText = 'Disabled'
                    document.getElementById('botsAI2').style.color = '#DA0A00'
                    document.getElementById('botsAI2').innerText = 'Disabled'
                    window.bots.ai = false
                    window.connection.send(new Uint8Array([4, Number(window.bots.ai)]).buffer)
                }
            }
        },
        keyUp: null,
        type: 'normal'
    }
};

function onKonamiCode() {
    var a = '',
        b = [{
            key: '696987878282',
            fn: () => {
                application.dm = true;
                application.tab.spectate ? application.destroyClient('spectate') : application.initSpectate();
            }
        }, {
            key: '828265658383',
            fn: () => {
                application.dm = true;
                application.tab.region0 ? application.destroyFullSpect() : application.initFullSpect();
            }
        }];
    document.addEventListener('keydown', function(c) {
        a += '' + c.keyCode;
        var d = true;
        for (const f of b) {
            if (f.key.indexOf(a) === 0)
                d = false;

            if (a === f.key) {
                a = '' + c.keyCode;
                Settings.displayChatInfo('', 'Activated');
                return f.fn();
            }
        }
        if (d) a = '' + c.keyCode;
    });
}
onKonamiCode();
const hotkeysSetup = {
    lastPressedKey: '',
    lastKeyId: '',
    defaultMessageKey: 'ENTER',
    inputClassName: 'custom-key-in',
    loadDefaultHotkeys() {
        hotkeys = {};
        for (const a in hotkeysCommand) {
            if (hotkeysCommand.hasOwnProperty(a))
                hotkeys[hotkeysCommand[a].defaultKey] = a;
        }
        hotkeys['spec-messageKey'] = this.defaultMessageKey;
    },
    loadHotkeys() {
        window.localStorage.getItem('ogarioHotkeys2') !== null ? hotkeys = JSON.parse(window.localStorage.getItem('ogarioHotkeys2')) : this.loadDefaultHotkeys();

        if (window.localStorage.getItem('ogarioCommands') !== null)
            chatCommand = JSON.parse(window.localStorage.getItem('ogarioCommands'));
    },
    saveHotkeys() {
        window.localStorage.setItem('ogarioHotkeys2', JSON.stringify(hotkeys));
        this.saveCommands();
    },
    saveCommands() {
        $('#hotkeys .command-in').each(function() {
            const a = $(this),
                b = a.attr('id');

            if (chatCommand.hasOwnProperty(b))
                chatCommand[b] = a.val();
        });

        window.localStorage.setItem('ogarioCommands', JSON.stringify(chatCommand));
    },
    resetHotkeys() {
        this.loadDefaultHotkeys();

        $('#hotkeys-cfg .custom-key-in').each(function() {
            const a = $(this).attr('id');

            if (hotkeysCommand[a])
                $(this).val(hotkeysCommand[a].defaultKey);
        });
    },
    setHotkeysMenu() {
        const a = this;
        $('#hotkeys').append('\x0a        <div id=\"hotkeys-cfg\"></div>\x0a        <div id=\"hotkeys-inst\"><ul><li>' + dict('hk-inst-assign') + '</li><li>' + dict('hk-inst-delete') + '</li><li>' + dict('hk-inst-keys') + '</li></ul>\x0a        </div>');
        $('#hotkeys-bottom').html('\x0a        <div class=\"input-group-row\">\x0a            <div class=\"input-box-cell\"><div class=\"button b\" id=\"reset-hotkeys\"><i class=\"fas fa-trash-restore\"></i> ' + dictonary.restoreSettings + '</div></div>\x0a            <div class=\"input-box-cell\"><div class=\"button b\" id=\"save-hotkeys\"><i class=\"fas fa-save\"></i> ' + dictonary.saveSett + '</div></div>\x0a        </div>');
        for (const b in hotkeysCommand) {
            if (hotkeysCommand.hasOwnProperty(b)) {
                const c = hotkeysCommand[b];
                let d = '';
                for (const e in hotkeys) {
                    if (hotkeys.hasOwnProperty(e) && hotkeys[e] === b) {
                        d = e;
                        break;
                    }
                }
                if (c.type === 'command') {
                    const f = b.replace('hk-', '');
                    $('#hotkeys-cfg').append('\x0a                    <div class=\"hotkey-box\">\x0a                    <div class=\"hotkey-title\"><input id=\"' + f + '\" class=\"command-in\" value=\"' + chatCommand[f] + '\" maxlength=\"80\" /></div>\x0a                    <div class=\"default-key\"><div>' + c.defaultKey + '</div></div>\x0a                    <div class=\"custom-key\"><input id=\"' + b + '\" class=\"custom-key-in\" value=\"' + d + '\" /></div>\x0a                    </div>');
                } else $('#hotkeys-cfg').append('<div class=\"hotkey-box\">\x0a                    <div class=\"hotkey-title\"><div>' + c.label + '</div></div>\x0a                    <div class=\"default-key\"><div>' + c.defaultKey + '</div></div>\x0a                    <div class=\"custom-key\"><input id=\"' + b + '\" class=\"custom-key-in\" value=\"' + d + '\" /></div>\x0a                    </div>');
            }
        }

        $(document).on('click', '#reset-hotkeys', g => {
            g.preventDefault();
            a.resetHotkeys();
            g.target.p = g.target.p || g.target.innerHTML;
            g.target.innerHTML = dictonary.saved;

            setTimeout(() => {
                g.target.innerHTML = g.target.p;
            }, 500);
        });

        $(document).on('click', '#save-hotkeys', g => {
            g.preventDefault();
            a.saveHotkeys();
            g.target.p = g.target.p || g.target.innerHTML;
            g.target.innerHTML = dictonary.saved;

            setTimeout(() => {
                g.target.innerHTML = g.target.p;
            }, 500);
        });

        $(document).on('click', '.hotkeys-link', g => {
            $('#hotkeys').fadeIn(500);
            $('#hotkeys-cfg').perfectScrollbar('update');
            resetonkeydown();
        });
    },
    getPressedKey(a) {
        let b = '',
            c = '';
        if (a.ctrlKey || a.keyCode == 17)
            b = 'CTRL';
        else if (a.altKey || a.keyCode == 18)
            b = 'ALT';
        switch (a.keyCode) {
            case 9:
                c = 'TAB';
                break;
            case 13:
                c = 'ENTER';
                break;
            case 16:
                c = 'SHIFT';
                break;
            case 17:
                break;
            case 18:
                break;
            case 27:
                c = 'ESC';
                break;
            case 32:
                c = 'SPACE';
                break;
            case 37:
                c = 'LEFT';
                break;
            case 38:
                c = 'UP';
                break;
            case 39:
                c = 'RIGHT';
                break;
            case 40:
                c = 'DOWN';
                break;
            case 46:
                c = 'DEL';
                break;
            case 61:
                c = '=';
                break;
            case 187:
                c = '=';
                break;
            case 192:
                c = 'TILDE';
                break;
            default:
                c = String.fromCharCode(a.keyCode);
                break;
        }
        if (b !== '') {
            if (c !== '') return b + '+' + c;
            return b;
        }
        return c;
    },
    deleteHotkey(a, b) {
        delete hotkeys[a];
        $('#' + b).val('');
    },
    setDefaultHotkey(a) {
        let b = false;
        if (hotkeysCommand[a] && !hotkeys.hasOwnProperty(hotkeysCommand[a].defaultKey)) {
            b = hotkeysCommand[a].defaultKey;
            hotkeys[b] = a;
            return b;
        }
        return b;
    },
    setHotkey(a, b) {
        if (!b || this.lastPressedKey === a && this.lastKeyId === b) return;
        const c = $('#' + b).val();
        this.deleteHotkey(c, b);
        if (a === 'DEL') return;
        if (hotkeys[a] && hotkeys[a] !== b) {
            const d = hotkeys[a],
                e = this.setDefaultHotkey(d);
            e ? (hotkeys[e] = d, $('#' + d).val(e)) : this.deleteHotkey(a, d);
        }
        hotkeys[a] = b;
        $('#' + b).val(a);

        if (b === 'hk-chatMessage')
            hotkeys['spec-messageKey'] = a;

        this.lastPressedKey = a;
        this.lastKeyId = b;
    },
    init() {
        this.loadHotkeys();
        this.setHotkeysMenu();
    }
};
document.onkeydown = a => {
    const b = hotkeysSetup.getPressedKey(a);
    if (a.target.tagName === 'INPUT' && a.target.className !== hotkeysSetup.inputClassName && b !== hotkeys['spec-messageKey']) return;
    if (b !== '' && !keyBlind[b]) {
        keyBlind[b] = true;
        if (b === 'ESC') {
            a.preventDefault();
            $('#overlays').toggle();
            return;
        }
        if (a.target.className === hotkeysSetup.inputClassName) {
            a.preventDefault();
            hotkeysSetup.setHotkey(b, a.target.id);
            return;
        }
        if (hotkeys[b]) {
            a.preventDefault();
            const c = hotkeys[b];

            if (c !== '' && hotkeysCommand[c])
                if (hotkeysCommand[c].keyDown)
                    hotkeysCommand[c].keyDown();
        }
    }
}, document.onkeyup = a => {
    const b = hotkeysSetup.getPressedKey(a);
    if (b !== '') {
        if (hotkeys[b]) {
            const c = hotkeys[b];

            if (c !== '' && hotkeysCommand[c])
                if (hotkeysCommand[c].keyUp)
                    hotkeysCommand[c].keyUp();
        }
        keyBlind[b] = false;
    }
}, window.onmousedown = a => {
    if (!$('#overlays').is(':visible')) {
        if (a.which == 2) {
            if (settings.mouseMiddleFn !== 'false') {
                a.preventDefault();
                if (hotkeysCommand[settings.mouseMiddleFn] && hotkeysCommand[settings.mouseMiddleFn].keyDown) hotkeysCommand[settings.mouseMiddleFn].keyDown();
            }
        } else {
            if (settings.mouseLeftFn !== 'false') {
                if (a.which == 1 && !settings.mouseInvert || a.which == 3 && settings.mouseInvert) {
                    if (a.target.tagName === 'INPUT') return;
                    if (a.target.tagName === 'CANVAS') {
                        if (hotkeysCommand[settings.mouseLeftFn] && hotkeysCommand[settings.mouseLeftFn].keyDown) hotkeysCommand[settings.mouseLeftFn].keyDown();
                    }
                }
            }
            if (settings.mouseRightFn !== 'false') {
                if (a.which == 3 && !settings.mouseInvert || a.which == 1 && settings.mouseInvert) {
                    if (a.target.tagName === 'INPUT') return;
                    if (a.target.tagName === 'CANVAS') {
                        if (hotkeysCommand[settings.mouseRightFn] && hotkeysCommand[settings.mouseRightFn].keyDown) hotkeysCommand[settings.mouseRightFn].keyDown();
                    }
                }
            }
        }
    }
}, window.onmouseup = a => {
    if (a.which == 2) {
        if (settings.mouseMiddleFn !== 'false') {
            if (hotkeysCommand[settings.mouseMiddleFn] && hotkeysCommand[settings.mouseMiddleFn].keyUp) hotkeysCommand[settings.mouseMiddleFn].keyUp();
        }
    } else {
        if (settings.mouseLeftFn !== 'false') {
            if (a.which == 1 && !settings.mouseInvert || a.which == 3 && settings.mouseInvert) {
                if (hotkeysCommand[settings.mouseLeftFn] && hotkeysCommand[settings.mouseLeftFn].keyUp) hotkeysCommand[settings.mouseLeftFn].keyUp();
            }
        }
        if (settings.mouseRightFn !== 'false') {
            if (a.which == 3 && !settings.mouseInvert || a.which == 1 && settings.mouseInvert) {
                if (hotkeysCommand[settings.mouseRightFn] && hotkeysCommand[settings.mouseRightFn].keyUp) hotkeysCommand[settings.mouseRightFn].keyUp();
            }
        }
    }
}, window.onbeforeunload = a => {
    if (application.play) return dictonary.exit;
    else return;
};

function spectateBlind() {
    window.onkeydown = a => {
        if (81 == a.keyCode && window.application)
            window.application.sendFreeSpectate();
    };

    window.onkeyup = a => {};
}
spectateBlind(), hotkeysSetup.init(), OverlayScrollbars(document.querySelectorAll('.scrollable'), {
    scrollbars: {
        visibility: 'visible',
        autoHide: 'leave',
        autoHideDelay: 10
    }
});