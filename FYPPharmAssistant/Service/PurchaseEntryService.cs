using FYPPharmAssistant.Models.PurchaseModel;
using FYPPharmAssistant.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Service
{    
    public class PurchaseEntryService
    {
        private PurchaseEntryRepository repo = new PurchaseEntryRepository();

        public void AddPurchaseAndPurchseItems(Purchase p)
        {
            repo.AddPurchaseAndPurchseItems(p);
        }
        //update inventory
        public void InsertOrUpdateInventory(List<PurchaseItem> pi)
        {
            foreach (PurchaseItem item in pi)
            {
                repo.InsertOrUpdateInventory(item);  
            }
                 
           
        }
    }
}