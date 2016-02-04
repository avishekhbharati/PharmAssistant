using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.Models.PurchaseModel;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.DAL;
using System.Web.Script.Serialization;
using System.Web.Services;
using FYPPharmAssistant.Repository;
using FYPPharmAssistant.ViewModel;

namespace FYPPharmAssistant.Controllers
{
    public class TestPurchaseInvoice2Controller : Controller
    {
        private MyContext db = new MyContext();
        private PurchaseInvoiceEntryRepository repo = new PurchaseInvoiceEntryRepository();






        // GET: TestPurchaseInvoice2
        public ActionResult Index()
        {
            return View();
        }


        //Binding to Dropdownlist : Supplier
        public JsonResult BindDatatoDropdownSupplier()
        {
            var supplierList = (from s in db.Suppliers
                                select new { s.ID, s.Name }).ToList();

            List<Supplier> _supplier = new List<Supplier>();
            foreach (var item in supplierList)
            {
                Supplier s = new Supplier();
                s.ID = item.ID;
                s.Name = item.Name;
                _supplier.Add(s);
            }
            return Json(_supplier, JsonRequestBehavior.AllowGet);
        }

        //Binding to Dropdownlist : Item
        public JsonResult BindDatatoDropdownItem()
        {
            var itemList = (from i in db.Items
                            select new { i.ID, i.Name }).ToList();

            List<Item> _item = new List<Item>();
            foreach (var item in itemList)
            {
                Item i = new Item();
                i.ID = item.ID;
                i.Name = item.Name;
                _item.Add(i);
            }
            return Json(_item, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        [ValidateAjax]
        public JsonResult InsertIntoPurchase(PurchaseInvoiceEntryViewModel vm)
        {
            Purchase _purchase = new Purchase()
            {
                ID = vm.PurchaseID + "(" + vm.SelectedSupplierValue + ")",
                Date = vm.InvocingDate,
                SupplierID = vm.SelectedSupplierValue,
                Amount = vm.Amount,
                Discount = vm.Discount,
                Tax = vm.Tax,
                GrandTotal = vm.GrandTotal,
                IsPaid = vm.IsPaid,
                Description = vm.Remarks
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

        [HttpPost]
        public JsonResult InsertIntoPurchaseFormColl(string setPurchaseID1, DateTime InvocingDate, int SelectedSupplierValue, Decimal Amount, Decimal Discount, Decimal Tax, Decimal GrandTotal, bool IsPaid, string Remarks)
        {
            Purchase _purchase = new Purchase()
            {
                ID = setPurchaseID1,
                Date = InvocingDate,
                SupplierID = SelectedSupplierValue,
                Amount = Amount,
                Discount = Discount,
                Tax = Tax,
                GrandTotal = GrandTotal,
                IsPaid = IsPaid,
                Description = Remarks
            };


            int response = repo.InsertIntoPurchase(_purchase);
            if (response == 1)
            {
                return Json("Saved :)");
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
            for (int i = 0; i < count; i++)
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

        [HttpPost]
        public ActionResult BulkInsert(PurchaseItem vm)
        {
            try
            {

                db.PurchaseItems.Add(vm);
                db.SaveChanges();
                repo.InsertOrUpdateInventory(vm);
            }
            catch (Exception ex)
            {
                ViewBag.SaveException = "Record couldn't be saved! Please check if record has already been entered! Thank you!!";
                return View(vm);
            }

            ViewBag.SuccessMsg = "Successfully Saved ! Cheers!";
            return RedirectToAction("Index", "PurchaseItem");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        public ActionResult NotGoodConstructor(PurchaseItem vm)
        {

            return null;
        }

        /// <summary>
        /// Disposing or closing db connection.
        /// </summary>
        /// <param name="disposing"></param>

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