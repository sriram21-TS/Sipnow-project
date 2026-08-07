const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        _id: false,
        label: { type: String, required: true },
        icon: { type: String, required: true },
        scores: { type: mongoose.Schema.Types.Mixed, default: {} },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
