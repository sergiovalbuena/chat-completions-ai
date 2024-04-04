import OpenAI from "openai";
import dotenv from "dotenv";
import process from "process";

import express from "express";
import cors from "cors";

const PORT = 8000;
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post("/completion", async (req, res) => {
  const text = req.body.text;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are an assistant that complete storys" },
      { role: "user", content: text },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  res.send(completion.choices[0]);
});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: "Who won the world series in 2020?" },
//       {
//         role: "assistant",
//         content: "The Los Angeles Dodgers won the World Series in 2020.",
//       },
//       { role: "user", content: "Where was it played?" },
//     ],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
// main();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
