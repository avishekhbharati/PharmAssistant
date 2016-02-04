using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace IdentitySample.Models
{
    public class RoleViewModel
    {
        public string Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        [Display(Name = "RoleName")]
        public string Name { get; set; }
    }

    public class EditUserViewModel
    {
        public string Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "Cannot accept more than 100 characters")]
        public string FullName { get; set; }

        [StringLength(100, ErrorMessage = "Cannot accept more than 100 characters")]
        public string Address { get; set; }

        [StringLength(20, ErrorMessage = "Please insert valid contact number")]
        public string ContactNo { get; set; }


        public IEnumerable<SelectListItem> RolesList { get; set; }
    }
}