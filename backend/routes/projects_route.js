const express = require("express");
const Project = require("../models/Projects");
const auth = require("../middleware/authMiddleware");
const Episode = require("../models/Episodes");
const User = require("../models/User.js");
const postRouter = express.Router();


postRouter.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.body.userID });
    if (projects.length === 0) {
      return res.status(200).json({ message: "Projects not found" });
    }
    res.status(200).json({ projects });
  } catch (err) {
    res.status(400).send(err.message);
  }
});



// POST route to add a new project
postRouter.post("/addprojects", auth, async (req, res) => {
  try {
    console.log("trying")
    const { title, userID } = req.body;

    // You can use userID to associate the project with the authenticated user
    const newProject = new Project({
      title,
      user: userID,
      lastUpdated: Date.now(),
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

postRouter.get('/episodes/:projectId', auth, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if the project exists
    const projectExists = await Project.exists({ _id: projectId, user: req.body.userID });
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Retrieve episodes for the specified project
    const episodes = await Episode.find({ project: projectId });
    const projectName=await Project.find({_id:projectId})

    if (episodes.length === 0) {
      return res.status(200).json({projectName:projectName[0].title, message: 'Episodes not found for the project' });
    }

    res.status(200).json({projectName:projectName[0].title, episodes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add a new episode to a project
postRouter.post("/addEpisode/:projectId", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const projectId = req.params.projectId;

    // Check if the project exists (you may want to add more validation)
    const projectExists = await Project.exists({ _id: projectId });
    if (!projectExists) {
      return res.status(400).json({ message: "Project not found" });
    }

    const newEpisode = new Episode({
      title,
      description,
      project: projectId,
    });

    const savedEpisode = await newEpisode.save();

    // Add the episode to the project's episodes array
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { episodes: savedEpisode._id }, lastUpdated: Date.now() },
      { new: true }
    );

    res.status(201).json(savedEpisode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




// DELETE route to delete an episode
postRouter.delete("/deleteEpisode/:episodeId", async (req, res) => {
  try {
    const episodeId = req.params.episodeId;

    // Check if the episode exists (you may want to add more validation)
    const episodeExists = await Episode.exists({ _id: episodeId });
    if (!episodeExists) {
      return res.status(400).json({ message: "Episode not found" });
    }

    // Find the project that contains the episode
    const project = await Project.findOne({ episodes: episodeId });

    // Remove the episode from the project's episodes array
    project.episodes.pull({ _id: episodeId });
    await project.save();

    // Delete the episode
    await Episode.findByIdAndDelete(episodeId);

    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE route to update an episode
postRouter.put("/updateEpisode/:episodeId", async (req, res) => {
  try {
    const episodeId = req.params.episodeId;
    const { title, description } = req.body;
console.log(title,description,episodeId,"here");
    // Check if the episode exists (you may want to add more validation)
    const episodeExists = await Episode.exists({ _id: episodeId });
    if (!episodeExists) {
      return res.status(400).json({ message: "Episode not found" });
    }

    // Update the episode
    const updatedEpisode = await Episode.findByIdAndUpdate(
      episodeId,
      { title, description },
      { new: true }
    );
console.log(title,description)
    res.status(200).json(updatedEpisode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// postRouter.get("/get/:postID", async (req, res) => {
//     const  postID  = req.params.postID;
//     console.log(postID)
//     try {
//       const post = await Post.findOne({ _id: postID });
//       // console.log(recipe);
//       if (post) {
//         return res.status(200).json({ Messsage: "post",post});
//       } else {
//         return res.status(404).json({ msg: `movie not found...!!` });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   });




// postRouter.get("/oem", async (req, res) => {
//     try {
//       const post = await OEM.find({ });
//       // console.log(recipe);
//       if (post) {
//         return res.status(200).json({ Messsage: "OEM",post});
//       } else {
//         return res.status(404).json({ msg: `car data not found...!!` });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   });

//   postRouter.get("/oem/:postID", async (req, res) => {
//     const  postID  = req.params.postID;
//     console.log(postID)
//     try {
//       const post = await OEM.findOne({ _id: postID });
//       // console.log(recipe);
//       if (post) {
//         return res.status(200).json({ Messsage: "post",post});
//       } else {
//         return res.status(404).json({ msg: `movie not found...!!` });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   });

//   postRouter.post("/oem/add",  async (req, res) => {
//     try {
//       const {
//         name,
//         year,
//         price,
//         availableColors,
//         mileage,
//         power,
//         maxSpeed,
//       } = req.body;
// console.log(req.body)
      
//       const newOEMData = {
//         name,
//         year,
//         price,
//         availableColors,
//         mileage,
//         power,
//         maxSpeed
     
//       };
//       const newOEM = new OEM(newOEMData);
//       await newOEM.save();
  
//       return res.status(201).json({ Message: "OEM data added", newOEM });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   });







postRouter.post("/add", auth, async (req, res) => {

  try {
    const {
   title,
   description,
   episodes,
   lastUpdated
    } = req.body;
    // console.log(req.body,"byyy")
    const createdBy = req.body.userID;
    // console.log(req.body,"bodyyyy")
    // console.log(createdBy, "cretor");
    const newPostData = {
      title,
      description,
      episodes,
      lastUpdated,
    
      // createdAt: formatDate(Date.now()),
      createdBy:user
    };
    const newPost = await Post(newPostData);
    await newPost.save();
    // await createdBy.populate()
    return res.status(200).json({ msg: "New car added", newPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



// postRouter.delete("/:postID", auth, async (req, res) => {
//     const { postID } = req.params;
//     const post = await Post.findOne({ _id: postID });
//     console.log(post,"finded")
//     try {
//       if (post) {
//         const deletedPost = await Post.findByIdAndDelete({
//           _id: postID,
//         });
//         return res.status(200).json({ msg: "Car deleted", deletedPost});
//       } else {
//         return res.status(404).json({ msg: `car not found...!!` });
//       }
//     } catch (error) {
//         console.log*error
//       return res.status(500).json({ error: error.message });
//     }
//   });

//   postRouter.get("/inventory",auth, async (req, res) => {
//     const  userID  = req.body.userID;
  
//     try {
//       const post = await Post.find({ createdBy: userID });
//       // console.log(recipe);
//       if (post) {
//         return res.status(200).json({ Messsage: "post",post});
//       } else {
//         return res.status(404).json({ msg: `car not found...!!` });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   });



module.exports = postRouter;
