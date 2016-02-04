using FYPPharmAssistant.DAL;
using FYPPharmAssistant.Models.InventoryModel;
using FYPPharmAssistant.Models.PurchaseModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FYPPharmAssistant.ViewModel
{
    public class PurchaseInvoiceEntryViewModel
    {
        MyContext db = new MyContext();

        public PurchaseInvoiceEntryViewModel()
        {
            ChooseSupplier = new SelectList(db.Suppliers.ToList(), "ID", "Name");
            ChooseItem = new SelectList(db.Items.ToList(), "ID", "Name");
        }
        public string PurchaseID { get; set; }
        public DateTime InvocingDate { get; set; }
        public int SelectedSupplierValue { get; set; }        
        public SelectList ChooseSupplier { get; set; }
        [Required(ErrorMessage="Required")]
        [Range(0.00, 9999999.99)]
        public decimal Amount { get; set; }        
        public decimal? Discount { get; set; }  
        public decimal? Tax { get; set; }        
        public decimal GrandTotal { get; set; }

        [DataType(DataType.MultilineText)]
        public string Remarks { get; set; }
        [Required(ErrorMessage = "Chhose one!")]
        public int SelectedItemvalue { get; set; }
        [Required(ErrorMessage="Chhose one. If item not found plese go to Items> and cretae new item.")]
        public SelectList ChooseItem { get; set; }

        //[Required(ErrorMessage="Required Field! Or insert 0")]
        public string BatchNo { get; set; }

        //[Range(0, 9999999)]
        [Required(ErrorMessage = "Required")]
        public int Qty { get; set; }

        //[Range(0.00, 999999.99, ErrorMessage="Out of Range!")]
        [Required(ErrorMessage = "Required")]
        public decimal CostPrice { get; set; }

        //[Range(0.00, 9999999.99, ErrorMessage="Out of range!")]
        [Required(ErrorMessage = "Required")]
        public decimal SellingPrice { get; set; }
        public bool IsPaid { get; set; }   
        [Required(ErrorMessage="Please insert date!")]
        [DisplayFormat(DataFormatString="{0:yyyy-MM-dd}", ApplyFormatInEditMode=true)]
        public DateTime Expiry { get; set; }


    }
}