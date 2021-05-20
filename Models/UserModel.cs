﻿using System.Collections.Generic;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.Serialization;
using Utils;
namespace Model
{
	public class UserModel : IModel
	{
		public int Id { get; set; }

		public string Login { get; set; }
		public string Email { get; set; }
		
		public string Password { get; set; }


		public bool LookingForJob { get; set; }
		public UserStatus Status { get; set; }

		public byte[] Image { get; set; }

		public List<PostModel> Posts { get; set; }
	}
}