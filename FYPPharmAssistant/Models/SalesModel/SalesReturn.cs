using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Models
{
    public class SalesReturn
    {
        public int ID { get; set; }
        public int SalesID { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal NetTotal { get; set; }
        public string Description { get; set; }
        public DateTime ReturnedDate { get; set; }

        public virtual ICollection<SalesReturnDetail> SalesReturnDetails { get; set; }
        public virtual Sales Sales { get; set; }

    }


    public class SalesReturnDetail
    {
        public int ID { get; set; }
        public int SalesReturnID { get; set; }
        public int StockID { get; set; }
        public string BatchNo { get; set; }
        public int Qty { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }

        public virtual SalesReturn SalesReturn { get; set; }
    }
}