package com.example.jobbackend;

import com.example.jobbackend.model.JobPost;
import com.example.jobbackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    @Autowired
    private JobService jobService;

   @GetMapping("jobPosts")
   @ResponseBody
   public List<JobPost> getJobPosts() {
      return jobService.viewJobs();
   }
}
