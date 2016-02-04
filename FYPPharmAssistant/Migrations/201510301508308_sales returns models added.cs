namespace FYPPharmAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class salesreturnsmodelsadded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SalesReturnDetail",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SalesReturnID = c.Int(nullable: false),
                        StockID = c.Int(nullable: false),
                        BatchNo = c.String(),
                        Qty = c.Int(nullable: false),
                        Rate = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SalesReturn", t => t.SalesReturnID, cascadeDelete: true)
                .Index(t => t.SalesReturnID);
            
            CreateTable(
                "dbo.SalesReturn",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        SalesID = c.Int(nullable: false),
                        Subtotal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Discount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        NetTotal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SalesReturnDetail", "SalesReturnID", "dbo.SalesReturn");
            DropIndex("dbo.SalesReturnDetail", new[] { "SalesReturnID" });
            DropTable("dbo.SalesReturn");
            DropTable("dbo.SalesReturnDetail");
        }
    }
}
