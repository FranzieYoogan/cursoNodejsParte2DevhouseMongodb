const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    status: {
      type: Boolean,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//definindo onde será armazenado a imagem
HouseSchema.virtual('thumbnail_url').get(function () { 
  return `http://localhost:3000/files/${this.thumbnail}`;
});

module.exports = mongoose.model('House', HouseSchema, 'houses');
