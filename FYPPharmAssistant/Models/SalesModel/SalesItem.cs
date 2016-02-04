using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FYPPharmAssistant.Models.InventoryModel;
using System.ComponentModel.DataAnnotations;

namespace FYPPharmAssistant.Models
{
    public class SalesItem
    {
        [Key]
        public int ID { get; set; }
        public int StockID { get; set; }
        public int SalesID { get; set; }
        [Required]
        public int Qty { get; set; }
        [Required]
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }

        public virtual Stock  Stock { get; set; }
        public virtual Sales Sales { get; set; }
    }
}