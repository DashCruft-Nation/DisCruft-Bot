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
        
        this.cache.set(data._id.toString(), data);
        return data;
    }
    
    async find(query) {
        const data = await this.model.find(query);
        if (data.length < 1) return;
        
        for (const e of data) {
            if (!this.cache.has(e._id.toString())) this.cache.set(e._id.toString(), e);
        }
        
        return data;
    }
    
    async updateOne(query, doc) {
        const data = await this.findOne(query);
        if (!data) return;
        
        await this.model.updateOne(query, doc);
        const e = this.cache.set(data._id.toString(), doc);
    }
    
    async updateMany(query, doc) {
        const data = await this.find(query);
        if (!data) return;
        
        await this.model.updateMany(query, doc);
        for (const e of data) {
            this.cache.set(e._id.toString(), e);
        }
    }
    
    async insertOne(doc) {
        const data = await this.model(doc).save();
        this.cache.set(data._id.toString(), data);
    }
}
