using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace FYPPharmAssistant.Controllers.Sales
{
    [Authorize]
    public class SalesReturnController : Controller
    {
        private MyContext db = new MyContext();

        //GET: SalesReturn
        public ActionResult Index()
        {
            return View(db.SalesReturns.ToList());
        }

        //POST: SalesReturn/ReturnDetails/5
        public ActionResult ReturnDetails(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var model  = db.SalesReturnDetails.Where(s=>s.SalesReturnID == id).ToList();
            if (model == null)
            {
                return HttpNotFound();
            }
            return View(model);
        }
        

        // POST: SalesReturn/5
        public ActionResult Returns(int id)
        {
            FYPPharmAssistant.Models.Sales model = db.Sales.Find(id);
            //null check
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }
           
            return View(model);
        }

        /// <summary>
        /// Save all the returned items 
        /// </summary>
        /// <param name="coll"></param>
        /// <returns></returns>
        //POST : 
        public ActionResult ReturnItems(FormCollection coll)
        {
            
           List<SalesReturnDetail> details = new List<SalesReturnDetail>();

            var counter = Convert.ToInt32(coll["counter"]);

            //attributes required for SalesReturn
            decimal total = Convert.ToDecimal(coll["SubTotal"]);
            decimal discount = Convert.ToDecimal(coll["Discount"]);
            decimal netTotal = Convert.ToDecimal(coll["NetTotal"]);
            int salesID = Convert.ToInt32(coll["SalesID"]);

            //populating through each of the occurance of the ReturnedItems
            for (int i = 1; i <= counter; i++)
            {                 
                var value = coll["Qty_"+i];
                if (!string.IsNullOrEmpty(value) && value != "0")
                    {
                        SalesReturnDetail srd = new SalesReturnDetail {                            
                                                            StockID = Convert.ToInt32(coll["StockID_"+i]),                            
                                                            BatchNo = coll["BatchNo_"+i],
                                                            Qty = Convert.ToInt32(coll["Qty_" + i]),
                                                            Rate = Convert.ToDecimal(coll["Rate_"+i]),
                                                            Amount = Convert.ToDecimal(coll["Amount_"+i])       
                                                      };
                        details.Add(srd); 
                    }
            }

            //populating Sales Return
            SalesReturn _SalesReturn = new SalesReturn
            {
                SalesID = salesID,
                Subtotal = total,
                Discount =discount,
                NetTotal = netTotal,
                SalesReturnDetails = details,
                Description = "n/a",
                ReturnedDate = DateTime.Today
            };

            //Add in Sales And save changes 
            db.SalesReturns.Add(_SalesReturn);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}