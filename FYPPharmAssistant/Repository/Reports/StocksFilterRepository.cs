using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Repository
{
    public class StocksFilterRepository
    {
        private MyContext db;
        public StocksFilterRepository()
        {
            db = new MyContext();
        }

        public IQueryable<Stock> FilterStocks(StockSearchVM searchModel)
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
                        result = result.Where(x => x.Qty < x.Item.AlertQty);
                    }
                    else if (searchModel.option == "UnSold")
                    {
                        result = result.Where(x => x.Qty == x.InitialQty);
                    }
                    else if (searchModel.option == "Expired")
                    {
                        result = result.Where(x => DbFunctions.DiffDays( DateTime.Now, x.ExpiryDate) <= 0);
                    }
                        
                    else if(searchModel.option == "90")
                    {                        
                        result = result.Where(x => DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) <= 90 && DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) > 0);
                    }
                      
                    else if (searchModel.option == "60")
                    {
                        result = result.Where(x => DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) <= 60 && DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) > 0);
                    } 
                    else if (searchModel.option == "30")
                    {

                        result = result.Where(x => DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) <= 30 && DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) > 0);
                    }
                    else if (searchModel.option == "15")
                    {
                        result = result.Where(x => DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) <= 15 && DbFunctions.DiffDays(DateTime.Now, x.ExpiryDate) > 0);
                    }
                }
                if ((searchModel.fromDate != null) || (searchModel.toDate != null))
                {
                    if (searchModel.fromDate != null && searchModel.toDate == null)
                    {
                        result = result.Where(x => x.ExpiryDate > searchModel.fromDate);
                    }
                    if (searchModel.toDate != null && searchModel.fromDate == null)
                    {
                        result = result.Where(x => x.ExpiryDate < searchModel.toDate);
                    }
                    if (searchModel.toDate != null && searchModel.fromDate != null)
                    {
                        result = result.Where(x => (x.ExpiryDate > searchModel.fromDate && x.ExpiryDate < searchModel.toDate));
                    }
                }
            }
            return result;
        }
    }
}