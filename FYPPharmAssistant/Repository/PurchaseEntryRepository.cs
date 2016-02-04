using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.Models.PurchaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

            /*  Steps:
                * check if item with same batch and ID already exixts
                *   if No insert new item 
                *   if yes check if the cost price matches 
                *      if yes update the quantity and initial quatity
                *      else insert new item
               */

namespace FYPPharmAssistant.Repository
{
    public class PurchaseEntryRepository
    {
        private Stock _stock;

        /// <summary>
        /// Add Items to PurchaseItems
        /// </summary>
        /// <param name="pi"></param>
        public void AddPurchaseAndPurchseItems(Purchase p)
        {
            using (MyContext db = new MyContext())
            {
                db.Purchases.Add(p);
                db.SaveChanges();
            }
        }
        
        /// <summary>
        /// Insert or update stock based on purchase Items
        /// </summary>
        /// <param name="vm"></param>
        public void InsertOrUpdateInventory(PurchaseItem vm)
        {
            using (MyContext db = new MyContext())
            {
                _stock = new Stock();

                //Initialize new stock with vm inserted values
                _stock.ItemID = vm.ItemID;
                _stock.BatchNo = vm.Batch;
                _stock.CostPrice = vm.CostPrice;
                _stock.SellingPrice = vm.SellingPrice;
                _stock.ExpiryDate = vm.Expiry;
                _stock.PurchaseID = vm.PurchaseID;

                //Get list of all the inserted item in Stock table
                List<Stock> _checkItem = (from s in db.Stocks
                                          where s.ItemID == vm.ItemID && s.BatchNo == vm.Batch
                                          select s).ToList();

                //count the number of exixting record on inserted item
                int countStock = _checkItem.Count();

                //Add new record if record is not found
                if (countStock == 0)
                {
                    //Add new item with new Initial qty
                    _stock.Qty = vm.Qty;
                    _stock.InitialQty = _stock.Qty;
                    db.Stocks.Add(_stock);
                    db.SaveChanges();
                }
                else
                {
                    //to check how many times loop executes completely 
                    int loopCount = 0;
                    //Check and Add or update
                    foreach (Stock stock in _checkItem)
                    {
                        if (stock.CostPrice == vm.CostPrice)
                        {
                            //Update qty and InitialQty 
                            stock.Qty += vm.Qty;
                            stock.InitialQty += vm.Qty;
                            db.SaveChanges();
                            break;
                        }
                        loopCount++;
                    }
                    if (loopCount == _checkItem.Count())
                    {
                        //Add new record with Qty and intial Qty
                        _stock.InitialQty += vm.Qty;
                        db.Stocks.Add(_stock);
                        db.SaveChanges();
                    }
                }
            }
        }


        /// <summary>
        /// Checks if invoice number already exists in database. 
        /// If no saves the entry
        /// </summary>
        /// <param name="_purchase"></param>
        /// <returns>1 as success, 0 as failure</returns>

        public void InsertIntoPurchase(Purchase _purchase)
        {
            using (MyContext db = new MyContext())
            {                
                db.Purchases.Add(_purchase);
                db.SaveChanges();
            }
        }
    }
}