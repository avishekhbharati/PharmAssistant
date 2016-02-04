using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.ViewModel;
using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;

namespace FYPPharmAssistant.Controllers.Roughs
{
    public class TestReportController : Controller
    {
        MyContext db = new MyContext();

        // GET: TestReport
        public ActionResult Index()
        {            
            return View(db.Stocks.ToList());                   
        }

        [HttpPost]
        public ActionResult index(StockSearchVM vm)
        {
            var business = new FilterBusinessLogic();
            var model = business.GetStocks(vm);            
            return View(model);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }

    public class FilterBusinessLogic
    {
        private MyContext db;
        public FilterBusinessLogic()
        {
            db = new MyContext();
        }

        public IQueryable<Stock> GetStocks(StockSearchVM searchModel)
        {
            var result = db.Stocks.AsQueryable();
            if (searchModel != null)
            {
                if (!string.IsNullOrWhiteSpace(searchModel.batch))
                    result = result.Where(x => x.BatchNo == searchModel.batch);
                if (!string.IsNullOrEmpty(searchModel.name))
                    result = result.Where(x => x.Item.Name.Contains(searchModel.name));
                if (!string.IsNullOrEmpty(searchModel.option))
                {                   
                    if (searchModel.option == "BelowMin")
                    {
                        result =result.Where(x=> x.Qty < x.Item.AlertQty);
                    }
                    else if(searchModel.option == "UnSold")
                    {
                        result = result.Where(x => x.Qty == x.InitialQty);
                    }                
                 
                }
                if ((searchModel.fromDate != null )|| (searchModel.toDate != null))
                {
                    if (searchModel.fromDate != null && searchModel.toDate == null)
                    {
                        result = result.Where(x => x.ExpiryDate > searchModel.fromDate);
                    }
                    else if (searchModel.toDate != null && searchModel.fromDate == null)
                    {
                        result = result.Where(x => x.ExpiryDate < searchModel.toDate);
                    }
                    else
                    {
                        result = result.Where(x => (x.ExpiryDate > searchModel.fromDate && x.ExpiryDate < searchModel.toDate));
                    }
                }

                
                                      
            }
            return result;
        }
    }



}