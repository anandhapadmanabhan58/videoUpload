import express from "express";
import Ffmpeg from "fluent-ffmpeg";

const app = express();

const port = 3000;
app.use(express.json());
app.post("/process-video", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("BadRequest: Invalid path");
  } else {
    Ffmpeg(inputFilePath)
      .outputOptions("-vf", "scale:-1:360")
      .on("end", () => {
        res.status(200).send("process finished");
      })
      .on("error", (err) => {
        console.log(`Ffmpeg error: ${err.message}`);
        res.status(500).send("InternalServerError: Ffmpeg failed");
      })
      .save(outputFilePath);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
