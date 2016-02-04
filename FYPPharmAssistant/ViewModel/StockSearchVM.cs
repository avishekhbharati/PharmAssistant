using FYPPharmAssistant.Models.InventoryModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.ViewModel
{
    public class StockSearchVM
    {
        public List<Stock> stock { get; set; } 
        //addded
        public string option { get; set; }
        public string batch { get; set; }
        public string name { get; set; }
        public DateTime? fromDate { get; set;}
        public DateTime? toDate { get; set; }
    }
}