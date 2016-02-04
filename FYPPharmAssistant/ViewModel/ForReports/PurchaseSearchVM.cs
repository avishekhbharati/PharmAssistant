using FYPPharmAssistant.Models.PurchaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.ViewModel
{
    public class PurchaseSearchVM
    {
        public List<Purchase> purchase { get; set; }
        //addded
        public string option { get; set; }
        public string supplier { get; set; }
        public DateTime? fromDate { get; set; }
        public DateTime? toDate { get; set; }
        public string IsPaid { get; set; }
    }
}