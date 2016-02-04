using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.ViewModel;

namespace FYPPharmAssistant.Controllers
{
    public class TESTController : Controller
    {
        MyContext db = new MyContext();

        public ActionResult Index()
        {
            
            return RedirectToAction("JqueryGrid");
        }

        public ActionResult TestList()
        {
            List<TestViewModel> mylist = new List<TestViewModel>();
            ViewBag.myList = mylist;
            return View();
        }

        public int sum(int x, int y)
        {
            return x + y;
        }

       

    }
   
}