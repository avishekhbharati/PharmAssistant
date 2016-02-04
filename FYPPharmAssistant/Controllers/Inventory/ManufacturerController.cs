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
using FYPPharmAssistant.Repository;
using System.Data.SqlClient;

namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ManufacturerController : Controller
    {
        private MyContext db = new MyContext();
        ManufacturerRepository repo = new ManufacturerRepository();
        private string oldManufacturerName = "";

        // GET: Manufacturer
        public ActionResult Index()
        {
            return View("Index", db.Manufacturers.OrderByDescending(m=>m.ID).ToList());
        }

        //JSON GET
        

        // GET: Manufacturer/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Manufacturer manufacturer = db.Manufacturers.Find(id);
            if (manufacturer == null)
            {
                return HttpNotFound();
            }
            return View(manufacturer);
        }

        // GET: Manufacturer/Create
        public ActionResult Create()
        {
            return View("Create");
        }


        //Testing Partial View. Delete if not worked
        public PartialViewResult CreatePV()
        {
            return PartialView("Create");
        }



        // POST: Manufacturer/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Manufacturer manufacturer)
        {
            if (ModelState.IsValid)
            {
                //check if duplication exists
                int count = repo.ManufacturerDuplicationCheck(manufacturer);
                //if yes throw an error message
                if (count > 0)
                {
                    ViewBag.DuplicateError = "Already Exists!!";
                    return View(manufacturer);
                }
                else
                {
                    //else add new manufacturer and return to Index
                    db.Manufacturers.Add(manufacturer);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }                
            }

            return View(manufacturer);
        }

        //submit via ajax
        public JsonResult CreateSubmitAjax([Bind(Include = "ID,ManufacturerName,Description")] Manufacturer manufacturer)
        {
            if (ModelState.IsValid)
            {
                //check if duplication exists
                int count = repo.ManufacturerDuplicationCheck(manufacturer);
                //if yes throw an error message
                if (count > 0)
                {
                    ViewBag.DuplicateError = "Already Exists!!";
                    return Json("duplicate", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    //else add new manufacturer and return to Index
                    db.Manufacturers.Add(manufacturer);
                    db.SaveChanges();
                    return Json("Success", JsonRequestBehavior.AllowGet);
                }
            }
            return null;
        }
        //************************************************




        // GET: Manufacturer/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Manufacturer manufacturer = db.Manufacturers.Find(id);
            if (manufacturer == null)
            {
                return HttpNotFound();
            }
            oldManufacturerName = manufacturer.ManufacturerName;
            return View(manufacturer);
        }



        // POST: Manufacturer/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,ManufacturerName,Description")] Manufacturer manufacturer)
        {
            if (ModelState.IsValid)
            {

                
                //get old object
                var original = db.Manufacturers.Find(manufacturer.ID);


                //compare old name with modified name 
                if (original.ManufacturerName != manufacturer.ManufacturerName)
                {
                    //check if duplicate exists
                    int count = repo.ManufacturerDuplicationCheck(manufacturer);

                    //if yes throw an error message
                    if (count > 0)
                    {
                        ViewBag.DuplicateError = "Already Exists!!";
                        return View(manufacturer);
                    }

                    
                }

                db.Entry(original).CurrentValues.SetValues(manufacturer);
                //else update changes
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(manufacturer);
        }



        // GET: Manufacturer/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Manufacturer manufacturer = db.Manufacturers.Find(id);
            if (manufacturer == null)
            {
                return HttpNotFound();
            }
            return View(manufacturer);
        }



        // POST: Manufacturer/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            try
            {
                Manufacturer manufacturer = db.Manufacturers.Find(id);
                db.Manufacturers.Remove(manufacturer);
                db.SaveChanges();
                
            }
            catch(Exception e )
            {
                //displays page with error message
               // return RedirectToAction("ReferenceError", "Extra");
                Response.Write(e.Message);
            }

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
