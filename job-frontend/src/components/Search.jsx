
import {
    AppBar,
    Toolbar,
    Box,
    Card,
    Grid,
    Typography,
    Button,
    Modal,
    TextField,
    Chip,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";

const Search = () => {
    const [post, setPost] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
      jobId: "",
      jobProfile: "",
      jobDescription: "",
      requiredExperience: "",
      techskills: "",
    });
    const [techSkillsArray, setTechSkillsArray] = useState([]);

    useEffect(() => {
        const fetchInitialPosts = async () => {
            const response = await axios.get(`http://localhost:8081/jobPosts`);
            setPost(response.data);
        }
         fetchInitialPosts();
      }, []);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
      setOpenModal(false);
      setFormData({
        jobId: "",
        jobProfile: "",
        jobDescription: "",
        requiredExperience: "",
        techskills: "",
      });
      setTechSkillsArray([]);
    };

    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleAddSkill = () => {
      if (formData.techskills.trim()) {
        setTechSkillsArray([...techSkillsArray, formData.techskills.trim()]);
        setFormData({ ...formData, techskills: "" });
      }
    };

    const handleRemoveSkill = (index) => {
      setTechSkillsArray(techSkillsArray.filter((_, i) => i !== index));
    };

    const handleSubmitJob = async () => {
      if (!formData.jobId || !formData.jobProfile.trim() || !formData.jobDescription.trim() || !formData.requiredExperience || techSkillsArray.length === 0) {
        alert("Please fill all fields and add at least one skill");
        return;
      }
      try {
        const jobPayload = {
          postId: parseInt(formData.jobId),
          postProfile: formData.jobProfile,
          postDesc: formData.jobDescription,
          reqExperience: parseInt(formData.requiredExperience),
          postTechStack: techSkillsArray,
        };
        await axios.post(`http://localhost:8081/jobPost`, jobPayload);
        const response = await axios.get(`http://localhost:8081/jobPosts`);
        setPost(response.data);
        handleCloseModal();
        alert("Job added successfully!");
      } catch (error) {
        alert("Error adding job: " + (error.response?.data?.message || error.message));
      }
    };

  return (
        <Grid container spacing={2} sx={{ margin: "2%" }}>
                  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" align='center' component="div" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>
          <Button variant="contained" color="inherit" onClick={handleOpenModal}>
            + Add Job
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Grid item xs={12} sx={12} md={12} lg={12}>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%" }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600" }}
                >
             {p.postProfile}
                </Typography>
                <Typography sx={{ color: "#585858", marginTop:"2%" }} variant="body" >
                  Description: {p.postDesc}
                </Typography>
                <br />
                <br />
                <Typography variant="h6">
                  Years of Experience: {p.reqExperience} years
                </Typography>

                <Typography gutterBottom  variant="body">Skills : </Typography>
                {p.postTechStack.map((s, i) => {
                  return (
                    <Typography variant="body" gutterBottom key={i}>
                      {s} .
                      {` `}
                    </Typography>
                  );
                })}
  
              </Card>
            </Grid>
          );
        })}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          padding: 4,
        }}>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Add New Job
          </Typography>
          <TextField
            fullWidth
            label="Job ID"
            name="jobId"
            type="number"
            value={formData.jobId}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Job Profile"
            name="jobProfile"
            value={formData.jobProfile}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Job Description"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Required Experience (years)"
            name="requiredExperience"
            type="number"
            value={formData.requiredExperience}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
          />
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Tech Skills
            </Typography>
            <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
              <TextField
                size="small"
                label="Add skill"
                name="techskills"
                value={formData.techskills}
                onChange={handleFormChange}
                variant="outlined"
                sx={{ flex: 1 }}
              />
              <Button variant="contained" onClick={handleAddSkill}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {techSkillsArray.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(index)}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
            <Button variant="contained" fullWidth onClick={handleSubmitJob}>
              Submit
            </Button>
            <Button variant="outlined" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  )
}

export default Search