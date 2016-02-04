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

namespace FYPPharmAssistant.Controllers
{/*
    public class PurchaseItemController : Controller
    {
        private MyContext db = new MyContext();

        // GET: PurchaseItem
        public ActionResult Index()
        {
            var purchaseItems = db.PurchaseItems.Include(p => p.Item).Include(p => p.Purchase);
            return View(purchaseItems.ToList());
        }

        // GET: PurchaseItem/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseItem purchaseItem = db.PurchaseItems.Find(id);
            if (purchaseItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseItem);
        }

        // GET: PurchaseItem/Create
        public ActionResult Create(string id)
        {
            
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name");
            ViewBag.PurchaseID = new SelectList(db.Purchases, "ID", "ID");
           

            //new SelectList(vs, "InstId", "InstName", selectedValue);
            return View();
        }

        // POST: PurchaseItem/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,PurchaseID,ItemID,Batch,Qty,BonusIncluded,CostPrice,SellingPrice,Expiry")] PurchaseItem purchaseItem)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseItems.Add(purchaseItem);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name", purchaseItem.ItemID);
            ViewBag.PurchaseID = new SelectList(db.Purchases, "ID", "ID", purchaseItem.PurchaseID);
            return View(purchaseItem);
        }

        // GET: PurchaseItem/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseItem purchaseItem = db.PurchaseItems.Find(id);
            if (purchaseItem == null)
            {
                return HttpNotFound();
            }
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name", purchaseItem.ItemID);
            ViewBag.PurchaseID = new SelectList(db.Purchases, "ID", "ID", purchaseItem.PurchaseID);
            return View(purchaseItem);
        }

        // POST: PurchaseItem/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,PurchaseID,ItemID,Batch,Qty,BonusIncluded,CostPrice,SellingPrice,Expiry")] PurchaseItem purchaseItem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseItem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name", purchaseItem.ItemID);
            ViewBag.PurchaseID = new SelectList(db.Purchases, "ID", "ID", purchaseItem.PurchaseID);
            return View(purchaseItem);
        }

        // GET: PurchaseItem/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseItem purchaseItem = db.PurchaseItems.Find(id);
            if (purchaseItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseItem);
        }

        // POST: PurchaseItem/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseItem purchaseItem = db.PurchaseItems.Find(id);
            db.PurchaseItems.Remove(purchaseItem);
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
  * */
}
