using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.ViewModel
{
    public class DayTotalVM
    {
        public int Day { get; set; }
        public decimal Total { get; set; }
    }
    public class SalesVM
    {
        public DateTime Date { get; set; }
        public List<DayTotalVM> Days { get; set; }
    }
}
