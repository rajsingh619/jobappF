package com.example.jobbackend.service;

import com.example.jobbackend.model.JobPost;
import com.example.jobbackend.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepo jobRepo;

    public void addJob(JobPost jobPost){
        jobRepo.addJob(jobPost);
    }

    public List<JobPost> viewJobs(){
       return jobRepo.getAllJobs();
    }
}
