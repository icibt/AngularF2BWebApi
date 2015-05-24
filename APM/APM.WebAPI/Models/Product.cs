using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APM.WebAPI.Models
{
    public class Product
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductCode { get; set; }
        public int ProductId { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Product Name is required")]
        [MinLength(5, ErrorMessage = "Minimum length is 5")]
        [MaxLength(11, ErrorMessage = "Maximum length is 11")]
        public string ProductName { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}