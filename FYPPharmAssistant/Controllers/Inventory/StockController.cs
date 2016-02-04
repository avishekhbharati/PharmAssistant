using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;

namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin")]
    public class StockController : Controller
    {
        private MyContext db = new MyContext();

        // GET: Stock
        public ActionResult Index()
        {
            var stocks = db.Stocks.Where(s=> s.Qty > 0).Include(s =>s.Item).OrderByDescending(x=>x.ID);
            return View(stocks.ToList());
        }

        // GET: Stock/Details/5
        public ActionResult Details(int? id)
        {
            //checks if id is null
            if (id == null)
            {
                //returns BadRequest Page 
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Stock stock = db.Stocks.Find(id);
            //checks if the record for an id is null
            if (stock == null)
            {
                //returns not found page
                return HttpNotFound();
            }

            //else returns view with the record.
            return View(stock);
        }

        // GET: Stock/Create
        public ActionResult Create()
        {
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name");
            return View();
        }

        // POST: Stock/Create
        // To protect from overposting attacks, the specific properties to bind has been specified
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,ItemID,BatchNo,Qty,CostPrice,SellingPrice,ManufacturedDate,ExpiryDate")] Stock stock)
        {
            // checks if the posted data is valid against the model properties.
            if (ModelState.IsValid)
            {
                //Add to database
                db.Stocks.Add(stock);
                //Save the changes mades to database.
                db.SaveChanges();
                //redirecting to the Index view
                return RedirectToAction("Index");
            }
            //Operation to perform if model data to save in database is invalid.

            //Object to populate dropdown list is send to view using ViewBag.
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name", stock.ItemID);
            //return back to create view
            return View(stock);
        }


        // GET: Stock/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Stock stock = db.Stocks.Find(id);
            if (stock == null)
            {
                return HttpNotFound();
            }
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name", stock.ItemID);
            return View(stock);
        }


        // POST: Stock/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,ItemID,BatchNo,Qty,CostPrice,SellingPrice,ManufacturedDate,ExpiryDate")] Stock stock)
        {
            if (ModelState.IsValid)
            {
                //checks if anything is modified.
                db.Entry(stock).State = EntityState.Modified;
                
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ItemID = new SelectList(db.Items, "ID", "Name", stock.ItemID);
            return View(stock);
        }


        // GET: Stock/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Stock stock = db.Stocks.Find(id);
            if (stock == null)
            {
                return HttpNotFound();
            }
            return View(stock);
        }

        // POST: Stock/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            //find the record with an id
            Stock stock = db.Stocks.Find(id);
            //remove the record 
            db.Stocks.Remove(stock);
            //save changes
            db.SaveChanges();
            //redirect to the index page.
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
