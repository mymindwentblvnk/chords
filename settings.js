// Shared Settings Management
class Settings {
    constructor() {
        this.storageKey = 'chordz-settings';
        this.defaults = {
            notation: 'english' // 'english' (B) or 'german' (H)
        };
        this.settings = this.load();
    }

    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return { ...this.defaults, ...JSON.parse(stored) };
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
        return { ...this.defaults };
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        } catch (e) {
            console.error('Failed to save settings:', e);
        }
    }

    get(key) {
        return this.settings[key];
    }

    set(key, value) {
        this.settings[key] = value;
        this.save();
    }

    getNotation() {
        return this.get('notation');
    }

    setNotation(notation) {
        this.set('notation', notation);
    }

    isGermanNotation() {
        return this.getNotation() === 'german';
    }

    // Convert note from English to current notation
    formatNote(note) {
        if (this.isGermanNotation() && note === 'B') {
            return 'H';
        }
        if (this.isGermanNotation() && note === 'Bb') {
            return 'B';
        }
        return note;
    }
}

// Global settings instance
const settings = new Settings();
