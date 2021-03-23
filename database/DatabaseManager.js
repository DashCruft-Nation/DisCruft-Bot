module.exports = class DatabaseManagerr {
    constructor(model) {
        this.model = model;
        this.cache = new Map();
        setInterval(() => {
            this.cache = new Map();
        }, 60000);
    }
    
    async findOne(query) {
        for (const e of this.cache.values()) {
            let m = true;
            for (const key of Object.keys(query)) {
                if (e[key] !== query[key]) {
                    m = false;
                    break;
                }
                if (m) {
                    return e;
                }
            }
        }
        
        const data = await this.model.findOne(query);
        if (!data) return;
        
        this.cache.set(data._id.toString());
        return data;
    }
}
