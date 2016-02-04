using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Models.PurchaseModel
{
    public class Supplier
    {
        public Supplier()
        {
            this.Address = "N/A";
        }
        public int ID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage="Only 50 characters allowed!" )]
        public string Name { get; set; }

        public string Address { get; set; }
        public string Contact { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Purchase> Purchases { get; set; }

    }
}