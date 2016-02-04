using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.Repository;
using FYPPharmAssistant.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Transactions;
using System.Data.Entity.Core;
using System.Net;
using IdentitySample;
using Microsoft.AspNet.Identity;
using IdentitySample.Models;

namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin, Staff")]
    public class SalesEntryController : Controller
    {
        private SalesEntryRepository repo = new SalesEntryRepository();
        private SalesEntryService service = new SalesEntryService();

        // GET: SalesEntry
        public ActionResult Index()
        {                
            return View(repo.GetAllStock().Where(x=>x.ExpiryDate > DateTime.Now && x.Qty != 0));
        }

        //has fully functional UI 
        public ActionResult IndexTest()
        {
            return View(repo.GetAllStock());
        }                


        //Another test attempt
        public ActionResult IndexTest2()
        {

            return View(repo.GetAllStock());
        }
    
        [HttpPost]
        public JsonResult SerializeFormData(FormCollection _collection)
        {
            if(_collection != null)
            {
                string[] _stockID, _qty, _rate, _amt;
                //for salesItem
                _stockID = _collection["StockID"].Split(',');
                _qty = _collection["Qty"].Split(',');
                _rate = _collection["Rate"].Split(',');
                _amt = _collection["Amount"].Split(',');
                //for sales
                decimal _total =  Convert.ToDecimal(_collection["Total"]);
                decimal _discount = Convert.ToDecimal(_collection["Discount"]);
                decimal _grandTotal = Convert.ToDecimal(_collection["GrandTotal"]);
                DateTime _date = DateTime.Now;

                //instance of the global class
                MvcApplication app = new MvcApplication();
                FYPPharmAssistant.Models.Sales _sales = new FYPPharmAssistant.Models.Sales()
                { 
                    Date =_date,
                    Amount = _total,
                    Discount =_discount,
                    GrandTotal = _grandTotal,
                    Tax = 0,
                    UserID = User.Identity.GetUserId(),
                    Remarks = "-"
                };

                
                
               

                //insert into sales, sales-items, stock
                int salesID = service.InsertSales(_sales);
                service.InsertSalesItem(salesID, _stockID, _qty, _rate, _amt);
                service.UpdateStock(_stockID,  _qty);

                return Json(salesID);
              
                                   
            }
            return Json("null");            
        }

        public ActionResult SalesInfo()
        {
            return View(service.GetAllSalesInfo());
        }

     /*   public JsonResult GetSalesItems(int id)
        {            
            if(id != null)
            {
               var  _salesItem = service.GetSalesItems(id).Select(n => new { n.StockID, n.Qty });
               return Json(_salesItem, JsonRequestBehavior.AllowGet);
            }
            return Json("failed", JsonRequestBehavior.AllowGet);         
            
        }
        */

        //Generates Sales Invoice
        public ActionResult SalesInvoice(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var _sales = service.GetSales(id);
            //check if id supplied is present or not.
            if (_sales == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                return View(_sales);  
            }                   
            
        }
    }
}