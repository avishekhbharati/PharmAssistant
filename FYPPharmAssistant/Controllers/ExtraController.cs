using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FYPPharmAssistant.Controllers
{
    public class ExtraController : Controller
    {
        // GET: Extra
        public ActionResult Index()
        {
            return View();
        }


        //error occured if record has been referenced in child and user attempts to delete in partent table.
        public ActionResult ReferenceError()
        {
            return View();
        }
       
    }
}