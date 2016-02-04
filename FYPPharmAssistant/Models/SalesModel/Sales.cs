using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace FYPPharmAssistant.Models
{
    public class Sales
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal GrandTotal { get; set; }
        public string UserID { get; set; }
        public string Remarks { get; set; }

        public virtual ICollection<SalesItem> SalesItems { get; set; }
        public virtual ICollection<SalesReturn> SalesReturns { get; set; }

    }
}