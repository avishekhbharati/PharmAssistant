using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Models
{
    public class Notification
    {
        public Notification()
        {
            LowStock = 0;
            ToExpire = 0;
        }
        public int ID { get; set; }
        public int LowStock { get; set; }
        public int ToExpire { get; set; }

    }
}