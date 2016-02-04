using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYPPharmAssistant.Repository
{
    public class ManufacturerRepository
    {
        MyContext db = new MyContext();
        public int ManufacturerDuplicationCheck(Manufacturer manufacturer)
        {
            List<Manufacturer> _manufacturer = (from m in db.Manufacturers
                                                where m.ManufacturerName == manufacturer.ManufacturerName
                                                select m).ToList();
            return _manufacturer.Count;
        }
    }
}