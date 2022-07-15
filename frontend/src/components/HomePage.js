import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Typography from "@mui/material/Typography";
import background from "./utils/back.jpg";

import {
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const colors = [
  "#1BAAA0",
  "#7DDDF5",
  "#FBC396",
  "#FFBB2F",
  "#FFD275",
  "#FC91AD",
  "#3FBF595",
  "#7FBBDF",
  "#8DD7F2",
];

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 16,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  cardheader: {
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
    textOverflow: "ellipsis",
  },
}));

const Mynotes = React.memo(function Mynotes() {
  //const dispatch = useDispatch();
  // const taskList = useSelector((state) => state.taskExplore);
  //const { TASK } = taskList;
  const [TASK, setTASK] = useState([]);
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const [title, settitle] = useState(null);
  const [content, setcontent] = useState(null);
  const [category, setcategory] = useState(null);
  const [render, setrender] = useState(false);
  // console.log(TASK);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get("/api/question");
      //console.log(data);
      setTASK(data);
    };
    fetchdata();
  }, [open, render]);
  const handleopen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

  const handleAsk = async () => {
    const savedquestion = await axios.post("/api/question/create", {
      title: title,
      content: content,
      category: category,
    });
    console.log(savedquestion);
    setopen(false);
  };
  // console.log(open);

  const handledelete = async (id) => {
    // console.log(id);
    const deleted = await axios.post("/api/question/delete", {
      id: id,
    });
    console.log(deleted);
    setrender(!render);
  };

  const handleview = async (id) => {
    console.log(id);
    const viewed = await axios.post("/api/question/view", {
      id: id,
    });
    console.log(viewed);
    setrender(!render);
  };

  return (
    <>
      <div
        style={{
          background: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${background}) top left / cover no-repeat`,
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Button onClick={handleopen} variant="contained" color="success">
          New question
        </Button>
        <Grid
          container
          alignItems="stretch"
          direction="row"
          spacing={2}
          justifyContent={"space-around"}
        >
          {TASK != undefined ? (
            TASK.map((taskObj, idx) => (
              <Grid item key={idx}>
                <Card
                  className={classes.card}
                  sx={{ width: 270 }}
                  style={{ backgroundColor: colors[idx % 9] }}
                >
                  {/* //{console.log("taskobj", taskObj)} */}
                  <CardActionArea>
                    <CardHeader
                      title={taskObj?.title}
                      className={classes.cardheader}
                      //sx={{ wordWrap: "break-word" }}
                      //style={{ wordWrap: "break-word" }}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        component="div"
                        style={{ wordWrap: "break-word" }}
                      >
                        Category : {taskObj?.category}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        style={{ wordWrap: "break-word" }}
                      >
                        Content:{taskObj?.content}
                      </Typography>
                      {(taskObj?.content).split("\n").map((line, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          component="div"
                          style={{
                            wordWrap: "break-word",
                          }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button
                        color="success"
                        onClick={() => handledelete(taskObj?._id)}
                        startIcon={<DeleteIcon style={{ color: "black" }} />}
                      ></Button>
                      <Button
                        color="success"
                        onClick={() => handleview(taskObj?._id)}
                        startIcon={<ReadMoreIcon style={{ color: "black" }} />}
                      ></Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>

        {open ? (
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Ask a Question</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="standard"
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Content"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setcontent(e.target.value);
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Category"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAsk}>Ask</Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
      </div>
    </>
  );
});

export default Mynotes;
