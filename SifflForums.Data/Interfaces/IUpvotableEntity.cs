﻿using SifflForums.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SifflForums.Data.Interfaces
{
    public interface IUpvotableEntity
    {
        string VotingBoxId { get; set; }
        VotingBox VotingBox { get; set; }
    }
}
