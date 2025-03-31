const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const videoSchema = new Schema({

    // *** AGREGAR VIDEOS ***
    
    title_link: { type: String },
    link_yt: { type: String, trim: true, match: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/ },
    thumbnail_url: { type: String},

});

videoSchema.pre('save', function(next) {
    if (this.link_yt) {
        const videoIdMatch = this.link_yt.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[^\w]|\?|$)/);
        if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            this.link_yt = `https://www.youtube.com/embed/${videoId}`;
            this.thumbnail_url = videoId;
        }
    }
    next();
});

module.exports = model('VideoModel', videoSchema);