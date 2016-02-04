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
using System.Text;
using Microsoft.Reporting.WebForms;
using System.IO;
using FYPPharmAssistant.ViewModel;
using System.Data.SqlClient;

namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ItemController : Controller
    {
        private MyContext db = new MyContext();
       


        // GET: Item
        public ActionResult Index()
        {
           
            var items = db.Items.Include(i => i.DrugGenericName).Include(i => i.Manufacturer).OrderByDescending(i=>i.ID);
            return View(items.ToList());
        }



        // GET: Item/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Item item = db.Items.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            return View(item);
        }



        // GET: Item/Create
        public ActionResult Create()
        {
            ViewBag.DrugGenericNameID = new SelectList(db.DrugGenericNames, "ID", "GenericName");
            ViewBag.ManufacturerID = new SelectList(db.Manufacturers, "ID", "ManufacturerName");
            return View();
        }




        // POST: Item/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Item item)
        {
            if (ModelState.IsValid)
            {
                int count = DuplicateCount(item);
                if(count >0)
                {
                    ViewBag.DuplicateError = "Item already exists!!";
                    ViewBag.DrugGenericNameID = new SelectList(db.DrugGenericNames, "ID", "GenericName", item.DrugGenericNameID);
                    ViewBag.ManufacturerID = new SelectList(db.Manufacturers, "ID", "ManufacturerName", item.ManufacturerID);
                    return View(item);
                }
                else
                {
                    item.LastUpdated = DateTime.Today;
                    db.Items.Add(item);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }                
            }

            ViewBag.DrugGenericNameID = new SelectList(db.DrugGenericNames, "ID", "GenericName", item.DrugGenericNameID);
            ViewBag.ManufacturerID = new SelectList(db.Manufacturers, "ID", "ManufacturerName", item.ManufacturerID);
            return View(item);
        }



        // GET: Item/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Item item = db.Items.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            ViewBag.DrugGenericNameID = new SelectList(db.DrugGenericNames, "ID", "GenericName", item.DrugGenericNameID);
            ViewBag.ManufacturerID = new SelectList(db.Manufacturers, "ID", "ManufacturerName", item.ManufacturerID);
            return View(item);
        }



        // POST: Item/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Name,DrugGenericNameID,ManufacturerID,Categeory,UnitType,Weight,MeasurementID,AlertQty,Description,LastUpdated")] Item item)
        {
            if (ModelState.IsValid)
            {
                var original = db.Items.Find(item.ID);

                if (original.Name != item.Name)
                {
                    int count = DuplicateCount(item);

                    if (count > 0)
                    {
                        ViewBag.DuplicateError = "Item already exists!!";
                        return View(item);
                    }
                }

                db.Entry(original).CurrentValues.SetValues(item);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.DrugGenericNameID = new SelectList(db.DrugGenericNames, "ID", "GenericName", item.DrugGenericNameID);
            ViewBag.ManufacturerID = new SelectList(db.Manufacturers, "ID", "ManufacturerName", item.ManufacturerID);
            return View(item);
        }



        // GET: Item/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Item item = db.Items.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            return View(item);
        }



        // POST: Item/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Item item = db.Items.Find(id);
            db.Items.Remove(item);
            db.SaveChanges();
            return RedirectToAction("Index");
        }



        //calculates duplicate record
        public int DuplicateCount(Item item)
        {
            List<Item> _item = (from i in db.Items
                                where i.Name == item.Name
                                select i).ToList();
            return _item.Count;
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
