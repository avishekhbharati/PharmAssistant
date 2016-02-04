using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.ViewModel;
using FYPPharmAssistant.Models.PurchaseModel;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Repository;

namespace FYPPharmAssistant.Controllers
{
    
    public class PurchaseInvoiceEntryController : Controller
    {
        Item _item = new Item();        
        Stock _stock = new Stock();
        MyContext db = new MyContext();
        private PurchaseInvoiceEntryRepository repo = new PurchaseInvoiceEntryRepository();
       // List<PurchaseInvoiceEntryViewModel> tempList = new List<PurchaseInvoiceEntryViewModel>();

        // GET: PurchaseInvoiceEntry
   
        public ActionResult Index()
        {
            var vm = new PurchaseInvoiceEntryViewModel();      
            return View(vm);
        }

        
        [HttpPost]
        public ActionResult BulkInsert(PurchaseItem vm)
        {            
            try
            {             

                db.PurchaseItems.Add(vm);
                db.SaveChanges();
                repo.InsertOrUpdateInventory(vm);
            }
            catch(Exception ex)
            {
                ViewBag.SaveException = "Record couldn't be saved! Please check if record has already been entered! Thank you!!";
                return View(vm);
            }
            
            ViewBag.SuccessMsg = "Successfully Saved ! Cheers!";
            return RedirectToAction("Index","PurchaseItem");
        }

        /// <summary>
        /// Posts data from the Purchase form to the Purchase table in database
        /// </summary>
        /// <param name="vm"></param>
        /// <returns> Json response for success or failure</returns>
        [HttpPost]
        [ValidateAjax]
        public JsonResult InsertIntoPurchase(PurchaseInvoiceEntryViewModel vm)
        {   
            Purchase _purchase = new Purchase(){
                ID = vm.PurchaseID + "(" + vm.SelectedSupplierValue + ")",
                Date =vm.InvocingDate,
                SupplierID = vm.SelectedSupplierValue,
                Amount =vm.Amount,
                Discount = vm.Discount,
                Tax=vm.Tax,
                GrandTotal =vm.GrandTotal,
                IsPaid =vm.IsPaid,
                Description =vm.Remarks        
             };

            int response = repo.InsertIntoPurchase(_purchase);
            if (response == 1)
            {
                string invoiceId = vm.PurchaseID + "(" + vm.SelectedSupplierValue + ")";
                return Json(invoiceId);
            }
            else
            {
                return Json("Invoice Number Already exists!");
            }
        }


        /// <summary>
        /// Insert in purchaseItem using FormCollection.
        /// </summary>
        /// <param name="disposing"></param>
        public void InsertPurchaseItemFormColl(FormCollection coll)
        {

            string[] invoiceId, itemId, batch, qty, cp, sp, expiry;
            invoiceId = coll["PurchaseInvoice"].Split(',');
            itemId = coll["SelectedItemvalue"].Split(',');
            batch = coll["BatchNo"].Split(',');
            qty = coll["Qty"].Split(',');
            cp = coll["CostPrice"].Split(',');
            sp = coll["SellingPrice"].Split(',');
            expiry = coll["Expiry"].Split(',');
            int count = invoiceId.Count();
            for(int i = 0; i<count;i++)
            {
                PurchaseItem pi = new PurchaseItem();
                pi.PurchaseID = invoiceId[i];
                pi.ItemID = Convert.ToInt32(itemId[i]);
                pi.Batch = batch[i];
                pi.Qty = Convert.ToInt32(qty[i]);
                pi.CostPrice = Convert.ToDecimal(cp[i]);
                pi.SellingPrice = Convert.ToDecimal(sp[i]);
                pi.Expiry = Convert.ToDateTime(expiry[i]);
                
                //call bulk insert 
                BulkInsert(pi);

            }
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

   
}