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
using System.IO;

namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin, Staff")]
    public class SalesController : Controller
    {
       
        private MyContext db = new MyContext();

        // GET: Sales
        public ActionResult Index()
        {   
            
            return View(db.Sales.OrderByDescending(s=>s.ID).ToList());
        }


        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var _salesItems = (from si in db.SalesItems
                              where si.SalesID == id
                              select si).ToList();

            if (_salesItems == null)
            {
                return HttpNotFound();
            }
            return View(_salesItems.ToList());
        }

        

        // GET: Sales/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FYPPharmAssistant.Models.Sales sales = db.Sales.Find(id);
            if (sales == null)
            {
                return HttpNotFound();
            }
            return View(sales);
        }

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Date,Amount,Discount,Tax,GrandTotal,UserID,Remarks")]FYPPharmAssistant.Models.Sales sales)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sales).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sales);
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
