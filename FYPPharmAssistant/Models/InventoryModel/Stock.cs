using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Models.InventoryModel
{
    public class Stock
    {
        public Stock()
        {
            BatchNo = "--";
            Stop_Notification = true;
            ItemExpired = false;
        }
        public int ID { get; set; }
        [Required]
        public int ItemID { get; set; }

        [StringLength(20, ErrorMessage="Too long. Plese check again!")]
        public string BatchNo { get; set; }

        [Range(0,9999999)]
        public int InitialQty { get; set; }

        [Required]
        [Range(0,100000)]
        public int Qty { get; set; }

        [Required]
        [Range(0, 1000000,ErrorMessage="Out of range!")]
        public decimal CostPrice { get; set; }

        [Required]
        [Range(0, 1000000, ErrorMessage = "Out of range!")]
        public decimal SellingPrice { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString="{0:yyyy-MM-dd}",ApplyFormatInEditMode=true)]
        public DateTime? ManufacturedDate { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? ExpiryDate { get; set; }

        public bool ItemExpired { get; set; }

        public bool Stop_Notification { get; set; }

        public string PurchaseID { get; set; }
        

        //references
        public virtual Item Item { get; set; }
    }
}