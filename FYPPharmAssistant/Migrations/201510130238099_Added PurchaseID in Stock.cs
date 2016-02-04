namespace FYPPharmAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedPurchaseIDinStock : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stock", "PurchaseID", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stock", "PurchaseID");
        }
    }
}
