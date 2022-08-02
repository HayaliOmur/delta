var mirror = {
    token: '',
    socket: null,
    send: function(a, b) {
        if (settings.mapGlobalFix4 == false && this.socket && this.socket.readyState == 1) {
            this.socket.close();
            this.socket = null;
            return;
        }
        if (application.play && comm.playerID && this.socket && this.socket.readyState == 1) {
            a = window.unescape(window.encodeURIComponent(a));
            if (b != null) {
                this.socket.send(JSON.stringify({
                toH: this.token,
                msg: {
                    t: a,
                    s: b
                }
            }));
        }
        }
    },
    connect: function(a) {
        this.token = a;
        if (settings.mapGlobalFix4 == false) return;
        if (this.socket) {
            this.socket.url = 'wss://cloud.achex.ca/JIMBOY3200' + this.token;
            return this.socket.refresh();
        }
       var b = function(f) {
            var g = JSON.parse(f.data);
            if (!g.msg) return;
            var h = g.msg.s;
            var i = window.decodeURIComponent(escape(g.msg.t));
            var j = comm.checkPlayerNick(i);
            if (null != j) {
                comm.teamPlayers[j].quadrant = h;
            }
        };
           var c = function() {
                this.socket.send(JSON.stringify({
                    auth: 'JIM2' + comm.playerID,
                    password: 'legendmod2'
                }));
                this.socket.send(JSON.stringify({
                    joinHub: this.token
                }));
            }.bind(this);
        var d = function() {};
        this.socket = new ReconnectingWebSocket('wss://cloud.achex.ca/JIMBOY3200' + this.token, null, {
            reconnectInterval: 3000,
            maxReconnectAttempts: 3
        });
        this.socket.onmessage = b;
        this.socket.onopen = c;
        this.socket.onclose = d;
    }
};

function minimapCell(a, b, c, d) {
    this.id = a;
    this.nick = b;
    this.skinID = c;
    this.skinURL = d;
    this.quadrant = -1;
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.mass = 0;
    this.clanTag = '';
    this.color = null;
    this.customColor = theme.miniMapTeammatesColor;
    this.alive = false;
    this.updateTime = null;
    this.pi2 = 2 * Math.PI;

    this.setColor = function(e, f) {
        this.color = e;

        if (f.length == 7)
            this.customColor = f;
    };

    this.drawPosition = function(e, f, g, h, i) {
        if (!this.alive || h && i && this.id != i) return;
        this.lastX = (29 * this.lastX + this.x) / 30;
        this.lastY = (29 * this.lastY + this.y) / 30;
        const j = (this.lastX + f) * g,
            k = (this.lastY + f) * g;

        if (this.nick.length > 0) {
            e.font = theme.miniMapNickFontWeight + ' ' + theme.miniMapNickSize + 'px ' + theme.miniMapNickFontFamily;
            e.textAlign = 'center';
            e.textBaseline = 'bottom';

            if (theme.miniMapNickStrokeSize > 0) {
                e.lineWidth = theme.miniMapNickStrokeSize;
                e.strokeStyle = theme.miniMapNickStrokeColor;
                e.strokeText(this.nick, j, k - (theme.miniMapTeammatesSize * 1 + 2.5));
            }

            e.fillStyle = theme.miniMapNickColor;
            e.fillText(this.nick, j, k - (theme.miniMapTeammatesSize * 1 + 2.5));
        }

        if (this.quadrant >= 0) {
            const l = k - theme.miniMapTeammatesSize / 3,
                m = theme.miniMapTeammatesSize * Math.cos(Math.PI / 6);
            e.beginPath();
            e.moveTo(j - theme.miniMapTeammatesSize, l + theme.miniMapTeammatesSize);
            e.lineTo(j + theme.miniMapTeammatesSize, l + theme.miniMapTeammatesSize);
            e.lineTo(j, l - m);
            e.closePath();
        } else {
            e.beginPath();
            e.arc(j, k, theme.miniMapTeammatesSize, 0, this.pi2, false);
            e.closePath();
        }
        settings.oneColoredTeammates ? e.fillStyle = theme.miniMapTeammatesColor : e.fillStyle = this.color;
        e.fill();
    };
}
const emojiChar = {
    ':)': '1f642.svg',
    ';)': '1f609.svg',
    '=)': '1f60f.svg',
    ':D': '1f600.svg',
    'X-D': '1f606.svg',
    '=D': '1f602.svg',
    ':(': '2639.svg',
    ';(': '1f62d.svg',
    ':P': '1f61b.svg',
    ';P': '1f61c.svg',
    ':*': '1f618.svg',
    '$)': '1f60d.svg',
    '<3': '2764.svg',
    '8=)': '1f60e.svg',
    ':o': '1f632.svg',
    '(:|': '1f613.svg',
    ':|': '1f610.svg',
    ':': '1f612.svg',
    ':@': '1f621.svg',
    '|-)': '1f634.svg',
    '^_^': '1f60a.svg',
    '-_-': '1f611.svg',
    $_$: '1f911.svg',
    'O:)': '1f607.svg',
    '3:)': '1f608.svg',
    '(poop)': '1f4a9.svg',
    '(fuck)': '1f595.svg',
    '(clap)': '1f44f.svg',
    '(ok)': '1f44c.svg',
    '(victory)': '270c.svg',
    '(y)': '1f44d.svg',
    '(n)': '1f44e.svg',
    '(angry)': '1f479.svg',
    '(clown)': '1f921.svg',
    '(crazy)': '1f61c.svg',
    '(devil)': '1f47a.svg',
    '(devil2)': '1f47e.svg',
    '(fb)': '1f1eb.svg',
    '(google)': '1f1ec.svg',
    '(ghost)': '1f47b.svg',
    '(heel)': '1f460.svg',
    '(kiss)': '1f48b.svg',
    '(lipstick)': '1f484.svg',
    '(teacher)': '1f440.svg',
    '(together)': '1f491.svg',
    '(toothy)': '1f913.svg',
    '(baby)': '1f476.svg',
    '(wow)': '1f631.svg'
};
class Agartool {
    constructor(a) {
        eventify(this);
        this.isDebug = true;
          Debugger(true, this, '[[31mAPI.AGTL ' + a.tabName + '[105m]:');
        this.cn = a;
        this.hidden = false;
        this.profile = this.cn.tabName === 'master' ? profiles.masterProfile : profiles.slaveProfile;
        this.publicIP = '';
        this.socket = {};
        this.finderSocket = {};
        this.playerID = null;

        this.timer = setInterval(() => {
            this.sendPlayerPosition();
        }, 2000);

        this.last = {
            nick: '',
            clanTag: '',
            skinURL: '',
            customColor: '',
            playerColor: '',
            partyToken: '',
            serverToken: '',
            region: '',
            gamemode: ''
        };
        this._onSpawn = null;
        this._onDeath = null;
        this._onConnecting = null;
        this._onPlay = null;
        this._onConnecting = null;
        this.initEvents();
        this.setServerData();
    }
    initEvents() {
        this._onSpawn = a => this.onSpawn();
        this._onDeath = a => this.onDeath();
        this._onConnecting = a => this.onConnecting(a);
        this._onPlay = a => this.onPlay();
        this._onConnecting = a => this.onConnecting();
        this.cn.on('spawn', this._onSpawn);
        this.cn.on('death', this._onDeath);
        application.on('connecting', this._onConnecting);
        application.on('playPressed', this._onPlay);
        application.on('spectatePressed', this._onConnecting);
    }
    onPlay() {
        this.setServerData();
    }
    onConnecting(a) {
   this.setServerData();
    }
    onDeath() {
        this.sendPlayerDeath();
    }
    onSpawn() {
        this.sendPlayerSpawn();
        comm.cacheCustomSkin(profiles.masterProfile.nick, null, profiles.masterProfile.skinURL);
        comm.cacheCustomSkin(profiles.slaveProfile.nick, null, profiles.slaveProfile.skinURL);
    }
    destroy() {
        try {
            this.closeConnection();
        } catch (a) {}
        clearInterval(this.timer);
        this.cn.removeListener('spawn', this._onSpawn);
        this.cn.removeListener('death', this._onDeath);
        application.removeListener('connecting', this._onConnecting);
        application.removeListener('playPressed', this._onPlay);
        application.removeListener('spectatePressed', this._onConnecting);
    }
    setServerData() {
        this.ws = this.cn.ws;
        this.nick = this.cn.tabName === 'master' ? profiles.masterProfile.nick : profiles.slaveProfile.nick;
        this.clanTag = profiles.masterProfile.clanTag;
        this.skinURL = this.cn.tabName === 'master' ? profiles.masterProfile.skinURL : profiles.slaveProfile.skinURL;
        this.region = $('#region').val();
        this.gameMode = $('#gamemode').val();
    }
  sendPlayerData(offset, name, str) {
            if (this[name] !== null && this[name] === str) {
                return;
            }
            if (this.isSocketOpen()) {
                this.sendBuffer(this.strToBuff(offset, str));
                this[name] = str;
            }
    }
    lastFlush() {
        this.last = {
            ws: '',
            nick: '',
            clanTag: '',
            skinURL: '',
            customColor: '',
            playerColor: '',
            partyToken: '',
            serverToken: '',
            region: '',
            gamemode: ''
        };
    }
    connect() {
        if (!this.ws) return;
        try {
            if (this.isSocketOpen())
                this.closeConnection();
        } catch (a) {}
        console.log('Search for room');

        this.finderSocket = io.connect(this.publicIP, {
            query: 'version=5&server=' + encodeURIComponent(this.ws)
        });

        this.finderSocket.on('info', b => {
            console.log('Connecting');
            this.mapConnect(b);
        });
    }
    mapConnect(a) {
        this.socket = io.connect(a.minimapServer, {
            reconnection: false,
            query: 'server=' + encodeURIComponent(a.agarServer) + '&tag=' + encodeURIComponent(this.clanTag)
        });

        this.socket.on('command', b => this.handleMessage(b));

        this.socket.on('connect', () => {
            console.log('Connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected');
            this.socket = null;
        });

        this.socket.on('connect_error', () => {
            console.log('Connect error');
            this.socket = null;
        });
    }
    closeConnection() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket.removeAllListeners();
            this.socket = null;
        }

        if (this.finderSocket) {
            this.finderSocket.disconnect();
            this.finderSocket.removeAllListeners();
            this.finderSocket = null;
        }
    }
      reconnect() {
        setTimeout(() => {
            this.connect();
        }, 5000);
    }
    isSocketOpen() {
        return this.socket && this.socket.connected;
    }
    handleMessage(a) {
        this.readMessage(a);
    }
  readMessage(a) {
        if (undefined === a.name) return false;
        switch (a.name) {
            case 'add':
                if (!this.hidden)
                    this.parseTeammate(a);

                break;
            case 'remove':
                break;
            case 'position':
             if (!this.hidden)
                    this.parseTeammatePos(a);

                break;
            case 'customSkins':
                 if (!this.hidden)
                    this.parseSkin(a);

                break;
            case 'reset':
                break;
            case 'chat':
                 if (!this.hidden)
                    this.readChatMessage(a);

                break;
            case 'command':
                 if (!this.hidden)
                    this.readChatMessage(a);

                break;
            case 'ls':
                console.log('Unknown command ls: ' + a.message);
                break;
            case 'hc':
                console.log('Unknown command ls: ' + a.message);
                break;
            default:
                console.log('Received a command with an unknown name: ' + a.name);
        }
    }
    sendPlayerSpawn() {
        if (this.isSocketOpen()) this.socket.emit('command', {
            name: 'alive',
            playerName: this.nick,
            customSkins: this.skinURL
        });
    }
    sendPlayerDeath() {
        if (this.isSocketOpen()) this.socket.emit('command', {
            name: 'dead'
        });
    }
     set clanTag(a) {
        if (a !== this.last.clanTag) {
            this.last.clanTag = a;
            this.connect();
        }
    }
    get clanTag() {
        return this.last.clanTag;
    }
    set ws(a) {
        if (a !== this.last.ws) {
            this.last.ws = a;
            this.connect();
        }
    }
    get ws() {
        return this.last.ws;
    }
    sendPlayerCellUpdate() {
        if (this.isSocketOpen() && this.playerID) {
            function c(e) {
                for (let f = 0; f < e.length; f++) {
                    a.setUint16(b, e.charCodeAt(f), true);
                    b += 2;
                }
                a.setUint16(b, 0, true);
                b += 2;
            }
            let d = 41;
            d += this.nick.length * 2;
            d += this.skinURL.length * 2;
            var a = this.createView(d);
            a.setUint8(0, 20);
            a.setUint32(1, this.playerID, true);
            var b = 5;
            c(this.nick);
            c(this.skinURL);
            c(this.color || '#ffffff');
            c(this.playerColor || '#ffffff');
            this.sendBuffer(a);
        }
    }
  sendPlayerPosition() {
        if (this.cn.play && this.isSocketOpen()) this.socket.emit('command', {
            name: 'position',
            x: this.cn.getPlayerX(),
            y: this.cn.getPlayerX()
        });
    }
   readChatMessage(a) {
        if (settings.disableChat) return;
        const b = a.name === 'chat' ? 101 : 102,
            c = new Date().toTimeString().replace(/^(\d{2}:\d{2}).*/, '$1');

        comm.displayChatMessage(c, b, Math.random(), a.playerName + ': ' + a.message, 'at');
    }
    parseTeammatePos(a) {
        comm.receiveTeammatePos({
            id: a.socketID,
            x: a.x,
            y: a.y,
            mass: 10,
            alive: true,
            updateTime: Date.now(),
            from: 'at'
        });
    }
    parseTeammate(a) {
        comm.updateTeamPlayer({
            id: a.socketID,
            nick: a.playerName,
            skinUrl: '',
            customColor: '#8C81C7',
            defaultColor: '#8C81C7',
            from: 'at',
            quadrant: -1
        });
    }
    parseSkin(a) {
        for (var b in a.customs) {
            const c = a.customs[b];
            if (!c) break;
            comm.updateTeamPlayer({
                id: 'skin loader',
                nick: b.split('%')[0],
                skinUrl: c,
                customColor: '#8C81C7',
                defaultColor: '#8C81C7',
                from: 'at'
            });
        }
    }
    sendChatMessage(a, b, c) {
        const d = a === 101 ? 'chat' : 'command';

        if (this.isSocketOpen()) this.socket.emit('command', {
            name: d,
            nick: b,
            message: c
        });

        this.lastMessageSentTime = Date.now();
    }
}
class Ogario {
    constructor(a) {
        eventify(this);
        this.isDebug = true;
        Debugger(true, this, '[[31mAPI.OGAR ' + a.tabName + '[105m]:');
        this.cn = a;
        this.profile = this.cn.tabName === 'master' ? profiles.masterProfile : profiles.slaveProfile;
        this.nick = '';
        this.clanTag = '';
        this.skinURL = '';
        this.color = '';
        this.playerColor = '';
        this.partyToken = '';
        this.serverToken = '';
        this.region = '';
        this.gameMode = ':ffa';
        this.serverArena = '';
        this.lastSentNick = '';
        this.lastSentClanTag = null;
        this.lastSentSkinURL = '';
        this.lastSentCustomColor = '';
        this.lastSentPartyToken = '';
        this.lastSentServerToken = '';
        this.lastMessageSentTime = Date.now();
        this.publicIP = 'wss://snez.dev:8080/ws';
        this.socket = {};
        this.cells = {};
        this.teamPlayers = [];
        this.parties = [];
        this.chatHistory = [];
        this.chatUsers = {};
        this.chatMutedUsers = {};
        this.chatMutedUserIDs = [];
        this.customSkinsCache = {};
        this.customSkinsMap = {};
        this.cacheQueue = [];
        this.playerID = null;
        this.playerMass = 0;
        this.ws = '';
        this.timer = setInterval(() => {
            this.sendPlayerPosition();
        }, 2000);
        this._onSpawn = null;
        this._onDeath = null;
        this._onConnecting = null;
        this._onPlay = null;
        this._onConnecting = null;
        this.initEvents();
    }
    initEvents() {
        this._onSpawn = a => this.onSpawn();
        this._onDeath = a => this.onDeath();
        this._onConnecting = a => this.onConnecting();
        this._onPlay = a => this.onPlay();
        this._onConnecting = a => this.onConnecting();
        this.cn.on('spawn', this._onSpawn);
        this.cn.on('death', this._onDeath);
        application.on('connecting', this._onConnecting);
        application.on('playPressed', this._onPlay);
        application.on('spectatePressed', this._onConnecting);
    }
    onPlay() {
        this.setServerData();
        this._sendPartyToken();
        this.sendPlayerClanTag();
        this.sendServerToken();
    }
    onConnecting() {
        this.setServerData();
         this._sendPartyToken();
        this.sendPlayerClanTag();
        this.sendServerToken();
        this.sendPlayerDeath();
        this.sendPlayerJoin();
    }
    onDeath() {
        this.sendPlayerDeath();
    }
    onSpawn() {
        this.sendPlayerSpawn();
        comm.cacheCustomSkin(profiles.masterProfile.nick, null, profiles.masterProfile.skinURL);
        comm.cacheCustomSkin(profiles.slaveProfile.nick, null, profiles.slaveProfile.skinURL);
    }
    destroy() {
        try {
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onerror = null;
            this.socket.onclose = null;
            this.socket.close();
            console.log('Disconnected');
        } catch (a) {}
        this.socket = null;
        clearInterval(this.timer);
        this.cn.removeListener('spawn', this._onSpawn);
        this.cn.removeListener('death', this._onDeath);
        application.removeListener('connecting', this._onConnecting);
        application.removeListener('playPressed', this._onPlay);
        application.removeListener('spectatePressed', this._onConnecting);
    }
    setServerData() {
        this.ws = $('#server-ws').val();
        this.serverToken = $('#server-token').val();
        this.nick = this.cn.tabName === 'master' ? $('#nick').val() : profiles.slaveProfile.nick;
        this.clanTag = profiles.masterProfile.clanTag;
        this.skinURL = this.cn.tabName === 'master' ? profiles.masterProfile.skinURL : profiles.slaveProfile.skinURL;
        this.region = $('#region').val();
        this.gameMode = $('#gamemode').val();
    }
   lastFlush() {
        this.serverArena = '';
        this.lastSentNick = '';
        this.lastSentClanTag = null;
        this.lastSentSkinURL = '';
        this.lastSentCustomColor = '';
        this.lastSentPartyToken = '';
        this.lastSentServerToken = '';
        this.lastMessageSentTime = Date.now();
    }
    connect() {
        this.closeConnection();
        console.log(`[Application] Connecting to chat server`);
        this.socket = new WebSocket(this.publicIP);
        this.socket.ogarioWS = true;
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = () => {
             this.log('Connected');
            const a = this.createView(3);
            a.setUint8(0, 0);
            a.setUint16(1, 401, true);
            this.sendBuffer(a);

            this.lastFlush();
            this.setServerData();
             this.sendPartyData();
        };

        this.socket.onmessage = message => {
            this.handleMessage(message);
        };

        this.socket.onclose = close => {
            console.log('[Application] Socket close chat server', close);
            this.reconnect();
        };

        this.socket.onerror = error => {
            console.log(`[Application] Socket error chat server`, error);
        };
    }
    closeConnection() {
        if (this.socket) {
            this.socket.onmessage = null;
            try {
                this.socket.close();
            } catch (a) {}
            this.socket = null;
        }
    }
    reconnect() {
        setTimeout(() => {
            this.connect();
        }, 5000);
    }
    isSocketOpen() {
        return this.socket !== null && this.socket.readyState === this.socket.OPEN;
    }
    createView(a) {
        return new DataView(new ArrayBuffer(a));
    }
    strToBuff(a, b) {
        const c = this.createView(1 + b.length * 2);
        c.setUint8(0, a);
        for (let d = 0; d < b.length; d++) {
            c.setUint16(1 + d * 2, b.charCodeAt(d), true);
        }
        return c;
    }
    sendBuffer(a) {
        this.socket.send(a.buffer);
    }
    handleMessage(a) {
        this.readMessage(new DataView(a.data));
    }
   readMessage(a) {
        switch (a.getUint8(0)) {
            case 0:
                this.playerID = a.getUint32(1, true);
                break;
            case 1:
                this.sendPlayerCellUpdate();
                break;
            case 20:
                if (this.cn.tabName === 'master')
                    this.parseTeammate(a);

                break;
            case 30:
                if (this.cn.tabName === 'master')
                    this.parseTeammatePos(a);

                break;
            case 100:
                if (this.cn.tabName === 'master')
                    this.readChatMessage(a);

                break;
        }
    }
    sendOption(a) {
        if (this.isSocketOpen()) {
            const b = this.createView(1);
            b.setUint8(0, a);
            this.sendBuffer(b);
        }
    }
  sendString(a, b, c) {
        if (this[b] !== null && this[b] === c) {
            return;
        }
        if (this.isSocketOpen()) {
            this.sendBuffer(this.strToBuff(a, c));
            this[b] = c;
        }
    }
    sendPlayerSpawn() {
        this.sendOption(1);
    }
    sendPlayerDeath() {
        this.sendOption(2);
    }
    sendPlayerJoin() {
        this.sendOption(3);
    }
  sendPlayerNick() {
        this.sendString(10, 'lastSentNick', this.nick);
    }
    sendPlayerClanTag() {
        this.sendString(11, 'lastSentClanTag', this.clanTag);
    }
    _sendPlayerSkinURL() {
        this.sendString(12, 'lastSentSkinURL', this.skinURL);
    }
    _sendPlayerCustomColor() {
        this.sendString(13, 'lastSentCustomColor', this.color);
    }
    _sendPlayerColor() {
        if (this.isSocketOpen()) {
            this.sendBuffer(this.strToBuff(14, this.playerColor));
        }
    }
    _sendPartyToken() {
        this.sendString(15, 'lastSentPartyToken', this.partyToken);
    }
    sendServerToken() {
        this.sendString(16, 'lastSentServerToken', this.serverToken);
    }
    _sendServerRegion() {
        if (!this.region) {
            return;
        }
        const a = this.region.split('-');
        if (this.isSocketOpen()) {
            this.sendBuffer(this.strToBuff(17, a[0]));
        }
    }
    _sendServerGameMode() {
        let a = 'FFA';
        switch (this.gameMode) {
            case ':battleroyale':
                a = 'BTR';
                break;
            case ':teams':
                a = 'TMS';
                break;
            case ':experimental':
                a = 'EXP';
                break;
            case ':party':
                a = 'PTY';
                break;
        }
        if (this.isSocketOpen()) {
            this.sendBuffer(this.strToBuff(18, a));
        }
    }
    sendPlayerCellUpdate() {
        if (this.isSocketOpen() && this.playerID) {
            function c(e) {
                for (let f = 0; f < e.length; f++) {
                    a.setUint16(b, e.charCodeAt(f), true);
                    b += 2;
                }
                a.setUint16(b, 0, true);
                b += 2;
            }
            let d = 41;
            d += this.nick.length * 2;
            d += this.skinURL.length * 2;
            var a = this.createView(d);
            a.setUint8(0, 20);
            a.setUint32(1, this.playerID, true);
            var b = 5;
            c(this.nick);
            c(this.skinURL);
            c(this.profile.color || '#ffffff');
            c(this.cn.playerColor || '#ffffff');
            this.sendBuffer(a);
        }
    }
   
    sendPlayerPosition() {
        if (this.cn.play && this.isSocketOpen() && this.playerID) {
            const a = this.createView(17);
            a.setUint8(0, 30);
            a.setUint32(1, this.playerID, true);
            a.setInt32(5, this.cn.getPlayerX(), true);
            a.setInt32(9, this.cn.getPlayerY(), true);
            if (typeof this.cn.playerMass !== 'undefined') {
                a.setUint32(13, this.cn.playerMass, true);
            } else {
                a.setUint32(13, this.cn.playerMass, true);
            }
            this.sendBuffer(a);
        }
    }
      sendServerJoin() {
        this.sendServerToken();
        this.sendPlayerJoin();
    }
    sendPartyData() {
        this.sendPlayerClanTag();
        this._sendPartyToken();
        this.sendServerToken();
    }
    readChatMessage(a) {
        if (settings.disableChat) return;
        const b = new Date().toTimeString().replace(/^(\d{2}:\d{2}).*/, '$1'),
            c = a.getUint8(1),
            d = a.getUint32(2, true),
            e = a.getUint32(6, true);
        for (var f = '', g = 10; g < a.byteLength; g += 2) {
            const h = a.getUint16(g, true);
            if (h == 0) break;
            f += String.fromCharCode(h);
        }
        comm.displayChatMessage(b, c, d, f);
    }
   parseTeammatePos(a) {
        const b = a.getUint32(1, true);
        const c = a.getInt32(5, true);
        const d = a.getInt32(9, true);
        const e = a.getUint32(13, true);
        comm.receiveTeammatePos({
            id: b,
            x: c,
            y: d,
            mass: e,
            alive: true,
            updateTime: Date.now()
        });
    }
   parseTeammate(a) {
        function b() {
            for (var i = '';;) {
                const j = a.getUint16(d, true);
                if (j == 0) {
                    break;
                }
                i += String.fromCharCode(j);
                d += 2;
            }
            d += 2;
            return i;
        }
        const c = a.getUint32(1, true);
        var d = 5;
        const e = b();
        const f = b();
        const g = b();
        const h = b();
        comm.updateTeamPlayer({
            id: c,
            nick: e,
            skinUrl: f,
            customColor: g,
            defaultColor: h
        });
    }
    sendChatMessage(a, b, c) {
        if (this.isSocketOpen()) {
             var c = b + ': ' + c;
            const d = this.createView(10 + c.length * 2);
            d.setUint8(0, 100);
            d.setUint8(1, a);
            d.setUint32(2, this.playerID, true);
            d.setUint32(6, 0, true);
            for (let e = 0; e < c.length; e++) {
                d.setUint16(10 + e * 2, c.charCodeAt(e), true);
            }
            this.sendBuffer(d);
            this.lastMessageSentTime = Date.now();
        }
    }
}
class Tab {
    constructor(a, b) {
        this.type = a;
        this.cn = b;   
        this.agartool = new Agartool(b);
        this.ogario = new Ogario(b);
        this.ogario.connect();
    }
    destroy() {
        this.ogario.destroy();
        this.agartool.destroy();
    }
}
var comm = {
    updateInterval: 1000,
    updateTick: 0,
    updateMaxTick: 2,
    currentSector: '',
    miniMap: null,
    miniMapCtx: null,
    miniMapSectors: null,
    pi2: 2 * Math.PI,
    cells: {},
    teamPlayers: [],
    chatHistory: [],
    chatUsers: {},
    chatMutedUsers: {},
    chatMutedUserIDs: [],
    messageSound: null,
    top5limit: 5,
    get c() {
        return application.tabs[0];
    },
    tab: {},
    tabs: [],
    addTab(a) {
        if (a !== 'master' && a !== 'slave') return false;
        if (this.tab[a]) return console.error('client already exists!');
        const b = new Tab(a, application.tab[a]);
        this.tab[a] = b;
        this.tabs.push(b);
        return b;
    },
    remTab(a) {
        if (a !== 'master' && a !== 'slave') return false;
        const b = this.tab[a];
        if (!b) return console.error('tab not exists!');
        let c = this.tabs.indexOf(b);

        if (c != -1)
            this.tabs.splice(c, 1);

        b.destroy();
        delete this.tab[a];
        this.tab[a] = null;
        return true;
    },
    initEvents(a) {
        application.on('initClient', b => {
            this.addTab(b);
        });
        application.on('destroyClient', b => {
            this.remTab(b);

        });
    },
    checkPlayerID(a) {
        if (a)
            for (let b = 0; b < this.teamPlayers.length; b++) {
                if (this.teamPlayers[b].id == a) return b;
            }
        return null;
    },
    checkPlayerNick(a) {
        if (a)
            for (var b = 0; b < this.teamPlayers.length; b++)
                if (this.teamPlayers[b].nick == a) return b;
        return null;
    },
    escapeHTML(a) {
        return String(a).replace(/[&<>"'/]/g, b => escapeChar[b]);
    },
    checkImgURL(a) {
      if (a.includes('png') || a.includes('jpg') || a.includes('jpeg')) {
            return a;
        } else {
            return false;
        }
            },
    checkSkinURL(a) {
        return this.checkImgURL(a);
    },
    flushData() {
        this.teamPlayers = [];
        this.chatUsers = {};
    },
    flushCells() {
        this.cells = {};
    },
    updateTeamPlayer(a) {
        a.skinUrl = this.checkSkinURL(a.skinUrl);
        const b = this.checkPlayerID(a.id);
        let c = null;
        b !== null ? (c = this.teamPlayers[b], this.teamPlayers[b].nick = a.nick, this.teamPlayers[b].skinURL = a.skinUrl, this.teamPlayers[b].setColor(a.defaultColor, a.customColor)) : (c = new minimapCell(a.id, a.nick, a.skinName, a.skinUrl), c.setColor(a.defaultColor, a.customColor), this.teamPlayers.push(c));
        if (a.quadrant !== null) c.quadrant = a.quadrant;
        this.cacheCustomSkin(a.nick, a.defaultColor, a.skinUrl);
    },
    receiveTeammatePos(a) {
        const b = this.checkPlayerID(a.id);
        if (b !== null) {
            if (a.mass > 360000) return;
            const c = this.teamPlayers[b];
            c.x = a.x;
            c.y = a.y;
            c.mass = a.mass;
            c.alive = a.alive;
            c.updateTime = a.updateTime;
        }
    },
    updateTeamPlayers() {
        this.chatUsers = {};
        this.top5 = [];
        for (const a of this.teamPlayers) {
            if (a.alive && Date.now() - a.updateTime >= 2000 || a.mass == 0)
                a.alive = false;

            if (a.alive) {
                this.top5.push({
                    id: a.id,
                    nick: a.nick,
                    x: a.x,
                    y: a.y,
                    mass: a.mass,
                    color: a.color,
                    quadrant: a.quadrant
                });

                if (!this.isChatUserMuted(a.id))
                    this.addChatUser(a.id, a.nick);
            }
        }
        this.top5.sort((b, c) => c.mass - b.mass);
        this.displayTop5();
    },
    enterChatMessage() {
        if (!this.$messageBox.is(':visible')) {
            this.$messageBox.show();
            this.$messageInput.focus();
            this.$messageInput.val('');
        } else {
            const a = this.$messageInput.val();
             if (a.length) {
                this.tab.master.ogario.sendChatMessage(101, profiles.masterProfile.nick, a);
                this.tab.master.agartool.sendChatMessage(101, profiles.masterProfile.nick, a);
                if (application.play) {
                    this.$messageInput.blur();
                    this.$messageBox.hide();
                }
            } else {
                this.$messageInput.blur();
                this.$messageBox.hide();
            }
            this.$messageInput.val('');
        }
    },
    prepareCommand(a) {
        const b = a.replace('%currentSector%', this.currentSector);
        return b;
    },
    sendCommand(a) {
        const b = this.prepareCommand(chatCommand['comm' + a]);
      this.tab.master.ogario.sendChatMessage(102, profiles.masterProfile.nick, b);
        this.tab.master.agartool.sendChatMessage(102, profiles.masterProfile.nick, b);
    },
    addChatUser(a, b) {
        this.chatUsers[a] = b;
    },
    getChatUserNick(a) {
        if (this.chatUsers.hasOwnProperty(a)) return this.chatUsers[a];
        return '';
    },
    muteChatUser(a) {
        if (!a || this.isChatUserMuted(a)) return;
        const b = this.getChatUserNick(a);
        this.chatMutedUsers[a] = b;
        this.chatMutedUserIDs.push(a);
        toastr.error(dictonary.userMuted.replace('%user%', '<strong>' + this.escapeHTML(b) + '</strong>') + ' <button data-user-id=\"' + a + '\" class=\"btn btn-xs btn-green btn-unmute-user\">' + dictonary.unmute + '</button>');
    },
    unmuteChatUser(a) {
        if (!a) return;
        const b = this.chatMutedUserIDs.indexOf(a);

        if (b != -1) {
            this.chatMutedUserIDs.splice(b, 1);
            toastr.info(dictonary.userUnmuted.replace('%user%', '<strong>' + this.escapeHTML(this.chatMutedUsers[a]) + '</strong>'));
            delete this.chatMutedUsers[a];
        }
    },
    isChatUserMuted(a) {
           if (this.chatMutedUserIDs.indexOf(a) != -1) {
            return true;
        }
                return false;
    },
    parseMessage(a) {
        const b = /\[img\]([\w\:\/\.\?]+)\[\/img\]/i;
        if (b.test(a)) {
            var c = a.match(b)[1];
            if (settings.showChatImages && this.checkImgURL(c)) {
                return '<img src=\"' + c + '\" style=\"width:100%;border:none;\">';
            }      
                  return '';
        }
        const d = /\[yt\]([\w-]{11})\[\/yt\]/i;
        if (d.test(a)) {
            if (settings.showChatVideos) {
                var c = a.match(d);
                return '<iframe type=\"text/html\" width=\"100%\" height=\"auto\" src=\"https://www.youtube.com/embed/' + c[1] + '?autoplay=1&amp;vq=tiny\" frameborder=\"0\" />';
            }
            return '';
        }
        let e = this.escapeHTML(a);

        if (settings.chatEmoticons)
            e = this.parseEmoticons(e);

        return e;
    },
    parseEmoticons(a) {
        return String(a).replace(/\&lt\;3/g, '<3').replace(/(O\:\)|3\:\)|8\=\)|\:\)|\;\)|\=\)|\:D|X\-D|\=D|\:\(|\;\(|\:P|\;P|\:\*|\$\)|\<3|\:o|\(\:\||\:\||\:\\|\:\@|\|\-\)|\^\_\^|\-\_\-|\$\_\$|\(poop\)|\(fuck\)|\(clap\)|\(ok\)|\(victory\)|\(y\)|\(n\)|\(angry\)|\(clown\)|\(crazy\)|\(devil\)|\(devil2\)|\(fb\)|\(google\)|\(ghost\)|\(heel\)|\(kiss\)|\(lipstick\)|\(rage\)|\(teacher\)|\(together\)|\(toothy\)|\(evil\)|\(baby\)|\(wow\))/g, function(b) {
            return '<img src=\"https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/' + emojiChar[b] + '\" alt=\"' + b + '\" class=\"emoticon\">';
        });
    },
    displayChatMessage(a, b, c, d, e) {
        if (settings.disableChat) return;
        if (d.length == 0) return;
        const f = e === 'at' ? 'Ⓐ ' : '';
        let g = d.split(': ', 1).toString();
        const h = this.parseMessage(d.replace(g + ': ', ''));
        if (g.length == 0 || g.length > 15 || h.length == 0) return;
        let i = '';

        if (c != 0 && c != this.playerID) {
            this.addChatUser(c, g);
            i = '<a href=\"#\" data-user-id=\"' + c + '\" class=\"mute-user fas fa-user-times\"></a> ';
        }

        g = this.escapeHTML(g);
        if (b == 101) {
            if (settings.showChatBox) {
                $('#chat-box-messages').append('<div class=\"message\"><span class=\"message-time\">[' + a + '] </span>' + i + ('<span class=\"message-nick\">' + f) + g + ': </span><span class=\"message-text\">' + h + '</span></div>');
                this.chatBoxInstance.scroll([0, '100%'], 100);

                if (settings.chatSounds)
                    this.playSound(this.messageSound);

                return;
            }

            if (!settings.hideChat) {
                toastr.success('<span class=\"message-nick\">' + f + g + ': </span><span class=\"message-text\">' + h + '</span>' + i);

                if (settings.chatSounds)
                    this.playSound(this.messageSound);
            }

            this.chatHistory.push({
                nick: g,
                message: h
            });

            if (this.chatHistory.length > 15)
                this.chatHistory.shift();
        } else {
            if (b == 102) {
                if (settings.showChatBox) {
                    $('#chat-box-messages').append('<div class=\"message command\"><span class=\"command-time\">[' + a + '] </span>' + i + '<span class=\"command-nick\">' + f + g + ': </span><span class=\"command-text\">' + h + '</span></div>');
                    this.chatBoxInstance.scroll([0, '100%'], 100);

                    if (settings.chatSounds)
                        this.playSound(this.commandSound);

                    return;
                }

                if (!settings.hideChat) {
                    toastr.warning('<span class=\"command-nick\">' + f + g + ': </span><span class=\"command-text\">' + h + '</span>' + i);

                    if (settings.chatSounds)
                        this.playSound(this.commandSound);
                }
            } else $('#messages').append(d);
        }
    },
    displayUserList(a, b, c, d, e) {
        let f = '';
        if (Object.keys(a).length) {
            f += '<ol class=\"user-list\">';
            for (const g in a) {
                if (a.hasOwnProperty(g)) {
                    f += '<li><strong>' + this.escapeHTML(a[g]) + '</strong> <button data-user-id=\"' + g + '\" class=\"btn btn-xs ' + c + '\">' + d + '</button></li>';
                }
            }
            f += '</ol>';
        } else {
            f += dictonary.none;
        }      
          toastr[e](f, b, {
            closeButton: true,
            tapToDismiss: false
        });
    },
    displayChatActiveUsers() {
        this.displayUserList(this.chatUsers, dictonary.activeUsers, 'btn-red btn-mute-user', dictonary.mute, 'info');
    },
    displayChatMutedUsers() {
        this.displayUserList(this.chatMutedUsers, dictonary.mutedUsers, 'btn-green btn-unmute-user', dictonary.unmute, 'error');
    },
    displayTop5() {
     if (!settings.showTop5) {
            return;
        }
        let a = '';
        let b = 0;
        let c = this.top5.length;
        for (let d = 0; d < c; d++) {
            b += this.top5[d].mass;
             if (d >= this.top5limit) {
                continue;
            }

            a += `<div class="tl-player">`;
            a += `<div class="tl-position">${(d + 1)}</div>`;
            a += `<div class="tl-player-mass">${this.shortMassFormat(this.top5[d].mass)}</div>`;
            settings.showTop5Sectors && (
                a += `<div class="tl-player-location">[` + this.calculateMapSector(this.top5[d].x, this.top5[d].y) + `]</div>`);
            a += `<div class="tl-player-nick">${this.escapeHTML(this.top5[d].nick)}</div>`;


            a += `</div>`;
             /*a += '<li><span class=\"cell-counter\" style=\"background-color: ' + this.top5[d].color + '\"></span>';
            if (settings.showTargeting) {
                a += '<a href=\"#\" data-user-id=\"' + this.top5[d].id + '\" class=\"set-target ogicon-target\"></a> ';
            }

            if (settings.showTop5Sectors)
                a += '<span class=\"hud-main-color\">[' + this.calculateMapSector(this.top5[d].x, this.top5[d].y) + ']</span> ';

            a += '<span class=\"top5-mass-color\">' + this.shortMassFormat(this.top5[d].mass) + '</span> ' + this.escapeHTML(this.top5[d].nick) + '</li>';*/


                  }
        this.top5pos.innerHTML = a;
        if (this.c.play && this.c.playerMass) {
            b += this.c.playerMass;
            c++;
        }
        this.top5totalMass.textContent = this.shortMassFormat(b);
        this.top5totalPlayers.textContent = c;
    },
    setTop5limit(a) {
       if (!a) {
            return;
        }      
          this.top5limit = a;
    },
    displayChatHistory(a) {
        if (a) {
            this.clearChatHistory(true);
            for (let b = 0; b < this.chatHistory.length; b++) {
                $('#messages').append('<li><span class=\"message-nick\">' + this.chatHistory[b].nick + ': </span><span class=\"message-text\">' + this.chatHistory[b].message + '</span></li>');
            }
            return;
        }
        this.clearChatHistory(false);
    },
    clearChatHistory(a) {
        $('#messages').empty();
        if (a) {
            toastr.clear();
            if (settings.showChatBox) {
                $('#chat-box-messages .message').remove();
                this.chatHistory.length = 0;
            }
        }
    },
    setParty() {
        let a = $('#party-token').val();
        this.gameMode = $('#gamemode').val();
     if (this.gameMode !== ':party' || !a) {
            return;
        }
        let b = a;
        if (a.indexOf('#') != -1) {
            a = a.split('#');
            b = a[1];
        }
        if (this.partyToken !== b) {
            this.partyToken = b;
            this.flushSkinsMap();
            this.flushChatData();
            this.cancelTargeting();
        }
    },
    cacheCustomSkin(a, b, c) {
            Texture.cacheKey(a, c);
    },
    calculateMapSector(a, b, c = false) {
 if (!this.c.mapOffsetFixed) {
            return '';
        }
        const d = c ? this.c.mapOffsetX + this.c.mapOffset : this.c.mapOffset;
        const e = c ? this.c.mapOffsetY + this.c.mapOffset : this.c.mapOffset;
        let f = Math.floor((b + e) / (this.c.mapSize / theme.sectorsY));
        let g = Math.floor((a + d) / (this.c.mapSize / theme.sectorsX));
        f = f < 0 ? 0 : f >= theme.sectorsY ? theme.sectorsY - 1 : f;
        g = g < 0 ? 0 : g >= theme.sectorsX ? theme.sectorsX - 1 : g;
        return String.fromCharCode(f + 65) + (g + 1);
    },
    shortMassFormat(a) {
        return a < 1000 ? a : Math.round(a / 100) / 10 + 'k';
    },
     drawMiniMap() {
        if (!this.c.mapOffsetFixed) return;
        const a = 200 * theme.miniMapScale,
            b = 0,
            c = a + b,
            d = a,
            e = b;
        !this.miniMap ? (this.miniMap = document.getElementById('minimap'), this.miniMapCtx = this.miniMap.getContext('2d'), this.miniMapCtx.ogarioCtx = true, this.miniMap.width = a, this.miniMap.height = c) : this.miniMapCtx.clearRect(0, 0, a, c);

        if (this.miniMap.width != a) {
            this.miniMap.width = a;
            this.miniMap.height = c;
        }

        const f = d / this.c.mapSize,
            g = d / this.c.mapSize,
            h = this.c.mapOffsetX + this.c.mapOffset,
            j = this.c.mapOffsetY + this.c.mapOffset;
        this.drawSelectedCell(this.miniMapCtx);
        this.currentSector = this.calculateMapSector(this.c.playerX, this.c.playerY, true);
        this.miniMapCtx.globalAlpha = 1;
        this.miniMapCtx.font = theme.miniMapFontWeight + ' ' + (b - 4) + 'px ' + theme.miniMapFontFamily;
        this.miniMapCtx.fillStyle = theme.miniMapSectorColor;
        this.miniMapCtx.fillText(this.currentSector, 10, b);

        if (!this.miniMapSectors)
            this.drawMiniMapSectors(theme.sectorsX, theme.sectorsY, d, c, e);

        this.miniMapCtx.save();

        if (this.gameMode === ':battleroyale')
            if (drawRender)
                drawRender.drawBattleAreaOnMinimap(this.miniMapCtx, d, d, f, h, j);

        if (settings.showMiniMapGhostCells) {
            var k = application.ghostCells;
            this.miniMapCtx.beginPath();
            for (var l = 0; l < k.length; l++)
                if (true) {
                    var m = ~~((k[l].x + h) * f),
                        n = ~~((k[l].y + j) * g);
                    this.miniMapCtx.moveTo(m, n);
                    this.miniMapCtx.arc(m, n, ~~(k[l].size * f), 0, this.pi2, false);
                }
            this.miniMapCtx.fillStyle = theme.miniMapGhostCellsColor;
            this.miniMapCtx.globalAlpha = theme.miniMapGhostCellsAlpha;
            this.miniMapCtx.shadowColor = theme.miniMapGhostCellsColor;
            this.miniMapCtx.shadowBlur = 10;
            this.miniMapCtx.shadowOffsetX = 0;
            this.miniMapCtx.shadowOffsetY = 0;
            this.miniMapCtx.fill();
            this.miniMapCtx.globalAlpha = 1;
            this.miniMapCtx.shadowBlur = 0;
        }
        if (settings.showMiniMapGuides) {
            var o = (this.c.playerX + h) * f,
                p = (this.c.playerY + j) * g;
            this.miniMapCtx.lineWidth = 1;
            this.miniMapCtx.strokeStyle = theme.miniMapGuidesColor;
            this.miniMapCtx.beginPath();
            this.miniMapCtx.moveTo(o, 0);
            this.miniMapCtx.lineTo(o, d - 1);
            this.miniMapCtx.moveTo(0, p);
            this.miniMapCtx.lineTo(d - 1, p);
            this.miniMapCtx.stroke();
        }
        if (settings.showExtraMiniMapGuides) {
            var o = (this.c.playerX + h) * f,
                p = (this.c.playerY + j) * g,
                q = drawRender.canvasWidth / (this.c.mapMaxX - this.c.mapMinX) / drawRender.scale,
                r = drawRender.canvasHeight / (this.c.mapMaxY - this.c.mapMinY) / drawRender.scale,
                s = this.miniMapSectors.width * q,
                t = this.miniMapSectors.width * r,
                u = o - s / 2,
                v = p - t / 2,
                w = 4 - r * 12;
            if (w > 0) {
                this.miniMapCtx.globalAlpha = w < 0 ? 0 : w;
                var z = [u + s, v, theme.miniMapTeammatesSize],
                    A = [u, v, theme.miniMapTeammatesSize],
                    B = [u, v + t, theme.miniMapTeammatesSize],
                    C = [u + s, v + t],
                    D = q * 80,
                    E = r * 60;
                this.miniMapCtx.beginPath();
                this.miniMapCtx.moveTo(z[0], z[1] + E);
                this.miniMapCtx.lineTo(...z);
                this.miniMapCtx.lineTo(z[0] - D, z[1]);
                this.miniMapCtx.stroke();
                this.miniMapCtx.beginPath();
                this.miniMapCtx.moveTo(A[0], A[1] + E);
                this.miniMapCtx.lineTo(...A);
                this.miniMapCtx.lineTo(A[0] + D, A[1]);
                this.miniMapCtx.stroke();
                this.miniMapCtx.beginPath();
                this.miniMapCtx.moveTo(B[0] + D, B[1]);
                this.miniMapCtx.lineTo(...B);
                this.miniMapCtx.lineTo(B[0], B[1] - E);
                this.miniMapCtx.stroke();
                this.miniMapCtx.beginPath();
                this.miniMapCtx.moveTo(C[0] - D, C[1]);
                this.miniMapCtx.lineTo(...C);
                this.miniMapCtx.lineTo(C[0], C[1] - E);
                this.miniMapCtx.stroke();
                this.miniMapCtx.globalAlpha = 1;
            }
        }
        for (let F = 0, G = application.tabs.length; G > F; F++) {
            if (application.tabs[F].type >= 3) continue;
            this.miniMapCtx.beginPath();
            this.miniMapCtx.arc((application.tabs[F].playerX + h) * f, (application.tabs[F].playerY + j) * g, theme.miniMapMyCellSize, 0, this.pi2, false);
            this.miniMapCtx.closePath();

            if (theme.miniMapMyCellStrokeSize > 0) {
                this.miniMapCtx.lineWidth = theme.miniMapMyCellStrokeSize;
                this.miniMapCtx.strokeStyle = theme.miniMapMyCellStrokeColor;
                this.miniMapCtx.stroke();
            }

            this.miniMapCtx.fillStyle = theme.miniMapMyCellColor;
            this.miniMapCtx.fill();
        }
        if (this.teamPlayers.length)
            for (let H = 0; H < this.teamPlayers.length; H++) {
                this.teamPlayers[H].drawPosition(this.miniMapCtx, this.c.mapOffset, f, this.privateMiniMap, this.targetID);
            }
        this.miniMapCtx.restore();
    },
    drawMiniMapSectors(a, b, c, d, e) {
        this.miniMapSectors = document.getElementById('minimap-sectors');
        const f = this.miniMapSectors.getContext('2d');
        f.ogarioCtx = true;
        this.miniMapSectors.width = c;
        this.miniMapSectors.height = d;
        f.fillStyle = '#FFFFFF';
        this.drawSectors(f, this.c.mapOffsetFixed, a, b, 0.5, e, c - 0.5, d, theme.miniMapSectorsColor, theme.miniMapSectorsColor, 1, false);
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
            for (var q = 1; q < c + 0; q++) {
                o = e + m * q;
                a.moveTo(q == c ? g : o, f);
                a.lineTo(q == c ? g : o, h);
            }
            for (var q = 1; q < d + 0; q++) {
                p = f + n * q;
                a.moveTo(e - k / 2, q == d ? h : p);
                a.lineTo(g + k / 2, q == d ? h : p);
            }
            a.stroke();
        } else {}
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
    drawMapBorderz(a, b, c, d, e, f, g, h) {
        if (!b) return;
        a.strokeStyle = g;
        a.lineWidth = h;
        a.beginPath();
        a.moveTo(c, d);
        a.lineTo(e, d);
        a.lineTo(e, f);
        a.lineTo(c, f);
        a.closePath();
        a.stroke();
    },
    resetMiniMapSectors() {
        this.miniMapSectors = null;
    },
    drawSelectedCell(a) {
        if (this.c.play && this.c.playerSplitCells > 1 && (settings.splitRange || settings.oppColors || settings.oppRings || settings.showStatsSTE)) {
            a.fillStyle = '#FFFFFF';
            a.globalAlpha = this.selectBiggestCell ? 0.6 : 0.3;
            a.beginPath();
            a.arc(48, 15, 6, 0, this.pi2, false);
            a.closePath();
            a.fill();
            a.globalAlpha = this.selectBiggestCell ? 0.3 : 0.6;
            a.beginPath();
            a.arc(60, 15, 4, 0, this.pi2, false);
            a.closePath();
            a.fill();
        }
    },
    setUi() {
        var a = this;
        this.top5pos = document.getElementById('top5-pos');
        this.top5totalMass = document.getElementById('top5-total-mass');
        this.top5totalPlayers = document.getElementById('top5-total-players');

        this.chatBoxInstance = OverlayScrollbars(document.querySelectorAll('#chat-box'), {
            scrollbars: {
                visibility: 'visible',
                autoHide: 'leave',
                autoHideDelay: 10
            }
        });

        this.$messageBox = $('#message-box');
        this.$messageInput = $('#message');
  $(document).on('click', '#set-targeting', b => {
            b.preventDefault();
            a.setTargeting();
        });
        $(document).on('click', '#cancel-targeting', b => {
            b.preventDefault();
            a.cancelTargeting();
        });
        $(document).on('click', '#set-private-minimap', b => {
            b.preventDefault();
            a.setPrivateMiniMap();
        });
        $(document).on('click', '#change-target', b => {
            b.preventDefault();
            a.changeTarget();
        });
        $(document).on('click', '.team-top-limit', function(b) {
            b.preventDefault();
            const c = $(this);
            const d = parseInt(c.attr('data-limit'));
            if (d) {
                a.setTop5limit(d);
                a.displayTop5();
                $('.team-top').text(d);
                $('.team-top-limit').removeClass('active');
                c.addClass('active');
            }
        });
    $(document).on('click', '#top5-pos .set-target', function(b) {
            b.preventDefault();
            a.setTarget(parseInt($(this).attr('data-user-id')));
        });
        $(document).on('click', '.mute-user', function(b) {
            b.preventDefault();
            a.muteChatUser(parseInt($(this).attr('data-user-id')));
        });
        $(document).on('click', '.btn-mute-user', function() {
            const b = $(this);
            a.muteChatUser(parseInt(b.attr('data-user-id')));
            b.removeClass('btn-red btn-mute-user').addClass('btn-green btn-unmute-user').text(dictonary.unmute);
        });
        $(document).on('click', '.btn-unmute-user', function() {
            const b = $(this);
            a.unmuteChatUser(parseInt(b.attr('data-user-id')));
            b.removeClass('btn-green btn-unmute-user').addClass('btn-red btn-mute-user').text(dictonary.mute);
        });
        $(document).on('click', '.chat-sound-notifications', b => {
            b.preventDefault();
            settings.chatSounds = !settings.chatSounds;
            Settings.saveSettings(settings, 'ogarioSettings');
            a.setChatSoundsBtn();
        });
        $(document).on('click', '.chat-active-users', b => {
            b.preventDefault();
            a.displayChatActiveUsers();
        });
        $(document).on('click', '.chat-muted-users', b => {
            b.preventDefault();
            a.displayChatMutedUsers();
        });
        $(document).on('click', '.show-chat-emoticons', function(b) {
            b.preventDefault();
           const c = $(this);
            const d = $('#chat-emoticons');
            d.toggle();
            if (d.is(':visible')) {
                c.addClass('active');
            } else {
                c.removeClass('active');
                this.$messageInput.focus();
            }
        });       
        for (const b in emojiChar) {
            if (emojiChar.hasOwnProperty(b)) {
                $('#chat-emoticons').append('<img src=\"https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/' + emojiChar[b] + '\" alt=\"' + b + '\" class=\"emoticon\">');
         }
        }
        $(document).on('click', '#chat-emoticons .emoticon', function() {
             const c = $(this);
            const d = c.attr('alt');
            const e = this.$messageInput;
            const f = e.val();
            if (f.length + d.length <= 80) {
                e.val(f + d);
            }
            e.focus();
        });
    },
    preloadChatSounds() {
        this.setMessageSound();
        this.setCommandSound();
        this.setVirusSound();
    },
    setChatSoundsBtn() {
 if (settings.chatSounds) {
            $('.chat-sound-notifications').removeClass('fa-volume-mute').addClass('fa-volume-up');
        } else {
            $('.chat-sound-notifications').removeClass('fa-volume-up').addClass('fa-volume-mute');
        }   
     },
    setVirusSound() {
        this.virusSound = this.setSound(settings.virusSoundURL);
    },
    setMessageSound() {
        this.messageSound = this.setSound(settings.messageSound_);
    },
    setCommandSound() {
        this.commandSound = this.setSound(settings.commandSound_);
    },
    setSound(a) {
       if (!a) {
            return null;
        }       
         return new Audio(a);
    },
    playSound(a) {
        if (a && a.play) {
            a.pause();
            a.currentTime = 0;
            a.play();
        }
    },
    init() {
        eventify(this);
        this.setUi();
        this.preloadChatSounds();
        this.setChatSoundsBtn();
        const e = this;

        setInterval(() => {
            requestAnimationFrame(e.drawMiniMap.bind(this));
        }, 33);
        setInterval(() => {
            e.updateTeamPlayers();
        }, this.updateInterval);
    }
};
comm.init();
 comm.initEvents();