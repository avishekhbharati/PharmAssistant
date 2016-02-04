using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models;

namespace FYPPharmAssistant.Controllers
{
    [Authorize]
    public class SalesItemsController : Controller
    {
        private MyContext db = new MyContext();

        // GET: SalesItems
        public ActionResult Index()
        {
            var salesItems = db.SalesItems.Include(s => s.Sales).Include(s => s.Stock);
            return View(salesItems.ToList());
        }

        // GET: SalesItems/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesItem salesItem = db.SalesItems.Find(id);
            if (salesItem == null)
            {
                return HttpNotFound();
            }
            return View(salesItem);
        }

        // GET: SalesItems/Create
        public ActionResult Create()
        {
            ViewBag.SalesID = new SelectList(db.Sales, "ID", "Remarks");
            ViewBag.StockID = new SelectList(db.Stocks, "ID", "BatchNo");
            return View();
        }

        // POST: SalesItems/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,StockID,SalesID,Qty,Rate,Amount")] SalesItem salesItem)
        {
            if (ModelState.IsValid)
            {
                db.SalesItems.Add(salesItem);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.SalesID = new SelectList(db.Sales, "ID", "Remarks", salesItem.SalesID);
            ViewBag.StockID = new SelectList(db.Stocks, "ID", "BatchNo", salesItem.StockID);
            return View(salesItem);
        }

        // GET: SalesItems/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesItem salesItem = db.SalesItems.Find(id);
            if (salesItem == null)
            {
                return HttpNotFound();
            }
            ViewBag.SalesID = new SelectList(db.Sales, "ID", "Remarks", salesItem.SalesID);
            ViewBag.StockID = new SelectList(db.Stocks, "ID", "BatchNo", salesItem.StockID);
            return View(salesItem);
        }

        // POST: SalesItems/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,StockID,SalesID,Qty,Rate,Amount")] SalesItem salesItem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(salesItem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.SalesID = new SelectList(db.Sales, "ID", "Remarks", salesItem.SalesID);
            ViewBag.StockID = new SelectList(db.Stocks, "ID", "BatchNo", salesItem.StockID);
            return View(salesItem);
        }

        // GET: SalesItems/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesItem salesItem = db.SalesItems.Find(id);
            if (salesItem == null)
            {
                return HttpNotFound();
            }
            return View(salesItem);
        }

        // POST: SalesItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            SalesItem salesItem = db.SalesItems.Find(id);
            db.SalesItems.Remove(salesItem);
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
