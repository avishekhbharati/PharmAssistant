using FYPPharmAssistant.Models;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Service
{
    public class SalesEntryService
    {
        SalesEntryRepository repo;

        public SalesEntryService()
        {
            repo = new SalesEntryRepository();
        }

        public int InsertSales(Sales _sales)
        {
            return repo.InsertSales(_sales);
        }

        public void InsertSalesItem(int _salesID, string[] _stockID, string[] _qty, string[] _rate, string[] _amt)
        {
            int count = _stockID.Count();            
                for (int i = 0; i < count; i++)
                {
                    SalesItem _salesItem = new SalesItem();
                    _salesItem.SalesID = _salesID;

                    _salesItem.StockID = Convert.ToInt32(_stockID[i]);
                    _salesItem.Rate = Convert.ToDecimal(_rate[i]);
                    _salesItem.Qty = Convert.ToInt32(_qty[i]);
                    _salesItem.Amount = Convert.ToDecimal(_amt[i]);
                    repo.InsertSalesItem(_salesItem);
                }                
            }

        public void UpdateStock(string[] _stockID, string[] _qty)
        {            
            for (int i = 0, y = _stockID.Count(); i < y; i++)
            {
                int getStockID = Convert.ToInt32(_stockID[i]);
                int getQty = Convert.ToInt32(_qty[i]);
                Stock stock = new Stock();
                repo.UpdateStock(getStockID, getQty);                
            }        
        }

        public List<Sales> GetAllSalesInfo()
        {
            return repo.GetAllSalesInfo();
        }

        public Sales GetSales(int? salesId)
        {
            return repo.GetSales(salesId);
        }
    }
}