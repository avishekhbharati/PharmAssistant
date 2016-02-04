using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.PurchaseModel;
using FYPPharmAssistant.Repository;

namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin")]
    public class PurchaseController : Controller
    {
        private MyContext db = new MyContext();
        SupplierRepository repo = new SupplierRepository();
        // GET: Purchase
        public ActionResult Index()
        {
            var purchases = db.Purchases.Include(p => p.Supplier);
            return View(purchases.ToList());
        }

        // GET: Purchase/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var _purchase = from p in db.PurchaseItems
                                where p.PurchaseID == id
                                select p;
            if (_purchase == null)
            {
                return HttpNotFound();
            }
            return View(_purchase.ToList());
        }

        // GET: Purchase/Create
      /*  public ActionResult Create()
        {
            ViewBag.SupplierID = new SelectList(db.Suppliers, "ID", "Name");
            return View();
        }

        // POST: Purchase/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
       // [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Date,SupplierID,Amount,Discount,Tax,GrandTotal,IsPaid,LastUpdated,Description")] Purchase purchase)
        {
            if (ModelState.IsValid)
            {
                purchase.LastUpdated = DateTime.Now;


                purchase.ID = purchase.ID + "-" + repo.GetSupplierAbbrevation(purchase.SupplierID);
                db.Purchases.Add(purchase);
                try
                {
                    ViewBag.PurchaseID = purchase.ID;
                    db.SaveChanges();
                   // return RedirectToAction("Create", "PurchaseItem");
                    return RedirectToAction("Index");
                }
                catch(Exception e)
                {
                    ViewBag.ExceptionMessage = "Error: It may be due to Duplication of Invoice number. Please do check and make wise input !!";
                    
                }
                
            }

            ViewBag.SupplierID = new SelectList(db.Suppliers, "ID", "Name", purchase.SupplierID);
            return View(purchase);
        }
        */
        // GET: Purchase/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Purchase purchase = db.Purchases.Find(id);
            if (purchase == null)
            {
                return HttpNotFound();
            }
            ViewBag.SupplierID = new SelectList(db.Suppliers, "ID", "Name", purchase.SupplierID);
            return View(purchase);
        }

        // POST: Purchase/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Date,SupplierID,Amount,Discount,Tax,GrandTotal,IsPaid,LastUpdated,Description")] Purchase purchase)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchase).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.SupplierID = new SelectList(db.Suppliers, "ID", "Name", purchase.SupplierID);
            return View(purchase);
        }

        // GET: Purchase/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Purchase purchase = db.Purchases.Find(id);
            if (purchase == null)
            {
                return HttpNotFound();
            }
            return View(purchase);
        }

        // POST: Purchase/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Purchase purchase = db.Purchases.Find(id);
            db.Purchases.Remove(purchase);
            db.SaveChanges();
            return RedirectToAction("Index");
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
