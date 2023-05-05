const Question = require("../model/questionModel");
const asyncHandler = require("express-async-handler");

const getAllQuestion = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).sort([["count", -1]]);

  if (questions) {
    res.json(questions);
  } else {
    res.status(404).json({ message: "No Task found " });
  }
});

// const getTrendingQuestion = async () => {
//   const question = await Question.find({});
// };

const CreateQuestion = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  console.log("hello from questiontask");
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const newquestion = new Question({
      title,
      content,
      category,
    });
    const createdQuestion = await newquestion.save();
    console.log("question id", createdQuestion._id);
    console.log(createdQuestion);
    res.status(201).json(createdQuestion);
  }
});
const DeleteQuestion = asyncHandler(async (req, res) => {
  //console.log(req);
  const { id } = req.body;
  const quest = await Question.findById(id);
  console.log(quest);

  if (quest) {
    await quest.remove();
    res.json({ message: "Task Removed" });
  } else {
    res.status(404);
    throw new Error("Task not Found");
  }
});
const ViewQuestion = asyncHandler(async (req, res) => {
  //console.log(req);
  const { id } = req.body;
  const Qu = await Question.findById(id);
  // console.log(Qu.count);
  let newcount = Qu.count + 1;
  // console.log(newcount);
  const quest = await Question.findByIdAndUpdate(id, { count: newcount });

  if (quest) {
    res.json({ message: "Question viewed" });
  } else {
    res.status(404);
    throw new Error("Task not Found");
  }
});

module.exports = {
  getAllQuestion,
  CreateQuestion,
  DeleteQuestion,
  ViewQuestion,
};
