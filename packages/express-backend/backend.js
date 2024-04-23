import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"].toLowerCase() === name
  );
};

// find using job just like above with name
const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"].toLowerCase() === job
  );
};

// find using job and name just like above with name
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => (user["name"].toLowerCase() === name && user["job"].toLowerCase() === job)
  );
};

// added in the name/job query here
app.get("/users", (req, res) => {
  const name = req.query.name
  const job = req.query.job
  let result = undefined
  if (!name && !job) res.send(users) // if nothing is given

  if (name) { // if only name is given
    let result = findUserByName(name);
    console.log(result)
    result = { users_list: result };
    res.send(result)
  } else if (job) { // if only job is given
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result)
  } else { // if name and job, finds ppl who match both
    let result = findUserByNameAndJob(name, job)
    result = { users_list: result };
    res.send(result)
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params.id; //or req.params.id
  let result = findUserById(id);
  if (result) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// takes in an id and deletes that user from the list
const deleteUser = (id) => {
  users["users_list"] = users["users_list"].filter((user) => user.id !== id)
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id
  deleteUser(id)
  res.send()
})