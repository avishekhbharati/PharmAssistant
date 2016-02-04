using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FYPPharmAssistant.Models.PurchaseModel;
using FYPPharmAssistant.DAL;

namespace FYPPharmAssistant.Repository
{
    public class SupplierRepository
    {
        MyContext db = new MyContext();
        public int SupplierDuplicationCheck(Supplier supplier)
        {
            //check if the input supplier name already exists
            List<Supplier> _supplier = (from s in db.Suppliers
                                        where s.Name == supplier.Name
                                        select s).ToList();
            return _supplier.Count;            
        }
        /*
        public int SupplierAbbervationCheck(Supplier supplier)
        {
            //check if abbrevation already exists             
            List<Supplier> _supplierAbbr = (from s in db.Suppliers
                                            where s.Abbrevation == supplier.Abbrevation
                                            select s).ToList();
            return _supplierAbbr.Count;
        }*/
        /*
       public string GetSupplierAbbrevation(int id)
        {
            var abbrevation = (from s in db.Suppliers
                              where s.ID == id
                              select s.Abbrevation).SingleOrDefault();
            return abbrevation;
        }
        */
    }
}