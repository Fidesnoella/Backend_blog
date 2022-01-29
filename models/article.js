const { string } = require("joi");
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      min: 4,
      max: 255,
      unique: true,
    },
    description: {
      type: String,
      require: true,
      min: 8,
      max: 255,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model(`Article`, articleSchema);
module.exports = Article;
