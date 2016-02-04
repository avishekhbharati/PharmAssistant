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
using System.Data.Sql;


namespace FYPPharmAssistant.Controllers
{
    [Authorize(Roles = "Admin")]
    public class DrugGenericNameController : Controller
    {
        private MyContext db = new MyContext();

        // GET: DrugGenericName
        public ActionResult Index()
        {
            return View(db.DrugGenericNames.ToList());
        }


        // GET: DrugGenericName/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DrugGenericName drugGenericName = db.DrugGenericNames.Find(id);
            if (drugGenericName == null)
            {
                return HttpNotFound();
            }
            return View(drugGenericName);
        }


        // GET: DrugGenericName/Create
        public ActionResult Create()
        {
            return View();
        }


        // POST: DrugGenericName/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,GenericName,Description")] DrugGenericName drugGenericName)
        {
            if (ModelState.IsValid)
            {
                //check if values is duplicate
                int count = DuplicateCount(drugGenericName);
                if (count > 0)
                {
                    ViewBag.DuplicateError = "Already Exists!!";
                    return View(drugGenericName);
                }
                else
                {
                    db.DrugGenericNames.Add(drugGenericName);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }               
            }

            return View(drugGenericName);
        }
 


        // GET: DrugGenericName/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DrugGenericName drugGenericName = db.DrugGenericNames.Find(id);
            if (drugGenericName == null)
            {
                return HttpNotFound();
            }
            return View(drugGenericName);
        }



        // POST: DrugGenericName/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,GenericName,Description")] DrugGenericName drugGenericName)
        {
            if (ModelState.IsValid)
            {
                //get old generic name 
                var original = db.DrugGenericNames.Find(drugGenericName.ID);

                //compare old name to new 
                if (original.GenericName != drugGenericName.GenericName)
                {
                    //check for duplication
                    int count = DuplicateCount(drugGenericName);


                    if (count > 0)
                    {
                        //error message
                        ViewBag.DuplicateError = "Generic name already Exists!!";
                        return View(drugGenericName);
                    }
                }

                db.Entry(original).CurrentValues.SetValues(drugGenericName);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(drugGenericName);
        }



        // GET: DrugGenericName/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DrugGenericName drugGenericName = db.DrugGenericNames.Find(id);
            if (drugGenericName == null)
            {
                return HttpNotFound();
            }
            return View(drugGenericName);
        }



        // POST: DrugGenericName/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            /*try
            {*/
                DrugGenericName drugGenericName = db.DrugGenericNames.Find(id);
                db.DrugGenericNames.Remove(drugGenericName);
                db.SaveChanges();
                return RedirectToAction("Index");
          /*  }
            catch(Exception e)
            {
                Response.Write(e.Message);
            }*/
        }


        /// <summary>
        /// Checks for duplication.
        /// </summary>
        /// <param name="drugGenericName"></param>
        /// <returns></returns>
        public int DuplicateCount(DrugGenericName drugGenericName)
        {
            List<DrugGenericName> _checkUnique = (from d in db.DrugGenericNames
                                                  where d.GenericName == drugGenericName.GenericName
                                                  select d).ToList();
            return _checkUnique.Count;
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
