﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SifflForums.Api.Models;
using SifflForums.Data;
using SifflForums.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SifflForums.Api.Services
{
    public interface ISubmissionsService
    {
        List<SubmissionViewModel> GetAll();
        SubmissionViewModel Insert(string username, SubmissionViewModel value);
        SubmissionViewModel GetById(int id);
    }

    public class SubmissionsService : ISubmissionsService
    {
        private SifflContext _dbContext;
        private IMapper _mapper;
        private IUsersService _usersService; 

        public SubmissionsService(SifflContext dbContext, IMapper mapper, IUsersService usersService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _usersService = usersService;
        }

        public List<SubmissionViewModel> GetAll()
        {
            var comments = _dbContext.Submissions
                .Include(o => o.User)
                .ToList();

            return _mapper.Map<List<SubmissionViewModel>>(comments);
        }

        public SubmissionViewModel GetById(int id)
        {
            var entity = _dbContext.Submissions
                .Include(o => o.User)
                .SingleOrDefault(o => o.SubmissionId == id);

            return _mapper.Map<SubmissionViewModel>(entity);
        }

        public SubmissionViewModel Insert(string username, SubmissionViewModel input)
        {
            var user = _usersService.GetByUsername(username); 

            Submission entity = new Submission();
            entity.Title = input.Title;
            entity.Text = input.Text;
            entity.UserId = user.UserId;
            entity.CreatedAtUtc = DateTime.UtcNow;
            entity.CreatedBy = user.UserId;
            entity.ModifiedAtUtc = DateTime.UtcNow;
            entity.ModifiedBy = user.UserId;

            _dbContext.Submissions.Add(entity);
            _dbContext.SaveChanges();

            return _mapper.Map<SubmissionViewModel>(entity);
        }
    }
}
