using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models;
using FYPPharmAssistant.Models.InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Repository
{
    public class SalesEntryRepository 
    {
        private MyContext db;

        public SalesEntryRepository()
        {
            db = new MyContext();
        } 
       
        //returns all the stock items 
        public List<Stock> GetAllStock()
        {
            return db.Stocks.ToList();
        }

        public List<Sales> GetAllSalesInfo()
        {
            return db.Sales.ToList();
        }
        //Inserts in sales 
        public int InsertSales(Sales _sales)
        {           
            db.Sales.Add(_sales);
            db.SaveChanges();            
            return _sales.ID;
        }

        /*
        public void InsertSalesItem(int _salesID, string[] _stockID, string[] _qty, string[] _rate, string[] _amt)
        {
            int count = _stockID.Count();

            using (MyContext db = new MyContext())
            {
                for (int i = 0; i < count; i++)
                {
                    SalesItem _salesItem = new SalesItem();
                    _salesItem.SalesID = _salesID;

                    _salesItem.StockID = Convert.ToInt32(_stockID[i]);
                    _salesItem.Rate = Convert.ToDecimal(_rate[i]);
                    _salesItem.Qty = Convert.ToInt32(_qty[i]);
                    _salesItem.Amount = Convert.ToDecimal(_amt[i]);

                    db.SalesItems.Add(_salesItem);                    
                }
                db.SaveChanges();
            }

        }
        */

        public void InsertSalesItem(SalesItem _salesItem)
        {
            db.SalesItems.Add(_salesItem);
            db.SaveChanges();
        }
        /*
        public bool UpdateStock(string[] _stockID, string[] _qty)
        {
            using (MyContext db = new MyContext())
            {
                for (int i = 0, y = _stockID.Count(); i < y; i++)
                {
                    int getStockID = Convert.ToInt32(_stockID[i]);
                    int getQty = Convert.ToInt32(_qty[i]);
                    Stock stock = new Stock();
                    stock = db.Stocks.Find(getStockID);
                   
                    stock.Qty = stock.Qty - getQty;
                   // db.Stocks.Add(stock);
                    db.SaveChanges();
                }                
            }
            return true;
        }*/

        public void UpdateStock(int getStockID, int getQty)
        {
            Stock stock = new Stock();
            stock = db.Stocks.Find(getStockID);
            stock.Qty = stock.Qty - getQty;
            db.SaveChanges();
        }

/*      public List<SalesItem> GetSales(int? salesId)
        {
            var _salesItems = from s in db.SalesItems
                              where s.SalesItem == salesId
                              select s;
                              
            return _salesItems.ToList();
        }*/

        public Sales GetSales(int? salesId)
        {
            var _sales = from s in db.Sales
                              where s.ID == salesId
                              select s;

            return _sales.FirstOrDefault();
        }

        

    }
}
