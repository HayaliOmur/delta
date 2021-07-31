var profiles = new(class {
    constructor() {
        var a = this;
        this.selectedA = 0;
        this.selectedB = 1;
        this.profiles = [];
        this.$nick = $('#nick');
        this.$clantag = $('#clantag');
        this.$skin = $('#skin');
        this.$color = $('#playerColor');
        this.$preview = $('#skin-preview2');
        this.thumbs = document.getElementById('thumbs');
        $('#profiles #rem').mouseenter(() => {
            var b = this.profiles.length;
            $(this.thumbs.children[this.selectedB]).addClass('selectedX');
        }).mouseleave(() => {
            var b = this.profiles.length;
            $(this.thumbs.children[this.selectedB]).removeClass('selectedX');
        });
        $('#profiles #add').click(() => {
            this.addProfile();
        });
        $('#profiles #rem').click(() => {
            var b = this.selectedB;
            this.remProfile(b);
            $('#profiles #rem').trigger('mouseenter');
        });
        this.load();
        this.profiles.forEach((b, c) => {
            this.renderProfile.bind(this)(c);
        });
        this.selectProfile(true, this.selectedA);
        this.selectProfile(false, this.selectedB);
        $(document).on('input', '#skin', function() {
            a.profiles[a.selectedA].skinURL = this.value;
            a.setSkinPreview.bind(a)(a.selectedA);
            a.setSkinProfile.bind(a)(a.selectedA);
        });
        $(document).on('contextmenu', '#thumbs .thumb', function(b) {
            b.preventDefault();
            var c = Array.prototype.slice.call(a.thumbs.children);
            var d = c.indexOf(this);
            a.selectProfile(false, Number(d));
        });
        $(document).on('click', '#thumbs .thumb', function(b) {
            b.preventDefault();
            a.getValues(a.selectedA);
            var c = Array.prototype.slice.call(a.thumbs.children);
            var d = c.indexOf(this);
            a.selectProfile(true, Number(d));
        });
        this.$color.colorPicker({
            margin: '4px 0px 0',
            cssAddon: '.cp-xy-slider:active {cursor:none;}.cp-color-picker{z-index: 250;background-color: var(--color-active-hover);}',
            opacity: false,
            renderCallback: b => {
                this.setColorPreview(b[0].value);
                this.profiles[this.selectedA].color = b[0].value;
                this.saveSettings();
            }
        });
        $(document).on('change', '#clantag, #nick, #skin', b => {
            b.preventDefault();
            this.getValues(this.selectedA);
            this.saveSettings();
        });
    }
    get masterProfile() {
        return this.profiles[this.selectedA];
    }
    get slaveProfile() {
        return this.profiles[this.selectedB];
    }
    load() {
        var a = window.localStorage.getItem('ogarioPlayerProfiles');
        if (a !== null) {
            this.profiles = JSON.parse(a);
        } else {
            for (let d = 0; d < 18; d++) {
                this.profiles.push({
                    nick: 'Profile #' + (d + 1),
                    clanTag: '',
                    skinURL: 'https://i.imgur.com/33kIKOP.png',
                    color: '#3633A5'
                });
            }
        }
        var b = window.localStorage.getItem('ogarioSelectedProfile');
        var c = window.localStorage.getItem('ogarioSelectedProfileB');
        if (b !== null && b != 'undefined') {
            this.selectedA = JSON.parse(b);
        }
        if (c !== null && c != 'undefined') {
            this.selectedB = JSON.parse(c);
        }
        if (this.selectedA >= this.profiles.length) this.selectedA = this.profiles.length - 1;
        if (this.selectedB >= this.profiles.length) this.selectedB = this.profiles.length - 1;
    }
    setColorPreview(a) {
        this.$color.css('background-color', a);
    }
    setSkinPreview(a) {
        if (a == -1) return;
        var b = new Image();
        b.onerror = function() {
            this.style.display = 'none';
        };
        b.crossOrigin = 'anonymous';
        b.src = this.profiles[a].skinURL;
        this.$preview.html(b);
    }
    setSkinProfile(a) {
        var b = new Image();
        b.onerror = function() {
            this.style.display = 'none';
        };
        b.crossOrigin = 'anonymous';
        b.src = this.profiles[a].skinURL;
        $('#profiles-section .thumb:nth(' + a + ')').html(b);
    }
    renderProfile(a) {
        var b = document.createElement('div');
        if (this.profiles[a].skinURL) {
            var c = new Image();
            c.onerror = function() {
                this.style.display = 'none';
            };
            c.crossOrigin = 'anonymous';
            c.src = this.profiles[a].skinURL;
            b.appendChild(c);
        }
        b.className = 'thumb';
        document.getElementById('thumbs').appendChild(b);
        this.setPosition();
    }
    remProfile(a) {
        if (this.profiles.length < 3) return;
        this.profiles.splice(a, 1);
        this.selectProfile(true, this.profiles.length > this.selectedA ? this.selectedA : this.selectedA - 1);
        this.selectProfile(false, this.profiles.length > this.selectedB ? this.selectedB : this.selectedB - 1);
        this.thumbs.children[a].remove();
        this.setPosition();
        this.saveSettings();
    }
    addProfile(a) {
        var b = this.profiles.push({
            nick: 'Profile #' + this.profiles.length,
            clanTag: '',
            skinURL: '',
            color: '#3633A5'
        });
        this.renderProfile(b - 1);
        this.saveSettings();
    }
    setPosition() {
        Math.rad = function(n) {
            return n * Math.PI / 180;
        };
        Math.deg = function(n) {
            return n * 180 / Math.PI;
        };
        var a = 60;
        var b = 50;
        var c = 50;
        var d = document.getElementsByClassName('thumb');
        var e = d.length;
        var f = Math.rad(40);
        var g = Math.rad(100 * 2 / (e - 2));
        var h = Math.rad(-40);
        var j = Math.rad(-100 * 2 / (e - 2));
        for (var k = 0; d.length > k; k++) {
            if (k > Math.ceil(e / 2)) break;
            var l = b + a * Math.cos(f);
            var m = c - a * Math.sin(f);
            // d[k].style = 'top: ' + l + '%;left: ' + m + '%;z-index:' + (200 - k);
            f += g;
        }
        for (var k = Math.floor(d.length / 2); d.length > k; k++) {
            var l = b + a * Math.cos(h);
            var m = c - a * Math.sin(h);
            //d[k].style = 'top: ' + l + '%;left: ' + m + '%;z-index:' + (200 - k);
            h += j;
        }
    }
    selectProfile(a, b) {
        if (a) {
            if (this.thumbs.children[this.selectedA])
                this.thumbs.children[this.selectedA].classList.remove('selectedA');

            this.thumbs.children[b].classList.add('selectedA');
            this.selectedA = b;
            Settings.saveSettings(this.selectedA, 'ogarioSelectedProfile');
            this.setSkinPreview(b);
            this.setValues(b);
        } else {
            if (this.thumbs.children[this.selectedB])
                this.thumbs.children[this.selectedB].classList.remove('selectedB');

            this.thumbs.children[b].classList.add('selectedB');
            this.selectedB = b;
            Settings.saveSettings(this.selectedB, 'ogarioSelectedProfileB');
        }
        this.saveSettings();
    }
    saveSettings() {
        Settings.saveSettings(this.profiles, 'ogarioPlayerProfiles');
    }
    setValues(a) {
        if (a == -1) return;
        this.$nick.val(this.profiles[a].nick);
        this.$clantag.val(this.profiles[a].clanTag);
        this.$skin.val(this.profiles[a].skinURL);
        this.setColorPreview(this.profiles[a].color || '#3633A5');
        this.$color.val(this.profiles[a].color || '#3633A5');
    }
    getValues(a) {
        this.profiles[a].nick = this.$nick.val();
        this.profiles[a].clanTag = this.$clantag.val();
        this.profiles[a].skinURL = this.$skin.val();
        this.profiles[a].color = this.$color.val() || '#3633A5';
    }
})();
window.master = {
    ws: null,
    serverIP: null,
    endpoint: null,
    region: '',
    gameMode: ':ffa',
    partyTokenFromUrl: '',
    _partyToken: '',
    get partyToken() {
        return this._partyToken;
    },
    set partyToken(a) {
        $('#party-token').val(a);
        this._partyToken = a;
    },
    findingServer: 0,
    curValidFindServer: 0,
    backoffPeriod: 500,
    regionNames: {},
    context: '',
    accessToken: null,
    langCodes: {
        AF: 'JP-Tokyo',
        AX: 'EU-London',
        AL: 'EU-London',
        DZ: 'EU-London',
        AS: 'SG-Singapore',
        AD: 'EU-London',
        AO: 'EU-London',
        AI: 'US-Atlanta',
        AG: 'US-Atlanta',
        AR: 'BR-Brazil',
        AM: 'JP-Tokyo',
        AW: 'US-Atlanta',
        AU: 'SG-Singapore',
        AT: 'EU-London',
        AZ: 'JP-Tokyo',
        BS: 'US-Atlanta',
        BH: 'JP-Tokyo',
        BD: 'JP-Tokyo',
        BB: 'US-Atlanta',
        BY: 'EU-London',
        BE: 'EU-London',
        BZ: 'US-Atlanta',
        BJ: 'EU-London',
        BM: 'US-Atlanta',
        BT: 'JP-Tokyo',
        BO: 'BR-Brazil',
        BQ: 'US-Atlanta',
        BA: 'EU-London',
        BW: 'EU-London',
        BR: 'BR-Brazil',
        IO: 'JP-Tokyo',
        VG: 'US-Atlanta',
        BN: 'JP-Tokyo',
        BG: 'EU-London',
        BF: 'EU-London',
        BI: 'EU-London',
        KH: 'JP-Tokyo',
        CM: 'EU-London',
        CA: 'US-Atlanta',
        CV: 'EU-London',
        KY: 'US-Atlanta',
        CF: 'EU-London',
        TD: 'EU-London',
        CL: 'BR-Brazil',
        CN: 'CN-China',
        CX: 'JP-Tokyo',
        CC: 'JP-Tokyo',
        CO: 'BR-Brazil',
        KM: 'EU-London',
        CD: 'EU-London',
        CG: 'EU-London',
        CK: 'SG-Singapore',
        CR: 'US-Atlanta',
        CI: 'EU-London',
        HR: 'EU-London',
        CU: 'US-Atlanta',
        CW: 'US-Atlanta',
        CY: 'JP-Tokyo',
        CZ: 'EU-London',
        DK: 'EU-London',
        DJ: 'EU-London',
        DM: 'US-Atlanta',
        DO: 'US-Atlanta',
        EC: 'BR-Brazil',
        EG: 'EU-London',
        SV: 'US-Atlanta',
        GQ: 'EU-London',
        ER: 'EU-London',
        EE: 'EU-London',
        ET: 'EU-London',
        FO: 'EU-London',
        FK: 'BR-Brazil',
        FJ: 'SG-Singapore',
        FI: 'EU-London',
        FR: 'EU-London',
        GF: 'BR-Brazil',
        PF: 'SG-Singapore',
        GA: 'EU-London',
        GM: 'EU-London',
        GE: 'JP-Tokyo',
        DE: 'EU-London',
        GH: 'EU-London',
        GI: 'EU-London',
        GR: 'EU-London',
        GL: 'US-Atlanta',
        GD: 'US-Atlanta',
        GP: 'US-Atlanta',
        GU: 'SG-Singapore',
        GT: 'US-Atlanta',
        GG: 'EU-London',
        GN: 'EU-London',
        GW: 'EU-London',
        GY: 'BR-Brazil',
        HT: 'US-Atlanta',
        VA: 'EU-London',
        HN: 'US-Atlanta',
        HK: 'JP-Tokyo',
        HU: 'EU-London',
        IS: 'EU-London',
        IN: 'JP-Tokyo',
        ID: 'JP-Tokyo',
        IR: 'JP-Tokyo',
        IQ: 'JP-Tokyo',
        IE: 'EU-London',
        IM: 'EU-London',
        IL: 'JP-Tokyo',
        IT: 'EU-London',
        JM: 'US-Atlanta',
        JP: 'JP-Tokyo',
        JE: 'EU-London',
        JO: 'JP-Tokyo',
        KZ: 'JP-Tokyo',
        KE: 'EU-London',
        KI: 'SG-Singapore',
        KP: 'JP-Tokyo',
        KR: 'JP-Tokyo',
        KW: 'JP-Tokyo',
        KG: 'JP-Tokyo',
        LA: 'JP-Tokyo',
        LV: 'EU-London',
        LB: 'JP-Tokyo',
        LS: 'EU-London',
        LR: 'EU-London',
        LY: 'EU-London',
        LI: 'EU-London',
        LT: 'EU-London',
        LU: 'EU-London',
        MO: 'JP-Tokyo',
        MK: 'EU-London',
        MG: 'EU-London',
        MW: 'EU-London',
        MY: 'JP-Tokyo',
        MV: 'JP-Tokyo',
        ML: 'EU-London',
        MT: 'EU-London',
        MH: 'SG-Singapore',
        MQ: 'US-Atlanta',
        MR: 'EU-London',
        MU: 'EU-London',
        YT: 'EU-London',
        MX: 'US-Atlanta',
        FM: 'SG-Singapore',
        MD: 'EU-London',
        MC: 'EU-London',
        MN: 'JP-Tokyo',
        ME: 'EU-London',
        MS: 'US-Atlanta',
        MA: 'EU-London',
        MZ: 'EU-London',
        MM: 'JP-Tokyo',
        NA: 'EU-London',
        NR: 'SG-Singapore',
        NP: 'JP-Tokyo',
        NL: 'EU-London',
        NC: 'SG-Singapore',
        NZ: 'SG-Singapore',
        NI: 'US-Atlanta',
        NE: 'EU-London',
        NG: 'EU-London',
        NU: 'SG-Singapore',
        NF: 'SG-Singapore',
        MP: 'SG-Singapore',
        NO: 'EU-London',
        OM: 'JP-Tokyo',
        PK: 'JP-Tokyo',
        PW: 'SG-Singapore',
        PS: 'JP-Tokyo',
        PA: 'US-Atlanta',
        PG: 'SG-Singapore',
        PY: 'BR-Brazil',
        PE: 'BR-Brazil',
        PH: 'JP-Tokyo',
        PN: 'SG-Singapore',
        PL: 'EU-London',
        PT: 'EU-London',
        PR: 'US-Atlanta',
        QA: 'JP-Tokyo',
        RE: 'EU-London',
        RO: 'EU-London',
        RU: 'RU-Russia',
        RW: 'EU-London',
        BL: 'US-Atlanta',
        SH: 'EU-London',
        KN: 'US-Atlanta',
        LC: 'US-Atlanta',
        MF: 'US-Atlanta',
        PM: 'US-Atlanta',
        VC: 'US-Atlanta',
        WS: 'SG-Singapore',
        SM: 'EU-London',
        ST: 'EU-London',
        SA: 'EU-London',
        SN: 'EU-London',
        RS: 'EU-London',
        SC: 'EU-London',
        SL: 'EU-London',
        SG: 'JP-Tokyo',
        SX: 'US-Atlanta',
        SK: 'EU-London',
        SI: 'EU-London',
        SB: 'SG-Singapore',
        SO: 'EU-London',
        ZA: 'EU-London',
        SS: 'EU-London',
        ES: 'EU-London',
        LK: 'JP-Tokyo',
        SD: 'EU-London',
        SR: 'BR-Brazil',
        SJ: 'EU-London',
        SZ: 'EU-London',
        SE: 'EU-London',
        CH: 'EU-London',
        SY: 'EU-London',
        TW: 'JP-Tokyo',
        TJ: 'JP-Tokyo',
        TZ: 'EU-London',
        TH: 'JP-Tokyo',
        TL: 'JP-Tokyo',
        TG: 'EU-London',
        TK: 'SG-Singapore',
        TO: 'SG-Singapore',
        TT: 'US-Atlanta',
        TN: 'EU-London',
        TR: 'TK-Turkey',
        TM: 'JP-Tokyo',
        TC: 'US-Atlanta',
        TV: 'SG-Singapore',
        UG: 'EU-London',
        UA: 'EU-London',
        AE: 'EU-London',
        GB: 'EU-London',
        US: 'US-Atlanta',
        UM: 'SG-Singapore',
        VI: 'US-Atlanta',
        UY: 'BR-Brazil',
        UZ: 'JP-Tokyo',
        VU: 'SG-Singapore',
        VE: 'BR-Brazil',
        VN: 'JP-Tokyo',
        WF: 'SG-Singapore',
        EH: 'EU-London',
        YE: 'JP-Tokyo',
        ZM: 'EU-London',
        ZW: 'EU-London'
    },
    master_url: 'webbouncer-live-v8-0.agario.miniclippt.com',
    endpoint_version: 'v4',
    proto_version: '15.0.3',
    client_version: 31009,
    client_version_string: '3.10.9',
    getClientVersion: function() {
        var a = window.localStorage.getItem('ogarioClientVersionString');
        if (a !== null) {
            this.client_version_string = a;
            this.client_version = this.parseClientVersion(this.client_version_string);
        }
        var b = this;
        $.ajax('//agar.io/mc/agario.js', {
            error: function() {},
            success: function(c) {
                var d = c.match(/versionString=\"(\d+\.\d+\.\d+)\"/);
                if (d) {
                    var e = d[1];
                    var f = b.parseClientVersion(e);
                    console.log('[ENV] Current client version:', f, e);
                    b.setClientVersion(f, e);
                }
            },
            dataType: 'text',
            method: 'GET',
            cache: false,
            crossDomain: true
        });
    },
    setClientVersion: function(a, b) {
        console.log('[ENV] Your client version:', this.client_version, this.client_version_string);
        if (this.client_version != a) {
            console.log('[ENV] Changing client version...');
            this.client_version = a;
            this.client_version_string = b;
            if (window.application) {
                window.application.setClientVersion(a, b);
            }
            window.localStorage.setItem('ogarioClientVersionString', b);
        }
    },
    parseClientVersion: function(a) {
        return parseInt(a.split('.')[0]) * 10000 + parseInt(a.split('.')[1]) * 100 + parseInt(a.split('.')[2]);
    },
    getRegionCode: function() {
        var a = window.localStorage.getItem('location');
        if (a) {
            this.setRegion(a, false);
            return;
        }
        $.get('https://' + this.master_url + '/getCountry', b => {
            this.setRegionCode(b.country);
        }, 'json');
    },
    setRegionCode: function(a) {
        if (this.langCodes.hasOwnProperty(a)) {
            this.setRegion(this.langCodes[a], false);
        }
    },
    refreshRegionNumPlayers: function() {
        this.makeMasterSimpleRequest('info', 'text', a => {
            a = JSON.parse(a);
            var b = a.regions;
            for (var c in b) {
                if (b.hasOwnProperty(c)) {
                    $('#region option[value=\"' + c + '\"]').text(this.regionNames[c] + ' (' + b[c].numPlayers + ')');
                }
            }
        });
    },
    getRegionNames: function() {
        var a = this;
        $('#region option').each(function() {
            var b = $(this).val();
            var c = $(this).text();
            if (!a.regionNames.hasOwnProperty(b)) {
                a.regionNames[b] = c;
            }
        });
    },
    findServer: function(a, b, c) {
        var d = Date.now();
        if (d - this.findingServer < 500) {
            return;
        }
        var e = 'findServer';
        if (a == null) a = '';
        if (b == null) b = ':ffa';
        if (b == ':battleroyale') e = 'findBattleRoyaleServer';
        var f = this.setRequestMsg(a, b);
        var g = ++this.curValidFindServer;
        this.findingServer = d;
        this.makeMasterRequest(this.endpoint_version + '/' + e, f, h => {
            if (g != this.curValidFindServer) {
                return;
            }
            if (h.endpoints === null || h.endpoints.https === '0.0.0.0:0') {
                this.findServer(a, b);
                return;
            }
            this.serverIP = h.endpoints.https;
            if (h.token !== null) {
                this.partyToken = h.token;
            }
            this.backoffPeriod = 500;
            this.ws = 'wss://' + this.serverIP + (h.token ? '/?party_id=' + h.token : '');
            c(this.ws);
            this.emit('endpoint', this);
        }, () => {
            setTimeout(() => {
                this.findServer(a, b, c);
            }, this.backoffPeriod *= 2);
        });
    },
    setRequestMsg: function(a, b, c) {
        var d = function(f) {
            e.push(f.length);
            for (var g = 0; g < f.length; g++) {
                e.push(f.charCodeAt(g));
            }
        };
        var e = [10, 4 + a.length + b.length, 10];
        d(a);
        e.push(18);
        d(b);
        if (c) {
            e.push(26, 8, 10);
            d(c);
        }
        return new Uint8Array(e);
    },
    makeMasterRequest: function(a, b, c, d, e) {
        var f = this;
        if (e == null) {
            e = 'application/octet-stream';
        }
        $.ajax('https://' + this.master_url + '/' + a, {
            beforeSend: function(g) {
                g.setRequestHeader('Accept', 'text/plain');
                g.setRequestHeader('Accept', '*/*');
                g.setRequestHeader('Accept', 'q=0.01');
                g.setRequestHeader('Content-Type', e);
                g.setRequestHeader('x-support-proto-version', f.proto_version);
                g.setRequestHeader('x-client-version', f.client_version);
                return true;
            },
            error: function() {
                if (d)
                    d();
            },
            success: function(g) {
                c(g);
            },
            dataType: 'json',
            method: 'POST',
            data: b,
            processData: false,
            cache: false,
            crossDomain: true
        });
    },
    makeMasterSimpleRequest: function(a, b, c, d) {
        var e = this;
        $.ajax('https://' + this.master_url + '/' + a, {
            beforeSend: function(f) {
                f.setRequestHeader('x-support-proto-version', e.proto_version);
                f.setRequestHeader('x-client-version', e.client_version);
                return true;
            },
            error: function() {
                if (d)
                    d();
            },
            success: function(f) {
                c(f);
            },
            dataType: b,
            method: 'GET',
            cache: false,
            crossDomain: true
        });
    },
    createPartyToken(a, b) {
        var c = this.setRequestMsg(a, ':party');
        this.makeMasterRequest(this.endpoint_version + '/createToken', c, function(d) {
            b(d.token);
        }, function(d) {
            console.log(d);
        });
    },
    getPartyServer: function(a, b) {
        a = a.replace('#', '');
        var c = this.setRequestMsg('', '', a);
        this.makeMasterRequest(this.endpoint_version + '/getToken', c, d => {
            b('wss://' + d.endpoints.https + '/?party_id=' + a);
        }, d => {
            this.setMode(':party');
        });
    },
    setURL: function(a) {
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, window.document.title, location.origin + location.pathname + '' + a.replace('/', ''));
        }
    },
    createParty: function() {
        console.log('search token');
        this.createPartyToken(this.region, a => {
            console.log('token found');
            this.getPartyServer(a, b => {
                this.partyToken = a;
                this.ws = b;
                this.setMode(':party', a);
                this.emit('newserver', this);
                console.log('party found', b);
            });
        });
    },
    joinParty() {
        var a = $('#party-token').val().replace('#', '');
        if (a.length != 6) return;
        this.setMode(':party');
        this.getPartyServer(a, b => {
            this.ws = b;
            this.emit('newserver', this);
            console.log('party found', b);
        });
    },
    setUI() {
        var a = this;
        $(document).on('change', '#gamemode', function() {
            a.setMode(this.value);
            $('#random').click();
        });
        $(document).on('change', '#region', function() {
            a.setRegion(this.value);
            $('#random').click();
        });
        $(document).on('click', '#part-create', function() {
            a.createParty();
        });
        $(document).on('click', '#part-join', function() {
            a.joinParty();
        });
    },
    runFromHash: function(a) {
        var b = (window.location.hash || '').replace('#', '');
        var c = ['ffa', 'battleroyale', 'teams', 'experimental', 'party'];
        if (b && c.indexOf(b) != -1) {
            console.log(b, ' 111111111111');
            this.setMode(':' + b);
            return true;
        }
        if (b.length == 6) {
            console.log(b, ' 222222222222');
            this.setMode(':party', b);
            this.partyTokenFromUrl = this.partyToken = b;
            return true;
        }
        return false;
    },
    setRegion: function(a, b) {
        if (b == null) b = true;
        if (!a) return;
        this.region = a;
        window.localStorage.setItem('location', a);
        if ($('#region').val() !== a) $('#region').val(a);
    },
    setMode: function(a, b) {
        if (!a) return;
        if (b && a == ':party') {
            this.setURL('#' + b);
        } else {
            this.setURL('#' + a.replace(':', ''));
        }
        this.gameMode = a;
        window.localStorage.setItem('gamemode', a);
        if ($('#gamemode').val() !== a) $('#gamemode').val(a);
    },
    getServer: function(a) {
        if (this.region.search(/Antarctic/im) > -1) {
            return a('wss://delta-server.glitch.me');
        }
        if (this.region.search(/Zimbabwe/im) > -1) {
            return a('wss://delta-selffeed.glitch.me');
        }
        if (this.region.search(/test2/im) > -1) {
            return a('ws://localhost:8083');
        }
        if (this.region.search(/test/im) > -1) {
            return a('wss://delta-test.glitch.me');
        }
        if (this.partyTokenFromUrl) {
            this.partyTokenFromUrl = '';
            return this.getPartyServer(this.partyToken, b => {
                a(b);
            });
        }
        this.findServer(this.region, this.gameMode, a);
    },
    getDefaultSettings: function() {
        const a = this;
        var b = window.localStorage.getItem('location');

        if (b != null)
            this.setRegion(b);

        var c = window.localStorage.getItem('gamemode');

        if (c != null)
            this.setMode(c);
    },
    init: function() {
        var a = this;
        this.setUI();
        this.getDefaultSettings();
        this.getRegionNames();
        location.href.indexOf('dev') > -1 ? '' : this.getClientVersion();
        this.refreshRegionNumPlayers();
        setInterval(function() {
            a.refreshRegionNumPlayers();
        }, 180000);
    }
};
eventify(master);
master.init();
var coldEnv = {
    fb_app_id: 677505792353827,
    gplus_client_id: '686981379285-oroivr8u2ag1dtm3ntcs6vi05i3cpv0j.apps.googleusercontent.com',
    master_url: 'webbouncer-live-v8-0.agario.miniclippt.com',
    endpoint_version: 'v4',
    proto_version: '15.0.1',
    client_version: 31009,
    client_version_string: '3.10.9'
};
(function(c, e, f) {
    var i, j = c.getElementsByTagName(e)[0];
    if (c.getElementById(f)) return;
    i = c.createElement(e);
    i.id = f;
    i.src = 'https://connect.facebook.net/en_US/sdk.js';
    j.parentNode.insertBefore(i, j);
}(document, 'script', 'facebook-jssdk'));
(function(a, b, c) {
    var e, f = a.getElementsByTagName(b)[0];
    if (a.getElementById(c)) return;
    e = a.createElement(b);
    e.id = c;
    e.src = 'https://apis.google.com/js/client:platform.js?onload=gapiAsyncInit';
    f.parentNode.insertBefore(e, f);
}(document, 'script', 'GAPI'));
var accounts = {
    init() {}
};
var GAPI = null;
var GlAccount = {
    token: null,
    user: {},
    tries: 0,
    isLoggedIn: false,
    reconnect: function() {
        this.logout();
        this.connect();
    },
    connect: function() {
        localStorage.GlAccount = 'yes';
        GAPI.signIn();
        GAPI.currentUser.get();

        if (!GAPI.isSignedIn.get())
            GAPI.signIn();
    },
    readUser: function(a) {
        if (!a || !GAPI || !localStorage.GlAccount) {
            return;
        }
        if (GAPI.isSignedIn.get()) {
            var b = a.getAuthResponse();
            var c = a.getBasicProfile();
            this.token = b.id_token;
            this.user.picture = c.getImageUrl();
            this.user.first_name = c.getGivenName();
            this.user.last_name = c.getFamilyName();
            this.user.id = c.getId();
            this.emit('user');
            this.emit('login');
        }
    },
    read: function() {},
    start: function() {
        if (!!localStorage.GlAccount) this.connect();
    },
    setLogout: function() {
        delete localStorage.GlAccount;
        this.logout();
    },
    logout: function() {
        this.token = null;
        this.user = {};
        this.tries = 0;
        this.emit('logout');
    }
};
var FbAccount = {
    token: null,
    user: {},
    tries: 0,
    isLoggedIn: false,
    reconnect: function() {
        this.logout();
        this.start();
    },
    connect: function() {
        localStorage.FbAccount = 'yes';
        if (!window.FB) alert('You seem to have something blocking Facebook on your browser, please check for any extensions');
        else window.FB.login(this.loginHandler.bind(this), {
            scope: 'public_profile, email'
        });
    },
    loginHandler: function(a) {
        if (a.status == 'connected') {
            this.token = a.authResponse.accessToken;
            if (this.token) {
                this.readUser();
                this.readFriends();
            } else if (this.tries < 3) {
                this.tries++;
                this.connect();
                this.logout();
            }
        }
    },
    readUser: function() {
        if (this.token) {
            this.emit('login');
            window.FB.api('/me/?fields=picture.width(128),first_name,last_name&width=280&height=280', a => {
                this.user.picture = a.picture.data.url;
                this.user.first_name = a.first_name;
                this.user.last_name = a.last_name;
                this.user.id = a.id;
                this.emit('user');
            });
        }
    },
    readFriends: function() {
        if (this.token) {
            window.FB.api('/me/friends?fields=name,id,picture.width(128)', a => {
                this.friends = a.friends;
                this.emit('friends');
                console.log('readFriendsFB', a);
            });
        }
    },
    start: function(a) {
        if (!!localStorage.FbAccount) this.loginHandler(a);
    },
    setLogout: function() {
        delete localStorage.FbAccount;
        this.logout();
    },
    logout: function() {
        this.token = null;
        this.user = {};
        this.tries = 0;
        this.emit('logout');
    }
};
eventify(FbAccount);
eventify(GlAccount);
window.fbAsyncInit = function() {
    window.FB.init({
        appId: coldEnv.fb_app_id,
        cookie: true,
        xfbml: true,
        status: true,
        version: 'v2.8'
    });
    window.FB.getLoginStatus(function(a) {
        if (a.status === 'connected') {
            FbAccount.start(a);
        } else {
            FbAccount.logout();
        }
    });
    window.facebookRelogin = FbAccount.reconnect;
    window.facebookLogin = FbAccount.reconnect;
};
window.gapiAsyncInit = function() {
    window.gapi.load('auth2', function() {
        GAPI = window.gapi.auth2.init({
            client_id: coldEnv.gplus_client_id,
            cookie_policy: 'single_host_origin',
            scope: 'profile',
            app_package_name: 'com.miniclip.agar.io'
        });
        GAPI.currentUser.listen(a => {
            GlAccount.readUser(a);
        });
        GAPI.then(() => GlAccount.start);
    });
};
const CT = {
    master: 0,
    slave: 1,
    spectate: 2
};
const spectatePoints = [];
(function() {
    let a = -10000 + 5000,
        b = -8485.2 + 2828;
    for (let c = 0; c < 15; c++) {
        spectatePoints.push({
            x: a,
            y: b
        });

        b += 2828;
        if (c == 4) {
            a += 5000;
            b = -8485.2 + 2828;
        }
        if (c == 9) {
            a += 5000;
            b = -8485.2 + 2828;
        }
    }
}());
const QServer = new(class {
        constructor() {
            this.sc = [0, 0, 0, 0, 0, 0];
            this.scLock = false;
            this.scoreStep = 0;
            this.lastMostLike = 4;
            this.receiveTimeout = null;
            this.calcTimeout = null;
        }
        reset() {
            clearTimeout(this.receiveTimeout);
            clearTimeout(this.calcTimeout);
            this.sc = [0, 0, 0, 0, 0, 0];
            this.scLock = false;

            this.receiveTimeout = setTimeout(() => {
                console.log('Квадрант не получен, этот клиент главный');
                this.scLock = true;
            }, 2600);
        }
        receiveUsersQuadtant(a) {
            if (!settings.mapGlobalFix) return;
            this.sc[a]++;

            if (this.scLock === false) {
                this.scLock = true;
                clearTimeout(this.receiveTimeout);

                this.calcTimeout = setTimeout(() => {
                    var b = this.calcMostLikeQuadrant(this.sc);
                    application.setQuadrant(b);
                    console.log('it seem global quadrant is', b, 'master ghost', application.tab.master.ghostCellsStep);
                }, 2500);
            }
        }
        calcMostLikeQuadrant(a) {
            return a.indexOf(Math.max(...a.slice(0, 4)));
        }
        calcLocalQuadrant(a) {
            return application.tab.master.quadrant;
        }
    })(),
    application = window.application = {
        invertAccount: null,
        activeTab: 0,
        quadrant: -1,
        tabs: [],
        tab: {
            master: null,
            slave: null,
            spectate: null,
            region0: null,
            region1: null,
            region2: null,
            region3: null,
            region4: null,
            region5: null,
            region6: null,
            region7: null,
            region8: null,
            region9: null,
            region10: null,
            region11: null,
            region12: null,
            region13: null,
            region14: null,
            region15: null
        },
        priority: {
            master: 0,
            slave: 1,
            spectate: 2,
            region0: 3,
            region1: 3,
            region2: 3,
            region3: 3,
            region4: 3,
            region5: 3,
            region6: 3,
            region7: 3,
            region8: 3,
            region9: 3,
            region10: 3,
            region11: 3,
            region12: 3,
            region13: 3,
            region14: 3,
            region15: 3
        },
        slaveEnabled: false,
        spectateEnabled: false,
        fullmapEnabled: false,
        reconnectTimeoutStarted: false,
        gameMode: ':ffa',
        region: '',
        partyToken: '',
        ws: '',
        serverIP: '',
        serverArena: '',
        serverToken: '',
        leaderboard: [],
        ghostCells: [],
        statsHUD: null,
        leaderboardPositionsHUD: null,
        leaderboardDataHUD: null,
        timeHUD: null,
        questHUD: null,
        retryResp: 0,
        showQuest: false,
        showSplitInd: false,
        pause: false,
        dm: true,
        initClient(a) {
            if (this.tab[a]) return false;
            const b = new Client(this.priority[a], a);
            this.tab[a] = b;
            b.profile = a === 'master' ? profiles.masterProfile : profiles.slaveProfile;
            this.recreateTabs();

            b.on('estabilished', d => {
                this.lbStep = this.tabs.length - 1;
                this.ghStep = this.tabs.length - 1;
            });

            if (this.dm) b.on('requestQuadrant', d => {
                this.setQuadrant(QServer.calcLocalQuadrant(d.tabName));
            });

            this.emit('initClient', a);
            return b;
        },
        destroyClient(a) {
            const b = this.tab[a];
            if (!b) return false;
            this.emit('destroyClient', a);
            b.removeEvents();
            b.connect(false);
            delete this.tab[a];
            this.tab[a] = null;
            this.recreateTabs();
            return true;
        },
        swapTabs() {
            [this.tabs[0], this.tabs[1]] = [this.tabs[1], this.tabs[0]];
        },
        recreateTabs() {
            this.tabs = [];
            for (var a in this.tab) {
                if (this.tab[a]) this.tabs.push(this.tab[a]);
            }
            this.tabs.sort((b, c) => {
                return b.type - c.type;
            });
            if (this.activeTab == 1) this.swapTabs();
        },
        switchTab(a) {
            let b = Number(!this.activeTab);
            let c = this.tab[b == 0 ? 'master' : 'slave'];
            if (a !== undefined) {
                if (a == this.activeTab) {
                    this.activeTab = b;
                    this.swapTabs();
                }
                if (a == -1 && this.activeTab == 1) {
                    this.activeTab = b;
                    this.swapTabs();
                }
                return;
            }
            if (c) {
                if (c.play) {
                    this.activeTab = b;
                    this.swapTabs();
                } else if (c.estabilished) {
                    c.sendNick(profiles[b == 0 ? 'masterProfile' : 'slaveProfile'].nick);
                    c.once('spawn', () => {
                        this.switchTab();
                    });
                } else {
                    console.error('Error');
                }
            } else {
                c = this.initClient('slave');
                c.connect(application.ws);
                c.once('estabilished', d => {
                    this.switchTab();
                });

                if (this.dm) c.once('gh', d => {
                    d.setQuadrant(this.tab.master.quadrant);
                });
            }
        },
        initSpectate() {
            this.initClient('spectate');
            this.tab.spectate.connect(this.ws);
            this.tab.spectate.on('estabilished', a => {
                a.sendSpectate();
            });

            if (this.dm) this.tab.spectate.on('gh', a => {
                a.setQuadrant(this.tab.master.quadrant);
            });
        },
        initRegion(a) {
            const b = this.initClient('region' + a);
            b.connect(this.ws);

            b.on('estabilished', d => {
                d.sendFreeSpectate();
                d.sendSpectate();
                b.targetX = spectatePoints[a].x;
                b.targetY = spectatePoints[a].y;
            });
        },
        initFullSpect() {

            for (var a = 0; a < 15; a++) {
                this.initRegion(a);
            }
        },
        destroyFullSpect() {
            for (var a = 0; a < 15; a++) {
                this.destroyClient('region' + a);
            }
        },
        get play() {
            if (this.tab.master && this.tab.master.play) return true;
            if (this.tab.slave && this.tab.slave.play) return true;
            return false;
        },
        doPlay() {
            if (this.play) return;
            this.getActiveTab().sendNick(profiles.masterProfile.nick);
        },
        getActiveTab() {
            return this.tabs[0];
        },
        sendFreeSpectate() {
            if (this.tab.master)
                this.tab.master.sendFreeSpectate();

            if (this.tab.slave)
                this.tab.slave.sendFreeSpectate();
        },
        sendSpectate() {
            if (this.tab.master)
                this.tab.master.sendSpectate();

            if (this.tab.slave)
                this.tab.slave.sendSpectate();
        },
        feed() {
            this.getActiveTab();
            this.getActiveTab().sendEject();
        },
        macroFeed(a) {
            if (a) {
                if (this.feedInterval) {
                    return;
                }
                const b = this;
                this.feed();
                this.feedInterval = setInterval(() => {
                    b.feed();
                }, settings.macroFeeding);
            } else {
                if (this.feedInterval) {
                    clearInterval(this.feedInterval);
                    this.feedInterval = null;
                }
            }
        },
        split() {
            this.getActiveTab().sendSplit();
        },
        doubleSplit() {
            this.getActiveTab().doubleSplit();
        },
        popSplit() {
            this.getActiveTab().popSplit();
        },
        tripleSplit() {
            this.getActiveTab().tripleSplit();
        },
        split16() {
            this.getActiveTab().split16();
        },
        tryResp() {
            function a() {
                this.getActiveTab().sendNick(profiles[this.activeTab == 0 ? 'mainProfile' : 'slaveProfile'].nick);
            }
            if (this.getActiveTab().estabilished) {} else {
                this.getActiveTab().once('estabilished', () => {
                    a.bind(this)();
                });
            }
        },
        quickResp() {
            if (!settings.quickResp) {
                return;
            }
            Settings.hideMenu();
            this.getActiveTab().connect(this.ws);
            this.getActiveTab().play = false;
            this.tryResp();
        },
        autoResp() {
            if (!settings.autoResp) {
                return;
            }
            $('#play').click();
        },
        setQuadrant(a) {
            for (const b of this.tabs) b.setQuadrant(a);
        },
        getQuadrant() {},
        setPause() {
            this.pause = !this.pause;
            tempsett.pause = this.pause;
            if (this.pause) {
                for (const a of this.tabs) a.resetTargetPosition();
                $('#pause-hud').show();
            } else {
                $('#pause-hud').hide();
            }
        },
        escapeHTML(a) {
            return String(a).replace(/[&<>"'/]/g, b => escapeChar[b]);
        },
        shortMassFormat(a) {
            return a < 1000 ? a : Math.round(a / 100) / 10 + 'k';
        },
        ghStep: 0,
        handleGhostCells(a) {
            this.ghStep++;

            if (this.ghStep % this.tabs.length == 0) {
                this.ghostCells = [];
                this.ghStep = 0;
            }

            if (a.ghostCells.length > this.ghostCells.length) {
                this.ghostCells = a.ghostCells;
                for (var b = 0; this.ghostCells.length > b; b++) {
                    this.ghostCells[b].inView = this.reverseCheckGhost(this.ghostCells[b].x, this.ghostCells[b].y, this.ghostCells[b].size / 2, this.tabs.length);
                }
            }
        },
        reverseCheckGhost(a, b, c, d) {
            for (let e = d - 1; - 1 < e; e--) {
                if (this.tabs[e].isInViewport(a, b, c)) return true;
            }
            return false;
        },
        lbStep: 0,
        handleLeaderboard(a) {
            this.lbStep++;

            if (this.lbStep % this.tabs.length == 0)
                this.lbStep = 0;

            if (this.lbStep == this.tabs.length - 1) this.leaderboard = a.leaderboard;
            let b = '';
            let c = '';
            for (var d = 0; d < this.leaderboard.length; d++) {
                if (application.tab.master && application.tab.master.playerPosition - 1 === d) {
                    b += '<span class=\"me\">' + this.escapeHTML(this.leaderboard[d].nick) + ' <b style="margin-left:5px;">' + (d + 1) + '</b> </span>';
                } else if (application.tab.slave && application.tab.slave.playerPosition - 1 === d) {
                    b += '<span class=\"me\">' + this.escapeHTML(this.leaderboard[d].nick) + ' <b style="margin-left:5px;">' + (d + 1) + '</b> </span>';
                } else if (d < settings.leaderboardLength) {
                    if (profiles.masterProfile.clanTag.length && this.leaderboard[d].nick.indexOf(profiles.masterProfile.clanTag) == 0) {
                        b += '<span class=\"teammate\">' + (d + 1) + '. ' + this.escapeHTML(this.leaderboard[d].nick) + '</span>';
                    } else {
                        b += '<span>' + this.escapeHTML(this.leaderboard[d].nick) + ' <b style="margin-left:5px;"> ' + (d + 1) + '</b></span>';
                    }
                }
            }
            if (this.leaderboard.length > settings.leaderboardLength) b += '<span class=\"me\">Total : ' + this.leaderboard.length + '</span>';
            if (settings.showLbData) {
                for (var d = 0; d < this.ghostCells.length; d++) {
                    if (d == settings.leaderboardLength) {
                        break;
                    }
                    c += '<span class=\"lb-data\"><span class=\"top5-mass-color\">' + this.shortMassFormat(this.ghostCells[d].mass) + '</span></span>';
                }
            }
            application.displayLeaderboard(b, c);
        },
        displayLeaderboard(a, b = '') {
            if (!this.leaderboardPositionsHUD) {
                return;
            }
            this.leaderboardPositionsHUD.innerHTML = a;
            this.leaderboardDataHUD.innerHTML = b;
        },
        displayStats() {
            if (!settings.showStats) {
                $('#stats-hud').hide();
                return;
            }
            let a = [];
            if (this.play) {
                if (settings.showStatsMass && this.tab.master.playerMass) {
                    a.push(dictonary.mass + ': ' + this.tab.master.playerMass + '/' + ~~(this.tab.master.playerMass / 4) + '/' + ~~(this.tab.master.playerMass / 16));
                }
                if (this.tab.master.playerScore) {
                    a.push(dictonary.score + ': ' + this.tab.master.playerScore);
                }
                if (settings.showStatsSTE && this.tab.master.STE) {
                    a.push('STE: ' + this.tab.master.STE);
                }
                if (settings.showStatsN16 && this.tab.master.playerSplitCells) {
                    a.push(this.tab.master.playerSplitCells === 16 ? '<span style=\"background:green\">' + this.tab.master.playerSplitCells + '/16</span>' : this.tab.master.playerSplitCells + '/16');
                }
            }
            if (window.drawRender && settings.showStatsFPS) {
                a.push('FPS: ' + drawRender.fps);
            }
            if (settings.showStatsPPS) {
                let c = '';
                if (this.tab.master.pps < 23 || this.tab.master.pps > 29) c = 'color:#ff4c4c';
                if (this.tab.master.pps < 20 || this.tab.master.pps > 32) c = 'color:red';
                a.push('PPS: <span style=\"' + c + '\">' + this.tab.master.pps + '</span>');
            }
            const b = a.join('  ');
            this.statsHUD.innerHTML = b;
            setTimeout(() => {
                requestAnimationFrame(() => this.displayStats());
            }, 250);
        },
        displayTime() {
            if (!settings.showTime) {
                $('#time-hud').hide();
                return;
            }
            const a = new Date().toLocaleString();
            this.timeHUD.textContent = a;
            setTimeout(() => {
                this.displayTime();
            }, 1000);
        },
        setUI() {
            const a = this;
            $(document).on('click', '#stream-mode', () => {
                settings.streamMode = !settings.streamMode;
                a.saveSettings(settings, 'ogarioSettings');
                a.setStreamMode();
            });
            $(document).on('click', '#hide-url', () => {
                settings.hideSkinUrl = !settings.hideSkinUrl;
                a.saveSettings(settings, 'ogarioSettings');
                a.setHideSkinUrl();
            });
            $(document).on('click', '#server-connect', () => {
                a.joinByWS($('#server-ws').val());
            });
            $(document).on('click', '#server-reconnect', () => {
                a.gameServerReconnect();
            });
            $(document).on('click', '#server-join', () => {
                a.joinByToken($('#server-token').val());
            });
            $(document).on('click', '#random', () => {
                for (var e of a.tabs) e.closeConnection(true);
                master.getServer(f => {
                    a.joinByWS(f);
                });
            });
            master.on('newserver', () => {
                for (var e of a.tabs) {}
                this.joinByWS(master.ws);
            });
            $(document).on('click', '#spectate', () => {
                this.sendSpectate();
                Settings.hideMenu();
                this.emit('spectatePressed');
            });
            $(document).on('click', '#play', () => {
                Settings.hideMenu();
                this.doPlay();
                this.emit('playPressed');
            });
            this.on('death', e => {
                if (this.play) {
                    return this.switchTab(e.type);
                } else {
                    this.switchTab(-1);
                    Settings.showMenu();
                    this.autoResp();
                }
            });
            var b = 0;
            this.on('close', e => {
                if (e.type === 'master') {
                    master.getServer(f => {
                        this.flushLbGh();
                        this.joinByWS(f);
                    });
                } else {
                    e.connect(this.ws);
                }
                e.connect(this.ws);
            });
            application.invertAccount = localStorage.invertedAccount4 == null ? false : localStorage.invertedAccount4 == 'false' ? false : true;

            function c(e, f) {
                application.invertAccount = e;
                localStorage.invertedAccount4 = application.invertAccount;

                if (application.tab.master && application.tab.master.accessTokenSent == true)
                    application.joinByWS(application.ws);

                if (application.tab.slave && application.tab.slave.accessTokenSent == true)
                    application.joinByWS(application.ws);

                if (f)
                    $('#primaryAccount').val(application.invertAccount == true ? 1 : 0);
            }
            $(document).on('click', '.btn-auth-facebook', f => {
                if (FbAccount.token) return;

                if (!FbAccount.token && !GlAccount.token)
                    c(false, true);

                FbAccount.connect();
            });
            $(document).on('click', '.btn-auth-google', f => {
                if (GlAccount.token) return;

                if (!FbAccount.token && !GlAccount.token)
                    c(true, true);

                GlAccount.connect();
            });
            $(document).on('click', '.btn-logout-facebook', () => {
                FbAccount.setLogout();
                Settings.displayChatInfo(0, 'Please, refresh server');
            });
            $(document).on('click', '.btn-logout-google', () => {
                GlAccount.setLogout();
                Settings.displayChatInfo(0, 'Please, refresh server');
            });
            $(document).on('change', '#primaryAccount', function() {
                c(this.value == '0' ? false : true);
            });
            c(application.invertAccount, true);

            function d() {
                $('.btn-logout-facebook')[FbAccount.token ? 'show' : 'hide']();
                $('.btn-logout-google')[GlAccount.token ? 'show' : 'hide']();
                if (!(FbAccount.token)) {
                    $('.unauthorized').show();
                    $('.authorized').hide();
                } else {
                    $('.unauthorized').hide()
                    $('.authorized').show();
                }

                if (!(GlAccount.token)) {
                    $('.unauthorized2').show();
                    $('.authorized2').hide();
                } else {
                    $('.unauthorized2').hide()
                    $('.authorized2').show();
                }
            }
            d();
            this.on('estabilished', e => {
                if (e.type == 0 || e.type == 1) {
                    if (this.invertAccount == false && e.type == 0 || this.invertAccount == true && e.type == 1) {
                        if (FbAccount.token)
                            e.sendFbToken(FbAccount.token);
                    } else {
                        if (GlAccount.token)
                            e.sendGplusToken(GlAccount.token);
                    }
                }
            });
            this.on('logout', e => {
                if (e.type == 0 || e.type == 1) {
                    if (this.invertAccount == false && e.type == 0 || this.invertAccount == true && e.type == 1) {
                        FbAccount.logout();
                        Settings.displayChatInfo(0, 'Facebook login canceled by server');
                    } else {
                        GlAccount.logout();
                        Settings.displayChatInfo(0, 'Google login canceled by server');
                    }
                }
            });
            FbAccount.on('login', () => {
                d();
                var e = this.invertAccount == false ? this.tab.master : this.tab.slave;
                if (!e) return;
                console.log('[FB] login for', e.tabName);

                if (e.accessTokenSent == false && e.clientKey != null)
                    e.sendFbToken(FbAccount.token);
            });
            FbAccount.on('logout', () => {
                d();
                c(this.invertAccount);
            });
            GlAccount.on('login', () => {
                d();
                var e = this.invertAccount == false ? this.tab.slave : this.tab.master;
                if (!e) return;
                console.log('[GL] login for', e.tabName);

                if (e.accessTokenSent == false && e.clientKey != null)
                    e.sendGplusToken(GlAccount.token);
            });
            GlAccount.on('logout', () => {
                d();
                c(this.invertAccount);
            });
            this.on('captcha', e => {
                if (window.myCaptcha.widget != null)
                    grecaptcha.reset(window.myCaptcha.widget);

                window.agarCaptcha.requestCaptcha();
                window.core = {
                    recaptchaResponse(f) {
                        e.sendRecaptcha(f);
                    }
                };
            });
            $('#captchaWindow').on('click', () => {
                window.myCaptcha.hide();
            });
            this.on('spawn', e => {
                this.emit('playerSpawn', e);
            });
            this.on('death', e => {
                this.emit('playerDeath', e);
                localStorage.send = JSON.stringify({
                    e: 'env',
                    key: 'ai',
                    value: true,
                    _: Math.random()
                });
                if (a.play) return;
            });
            this.on('connecting', e => {
                this.emit('playerJoin', e);
            });
            this.statsHUD = document.getElementById('stats-hud');
            this.activeParties = document.getElementById('active-parties');
            this.leaderboardPositionsHUD = document.getElementById('leaderboard-positions');
            this.leaderboardDataHUD = document.getElementById('leaderboard-data');
            this.timeHUD = document.getElementById('time-hud');
            this.questHUD = document.getElementById('quest-hud');
            $('#canvas').bind('contextmenu', () => false);
            $(document).on('mouseup', '.btn', function() {
                $(this).blur();
            });
            toastr.options = {
                newestOnTop: false,
                positionClass: 'toast-bottom-left',
                timeOut: 15000
            };
            $(document).on('click', '.btn-open-client', () => {
                window.open('https://agar.io/botclient?targetUrl=' + this.ws + '&clientVersion=' + master.client_version, '', 'toolbar,scrollbars,resizable,top=500,left=500,width=400,height=400');
            });
        },
        setStreamMode() {
            if (settings.streamMode) {
                $('#stream-mode').addClass('ogicon-eye-blocked');
                $('#clantag, #nick, #party-token').addClass('stream-mode');
            } else {
                $('#stream-mode').removeClass('ogicon-eye-blocked');
                $('#clantag, #nick, #party-token').removeClass('stream-mode');
            }
        },
        setHideSkinUrl() {
            if (settings.hideSkinUrl) {
                $('#hide-url').addClass('ogicon-eye-blocked');
                $('#skin').addClass('hide-url');
            } else {
                $('#hide-url').removeClass('ogicon-eye-blocked');
                $('#skin').removeClass('hide-url');
            }
        },
        setVirusColor(a) {
            const b = Math.floor(a * a / 100);
            if (b > 183) {
                return '#C80000';
            }
            return theme.virusColor;
        },
        setVirusStrokeColor(a) {
            for (var b of application.tabs) {
                if (b.play && b.playerMaxMass != 0) {
                    const c = Math.floor(a * a / 100);
                    const d = c / (tempsett.selectBiggestCell ? b.playerMaxMass : b.playerMinMass);
                    if (d > 0.76) {
                        return '#FFDC00';
                    }
                    return '#C80000';
                }
                return theme.virusStrokeColor;
            }
        },
        flushSpecsData() {
            if (typeof spects === 'undefined') {
                console.log('[SPECT] Acces DENIED.')
            } else {
                if (spects) {
                    spects.forEach((spect) => {
                        spect.closeConnection()
                        console.log('[SPECT] Cleared viewports!');
                    })
                    spects = [];
                }
            }
        },
        addSpect() {
            addFullSpectator();
        },

        setFullSpectator() {

            this.flushSpecsData();
            this.addSpect();
        },
        getWS(a) {
            if (!a) {
                return;
            }
            this.ws = a;
            this.createServerToken();
            this.updateServerInfo();
            if (typeof spects === 'undefined') {
                console.log('[SPECT] Acces DENIED.');
            } else {
                if (spects) {
                    this.flushSpecsData();
                }
            }
        },
        recreateWS(a) {
            if (!a) {
                return null;
            }
            let b = null;
            if (!b && /^[a-z0-9]{5,}\.tech$/.test(a)) {
                b = 'wss://live-arena-' + a + '.agar.io:80';
            }
            if (/^[a-zA-Z0-9=+/]{12,}$/.test(a)) {
                const c = atob(a);
                if (!b && c.search(/agar\.io/) == -1) {
                    b = 'wss://' + c;
                    return b;
                }
                if (/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]{1,4}/.test(c)) {
                    b = 'wss://ip-' + c.replace(/./g, '-').replace(':', '.tech.agar.io:');
                }
            }
            if (!b && /^[a-z0-9]{5,}$/.test(a)) {
                b = 'wss://live-arena-' + a + '.agar.io:443';
            }
            return b;
        },
        createServerToken() {
            let a = this.ws.match(/ip-\d+/);
            const b = this.ws.match(/live-arena-([\w\d]+)/);
            var c = this.ws.match(/live-arena-(.+\.tech)/);
            let d = null;
            if (a) {
                const e = this.ws.replace('.tech.agar.io', '').replace(/-/g, '.');
                a = e.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]{1,4}/);
                if (a) {
                    this.serverIP = a[0];
                    d = btoa(this.serverIP);
                }
            }
            if (c && c[1]) {
                const f = c[1];
                console.log(f);
                this.serverArena = f;
                d = this.serverArena;
            }
            if (this.ws.search(/wss?:\/\//) > -1 && this.ws.search(/agar\.io/) == -1) {
                d = this.ws.match(/wss?:\/\/(.+)/)[1];
                this.serverIP = d;
                d = btoa(d);
            }
            if (!d && b) {
                this.serverArena = b[1];
                d = this.serverArena;
            }
            if (d) {
                if (this.serverToken !== d) {
                    this.serverToken = d;
                }
                this.partyToken = '';
                const g = this.ws.match(/party_id=([A-Z0-9]{6})/);
                if (g) {
                    this.partyToken = g[1];
                    master.setURL('/#' + window.encodeURIComponent(this.partyToken));
                }
            }
        },
        updateServerInfo() {
            $('#server-ws').val(this.ws);
            $('#server-token').val(this.serverToken);
            master.partyToken = this.partyToken;
        },
        joinByWS(a) {
            if (!a) return;
            this.connect(a);
        },
        joinRandomWS() {
            if (window.master && window.master.reconnect)
                window.master.reconnect();
        },
        joinByToken(a) {
            const b = this.recreateWS(a);
            if (b) this.joinByWS(b);
        },
        flushLbGh() {
            this.ghostCells = [];
            this.leaderboard = [];
        },
        connect(a) {
            if (!a) return this.disconnect();
            QServer.reset();
            this.flushLbGh();
            console.log('Start connection:', a);

            localStorage.send = JSON.stringify({
                e: 'env',
                key: 'targetUrl',
                value: a,
                _: Math.random()
            });

            this.ws = a;
            this.getWS(this.ws);
            this.activeTab = 0;
            this.destroyClient('slave');
            this.destroyFullSpect();
            for (var b of this.tabs) {
                b.connect(a);
            }
        },
        disconnect() {
            for (var a of this.tabs) a.closeConnection(true);
            this.flushLbGh();
        },
        reconnectTimeout(a) {
            console.log('rcon timeout');
            if (this.reconnectTimeoutStarted) return false;
            this.reconnectTimeoutStarted = true;

            setTimeout(() => {
                var b = false;
                for (var d of this.tabs) {
                    if (d.isSocketOpen()) b = true;
                }

                b ? a.connect(this.ws) : master.getServer(e => {
                    this.flushLbGh();
                    this.connect(e);
                });

                this.reconnectTimeoutStarted = false;
            }, 1000);
        },
        init() {
            this.setUI();
            this.initClient('master');
            setTimeout(() => {
                this.displayStats();
            }, 1000);
            master.getServer(a => {
                this.joinByWS(a);
            });
        }
    };
eventify(application);